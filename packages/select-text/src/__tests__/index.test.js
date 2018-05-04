import SelectText from '..';
import React from 'react';
import ReactDOM from 'react-dom';
import { SessionChangedEvent } from '@pie-framework/pie-player-events';
jest.mock('../main', () => jest.fn());

jest.mock('react', () => ({
  createElement: jest.fn()
}));

jest.mock('react-dom', () => ({
  render: jest.fn()
}));

describe('select-text', () => {
  let c;
  beforeEach(() => {
    c = new SelectText();
    c.dispatchEvent = jest.fn();
    c.tagName = 'select-text';
    c.model = {};
    c.session = {};
  });

  describe('init', () => {
    it('calls createElement', () => {
      expect(React.createElement).toBeCalled();
    });
    it('calls render', () => {
      expect(ReactDOM.render).toBeCalled();
    });
  });

  describe('isSessionComplete', () => {
    it('returns true for non empty selectedTokens', () => {
      c.session = { selectedTokens: [{ start: 0, end: 1, text: 'f' }] };
      expect(c.isSessionComplete()).toEqual(true);
    });

    it('returns false for empty selectedTokens', () => {
      c.session = { selectedTokens: [] };
      expect(c.isSessionComplete()).toEqual(false);
    });
  });

  describe('selectionChanged', () => {
    let newTokens;
    beforeEach(() => {
      newTokens = [{ start: 2, end: 3, text: 'f' }];
      c.selectionChanged(newTokens);
    });

    it('sets the tokens', () => {
      expect(c._session.selectedTokens).toEqual(newTokens);
    });

    it('calls dispatchEvent', () => {
      expect(c.dispatchEvent).toBeCalledWith(
        new SessionChangedEvent('select-text', true)
      );
    });
  });
});
