import * as React from 'react';
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

xdescribe('Main', () => {
  const defaultProps = {
    model: {
      config: {
        mode: 'advanced',
        feedback: {
          correct: {
            default: 'Correct',
            type: 'none'
          },
          incorrect: {
            default: 'Incorrect',
            type: 'none'
          },
          partial: {
            default: 'Nearly',
            type: 'none'
          }
        },
        equationEditor: 'everything',
        expression: 'n = {\\embed{answerBlock}[answerBlock1]}',
        question:
          '<p>The binomial <math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>x</mi><mo>&#8722;</mo><mn>2</mn> </math> is a factor of the polynomial below.</p><p><span class="equation-block"><math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup> <mi>x</mi> <mn>3</mn> </msup> <mo>+</mo><msup> <mi>x</mi> <mn>2</mn> </msup> <mo>+</mo><mi>n</mi><mi>x</mi><mo>+</mo><mn>10</mn> </math> </span></p><p>What is the value of <span class="variable">n</span>? Use the on-screen keyboard&#160;to type the correct answer in the box.</p>',
        responses: [
          {
            answer: 'n=-11',
            id: 'answerBlock1',
            alternates: {},
            validation: 'literal'
          }
        ],
        response: {
          answer: 'n=-11',
          id: 'answerBlock1',
          alternates: {},
          validation: 'literal'
        }
      }
    },
    id: '1',
    element: 'math-inline',
    correctness: {},
    onSessionChange: jest.fn(),
    session: {}
  };

  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallowChild(Main, defaultProps, 1);
  });

  it('renders correctly', () => {
    component = wrapper();

    expect(component.find(CorrectAnswerToggle).length).toEqual(1);
    expect(component.find(Feedback).length).toEqual(0);

    expect(component.state()).toEqual({
      activeAnswerBlock: '',
      session: {
        answers: {
          answerBlock1: {
            value: ''
          }
        }
      },
      showCorrect: false
    });

    expect(Mathquill.getInterface().registerEmbed).toHaveBeenCalled();
  });

  it('prepares latex correctly and answer blocks and turns them into inputs', () => {
    component = wrapper();

    expect(component.find(mq.Static).length).toEqual(1);
    expect(component.find(mq.Static).props().latex).toEqual( 'n = {\\MathQuillMathField[answerBlock1]{}}');
  });

  it('correctly renders simple interaction in case of simple mode', () => {
    component = wrapper();

    expect(component.find(mq.Static).length).toEqual(1);
    expect(component.find(SimpleQuestionBlock).length).toEqual(0);

    const simpleProps = { ...defaultProps };
    simpleProps.model.config.mode = 'simple'

    component = wrapper(simpleProps);

    expect(component.find(mq.Static).length).toEqual(0);
    expect(component.find(SimpleQuestionBlock).length).toEqual(1);
  });

  it('correctly shows the keypad', () => {
    component = wrapper();

    expect(component.find(HorizontalKeypad).length).toEqual(0);
    component.instance().onAnswerBlockClick('answerBlock1');
    expect(component.state()).toEqual({
      activeAnswerBlock: 'answerBlock1',
      session: {
        answers: {
          answerBlock1: {
            value: ''
          }
        }
      },
      showCorrect: false
    });
  });

  it('correctly updates session in case of subfield change', () => {
    component = wrapper();

    component.instance().subFieldChanged('answerBlock1', 'value');
    expect(component.state()).toEqual({
      activeAnswerBlock: '',
      session: {
        answers: {
          answerBlock1: {
            value: 'value'
          }
        }
      },
      showCorrect: false
    });
  });

  it('correctly updates session in case of model change', () => {
    component = wrapper();

    expect(component.state()).toEqual({
      activeAnswerBlock: '',
      session: {
        answers: {
          answerBlock1: {
            value: ''
          }
        }
      },
      showCorrect: false
    });

    const newProps = { ...defaultProps };

    newProps.model.config.responses = [...newProps.model.config.responses, {
      ...newProps.model.config.responses[0],
      id: 'answerBlock2'
    }];

    component.setProps(newProps);

    expect(component.state()).toEqual({
      activeAnswerBlock: '',
      session: {
        answers: {
          answerBlock1: {
            value: ''
          }
        }
      },
      showCorrect: false
    });
  });
});
