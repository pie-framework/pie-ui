import { buildState, reducer } from '../ordering';
import _ from 'lodash';
import { AssertionError } from 'assert';
const defaultChoices = [{ id: 0 }, { id: 1 }];

describe('ordering', () => {
  let assertMoveFromModel;

  beforeEach(() => {
    assertMoveFromModel = (fromIndex, toIndex, response, options) => {
      const initialState = buildState(defaultChoices, response, [], options);
      let from = initialState.tiles[fromIndex];
      let to = initialState.tiles[toIndex];

      return reducer({ type: 'move', from, to }, initialState);
    };
  });

  const toLabel = a => `${a[0]}->${a[1]}`;

  const assertReducer = (choices, opts, action, a) =>
    function() {
      const choiceIds = choices.map(id => ({ id }));
      const initialState = buildState(choiceIds, [], [], opts);

      const args = Array.prototype.slice.call(arguments);
      const actions = _.initial(args);
      const expected = _.last(args);
      it(`${initialState.tiles.map(t => t.id)} + ${actions
        .map(toLabel)
        .join(', ')} = ${expected}`, () => {
        const endState = actions.reduce((state, [fromIndex, toIndex]) => {
          const from = state.tiles[fromIndex];
          const to = state.tiles[toIndex];
          return reducer({ ...action, from, to }, state);
        }, initialState);
        a(endState, expected);
        // expect(endState.tiles.map(t => t.id)).toEqual(expectedState);
      });
    };
  describe.only('reducer', () => {
    const assertSwap = assertReducer(
      [1, 2, 3, 4],
      { includeTargets: false },
      { type: 'move' },
      (s, expected) => {
        expect(s.tiles.map(t => t.id)).toEqual(expected);
      }
    );

    // assertSwap([0, 1], [2, 1, 3, 4]);
    // assertSwap([0, 1], [2, 1], [2, 3, 1, 4]);

    const assertMove = assertReducer(
      [1, 2, 3, 4],
      { includeTargets: true, allowSameChoiceInTargets: false },
      { type: 'move' },
      (s, expected) => {
        console.log('s:', s);
        // expected.choices.map(id => (id ? { id } : { empty: true }));
        expect(_.take(s.tiles, 4).map(t => t.id)).toEqual(expected.choices);
      }
    );

    assertMove([0, 4], {
      choices: [undefined, 2, 3, 4],
      targets: [1, undefined]
    });
    assertMove([0, 4], [2, 7], {
      choices: [undefined, 2, undefined, 4],
      targets: [1, undefined, undefined, 3]
    });
  });

  describe('reducer, includeTargets: false', () => {
    describe('swap', () => {
      it('swaps', () => {
        expect(
          assertMoveFromModel(0, 1, [0, 1], { includeTargets: false }).response
        ).toEqual([1, 0]);
      });
    });
  });

  describe('reducer, includeTargets: true', () => {
    describe('target -> choice', () => {
      describe('moves target back to choice', () => {
        let state;

        beforeEach(() => {
          state = assertMoveFromModel(3, 1, [undefined, 1], {
            includeTargets: true
          });
        });

        it('updates the response', () => {
          expect(state.response).toEqual([undefined, undefined]);
        });

        it('updates the tiles', () => {
          expect(state.tiles).toEqual([
            { type: 'choice', id: 0, draggable: true, droppable: false },
            { type: 'choice', id: 1, draggable: true, droppable: false },
            { type: 'target', index: 0, draggable: false, empty: true },
            { type: 'target', index: 1, draggable: false, empty: true }
          ]);
        });
      });
    });

    describe('choice -> target', () => {
      describe('moves choice to target', () => {
        let state;

        beforeEach(() => {
          state = assertMoveFromModel(0, 2, [], { includeTargets: true });
        });

        it('updates the response', () => {
          expect(state.response).toEqual([0, undefined]);
        });

        it('updates the tiles', () => {
          expect(state.tiles).toEqual([
            { type: 'choice', id: 0, draggable: true, droppable: false },
            { type: 'choice', id: 1, draggable: true, droppable: false },
            { type: 'target', index: 0, id: 0, draggable: true, empty: false },
            { type: 'target', index: 1, draggable: false, empty: true }
          ]);
        });
      });

      it('moves choice to last target', () => {
        const state = assertMoveFromModel(0, 3, [], { includeTargets: true });

        expect(state.response).toEqual([undefined, 0]);
      });
    });

    describe('choice -> target with removing tiles', () => {
      describe('moves choice to target', () => {
        let state;

        beforeEach(() => {
          state = assertMoveFromModel(0, 2, [], {
            includeTargets: true,
            allowSameChoiceInTargets: true
          });
        });

        it('updates the response', () => {
          expect(state.response).toEqual([0, undefined]);
        });

        it('updates the tiles', () => {
          expect(state.tiles).toEqual([
            { type: 'choice', draggable: false, droppable: true, empty: true },
            { type: 'choice', id: 1, draggable: true, droppable: false },
            { type: 'target', index: 0, id: 0, draggable: true, empty: false },
            { type: 'target', index: 1, draggable: false, empty: true }
          ]);
        });

        it('moves to occupied target', () => {
          state = assertMoveFromModel(1, 2, [], {
            includeTargets: true,
            allowSameChoiceInTargets: true
          });

          expect(state.tiles).toEqual([
            { type: 'choice', id: 0, draggable: true, droppable: false },
            { type: 'choice', draggable: false, droppable: true, empty: true },
            { type: 'target', index: 0, id: 1, draggable: true, empty: false },
            { type: 'target', index: 1, draggable: false, empty: true }
          ]);
        });
      });
    });
  });
});
