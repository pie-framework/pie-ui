import React from 'react';
import { Circle } from 'react-konva';

import DrawableHelper from './drawable-helper';

export default class CircleDrawable extends DrawableHelper {
  constructor(props) {
    super(props);
    const { startx, starty, x, y } = props;

    this.x = x || startx;
    this.y = y || starty;
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

  handleDragEnd = (props, event) => {
    this.startx = event.target.getX();
    this.starty = event.target.getY();

    props.debouncedSessionChange();
  };

  render(props) {
    const { draggable, onMouseOverElement, onMouseOutElement } = props;
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
        onDragEnd={this.handleDragEnd.bind(this, props)}
        onMouseEnter={onMouseOverElement}
        onMouseLeave={onMouseOutElement}
        stroke={this.outlineColor}
      />
    );
  }
}
