import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Group } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

class RectComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    const { width, height, onClick, index, selected } = this.props;
    if (width < 0 && height < 0) {
      return;
    }
    e.cancelBubble = true;
    onClick({ index, selected: !selected });
  };

  handleMouseEnter = () => {
    document.body.style.cursor = 'pointer';
  };

  handleMouseLeave = () => {
    document.body.style.cursor = 'default';
  };

  render() {
    const { classes, hotspotColor, outlineColor, width, height, x, y, selected } = this.props;

    return (
      <Group>
        <Rect
          classes={classes.base}
          width={width}
          height={height}
          fill={hotspotColor}
          onClick={this.handleClick}
          draggable={false}
          stroke={outlineColor}
          strokeWidth={selected ? 2 : 0}
          onMouseLeave={this.handleMouseLeave}
          onMouseEnter={this.handleMouseEnter}
          x={x}
          y={y}
        >
        </Rect>
      </Group>
    );
  }
}

const styles = theme => ({
  base: {
    cursor: 'pointer',
    opacity: 0.5,
    position: 'relative'
  },
});

RectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  hotspotColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  outlineColor: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired
};

export default withStyles(styles)(RectComponent);
