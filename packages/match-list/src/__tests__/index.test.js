import { isComplete } from '../index';
const session = value => ({
  value
});

describe('isComplete', () => {
  const assertIsComplete = (session, model, expected) => {
    it(`${JSON.stringify(session.value)}, ${JSON.stringify(
      model.config.prompts
    )} = ${expected}`, () => {
      const result = isComplete(session, model);
      expect(result).toEqual(expected);
    });
  };

  assertIsComplete(session([1]), { config: { prompts: [{ id: '0' }] } }, true);
  assertIsComplete(
    session([1, 2]),
    { config: { prompts: [{ id: '0' }] } },
    false
  );
  assertIsComplete(
    session([1, 2]),
    { config: { prompts: [{ id: '1' }] } },
    false
  );
  assertIsComplete(
    session([1, 2]),
    { config: { prompts: [{ id: '0' }, { id: '1' }] } },
    true
  );
});
