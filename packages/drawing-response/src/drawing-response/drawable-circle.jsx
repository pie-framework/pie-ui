import React from 'react';
import { Circle } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class CircleDrawable extends DrawableHelper {
  constructor(props) {
    super(props);
    const { startx, starty } = props;
    this.x = startx;
    this.y = starty;
  }

  registerMovement(x, y) {
    this.x = x;
    this.y = y;
  }

  handleOnClick(props) {
    const { paint, paintColor, forceUpdate } = props;

    if (paint) {
      this.paintColor = paintColor;
      forceUpdate();
    }
  }

  render(props) {
    const { draggable } = props;
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);

    return (
      <Circle
        draggable={draggable}
        radius={radius}
        x={this.startx}
        y={this.starty}
        fill={this.paintColor || this.fillColor}
        onClick={() => this.handleOnClick(props)}
        stroke={this.outlineColor}
      />
    );
  }
}
