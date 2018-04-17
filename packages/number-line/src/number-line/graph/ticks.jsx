import React from 'react';
import PropTypes from 'prop-types';
import { buildTickModel } from './tick-utils';
import injectSheet from 'react-jss';

const style = {
  text: {
    userSelect: 'none',
    textAlign: 'center',
    fill: 'var(--tick-color, black)'
  },
  line: {
    stroke: 'var(--tick-color, black)'
  }
};

export const TickValidator = PropTypes.shape({
  /** the number of major ticks (including min + max)
   * to display. cant be lower than 2.
   */
  major: (props, propName) => {
    let major = props[propName];
    if (major < 2) {
      return new Error(`Invalid prop ${propName} < 2.`);
    }
  },
  /** the number of minor ticks to display between major ticks.
   * Can't be less than zero.
   */
  minor: (props, propName, componentName) => {
    let minor = props[propName];
    if (minor < 0) {
      return new Error(
        `Invalid prop ${propName} must be > 0. ${componentName}`
      );
    }
    if (minor > 20) {
      return new Error(
        `Invalid prop ${propName} must be less than or equal to 20. ${componentName}`
      );
    }
  }
}).isRequired;

export class Tick extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    major: PropTypes.bool
  };

  static defaultProps = {
    major: false
  };

  componentDidMount() {
    //center align the tick text
    if (this.text) {
      let { width } = this.text.getBBox();
      this.text.setAttribute('x', width / 2 * -1);
    }
  }

  render() {
    //the domain value
    let { label, x, y, major, classes } = this.props;

    let xText = Number(label.toFixed(2));
    let height = major ? 20 : 10;

    return (
      <g opacity="1" transform={`translate(${x}, ${y})`}>
        <line
          className={classes.line}
          y1={height / 2 * -1}
          y2={height / 2}
          x1="0.5"
          x2="0.5"
        />
        {major && (
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
    interval: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  render() {
    let { domain, ticks, interval, y, classes } = this.props;
    let { xScale } = this.context;

    let tickModel = buildTickModel(domain, ticks, interval, xScale);
    let nodes = tickModel.map(({ major, value, x }) => {
      return (
        <Tick
          classes={classes}
          major={major}
          key={value}
          label={value}
          y={y}
          x={x}
        />
      );
    });

    return <g>{nodes}</g>;
  }
}

export default injectSheet(style)(Ticks);
