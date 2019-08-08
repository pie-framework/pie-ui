const base = {};

const model = (id, extras) =>
  Object.assign(
    {},
    base,
    {
      id,
      element: 'charting-el',
      backgroundMarks: [],
      size: { width: 600, height: 600 },
      domain: { min: 0, max: 5, padding: 0, step: 1, labelStep: 1 },
      range: { min: 0, max: 5, padding: 0, step: 1, labelStep: 1 },
      addCategoryEnabled: true
    },
    extras
  );

module.exports = {
  elements: {
    'charting-el': '..'
  },
  models: [model('1', {})]
};
