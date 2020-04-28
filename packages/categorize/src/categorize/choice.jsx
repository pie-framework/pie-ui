import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import { uid } from '@pie-lib/drag';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import debug from 'debug';

const log = debug('@pie-ui:categorize:choice');

export const ChoiceType = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string
};

export class Layout extends React.Component {
  static propTypes = {
    ...ChoiceType,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    correct: PropTypes.bool
  };
  static defaultProps = {};
  render() {
    const {
      classes,
      className,
      content,
      isDragging,
      disabled,
      correct
    } = this.props;

    const rootNames = classNames(
      correct === true && 'correct',
      correct === false && 'incorrect',
      classes.choice,
      isDragging && classes.dragging,
      disabled && classes.disabled,
      className
    );
    const cardNames = classNames(classes.card);
    return (
      <div className={rootNames}>
        <Card className={cardNames}>
          <CardContent dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </div>
    );
  }
}

const styles = () => ({
  choice: {
    cursor: 'pointer',
    height: '100%',
    width: '100%',
    '&.correct': {
      border: `solid 1px ${green[500]}`
    },
    '&.incorrect': {
      border: `solid 1px ${orange[500]}`
    }
  },
  disabled: {
    cursor: 'inherit'
  },
  dragging: {
    cursor: 'move'
  },
  card: {
    width: '100%'
  }
});

const Styled = withStyles(styles)(Layout);

export class Choice extends React.Component {
  static propTypes = {
    ...ChoiceType,
    connectDragSource: PropTypes.func.isRequired
  };

  render() {
    const {
      connectDragSource,
      id,
      content,
      disabled,
      isDragging,
      correct
    } = this.props;
    return connectDragSource(
      <div style={{ width: '100%', height: '100%' }}>
        <Styled
          id={id}
          content={content}
          disabled={disabled}
          correct={correct}
          isDragging={isDragging}
        />
      </div>
    );
  }
}

export const spec = {
  canDrag: props => !props.disabled,
  beginDrag: props => {
    const out = {
      id: props.id,
      categoryId: props.categoryId,
      choiceIndex: props.choiceIndex
    };
    log('[beginDrag] out:', out);
    return out;
  },
  endDrag: (props, monitor) => {
    if (!monitor.didDrop()) {
      const item = monitor.getItem();
      if (item.categoryId) {
        log('wasnt droppped - what to do?');
        props.onRemoveChoice(item);
      }
    }
  }
};

const DraggableChoice = DragSource(
  ({ uid }) => uid,
  spec,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Choice);

export default uid.withUid(DraggableChoice);
