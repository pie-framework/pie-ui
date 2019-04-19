import * as React from 'react';
import { shallow } from 'enzyme';
import isArray from 'lodash/isArray';
import { AnswerList } from '../answer-list';
import { model, answer } from '../../demo/config';

describe('AnswerList', () => {
  const defaultProps = {
    model: model('1'),
    session: {},
    classes: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AnswerList {...defaultProps} />);
  });

  describe('render', () => {
    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('logic', () => {
    describe('getCorrectOrIncorrectArray', () => {
      const mkTestForFn = (title, extraProps, val) => {
        it(title, () => {
          wrapper.setProps({
            ...defaultProps,
            ...extraProps
          });

          const value = wrapper.instance().getCorrectOrIncorrectArray();

          expect(isArray(value)).toBe(true);
          expect(value).toEqual(val);
        });
      };

      mkTestForFn(
        'returns an empty array for modes different than evaluate',
        {
          model: model('1', {
            mode: 'gather'
          })
        },
        []
      );

      mkTestForFn(
        'returns an empty array for modes different than evaluate',
        {
          model: model('1', {
            mode: 'gather'
          })
        },
        []
      );

      mkTestForFn(
        'returns an array appropriate values when mode is evaluate',
        {
          model: model('1', {
            mode: 'evaluate'
          })
        },
        [false, false, false, false]
      );

      mkTestForFn(
        'returns an array with appropriate values',
        {
          model: model('1', {
            mode: 'evaluate'
          }),
          session: {
            value: [1, 3, 4, 2]
          }
        },
        [true, true, true, true]
      );

      mkTestForFn(
        'returns an array with true as value for each index when showCorrect is true',
        {
          model: model('1', {
            mode: 'evaluate'
          }),
          showCorrect: true
        },
        [true, true, true, true]
      );

    });

    describe('getAnswerFromSession', () => {
      const mkTestForFn = (title, extraProps, index, val) => {
        const indexes = isArray(index) ? index : [index];
        const values = isArray(val) ? val : [val];

        it(title, () => {
          wrapper.setProps({
            ...defaultProps,
            ...extraProps
          });

          indexes.forEach((i, key) => {
            const value = wrapper.instance().getAnswerFromSession(i);

            expect(value).toEqual(values[key]);
          });
        });
      };

      mkTestForFn(
        'returns an empty object for an empty session',
        {
          model: model('1', {
            mode: 'gather'
          })
        },
        0,
        {}
      );

      mkTestForFn(
        'returns an appropriate answer for filled session',
        {
          model: model('1', {
            mode: 'gather'
          }),
          session: { value: [2, 1, 4, 3] }
        },
        0,
        { id: 2, title: "Answer 2" }
      );

      mkTestForFn(
        'returns all correct values when showCorrect is true',
        {
          model: model('1', {
            mode: 'gather',
            showCorrect: true
          }),
          session: { value: [1, 3, 4, 2] }
        },
        [0, 1, 2, 3],
        [answer(1), answer(3), answer(4), answer(2)]
      );

    });
  });
});
