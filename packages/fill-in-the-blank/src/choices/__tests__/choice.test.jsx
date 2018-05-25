import { shallow } from 'enzyme';
import React from 'react';
import { Choice, spec } from '../choice';

describe('Choice', () => {
  let w;
  let onChange = jest.fn();
  const wrapper = extras => {
    const defaults = {
      classes: {},
      content: 'hi',
      id: '1',
      className: 'className',
      onChange,
      connectDragSource: jest.fn(n => n)
    };

    const props = { ...defaults, ...extras };
    return shallow(<Choice {...props} />);
  };

  describe('snapshot', () => {
    it('renders', () => {
      w = wrapper();
      expect(w).toMatchSnapshot();
    });
  });

  describe('spec', () => {
    describe('canDrag', () => {
      it('returns true if !disabled', () => {
        expect(spec.canDrag({ disabled: false })).toEqual(true);
      });
      it('returns true if !disabled', () => {
        expect(spec.canDrag({ disabled: true })).toEqual(false);
      });
    });

    describe('beginDrag', () => {
      it('returns id and blankId', () => {
        expect(spec.beginDrag({ id: '1', blankId: '1' })).toEqual({
          id: '1',
          blankId: '1'
        });
      });
    });

    describe('endDrag', () => {
      let props, monitor, item;

      beforeEach(() => {
        item = {
          id: '1',
          blankId: '1'
        };
        monitor = {
          didDrop: jest.fn(() => false),
          getItem: jest.fn(() => item)
        };

        props = {
          onRemoveFromBlank: jest.fn()
        };
      });
      it('calls onRemoveFromBlank', () => {
        spec.endDrag(props, monitor);
        expect(props.onRemoveFromBlank).toBeCalledWith(item);
      });
      it('does not call onRemoveFromBlank if there is no blankId', () => {
        item.blankId = undefined;
        spec.endDrag(props, monitor);
        expect(props.onRemoveFromBlank).not.toBeCalled();
      });
      it('does not call onRemoveFromBlank if didDrop returns true', () => {
        monitor.didDrop = jest.fn(() => true);
        spec.endDrag(props, monitor);
        expect(props.onRemoveFromBlank).not.toBeCalled();
      });
    });
  });
});
