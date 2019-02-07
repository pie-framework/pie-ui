const express = require('express');
const port = 3000;
const { resolve, dirname } = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs-extra');

const publicPath = '/assets';

const buildApp = config => {
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
    res.send('hi');
  });

  app.get('/:name', (req, res) => {
    const name = req.params.name;

    console.log('name:', name);

    try {
      const data = require(resolve(
        __dirname,
        '../../../packages',
        name,
        'demo/config'
      ));
      res.render('package-demo', { name, data });
    } catch (e) {
      res.status(500).end();
    }
  });
  return app;
};

const writeEntry = pkg => {
  const js = `
    import Element from '@pie-ui/${pkg}';
    customElements.define('${pkg}-el', Element); 
  `;
  const outPath = resolve(__dirname, '..', '.out', `${pkg}.js`);
  fs.mkdirpSync(dirname(outPath));
  fs.writeFileSync(resolve(__dirname, '..', '.out', `${pkg}.js`), js, 'utf8');
};

const buildWebpackConfig = () => {
  const pkg = require(resolve(__dirname, '../package.json'));
  const packages = Object.keys(pkg.dependencies)
    .filter(p => p.startsWith('@pie-ui'))
    .map(p => p.replace('@pie-ui/', ''));

  console.log('packages', packages);

  const entry = packages.reduce((cfg, p) => {
    writeEntry(p);
    cfg[p] = `./${p}.js`;
    return cfg;
  }, {});

  return Promise.resolve({
    entry,
    context: resolve(__dirname, '..', '.out'),
    output: {
      publicPath
    }
  });
};

const run = async () => {
  const config = await buildWebpackConfig();
  const app = buildApp(config);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

run().catch(e => {
  console.error(e);
});
