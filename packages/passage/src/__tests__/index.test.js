import { SessionChangedEvent } from '@pie-framework/pie-player-events';

const defaultModel = {
  title: 'title',
  content: 'content',
};

const defaultSession = { id: 1 };


describe('passage', () => {
  let Def;
  let el;

  beforeAll(() => {
    Def = require('../index').default;
  });

  beforeEach(() => {
    el = new Def();
    el.connectedCallback();
    el.tagName = 'passage-element';
    el.model = defaultModel;
    el.session = defaultSession;
  });

  describe('model', () => {
    it('should have set the model', () => {
      expect(el._model).toEqual(defaultModel);
    });
  });

  it('should have set the session', () => {
    expect(el._session).toEqual(defaultSession);
  });

  describe('session', () => {
    const dispatchesSessionEvent = (key, value) => {
      it(`${key} dispatches session changed event`, () => {
        const session = {id: key, value};
        el.dispatchSessionChanged(session, key);

        expect(el.dispatchEvent).toBeCalledWith(
          new SessionChangedEvent('passage-element', false)
        );
        expect(el._session.value[key]).toEqual(session);
      });
    };

  });
});
