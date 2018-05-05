const base = extras =>
  Object.assign(
    {},
    {
      element: 'select-text',
      selectedTokens: [
        { text: 'Rachel cut out 8 stars in 6 minutes.', start: 0, end: 36 }
      ]
    },
    extras
  );

module.exports = [
  base({ id: '1' }),
  base({ id: '2' }),
  base({
    id: '3',
    selectedTokens: [
      { text: 'Rachel cut out 8 stars in 6 minutes.', start: 0, end: 36 },
      {
        text: 'Lovelle and Rachel cut the same number of stars in 6 minutes.',
        start: 117,
        end: 178
      }
    ]
  })
];
