import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withDragContext, swap } from '@pie-lib/drag';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import { withStyles } from '@material-ui/core/styles';
import uniqueId from 'lodash/uniqueId';
import isUndefined from 'lodash/isUndefined';
import findKey from 'lodash/findKey';
import Arrow from './arrow';
import AnswerList from './answer-list';
import ChoicesList from './choices-list';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired,
    prompt: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.instanceId = uniqueId();
    this.state = {
      showCorrectAnswer: false
    };
  }

  onRemoveAnswer(id) {
    const { session, onSessionChange } = this.props;

    session.value[id] = undefined;

    onSessionChange(session);
  }

  onPlaceAnswer(place, id) {
    const { session, onSessionChange, model } = this.props;
    const { config: { duplicates } } = model;

    if (isUndefined(session.value)) {
      session.value = {};
    }

    const choiceKey = findKey(session.value, val => val === id);

    if (choiceKey && !duplicates) {
      session.value = swap(session.value, choiceKey, place);
    } else {
      session.value[place] = id;
    }

    onSessionChange(session);
  }

  toggleShowCorrect = () => {
    this.setState({ showCorrectAnswer: !this.state.showCorrectAnswer });
  };

  render() {
    const { showCorrectAnswer } = this.state;
    const { classes, model, session } = this.props;
    const { config, mode } = model;
    const { prompt } = config;

    return (
      <div className={classes.mainContainer}>
        <CorrectAnswerToggle
          show={mode === 'evaluate'}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: prompt }}
        />
        <div className={classes.listContainer}>
          <div className={classnames(classes.itemList, classes.promptList)}>
            {
              config.prompts.map((pr) => (
                <div
                  key={pr.id}
                  className={classes.promptEntry}
                  dangerouslySetInnerHTML={{ __html: pr.title }}
                />
              ))
            }
          </div>
          <div className={classnames(classes.itemList, classes.arrowList)}>
            {
              config.prompts.map((pr) => (
                <div
                  key={pr.id}
                  className={classes.arrowEntry}
                >
                  <Arrow direction="left" />
                  <Arrow />
                </div>
              ))
            }
          </div>
          <AnswerList
            instanceId={this.instanceId}
            model={model}
            session={session}
            onPlaceAnswer={(place, id) => this.onPlaceAnswer(place, id)}
            onRemoveAnswer={id => this.onRemoveAnswer(id)}
            disabled={mode !== 'gather'}
            showCorrect={showCorrectAnswer}
          />
        </div>
        <ChoicesList
          instanceId={this.instanceId}
          model={model}
          session={session}
          disabled={mode !== 'gather'}
        />
        {
          model.correctness &&
          model.feedback &&
          !showCorrectAnswer &&(
            <Feedback
              correctness={model.correctness.correctness}
              feedback={model.feedback}
            />
          )
        }
      </div>
    );
  }
}

const styles = theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  listContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  itemList: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  arrowList: {
    flex: 1,
    width: '100%'
  },
  promptList: {
    alignItems: 'flex-start'
  },
  main: {
    width: '100%'
  },
  toggle: {
    paddingBottom: theme.spacing.unit * 3
  },
  prompt: {
    verticalAlign: 'middle'
  },
  promptEntry: {
    border: '1px solid #c2c2c2',
    boxSizing: 'border-box',
    height: 40,
    overflow: 'hidden',
    margin: '10px 0',
    width: '100%',
    textAlign: 'center',
    padding: 10
  },
  arrowEntry: {
    alignItems: 'normal',
    display: 'flex',
    height: 40,
    margin: '10px 20px',
    width: '100%'
  }
});

export const styledMain = withStyles(styles)(Main);

export default withDragContext(styledMain);