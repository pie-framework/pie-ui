import React, { PropTypes as PT } from 'react';

import Draggable from '../../../draggable';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const duration = '150ms';

const style = {
  point: {
    cursor: 'pointer',
    transition: `r ${duration} linear,  
    opacity ${duration} linear, 
    fill ${duration} linear,
    stroke ${duration} linear`,

    stroke: 'var(--point-stroke, black)',
    fill: 'var(--point-stroke, black)',
    '&.react-draggable-dragging': {
      opacity: 0.25,
      r: '10px'
    }
  },
  selected: {
    stroke: '#aaaaff'
  },
  correct: {
    cursor: 'inherit',
    stroke: 'green',
    fill: 'green'
  },
  incorrect: {
    cursor: 'inherit',
    stroke: 'orange',
    fill: 'orange'
  },
  empty: {
    fill: 'var(--point-fill, white)'
  }
}

export class Point extends React.Component {

  render() {

    let {
      onDragStop, onDragStart, onDrag: onDragCallback,
      onClick, onMove,
      interval,
      y,
      bounds,
      selected,
      position,
      disabled,
      correct,
      empty,
      classes } = this.props;

    let { snapValue, xScale } = this.context;

    let dragPosition = (x) => {
      let normalized = x + xScale(0);
      let inverted = xScale.invert(normalized);
      return snapValue(position + inverted);
    }

    let onStart = (e) => {
      this.setState({ startX: e.clientX });
      if (onDragStart) {
        onDragStart();
      }
    }

    let onStop = (e, dd) => {
      if (onDragStop) {
        onDragStop();
      }

      let endX = e.clientX;
      let startX = this.state.startX;
      let deltaX = Math.abs(endX - startX);

      if (deltaX < (is / 10)) {
        if (onClick) {
          onClick();
          this.setState({ startX: null });
        }
      } else {
        let newPosition = dragPosition(dd.lastX);
        onMove(newPosition);
      }
    }

    //prevent the text select icon from rendering.
    let onMouseDown = (e) => e.nativeEvent.preventDefault();

    let is = xScale(interval) - xScale(0);
    let scaledBounds = { left: (bounds.left / interval) * is, right: (bounds.right / interval) * is };

    let onDrag = (e, dd) => {
      let p = dragPosition(dd.x);
      if (onDragCallback) {
        onDragCallback(p);
      }
    }

    let circleClass = classNames(classes.point, {
      [classes.selected]: selected,
      [classes.correct]: correct === true,
      [classes.incorrect]: correct === false,
      [classes.empty]: empty === true
    });


    return <Draggable
      disabled={disabled}
      onMouseDown={onMouseDown}
      onStart={onStart}
      onDrag={onDrag}
      onStop={onStop}
      axis="x"
      grid={[is]}
      bounds={scaledBounds}>
      <circle
        r="5"
        strokeWidth="3"
        className={circleClass}
        cx={xScale(position)}
        cy={y} />
    </Draggable>;
  }
}

Point.defaultProps = {
  y: 0,
  selected: false,
  empty: false,
  disabled: false,
  correct: undefined
}

Point.propTypes = {
  interval: PT.number.isRequired,
  position: PT.number.isRequired,
  bounds: PT.shape({
    left: PT.number.isRequired,
    right: PT.number.isRequired
  }),
  selected: PT.bool,
  disabled: PT.bool,
  correct: PT.bool,
  empty: PT.bool,
  y: PT.number,
  onMove: PT.func.isRequired,
  onClick: PT.func,
  onDrag: PT.func,
  onDragStop: PT.func,
  onDragStart: PT.func
}

Point.contextTypes = {
  xScale: PT.func.isRequired,
  snapValue: PT.func.isRequired
}

export default injectSheet(style)(Point);