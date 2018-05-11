import { shallow } from 'enzyme';
import React from 'react';
import { Categorize } from '../index';

jest.mock('../id-context', () => ({
  withUid: jest.fn(a => a),
  Provider: jest.fn(a => a),
  generateId: jest.fn().mockReturnValue('1')
}));

describe('categorize', () => {
  let onAnswersChange;

  beforeEach(() => {
    onAnswersChange = jest.fn();
  });
  const wrapper = extras => {
    const defaults = {
      classes: {},
      session: {
        answers: []
      },
      model: {
        config: {
          choices: {
            position: 'top',
            columns: 2
          },
          categories: {
            columns: 2
          }
        },
        choices: [],
        categories: []
      },
      onAnswersChange
    };
    const props = { ...defaults, ...extras };
    return shallow(<Categorize {...props} />);
  };

  describe('snapshots', () => {
    it('renders', () => {
      expect(wrapper()).toMatchSnapshot();
    });

    it('incorrect', () => {
      expect(wrapper({ incorrect: true })).toMatchSnapshot();
    });
  });

  describe('logic', () => {
    describe('dropChoice', () => {
      it('calls onAnswersChange', () => {
        const w = wrapper();

        w.instance().dropChoice('1', { id: '1', choiceIndex: 0 });
        expect(onAnswersChange).toBeCalledWith([
          { category: '1', choices: ['1'] }
        ]);
      });
    });

    describe('removeChoice', () => {
      it('calls onAnswersChange', () => {
        const w = wrapper({
          session: { answers: [{ category: '1', choices: ['1'] }] }
        });

        w.instance().removeChoice({ id: '1', categoryId: '1', choiceIndex: 0 });

        expect(onAnswersChange).toBeCalledWith([
          { category: '1', choices: [] }
        ]);
      });
    });
  });
});
