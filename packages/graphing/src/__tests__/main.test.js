import * as React from 'react';
import { Main } from '../main';
import { shallow } from 'enzyme/build';

describe('Main', () => {
  const defaultProps = {
    model: {
      backgroundMarks: [],
      correctMarks: [],
    },
    onSessionChange: jest.fn(),
    onAnswersChange: jest.fn(),
    session: {}
  };

  describe('render', () => {
    let w;

    beforeEach(() => {
      w = props => shallow(<Main { ...props } />);
    });

    it('snapshot', () => {
      expect(w(defaultProps)).toMatchSnapshot();
    });
  });

  describe('logic', () => {
    let w;

    beforeEach(() => {
      w = props => shallow(<Main { ...props } />);
    });

    it('calls onAnswersChange', () => {
      let wrapper = w(defaultProps);
      wrapper.instance().changeMarks([]);

      expect(wrapper.instance().props.onAnswersChange).toHaveBeenCalledWith([]);
      expect(wrapper.instance().state.model.marks).toEqual([]);
    });
  });

});
