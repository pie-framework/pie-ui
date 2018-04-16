import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { indicators } from '@pie-lib/render-ui';
import Choices from './choices';

const { Correct, Incorrect, NothingSubmitted } = indicators;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class InlineChoice extends React.Component {
  static propTypes = {
    onChoiceChanged: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    disabled: PropTypes.bool,
    result: PropTypes.shape({
      correct: PropTypes.bool,
      nothingSubmitted: PropTypes.bool
    }),
    session: PropTypes.object
  };
  handleChange = event => {
    this.props.onChoiceChanged(event.target.value);
  };

  render() {
    let { choices, classes, disabled, result, session } = this.props;
    result = result || {};
    const { correct, nothingSubmitted } = result;

    const Feedback = (() => {
      if (correct === false && nothingSubmitted) {
        return NothingSubmitted;
      } else if (correct === false && !nothingSubmitted) {
        return Incorrect;
      } else if (correct === true) {
        return Correct;
      }
    })();

    return (
      <div className={classes.container}>
        {choices.length > 0 && (
          <FormControl className={classes.formControl} disabled={disabled}>
            <Choices
              items={choices}
              value={session.selectedChoice || ''}
              onChange={this.handleChange}
            />
          </FormControl>
        )}
        {Feedback && <Feedback feedback={result.feedback} />}
      </div>
    );
  }
}

export default withStyles(styles)(InlineChoice);
