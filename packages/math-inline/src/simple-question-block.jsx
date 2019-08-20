import React from 'react';
import { MathToolbar } from '@pie-lib/math-toolbar';
import { mq } from '@pie-lib/math-input';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

export class SimpleQuestionBlockRaw extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    onSimpleResponseChange: PropTypes.func,
    model: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    showCorrect: PropTypes.bool
  };
  render() {
    const {
      classes,
      model,
      showCorrect,
      session,
      onSimpleResponseChange
    } = this.props;
    const correct =
      model.correctness &&
      model.correctness.info &&
      model.correctness.info.defaultResponse;
    const showAsCorrect = showCorrect || correct;
    const showAsIncorrect = showCorrect && !correct;
    const { config } = model || {};

    if (!config) {
      return;
    }

    const { responses, equationEditor } = config;

    return (
      <div className={classes.expression}>
        {showCorrect || model.disabled ? (
          <div
            className={cx(classes.static, {
              [classes.correct]: showAsCorrect,
              [classes.incorrect]: showAsIncorrect
            })}
          >
            <mq.Static
              latex={
                showCorrect ? (responses && responses.length && responses[0].answer) : (session.response || '')
              }
            />
          </div>
        ) : (
          <MathToolbar
            classNames={{ editor: classes.responseEditor }}
            latex={session.response || ''}
            keypadMode={equationEditor}
            onChange={onSimpleResponseChange}
            onDone={() => {}}
          />
        )}
      </div>
    );
  }
}
const SimpleQuestionBlock = withStyles(theme => ({
  responseEditor: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    minWidth: '500px',
    maxWidth: '900px',
    height: 'auto',
    minHeight: '130px',
    textAlign: 'left',
    padding: theme.spacing.unit,
    '&.mq-math-mode': {
      border: '1px solid lightgrey'
    }
  },
  expression: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    minHeight: '150px'
  },
  static: {
    color: 'grey',
    fontSize: '1rem',
    padding: theme.spacing.unit / 2,
    '& > .mq-math-mode': {
      '& > .mq-hasCursor': {
        '& > .mq-cursor': {
          display: 'none'
        }
      }
    }
  },
  correct: {
    color: 'green'
  },
  incorrect: {
    color: 'red'
  }
}))(SimpleQuestionBlockRaw);

export default SimpleQuestionBlock;
