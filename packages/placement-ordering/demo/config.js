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
    }
  ]
};
