import * as React from 'react';
import { shallow } from 'enzyme';
import Main from '../main';
import { mq, HorizontalKeypad } from '@pie-lib/math-input';
import { shallowChild } from '@pie-lib/test-utils';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import SimpleQuestionBlock from '../simple-question-block';

const Mathquill = require('@pie-framework/mathquill');

jest.mock('@pie-framework/mathquill', () => ({
  StaticMath: jest.fn().mockReturnValue({
    latex: jest.fn()
  }),
  registerEmbed: jest.fn(),
  getInterface: jest.fn().mockReturnThis()
}));

describe('Math-Inline Main', () => {
  const defaultProps = {
    onSessionChange: jest.fn(),
    session: {
      answers: {
        r1: {
          value: ''
        },
        r2: {
          value: ''
        },
        r3: {
          value: ''
        },
        r4: {
          value: ''
        }
      }
    },
    model: {
      id: '1',
      element: 'math-inline',
      correctness: {},
      config: {
        responseType: 'Advanced Multi',
        element: 'math-inline',
        question:
          '<p>The binomial <math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>x</mi><mo>&#8722;</mo><mn>2</mn> </math> is a factor of the polynomial below.</p><p><span class="equation-block"><math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup> <mi>x</mi> <mn>3</mn> </msup> <mo>+</mo><msup> <mi>x</mi> <mn>2</mn> </msup> <mo>+</mo><mi>n</mi><mi>x</mi><mo>+</mo><mn>10</mn> </math> </span></p><p>What is the value of <span class="variable">n</span>? Use the on-screen keyboard&#160;to type the correct answer in the box.</p>',
        expression:
          '\\text{A family sized box contains} {{response}} \\text{less than} {{response}} \\text{times the number  }' +
          '  \\frac{3}{6}=\\frac{ {{response}} }{4} + \\frac{ {{response}} }{4}',
        equationEditor: 'everything',
        responses: [
          {
            validation: 'literal',
            answer: '\\frac{3}{6}=\\frac{1}{2}',
            alternates: {}
          }
        ],
        feedback: {
          correct: {
            type: 'none',
            default: 'Correct'
          },
          partial: {
            type: 'none',
            default: 'Nearly'
          },
          incorrect: {
            type: 'none',
            default: 'Incorrect'
          }
        },
        customKeys: ['\\left(\\right)', '\\frac{}{}', 'x\\frac{}{}']
      }
    }
  };

  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallow(<Main {...defaultProps} />);
    component = shallowChild(Main, defaultProps, 1);
  });

  describe('render', () => {
    it('renders correctly with snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
      expect(wrapper.dive().find(CorrectAnswerToggle).length).toEqual(1);
      expect(wrapper.dive().find(Feedback).length).toEqual(0);

      expect(wrapper.dive().state()).toEqual({
        activeAnswerBlock: ''
      });

      expect(Mathquill.getInterface().registerEmbed).toHaveBeenCalled();
    });
  });

  describe('logic', () => {
    it('prepares latex correctly and answer blocks and turns them into inputs', () => {
      expect(wrapper.dive().find(mq.Static).length).toEqual(1);
      expect(
        wrapper
          .dive()
          .find(mq.Static)
          .props().latex
      ).toEqual(
        '\\text{A family sized box contains} \\MathQuillMathField[r1]{} \\text{less than} \\MathQuillMathField[r2]{} \\text{times the number  }  \\frac{3}{6}=\\frac{ \\MathQuillMathField[r3]{} }{4} + \\frac{ \\MathQuillMathField[r4]{} }{4}'
      );
    });

    it('correctly renders simple interaction in case of simple mode', () => {
      expect(wrapper.dive().find(mq.Static).length).toEqual(1);
      expect(wrapper.dive().find(SimpleQuestionBlock).length).toEqual(0);

      const simpleProps = { ...defaultProps };
      simpleProps.model.config.responseType = 'Simple';

      wrapper.setProps(simpleProps);

      expect(wrapper.dive().find(mq.Static).length).toEqual(0);
      expect(wrapper.dive().find(SimpleQuestionBlock).length).toEqual(1);
    });

    it('correctly shows the keypad', () => {
      wrapper = component();

      expect(wrapper.find(HorizontalKeypad).length).toEqual(0);
      wrapper.instance().onSubFieldFocus('r1');
      expect(wrapper.state()).toEqual({
        activeAnswerBlock: 'r1'
      });
    });

    it('correctly keeps the keypad open', () => {
      wrapper = component();

      expect(wrapper.find(HorizontalKeypad).length).toEqual(0);
      wrapper.instance().onSubFieldFocus('r1');
      wrapper.instance().onBlur({
        relatedTarget: { offsetParent: 'editor1'},
        currentTarget: { offsetParent: 'editor1'}
      });
      expect(wrapper.state().activeAnswerBlock).toEqual('r1');
    });

    it('correctly hides the keypad', () => {
      wrapper = component();

      expect(wrapper.find(HorizontalKeypad).length).toEqual(0);
      wrapper.instance().onBlur({
        relatedTarget: { offsetParent: 'editor1'},
        currentTarget: { offsetParent: 'editor2'}
      });
      expect(wrapper.state().activeAnswerBlock).toEqual('');
    });

    it('correctly updates session in case of model change', () => {
      const sessionChangeFn = jest.fn();
      wrapper = component({
        onSessionChange: sessionChangeFn
      });

      wrapper.instance().subFieldChanged('r1', 'value');
      expect(wrapper.state()).toEqual({
        activeAnswerBlock: ''
      });
      expect(sessionChangeFn).toHaveBeenCalledWith({
        answers: {
          r1: {
            value: 'value'
          },
          r2: {
            value: ''
          },
          r3: {
            value: ''
          },
          r4: {
            value: ''
          }
        }
      });
    });

    it('correctly updates session in case of subfield change', () => {
      wrapper = component();

      expect(wrapper.state()).toEqual({
        activeAnswerBlock: ''
      });

      const newProps = { ...defaultProps };

      newProps.model.config.expression =
        defaultProps.model.config.expression + ' {{response}}';

      wrapper.setProps(newProps);

      expect(wrapper.state()).toEqual({
        activeAnswerBlock: ''
      });
    });
  });
});
