import React from "react";
import PropTypes from 'prop-types';

const RulerBg = ({bgX1, bgX2, bgY1, bgFill, bgStroke, bgStrokeWidth}) => {
  let rectPath = `M${bgX1},${bgY1} L${bgX2},${bgY1} L${bgX2},1 L${bgX1},1 Z`;
  return (
    <path fill={bgFill} stroke={bgStroke} d={rectPath} strokeWidth={bgStrokeWidth} />
  );
};

RulerBg.propTypes = {
  bgX1: PropTypes.string,
  bgX2: PropTypes.string,
  bgX2: PropTypes.string,
  bgFill: PropTypes.string,
  bgStroke: PropTypes.string,
  bgStrokeWidth: PropTypes.number
};

RulerBg.defaultProps = {
  bgFill: 'none',
  bgStroke: '#808080',
  bgStrokeWidth: 2
};

export default RulerBg;