import React from 'react';
import InlineChoice from '../inline-choice';
import { shallow } from 'enzyme';

const props = {
  session: {},
  onChoiceChanged: () => {}
};

const model = {
  choices: [
    {
      correct: true,
      value: 'sweden',
      label: 'sweden',
      feedback: {}
    },
    {
      value: 'iceland',
      label: 'iceland',
      feedback: {
        type: 'default',
        text: [
          {
            lang: 'en-US',
            value: 'Iceland is not an EU member state'
          },
          {
            lang: 'es-ES',
            value: 'Islandia no es un estado miembro de la UE'
          },
          {
            lang: 'zh-CN',
            value: '冰岛不是欧盟成员国'
          }
        ]
      }
    }
  ],
  classes: {},
  disabled: false
};

describe('inline-choice', () => {
  describe('snapshot', () => {
    it('should render component', () => {
      const wrapper = shallow(
        <InlineChoice
          {...model}
          session={props.session}
          onChoiceChanged={props.onChoiceChanged}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('logic', () => {
    xit('todo');
  });
});
