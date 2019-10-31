import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import { Layer, Stage } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

import ImageBackground from './drawable-image';
import FreePathDrawable from './drawable-free-path';
import LineDrawable from './drawable-line';
import RectangleDrawable from './drawable-rectangle';
import CircleDrawable from './drawable-circle';
import EraserDrawable from './drawable-eraser';
import Button from './button';

const drawableToJSON = drawable => JSON.parse(JSON.stringify(drawable));

class DrawableMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawables: [],
      newDrawable: [],
      textIsSelected: false,
    };
    this.debouncedSessionChange = debounce(this.handleSessionChange, 500);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.session) {
      const { TextEntry } = nextProps;
      const { drawables: currentDrawables } = this.state;

      if (nextProps.session.drawables) {
        const newDrawables = cloneDeep(nextProps.session.drawables);
        const drawablesString = JSON.stringify(currentDrawables);
        const sessionDrawableString = JSON.stringify((newDrawables || []).map(drawable => omit(drawable, 'type')));

        if (drawablesString !== sessionDrawableString) {
          const drawableArray = nextProps.session.drawables;

          this.setState({
            drawables: drawableArray.map(drawable => this.getNewDrawableBasedOnType(drawable, drawable.type))
          });
        }

        const currentTexts = TextEntry.all.map((text) => ({
          ...text,
          ...TextEntry[`text_${text.id}`] && TextEntry[`text_${text.id}`].attrs,
          value: TextEntry[`textarea_${text.id}`] && TextEntry[`textarea_${text.id}`].value
        }));

        if (!isEqual(currentTexts, nextProps.session.texts)) {
          TextEntry.setAll(nextProps.session.texts);
        }
      }

    } else {
      this.debouncedSessionChange();
    }
  }

  handleSessionChange = () => {
    const { onSessionChange, session, TextEntry } = this.props;
    const { drawables } = this.state;

    const newSession = {
      drawables: drawables.map(drawable => ({
        ...drawableToJSON(drawable),
        type: drawable.constructor.name
      })),
      texts: TextEntry.all.map((text) => ({
        ...text,
        ...TextEntry[`text_${text.id}`] && TextEntry[`text_${text.id}`].attrs,
        value: TextEntry[`textarea_${text.id}`] && TextEntry[`textarea_${text.id}`].value
      }))
    };

    if (!isEqual(newSession, session)) {
      onSessionChange({
        ...session,
        ...newSession
      });
    }
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

  onMouseOverElement = () => this.setState({
    isOver: true
  });

  onMouseOutElement = () => this.setState({
    isOver: false
  });

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
      }, this.debouncedSessionChange.bind(this, drawableToAdd));
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
      this.setState({ updatedAt: new Date() }, this.debouncedSessionChange);
    } else {
      newDrawables.pop();
      this.setState({ drawables: newDrawables }, this.debouncedSessionChange);
    }
  };

  handleClearAll = () => {
    const { TextEntry } = this.props;

    TextEntry.all.pop();
    this.setState({ drawables: [], updatedAt: new Date() }, this.debouncedSessionChange);
  };

  toggleTextSelected = textIsSelected => {
    this.setState({ textIsSelected });
  };

  render() {
    const {
      classes,
      drawableDimensions,
      fillColor,
      imageDimensions,
      imageUrl,
      paintColor,
      outlineColor,
      TextEntry,
      toolActive: { type }
    } = this.props;
    const { isOver, newDrawable } = this.state;

    const draggable = type === 'Select';
    const paint = type === 'PaintBucket';
    const drawables = [...this.state.drawables, ...this.state.newDrawable];

    const drawableProps = {
      draggable,
      paint,
      fillColor,
      forceUpdate: () => this.setState({ updatedAt: new Date() }),
      paintColor,
      outlineColor,
      toggleTextSelected: this.toggleTextSelected,
      handleSessionChange: this.handleSessionChange,
      debouncedSessionChange: this.debouncedSessionChange,
      stage: this.stage,
      onMouseOverElement: this.onMouseOverElement,
      onMouseOutElement: this.onMouseOutElement
    };

    const listeners = {
      onMouseUp: this.handleMouseUp,
      onMouseMove: this.handleMouseMove
    };

    if (!draggable) {
      listeners.onMouseDown = this.handleMouseDown;
    }

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
            className={classnames(classes.stage, {
              [classes.active]: draggable && (isOver || (newDrawable && newDrawable.length === 1))
            })}
            height={drawableDimensions.height}
            width={drawableDimensions.width}
            {...listeners}
          >
            <Layer ref={ref => { this.layer = ref; }}>
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

const styles = () => ({
  base: {
    position: 'relative',
    width: '100%',
  },
  stage: {
    left: 0,
    position: 'absolute',
    top: 0
  },
  active: {
    cursor: 'pointer'
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
  imageDimensions: PropTypes.object.isRequired,
  fillColor: PropTypes.string.isRequired,
  onSessionChange: PropTypes.func.isRequired,
  paintColor: PropTypes.string.isRequired,
  outlineColor: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  TextEntry: PropTypes.object.isRequired,
  toolActive: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawableMain);
