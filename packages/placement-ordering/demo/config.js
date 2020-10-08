module.exports = {
  elements: {
    'placement-ordering': '..'
  },
  models: [
    {
      id: '1',
      element: 'placement-ordering',
      prompt:
        '$10 - and $20 - this is the prompt, <span data-latex="">$\\frac{1}{2}$</span></h1>',
      choices: [
        { id: '1', label: '1', moveOnDrag: true },
        { id: '2', label: '2' },
        { id: '3', label: '3' },
        { id: '4', label: '4' }
      ],
      disabled: false,
      config: {
        orientation: 'vertical',
        includeTargets: true,
        showOrdering: true,
        choiceLabel: 'Choices!',
        targetLabel: 'Targets'
      }
    },
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
    },
    {
      element: 'placement-ordering',
      id: '3',
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
};
