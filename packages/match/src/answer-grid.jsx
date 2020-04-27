import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

export class AnswerGrid extends React.Component {
  static propTypes = {
    allowFeedback: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    correctAnswers: PropTypes.object,
    view: PropTypes.bool.isRequired,
    showCorrect: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    choiceMode: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    answers: PropTypes.object.isRequired
  };

  onRowValueChange = (rowId, answerIndex) => event => {
    const { onAnswerChange, choiceMode, answers } = this.props;
    const newAnswers = { ...answers };

    if (choiceMode === 'radio') {
      for (let i = 0; i < newAnswers[rowId].length; i++) {
        newAnswers[rowId][i] = false;
      }
    }

    newAnswers[rowId][answerIndex] = event.target.checked;

    onAnswerChange(newAnswers);
  };

  answerIsCorrect = (rowId, rowValue, rowValueIndex) => {
    const { correctAnswers } = this.props;

    return correctAnswers[rowId][rowValueIndex] === rowValue && rowValue === true;
  };

  // needs a separate method because what isn't correct isn't necessarily incorrect
  answerIsIncorrect = (rowId, rowValue, rowValueIndex) => {
    const { correctAnswers } = this.props;

    return correctAnswers[rowId][rowValueIndex] === true && rowValue === false
      || correctAnswers[rowId][rowValueIndex] === false && rowValue === true;
  };

  render() {
    const { allowFeedback, classes, showCorrect, headers, rows, choiceMode, answers, disabled, view } = this.props;
    const Tag = choiceMode === 'radio' ? Radio : Checkbox;

    if (!rows || rows.length === 0) {
      return (
        <div className={classes.controlsContainer}>
          <Typography className={classes.empty} component="div">
            There are currently no questions to show.
          </Typography>
        </div>);
    }

    return (
      <div className={classes.controlsContainer}>
        <table className={classes.table}>
          <colgroup>
            {headers.map((header, idx) => (<col key={`col-${idx}`}/>))}
          </colgroup>

          <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={`th-${idx}`} data-colno={`${idx}`} scope="row">
                <div
                  className={cx(classes.rowItem, classes.rowHeader, { [classes.questionText]: idx === 0 })}
                  dangerouslySetInnerHTML={{ __html: header }}
                />
              </th>
            ))}
          </tr>
          </thead>

          {rows.map((row, idx) => (
            <tbody key={`row-${idx}`} role="group">
            <tr className={classes.separator}>
              <td
                key={`td-title-${idx}`}
                data-colno={'0'}
              >
                <div
                  className={cx(classes.rowItem, classes.questionText, classes.rowText)}
                  dangerouslySetInnerHTML={{ __html: row.title }}
                />
              </td>

              {answers[row.id].map((rowItem, answerIndex) => (
                <td
                  key={`td-${idx}-${answerIndex}`}
                  className={classes.column}
                  data-colno={`${answerIndex + 1}`}
                >
                  <div className={classes.rowItem}>
                    <Tag
                      className={cx({
                        [classes.correct]: allowFeedback && (
                          (showCorrect && rowItem === true) ||
                          (disabled && !view && this.answerIsCorrect(row.id, rowItem, answerIndex))
                        ),
                        [classes.incorrect]: allowFeedback && disabled && !view && this.answerIsIncorrect(row.id, rowItem, answerIndex)
                      })}
                      disabled={disabled}
                      onChange={this.onRowValueChange(row.id, answerIndex)}
                      checked={rowItem === true}
                    />
                  </div>
                </td>
              ))}
            </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

const styles = theme => ({
  controlsContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  column: {
    padding: '16px',
  },
  correct: {
    color: 'green !important'
  },
  incorrect: {
    color: 'red !important'
  },
  empty: {
    margin: theme.spacing.unit * 2
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  rowHeader: {
    padding: '20px 8px'
  },
  rowItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
  },
  rowText: {
    display: 'inline'
  },
  separator: {
    border: 0,
    borderTop: '2.5px solid lightgray',
    width: '100%'
  },
  table: {
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    marginBottom: 0
  },
  questionText: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
});

export default withStyles(styles)(AnswerGrid);
