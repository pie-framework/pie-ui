import Categorize from '../index';
import {
  ModelSetEvent,
  SessionChangedEvent
} from '@pie-framework/pie-player-events';

jest.mock('@pie-lib/math-rendering', () => ({ renderMath: jest.fn() }));

describe('categorize', () => {
  describe('events', () => {
    describe('model', () => {
      it('dispatches model set event', () => {
        const el = new Categorize();
        el.tagName = 'categorize-el';
        el.model = {};
        expect(el.dispatchEvent).toBeCalledWith(
          new ModelSetEvent('categorize-el', false, true)
        );
      });
    });
    describe('changeAnswers', () => {
      it('dispatches session changed event', () => {
        const el = new Categorize();
        el.tagName = 'categorize-el';
        el.session = { answers: [] };
        el.changeAnswers([{ foo: 'bar' }]);
        expect(el.dispatchEvent).toBeCalledWith(
          new SessionChangedEvent('categorize-el', true)
        );
      });
    });
  });
});
