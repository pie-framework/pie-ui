import React from 'react';
import PropTypes from 'prop-types';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback } from '@pie-lib/render-ui';
import AnswerGrid from './answer-grid';
import { withStyles } from '@material-ui/core/styles';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      session: { ...props.session, answers: this.generateAnswers(props.model) },
      // initially it'll be the same as the actual rows
      shuffledRows: props.model.config.rows,
      showCorrect: false
    };

    this.callOnSessionChange();
  }

  generateAnswers = model => {
    const { config } = model;
    const answers = {};

    config.rows.forEach(row => {
      answers[row.id] = new Array(config.layout - 1).fill(false);
    });

    return answers;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      session: {
        ...nextProps.session,
        answers: this.generateAnswers(nextProps.model)
      },
      shuffledRows: nextProps.model.config.rows // TODO shuffle if needed
    });
  }

  callOnSessionChange = () => {
    const { onSessionChange } = this.props;

    if (onSessionChange) {
      onSessionChange(this.state.session);
    }
  };

  toggleShowCorrect = show => {
    this.setState({ showCorrect: show });
  };

  onAnswerChange = newAnswers => {
    this.setState(
      state => ({
        session: {
          ...state.session,
          answers: newAnswers
        }
      }),
      this.callOnSessionChange
    );
  };

  render() {
    const { model, classes } = this.props;
    const { showCorrect, shuffledRows, session } = this.state;

    return (
      <div className={classes.mainContainer}>
        <div className={classes.main}>
          {model.correctness && <div>Score: {model.correctness.score}</div>}
          <CorrectAnswerToggle
            className={classes.toggle}
            show={
              model.correctness && model.correctness.correctness !== 'correct'
            }
            toggled={showCorrect}
            onToggle={this.toggleShowCorrect}
          />
          <AnswerGrid
            onAnswerChange={this.onAnswerChange}
            responseType={model.config.responseType}
            answers={session.answers}
            headers={model.config.headers}
            rows={shuffledRows}
          />
        </div>
        {model.feedback && (
          <Feedback
            correctness={model.correctness.correctness}
            feedback={model.feedback}
          />
        )}
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
  main: {
    width: '100%'
  },
  toggle: {
    paddingBottom: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Main);
