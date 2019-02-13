console.log('build static site...');
const pug = require('pug');
const webpack = require('webpack');

const { getPackages, createEntryObject, loadDemo } = require('./shared');
const { resolve } = require('path');
const { writeFileSync, mkdirpSync, removeSync } = require('fs-extra');

const indexRender = pug.compileFile(
  resolve(__dirname, '..', 'views', 'index.pug')
);
const packageRender = pug.compileFile(
  resolve(__dirname, '..', 'views', 'package-demo.pug')
);

const buildIndex = (packages, outDir) => {
  const out = indexRender({ packages });
  writeFileSync(resolve(outDir, 'index.html'), out, 'utf8');
};

const buildPackagePage = p => {
  const pkgPath = resolve(__dirname, '..', '..', p);
  console.log('pkgPath: ', pkgPath);
  const data = loadDemo(pkgPath);

  console.log(p, data);
  const out = packageRender({ name: p, data });
  writeFileSync(resolve(outDir, `${p}.html`), out, 'utf8');
};

const outDir = resolve(__dirname, '..', '.out');
removeSync(outDir);
mkdirpSync(outDir);
const packages = getPackages();
buildIndex(packages, outDir);

packages.forEach(p => {
  buildPackagePage(p);
});

const entry = createEntryObject(outDir, packages);
//  packages.reduce((cfg, p) => {
//   writeEntry(p, resolve(outDir));
//   cfg[p] = `./${p}.js`;
//   return cfg;
// }, {});

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
  } else {
    console.log('done');
  }
});
