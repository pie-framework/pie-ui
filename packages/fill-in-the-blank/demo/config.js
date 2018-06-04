const base = (id, extras) =>
  Object.assign(
    {
      element: 'fill-in-the-blank',
      disabled: false,
      content: [
        'test ',
        { id: '1' },
        ' test ',
        { id: '2' },
        ' test ',
        { id: '3' }
      ],
      choiceLabel: 'these are the choices...',
      choices: [
        { id: '1', content: 'a', blankCount: 1 },
        { id: '2', content: 'b', blankCount: 2 },
        { id: '3', content: '<h1>c</h1>', blankCount: undefined }
      ]
    },
    { id },
    extras
  );
module.exports = {
  elements: {
    'fill-in-the-blank': '..'
  },
  models: [
    base('1'),
    base('2', { disabled: true }),
    base('3', {
      disabled: true,
      correctResponse: [
        { choice: '1', blank: '1' },
        { choice: '2', blank: '2' },
        { choice: '3', blank: '3' }
      ]
    })
  ]
};
