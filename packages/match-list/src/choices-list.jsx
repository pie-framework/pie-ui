import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import { DragAnswer } from './answer';

export class ChoicesList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    instanceId: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  render() {
    const {
      model,
      classes,
      disabled,
      session,
      instanceId
    } = this.props;
    const { config } = model;

    return (
      <div className={classes.answersContainer}>
        {
          config.answers
            .filter(answer => (isEmpty(session) || session.value.indexOf(answer.id) === -1))
            .map((answer) => (
              <DragAnswer
                key={answer.id}
                instanceId={instanceId}
                draggable={true}
                disabled={disabled}
                session={session}
                type={'choice'}
                {...answer}
              />
            ))
        }
      </div>
    );
  }
}

const styles = () => ({
  answersContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50
  }
});

export default withStyles(styles)(ChoicesList);