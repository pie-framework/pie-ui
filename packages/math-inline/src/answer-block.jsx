import * as React from 'react';
import { mq } from '@pie-lib/math-input';
import { withStyles } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import cx from 'classnames';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit / 2,
    display: 'inline-flex',
  },
  static: {
    color: 'grey',
    background: 'lightgrey',
    fontSize: '1rem',
    padding: theme.spacing.unit / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid grey',
    '& > .mq-math-mode': {
      '& > .mq-hasCursor': {
        '& > .mq-cursor': {
          display: 'none'
        },
      }
    }
  },
  correct: {
    borderColor: 'green'
  },
  incorrect: {
    borderColor: 'red'
  },
  active: {
    cursor: 'pointer'
  },
  responseActive: {
    color: 'white',
    background: 'lightblue',
    borderRight: '2px solid blue'
  },
  math: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mathEditor: {
    padding: theme.spacing.unit / 4,
    minWidth: '50px'
  }
});

class AnswerBlock extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    latex: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    showCorrect: PropTypes.bool,
    correct: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    latex: '',
    active: false
  };

  onClick = () => {
    const { id, onClick, setInput, index } = this.props;

    setInput(this.input);
    onClick(id, index);
  }

  onEditorChange = latex => {
    const { index, onChange } = this.props;

    onChange(index, latex);
  };

  onFocus = () => {
    const { id, index, onFocus, setInput } = this.props;

    setInput(this.input);
    onFocus(id, index);
  };

  render() {
    const { classes, showCorrect, correct, latex, disabled } = this.props;

    return (
      <div className={cx(classes.math, classes.container, { [classes.active]: !disabled })}>
        {disabled ? (
            <div className={cx(classes.static, {
                [classes.correct]: showCorrect && correct,
                [classes.incorrect]: showCorrect && !correct
              })
            }>
              <mq.Static latex={latex}/>
            </div>
          ) :
          <mq.Input
            className={classes.mathEditor}
            onFocus={this.onFocus}
            innerRef={r => (this.input = r)}
            latex={latex}
            onChange={this.onEditorChange}
          />}
      </div>
    );
  }
}

export default withStyles(styles)(AnswerBlock);
