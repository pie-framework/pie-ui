import React from 'react';
import RulerGenerator from './ruler-generator';
import Draggable from 'react-draggable';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      activeAngle: 0
    }

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    //this.handleRotate = this.handleRotate.bind(this);
  }

  handleDrag(e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  }

  onStart() {
    let activeDrag = this.state.activeDrags;
    this.setState({activeDrags: ++activeDrag});
  }

  onStop() {
    let activeDrag = this.state.activeDrags;
    this.setState({activeDrags: --activeDrag});
  }

  handleRotate() {
    console.log("rotate");
    let currAngle = this.state.activeAngle;
    this.setState({activeAngle : currAngle+10});
  }


  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    let {model} = this.props;
    
    
    //let ruler = rulerGenerator({label: 'cm', width: 500, tickInterval: 50, tickParts: 10, tickSize: 40, height: 50})
    //let {imgData, width, height} = ruler;
    return (
      <div>  
          <div style={{transform : `rotate(${this.state.activeAngle}deg)`}}>
            <RulerGenerator {...model} handleRotate={() => {this.handleRotate()}} />
          </div>
      </div>
    );
  }
}