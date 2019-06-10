const base = {};

const model = (id, extras) =>
  Object.assign({}, base, { id, element: 'graphing' }, extras);

module.exports = {
  elements: {
    'graphing': '..'
  },
  models: [
    model('1', {})
  ]
};
