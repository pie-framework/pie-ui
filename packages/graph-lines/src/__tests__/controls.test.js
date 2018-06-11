import * as React from 'react';
import { shallow } from 'enzyme';
import Controls from '../controls';

describe('Controls', () => {
  const defaultProps = {
    onDeleteClick: () => {},
    disabled: false,
    iconOnly: false,
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Controls {...defaultProps} />);

    expect(wrapper.props().classes).toBeDefined();
    expect(wrapper.html().includes('button')).toEqual(true);
    expect(wrapper.html().includes('Delete')).toEqual(true);
  });
});
