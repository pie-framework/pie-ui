module.exports = {
  elements: {
    'matrix-el': '..'
  },
  models: [{
    element: 'matrix-el',
    id: '1',
    mode: 'gather',
    disabled: false,
    labelType: 'agreement',
    rowLabels: ['I\'m interested in politics.', 'I\'m interested in economics.'],
    columnLabels: ['Disagree', 'Unsure', 'Agree'],
    matrixValues: {'0-0': 0, '0-1': 1, '0-2': 1, '1-0': 1, '1-1': 0, '1-2': 0},
    prompt: 'How interested are you in the following domains?'
  }]
};
