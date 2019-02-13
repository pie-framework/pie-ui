const express = require('express');

const minimist = require('minimist');
const { writeFileSync } = require('fs-extra');
const { basename, resolve, join } = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const {
  getPkgAndDemo,
  createEntryObject,
  generateMarkupFromData
} = require('./shared');
const publicPath = '/assets';

const BUILD_DIR = '.out-runtime';

const OUT_DIR = resolve(__dirname, '..', BUILD_DIR);

const args = minimist(process.argv.slice(2));

const PORT = args.port || 7438;
const buildApp = (config, pkgAndDemos) => {
  const app = express();

  console.log('config:', config);
  const compiler = webpack(config);

  app.use(
    middleware(compiler, {
      // webpack-dev-middleware options
      publicPath
    })
  );

  app.set('view engine', 'pug');

  app.get('/', (req, res) => {
    res.render('index', {
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
  const pkgAndDemos = getPkgAndDemo();

  const entry = createEntryObject(OUT_DIR, pkgAndDemos);

  entry.index = './index.js';

  writeFileSync(
    join(OUT_DIR, 'index.js'),
    `
    import {Button} from "@material/mwc-button";
  import {Icon} from "@material/mwc-icon";

  console.log('index', Icon);

`,
    'utf8'
  );

  const base = require('../webpack.config');
  const config = {
    ...base,
    entry,
    context: resolve(OUT_DIR),
    output: {
      publicPath
    }
  };

  return Promise.resolve({ config, pkgAndDemos });
};

const run = async () => {
  const { config, pkgAndDemos } = await buildWebpackConfig();
  const app = buildApp(config, pkgAndDemos);
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

run().catch(e => {
  console.error(e);
});
