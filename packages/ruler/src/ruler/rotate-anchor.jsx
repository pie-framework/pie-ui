import React from 'react';
import PropTypes from 'prop-types';
const RotateAnchor = ({cx, cy, r, stroke, strokeWidth, fill}) => {
  return (
    <circle cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
  );
}

RotateAnchor.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
};

RotateAnchor.defaultProps = {
  stroke: '#67e767',
  strokeWidth: 2,
  fill: 'none'
};

export default RotateAnchor;