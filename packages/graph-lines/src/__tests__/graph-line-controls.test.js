import * as React from 'react';
import GraphLineControls from '../GraphLineControls';
import { InputContainer } from '@pie-lib/config-ui';
import { shallowChild } from '@pie-lib/test-utils';
import Input from '@material-ui/core/Input';

describe('GraphLineControls', () => {
  const defaultProps = {
    onDeleteLine:  () => {},
    updateLines: () => {},
    lines: [],
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
      model: {
        config: {
          lines: [{
            label: 'Line One',
            correctLine: '3x+2',
            initialView: '3x+3'
          }],
        }
      }
    },
  };

  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallowChild(GraphLineControls, defaultProps, 1);
  });

  it('renders correctly', () => {
    component = wrapper();

    expect(component.find('.empty')).toBeDefined();

    const lines = [{ from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }];

    component = wrapper({ ...defaultProps, lines });

    expect(component.find('.empty').length).toEqual(0);
    expect(component.find(Input).length).toBeGreaterThan(4);
    expect(component.find(InputContainer).length).toBeGreaterThan(4);
  });
});
