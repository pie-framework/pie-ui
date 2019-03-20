const partA = {
  element: 'multiple-choice',
  id: '2',
  disabled: false,
  keyMode: 'letters',
  showCorrect: true,
  correctResponse: [{ value: 'value' }],

  prompt: 'What color is the sky?',
  choiceMode: 'radio',
  choices: [
    {
      value: 'yellow',
      label: 'Yellow',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      correct: true,
      value: 'blue',
      label: 'Blue',
    },
  ]
};

const partB =  {
  element: 'multiple-choice',
  id: '3',
  disabled: false,
  keyMode: 'letters',
  showCorrect: true,
  correctResponse: [{ value: 'purple' }],

  prompt: 'What color do you get when you mix Red with your answer in Part 1?',
  choiceMode: 'radio',
  choices: [
    {
      value: 'orange',
      label: 'Orange',
    },
    {
      correct: true,
      value: 'purple',
      label: 'Purple',
    },
    {
      value: 'pink',
      label: 'Pink',
    },
    {
      value: 'green',
      label: 'Green',
    },
  ]
};

module.exports = {
  elements: {
    'ebsr-element': '..'
  },
  models: [
    {
      id: '1',
      element: 'ebsr-element',
      mode: 'gather',
      partA,
      partB,
    }
  ]
};
