import React, { Component } from 'react';
import RulerBg from './ruler-bg';
import RulerUnitLabel from './ruler-unit-label';
import TickUnit from './tick-unit';
import Tick from './tick';
import PropTypes from 'prop-types';

export default class Index extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    ticks: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
    this.getTickGroups = this.getTickGroups.bind(this);
    this.renderTickUnits = this.renderTickUnits.bind(this);
  }

	getTickGroups(totalTickCount, tickGpArr = [totalTickCount]) {
		if((totalTickCount > 1) && (totalTickCount % 2 == 0)) {
			let getMidPoint = totalTickCount / 2;
			tickGpArr.push(getMidPoint);
			return this.getTickGroups(getMidPoint, tickGpArr)
		}else {
			tickGpArr.push(0);
		}

		return tickGpArr;
  }
  
  renderTickUnits(tickCountPerUnit, rulerLength, perTickSpacing, rulerHeight) {
		let ticksArr = []; //store all ticks
		let tickGroups = this.getTickGroups(tickCountPerUnit);
    let totalTicks = rulerLength * tickCountPerUnit;
    
    for (let tGpIndex = 0;  tGpIndex < tickGroups.length;  tGpIndex++) {
			let getCurrValue = tickGroups[tGpIndex];
			let prevPoint = (tGpIndex >= 1) ? tickGroups[tGpIndex - 1] : tickCountPerUnit;	

			let ticHeight = rulerHeight * Math.pow(0.7, tGpIndex);

			let nxtGrpValue;
      let labelIdx = 1;

      for(let tickIdx = 1; tickIdx <= totalTicks; tickIdx++) {
        nxtGrpValue = ((tickIdx != getCurrValue) && (getCurrValue > 0)) ? nxtGrpValue + prevPoint : getCurrValue;

        let tick_y1 = rulerHeight;
        let tick_y2 = (rulerHeight - ticHeight);

        if(getCurrValue == 0 ) {
          let tick_x1 = (perTickSpacing * tickIdx);
          let tick_x2 = tick_x1;

          ticksArr.push(<Tick x1={tick_x1} y1={tick_y1} x2={tick_x2} y2={tick_y2}  />);
        }else {
          let tick_x1 = (perTickSpacing * nxtGrpValue);
          let tick_x2 = tick_x1;
          
          if(nxtGrpValue <= totalTicks) {        
  
            if((nxtGrpValue % (tickCountPerUnit) == 0) || (nxtGrpValue % (tickCountPerUnit * 2) == 0)) {
              let labelX = ((nxtGrpValue * perTickSpacing) - 10);
              ticksArr.push(<text x={labelX} y="20" textAnchor="middle" stroke="none" fill="#000000" fontSize="11">{labelIdx}</text>);
              labelIdx++;
            }
    
            if(nxtGrpValue % getCurrValue == 0) {
              ticksArr.push(<Tick x1={tick_x1} y1={tick_y1} x2={tick_x2} y2={tick_y2}  />);
            }									
          }							
        }
      }      
    } 

    return ticksArr;
  }  

  render () {
    let {length, height, ticks, scale, unit} = this.props;
    
		let rulerWidth = (parseInt(length) * parseInt(scale));
		let perTickSpacing = rulerWidth / (ticks * length);
    
    return (
      <svg width={rulerWidth + 5} height={height + 5} >
        <g>
          <RulerBg bgX1={1} bgX2={rulerWidth} bgY1={height}  />
          <RulerUnitLabel label={unit} />
          {this.renderTickUnits(ticks, length, perTickSpacing, height)}
        </g>
      </svg>
    );
  }
}

