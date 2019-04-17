import { DragSource, DropTarget } from 'react-dnd';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import { withStyles } from '@material-ui/core/styles';
import { PlaceHolder } from '@pie-lib/drag';
import isEmpty from 'lodash/isEmpty';

const log = debug('pie-elements:match-title:answer');

const Holder = withStyles(() => ({
  number: {
    width: '100%',
    fontSize: '18px',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)'
  }
}))(({ classes, index, isOver, disabled }) => (
  <PlaceHolder isOver={isOver} disabled={disabled}>
    {index !== undefined && <div className={classes.number}>{index}</div>}
  </PlaceHolder>
));

Holder.propTypes = {
  index: PropTypes.number,
  isOver: PropTypes.bool,
  disabled: PropTypes.bool
};

const AnswerContent = withStyles({
  over: {
    opacity: 0.2
  },
  answerContent: {
    backgroundColor: 'white',
    border: '1px solid #c2c2c2',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: 'opacity 200ms linear'
  },
  dragging: {
    opacity: 0.5
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
})(props => {
  const {
    classes,
    isDragging,
    isOver,
    title,
    disabled,
    empty,
    outcome,
    guideIndex,
    type
  } = props;

  if (empty) {
    return (
      <Holder
        index={guideIndex}
        isOver={isOver}
        disabled={disabled}
        type={type}
      />
    );
  } else {
    const names = classNames(
      classes.answerContent,
      isDragging && !disabled && classes.dragging,
      isOver && !disabled && classes.over,
      disabled && classes.disabled,
      outcome && classes[outcome]
    );

    return (
      <div className={names} dangerouslySetInnerHTML={{ __html: title }} />
    );
  }
});

export class Answer extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any,
    title: PropTypes.string,
    isOver: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    empty: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
  };

  render() {
    const {
      id,
      title,
      isDragging,
      connectDragSource,
      connectDropTarget,
      disabled,
      classes,
      isOver,
      type
    } = this.props;

    log('[render], props: ', this.props);

    const name = classNames(classes.answer);

    const dragSourceOpts = {
      //dropEffect: moveOnDrag ? 'move' : 'copy'
    };

    return connectDragSource(
      connectDropTarget(
        <div className={name}>
          <AnswerContent
            title={title}
            id={id}
            isOver={isOver}
            empty={isEmpty(title)}
            isDragging={isDragging}
            disabled={disabled}
            type={type}
          />
        </div>
      ),
      dragSourceOpts
    );
  }
}

const StyledAnswer = withStyles({
  answer: {
    boxSizing: 'border-box',
    height: 40,
    width: 280,
    overflow: 'hidden',
    margin: '10px 20px',
    padding: '0px',
    textAlign: 'center'
  }
})(Answer);

const answerTarget = {
  drop(props, monitor) {
    const draggedItem = monitor.getItem();

    if (draggedItem.instanceId === props.instanceId) {
      props.placeAnswer(draggedItem.id, props.index);
    }
  },
  canDrop(props, monitor) {
    const draggedItem = monitor.getItem();

    return draggedItem.instanceId === props.instanceId;
  }
};

const DropAnswer = DropTarget('Answer', answerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(StyledAnswer);

const answerSource = {
  canDrag(props) {
    return props.draggable && !props.disabled;
  },
  beginDrag(props) {
    return {
      id: props.id,
      type: props.type,
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

const DragAnswer = DragSource('Answer', answerSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(DropAnswer);

export default DragAnswer;
