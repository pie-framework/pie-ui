import { buildState, reducer } from '../ordering';
import debug from 'debug';

const log = debug('@pie-ui:placement-ordering-element:test');

const defaultChoices = [
  { id: 0 },
  { id: 1 }
];

describe('ordering', () => {


  describe('reducer, includeTargets: false', () => {
    describe('swap', () => {
      let initialState, to, from, state;
      beforeEach(() => {
        initialState = buildState(defaultChoices, [0, 1], [], { includeTargets: false });
        from = initialState.tiles[0];
        to = initialState.tiles[1];
        state = reducer({ type: 'move', from, to }, initialState);
        log('state: ', state);
      });
      it('swaps', () => {
        expect(state.response).toEqual([1, 0]);
      });
    });
  });

  describe('reducer, includeTargets: true', () => {


    let initialState;

    describe('target -> choice', () => {

      beforeEach(() => {
        initialState = buildState(defaultChoices, [undefined, 1], { includeTargets: true });
      });

      describe('moves target back to choice', () => {
        let from, to, state;

        beforeEach(() => {
          from = initialState.tiles[3];
          to = initialState.tiles[1];
          state = reducer({ type: 'move', from, to }, initialState);
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

      beforeEach(() => {
        initialState = buildState(defaultChoices, [], [], { includeTargets: true });
      });

      describe('moves choice to target', () => {
        let from, to, state;
        beforeEach(() => {
          from = initialState.tiles[0];
          to = initialState.tiles[2];
          state = reducer({ type: 'move', from, to }, initialState);
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
        const from = initialState.tiles[0];
        const to = initialState.tiles[3];
        const state = reducer({ type: 'move', from, to }, initialState);
        expect(state.response).toEqual([undefined, 0]);
      });
    });

  });

});