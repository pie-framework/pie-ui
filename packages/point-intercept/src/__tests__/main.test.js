import * as React from 'react';
import { shallow } from 'enzyme';
import { PlotPoints } from '@pie-lib/charting';
import Controls from '../controls';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import Main from '../main';

function shallowRenderComponent(Component, defaultProps = {}, nestLevel) {
  return function innerRender(props = {}) {
    let rendered = shallow(<Component {...defaultProps} {...props} />);

    if (nestLevel) {
      let repeat = nestLevel;

      while (repeat--) {
        rendered = rendered.first().shallow();
      }
    }

    return rendered;
  };
}


describe('Main', () => {
  const defaultProps = {
    onSessionChange: () => {},
    session: {
      points: [],
    },
    model: {
      width: 600,
      height: 600,
      //domain is the x-axis
      domain: {
        max: 10,
        min: -10,
        label: 'x',
        labelFrequency: 1,
        step: 1,
        snap: 1,
        padding: 20
      },
      //range is the y-axis
      range: {
        max: 10,
        min: -10,
        label: 'y',
        step: 1,
        snap: 1,
        padding: 20
      },
      disabled: false,
      pointLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      correctResponse: [{ x: 0, y: 0, label: 'A' }, { x: 1, y: 1, label: 'B' }],
      pointsMustMatchLabels: true
    },
  };

  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallowRenderComponent(Main, defaultProps, 1);
  });

  it('renders correctly', () => {
    component = wrapper();

    expect(component.find(CorrectAnswerToggle).length).toEqual(1);
    expect(component.find(Controls).length).toEqual(1);
    expect(component.find(PlotPoints).length).toEqual(1);
    expect(component.find(Feedback).length).toEqual(0);
    expect(component.state()).toEqual({
      selection: [],
      session: {
        points: [],
      },
      showCorrect: false
    });
    expect(component.html().includes('Score')).toEqual(false);
  });

  it('adds a point correctly', () => {
    component = wrapper();

    component.instance().addPoint({ x: 0, y: 0 });
    expect(component.state()).toEqual({
      selection: [],
      session: {
        points: [{
          label: 'A',
          x: 0,
          y: 0
        }],
      },
      showCorrect: false
    });
  });

  it('swaps a point correctly', () => {
    component = wrapper();

    component.instance().addPoint({ x: 0, y: 0 });
    component.instance().selectionChange([{ x: 0, y: 0 }]);
    component.instance().movePoint({ x: 0, y: 0 }, { x: 1, y: 1 });

    expect(component.state()).toEqual({
      selection: [{
        x: 1,
        y: 1
      }],
      session: {
        points: [{
          label: 'A',
          x: 1,
          y: 1
        }],
      },
      showCorrect: false
    });
  });

  it('deletes a point correctly', () => {
    component = wrapper();

    component.instance().addPoint({ x: 0, y: 0 });
    component.instance().selectionChange([{ x: 0, y: 0 }]);
    component.instance().deleteSelection({ x: 0, y: 0 });

    expect(component.state()).toEqual({
      selection: [],
      session: {
        points: [],
      },
      showCorrect: false
    });
  });

  it('builds points correctly upon rendering', () => {
    component = wrapper({
      model: { ...defaultProps.model, correctResponse: null },
      session: {
        points: [{
          label: 'A',
          x: 0,
          y: 0
        }]
      }
    });

    expect(component.find(PlotPoints).props().points).toEqual([{
      label: 'A',
      x: 0,
      y: 0
    }]);
  })
});
