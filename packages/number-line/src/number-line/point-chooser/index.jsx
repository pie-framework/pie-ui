import React, { PropTypes as PT } from 'react';

import classNames from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';

let DeleteIcon = ({ classes }) => {
  return <svg
    className={classes.deleteIcon}
    fill="#000000"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
};

const RawPoint = (props) => {
  const {iconKey, active, classes, onClick} = props;
  const names = classNames(classes[iconKey], { active });
  return <span
    role="presentation"
    key={iconKey}
    onClick={onClick} >
    <a className={names}>&nbsp;</a>
  </span>
}

export const Point = injectSheet(styles)(RawPoint);

const Points = ({ selectPoint, classes, selected, icons }) => {
  const iconTags = icons.map(key => {
    let active = key === selected;
    let onClick = active ? () => { } : selectPoint.bind(null, key);
    return <Point
      key={key.toLowerCase()} 
      iconKey={key.toLowerCase()} 
      active={active} 
      onClick={onClick} /> //icon(key, active);
  });

  return <div className={classes.elementSelector}>
    {iconTags}
  </div>;
}

export class PointChooser extends React.Component {

  render() {
    let {
      elementType,
      showDeleteButton,
      onDeleteClick,
      icons,
      classes,
      onElementType } = this.props;

    return <div className={classes.pointChooser}>
      <Points
        selected={elementType}
        classes={classes}
        selectPoint={onElementType}
        icons={icons} />
      {showDeleteButton &&
        <span
          className={classes.deleteIconHolder}
          onClick={onDeleteClick}><DeleteIcon classes={classes} /></span>
      }
    </div>;
  }
}

export default injectSheet(styles)(PointChooser);

PointChooser.DEFAULT_TYPE = 'pf';

PointChooser.defaultProps = {
  showDeleteButton: false,
  elementType: PointChooser.DEFAULT_TYPE,
  icons: ['pf', 'pe', 'lff', 'lef', 'lfe', 'lee', 'rfn', 'rfp', 'ren', 'rep']
}

PointChooser.propTypes = {
  elementType: PT.string,
  showDeleteButton: PT.bool,
  onDeleteClick: PT.func.isRequired,
  onElementType: PT.func.isRequired,
  icons: PT.array
}