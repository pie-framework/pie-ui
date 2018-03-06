import { assert, stub } from 'sinon';

import Checkbox from 'material-ui/Checkbox';
import Radio from 'material-ui/Radio';
import React from 'react';
import _ from 'lodash';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import { shallow } from 'enzyme';

describe('ChoiceInput', () => {
  let onChange, wrapper, muiTheme, mod, ChoiceInput, StyledRadio;

  beforeEach(() => {
    muiTheme = {
      correctColor: 'green',
      incorrectColor: 'red',
      checkbox: {
        disabledColor: 'grey'
      }
    }
  });

  let mkWrapper = (opts = {}) => {

    opts = _.extend({
      choiceMode: 'checkbox',
      label: 'label',
      displayKey: '1',
      correctness: 'correct',
      value: 'value',
      classes: {
        label: 'label'
      }
    }, opts);

    return shallow(<ChoiceInput
      {...opts}
      onChange={onChange}
      muiTheme={muiTheme}
    />, {});

  }

  beforeEach(() => {
    mod = proxyquire('../src/choice-input', {});
    ChoiceInput = mod.ChoiceInput;
    StyledRadio = mod.StyledRadio;

    onChange = stub();
    wrapper = mkWrapper();
  });

  describe('render', () => {

    describe('radio', () => {
      beforeEach(() => {
        wrapper = mkWrapper({ choiceMode: 'radio' });
      });

      it('has a .corespring-radio-button class', () => {
        expect(wrapper.hasClass('corespring-radio-button')).to.eql(true);
      });

      it('has a checkbox-holder', () => {
        let holder = wrapper.find('.checkbox-holder');
        expect(holder).to.have.length(1);
      });

      it('sets the label index', () => {
        let rb = wrapper.find(mod.StyledFormControlLabel);
        expect(rb.prop('label')).to.eql('1. ');
      });

      it('sets the label html', () => {
        let l = wrapper.find('[className="label"]');
        let danger = l.prop('dangerouslySetInnerHTML');
        expect(danger).to.eql({ __html: 'label' });
      });
    });

    describe('checkbox', () => {

      it('has .corespring-checkbox class', () => {
        expect(wrapper.hasClass('corespring-checkbox')).to.eql(true);
      });

      it('has a checkbox-holder', () => {
        let holder = wrapper.find('.checkbox-holder');
        expect(holder).to.have.length(1);
      });

      it('sets the label html', () => {
        let l = wrapper.find('[className="label"]');
        let danger = l.prop('dangerouslySetInnerHTML');
        expect(danger).to.eql({ __html: 'label' });
      });
    });
  });

  describe('onToggleChoice', () => {

    it('calls handler', () => {
      wrapper.instance().onToggleChoice({ target: { checked: true } });
      assert.calledWith(onChange, { value: 'value', selected: true });
    });
  });

});