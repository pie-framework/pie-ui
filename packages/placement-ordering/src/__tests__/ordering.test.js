import { buildState, reducer } from '../ordering';

const defaultChoices = [
  { id: 0 },
  { id: 1 }
];

describe('ordering', () => {
  let assertMoveFromModel;

  beforeEach(() => {
    assertMoveFromModel = (fromIndex, toIndex, response, options) => {
      const initialState = buildState(defaultChoices, response, [], options);
      let from = initialState.tiles[fromIndex];
      let to = initialState.tiles[toIndex];

      return reducer({ type: 'move', from, to }, initialState);
    }
  });

  describe('reducer, includeTargets: false', () => {
    describe('swap', () => {
      it('swaps', () => {
        expect(assertMoveFromModel(0, 1, [0, 1], { includeTargets: false }).response).toEqual([1, 0]);
      });
    });
  });

  describe('reducer, includeTargets: true', () => {
    describe('target -> choice', () => {
      describe('moves target back to choice', () => {
        let state;

        beforeEach(() => {
          state = assertMoveFromModel(3, 1, [undefined, 1], { includeTargets: true });
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
          ])
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
          state = assertMoveFromModel(0, 2, [], { includeTargets: true, allowSameChoiceInTargets: true });
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
          ])
        });

        it('moves to occupied target', () => {
          state = assertMoveFromModel(1, 2, [], { includeTargets: true, allowSameChoiceInTargets: true });

          expect(state.tiles).toEqual([
            { type: 'choice', id: 0, draggable: true, droppable: false },
            { type: 'choice', draggable: false, droppable: true, empty: true },
            { type: 'target', index: 0, id: 1, draggable: true, empty: false },
            { type: 'target', index: 1, draggable: false, empty: true }
          ])
        })
      });
    });
  });
});
