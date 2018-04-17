import React from 'react';
import TextLabel from './svg-helper/text-label'
import Tick from './svg-helper/tick'

export default class RulerGenerator extends React.Component {
  constructor (props) {
		super(props);
		this.state = {
			cirRadius : 15
		}

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleRot = this.handleRot.bind(this);
		this.checkMiddleNumber = this.checkMiddleNumber.bind(this);
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

	checkMiddleNumber(ticksTotCount) {
		let getMid = ticksTotCount / 2;
		console.log("getMid", getMid);
		//if(ticksTotCount % 2 == 0) {
			//this.checkMiddleNumber(getMid);
		//}
	}
	
  render () {
		let {length, height, ticks, scale, type} = this.props;
		let rulerWidth = (parseInt(length) * parseInt(scale)) + 5;
		let pad = scale / ticks;

		let renderTicks = (ticksCount, pad) => {
			let ticks = [];
			for(let t = 1; t <= ticksCount; t++) {
					//this.checkMiddleNumber(ticksCount);
				//ticks.push(<Tick key={t} mvX={pad * t} mvY="51" lineX={pad * t} lineY="33" strokeWidth="1" stroke="#808080"/>);
			}
			return ticks;
		};

		return (
			<div>
				<div> Metric
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={rulerWidth} height={height} >
						<rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
						<g>
							<path fill="none" stroke="#808080" d="M1,51 L195,51 L195,1 L2,1 Z" strokeWidth="2" id="svg_1" />
							
							<TextLabel textX="22.523809671401978" textY="223.8234207034111" tspanX="11.523809671401978" tspanY="13.823420703411102" label="cm" />
							
							{this.checkMiddleNumber(ticks)}
							{renderTicks(ticks, pad)}
							
							<TextLabel textX="50.603175699710846" tspanX="26.603175699710846" textY="223.8234207034111" tspanY="13.823420703411102" label="1" />
								
							<path fill="none" fillOpacity="1" stroke="#67e767" strokeOpacity="1" strokeWidth="1" strokeDasharray="none" strokeLinejoin="miter" strokeLinecap="butt" strokeDashoffset="" fillRule="nonzero" opacity="1" markerStart="" markerMid="" markerEnd="" d="M595.7336893160524,50.61904726659017 C595.7336893160524,47.477564353968766 598.3674647159067,44.93296319474543 601.6190392836284,44.93296319474543 C604.87061385135,44.93296319474543 607.5043892512043,47.477564353968766 607.5043892512043,50.61904726659017 C607.5043892512043,53.76053017921157 604.87061385135,56.305131338434904 601.6190392836284,56.305131338434904 C598.3674647159067,56.305131338434904 595.7336893160524,53.76053017921157 595.7336893160524,50.61904726659017 z" transform="rotate(0.07305727899074554 601.6190185546812,50.61904907219691) " id="svg_256"/>					


						</g>
					</svg>
				</div>
				<div style={{marginTop: '20px'}}> Imperial
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="484" height="52">
					<rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
					<g>
					
					<path fill="none" stroke="#808080" d="M1,51.125 L483,51.125 L483,1.125 L2,1.125 Z" strokeWidth="2" id="svg_1" />
					

					</g>
				</svg>
				</div>
			</div>
		);
  }
}

