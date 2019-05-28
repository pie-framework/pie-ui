import React from 'react';
import { Arrow } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class LineDrawable extends DrawableHelper {
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
    const points = [this.startx, this.starty, this.x, this.y];

    return (
      <Arrow
        draggable={draggable}
        points={points}
        fill={this.paintColor || this.outlineColor}
        // onClick={() => this.handleOnClick(props)}
        stroke={this.paintColor || this.outlineColor}
        pointerWidth={0}
        pointerLength={0}
      />
    );
  }
}
