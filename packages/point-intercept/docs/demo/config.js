const base = {
  width: 600,
  height: 600,
  //domain is the x-axis
  domain: {
    max: 10,
    min: -10,
    label: 'x',
    labelFrequency: 1,
    step: 1,
    snap: 1,
    padding: 20
  },
  //range is the y-axis
  range: {
    max: 10,
    min: -10,
    label: 'y',
    step: 1,
    snap: 1,
    padding: 20
  },
};

const model = (id, extras) =>
    Object.assign({}, base, { id, element: 'point-intercept' }, extras);

/**
 * Legacy system had sigfigs - which i think is for checking if a value
 * is close enough to a correct answer. do we need this?
 */
module.exports = {
  elements: {
    'point-intercept': '..'
  },
  models: [
    model('1', {
      disabled: false,
      // pointLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      // correctResponse: [{ x: 0, y: 0, label: 'A' }, { x: 1, y: 1, label: 'B' }],
      pointsMustMatchLabels: true
    }),
  ],
};
