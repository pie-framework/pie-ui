module.exports = {
  elements: {
    'math-inline': '..'
  },
  models: [
    {
      id: '1',
      element: 'math-inline',
      config: {
        mode: 'advanced',
        expression: 'n = {\\embed{answerBlock}[answerBlock2]}',
        question: 'What is the equation for a slope?',
        equationEditor: 'everything',
        defaultResponse: {
          id: 'answerBlockDefault',
          validation: 'symbolic',
          answer: 'answer',
          alternates: {},
          allowSpaces: false,
          allowDecimals: false
        },
        responses: [
          {
            answer: 'n=-11',
            id: 'answerBlock2',
            alternates: {},
            validation: 'literal'
          }
        ],
        config: {
          allowPartialScores: false
        },
        response: {
          id: 'answerBlock2',
          answer: 'mx + b',
          validation: 'symbolic',
          alternates: {},
          allowSpaces: true,
          allowDecimals: true
        },
        feedback: {
          correct: {
            type: 'none',
            default: 'Correct'
          },
          partial: {
            type: 'none',
            default: 'Nearly'
          },
          incorrect: {
            type: 'none',
            default: 'Incorrect'
          }
        },
        id: '1',
        element: 'math-inline'
      },
      disabled: false,
      view: false,
      correctResponse: {}
    }
  ]
};
