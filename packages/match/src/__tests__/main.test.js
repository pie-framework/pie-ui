import * as React from 'react';
import Main from '../main';
import { shallowChild } from '@pie-lib/test-utils';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import AnswerGrid from '../answer-grid';

describe('Main', () => {
  const defaultProps = {
    model: {
      config: {
        id: '1',
        element: 'match-element',
        rows: [{
          id: 1,
          title: 'Question Text 1',
          values: [false, false]
        }, {
          id: 2,
          title: 'Question Text 2',
          values: [false, false]
        }, {
          id: 3,
          title: 'Question Text 3',
          values: [false, false]
        }, {
          id: 4,
          title: 'Question Text 4',
          values: [false, false]
        }],
        shuffled: false,
        partialScoring: [],
        layout: 3,
        headers: ['Column 1', 'Column 2', 'Column 3'],
        choiceMode: 'radio',
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
    expect(component.find(AnswerGrid).length).toEqual(1);

    expect(component.state()).toEqual({
      session: {
        answers: {
          1: [false, false],
          2: [false, false],
          3: [false, false],
          4: [false, false]
        }
      },
      showCorrect: false,
      shuffledRows: [{
        id: 1,
        title: 'Question Text 1',
        values: [false, false]
      }, {
        id: 2,
        title: 'Question Text 2',
        values: [false, false]
      }, {
        id: 3,
        title: 'Question Text 3',
        values: [false, false]
      }, {
        id: 4,
        title: 'Question Text 4',
        values: [false, false]
      }]
    })
  });

  it('generates answers correctly from rows', () => {
    component = wrapper();

    expect(component.instance().generateAnswers({
      config: {
        layout: 3,
        rows: [{
          id: 1,
          title: 'Question Text 1',
          values: [true, false]
        }, {
          id: 4,
          title: 'Question Text 2',
          values: [false, true]
        }, {
          id: 12,
          title: 'Question Text 3',
          values: [false, false]
        }, {
          id: 9,
          title: 'Question Text 4',
          values: [true, true]
        }]
      }
    })).toEqual({
      1: [false, false],
      4: [false, false],
      12: [false, false],
      9: [false, false]
    })
  });
});
