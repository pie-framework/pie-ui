import React from 'react';
import {renderTextLabel} from './svg-helper'

export default class RulerGenerator extends React.Component {
  constructor (props) {
		super(props);
		this.state = {
			cirRadius : 15
		}

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleRot = this.handleRot.bind(this);
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

  render () {
		let {width, height, label} = this.props;

		return (
			<div>
				<div> Metric
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="624" height="62" >
						<rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
						<g>
							<path fill="none" stroke="#808080" d="M1,51 L603,51" strokeWidth="2" id="svg_1" />
							<path fill="none" stroke="#808080" d="M1,1 L603,1 " strokeWidth="2" id="svg_2" />
							<path fill="none" stroke="#808080" d="M2,51 L2,1 " strokeWidth="2" id="svg_3" />
							<path fill="none" stroke="#808080" d="M602,51 L602,1 " strokeWidth="2" id="svg_4" />

							{renderTextLabel('22.523809671401978', '11.523809671401978', '223.8234207034111', '13.823420703411102', 'cm')}
							
							<path fill="none" stroke="#808080" d="M5,51.125 L5,33.625 " strokeWidth="1" id="svg_6" />
							<path fill="none" stroke="#808080" d="M8,51.125 L8,33.625 " strokeWidth="1" id="svg_7"/>
							<path fill="none" stroke="#808080" d="M11,51.125 L11,33.625 " strokeWidth="1"  id="svg_8"/>
							<path fill="none" stroke="#808080" d="M14.000000000000002,51.125 L14.000000000000002,33.625 " strokeWidth="1" id="svg_9"/>					
							
							<path fill="none" stroke="#808080" d="M17,51.125 L17,23.625 " strokeWidth="1" id="svg_10" />

							<path fill="none" stroke="#808080" d="M20,51.125 L20,33.625 " strokeWidth="1" id="svg_11" />
							<path fill="none" stroke="#808080" d="M22.999999999999996,51.125 L22.999999999999996,33.625 " strokeWidth="1" id="svg_12" />
							<path fill="none" stroke="#808080" d="M26.000000000000004,51.125 L26.000000000000004,33.625 " strokeWidth="1"  id="svg_13" />
							<path fill="none" stroke="#808080" d="M29,51.125 L29,33.625 " strokeWidth="1" id="svg_14" />
							
							<path fill="none" stroke="#808080" d="M32,51.125 L32,1.125 " strokeWidth="1" id="svg_15"/>					

							{renderTextLabel('50.603175699710846', '26.603175699710846', '223.8234207034111', '13.823420703411102', '1')}
								
							<path fill="none" fillOpacity="1" stroke="#67e767" strokeOpacity="1" strokeWidth="1" strokeDasharray="none" strokeLinejoin="miter" strokeLinecap="butt" strokeDashoffset="" fillRule="nonzero" opacity="1" markerStart="" markerMid="" markerEnd="" d="M595.7336893160524,50.61904726659017 C595.7336893160524,47.477564353968766 598.3674647159067,44.93296319474543 601.6190392836284,44.93296319474543 C604.87061385135,44.93296319474543 607.5043892512043,47.477564353968766 607.5043892512043,50.61904726659017 C607.5043892512043,53.76053017921157 604.87061385135,56.305131338434904 601.6190392836284,56.305131338434904 C598.3674647159067,56.305131338434904 595.7336893160524,53.76053017921157 595.7336893160524,50.61904726659017 z" transform="rotate(0.07305727899074554 601.6190185546812,50.61904907219691) " id="svg_256"/>					


						</g>
					</svg>
				</div>
				<div style={{marginTop: '20px'}}> Imperial
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="484" height="52">
					<rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
					<g>
					<path fill="none" stroke="#808080" d="M1,51.125 L483,51.125 " strokeWidth="2" id="svg_1" />
					<path fill="none" stroke="#808080" d="M1,1.125 L483,1.125 " strokeWidth="2" id="svg_2" />
					<path fill="none" stroke="#808080" d="M2,51.125 L2,1.125 " strokeWidth="2" id="svg_3"/>

					<text x="78.2539718747139" y="224.61706233024597" textAnchor="middle" stroke="none" fill="#000000" fontFamily="serif" fontSize="12px"  id="svg_4" >
						<tspan id="svg_5" x="10.253971874713898" y="14.617062330245972">in</tspan>
					</text>

					<path fill="none" stroke="#808080" d="M4.5,51.125 L4.5,41.125 " strokeWidth="1"  id="svg_6" />

					<path fill="none" stroke="#808080" d="M7,51.125 L7,36.125 " strokeWidth="1" id="svg_7" />

					<path fill="none" stroke="#808080" d="M9.5,51.125 L9.5,41.125 " strokeWidth="1" id="svg_8"/>

					<path fill="none" stroke="#808080" d="M12,51.125 L12,28.625 " strokeWidth="1" id="svg_9" />

					<path fill="none" stroke="#808080" d="M14.5,51.125 L14.5,41.125 " strokeWidth="1" id="svg_10" />

					<path fill="none" stroke="#808080" d="M17,51.125 L17,36.125 " strokeWidth="1" id="svg_11" />

					<path fill="none" stroke="#808080" d="M19.5,51.125 L19.5,41.125 " strokeWidth="1" id="svg_12" />

					<path fill="none" stroke="#808080" d="M22,51.125 L22,21.125 " strokeWidth="1" id="svg_13" />

					<path fill="none" stroke="#808080" d="M24.5,51.125 L24.5,41.125 " strokeWidth="1" id="svg_14"/>

					<path fill="none" stroke="#808080" d="M27,51.125 L27,36.125 " strokeWidth="1" id="svg_15" />
					<path fill="none" stroke="#808080" d="M29.5,51.125 L29.5,41.125 " strokeWidth="1" id="svg_16" />
					<path fill="none" stroke="#808080" d="M32,51.125 L32,28.625 " strokeWidth="1" id="svg_17" />
					<path fill="none" stroke="#808080" d="M34.5,51.125 L34.5,41.125 " strokeWidth="1" id="svg_18" />
					
					<path fill="none" stroke="#808080" d="M37,51.125 L37,36.125 " strokeWidth="1" id="svg_19" />

					<path fill="none" stroke="#808080" d="M39.5,51.125 L39.5,41.125 " strokeWidth="1" id="svg_20" />

					<path fill="none" stroke="#808080" d="M42,51.125 L42,1.125 " strokeWidth="1" id="svg_21" />
					
					<text x="130.4444465637207" y="224.61705857515335" textAnchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000"  id="svg_22">
						<tspan id="svg_23" x="36.4444465637207" y="14.61705857515335">1</tspan>
					</text>
					<path fill="none" stroke="#808080" d="M482,51.125 L482,1.125 " strokeWidth="2" id="svg_219" /></g></svg>
				</div>
			</div>
		);
  }
}

