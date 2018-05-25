import { buildContent, findChoice, isCorrect, addChoice } from '../builder';
import debug from 'debug';
import util from 'util';

const log = debug('@pie-ui:fill-in-the-blank:test');

const inspect = o => util.inspect(o, { colors: true });

const answer = (choice, blank) => ({ choice, blank });
const choice = (id, blankCount, content) => ({ id, blankCount, content });

describe('builder', () => {
  describe('addChoice', () => {
    const assert = (
      label,
      choiceId,
      blankId,
      answers,
      choices,
      fromBlankId,
      expected
    ) => {
      it(label, () => {
        const result = addChoice(
          choiceId,
          blankId,
          answers,
          choices,
          fromBlankId
        );
        expect(result).toMatchObject(expected);
      });
    };
    assert('add 1', '1', '1', [], [choice('1')], undefined, [answer('1', '1')]);
    assert(
      'not add - it already exists',
      '1',
      '1',
      [answer('1', '1')],
      [choice('1')],
      undefined,
      [answer('1', '1')]
    );
    assert('move it', '1', '1', [answer('1', '2')], [choice('1', 1)], '2', [
      answer('1', '1')
    ]);
  });

  describe('findChoice', () => {
    const assert = (blankId, answers, choices, index) => {
      it(`${blankId}, ${inspect(answers)}, ${inspect(
        choices
      )} -> ${index}`, () => {
        const result = findChoice(blankId, answers, choices);
        if (index === undefined) {
          expect(result).toEqual(undefined);
        } else {
          expect(result).toEqual(choices[index]);
        }
      });
    };
    assert(
      '2',
      [{ blank: '1', choice: '1' }],
      [{ id: '1', content: 'foo' }],
      undefined
    );
    assert(
      '1',
      [{ blank: '1', choice: '1' }],
      [{ id: '2', content: 'foo' }],
      undefined
    );
    assert(
      '1',
      [{ blank: '1', choice: '1' }],
      [{ id: '1', content: 'foo' }],
      0
    );
  });

  describe('isCorrect', () => {
    const assert = (blankId, answers, correctResponse, expected) => {
      it(`${blankId}, ${inspect(answers)} ${inspect(
        correctResponse
      )} -> ${expected}`, () => {
        const result = isCorrect(blankId, answers, correctResponse);
        expect(result).toEqual(expected);
      });
    };
    assert('1', [{ blank: '1', choice: '1' }], undefined, undefined);

    assert(
      '1',
      [{ blank: '2' }, { blank: '3' }, { blank: '1', choice: '1' }],
      [{ blank: '1', choice: '1' }],
      true
    );

    assert(
      '1',
      [{ blank: '1', choice: '1' }],
      [{ blank: '1', choice: '2' }],
      false
    );
    assert(
      '1',
      [{ blank: '1', choice: '1' }],
      [{ blank: '2', choice: '1' }],
      false
    );
  });

  describe('buildContent', () => {
    const assert = (label, model, answers, expected) => {
      it(label, () => {
        const result = buildContent(model, answers);

        log('result: ', JSON.stringify(result, null, '  '));
        expect(result).toMatchObject(expected);
      });
    };

    assert(
      'adds choice to blank',
      {
        content: ['test ', { id: '1' }],
        choices: [{ id: '1', content: '<p>hi</p>' }]
      },
      [{ choice: '1', blank: '1' }],
      {
        content: [
          'test ',
          {
            id: '1',
            choice: {
              id: '1',
              content: '<p>hi</p>'
            },
            correct: undefined
          }
        ]
      }
    );

    assert(
      'does not add choice to blank',
      {
        content: ['test ', { id: '1' }],
        choices: [{ id: '1', content: '<p>hi</p>' }],
        correctResponse: [{ choice: '1', blank: '1' }]
      },
      [],
      {
        content: [
          'test ',
          {
            id: '1'
          }
        ],
        choices: [{ id: '1', content: '<p>hi</p>' }]
      }
    );

    assert(
      'adds choice and correct info to blank',
      {
        content: ['test ', { id: '1' }],
        choices: [{ id: '1', content: '<p>hi</p>' }],
        correctResponse: [{ choice: '1', blank: '1' }]
      },
      [{ choice: '1', blank: '1' }],
      {
        content: [
          'test ',
          {
            id: '1',
            choice: {
              id: '1',
              content: '<p>hi</p>'
            },
            correct: true
          }
        ],
        choices: [{ id: '1', content: '<p>hi</p>' }]
      }
    );
  });
});
