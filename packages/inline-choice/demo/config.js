const model = (id, extras) => {
  const defaults = {
    element: 'inline-choice',
    disabled: false,
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ]
  };

  return Object.assign(defaults, { id }, extras);
};
module.exports = {
  elements: {
    'inline-choice': '..'
  },
  models: [
    model('1'),
    model('2', { disabled: true }),
    model('3', {
      disabled: true,
      result: { correct: true, feedback: 'hooray' }
    }),
    model('4', { disabled: true, result: { correct: false, feedback: 'no' } }),
    model('5', {
      disabled: true,
      result: {
        correct: false,
        nothingSubmitted: true,
        feedback: 'nothing-submitted'
      }
    })
  ]
};
