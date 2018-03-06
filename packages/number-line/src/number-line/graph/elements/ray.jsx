import * as colors from '../../colors';

import React, { PropTypes as PT } from 'react';

import Arrow from '../arrow';
import Draggable from '../../../draggable';
import Point from './point';
import { basePropTypes } from './base';
import classNames from 'classnames';
import extend from 'lodash/extend';
import injectSheet from 'react-jss';
import isEqual from 'lodash/isEqual';
import isNumber from 'lodash/isNumber';

const rayColor = (color) => ({
  '& line': {
    stroke: color
  },
  '& .arrow': {
    fill: color,
    strokeWidth: '1px',
    stroke: color
  }
});

const style = {
  ray: {
    '& line': {
      cursor: 'pointer',
      strokeWidth: '5px',
      stroke: 'var(--line-stroke, black)'
    },
    '& line, & .arrow': {
      transition: 'stroke 150ms linear, fill 150ms linear'
    }
  },
  selected: rayColor(colors.selected),
  correct: rayColor(colors.correct),
  incorrect: rayColor(colors.incorrect),
  arrowCorrect: {
    '--arrow-color': colors.correct
  },
  arrowIncorrect: {
    '--arrow-color': colors.incorrect
  },
  arrowSelected: {
    '--arrow-color': colors.selected
  }
}

export class Ray extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragPosition: null
    }
  }

  drag(p) {
    let { domain } = this.props;
    if (p >= domain.min && p <= domain.max) {
      this.setState({ dragPosition: p });
    }
  }

  stopDrag() {
    this.setState({ dragPosition: null });
  }

  render() {
    let {
      interval,
      empty,
      position,
      direction,
      domain,
      y,
      selected,
      disabled,
      width,
      correct,
      classes
    } = this.props;

    let { xScale } = this.context;

    let drag = this.drag.bind(this);
    let stopDrag = this.stopDrag.bind(this);

    let is = xScale(interval) - xScale(0);
    let finalPosition = isNumber(this.state.dragPosition) ? this.state.dragPosition : position;

    let className = classNames(classes.ray, {
      [classes.selected]: selected,
      [classes.correct]: correct === true,
      [classes.incorrect]: correct === false
    });


    let positive = direction === 'positive';
    let left = positive ? finalPosition : domain.min;
    let right = positive ? domain.max : finalPosition;
    let triangleX = positive ? xScale(right) : xScale(left);


    //let the line run all the way to 0 or width.
    let x1 = positive ? xScale(left) : 8;
    let x2 = positive ? (width - 8) : xScale(right);
    let arrowX = positive ? width : 0;
    let arrowDirection = positive ? 'right' : 'left';

    let noop = () => { }

    const arrowClassNames = classNames({
      [classes.arrowCorrect]: correct === true,
      [classes.arrowIncorrect]: correct === false,
      [classes.arrowSelected]: selected
    });

    return <g className={className} transform={`translate(0, ${y})`}>
      <line
        onClick={disabled ? noop : this.props.onToggleSelect}
        className="line-handle"
        x1={x1} x2={x2}
      ></line>
      <Point
        disabled={disabled}
        correct={correct}
        selected={selected}
        empty={empty}
        interval={interval}
        bounds={{ left: domain.min - position, right: domain.max - position }}
        position={position}
        onDrag={drag}
        onDragStop={stopDrag}
        onMove={this.props.onMove}
      />
      <Arrow
        x={arrowX}
        className={arrowClassNames}
        direction={arrowDirection} />
    </g>;
  }
}

Ray.propTypes = extend(basePropTypes(), {
  width: PT.number.isRequired,
  selected: PT.bool,
  disabled: PT.bool,
  empty: PT.bool,
  direction: PT.oneOf(['positive', 'negative']),
  y: PT.number,
  position: PT.number.isRequired,
  onMove: PT.func.isRequired,
  onToggleSelect: PT.func.isRequired
});

Ray.defaultProps = {
  selected: false,
  direction: 'positive',
  y: 0,
  disabled: false
}

Ray.contextTypes = {
  xScale: PT.func.isRequired,
  snapValue: PT.func.isRequired
}

export default injectSheet(style)(Ray);