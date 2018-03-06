module.exports = {

  elements: {
    'placement-ordering': '..'
  },
  models: [
    {
      element: 'placement-ordering',
      id: '1',
      prompt: 'Arrange the fruits alphabetically',
      choices: [
        {
          id: 'c2',
          label: 'Lemon',
          shuffle: false,
          moveOnDrag: true
        },
        {
          id: 'c3',
          label: 'Melon',
          moveOnDrag: true
        },
        {
          id: 'c1',
          label: 'Blueberry',
          moveOnDrag: false
        },
        {
          id: 'c4',
          label: 'Pear',
          moveOnDrag: false
        }
      ],
      correctness: 'incorrect',
      feedback: 'This is feedback',
      correctResponse: [
        'c1', 'c3', 'c2', 'c4'
      ],
      outcomes: [
        { id: 'c1', outcome: 'correct' },
        { id: 'c2', outcome: 'incorrect' },
        { id: 'c3', outcome: 'incorrect' },
        { id: 'c4', outcome: 'correct' }
      ],
      completeLength: 4,
      config: {
        orientation: 'vertical',
        includeTargets: false,
        targetLabel: 'Answer Area Label',
        choiceLabel: 'choices: ',
        showOrdering: true
      },
      disabled: true
    }
  ]
}