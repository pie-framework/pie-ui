const base = {
  id: '1',
  element: 'match-list-element',
  config: {
    prompt: 'Your prompt goes here',
    answers: [{
      id: 1,
      title: 'Answer 1',
      relatedPrompt: 1
    }, {
      id: 2,
      title: 'Answer 2',
      relatedPrompt: 2
    }, {
      id: 3,
      title: 'Answer 3',
      relatedPrompt: 3
    }, {
      id: 4,
      title: 'Answer 4',
      relatedPrompt: 4
    }, {
      id: 5,
      title: 'Answer 5'
    }, {
      id: 6,
      title: 'Answer 6'
    }],
    prompts: [{
      id: 1,
      title: 'Prompt 1'
    }, {
      id: 2,
      title: 'Prompt 2'
    }, {
      id: 3,
      title: 'Prompt 3'
    }, {
      id: 4,
      title: 'Prompt 4'
    }],
    shuffled: false,
    partialScoring: [],
    layout: 3,
    headers: ['Column 1', 'Column 2', 'Column 3'],
    responseType: 'radio',
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
  }
};

const model = (id, extras) =>
  Object.assign({}, base, { id, element: 'match-list-element' }, extras);

module.exports = {
  elements: {
    'match-list-element': '..'
  },
  models: [
    model('1', {
      disabled: false,
    })
  ]
};
