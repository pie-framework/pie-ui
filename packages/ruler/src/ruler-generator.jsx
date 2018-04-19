import React from 'react';

export default class RulerGenerator extends React.Component {
  constructor (props) {
		super(props);
		this.state = {
			cirRadius : 15
		}

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleRot = this.handleRot.bind(this);
		this.renderTicks = this.renderTicks.bind(this);
		this.getTickGroups = this.getTickGroups.bind(this);
  }

	handleMouseOver() {
		this.setState({cirRadius: 14});
	}

	handleMouseOut() {
		this.setState({cirRadius:15});
	}

	handleRot() {
		this.props.handleRotate;
	}

	getTickGroups(totalTickCount, tickGpArr = [totalTickCount]) {
		if(totalTickCount % 2 == 0) {
			let getMidPoint = totalTickCount / 2;
			tickGpArr.push(getMidPoint);
			return this.getTickGroups(getMidPoint, tickGpArr)
		}
		return tickGpArr;
	}

	renderTicks(tickCountPerUnit, rulerLength, perTickSpacing, rulerHeight) {
		let ticksArr = []; //store all ticks
		let tickGroups = this.getTickGroups(tickCountPerUnit);
		let totalTicks = rulerLength * tickCountPerUnit;
		
		for (let tGpIndex = 0;  tGpIndex < tickGroups.length;  tGpIndex++) {	
			
			let getCurrValue = tickGroups[tGpIndex];
			let prevPoint = (tGpIndex >= 1) ? tickGroups[tGpIndex - 1] : tickCountPerUnit;	
			let	gpMidPoint = tickGroups[tGpIndex + 1] || 0;

			console.log(`Curr is:-${getCurrValue} -->Mid is:-${gpMidPoint} -->prev is:-${prevPoint}`);

			let nxtGrpValue;
			let labelIdx = 1;
			for(let tickIdx = 1; tickIdx <= totalTicks; tickIdx++) {
				nxtGrpValue = (tickIdx == getCurrValue) ? getCurrValue : nxtGrpValue + prevPoint;

				if(nxtGrpValue <= totalTicks) {
					let ticHeight = rulerHeight * Math.pow(0.7, tGpIndex);

					console.log(`GrpValue ${nxtGrpValue}--->spacing-->${perTickSpacing * nxtGrpValue}--> height is ${ticHeight}`);

					if((nxtGrpValue % (tickCountPerUnit) == 0) || (nxtGrpValue % (tickCountPerUnit * 2) == 0)) {
						let labelX = ((nxtGrpValue * perTickSpacing) - 10);
						ticksArr.push(<text x={labelX} y="20" textAnchor="middle" stroke="none" fill="#000000" style={{fontSize: "11px"}}>{labelIdx}</text>);
						labelIdx++;
					}

					if(nxtGrpValue % getCurrValue == 0) {
						let tick_x1 = (perTickSpacing * nxtGrpValue);
						let tick_x2 = tick_x1;
						let tick_y1 = rulerHeight;
						let tick_y2 = (rulerHeight - ticHeight);
						let d = `M${tick_x1},${tick_y1} L${tick_x2},${tick_y2}`;
						ticksArr.push(<path fill="none" stroke="#808080" d={d} strokeWidth="1"  />);
					}
				}
			}
		}

		return ticksArr;
	}

  render () {
		let {length, height, ticks, scale, type, unit} = this.props;
		let rulerWidth = (parseInt(length) * parseInt(scale));
		let perTickSpacing = rulerWidth / (ticks * length);

		let rectPath = `M1,${height} L${rulerWidth},${height} L${rulerWidth},1 L2,1 Z`;
		
		return (
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={rulerWidth + 5} height={height+5} >
					<rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
					<g>
						<path fill="none" stroke="#808080" d={rectPath} strokeWidth="2" id="svg_1" />
						<text x="15" y="20" textAnchor="middle" stroke="none" fill="#000000" style={{fontSize: "11px"}}>{unit}</text>
						{this.renderTicks(ticks, length, perTickSpacing, height)}
						<path fill="none" fillOpacity="1" stroke="#67e767" strokeOpacity="1" strokeWidth="1" strokeDasharray="none" strokeLinejoin="miter" strokeLinecap="butt" strokeDashoffset="" fillRule="nonzero" opacity="1" markerStart="" markerMid="" markerEnd="" d="M595.7336893160524,50.61904726659017 C595.7336893160524,47.477564353968766 598.3674647159067,44.93296319474543 601.6190392836284,44.93296319474543 C604.87061385135,44.93296319474543 607.5043892512043,47.477564353968766 607.5043892512043,50.61904726659017 C607.5043892512043,53.76053017921157 604.87061385135,56.305131338434904 601.6190392836284,56.305131338434904 C598.3674647159067,56.305131338434904 595.7336893160524,53.76053017921157 595.7336893160524,50.61904726659017 z" transform="rotate(0.07305727899074554 601.6190185546812,50.61904907219691) " id="svg_256"/>					
					</g>
				</svg>
			</div>
		);
  }
}

