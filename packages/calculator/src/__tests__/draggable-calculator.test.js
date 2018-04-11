import React from 'react';
import DraggableCalculator from '../draggable-calculator';

describe('Renders a calculator component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DraggableCalculator mode='basic' />)
  })

  it('Creates snapshot using enzyme', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('updates state.deltaPosition', () => {
    wrapper.instance().handleDrag(null, { deltaX: 10, deltaY: 10 });
    const deltaPosition = wrapper.state('deltaPosition');
    expect(deltaPosition).toEqual({ x: 10, y: 10 });
  })

});
