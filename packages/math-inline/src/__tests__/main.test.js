import * as React from 'react';
import Main from '../main';
import { shallowChild } from '@pie-lib/test-utils';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';

xdescribe('Main', () => {
  const defaultProps = {
    model: {
      config: {
        responses: [],
        id: '1',
        element: 'math-inline',
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
        }
      }
    },
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
    //
    // expect(component.state()).toEqual({
    //   session: {
    //     answers: {
    //       1: [false, false],
    //       2: [false, false],
    //       3: [false, false],
    //       4: [false, false]
    //     }
    //   },
    //   showCorrect: false,
    //   shuffledRows: [{
    //     id: 1,
    //     title: 'Question Text 1',
    //     values: [false, false]
    //   }, {
    //     id: 2,
    //     title: 'Question Text 2',
    //     values: [false, false]
    //   }, {
    //     id: 3,
    //     title: 'Question Text 3',
    //     values: [false, false]
    //   }, {
    //     id: 4,
    //     title: 'Question Text 4',
    //     values: [false, false]
    //   }]
    // })
  });
});
