import React from 'react';
import PropTypes from 'prop-types';

const Tick = ({x1,y1, x2, y2, fill, stroke, strokeWidth}) => {
  let d = `M${x1},${y1} L${x2},${y2}`;
  return (
    <path fill={fill} stroke={stroke} d={d} strokeWidth={strokeWidth}  />  
  );
};

Tick.defaultProps = {
  fill: 'none',
  stroke: '#808080',
  strokeWidth: 1
};

Tick.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number
};

export default Tick;