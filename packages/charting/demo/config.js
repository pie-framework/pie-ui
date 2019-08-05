const base = {};

const model = (id, extras) =>
  Object.assign(
    {},
    base,
    {
      id,
      element: 'graphing-el',
      backgroundMarks: [],
      size: { width: 600, height: 600 },
      domain: { min: -5, max: 5, padding: 0, step: 1, labelStep: 1 },
      range: { min: -5, max: 5, padding: 0, step: 1, labelStep: 1 },
      toolbarTools: ['point']
    },
    extras
  );

module.exports = {
  elements: {
    'graphing-el': '..'
  },
  models: [model('1', {})]
};
