const base = extras =>
  Object.assign(
    {},
    {
      element: 'select-text',
      highlightChoices: true,
      disabled: false,
      text:
        'Rachel cut out 8 stars in 6 minutes. Lovelle cut out 6 stars in 4 minutes. Rachel cut out 4 more stars than Lovelle. Lovelle and Rachel cut the same number of stars in 6 minutes. ',
      tokens: [
        { text: 'Rachel cut out 8 stars in 6 minutes. ', start: 0, end: 36 },
        { text: 'Lovelle cut out 6 stars in 4 minutes. ', start: 37, end: 74 },
        {
          text: 'Lovelle and Rachel cut the same number of stars in 6 minutes.',
          start: 117,
          end: 178
        }
      ]
    },
    extras
  );

module.exports = {
  elements: {
    'select-text': '..'
  },
  models: [base({ id: '1' }), base({ id: '2', disabled: true })]
};
