const base = {
  id: '1',
  element: 'match-element',
  config: {
    enableImages: true,
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
    headers: ['Column 1', 'Column 2', 'Column 3'],
    layout: 3,
    lockChoiceOrder: true,
    partialScoring: false,
    choiceMode: 'radio',
    rows: [
      {
        id: 1,
        title: 'Question Text 1',
        values: [true, false]
      },
      {
        id: 2,
        title: 'Question Text 2',
        values: [true, false]
      },
      {
        id: 3,
        title: 'Question Text 3',
        values: [false, false]
      },
      {
        id: 4,
        title: 'Question Text 4',
        values: [false, true]
      }
    ],
    promptEnabled: true,
    prompt: 'Select correct answers.',
  }
};

const model = (id, extras, configExtras = {}) => {
  const m = Object.assign({}, base, {id, element: 'match-element'}, extras);
  m.config = { ...m.config, ...configExtras };

  return m;
};

module.exports = {
  elements: {
    'match-element': '..'
  },
  models: [
    model('1', {
      disabled: false
    }, {
      choiceMode: 'checkbox'
    }),
    model('2', {
      disabled: false,
    }),
    model('3', {
      disabled: true
    }, {
      choiceMode: 'checkbox',
      correctness: {
        correctness: 'correct',
        score: '100'
      }
    }),
    model('4', {
      disabled: true,
      correctness: {
        correctness: 'correct',
        score: '100'
      }
    })
  ]
};
