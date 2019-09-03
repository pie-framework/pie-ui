import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Group, Text } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

import Image from './image';
import { faCorrect, faWrong } from './icons';

class RectComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    const { width, height, onClick, id, selected, disabled } = this.props;

    if (!disabled) {
      if (width < 0 && height < 0) {
        return;
      }
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
      height,
      hotspotColor,
      isCorrect,
      isEvaluateMode,
      outlineColor,
      selected,
      width,
      x,
      y
    } = this.props;

    const outlineColorParsed = isEvaluateMode
      ? this.getEvaluateOutlineColor(isCorrect, outlineColor)
      : outlineColor;

    const outlineWidth = this.getOutlineWidth(selected);

    const iconX = (x + (width / 2)) - 10;
    const iconY = (y + (height / 2)) - 10;
    const textX = iconX - 13;
    const textY = iconY + 25;

    const iconSrc = isCorrect ? faCorrect : faWrong;

    return (
      <Group>
        <Rect
          classes={classes.base}
          width={width}
          height={height}
          fill={hotspotColor}
          onClick={this.handleClick}
          draggable={false}
          stroke={outlineColorParsed}
          strokeWidth={outlineWidth}
          onMouseLeave={this.handleMouseLeave}
          onMouseEnter={this.handleMouseEnter}
          x={x}
          y={y}
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

RectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hotspotColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isCorrect: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isEvaluateMode: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  outlineColor: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

RectComponent.defaultProps = {
  isCorrect: false,
};

export default withStyles(styles)(RectComponent);
