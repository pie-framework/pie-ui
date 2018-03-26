import React from 'react';
import Main from './../main'

describe('Render Main Component', () => {
  let wrapper;

  let model = {width: 100, height : 50};
  beforeEach(() => {
    wrapper = shallow(<Main model={model} onChange={() => {}} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
});