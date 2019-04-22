import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';

import Rectangle from './rectangle';

class Container extends React.Component {
  handleClick = (e) => {
    const { onUpdateShapes } = this.props;

    const newShapes = this.props.shapes.slice();
    newShapes.push({
      height: 0,
      width: 0,
      x: e.evt.layerX,
      y: e.evt.layerY
    });

    onUpdateShapes(newShapes);
  };

  isSelected(index) {
    return this.props.session.answers.filter(answer => answer.index === index)[0];
  }

  handleOnImageLoad = ({ target: { offsetHeight, offsetWidth } }) => {
    // this.setState({
    //   dimensions: {
    //     height: offsetHeight,
    //     width: offsetWidth
    //   }});
  };

  render() {
    const {
      classes,
      dimensions: { width, height },
      hotspotColor,
      imageUrl,
      outlineColor,
      onSelectChoice,
      shapes
    } = this.props;

    return (
      <div className={classes.base}>
        {imageUrl ? (
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              height="auto"
              onLoad={this.handleOnImageLoad}
              src={imageUrl}
              style={{ width, height, maxWidth: width, maxHeight: height }}
            />
          </div>
        ) : null}

        <Stage
          className={classes.stage}
          height={height}
          onClick={this.handleClick}
          width={width}
        >
          <Layer>
            {shapes.map((shape, index) => (
              <Rectangle
                selected={this.isSelected(index)}
                height={shape.height}
                hotspotColor={hotspotColor}
                index={index}
                key={index}
                onClick={onSelectChoice}
                outlineColor={outlineColor}
                width={shape.width}
                x={shape.x}
                y={shape.y}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

const styles = theme => ({
  base: {
    position: 'relative',
    marginTop: theme.spacing.unit * 3,
  },
  stage: {
    left: 0,
    top: 0,
    position: 'absolute'
  },
  image: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 'fit-content'
  },
  resize: {
    borderBottom: '1px solid #727272',
    borderRight: '1px solid #727272',
    bottom: '-10px',
    cursor: 'se-resize',
    height: '10px',
    position: 'absolute',
    right: '-10px',
    width: '10px',
  }
});

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  disableDrag:PropTypes.func.isRequired,
  enableDrag:PropTypes.func.isRequired,
  imageUrl:PropTypes.string.isRequired,
  hotspotColor:PropTypes.string.isRequired,
  maxImageHeight:PropTypes.number.isRequired,
  maxImageWidth:PropTypes.number.isRequired,
  multipleCorrect:PropTypes.bool.isRequired,
  onUpdateShapes:PropTypes.func.isRequired,
  outlineColor:PropTypes.string.isRequired,
  shapes:PropTypes.shape([]).isRequired,
};

export default withStyles(styles)(Container);
