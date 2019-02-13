const { resolve, basename, dirname } = require('path');
const {
  mkdirpSync,
  writeFileSync,
  readFileSync,
  readJsonSync
} = require('fs-extra');
const vm = require('vm');

exports.getPkgAndDemo = () => {
  return exports.getPackages().map(pkg => {
    const { markup, data } = exports.loadDemo(dirname(pkg._path));
    pkg.demo = {
      tagName: exports.getElementNameFromDemo(data),
      data,
      markup
    };
    return pkg;
  });
};

exports.getPackages = () => {
  const pkg = require(resolve(__dirname, '../package.json'));
  const names = Object.keys(pkg.dependencies)
    .filter(p => p.startsWith('@pie-ui'))
    .map(p => p.replace('@pie-ui/', ''));

  return names.map(n => {
    const p = resolve(__dirname, '../../', n, 'package.json');
    const pkg = readJsonSync(p);
    pkg._path = p;
    return pkg;
  });
};

exports.writeEntry = (pkg, tagName, outDir) => {
  const js = `
    import Element from '@pie-ui/${pkg}';
    customElements.define('${tagName}', Element); 
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
    console.error(e);
    return undefined;
  }
};

exports.loadDemoData = pkgPath => {
  try {
    console.log('loadDemo: ', pkgPath);
    const demoJsPath = resolve(pkgPath, 'demo', 'config.js');
    console.log('demoJsPath: ', demoJsPath);
    const demoJs = readFileSync(demoJsPath, 'utf8');

    const m = {
      exports: {}
    };

    const context = vm.createContext({
      exports: m.exports,
      module: m
    });

    vm.runInContext(demoJs, context);
    console.log('context:', context);
    return context.module.exports || context.exports;
  } catch (e) {
    console.error(e);

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

exports.createEntryObject = (outDir, packages) => {
  return packages.reduce((cfg, p) => {
    const name = basename(p.name);
    exports.writeEntry(name, p.demo.tagName, resolve(outDir));
    cfg[name] = `./${name}.js`;
    return cfg;
  }, {});
};
