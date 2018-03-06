import React, { PropTypes as PT } from 'react';

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
}

export const TickValidator = PT.shape({
  /** the number of major ticks (including min + max) 
   * to display. cant be lower than 2.
   */
  major: (props, propName) => {
    let major = props[propName];
    if (major < 2) {
      return new Error(`Invalid prop ${propName} < 2. ${componentName}`);
    }
  },
  /** the number of minor ticks to display between major ticks.
   * Can't be less than zero.
   */
  minor: (props, propName, componentName) => {
    let minor = props[propName];
    if (minor < 0) {
      return new Error(`Invalid prop ${propName} must be > 0. ${componentName}`);
    }
    if (minor > 20) {
      return new Error(`Invalid prop ${propName} must be less than or equal to 20. ${componentName}`);
    }
  }
}).isRequired;

export class Tick extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //center align the tick text
    if (this.text) {
      let { width } = this.text.getBBox();
      this.text.setAttribute('x', (width / 2) * -1);
    }
  }

  render() {
    //the domain value
    let { label, x, y, major, classes } = this.props;


    let xText = Number((label).toFixed(2));
    let height = major ? 20 : 10;

    return <g
      opacity="1"
      transform={`translate(${x}, ${y})`}>
      <line
        className={classes.line}
        y1={(height / 2) * -1}
        y2={height / 2}
        x1="0.5"
        x2="0.5"></line>
      {major &&
        <text ref={text => this.text = text}
          className={classes.text}
          y="14"
          width="10"
          dy="0.71em">{xText}</text>

      }
    </g>
  }
}

Tick.propType = {
  classes: PT.object.isRequired,
  label: PT.number.isRequired,
  y: PT.number.isRequired,
  x: PT.number.isRequired,
  major: PT.bool
}

Tick.defaultProps = {
  major: false
}

export class Ticks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { domain, ticks, interval, y, classes } = this.props;
    let { xScale } = this.context;

    let tickModel = buildTickModel(domain, ticks, interval, xScale);
    let nodes = tickModel.map(({ major, value, x }) => {
      return <Tick
        classes={classes}
        major={major}
        key={value}
        label={value}
        y={y}
        x={x} />
    });

    return <g>{nodes}</g>;
  }
}

export default injectSheet(style)(Ticks);

Ticks.contextTypes = {
  xScale: PT.func.isRequired
}

Ticks.propTypes = {
  classes: PT.object.isRequired,
  domain: PT.shape({
    min: PT.number.isRequired,
    max: PT.number.isRequired
  }).isRequired,
  ticks: TickValidator,
  interval: PT.number.isRequired,
  y: PT.number.isRequired
}