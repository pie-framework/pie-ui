import React from 'react';
import { Circle } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class CircleDrawable extends DrawableHelper {
  constructor(startx, starty) {
    super(startx, starty);
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
    const { draggable, fillColor, outlineColor } = props;
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);

    return (
      <Circle
        draggable={draggable}
        radius={radius}
        x={this.startx}
        y={this.starty}
        fill={this.paintColor || fillColor}
        onClick={() => this.handleOnClick(props)}
        stroke={outlineColor}
      />
    );
  }
}
