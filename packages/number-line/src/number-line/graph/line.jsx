import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const style = {
  root: {
    strokeWidth: 2,
    stroke: 'var(--line-stroke, black)'
  }
};

export function Line({ y, width, classes }) {
  return <line x1={0} y1={y} x2={width} y2={y} className={classes.root} />;
}

Line.propTypes = {
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default injectSheet(style)(Line);
