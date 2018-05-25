const base = (id, extras) =>
  Object.assign(
    {
      element: 'fill-in-the-blank',
      answers: [{ blank: '1', choice: '1' }]
    },
    { id },
    extras
  );

module.exports = [
  base('1'),
  base('2'),
  base('3', {
    answers: [{ blank: '1', choice: '1' }, { blank: '2', choice: '3' }]
  })
];
