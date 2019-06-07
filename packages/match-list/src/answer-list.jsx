import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import DragAndDropAnswer from './answer';

export class AnswerList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    showCorrect: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSessionChange: PropTypes.func,
    onRemoveAnswer: PropTypes.func,
    onPlaceAnswer: PropTypes.func.isRequired,
    instanceId: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    prompt: PropTypes.string
  };

  getAnswerFromSession = promptId => {
    const { model, session, showCorrect } = this.props;
    const { config } = model;
    const answerId = showCorrect
      ? config.prompts.find(p => p.id === promptId).relatedAnswer
      : session.value && session.value[promptId];
    const answer = config.answers.find(answer => answer.id === answerId);

    return answer || {};
  };

  getCorrectOrIncorrectMap = () => {
    const { model, session, showCorrect } = this.props;
    const { config } = model;
    const sessionValue =
      session.value || new Array(config.prompts.length).fill(undefined);

    if (model.mode !== 'evaluate') {
      return [];
    }

    if (showCorrect) {
      return config.prompts.reduce((obj, prompt) => {
        obj[prompt.id] = true;

        return obj;
      }, {});
    }

    const correctPromptMap = config.prompts.reduce((obj, prompt) => {
      if (prompt.relatedAnswer) {
        obj[prompt.id] = prompt.relatedAnswer;
      }

      return obj;
    }, {});

    return reduce(sessionValue, (obj, val, key) => {
      obj[key] = correctPromptMap[key] === sessionValue[key];

      return obj;
    }, {});
  };

  render() {
    const {
      classes,
      disabled,
      onPlaceAnswer,
      instanceId,
      onRemoveAnswer,
      model
    } = this.props;
    const { config } = model;
    const correctnessMap = this.getCorrectOrIncorrectMap();

    return (
      <div className={classes.itemList}>
        {config.prompts.map((prompt, index) => {
          const sessionAnswer = this.getAnswerFromSession(prompt.id);

          return (
            <DragAndDropAnswer
              key={index}
              index={index}
              promptId={prompt.id}
              correct={correctnessMap[prompt.id]}
              draggable={!isEmpty(sessionAnswer)}
              disabled={disabled}
              instanceId={instanceId}
              id={sessionAnswer.id}
              onPlaceAnswer={(place, id) => onPlaceAnswer(place, id)}
              title={sessionAnswer.title}
              type={'target'}
              onRemoveChoice={() => onRemoveAnswer(prompt.id)}
            />
          );
        })}
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
