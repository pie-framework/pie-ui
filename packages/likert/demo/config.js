module.exports = {
  elements: {
    'likert-el': '..'
  },
  models: [{
    element: 'likert-el',
    id: '1',
    mode: 'gather',
    disabled: false,
    likertScale: 'likert3',
    likertType: 'agreement',
    likertOrientation: 'horizontal',
    choices: [
      {
        label: 'Disagree',
        value: -1
      },
      {
        label: 'Unsure',
        value: 0
      },
      {
        label: 'Agree',
        value: 1
      }
    ],
    prompt: 'How likely are you to report a problem?'
  }]
};
