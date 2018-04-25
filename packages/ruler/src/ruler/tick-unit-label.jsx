import React from 'react';
import PropTypes from 'prop-types';

const RulerUnitLabel = ({label, x, y, textAlign, fill, fontSize, stroke}) => {
  return (
    <text x={x} y={y} textAnchor={textAlign} stroke={stroke} fill={fill} fontSize={fontSize} >{label}</text>
  );
};

RulerUnitLabel.propTypes = {
  label: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  textAlign: PropTypes.string,
  fill: PropTypes.string,
  fontSize:  PropTypes.number,
  stroke: PropTypes.string
};

RulerUnitLabel.defaultProps = {
  textAlign: 'middle',
  fill: '#000000',
  fontSize: 11,
  stroke: 'none',
  x: 15,
  y: 20
};

export default RulerUnitLabel;