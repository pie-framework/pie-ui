const debug = require('debug');
const log = debug('pie-ui:demo:build');

log('build static site...');
const pug = require('pug');
const webpack = require('webpack');

const {
  createEntryObject,
  getPkgAndDemo,
  writeIndex,
  getGitInfo
} = require('./shared');
const { resolve, basename } = require('path');
const { writeFileSync, mkdirpSync, removeSync } = require('fs-extra');

const indexRender = pug.compileFile(
  resolve(__dirname, '..', 'views', 'index.pug')
);
const packageRender = pug.compileFile(
  resolve(__dirname, '..', 'views', 'package-demo.pug')
);

const buildIndex = (packages, outDir, gitInfo) => {
  const out = indexRender({ packages, gitInfo });
  writeFileSync(resolve(outDir, 'index.html'), out, 'utf8');
};

const buildPackagePage = (pd, gitInfo) => {
  const { demo, ...pkg } = pd;
  const opts = {
    gitInfo,
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
const gitInfo = getGitInfo();
log('- gitInfo', gitInfo);
const pkgAndDemos = getPkgAndDemo(gitInfo.branch !== 'master' && 'next');
buildIndex(pkgAndDemos, outDir, gitInfo);

pkgAndDemos.forEach(p => {
  buildPackagePage(p, gitInfo);
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
    throw new Error('build has errors - see logs');
  } else {
    if (stats.hasErrors()) {
      const errors = stats.toJson({ errors: true });
      console.error(errors);
      throw new Error('build has errors - see logs');
    }
    console.log('done');
  }
});
