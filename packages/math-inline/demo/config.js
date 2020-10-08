module.exports = {
  elements: {
    'math-inline': '..'
  },
  models: [
    {
      id: '1',
      element: 'math-inline',
      correctness: { correctness: 'incorrect', score: '0%', correct: false },
      disabled: false,
      view: false,
      config: {
        responseType: 'Advanced Multi',
        element: 'math-inline',
        question: '...',
        prompt: 'Prompt here',
        expression: '{{response}}',
        equationEditor: 'everything',
        responses: [
          {
            validation: 'literal',
            answer: '\\frac{3}{6}=\\frac{1}{2}',
            alternates: {}
          }
        ],
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
        customKeys: ['\\left(\\right)', '\\frac{}{}', 'x\\frac{}{}']
      }
    },
    {
      id: '2',
      element: 'math-inline',
      mode: 'evaluate',
      correctness: { correctness: 'correct', score: '100%', correct: true },
      disabled: true,
      view: false,
      config: {
        responseType: 'Advanced Multi',
        element: 'math-inline',
        question: '...',
        prompt: 'Prompt here',
        expression: '{{response}}',
        equationEditor: 'everything',
        responses: [
          {
            validation: 'literal',
            answer: '\\frac{3}{6}=\\frac{1}{2}',
            alternates: {}
          }
        ],
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
        customKeys: ['\\left(\\right)', '\\frac{}{}', 'x\\frac{}{}']
      }
    }
  ]
};
