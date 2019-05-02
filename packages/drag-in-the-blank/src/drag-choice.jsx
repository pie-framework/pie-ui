import React from 'react';
// import { DragSource, DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { DragSource } from '@pie-lib/drag';

export const DRAG_TYPE = 'MaskBlank';

const BlankContent = withStyles(theme => ({
  choice: {
    border: `solid 0px ${theme.palette.primary.main}`
  }
}))(props => {
  const { connectDragSource, classes } = props;
  return connectDragSource(
    <span className={classes.choice}>
      <Chip label={props.value} />
    </span>,
    {}
  );
});

const tileSource = {
  canDrag(props) {
    return !props.disabled;
  },
  beginDrag(props) {
    return {
      id: props.targetId,
      value: props.value,
      instanceId: props.instanceId
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      if (props.type === 'target') {
        props.onRemoveChoice(monitor.getItem());
      }
    }
  }
};

const DragDropTile = DragSource(DRAG_TYPE, tileSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(BlankContent);

export default DragDropTile;
