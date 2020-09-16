module.exports = {
  elements: {
    'multiple-choice': '..',
  },
  models: [
    {
      element: 'multiple-choice',
      id: '1',
      mode: 'gather',
      prompt: 'I have $4 and you have $5 - who has more?',
      disabled: false,
      choiceMode: 'radio',
      keyMode: 'letters',
      showCorrect: true,
      responseCorrect: true,
      // correctResponse: [{ value: 'b' }],

      choices: [
        {
          label: 'apple <span data-latex="">$\\frac{2}{2}$</span>',
          value: 'a',
          correct: true,
        },
        {
          label: 'banana <span data-latex="">\\(\\frac{1}{2}\\)</span>',
          value: 'b',
        },
      ],
    },
    {
      element: 'multiple-choice',
      id: '2',
      mode: 'evaluate',
      prompt: 'I have $4 and you have $5 - who has more?',
      disabled: true,
      choiceMode: 'radio',
      keyMode: 'letters',
      responseCorrect: false,
      // correctResponse: [{ value: 'b' }],

      choices: [
        {
          label: 'apple <span data-latex="">$\\frac{2}{2}$</span>',
          value: 'a',
          correct: false,
          feedback: 'feedback',
        },
        {
          label: 'banana <span data-latex="">\\(\\frac{1}{2}\\)</span>',
          value: 'b',
          correct: true,
          feedback: 'feedback',
        },
      ],
    },
  ],
};
