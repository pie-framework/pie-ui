import React, { PropTypes as PT } from 'react';

import classNames from 'classnames';
import injectSheet from 'react-jss';

const style = {
  root: {
    fill: 'var(--arrow-color, black)'
  }
}

export function Arrow({ x, y, direction, classes, className }) {

  let transform = `translate(${x || 0},${y})`;

  if (direction && direction === 'right') {
    transform += ` rotate(180)`
  }

  const names = classNames(classes.root, className);
  return <path
    d="m 0,0 8,-5 0,10 -8,-5"
    transform={transform}
    className={names} />
}

Arrow.propTypes = {
  y: PT.number,
  x: PT.number,
  direction: PT.oneOf(['left', 'right'])
}

Arrow.defaultProps = {
  y: 0,
  x: 0,
  direction: 'left'
}

export default injectSheet(style)(Arrow);