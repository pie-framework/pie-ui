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

  handleOnClick(props) {
    const { paint, paintColor, forceUpdate } = props;

    if (paint) {
      this.paintColor = paintColor;
      forceUpdate();
    }
  }

  render(props) {
    const { draggable, fillColor, outlineColor } = props;
    const width = this.x - this.startx;
    const height = this.y - this.starty;

    return (
      <Rect
        width={width}
        height={height}
        fill={this.paintColor || fillColor}
        onClick={() => this.handleOnClick(props)}
        stroke={outlineColor}
        draggable={draggable}
        strokeWidth={2}
        x={this.startx}
        y={this.starty}
      />
    );
  }
}
