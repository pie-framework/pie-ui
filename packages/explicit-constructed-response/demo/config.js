const model = (id, extras) => {
  const defaults = {
    element: 'explicit-constructed-response',
    disabled: false,
    // eslint-disable-next-line quotes
    markup: `The best fruit in the world is {{0}}, <div> The best vegetable in the world is {{1}}</div>`
  };

  return Object.assign(defaults, { id }, extras);
};
module.exports = {
  elements: {
    'explicit-constructed-response': '..'
  },
  models: [
    model('1'),
    model('2', { disabled: true }),
    model('3', {
      disabled: true,
      feedback: {
        0: {
          correct: true
        },
        1: {
          correct: false
        }
      }
    })
  ]
};
