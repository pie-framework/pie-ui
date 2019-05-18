import React from 'react';
import { Line } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class EraserDrawable extends DrawableHelper {
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
        globalCompositeOperation="destination-out"
        tension={0}
        bezier={true}
        points={this.points}
        strokeStyle='#df4b26'
        lineJoin="round"
        lineWidth="5"
        fill="white"
        stroke="white"
        strokeWidth={5}
      />
    );
  }
}
