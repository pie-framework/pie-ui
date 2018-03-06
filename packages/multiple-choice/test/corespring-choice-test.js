import { assert, stub } from 'sinon';

import ChoiceInput from '../src/choice-input';
import React from 'react';
import _ from 'lodash';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import { shallow } from 'enzyme';

describe('CorespringChoice', () => {

  let wrapper, CorespringChoice, toggle;

  beforeEach(() => {

    toggle = () => {
      return <div>mocked-toggle</div>
    }

    toggle['@noCallThru'] = true;

    CorespringChoice = proxyquire('../src/corespring-choice', {
      '@pie-lib/correct-answer-toggle': toggle
    }).default;
  });

  let mkWrapper = (opts, clone = true) => {

    opts = clone ? opts = _.merge({
      choices: [],
      mode: 'gather'
    }, opts) : opts;

    return shallow(<CorespringChoice {...opts} />);
  }

  describe('render', () => {

    describe('with 2 choices', () => {
      beforeEach(() => {
        wrapper = mkWrapper({
          choices: [
            { value: 'a', label: 'label a', correct: true, feedback: 'great' },
            { value: 'b', label: 'label b' }
          ]
        });
      });

      it('has corespring-choice class', () => {
        expect(wrapper.hasClass('corespring-choice')).to.eql(true);
      });

      it('has 2 ChoiceInputs', () => {
        expect(wrapper.find(ChoiceInput)).to.have.length(2);
      });

      it('sets 2 ChoiceInput classNames to [choice]', () => {
        expect(wrapper.find('.choice')).to.have.length(2);
      });

      it('sets the last ChoiceInput className to [choice last]', () => {
        expect(wrapper.find('.choice.last')).to.have.length(1);
      });

      it('sets the label', () => {
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.label).to.eql('label a');
      });

      it('sets the displayKey on ChoiceInput', () => {
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props['displayKey']).to.eql('A');
        let second = wrapper.find(ChoiceInput).get(1);
        expect(second.props['displayKey']).to.eql('B');
      });

      it('sets the correctness when showCorrect is true', () => {
        wrapper = wrapper.setProps({ mode: 'evaluate' });
        wrapper.setState({ showCorrect: true });
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.correctness).to.eql('correct');
      });

      it('sets the correctness from outcomes', () => {
        wrapper = wrapper.setProps({ mode: 'evaluate', session: { value: ['a'] } });
        let inputs = wrapper.find(ChoiceInput);
        expect(inputs.get(0).props.correctness).to.eql('correct');
      });

      it('sets the feedback', () => {
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.feedback).to.eql('');
        wrapper = wrapper.setProps({ mode: 'evaluate', session: { value: ['a'] } });
        first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.feedback).to.eql('great');
      });
    });

    describe('prompt', () => {

      it('sets the prompt', () => {
        expect(mkWrapper({ prompt: 'hi' }).find('.prompt').text()).to.eql('hi');
      });
    });

    describe('onToggle', () => {

      it('toggles the state', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        expect(w.state('showCorrect')).to.eql(false);
        w.instance().onToggle();
        expect(w.state('showCorrect')).to.eql(true);
      });
    });

    describe('onChoiceChanged', () => {

      let onChoiceChanged, session;

      beforeEach(() => {
        onChoiceChanged = stub();

        session = {
          value: ['b']
        }

        wrapper = mkWrapper({ choices: [], session: session, onChoiceChange: onChoiceChanged }, false);
      });

      it('sets callback on inputs', () => {
        wrapper.find(ChoiceInput).forEach((n) => {
          expect(n.prop('onChange')).to.eql(onChoiceChanged);
        });
      });

    });

    describe('Toggle', () => {

      it('toggle is rendered', () => {
        expect(mkWrapper().find(toggle)).to.have.length(1);
      });

      it('toggle show is set to false', () => {
        expect(mkWrapper().find(toggle).prop('show')).to.be.false;
      });

      it('shows toggle if mode is evaluate and responseCorrect is false', () => {
        expect(mkWrapper({ mode: 'evaluate', responseCorrect: false }).find(toggle).prop('show')).to.be.true;
      });
      it('hides toggle if mode is evaluate and responseCorrect is false', () => {
        expect(mkWrapper({ mode: 'evaluate', responseCorrect: true }).find(toggle).prop('show')).to.be.false;
      });

      it('not toggled if showCorrect is false', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        w.setState({ showCorrect: false });
        expect(w.find('toggle').prop('toggled')).to.eql(false);
      });

      it('is toggled showCorrect=true && mode=evaluate', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        w.setState({ showCorrect: true });
        expect(w.find('toggle').prop('toggled')).to.eql(true);
      });
    });
  });
});