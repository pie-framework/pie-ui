import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

import ImageBackground from './drawable-image';

import FreePathDrawable from './drawable-free-path';
import LineDrawable from './drawable-line';
import RectangleDrawable from './drawable-rectangle';
import CircleDrawable from './drawable-circle';
import EraserDrawable from './drawable-eraser';
import Button from './button';

class DrawableMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawables: [],
      newDrawable: [],
      textIsDragging: false
    }
  }

  getNewDrawableBasedOnType = (props, type) => {
    const drawableClasses = {
      FreePathDrawable,
      LineDrawable,
      RectangleDrawable,
      CircleDrawable,
      EraserDrawable
    };
    return new drawableClasses[type](props);
  };

  handleMouseDown = e => {
    const { newDrawable, textIsDragging } = this.state;
    console.log('toggleTextIsDragging: ', textIsDragging);
    const { toolActive, fillColor, outlineColor } = this.props;
    if (newDrawable.length === 0 && !textIsDragging) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const newDrawable = this.getNewDrawableBasedOnType(
        {
          startx: x,
          starty: y,
          fillColor,
          outlineColor
        },
        toolActive.type
      );
      this.setState({
        newDrawable: [newDrawable]
      });
    }
  };

  handleMouseUp = e => {
    const { newDrawable, drawables, textIsDragging } = this.state;
    if (newDrawable.length === 1 && !textIsDragging) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const drawableToAdd = newDrawable[0];
      drawableToAdd.registerMovement(x, y);
      drawables.push(drawableToAdd);
      this.setState({
        newDrawable: [],
        drawables
      });
    }
  };

  handleMouseMove = e => {
    const { newDrawable, textIsDragging } = this.state;
    if (newDrawable.length === 1 && !textIsDragging) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const updatedNewDrawable = newDrawable[0];
      updatedNewDrawable.registerMovement(x, y);
      this.setState({
        newDrawable: [updatedNewDrawable]
      });
    }
  };

  handleUndo = () => {
    const { drawables } = this.state;
    const { TextEntry } = this.props;
    const newDrawables = [...drawables];
    const allData = [...drawables, ...TextEntry.all ];

    allData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const lastElement = allData[allData.length - 1];

    if (lastElement.type === 'text-entry') {
      TextEntry.all.pop();
      this.setState({ updatedAt: new Date() });
    } else {
      newDrawables.pop();
      this.setState({ drawables: newDrawables });
    }
  };

  handleClearAll = () => {
    const { TextEntry } = this.props;
    TextEntry.all.pop();
    this.setState({ drawables: [], updatedAt: new Date() });
  };

  render() {
    const {
      classes,
      drawableDimensions,
      fillColor,
      imageDimensions,
      imageUrl,
      outlineColor,
      paintColor,
      TextEntry,
      toolActive: { type },
      makeTextSelected
    } = this.props;

    const draggable = type === 'Select';
    const paint = type === 'PaintBucket';
    const drawables = [...this.state.drawables, ...this.state.newDrawable];

    const drawableProps = {
      draggable,
      paint,
      paintColor,
      fillColor,
      forceUpdate: () => this.setState({ updatedAt: new Date() }),
      outlineColor,
      stage: this.stage,
      makeTextSelected,
    };

    return (
      <div>
        <div className={classes.undoControls}>
          <Button
            onClick={this.handleUndo}
            label="Undo"
          />
          <Button
            onClick={this.handleClearAll}
            label="Clear all"
          />
        </div>
        <div className={classes.base}>
          {imageUrl && (
            <ImageBackground
              dimensions={imageDimensions}
              url={imageUrl}
            />
          )}

          {TextEntry.renderTextareas()}

          <Stage
            ref={ref => { this.stage = ref; }}
            className={classes.stage}
            height={drawableDimensions.height}
            width={drawableDimensions.width}
            {...draggable ? {} : {
              onMouseDown: this.handleMouseDown,
              onMouseUp: this.handleMouseUp,
              onMouseMove: this.handleMouseMove
            }}
          >
            <Layer>
              {drawables.map(drawable => drawable.render(drawableProps))}
              {/* Text Entry is a special case  */}
              {TextEntry.render(drawableProps)}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  base: {
    position: 'relative',
    width: '100%',
  },
  stage: {
    left: 0,
    position: 'absolute',
    top: 0
  },
  undoControls: {
    float: 'right',
    marginTop: -43,
    width: 163,
  },
});

DrawableMain.propTypes = {
  classes: PropTypes.object.isRequired,
  drawableDimensions: PropTypes.object.isRequired,
  fillColor: PropTypes.string.isRequired,
  paintColor: PropTypes.string.isRequired,
  outlineColor: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  toolActive: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawableMain);
