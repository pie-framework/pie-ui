const base = {
  id: '1',
  element: 'match-list-element',
  config: {
    prompt: 'Your prompt goes here',
    prompts: [{
      id: 1,
      title: 'Prompt 1',
      relatedAnswer: 1
    }, {
      id: 3,
      title: 'Prompt 3',
      relatedAnswer: 3
    }, {
      id: 4,
      title: 'Prompt 4',
      relatedAnswer: 4
    }, {
      id: 2,
      title: 'Prompt 2',
      relatedAnswer: 2
    }],
    answers: [{
      id: 1,
      title: 'Answer 1'
    }, {
      id: 2,
      title: 'Answer 2'
    }, {
      id: 3,
      title: 'Answer 3'
    }, {
      id: 4,
      title: 'Answer 4'
    }, {
      id: 5,
      title: 'Answer 5'
    }, {
      id: 6,
      title: 'Answer 6'
    }],
    shuffled: false,
    partialScoring: [],
    layout: 3,
    responseType: 'radio',
  },
  feedback: 'Incorrect'
};

const model = (id, extras) =>
  Object.assign({}, base, { id, element: 'match-list-element' }, extras);

module.exports = {
  elements: {
    'match-list-element': '..'
  },
  models: [
    model('1', {
      mode: 'gather',
    }),
    model('2', {
      mode: 'view',
    }),
    model('3', {
      mode: 'evaluate',
      correctness: { correctness: 'incorrect' },
    })
  ]
};
