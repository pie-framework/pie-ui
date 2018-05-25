import { shallow } from 'enzyme';
import React from 'react';

import { Content } from '../index';

describe('Content', () => {
  let w;
  let onChange = jest.fn();
  const wrapper = extras => {
    const defaults = {
      classes: {
        content: 'content',
        holder: 'holder'
      },
      className: 'className',
      onChange,
      content: [
        'test',
        {
          id: '1',
          choice: {
            id: '1',
            content: 'foo'
          }
        }
      ]
    };
    const props = { ...defaults, ...extras };
    return shallow(<Content {...props} />);
  };
  describe('snapshot', () => {
    it('renders', () => {
      w = wrapper();
      expect(w).toMatchSnapshot();
    });
  });
  describe('logic', () => {});
});
