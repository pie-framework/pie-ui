module.exports = {

  elements: {
    'placement-ordering': '..'
  },
  models: [
    {
      id: '1',
      element: 'placement-ordering',
      prompt: 'this is the prompt',
      choices: [
        { id: '1', label: '1', moveOnDrag: true },
        { id: '2', label: '2' },
        { id: '3', label: '2' },
        { id: '4', label: '2' }
      ],
      disabled: false,
      config: {
        orientation: 'vertical',
        includeTargets: true,
        showOrdering: true,
        choiceLabel: 'Choices',
        targetLabel: 'Targets'
      }
    }
  ]
}