const model = (id, extras) => {
  const defaults = {
    element: 'inline-dropdown',
    disabled: false,
    // eslint-disable-next-line quotes
    markup: `The best fruit in the world is {{0}}, <div> The best vegetable in the world is {{1}}</div>`,
    fields: {
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
  models: [model('1')]
};
