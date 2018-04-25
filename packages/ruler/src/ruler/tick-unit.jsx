import React from 'react';
import Tick from './tick';
import TickUnitLabel from './tick-unit-label';
import PropTypes from 'prop-types';

const TickUnit = ({totalTicks, perTickSpacing, rulerHeight, tickCountPerUnit, rulerFractions}) => {
  let ticksArr = []; //store all ticks
  
  for (let fIdx = 0;  fIdx < rulerFractions.length;  fIdx++) {
    let getLargeTickPos = rulerFractions[fIdx];
    let prevFrac = (fIdx >= 1) ? rulerFractions[fIdx - 1] : tickCountPerUnit;
    let ticHeight = rulerHeight * Math.pow(0.7, fIdx);

    let smallTickPos;
    let tickUnitLabel = 1;
    
    for(let tickIdx = 1; tickIdx <= totalTicks; tickIdx++) {
      smallTickPos = ((getLargeTickPos > 0) && (tickIdx != getLargeTickPos)) ? smallTickPos + prevFrac : getLargeTickPos;

      let tick_y1 = rulerHeight;
      let tick_y2 = (rulerHeight - ticHeight);

      if(getLargeTickPos == 0 ) {
        let tick_x1 = (perTickSpacing * tickIdx);
        let tick_x2 = tick_x1;

        ticksArr.push(<Tick x1={tick_x1} y1={tick_y1} x2={tick_x2} y2={tick_y2}  />);
      }else {
        let tick_x1 = (perTickSpacing * smallTickPos);
        let tick_x2 = tick_x1;

        if(smallTickPos <= totalTicks) {
          if((smallTickPos % (tickCountPerUnit) == 0) || (smallTickPos % (tickCountPerUnit * 2) == 0)) {
            let labelX = ((smallTickPos * perTickSpacing) - 10);
            ticksArr.push(<TickUnitLabel x={labelX} label={tickUnitLabel.toString()} />);
            tickUnitLabel++;
          }
  
          if(smallTickPos % getLargeTickPos == 0) {
            ticksArr.push(<Tick x1={tick_x1} y1={tick_y1} x2={tick_x2} y2={tick_y2}  />);
          }									
        }							
      }
    }      
  }  

  return ticksArr;    
};

TickUnit.propTypes = {
  totalTicks: PropTypes.number.isRequired,
  perTickSpacing: PropTypes.number.isRequired,
  rulerHeight: PropTypes.number.isRequired,
  tickCountPerUnit: PropTypes.number.isRequired,
  rulerFractions: PropTypes.array.isRequired
}
export default TickUnit;