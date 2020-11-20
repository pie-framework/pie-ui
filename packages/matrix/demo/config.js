module.exports = {
  elements: {
    'matrix-el': '..'
  },
  models: [{
    element: 'matrix',
    id: '1',
    mode: 'gather',
    disabled: false,
    labelType: 'agreement',
    rowLabels: ['I\'m interested in politics.', 'I\'m interested in economics.'],
    columnLabels: ['Disagree', 'Unsure', 'Agree'],
    matrixValues: {},
    prompt: 'How interested are you in the following domains?'
  }]
};
