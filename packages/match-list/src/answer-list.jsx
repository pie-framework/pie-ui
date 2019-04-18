import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import DragAndDropAnswer from './answer';

export class AnswerList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    showCorrect: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSessionChange: PropTypes.func,
    onRemoveAnswer: PropTypes.func,
    placeAnswer: PropTypes.func.isRequired,
    instanceId: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    prompt: PropTypes.string
  };

  getAnswerFromSession(index) {
    const { model, session, showCorrect } = this.props;
    const { config } = model;

    const answerId = showCorrect ? config.prompts[index].relatedAnswer : (session.value && session.value[index]);
    const answer = config.answers.find(answer => answer.id === answerId);

    return answer || {};
  }

  getCorrectOrIncorrectArray() {
    const { model, session, showCorrect } = this.props;
    const { config } = model;
    const sessionValue = session.value || new Array(config.prompts.length).fill(undefined);

    if (model.mode !== 'evaluate') {
      return [];
    }

    if (showCorrect) {
      return new Array(config.prompts.length).fill(true);
    }

    const correctPromptMap = config.prompts.reduce((obj, prompt) => {
      if (prompt.relatedAnswer) {
        obj[prompt.id] = prompt.relatedAnswer;
      }

      return obj;
    }, {});

    return sessionValue.map((val, index) => {
      const currentPrompt = config.prompts[index];

      return correctPromptMap[currentPrompt.id] === val;
    });
  }

  render() {
    const {
      classes,
      disabled,
      placeAnswer,
      instanceId,
      onRemoveAnswer,
      model
    } = this.props;
    const { config } = model;
    const correctnesArray = this.getCorrectOrIncorrectArray();

    return (
      <div className={classes.itemList}>
        {
          config.prompts.map((answer, index) => {
            const sessionAnswer = this.getAnswerFromSession(index);

            return (
              <DragAndDropAnswer
                key={index}
                index={index}
                correct={correctnesArray[index]}
                draggable={!isEmpty(sessionAnswer)}
                disabled={disabled}
                instanceId={instanceId}
                id={sessionAnswer.id}
                placeAnswer={(id, index) => placeAnswer(id, index)}
                title={sessionAnswer.title}
                type={'target'}
                onRemoveChoice={() => onRemoveAnswer(index)}
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

export default withStyles(styles)(AnswerList);