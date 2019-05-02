const model = (id, extras) => {
  const defaults = {
    element: 'drag-in-the-blank',
    disabled: false,
    // eslint-disable-next-line quotes
    markup: `The best fruit in the world is {{0}}, <div> The best vegetable in the world is {{1}}</div>`,
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Carrot', value: 'carrot' },
      { label: 'Dumpling', value: 'dumpling' }
    ]
  };

  return Object.assign(defaults, { id }, extras);
};
module.exports = {
  elements: {
    'drag-in-the-blank': '..'
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
