const model = (id, extras) => {
  const defaults = {
    element: 'inline-dropdown',
    disabled: false,
    // eslint-disable-next-line quotes
    markup: `The best fruit in the world is {{0}}, <div> The best vegetable in the world is {{1}}</div>`,
    choices: {
      0: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
      ],
      1: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Leek', value: 'leek' }
      ]
    }
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
