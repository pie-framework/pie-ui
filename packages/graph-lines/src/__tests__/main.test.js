import * as React from 'react';
import { shallow } from 'enzyme';
import { GraphLines } from '@pie-lib/charting';
import { shallowChild } from '@pie-lib/test-utils';
import Controls from '../controls';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import Main from '../main';

describe('Main', () => {
  const defaultProps = {
    session: {},
    onSessionChange: () => {
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
      graph: {
        lines: [{
          label: 'Line One',
          correctLine: '3x+2',
          initialView: '3x+3'
        }],
      }
    }
  };

  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallowChild(Main, defaultProps, 1);
  });


  describe('render', () => {
    let w;

    beforeEach(() => {
      w = props => shallow(<Main { ...props } />);
    });

    it('snapshot', () => {
      expect(w(defaultProps)).toMatchSnapshot();
    });

    it('snapshot with rationale', () => {
      expect(w({
        ...defaultProps,
        rationale: 'This is rationale'
      })).toMatchSnapshot();
    });

    it('renders correctly', () => {
      component = wrapper();

      expect(component.find(CorrectAnswerToggle).length).toEqual(1);
      expect(component.find(Controls).length).toEqual(1);
      expect(component.find(GraphLines).length).toEqual(1);
      expect(component.find(Feedback).length).toEqual(0);
      expect(component.state()).toEqual({
        selection: [],
        session: {
          lines: [],
        },
        showCorrect: false,
        useSessionLines: false
      });
      expect(component.html().includes('Score')).toEqual(false);
    });
  });

  describe('logic', () => {
    it('adds a line correctly', () => {
      component = wrapper();

      component.instance().onAddLine({ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } });
      expect(component.state()).toEqual({
        selection: [],
        session: {
          lines: [{ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }],
        },
        showCorrect: false,
        useSessionLines: false
      });
    });

    it('deletes a selection correctly', () => {
      component = wrapper();

      component.instance().setUseSessionLines([{ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }]);
      expect(component.state()).toEqual({
        selection: [],
        session: {
          lines: [{ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }],
        },
        showCorrect: false,
        useSessionLines: true
      });

      component.instance().toggleSelectLine({ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } });

      expect(component.state()).toEqual({
          selection: [{
            selected: true,
            from: { x: 0, y: 0 },
            to: { x: 2, y: 2 }
          }],
          session: {
            lines: [{
              selected: true,
              from: { x: 0, y: 0 },
              to: { x: 2, y: 2 }
            }]
          },
          showCorrect: false,
          useSessionLines: true
        }
      );

      component.instance().deleteSelection();

      expect(component.state()).toEqual({
        selection: [],
        session: {
          lines: [],
        },
        showCorrect: false,
        useSessionLines: true
      });
    });

    it('builds out lines correctly depending on what to show', () => {
      component = wrapper();

      expect(component.instance().buildLines()).toEqual([{
        correctLine: '3x+2',
        from: { x: -1, y: 0 },
        initialView: '3x+3',
        label: 'Line One',
        to: { x: 0, y: 3 }
      }]);

      component = wrapper({
        ...defaultProps,
        model: {
          ...defaultProps.model,
          correctResponse: [{ from: { x: 1, y: 1 }, to: { x: 2, y: 2 } }]
        }
      });

      expect(component.instance().buildLines()).toEqual([]);

      component.instance().setUseSessionLines([{ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }]);

      expect(component.instance().buildLines()).toEqual([{
        selected: false,
        correct: false,
        from: { x: 0, y: 0 },
        to: { x: 2, y: 2 }
      }]);

      component.instance().toggleShowCorrect(true);

      expect(component.instance().buildLines()).toEqual([{ from: { x: 1, y: 1 }, to: { x: 2, y: 2 } }]);
    });

    it('changes a line correctly', () => {
      component = wrapper();
      component.instance().setUseSessionLines([{ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }]);
      component.instance().onLineChange({ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }, {
        from: { x: 0, y: 0 },
        to: { x: 2, y: 3 }
      });

      expect(component.instance().buildLines()).toEqual([{
        from: { x: 0, y: 0 },
        to: { x: 2, y: 3 }
      }]);

      expect(component.state()).toEqual({
        selection: [],
        session: {
          lines: [{
            from: { x: 0, y: 0 },
            to: { x: 2, y: 3 }
          }]
        },
        showCorrect: false,
        useSessionLines: true
      })
    });
  });
});