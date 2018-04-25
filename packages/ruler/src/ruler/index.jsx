import React, { Component } from 'react';
import RulerBg from './ruler-bg';
import TickUnitLabel from './tick-unit-label';
import TickUnit from './tick-unit';
import PropTypes from 'prop-types';
import RotateAnchor from './rotate-anchor';

export default class Index extends Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    ticks: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
    this.getRulerFractions = this.getRulerFractions.bind(this);
  }

	getRulerFractions(count, rulerFractionArr = [count]) {
		if(count % 2 == 0) {
			let midPoint = count / 2;
			rulerFractionArr.push(midPoint);
			return this.getRulerFractions(midPoint, rulerFractionArr)
		} else {
			rulerFractionArr.push(0);
    }
    
		return rulerFractionArr;
  }
  
  
  render () {
    let {length, height, ticks, scale, unit} = this.props;
		let rulerWidth = length * scale;
    let perTickSpacing = rulerWidth / (ticks * length);

    let rulerFractions = this.getRulerFractions(ticks);
    let totalTicks = length * ticks;
    let viewBox = `0 0 ${rulerWidth + 10} ${height + 10}`;

    return (
      <div style={{marginLeft: "20px"}}>

      <svg width={rulerWidth} height={height} viewBox={viewBox} >
        <g>
          <RulerBg bgX1={1} bgX2={rulerWidth} bgY1={height}  />
          <TickUnitLabel label={unit} />
          <TickUnit perTickSpacing={perTickSpacing} totalTicks={totalTicks} rulerHeight={height} tickCountPerUnit={ticks} rulerFractions={rulerFractions} />
          <RotateAnchor cx={1} cy={height} r={7} />
          <RotateAnchor cx={rulerWidth} cy={height} r={7} />
        </g>
      </svg>
      </div>
    );
  }
}

