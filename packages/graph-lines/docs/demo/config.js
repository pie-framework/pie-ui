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
  }
};

const model = (id, extras) =>
  Object.assign({}, base, { id, element: 'graph-lines' }, extras);

module.exports = {
  elements: {
    'graph-lines': '../..'
  },
  models: [
    model('1', {
      disabled: false,
      pointLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      correctResponse: '3x+2',
      initialView: '3x+3'
    })
  ]
};
