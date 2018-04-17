import React from 'react';
import debug from 'debug';
import classNames from 'classnames';
import range from 'lodash/range';
import MuiInput from 'material-ui/Input';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { indicators } from '@pie-lib/render-ui';
import PropTypes from 'prop-types';

const { Correct, Incorrect, PartiallyCorrect, NothingSubmitted } = indicators;

const tags = {
  correct: Correct,
  incorrect: Incorrect,
  'partially-correct': PartiallyCorrect,
  empty: NothingSubmitted
};

class RawInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dark: PropTypes.bool,
    alignment: PropTypes.string,
    correctness: PropTypes.oneOf([
      'correct',
      'incorrect',
      'partially-correct',
      'empty'
    ]),
    disabled: PropTypes.bool,
    error: PropTypes.string,
    inputComponent: PropTypes.func,
    inputProps: PropTypes.object,
    onChange: PropTypes.func,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.string.isRequired,
    feedback: PropTypes.string
  };

  render() {
    const {
      dark,
      alignment,
      classes,
      correctness,
      disabled,
      error,
      inputComponent,
      inputProps,
      onChange,
      size,
      value,
      feedback
    } = this.props;

    const formClasses = classNames(classes.formControl);
    const inputClass = classNames(
      classes.input,
      classes[alignment],
      classes[`size${size}`]
    );
    const CorrectnessTag = tags[correctness];
    const theme = createMuiTheme({
      palette: {
        type: dark ? 'dark' : 'light'
      }
    });

    return (
      <FormControl disabled={disabled} className={formClasses} error={!!error}>
        <div className={classes.inputAndIcon}>
          <MuiThemeProvider theme={theme}>
            <MuiInput
              classes={{
                root: classes.inputRoot,
                input: inputClass
              }}
              value={value}
              onChange={onChange}
              inputComponent={inputComponent}
              inputProps={inputProps}
            />
          </MuiThemeProvider>
          {CorrectnessTag && (
            <div className={classes.icon}>
              <CorrectnessTag feedback={feedback || 'feedback'} />
            </div>
          )}
        </div>
        <FormHelperText>{error ? error : ''}</FormHelperText>
      </FormControl>
    );
  }
}

const inputStyles = theme => {
  const base = {
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing.unit
    },
    inputRoot: {},
    inputAndIcon: {
      display: 'flex',
      alignItems: 'end'
    },
    icon: {
      padding: '3px',
      paddingLeft: `${theme.spacing.unit}px`
    },
    right: {
      textAlign: 'right'
    },
    center: {
      textAlign: 'center'
    }
  };

  const sizes = range(1, 20).reduce((acc, s) => {
    acc[`size${s}`] = {
      maxWidth: `${theme.spacing.unit * 1.4 * s}px`
    };
    return acc;
  }, {});

  return Object.assign(base, sizes);
};

const Input = withStyles(inputStyles)(RawInput);

export default Input;
