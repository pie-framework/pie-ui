import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group, Text } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

import Image from './image';
import { faCorrect, faWrong } from './icons';

class PolygonComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getPolygonCenter = (points) => {
    const x = points.map(({ x }) => x);
    const y = points.map(({ y }) => y);
    const minX = Math.min.apply (null, x);
    const maxX = Math.max.apply (null, x);
    const minY = Math.min.apply (null, y);
    const maxY = Math.max.apply (null, y);
    return [(minX + maxX) / 2, (minY + maxY) / 2];
  };

  parsePointsForKonva = (points) => {
    const parsedPoints = [];
    points.forEach(({ x, y }) => {
      parsedPoints.push(x);
      parsedPoints.push(y);
    });
    return parsedPoints;
  };

  handleClick = (e) => {
    const { onClick, id, selected, disabled } = this.props;

    if (!disabled) {
      e.cancelBubble = true;
      onClick({ id, selected: !selected });
    }
  };

  handleMouseEnter = () => {
    const { disabled } = this.props;

    if (!disabled) {
      document.body.style.cursor = 'pointer';
    }
  };

  handleMouseLeave = () => {
    document.body.style.cursor = 'default';
  };

  getEvaluateOutlineColor = (isCorrect, outlineColor) => isCorrect ? outlineColor : 'red';

  getOutlineWidth = (selected) => selected ? 2 : 0;

  getEvaluateText = (isCorrect, selected) => {
    if (selected && isCorrect) {
      return 'Correctly\nselected';
    } else if (selected && !isCorrect) {
      return 'Incorrectly\nselected';
    } else if (!selected && isCorrect) {
      return 'Correctly\nunselected';
    }
    return 'Incorrectly\nunselected';
  };

  render() {
    const {
      classes,
      hotspotColor,
      isCorrect,
      isEvaluateMode,
      outlineColor,
      selected,
      points,
    } = this.props;

    const outlineColorParsed = isEvaluateMode
      ? this.getEvaluateOutlineColor(isCorrect, outlineColor)
      : outlineColor;
    const outlineWidth = this.getOutlineWidth(selected);
    const iconSrc = isCorrect ? faCorrect : faWrong;
    const pointsParsed = this.parsePointsForKonva(points);

    const center = this.getPolygonCenter(points);
    const iconX = center[0];
    const iconY = center[1];
    const textX = iconX - 13;
    const textY = iconY + 25;

    return (
      <Group>
        <Line
          points={pointsParsed}
          closed={true}
          classes={classes.base}
          fill={hotspotColor}
          onClick={this.handleClick}
          draggable={false}
          stroke={outlineColorParsed}
          strokeWidth={outlineWidth}
          onMouseLeave={this.handleMouseLeave}
          onMouseEnter={this.handleMouseEnter}
        />
        {isEvaluateMode ? (
          <Image
            src={iconSrc}
            x={iconX}
            y={iconY}
          />
        ): null}
        {isEvaluateMode ? (
          <Text
            text={this.getEvaluateText(isCorrect, selected)}
            x={textX}
            y={textY}
          />
        ) : null}
      </Group>
    );
  }
}

const styles = () => ({
  base: {
    cursor: 'pointer',
    opacity: 0.5,
    position: 'relative'
  },
});

PolygonComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  hotspotColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isEvaluateMode: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  outlineColor: PropTypes.string.isRequired,
  points: PropTypes.array.isRequired,
  selected: PropTypes.bool.isRequired
};

export default withStyles(styles)(PolygonComponent);
