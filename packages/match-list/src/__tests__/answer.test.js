import * as React from 'react';
import { shallow } from 'enzyme';
import { Answer } from '../answer';
import { model } from '../../demo/config';

describe('Answer', () => {
  const defaultProps = {
    model: model('1'),
    session: {},
    classes: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Answer {...defaultProps} />);
  });

  describe('render', () => {
    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
