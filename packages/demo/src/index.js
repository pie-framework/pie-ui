const express = require('express');

const minimist = require('minimist');
const { writeFileSync } = require('fs-extra');
const { basename, resolve, join } = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const {
  getPkgAndDemo,
  createEntryObject,
  generateMarkupFromData,
  getBranch,
  writeIndex
} = require('./shared');
const publicPath = '/assets';
const debug = require('debug');

const log = debug('pie-ui:demo:server');
const BUILD_DIR = '.out-runtime';

const OUT_DIR = resolve(__dirname, '..', BUILD_DIR);

const args = minimist(process.argv.slice(2));

exports.DEFAULT_PORT = 7438;
const PORT = args.port || exports.DEFAULT_PORT;

const buildApp = (config, pkgAndDemos, branch) => {
  const app = express();

  const compiler = webpack(config);

  app.use(
    middleware(compiler, {
      // webpack-dev-middleware options
      publicPath
    })
  );

  app.set('view engine', 'pug');

  app.set('views', resolve(__dirname, '..', 'views'));

  app.get('/', (req, res) => {
    res.render('index', {
      branch,
      packages: pkgAndDemos.map(p => ({ ...p, shortName: basename(p.name) }))
    });
  });

  app.get('/:name.html', (req, res) => {
    const name = req.params.name;

    console.log('name:', name);

    try {
      const { demo, ...pkg } = pkgAndDemos.find(k => basename(k.name) === name);

      const markup = demo.markup
        ? demo.markup
        : generateMarkupFromData(demo.data, `${name}-el`);

      res.render('package-demo', {
        branch,
        name,
        data: demo.data,
        markup: markup,
        pkg,
        tagName: demo.tagName
      });
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });
  return app;
};

const buildWebpackConfig = () => {
  const branch = getBranch();
  log('___________-- branch', branch);
  const pkgAndDemos = getPkgAndDemo(branch !== 'master' && 'next');

  const entry = createEntryObject(OUT_DIR, pkgAndDemos);

  entry.index = './index.js';
  writeIndex(OUT_DIR);

  const base = require('../webpack.config');
  const config = {
    ...base,
    entry,
    context: resolve(OUT_DIR),
    output: {
      publicPath
    }
  };

  return Promise.resolve({ config, pkgAndDemos, branch });
};

const run = async () => {
  const { config, pkgAndDemos, branch } = await buildWebpackConfig();
  const app = buildApp(config, pkgAndDemos, branch);
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

run().catch(e => {
  console.error(e);
});
