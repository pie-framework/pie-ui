import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import Answer from './answer';

export class AnswerGrid extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    onSessionChange: PropTypes.func,
    onRemoveAnswer: PropTypes.func,
    placeAnswer: PropTypes.func.isRequired,
    instanceId: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    prompt: PropTypes.string
  };

  getAnswerFromSession(index) {
    const { model, session } = this.props;
    const { config } = model;
    const sessionVal = session.value && session.value[index];
    const answer = config.answers.find(answer => answer.id === sessionVal);

    return answer || [];
  }

  getAnswerPlaces() {
    const { model } = this.props;
    const { config } = model;

    return config.answers.filter(pr => pr.relatedPrompt);
  }

  render() {
    const {
      classes,
      placeAnswer,
      instanceId,
      session,
      onRemoveAnswer
    } = this.props;
    const answers = this.getAnswerPlaces();

    return (
      <div className={classes.itemList}>
        {
          answers.map((answer, index) => {
            const sessionAnswer = this.getAnswerFromSession(index);

            return (
              <Answer
                key={index}
                index={index}
                draggable={!isEmpty(sessionAnswer)}
                instanceId={instanceId}
                id={sessionAnswer.id}
                placeAnswer={(id, index) => placeAnswer(id, index)}
                title={sessionAnswer.title}
                type={!session.value || findIndex(session.value, val => val === sessionAnswer.id) < 0 ? 'choice' : 'target'}
                onRemoveChoice={answer => onRemoveAnswer(answer)}
              />
            );
          })
        }
      </div>
    );
  }
}

const styles = () => ({
  itemList: {
    alignItems: 'flex-end',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

export default withStyles(styles)(AnswerGrid);