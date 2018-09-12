module.exports = {
  elements: {
    'multiple-choice': '..'
  },
  models: [
    {
      element: 'multiple-choice',
      id: '1',
      mode: 'evaluate',
      prompt: 'I have $4 and you have $5 - who has more?',
      disabled: false,
      choiceMode: 'radio',
      keyMode: 'letters',
      showCorrect: true,
      correctResponse: [{ value: 'b' }],

      choices: [
        {
          label: 'apple <span data-latex="">$\\frac{2}{2}$</span>',
          value: 'a',
          correct: false
        },
        {
          label: 'banana <span data-latex="">\\(\\frac{1}{2}\\)</span>',
          value: 'b'
        }
      ]
    }
  ]
};
