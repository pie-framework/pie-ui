import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import debug from 'debug';
import { uid } from '@pie-lib/drag';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const log = debug('@pie-ui:fill-in-the-blank:choice');

export class Choice extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    content: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    blankId: PropTypes.string,
    disabled: PropTypes.bool,
    correct: PropTypes.bool
  };
  static defaultProps = {};
  render() {
    const {
      classes,
      className,
      content,
      connectDragSource,
      disabled,
      correct
    } = this.props;

    return connectDragSource(
      <div
        className={classNames(
          classes.choice,
          disabled && classes.disabledChoice,
          className
        )}
      >
        <Card
          className={classNames(
            correct === false && classes.incorrect,
            correct === true && classes.correct,
            disabled && correct === undefined && classes.disabledCard
          )}
        >
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
const styles = theme => ({
  choice: {
    padding: 0,
    backgroundColor: 'white',
    cursor: 'move'
  },
  disabledChoice: {
    cursor: 'auto'
  },
  incorrect: {
    border: `solid 1px ${orange[500]}`,
    boxShadow: 'none',
    borderRadius: 0
  },
  correct: {
    border: `solid 1px ${green[500]}`,
    boxShadow: 'none',
    borderRadius: 0
  },
  disabledCard: {
    boxShadow: 'none',
    border: `solid 1px ${grey[400]}`
  }
});

const Styled = withStyles(styles)(Choice);

export const spec = {
  canDrag: props => !props.disabled,
  beginDrag: props => {
    const out = {
      id: props.id,
      blankId: props.blankId
    };
    log('[beginDrag] out:', out);
    return out;
  },
  endDrag: (props, monitor) => {
    if (!monitor.didDrop()) {
      log('did not drop?');
      const item = monitor.getItem();

      if (item.blankId) {
        log('wasnt droppped - what to do?');
        if (props.onRemoveFromBlank) {
          props.onRemoveFromBlank(item);
        }
      }
    }
  }
};

const Draggable = DragSource(
  ({ uid }) => {
    log('uid: ', uid);
    return uid;
  },
  spec,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Styled);

export default uid.withUid(Draggable);
