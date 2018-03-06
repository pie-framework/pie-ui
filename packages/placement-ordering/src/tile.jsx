import { DragSource, DropTarget } from 'react-dnd';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('pie-elements:placement-ordering:tile');

const PlaceHolder = withStyles({
  placeholder: {
    width: '100%',
    height: '100%',
    background: '#f8f6f6',
    boxShadow: 'inset 3px 4px 2px 0 rgba(0,0,0,0.08)',
    border: '1px solid #c2c2c2',
    transition: 'background-color 200ms linear',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  over: {
    backgroundColor: '#ddd'
  },
  //hide choice placeholders
  choice: {
    opacity: '0.0'
  },
  number: {
    width: '100%',
    fontSize: '30px',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)'
  }
})(({ classes, isOver, type, index }) => {
  const names = classNames(classes.placeholder, isOver && classes.over, classes[type]);
  return (
    <div className={names}>
      {type === 'target' && index !== undefined && <div className={classes.number}>{index}</div>}
    </div>
  )
});

const TileContent = withStyles({
  over: {
    opacity: 0.2
  },
  tileContent: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    border: '1px solid #c2c2c2',
    backgroundColor: 'white',
    transition: 'opacity 200ms linear'
  },
  dragging: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: '#ececec',
    cursor: 'not-allowed'
  },
  incorrect: {
    border: 'solid 1px orange'
  },
  correct: {
    border: 'solid 1px green'
  }
})((props) => {
  log('[TileContent] render: ', props);
  const { type, classes, isDragging, empty, isOver, label, disabled, outcome, guideIndex } = props;

  if (empty) {
    return <PlaceHolder
      type={type}
      index={guideIndex}
      isOver={isOver}
      disabled={disabled} />;
  } else {
    const names = classNames(
      classes.tileContent,
      isDragging && !disabled && classes.dragging,
      isOver && !disabled && classes.over,
      disabled && classes.disabled,
      outcome && classes[outcome]
    );
    return <div
      className={names}
      dangerouslySetInnerHTML={{ __html: label }}></div>
  }
});

export class Tile extends React.Component {

  render() {
    const {
      label,
      isDragging,
      connectDragSource,
      connectDropTarget,
      classes,
      isOver,
      type,
      id,
      empty,
      disabled,
      moveOnDrag,
      outcome,
      index,
      guideIndex } = this.props;

    const opacity = isDragging ? 0.5 : 1;

    log('[render], props: ', this.props);

    const name = classNames(classes.tile);

    const dragSourceOpts = {
      //dropEffect: moveOnDrag ? 'move' : 'copy'
    }

    return connectDragSource(
      connectDropTarget(
        <div className={name}>
          <TileContent
            label={label}
            id={id}
            empty={empty}
            index={index}
            guideIndex={guideIndex}
            isOver={isOver}
            isDragging={isDragging}
            disabled={disabled}
            outcome={outcome}
            type={type} />
        </div>,
      ),
      dragSourceOpts
    );
  }
}

Tile.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any,
  label: PropTypes.string,
  isOver: PropTypes.bool
};

const StyledTile = withStyles({
  tile: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    margin: '0px',
    padding: '0px',
    textAlign: 'center'
  }
})(Tile);


const tileTarget = {
  drop(props, monitor) {
    const draggedItem = monitor.getItem();
    log('props.instanceId', props.instanceId, 'draggedItem.instanceId:', draggedItem.instanceId);
    if (draggedItem.instanceId === props.instanceId) {
      props.onDropChoice(draggedItem, props.index);
    }
  },
  canDrop(props, monitor) {
    const draggedItem = monitor.getItem();
    const canDrop = draggedItem.instanceId === props.instanceId;
    return canDrop;
  }
}

const DropTile = DropTarget('Tile', tileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(StyledTile);

const tileSource = {
  canDrag(props) {
    return props.draggable && !props.disabled;
  },
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      type: props.type,
      instanceId: props.instanceId
    };
  },
  endDrag(props, monitor, container) {
    if (!monitor.didDrop()) {
      console.log('dont drop!!!');
      if (props.type === 'target') {
        props.onRemoveChoice(monitor.getItem())
      }
    }
  }
};

const DragDropTile = DragSource('Tile', tileSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(DropTile);


export default DragDropTile;