import * as React from 'react';
import Main from '../main';
import { shallowChild } from '@pie-lib/test-utils';
import { shallow } from 'enzyme/build';

describe('Main', () => {
  const defaultProps = {
    model: { backgroundMarks: [], displayedTools: [], correctMarks: [] },
    onSessionChange: jest.fn(),
    session: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowChild(Main, defaultProps, 1);
  });

  describe('render', () => {
    let w;

    beforeEach(() => {
      w = props => shallow(<Main { ...props } />);
    });

    it('snapshot', () => {
      expect(w(defaultProps)).toMatchSnapshot();
    });
  });
});
