import { buildState, reducer } from '../ordering';
import _ from 'lodash';
import { AssertionError } from 'assert';
const defaultChoices = [{ id: 0 }, { id: 1 }];

describe('ordering', () => {
  const toLabel = a => `${a[0]}->${a[1]}`;

  const choice = id => ({
    type: 'choice',
    id,
    draggable: true,
    droppable: false
  });

  const target = (id, index) => ({
    id,
    index,
    type: 'target',
    draggable: id !== undefined,
    empty: id === undefined
  });

  const buildArgs = choiceArg => {
    if (Array.isArray(choiceArg)) {
      return {
        choices: choiceArg,
        response: [],
        outcome: []
      };
    } else {
      return { response: [], outcome: [], ...choiceArg };
    }
  };

  const assertReducer = (firstArg, opts, action, a, mkLabel) =>
    function() {
      const { choices, response, outcome } = buildArgs(firstArg);
      const choiceIds = choices.map(id => ({ id }));
      const initialState = buildState(choiceIds, response, outcome, opts);

      const args = Array.prototype.slice.call(arguments);
      const actions = _.initial(args);
      const expected = _.last(args);

      const label = mkLabel
        ? mkLabel(initialState, actions, expected)
        : 'works';

      it(label, () => {
        const endState = actions.reduce((state, [fromIndex, toIndex]) => {
          const from = state.tiles[fromIndex];
          const to = state.tiles[toIndex];
          return reducer({ ...action, from, to }, state);
        }, initialState);
        a(endState, expected);
      });
    };

  describe('reducer', () => {
    describe('swap', () => {
      const assertSwapLabel = (i, actions, e) =>
        `${i.tiles.map(t => t.id)} + ${actions.map(toLabel).join(', ')} = ${e}`;

      const assertSwap = assertReducer(
        [1, 2, 3, 4],
        { includeTargets: false },
        { type: 'move' },
        (s, expected) => {
          expect(s.tiles.map(t => t.id)).toEqual(expected);
        },
        assertSwapLabel
      );

      assertSwap([0, 1], [2, 1, 3, 4]);
      assertSwap([0, 1], [2, 1], [2, 3, 1, 4]);
    });

    describe('move - with targets', () => {
      const assertMoveLabel = (i, actions, expected) => {
        const tiles = _.take(i.tiles, 4).map(t => t.id);
        return `${tiles} + ${actions.map(toLabel)} = ${expected.choices.map(
          c => c || '_'
        )}|${expected.targets.map(t => t || '_')}`;
      };
      const assertMove = allowSameChoiceInTargets =>
        assertReducer(
          [1, 2, 3, 4],
          { includeTargets: true, allowSameChoiceInTargets },
          { type: 'move' },
          (s, expected) => {
            let [choiceTiles, targetTiles] = _.chunk(s.tiles, 4);
            expect(choiceTiles.map(t => t.id)).toEqual(expected.choices);
            expect(targetTiles.map(t => t.id)).toEqual(expected.targets);
          },
          assertMoveLabel
        );

      assertMove(false)([0, 4], {
        choices: [undefined, 2, 3, 4],
        targets: [1, undefined, undefined, undefined]
      });
      assertMove(true)([0, 4], {
        choices: [1, 2, 3, 4],
        targets: [1, undefined, undefined, undefined]
      });
      assertMove(false)([0, 4], [2, 7], {
        choices: [undefined, 2, undefined, 4],
        targets: [1, undefined, undefined, 3]
      });
    });

    describe('tiles have all the props', () => {
      let state;

      const assertFullProps = assertReducer(
        [1, 2],
        { includeTargets: true, allowSameChoiceInTargets: true },
        { type: 'move' },
        (s, expected) => {
          expect(s.tiles).toEqual(expected);
        }
      );

      assertFullProps(
        [0, 3],
        [choice(1), choice(2), target(undefined, 0), target(1, 1)]
      );
    });

    describe('1,2|_,_', () => {
      const assertResponse = assertReducer(
        [1, 2],
        { includeTargets: true, allowSameChoiceInTargets: true },
        { type: 'move' },
        (s, expected) => {
          expect(s.response).toEqual(expected);
        },
        (s, actions, expected) => {
          return `${actions.map(toLabel)} = response: ${expected.map(
            v => v || '_'
          )}`;
        }
      );
      assertResponse([0, 3], [undefined, 1]);
      assertResponse([0, 2], [1, undefined]);
    });

    describe('1,2 | _,1', () => {
      const assertTargetToChoice = assertReducer(
        { choices: [1, 2], response: [undefined, 1] },
        { includeTargets: true, allowSameChoiceInTargets: true },
        { type: 'move' },
        (s, expected) => {
          expect(s.response).toEqual(expected);
        },
        (s, actions, expected) => {
          return `${actions.map(toLabel)} = response: ${expected.map(
            v => v || '_'
          )}`;
        }
      );

      assertTargetToChoice([3, 0], [undefined, undefined]);
      assertTargetToChoice([3, 1], [undefined, undefined]);
      assertTargetToChoice([3, 2], [1, undefined]);
    });
  });
});
