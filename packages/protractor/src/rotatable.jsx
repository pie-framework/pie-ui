import React from 'react';


class Rotatable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            rotation: 0,
            isDragging: false,
            startAngle: 0,
            angle: 0
        };
    }

    mouseDownHandler = (e) => {
        const R2D = 180 / Math.PI;
        let height, left, top, width, x, y, _ref, center;
        e.preventDefault();
        _ref = document.getElementById("rotateDiv").getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
        center = {
            x: left + (width / 2),
            y: top + (height / 2)
        };
        x = e.clientX - center.x;
        y = e.clientY - center.y;
        this.setState({
            isDragging: true,
            startAngle: R2D * Math.atan2(y, x)
        });
    }

    mouseMoveHandler = (e) => {
        const R2D = 180 / Math.PI;
        let d, height, left, top, width, x, y, _ref, center;
        _ref = document.getElementById("rotateDiv").getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
        center = {
            x: left + (width / 2),
            y: top + (height / 2)
        };
        e.preventDefault();
        x = e.clientX - center.x;
        y = e.clientY - center.y;
        d = R2D * Math.atan2(y, x);
        let rotation = d - this.state.startAngle;
        if (this.state.isDragging) {
            this.setState({
                rotation: (this.state.angle + rotation)
            });
        }
    }

    mouseUpHandler = (e) => {
        let angle = 0;
        angle += this.state.rotation;
        this.setState({
            angle: angle,
            isDragging: false
        });
    }

  render() {
      const { rotation } = this.state;
      return <div className={this.props.classNames} onMouseOver={() => this.setState({ hovered: true })} onMouseOut={() => this.setState({ hovered: false })} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler} onMouseMove={this.mouseMoveHandler} id="rotateDiv" style={{ position: 'absolute', WebkitTransformStyle: 'preserve-3d', position: 'absolute', top: '137px', width: '502px', height: '180px', left: '0px', zIndex: '3', WebkitTransform: `rotate(${rotation}deg)` }}>{this.props.handle}</div>;
    }
}


export default Rotatable;