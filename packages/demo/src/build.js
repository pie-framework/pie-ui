console.log('build static site...');
const pug = require('pug');
const webpack = require('webpack');

const { createEntryObject, getPkgAndDemo } = require('./shared');
const { resolve, basename } = require('path');
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

const buildPackagePage = pd => {
  const { demo, ...pkg } = pd;
  const opts = {
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
const packages = getPkgAndDemo();
buildIndex(packages, outDir);

packages.forEach(p => {
  buildPackagePage(p);
});

const entry = createEntryObject(outDir, packages);

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
