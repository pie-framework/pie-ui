const prompt = (id, relatedAnswer) => ({
  id,
  title: `Prompt ${id}`,
  relatedAnswer
});

const answer = (id) => ({
  id,
  title: `Answer ${id}`
});

const base = {
  element: 'match-list',
  config: {
    prompt: 'Your prompt goes here',
    prompts: [prompt(1, 1), prompt(3, 3), prompt(4, 4), prompt(2, 2)],
    answers: [answer(1), answer(2), answer(3), answer(4), answer(5), answer(6)]
  },
  feedback: 'Incorrect'
};

const model = (id, extras) =>
  Object.assign({}, base, { id, element: 'match-list' }, extras);

module.exports = {
  elements: {
    'match-list': '..'
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
module.exports.model = model;
module.exports.answer = answer;
