import React from 'react';
import Main from '../main';

test('render a calculator component', () => {
  const model = { mode: 'basic' };
  const wrapper = shallow(
    <Main model={model} />
  );
  expect(wrapper).toMatchSnapshot();
});