import { expect } from 'chai';

describe('session-updater', () => {


  let updater;

  beforeEach(() => {
    updater = require('../src/session-updater');
  });
  describe('updateSessionValue', () => {

    assert = (mode, session, data, expected) => {
      return () => {
        updater.updateSessionValue(session, mode, data);
        expect(session.value).to.eql(expected);
      }
    }

    describe('checkbox', () => {
      const cb = assert.bind(null, 'checkbox');
      it('adds 1', cb({ value: [] }, { value: '1', selected: true }, ['1']));
      it('removes 1', cb({ value: ['1'] }, { value: '1', selected: false }, []));
      it('adds 2', cb({ value: ['1'] }, { value: '2', selected: true }, ['1', '2']));
      it('does not add duplicate 1', cb({ value: ['1'] }, { value: '1', selected: true }, ['1']));
      it('does not remove if not in arrary', cb({ value: ['1'] }, { value: '2', selected: false }, ['1']));

    });

    describe('radio', () => {
      const cb = assert.bind(null, 'radio');
      it('adds 1', cb({ value: [] }, { value: '1', selected: true }, ['1']));
      it('adds 2', cb({ value: ['1'] }, { value: '2', selected: true }, ['2']));
      it('does not add duplicate 1', cb({ value: ['1'] }, { value: '1', selected: true }, ['1']));
    });
  });
});