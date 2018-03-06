import React from 'react';
import injectSheet from 'react-jss';

const style = {
  root: {
    strokeWidth: 2,
    stroke: 'var(--line-stroke, black)'
  }
}

export function Line({ y, width, classes }) {
  return <line
    x1={0}
    y1={y}
    x2={width}
    y2={y}
    className={classes.root} />
}

export default injectSheet(style)(Line);
