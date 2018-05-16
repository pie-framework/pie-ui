import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { ChoiceInput, StyledRadio, StyledCheckbox } from '../choice-input';
import toJson from 'enzyme-to-json';

describe('ChoiceInput', () => {
  let onChange, wrapper;

  const mkWrapper = (opts = {}) => {
    opts = _.extend(
      {
        checked: false,
        disabled: false,
        choiceMode: 'checkbox',
        label: 'label',
        displayKey: '1',
        correctness: 'correct',
        value: 'value',
        classes: {
          label: 'label'
        }
      },
      opts
    );

    return shallow(<ChoiceInput {...opts} onChange={onChange} />);
  };

  beforeEach(() => {
    onChange = jest.fn();
    wrapper = mkWrapper();
  });

  describe('snapshots', () => {
    describe('radio', () => {
      it('renders', () => {
        const wrapper = mkWrapper({ choiceMode: 'radio' });
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });

    describe('checkbox', () => {
      it('renders', () => {
        const wrapper = mkWrapper({ choiceMode: 'checkbox' });
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });
  });

  describe('onToggleChoice', () => {
    it('calls handler', () => {
      wrapper.instance().onToggleChoice({ target: { checked: true } });
      expect(onChange).toBeCalledWith({
        value: 'value',
        selected: true
      });
    });
  });
});
