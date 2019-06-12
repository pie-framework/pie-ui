import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const getCorrectnessClass = (isCorrect, filled) => {
  if (filled) {
    return isCorrect ? 'correctFilled' : 'incorrectFilled';
  }
  return isCorrect ? 'correctEmpty' : 'incorrectEmpty';
};

const EvaluationIcon = ({ classes, containerStyle, isCorrect, filled }) => {
  const Icon = isCorrect ? Check : Close;
  const showCorrectness = isCorrect !== undefined;
  const correctness = showCorrectness ? getCorrectnessClass(isCorrect, filled) : '';

  return showCorrectness
    ? (
      <Icon
        className={`${classes.icon} ${classes[correctness]}`}
        style={containerStyle}
      />
    ) : null
};

EvaluationIcon.propTypes = {
  classes: PropTypes.object,
  containerStyle: PropTypes.object,
  filled: PropTypes.bool,
  isCorrect: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ])
};

EvaluationIcon.defaultProps = {
  classes: {},
  containerStyle: {},
  filled: false,
  isCorrect: undefined
};

const styles = () => ({
  correctEmpty: {
    color: 'green'
  },
  correctFilled: {
    color: 'white',
    backgroundColor: 'green'
  },
  incorrectEmpty: {
    color: 'red'
  },
  incorrectFilled: {
    color: 'white',
    backgroundColor: 'red'
  }
});

export default withStyles(styles)(EvaluationIcon);
