module.exports = {

  elements: {
    'placement-ordering': '..'
  },
  models: [
    {
      element: 'placement-ordering',
      id: '2',
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
      correctness: 'correct',
      feedback: 'This is feedback',
      outcomes: [
        { id: 'c1', outcome: 'correct' },
        { id: 'c2', outcome: 'correct' },
        { id: 'c3', outcome: 'correct' },
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