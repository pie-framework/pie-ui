import React from 'react';
import InlineChoice from '../inline-choice';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

const props = {
  session: {},
  onChoiceChanged: () => { },
};

const model = {
  choices: [{
    "correct": true,
    "value": "sweden",
    "label": [
      {
        "lang": "en-US",
        "value": "Sweden"
      },
      {
        "lang": "es-ES",
        "value": "Suecia"
      },
      {
        "lang": "zh-CN",
        "value": "瑞典"
      }
    ],
    "feedback": {

    }
  }, {
    "value": "iceland",
    "label": [
      {
        "lang": "en-US",
        "value": "Iceland"
      },
      {
        "lang": "es-ES",
        "value": "Islandia"
      },
      {
        "lang": "zh-CN",
        "value": "冰岛"
      }
    ],
    "feedback": {
      "type": "default",
      "text": [
        {
          "lang": "en-US",
          "value": "Iceland is not an EU member state"
        },
        {
          "lang": "es-ES",
          "value": "Islandia no es un estado miembro de la UE"
        },
        {
          "lang": "zh-CN",
          "value": "冰岛不是欧盟成员国"
        }
      ]
    }
  }],
  classes: {},
  disabled: false
}


describe('InlineChoice Component', () => {
  it('should render component', () => {
    const tree = renderer.create(<InlineChoice
      {...model}
      session={props.session}
      onChoiceChanged={props.onChoiceChanged()} />).toJSON();
    console.log("tree", tree);
    expect(tree).toMatchSnapshot();
  });
});