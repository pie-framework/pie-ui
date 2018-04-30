module.exports = {
  elements: {
    'multiple-choice': '..'
  },
  models: [
    {
      element: 'multiple-choice',
      id: '1',
      mode: 'evaluate',
      prompt: 'This instance is in gather mode and can be clicked',
      disabled: false,
      choiceMode: 'radio',
      keyMode: 'letters',
      showCorrect: true,
      correctResponse: [{ value: 'b' }],
      choices: [
        { label: 'apple', value: 'a', correct: false },
        { label: 'banana', value: 'b' }
      ]
    }
  ]
};
