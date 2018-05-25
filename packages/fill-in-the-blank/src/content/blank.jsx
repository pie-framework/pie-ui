import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { uid } from '@pie-lib/drag';
import debug from 'debug';
import Choice from '../choices/choice';
import orange from '@material-ui/core/colors/orange';

const log = debug('@pie-ui:fill-in-the-blank:blank');

export class Blank extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    isOver: PropTypes.bool,
    connectDropTarget: PropTypes.func.isRequired,
    choice: PropTypes.object,
    id: PropTypes.string.isRequired,
    onRemoveChoice: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    correct: PropTypes.bool
  };
  static defaultProps = {};
  render() {
    const {
      classes,
      className,
      isOver,
      connectDropTarget,
      choice,
      id,
      onRemoveChoice,
      disabled,
      correct
    } = this.props;
    log(
      '[render] blankId: ',
      id,
      ' isOver:',
      isOver,
      'choice: ',
      choice,
      'correct: ',
      correct
    );
    return connectDropTarget(
      <div
        className={classNames(
          classes.blank,
          correct === false && classes.incorrect,
          !choice && classes.empty,
          isOver && !choice && classes.isOver,
          className
        )}
      >
        {choice ? (
          <Choice
            {...choice}
            blankId={id}
            disabled={disabled}
            correct={correct}
            onRemoveFromBlank={choice => onRemoveChoice(choice)}
          />
        ) : (
          ' '
        )}
      </div>
    );
  }
}

const styles = theme => ({
  blank: {
    display: 'inline-block',
    minWidth: '70px',
    minHeight: '30px',
    marginLeft: theme.spacing.unit * 0.5,
    marginRight: theme.spacing.unit * 0.5,
    transition: 'background-color 200ms ease-in'
  },
  empty: {
    borderBottom: 'solid 1px black'
  },
  incorrect: {
    borderBottom: `solid 1px ${orange[500]}`
  },
  isOver: {
    backgroundColor: theme.palette.primary.light
  }
});

const Styled = withStyles(styles)(Blank);

export const spec = {
  drop: (props, monitor) => {
    const item = monitor.getItem();
    props.onDropChoice(item);
  },
  canDrop: (props /*, monitor*/) => {
    return !props.disabled && !props.choice;
  }
};

const WithTarget = DropTarget(({ uid }) => uid, spec, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(Styled);

export default uid.withUid(WithTarget);
