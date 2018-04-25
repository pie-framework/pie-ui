import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { indicators } from '@pie-lib/render-ui';

import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const { Correct, Incorrect, NothingSubmitted } = indicators;

const FeedbackFromResult = withStyles({
  fb: {
    display: 'inline'
  }
})(({ correct, nothingSubmitted, feedback, classes }) => {
  const Tag = (() => {
    if (correct === false && nothingSubmitted) {
      return NothingSubmitted;
    } else if (correct === false && !nothingSubmitted) {
      return Incorrect;
    } else if (correct === true) {
      return Correct;
    }
  })();
  return Tag ? <Tag className={classes.feedback} feedback={feedback} /> : null;
});

FeedbackFromResult.propTypes = {
  correct: PropTypes.bool,
  nothingSubmitted: PropTypes.bool,
  feedback: PropTypes.string
};

const styles = theme => ({
  container: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  flex: {
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

export class InlineChoice extends React.Component {
  static propTypes = {
    onChoiceChanged: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    model: PropTypes.shape({
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        })
      ),
      disabled: PropTypes.bool,
      result: PropTypes.shape({
        correct: PropTypes.bool,
        nothingSubmitted: PropTypes.bool,
        feedback: PropTypes.string
      })
    }),
    session: PropTypes.object
  };

  handleChange = event => {
    this.props.onChoiceChanged(event.target.value);
  };

  render() {
    const { model, classes, session } = this.props;
    const result = (model && model.result) || {};

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl} disabled={model.disabled}>
          <Select value={session.value || ''} onChange={this.handleChange}>
            {model.choices.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FeedbackFromResult {...result} />
      </div>
    );
  }
}

export default withStyles(styles)(InlineChoice);
