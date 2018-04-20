import React, { Component } from "react";
import RulerBg from './ruler-bg';
import PropTypes from 'prop-types';

export default class extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  constructor (props) {
    super (props);
  }

  render () {
    let {width, height} = this.props;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} >
        <rect id="ruler_background" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
        <g>
          <RulerBg bgX1="1" bgX2={width} bgY1={height}  />
        </g>
      </svg>
    );
  }
}

