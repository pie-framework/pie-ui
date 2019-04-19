import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withDragContext, swap } from '@pie-lib/drag';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import { withStyles } from '@material-ui/core/styles';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
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

  componentDidMount() {
    this.updateSessionIfNeeded(this.props);
  }

  componentWillReceiveProps(nProps) {
    this.updateSessionIfNeeded(nProps);
  }

  updateSessionIfNeeded(props) {
    const { session, onSessionChange } = props;

    if (!session.value) {
      const { model } = props;
      const { config } = model;

      session.value = new Array(config.prompts.length).fill(undefined);

      onSessionChange(session);
    }
  }

  onRemoveAnswer(index) {
    const { session, onSessionChange } = this.props;

    session.value[index] = undefined;

    onSessionChange(session);
  }

  onPlaceAnswer(place, id) {
    const { model, session, onSessionChange } = this.props;
    const { config } = model;

    if (isEmpty(session.value)) {
      session.value = new Array(config.prompts.length);
    }

    const choiceIndex = session.value.indexOf(id);

    if (choiceIndex >= 0) {
      session.value = swap(session.value, choiceIndex, place);
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
                >
                  {pr.title}
                </div>
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
            onRemoveAnswer={index => this.onRemoveAnswer(index)}
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
    flex: 0,
    minWidth: 200
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
    textAlign: 'center',
    padding: 10,
    width: 280
  },
  arrowEntry: {
    height: 40,
    margin: '10px 20px'
  }
});

export const styledMain = withStyles(styles)(Main);

export default withDragContext(styledMain);