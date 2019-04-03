const { join, resolve, basename, dirname } = require('path');
const { execSync } = require('child_process');
const debug = require('debug');

const log = debug('pie-ui:demo:shared');
const err = debug('pie-ui:demo:err');
const {
  mkdirpSync,
  writeFileSync,
  readFileSync,
  readJsonSync
} = require('fs-extra');
const vm = require('vm');

exports.getBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();
};

exports.getSha = short => {
  const cmd = `git rev-parse ${short ? '--short' : ''} HEAD`;
  log('[getSha] cmd:', cmd);

  return execSync(cmd)
    .toString()
    .trim();
};

exports.getGitInfo = () => {
  return {
    branch: exports.getBranch(),
    sha: exports.getSha(),
    short: exports.getSha(true)
  };
};

exports.loadChangelog = (dir, name) => {
  try {
    return readFileSync(join(dir, name), 'utf8');
  } catch (e) {
    console.log('error reading changelog:', e.message);
    return undefined;
  }
};

exports.getPkgAndDemo = (versionOverride, packages) => {
  packages = packages || exports.getPackages(exports.getDependenciesFromPkg());
  log('packages:', packages);
  return packages.map(pkg => {
    pkg.shortName = basename(pkg.name);
    pkg.version = versionOverride ? versionOverride : pkg.version;
    const dir = dirname(pkg._path);
    const { markup, data } = exports.loadDemo(dir);
    const changelog = exports.loadChangelog(dir, 'CHANGELOG.md');
    const nextChangelog = exports.loadChangelog(dir, 'NEXT.CHANGELOG.md');
    pkg.demo = {
      tagName: exports.getElementNameFromDemo(data),
      data,
      markup
    };

    pkg.changelog = changelog;
    pkg.nextChangelog = nextChangelog;

    return pkg;
  });
};

exports.getDependenciesFromPkg = () => {
  const pkg = require(resolve(__dirname, '../package.json'));
  return Object.keys(pkg.dependencies)
    .filter(p => p.startsWith('@pie-ui'))
    .map(p => p.replace('@pie-ui/', ''));
};

exports.getPackages = names => {
  if (!names) {
    throw new Error('api change you must pass in names');
  }

  return names.map(n => {
    const p = resolve(__dirname, '../../', n, 'package.json');
    const pkg = readJsonSync(p);
    pkg._path = p;
    return pkg;
  });
};

exports.writeIndex = dir => {
  writeFileSync(
    join(dir, 'index.js'),
    `import {TopAppBar} from "../src/client/mwc-top-app-bar";
    `,
    'utf8'
  );
};

exports.writeEntry = (pkg, tagName, outDir, addHMR) => {
  const hmr = `
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
      document.location.reload();
    });
  }`;

  const js = `
    import Element from '@pie-ui/${pkg}';
    customElements.define('${tagName}', Element);
    
    ${addHMR ? hmr : '// no hmr'}
  `;
  const outPath = resolve(outDir, `${pkg}.js`);
  mkdirpSync(dirname(outPath));
  writeFileSync(outPath, js, 'utf8');
};

exports.loadDemo = pkgPath => {
  const data = exports.loadDemoData(pkgPath);

  const markup = exports.loadDemoMarkup(pkgPath);

  return { data, markup };
};

exports.generateMarkupFromData = (data, tagName) => {
  return data.models
    .map(m => {
      const tag = tagName || m.element;
      return `<${tag} pie-id="${m.id}></${tag}>`;
    })
    .join('<br/>');
};

exports.loadDemoMarkup = pkgPath => {
  try {
    const markupPath = resolve(pkgPath, 'demo', 'index.html');
    const markup = readFileSync(markupPath, 'utf8');
    return markup;
  } catch (e) {
    err('[loadDemoMarkup] ', e.message);
    return undefined;
  }
};

exports.loadDemoData = pkgPath => {
  try {
    log('loadDemo: ', pkgPath);
    const demoJsPath = resolve(pkgPath, 'demo', 'config.js');
    log('demoJsPath: ', demoJsPath);
    const demoJs = readFileSync(demoJsPath, 'utf8');

    const m = {
      exports: {}
    };

    const context = vm.createContext({
      exports: m.exports,
      module: m
    });

    vm.runInContext(demoJs, context);
    return context.module.exports || context.exports;
  } catch (e) {
    err('[loadDemoData] error: ', e.message);
    //console.error(e);

    return {
      models: [{}]
    };
  }
};

exports.getElementNameFromDemo = data => {
  if (data && data.models && data.models.length > 0) {
    return data.models[0].element;
  }
};

exports.createEntryObject = (outDir, packages, addHMR) => {
  return packages.reduce((cfg, p) => {
    const name = basename(p.name);
    exports.writeEntry(name, p.demo.tagName, resolve(outDir), addHMR);
    cfg[name] = `./${name}.js`;
    return cfg;
  }, {});
};
