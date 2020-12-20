import React from 'react';
import PropTypes from 'prop-types';
import { buildTickData, isMultiple } from './tick-utils';
import injectSheet from 'react-jss';
import { color } from '@pie-lib/render-ui';

const style = {
  text: {
    userSelect: 'none',
    textAlign: 'center',
    fill: color.primary()
  },
  line: {
    stroke: color.primary()
  }
};

export const TickValidator = PropTypes.shape({
  /** the number of major ticks (including min + max)
   * to display. cant be lower than 2.
   */
  major: (props, propName) => {
    let major = props[propName];
    let minor = props.minor;

    if (!isMultiple(major, minor)) {
      return new Error(`Invalid prop major. It must be a multiple of ${minor}`);
    }
  },
  /** the number of minor ticks to display between major ticks.
   * Can't be less than zero.
   */
  minor: (props, propName, componentName) => {
    let minor = props[propName];
    if (minor <= 0) {
      return new Error(
        `Invalid prop ${propName} must be > 0. ${componentName}`
      );
    }
  }
}).isRequired;

export class Tick extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    major: PropTypes.bool,
    xScale: PropTypes.func,
    type: PropTypes.string
  };

  static defaultProps = {
    major: false
  };

  componentDidMount() {
    //center align the tick text
    if (this.text) {
      let { width } = this.text.getBBox();
      this.text.setAttribute('x', (width / 2) * -1);
    }
  }

  render() {
    //the domain value
    let { x, y, type, classes, xScale } = this.props;

    let xText = Number(x.toFixed(2));
    const labelTick = type === 'major';
    let height = labelTick ? 20 : 10;

    return (
      <g opacity="1" transform={`translate(${xScale(x)}, ${y})`}>
        <line
          className={classes.line}
          y1={(height / 2) * -1}
          y2={height / 2}
          x1="0.5"
          x2="0.5"
        />
        {labelTick && (
          <text
            ref={text => (this.text = text)}
            className={classes.text}
            y="14"
            width="10"
            dy="0.71em"
          >
            {xText}
          </text>
        )}
      </g>
    );
  }
}

export class Ticks extends React.Component {
  static contextTypes = {
    xScale: PropTypes.func.isRequired
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    domain: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired
    }).isRequired,
    ticks: TickValidator,
    y: PropTypes.number.isRequired
  };

  render() {
    let { domain, ticks, y, classes } = this.props;
    let { xScale } = this.context;

    const tickData = buildTickData(domain, ticks);
    return (
      <g>
        {tickData.map(({ x, type }) => {
          return (
            <Tick
              classes={classes}
              x={x}
              y={y}
              type={type}
              xScale={xScale}
              key={`${x}-${type}`}
            />
          );
        })}
      </g>
    );
  }
}

export default injectSheet(style)(Ticks);
