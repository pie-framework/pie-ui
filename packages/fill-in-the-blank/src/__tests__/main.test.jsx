import { shallow } from 'enzyme';
import React from 'react';

import { Main } from '../main';
import { addChoice, removeChoice } from '../builder';

jest.mock('../builder', () => {
  return {
    addChoice: jest.fn((choiceId, blankId, answers) => answers),
    buildContent: jest.fn(() => []),
    removeChoice: jest.fn((choiceId, blankId, answers) => answers)
  };
});

describe('Main', () => {
  let w;
  let onAnswersChange = jest.fn();

  const wrapper = extras => {
    const defaults = {
      classes: {},
      onAnswersChange,
      uid: '1',
      model: {
        content: ['test', { id: '1' }],
        choices: [{ id: '1', content: 'foo' }]
      },
      session: {},
      className: 'className'
    };
    const props = { ...defaults, ...extras };
    return shallow(<Main {...props} />);
  };

  describe('snapshot', () => {
    it('renders', () => {
      w = wrapper();
      expect(w).toMatchSnapshot();
    });
  });

  describe('logic', () => {
    beforeEach(() => {
      w = wrapper();
    });

    describe('dropChoice', () => {
      it('calls addChoice', () => {
        w.instance().dropChoice('1', { id: '1', blankId: null });
        expect(addChoice).toBeCalledWith('1', '1', [], expect.anything(), null);
      });
      it('calls onAnswersChange', () => {
        w.instance().dropChoice('1', { id: '1', blankId: null });
        expect(onAnswersChange).toBeCalledWith([]);
      });
    });

    describe('removeChoice', () => {
      it('calls removeChoice', () => {
        w.instance().removeChoice('blank:1', { id: '1' });
        expect(removeChoice).toBeCalledWith('1', 'blank:1', []);
      });
      it('calls onAnswersChange', () => {
        w.instance().removeChoice('blank:1', { id: '1' });
        expect(onAnswersChange).toBeCalledWith([]);
      });
    });
  });
});
