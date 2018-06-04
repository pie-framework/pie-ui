import { shallow } from 'enzyme';
import React from 'react';

import { Choices } from '../index';

describe('Choices', () => {
  let w;
  let onChange = jest.fn();
  const wrapper = extras => {
    const defaults = {
      classes: {
        choices: 'choices',
        choicesContainer: 'choicesContainer',
        choiceHolder: 'choiceHolder'
      },
      className: 'className',
      onChange,
      choices: [{ id: '1', content: 'foo' }]
    };
    const props = { ...defaults, ...extras };
    return shallow(<Choices {...props} />);
  };
  describe('snapshot', () => {
    it('renders', () => {
      w = wrapper();
      expect(w).toMatchSnapshot();
    });
  });
});
