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
			<svg width={width+100} height={height+100} >
		
				<rect x="30" width={width} height={height} style={{fill:'rgb(255,255,255)', strokeWidth:2, stroke:'rgba(0,0,0,0.3)'}} />
				<circle cx="30" cy="40" 
								r={this.state.cirRadius}
								style={{stroke:'#00660',
								strokeWidth: 3,
								fill:'green', fillOpacity: 0.6}}
								onMouseOver={this.handleMouseOver}
								onMouseOut={this.handleMouseOut} 
								onMouseEnter={() => {this.props.handleRotate()}}
				/>
				<text x="10" y="15" fontSize="10px">cm</text>
				
				<line x1="25" y1="20" x2="25" y2="50" stroke="#555555" strokeWidth="1"></line>
				<line x1="30" y1="20" x2="30" y2="50" stroke="#555555" strokeWidth="1"></line>
				<line x1="35" y1="20" x2="35" y2="50" stroke="#555555" strokeWidth="1"></line>
				<line x1="40" y1="20" x2="40" y2="50" stroke="#555555" strokeWidth="1"></line>
				<line x1="45" y1="20" x2="45" y2="50" stroke="#555555" strokeWidth="1"></line>
				<line x1="50" y1="20" x2="50" y2="50" stroke="#555555" strokeWidth="1"></line>
				
				<path d="M 55 40 v-20" stroke="black" strokeWidth="1px" fill="none" />
				<path d="M 60 40 v-10" stroke="black" strokeWidth="1px" fill="none" />
				<path d="M 65 40 v-15" stroke="black" strokeWidth="1px" fill="none" />
				<path d="M 70 40 v-20" stroke="black" strokeWidth="1px" fill="none" />
				<path d="M 75 40 v-40" stroke="black" strokeWidth="1px" fill="none" />
				
			</svg>
		);
  }
}

