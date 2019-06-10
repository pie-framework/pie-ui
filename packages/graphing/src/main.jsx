import React from 'react';
import PropTypes from 'prop-types';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { withStyles } from '@material-ui/core/styles';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.shape({}),
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      session: props.session,
      selection: [],
      showCorrect: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const session = nextProps.session;

    this.setState({ session });
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

  render() {
    const { model, classes } = this.props;
    const { showCorrect } = this.state;

    return (
      <div className={classes.mainContainer}>
        <div className={classes.main}>
          {model.correctness && <div>Score: {model.correctness.score}</div>}
          <CorrectAnswerToggle
            className={classes.toggle}
            show={
              !model.exhibitOnly &&
              model.correctness &&
              model.correctness.correctness !== 'correct'
            }
            toggled={showCorrect}
            onToggle={this.toggleShowCorrect}
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({});

export default withStyles(styles)(Main);