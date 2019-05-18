import React from 'react';
import { Rect } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class RectangleDrawable extends DrawableHelper {
  constructor(startx, starty) {
    super(startx, starty);
    this.x = startx;
    this.y = starty;
  }

  registerMovement(x, y) {
    this.x = x;
    this.y = y;
  }

  render(props) {
    const { draggable } = props;
    const width = this.x - this.startx;
    const height = this.y - this.starty;

    return (
      <Rect
        width={width}
        height={height}
        fill="white"
        draggable={draggable}
        stroke="black"
        strokeWidth={2}
        x={this.startx}
        y={this.starty}
      />
    );
  }
}
