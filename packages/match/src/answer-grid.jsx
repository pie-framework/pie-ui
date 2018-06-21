import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

export class AnswerGrid extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    responseType: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    answers: PropTypes.object.isRequired
  };

  onRowValueChange = (rowId, answerIndex) => event => {
    const { onAnswerChange, responseType, answers } = this.props;
    const newAnswers = { ...answers };

    if (responseType === 'radio') {
      for (let i = 0; i < newAnswers[rowId].length; i++) {
        newAnswers[rowId][i] = false;
      }
    }

    newAnswers[rowId][answerIndex] = event.target.checked;

    onAnswerChange(newAnswers);
  };

  render() {
    const { classes, headers, rows, responseType, answers, disabled } = this.props;

    return (
      <div className={classes.controlsContainer}>
        {rows.length === 0 && (
          <Typography component="div" className={classes.empty}>
            There are currently no questions to show.
          </Typography>
        )}
        <div className={classes.rowContainer}>
          {rows.length > 0 && headers.map((header, idx) => (
            <div key={idx} className={cx(classes.rowItem, { [classes.questionText]: idx === 0 })}>
              {header}
            </div>
          ))}
        </div>
        {rows.length > 0 && <hr className={classes.separator} />}
        {rows.map((row, idx) => (
          <div key={idx}>
            <div className={classes.rowContainer}>
              <div className={cx(classes.rowItem, classes.questionText)}>
                {row.title}
              </div>
              {answers[row.id].map((rowValue, answerIndex) => (
                <div key={answerIndex} className={classes.rowItem}>
                  {responseType === 'radio' ? (
                    <Radio
                      disabled={disabled}
                      onChange={this.onRowValueChange(row.id, answerIndex)}
                      checked={rowValue === true}
                    />
                  ) : (
                    <Checkbox
                      disabled={disabled}
                      onChange={this.onRowValueChange(row.id, answerIndex)}
                      checked={rowValue === true}
                    />
                  )}
                </div>
              ))}
            </div>
            <hr className={classes.separator} />
          </div>
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  empty: {
    margin: theme.spacing.unit * 2
  },
  controlsContainer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  separator: {
    border: 0,
    borderTop: '2px solid lightgray',
    width: '100%'
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  rowItem: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  questionText: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-start'
  }
});

export default withStyles(styles)(AnswerGrid);
