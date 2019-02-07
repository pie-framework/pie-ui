'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');
const port = 3000;

var _require = require('path');

const resolve = _require.resolve,
      dirname = _require.dirname;

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs-extra');

const publicPath = '/assets';

const buildApp = config => {
  const app = express();

  console.log('config:', config);
  const compiler = webpack(config);

  app.use(middleware(compiler, {
    // webpack-dev-middleware options
    publicPath
  }));

  app.set('view engine', 'pug');

  app.get('/', (req, res) => {
    res.send('hi');
  });

  app.get('/:name', (req, res) => {
    const name = req.params.name;

    console.log('name:', name);

    try {
      const data = require(resolve(__dirname, '../../../packages', name, 'demo/config'));
      res.render('package-demo', { name: 'calculator', data });
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
  const packages = Object.keys(pkg.dependencies).filter(p => p.startsWith('@pie-ui')).map(p => p.replace('@pie-ui/', ''));

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

const run = (() => {
  var _ref = _asyncToGenerator(function* () {
    const config = yield buildWebpackConfig();
    const app = buildApp(config);

    app.listen(port, function () {
      return console.log(`Example app listening on port ${port}!`);
    });
  });

  return function run() {
    return _ref.apply(this, arguments);
  };
})();

run().catch(e => {
  console.error(e);
});
//# sourceMappingURL=index.js.map