import { shallow } from 'enzyme';
import React from 'react';
import { Blank, spec } from '../blank';

describe('Blank', () => {
  let w;
  let onChange = jest.fn();
  const wrapper = extras => {
    const defaults = {
      classes: {},
      className: 'className',
      onChange,
      connectDropTarget: jest.fn(n => n),
      id: '1',
      choice: {
        id: '1',
        content: 'foo'
      },
      onRemoveChoice: jest.fn()
    };
    const props = { ...defaults, ...extras };
    return shallow(<Blank {...props} />);
  };
  describe('snapshot', () => {
    it('renders', () => {
      w = wrapper();
      expect(w).toMatchSnapshot();
    });
  });

  describe('spec', () => {
    describe('drop', () => {
      let item, monitor, props;

      beforeEach(() => {
        item = {
          id: '1'
        };

        monitor = {
          getItem: jest.fn(() => item)
        };
        props = {
          onDropChoice: jest.fn()
        };
      });
      it('calls onDropChoice', () => {
        spec.drop(props, monitor);
        expect(props.onDropChoice).toBeCalledWith(item);
      });
    });

    describe('canDrop', () => {
      it('returns false if has choice', () => {
        expect(spec.canDrop({ choice: {} })).toEqual(false);
      });

      it('returns false if disabled true', () => {
        expect(spec.canDrop({ disabled: true })).toEqual(false);
      });

      it('returns true if disabled false', () => {
        expect(spec.canDrop({ disabled: false })).toEqual(true);
      });

      it('returns false if disabled false and there is a choice', () => {
        expect(spec.canDrop({ disabled: false, choice: {} })).toEqual(false);
      });
    });
  });
});
