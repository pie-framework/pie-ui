import ChoiceInput from '../choice-input';
import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { MultipleChoice } from '../multiple-choice';
import toJson from 'enzyme-to-json';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import correctAnswerToggle from '../../__mocks__/@pie-lib/correct-answer-toggle';

describe('CorespringChoice', () => {
  let wrapper, toggle;

  beforeEach(() => {
    toggle = () => {
      return <div>mocked-toggle</div>;
    };
  });

  let mkWrapper = (opts, clone = true) => {
    opts = clone
      ? (opts = _.merge(
          {
            classes: {},
            choices: [],
            disabled: false,
            onChoiceChanged: jest.fn(),
            mode: 'gather'
          },
          opts
        ))
      : opts;

    return shallow(<MultipleChoice {...opts} />);
  };

  describe('snapshot', () => {
    it('renders', () => {
      wrapper = mkWrapper({
        choices: [
          { value: 'a', label: 'label a', correct: true, feedback: 'great' },
          { value: 'b', label: 'label b' }
        ]
      });

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('onToggle', () => {
      it('toggles the state', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        expect(w.state('showCorrect')).toEqual(false);
        w.instance().onToggle();
        expect(w.state('showCorrect')).toEqual(true);
      });
    });

    describe('Toggle', () => {
      it('toggle is rendered', () => {
        const t = mkWrapper().find(CorrectAnswerToggle);
        expect(t.length).toEqual(1);
      });

      it('toggle show is set to false', () => {
        expect(
          mkWrapper()
            .find(CorrectAnswerToggle)
            .prop('show')
        ).toEqual(false);
      });

      it('shows toggle if mode is evaluate and responseCorrect is false', () => {
        expect(
          mkWrapper({ mode: 'evaluate', responseCorrect: false })
            .find(CorrectAnswerToggle)
            .prop('show')
        ).toEqual(true);
      });

      it('hides toggle if mode is evaluate and responseCorrect is false', () => {
        expect(
          mkWrapper({ mode: 'evaluate', responseCorrect: true })
            .find(CorrectAnswerToggle)
            .prop('show')
        ).toEqual(false);
      });

      it('not toggled if showCorrect is false', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        w.setState({ showCorrect: false });
        expect(w.find(correctAnswerToggle).prop('toggled')).toEqual(false);
      });

      it('is toggled showCorrect=true && mode=evaluate', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        w.setState({ showCorrect: true });
        expect(w.find(CorrectAnswerToggle).prop('toggled')).toEqual(true);
      });
    });
  });
});
