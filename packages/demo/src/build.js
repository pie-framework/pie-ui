const debug = require('debug');
const log = debug('pie-ui:demo:build');

log('build static site...');
const pug = require('pug');
const webpack = require('webpack');

const {
  createEntryObject,
  getPkgAndDemo,
  writeIndex,
  getBranch
} = require('./shared');
const { resolve, basename } = require('path');
const { writeFileSync, mkdirpSync, removeSync } = require('fs-extra');

const indexRender = pug.compileFile(
  resolve(__dirname, '..', 'views', 'index.pug')
);
const packageRender = pug.compileFile(
  resolve(__dirname, '..', 'views', 'package-demo.pug')
);

const buildIndex = (packages, outDir, branch) => {
  const out = indexRender({ packages, branch });
  writeFileSync(resolve(outDir, 'index.html'), out, 'utf8');
};

const buildPackagePage = (pd, branch) => {
  const { demo, ...pkg } = pd;
  const opts = {
    branch,
    name: basename(pkg.name),
    data: demo.data,
    markup: demo.markup,
    pkg,
    tagName: demo.tagName
  };
  const out = packageRender(opts);
  writeFileSync(resolve(outDir, `${basename(pkg.name)}.html`), out, 'utf8');
};

const outDir = resolve(__dirname, '..', '.out');
removeSync(outDir);
mkdirpSync(outDir);
const branch = getBranch();
log('- branch', branch);
const pkgAndDemos = getPkgAndDemo(branch !== 'master' && 'next');
buildIndex(pkgAndDemos, outDir, branch);

pkgAndDemos.forEach(p => {
  buildPackagePage(p, branch);
});

const entry = createEntryObject(outDir, pkgAndDemos);

entry.index = './index.js';

writeIndex(outDir);

const publicPath = './assets';

mkdirpSync(resolve(outDir, 'assets'));

const config = {
  ...require('../webpack.config'),
  entry,
  context: resolve(outDir),
  output: { path: resolve(outDir, publicPath), filename: '[name].js' }
};

console.log('config', config);
const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.log('error: ');
    console.log(err);
    process.exit(1);
  } else {
    if (stats.hasErrors()) {
      const errors = stats.toJson({ errors: true });
      console.error(errors);
      process.exit(1);
    }
    console.log('done');
  }
});
