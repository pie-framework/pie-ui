import * as React from 'react';
import { shallowChild } from '@pie-lib/test-utils';
import AnswerList from '../answer-list';
import DragAndDropAnswer from '../answer';

describe('AnswerList', () => {
  const defaultProps = {
    model: {
      id: '1',
      element: 'match-list-element',
      config: {
        prompt: 'Your prompt goes here',
        prompts: [{
          id: 1,
          title: 'Prompt 1',
          relatedAnswer: 1
        }, {
          id: 3,
          title: 'Prompt 3',
          relatedAnswer: 3
        }, {
          id: 4,
          title: 'Prompt 4',
          relatedAnswer: 4
        }, {
          id: 2,
          title: 'Prompt 2',
          relatedAnswer: 2
        }],
        answers: [{
          id: 1,
          title: 'Answer 1'
        }, {
          id: 2,
          title: 'Answer 2'
        }, {
          id: 3,
          title: 'Answer 3'
        }, {
          id: 4,
          title: 'Answer 4'
        }, {
          id: 5,
          title: 'Answer 5'
        }, {
          id: 6,
          title: 'Answer 6'
        }],
        shuffled: false,
        partialScoring: [],
        layout: 3,
        responseType: 'radio',
      },
      feedback: 'Incorrect'
    },
    session: {}
  };

  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallowChild(AnswerList, defaultProps, 1);
  });

  it('renders correctly', () => {
    component = wrapper();

    expect(component.find(DragAndDropAnswer).length).toEqual(4);
  });
});
