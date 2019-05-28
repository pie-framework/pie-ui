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

import { relativePos, forEachNeighbor, isSameColor } from './drawable-paint-utils';

class DrawableMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawables: [],
      newDrawable: [],
      textIsSelected: false
    }
  }

  componentDidMount() {
    this.handlePaintBucket();
  }

  handlePaintBucket = () => {
    const canvas = document.getElementsByClassName('konvajs-content')[0].children[0];
    const { drawableDimensions } = this.props;
    const cx = canvas.getContext('2d');
    // cx.canvas.height = drawableDimensions.height;
    // cx.canvas.width = drawableDimensions.width;
    cx.canvas.height = 350;
    cx.canvas.width = 662;

    canvas.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const { toolActive, paintColor } = this.props;
      const isPaint = toolActive.type === 'PaintBucket';

      if (isPaint && event.which === 1) {
        const imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height);
        const sample = relativePos(event, cx.canvas);
        const isPainted = new Array(imageData.width * imageData.height);
        const toPaint = [sample];

        while (toPaint.length) {
          const current = toPaint.pop();
          const id = current.x + current.y * imageData.width;

          if (isPainted[id]) {
            continue;
          } else {
            cx.fillRect(current.x, current.y, 1, 1);
            cx.fillStyle = paintColor;
            isPainted[id] = true;
          }

          forEachNeighbor(current, function (neighbor) {
            if (neighbor.x >= 0 && neighbor.x < imageData.width &&
              neighbor.y >= 0 && neighbor.y < imageData.height &&
              isSameColor(imageData, sample, neighbor)) {
              toPaint.push(neighbor);
            }
          });
        }
      }
    });
  };

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
    const { newDrawable, textIsSelected } = this.state;
    const { toolActive, fillColor, outlineColor } = this.props;
    if (newDrawable.length === 0 && !textIsSelected) {
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
    const { newDrawable, drawables } = this.state;
    if (newDrawable.length === 1) {
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
    const { newDrawable } = this.state;
    if (newDrawable.length === 1) {
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
      toolActive: { type }
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
      toggleTextSelected: textIsSelected => this.setState({ textIsSelected }),
      outlineColor,
      stage: this.stage
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
            // height={drawableDimensions.height}
            // width={drawableDimensions.width}
            height={350}
            width={662}
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
