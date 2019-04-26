import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Group, Text } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

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

  getEvaluateOutlineWidth = (selected, isCorrect) => selected ? 2 : (isCorrect ? 0 : 2);

  getDefaultOutlineWidth = (selected) => selected ? 2 : 0;

  // TODO: Replace text with icons
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

    const outlineWidth = isEvaluateMode
      ? this.getEvaluateOutlineWidth(selected, isCorrect)
      : this.getDefaultOutlineWidth(selected);

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
          <Text
            text={this.getEvaluateText(isCorrect, selected)}
            x={x}
            y={y}
          />
        ) :null}
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
  isCorrect: PropTypes.bool.isRequired,
  isEvaluateMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  outlineColor: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default withStyles(styles)(RectComponent);
