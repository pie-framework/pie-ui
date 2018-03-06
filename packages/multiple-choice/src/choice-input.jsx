import { FormControlLabel, FormGroup } from 'material-ui/Form';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from 'material-ui/styles';

import Checkbox from 'material-ui/Checkbox';
import { Feedback } from '@pie-lib/render-ui';
import FeedbackTick from './feedback-tick.jsx';
import Radio from 'material-ui/Radio';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';

const tagStyle = {
  display: 'inline-block',
  width: 'auto',
  verticalAlign: 'middle',
  marginRight: '5px'
}

const styleSheet = {
  label: {
    color: 'var(--choice-input-color, black)',
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxHolder: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    '& label': {
      width: 'auto !important'
    }
  }
};

const formStyleSheet = {
  label: {
    color: 'var(--choice-input-color, black)'
  }
};

export const StyledFormControlLabel = withStyles(formStyleSheet, { name: 'FormControlLabel' })((props) => <FormControlLabel {...props} classes={{ label: props.classes.label }} />);

const inputStyles = {
  'correct-root': {
    color: 'var(--choice-input-correct-color, black)',
  },
  'correct-checked': {
    color: 'var(--choice-input-correct-selected-color, black)',
  },
  'correct-disabled': {
    color: 'var(--choice-input-correct-disabled-color, black)',
  },
  'incorrect-root': {
    color: 'var(--choice-input-incorrect-color, black)',
  },
  'incorrect-checked': {
    color: 'var(--choice-input-incorrect-selected-color, black)',
  },
  'incorrect-disabled': {
    color: 'var(--choice-input-incorrect-disabled-color, black)',
  },
  root: {
    color: 'var(--choice-input-color, black)'
  },
  checked: {
    color: 'var(--choice-input-selected-color, black)'
  },
  disabled: {
    color: 'var(--choice-input-disabled-color, black)'
  }
};

export const StyledCheckbox = withStyles(inputStyles, { name: 'Checkbox' })((props) => {

  const { correctness, classes, checked, onChange, disabled } = props;
  const key = (k) => correctness ? `${correctness}-${k}` : k;

  const resolved = {
    root: classes[key('root')],
    checked: classes[key('checked')],
    disabled: classes[key('disabled')]
  };

  const miniProps = { checked, onChange, disabled };
  return <Checkbox {...miniProps}
    className={resolved.root}
    classes={{
      default: resolved.root,
      checked: resolved.checked,
      disabled: resolved.disabled
    }}
  />;
});

export const StyledRadio = withStyles(inputStyles)((props) => {
  const { correctness, classes, checked, onChange, disabled } = props;
  const key = (k) => correctness ? `${correctness}-${k}` : k;

  const resolved = {
    root: classes[key('root')],
    checked: classes[key('checked')],
    disabled: classes[key('disabled')]
  };

  const miniProps = { checked, onChange, disabled };

  return (
    <Radio {...miniProps}
      className={resolved.root}
      classes={{
        checked: resolved.checked,
        disabled: resolved.disabled
      }} />
  );
});

export class ChoiceInput extends React.Component {

  constructor(props) {
    super(props);
    this.onToggleChoice = this.onToggleChoice.bind(this);
  }

  onToggleChoice() {
    this.props.onChange({
      value: this.props.value,
      selected: !this.props.checked
    })
  }

  render() {

    const {
      choiceMode,
      disabled,
      displayKey,
      feedback,
      label,
      checked,
      correctness,
      classes,
      className
    } = this.props;

    const Tag = choiceMode === 'checkbox' ? StyledCheckbox : StyledRadio;
    const classSuffix = choiceMode === 'checkbox' ? 'checkbox' : 'radio-button';

    return <div className={classNames(className, "corespring-" + classSuffix)}>

      <div className={classes.row}>
        <FeedbackTick correctness={correctness} />
        <div className={classes.checkboxHolder}>
          <StyledFormControlLabel
            disabled={disabled}
            label={displayKey + '. '}
            control={
              <Tag
                checked={checked}
                correctness={correctness}
                onChange={this.onToggleChoice}
              />}
            label={displayKey + '. '} />
          <span
            className={classes.label}
            onClick={this.onToggleChoice}
            dangerouslySetInnerHTML={{ __html: label }} />
        </div>
      </div>
      <Feedback feedback={feedback} correctness={correctness} />
    </div>
  }
};

ChoiceInput.propTypes = {
  choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']),
  displayKey: React.PropTypes.string.isRequired,
  choiceMode: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  correctness: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  feedback: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};


ChoiceInput.defaultProps = {
};

export default withStyles(styleSheet, { name: 'ChoiceInput' })(ChoiceInput);
