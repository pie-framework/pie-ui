import PropTypes from 'prop-types';
import React from 'react';
import Tile from './tile';
import { withStyles } from '@material-ui/core/styles';

const common = {
  tiler: {
    display: 'grid',
    gridGap: '10px'
  }
};

const types = {
  choiceLabel: PropTypes.string,
  targetLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onDropChoice: PropTypes.func.isRequired,
  tiles: PropTypes.array.isRequired,
  tileSize: PropTypes.string,
  addGuide: PropTypes.bool
};

const defaults = {
  tileSize: '1fr',
  disabled: false,
  addGuide: false
};

const buildTiles = props => {
  const T = (tile, index) => {
    tile.onDropChoice = (source, index) =>
      props.onDropChoice(tile, source, index);
    tile.onRemoveChoice = () => props.onRemoveChoice(tile);
    tile.instanceId = props.instanceId;
    tile.disabled = props.disabled;
    tile.guideIndex = props.addGuide ? tile.index + 1 : undefined;
    return <Tile {...tile} key={index} />;
  };

  T.propTypes = { ...types };
  return T;
};

class HTiler extends React.Component {
  static propTypes = { ...types };
  static defaultProps = { ...defaults };
  render() {
    const {
      includeTargets,
      choiceLabel,
      targetLabel,
      tiles,
      classes,
      tileSize
    } = this.props;

    const rows = includeTargets
      ? `auto ${tileSize} auto ${tileSize}`
      : `auto ${tileSize} auto`;
    const columns = includeTargets ? tiles.length / 2 : tiles.length;

    const style = {
      gridTemplateColumns: `repeat(${columns}, ${tileSize})`,
      gridTemplateRows: rows
    };

    const labelStyle = {
      gridColumn: `1/${columns + 1}`
    };

    return (
      <div className={classes.htiler} style={style}>
        <div className={classes.choiceLabel} style={labelStyle} dangerouslySetInnerHTML={{ __html: choiceLabel }}/>

        {includeTargets && (
          <div className={classes.targetLabel} style={labelStyle} dangerouslySetInnerHTML={{ __html: targetLabel }}/>
        )}
        {tiles.map(buildTiles(this.props))}
      </div>
    );
  }
}

const horizontalStyles = {
  htiler: common.tiler,
  choiceLabel: {
    textAlign: 'center'
  },
  targetLabel: {
    textAlign: 'center',
    gridRow: '3/4'
  }
};

export const HorizontalTiler = withStyles(horizontalStyles)(HTiler);

class VTiler extends React.Component {
  static propTypes = { ...types };
  static defaultProps = { ...defaults };
  render() {
    const {
      includeTargets,
      choiceLabel,
      targetLabel,
      tiles,
      classes,
      tileSize
    } = this.props;

    const columns = includeTargets ? 2 : 1;
    const rows = includeTargets ? tiles.length / 2 : tiles.length;

    const style = {
      gridTemplateColumns: `repeat(${columns}, ${tileSize})`,
      gridTemplateRows: `auto repeat(${rows}, ${tileSize})`
    };

    return (
      <div className={classes.vtiler} style={style}>
        <div className={classes.choiceLabel} dangerouslySetInnerHTML={{ __html: choiceLabel }}/>

        {includeTargets && (
          <div className={classes.targetLabel} dangerouslySetInnerHTML={{ __html: targetLabel }}/>
        )}
        {tiles.map(buildTiles(this.props))}
      </div>
    );
  }
}

const verticalStyles = {
  vtiler: { gridAutoFlow: 'column', ...common.tiler },
  choiceLabel: {
    gridColumn: '1/2',
    textAlign: 'center'
  },
  targetLabel: {
    gridColumn: '2/3',
    textAlign: 'center'
  }
};

export const VerticalTiler = withStyles(verticalStyles)(VTiler);
