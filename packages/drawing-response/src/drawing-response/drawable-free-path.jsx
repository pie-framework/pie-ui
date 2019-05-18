import React from 'react';
import { Line } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class FreePathDrawable extends DrawableHelper {
  constructor(startx, starty) {
    super(startx, starty);
    this.points = [startx, starty];
  }

  registerMovement(x, y) {
    this.points = [...this.points, x, y];
  }

  render(props) {
    const { draggable } = props;

    return (
      <Line
        draggable={draggable}
        tension={0}
        bezier={true}
        points={this.points}
        fill="black"
        stroke="black"
      />
    );
  }
}
