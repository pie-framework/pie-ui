import {
  countChosen,
  buildState,
  moveChoiceToCategory,
  removeChoiceFromCategory
} from '../builder';
import util from 'util';

describe('builder', () => {
  const cat = id => ({ id });
  const choice = (id, categoryCount, correct) => {
    const out = { id, categoryCount };

    if (correct === false || correct === true) {
      out.correct = correct;
    }
    return out;
  };
  const answer = (category, choices) => {
    const c = choices ? (Array.isArray(choices) ? choices : [choices]) : [];
    return { category, choices: c };
  };

  describe('countChosen', () => {
    const cat = ids => ({
      choices: ids.map(i => ({ id: i }))
    });
    const assert = (choice, categories, expected) => {
      const l = (categories || []).map(c => c.choices || []);

      it(`${JSON.stringify(choice)} + ${JSON.stringify(
        l
      )} = ${expected}`, () => {
        expect(countChosen(choice, categories)).toEqual(expected);
      });
    };

    assert(null, null, 0);
    assert({}, null, 0);
    assert({ id: '1' }, [], 0);
    assert({ id: '1' }, [{ choices: undefined }], 0);
    assert({ id: '1' }, [cat(['1'])], 1);
    assert({ id: '1' }, [cat(['1', '1'])], 2);
    assert({ id: '1' }, [cat(['1', '2'])], 1);
    assert({ id: '1' }, [cat(['1']), cat(['1'])], 2);
  });

  describe('removeChoiceFromCategory', () => {
    const assert = (choiceId, categoryId, choiceIndex, answers, expected) => {
      it(`remove choice:${choiceId} from category:${categoryId} == ${util.inspect(
        expected,
        { colors: true }
      )}`, () => {
        const result = removeChoiceFromCategory(
          choiceId,
          categoryId,
          choiceIndex,
          answers
        );
        expect(result).toEqual(expected);
      });
    };
    assert('1', '1', 0, [answer('1', ['1'])], [answer('1', [])]);

    assert(
      '1',
      '1',
      0,
      [answer('1', ['1']), answer('2', ['1', '1'])],
      [answer('1', []), answer('2', ['1', '1'])]
    );

    assert(
      '1',
      '1',
      3,
      [answer('1', ['1', '2', '3', '1'])],
      [answer('1', ['1', '2', '3'])]
    );
  });

  describe('moveChoiceToCategory', () => {
    const assert = (choiceId, from, to, choiceIndex, answers, expected) => {
      it(`move choice:${choiceId} from category:${from} -> category:${to} == ${util.inspect(
        expected,
        { colors: true }
      )}`, () => {
        const result = moveChoiceToCategory(
          choiceId,
          from,
          to,
          choiceIndex,
          answers
        );
        expect(result).toEqual(expected);
      });
    };
    assert(
      '1',
      '1',
      '2',
      0,
      [answer('1', ['1'])],
      [answer('1', []), answer('2', ['1'])]
    );
    assert(
      '1',
      undefined,
      '2',
      0,
      [answer('1', ['1'])],
      [answer('1', ['1']), answer('2', ['1'])]
    );
  });

  describe('buildState', () => {
    const _a = (
      only,
      label,
      categories,
      choices,
      answers,
      correctResponse,
      expected
    ) => {
      const fn = only ? it.only : it;
      fn(label, () => {
        const result = buildState(
          categories,
          choices,
          answers,
          correctResponse
        );
        expect(result).toMatchObject(expected);
      });
    };
    const assert = _a.bind(_a, false);
    assert.only = _a.bind(_a, true);

    assert(
      '1 category, 1 choice, 1 answer, no correct response',
      [cat('1')],
      [choice('1')],
      [answer('1', '1')],
      [],
      {
        categories: [{ ...cat('1'), choices: [choice('1')] }],
        choices: [choice('1')]
      }
    );

    assert(
      '1 category, 1 unlimited choice, no answer, no correct response',
      [cat('1')],
      [choice('2')],
      [],
      [],
      {
        categories: [{ ...cat('1'), choices: [] }],
        choices: [choice('2')]
      }
    );

    assert(
      '2 categories, 1 unlimited choice, 2 answers, no correct response',
      [cat('1'), cat('2')],
      [choice('1', 0)],
      [answer('1', ['1']), answer('2', ['1'])],
      [],
      {
        categories: [
          { ...cat('1'), choices: [choice('1', 0)] },
          { ...cat('2'), choices: [choice('1', 0)] }
        ],
        choices: [choice('1', 0)]
      }
    );

    assert(
      '2 categories, 1 choice, 1 answer, no correct response',
      [cat('1'), cat('2')],
      [choice('1', 0)],
      [answer('1', ['1'])],
      [],
      {
        categories: [
          { ...cat('1'), choices: [choice('1', 0)] },
          {
            ...cat('2'),
            choices: []
          }
        ],
        choices: [{ ...choice('1', 0) }]
      }
    );

    assert(
      '2 categories, 1 choices, 1 incorrect answer, 1 correct response',
      [cat('1'), cat('2')],
      [choice('1', 0)],
      [answer('1', ['1'])],
      [answer('2', ['1'])],
      {
        categories: [
          { ...cat('1'), choices: [choice('1', 0, false)] },
          {
            ...cat('2'),
            choices: []
          }
        ],
        choices: [{ ...choice('1', 0) }]
      }
    );

    assert(
      '1 cat, 1 choice, 1 answer, 1 correct response',
      [cat('1')],
      [choice('1', 0)],
      [answer('1', ['1'])],
      [answer('1', ['1'])],
      {
        categories: [
          {
            ...cat('1'),
            choices: [choice('1', 0, true)]
          }
        ],
        choices: [{ ...choice('1', 0) }]
      }
    );

    assert(
      '1 cat, 1 choice, 2 same answers (correct), 2 correct responses',
      [cat('1')],
      [choice('1', 0)],
      [answer('1', ['1', '1'])],
      [answer('1', ['1', '1'])],
      {
        categories: [
          {
            ...cat('1'),
            choices: [choice('1', 0, true), choice('1', 0, true)]
          }
        ],
        choices: [{ ...choice('1', 0) }]
      }
    );

    assert(
      '1 cat, 1 choice, 2 same answers (1 correct, 1 incorrect), correct response',
      [cat('1')],
      [choice('1', 0)],
      [answer('1', ['1', '1'])],
      [answer('1', ['1'])],
      {
        categories: [
          {
            ...cat('1'),
            choices: [choice('1', 0, true), choice('1', 0, false)]
          }
        ],
        choices: [{ ...choice('1', 0) }]
      }
    );

    assert(
      '1 category, 1 limited choice , 1 correct answer, correct response',
      [cat('1')],
      [choice('1', 1)],
      [answer('1', ['1'])],
      [answer('1', ['1'])],
      {
        categories: [{ ...cat('1'), choices: [choice('1', 1, true)] }],
        choices: [{ empty: true }]
      }
    );
  });
});
