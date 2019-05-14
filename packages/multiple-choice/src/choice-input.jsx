import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import { Feedback } from '@pie-lib/render-ui';
import FeedbackTick from './feedback-tick';
import Radio from '@material-ui/core/Radio';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import classNames from 'classnames';

const styleSheet = theme => ({
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
  },
  rationale: {
    paddingLeft: theme.spacing.unit * 16
  }
});

const formStyleSheet = {
  label: {
    color: 'var(--choice-input-color, black)'
  }
};

export const StyledFormControlLabel = withStyles(formStyleSheet, {
  name: 'FormControlLabel'
})(props => (
  <FormControlLabel {...props} classes={{ label: props.classes.label }} />
));

const CLASS_NAME = 'multiple-choice-component';

const colorStyle = (varName, fallback) => ({
  [`&.${CLASS_NAME}`]: {
    color: `var(--choice-input-${varName}, ${fallback})`
  }
});

const inputStyles = {
  'correct-root': colorStyle('correct-color', 'black'),
  'correct-checked': colorStyle('correct-selected-color', green[500]),
  'correct-disabled': colorStyle('correct-disabled-color', 'grey'),
  'incorrect-root': colorStyle('incorrect-color', 'black'),
  'incorrect-checked': colorStyle('incorrect-checked', orange[500]),
  'incorrect-disabled': colorStyle('incorrect-disabled-color', 'grey'),
  root: colorStyle('color', 'black'),
  checked: colorStyle('selected-color', 'black'),
  disabled: colorStyle('disabled-color', 'black')
};

export const StyledCheckbox = withStyles(inputStyles)(props => {
  const { correctness, classes, checked, onChange, disabled } = props;
  const key = k => (correctness ? `${correctness}-${k}` : k);

  const resolved = {
    root: classes[key('root')],
    checked: classes[key('checked')],
    disabled: classes[key('disabled')]
  };

  const miniProps = { checked, onChange, disabled };
  return (
    <Checkbox
      {...miniProps}
      className={CLASS_NAME}
      classes={{
        root: resolved.root,
        checked: resolved.checked,
        disabled: resolved.disabled
      }}
    />
  );
});

export const StyledRadio = withStyles(inputStyles)(props => {
  const { correctness, classes, checked, onChange, disabled } = props;
  const key = k => (correctness ? `${correctness}-${k}` : k);

  const resolved = {
    root: classes[key('root')],
    checked: classes[key('checked')],
    disabled: classes[key('disabled')]
  };

  const miniProps = { checked, onChange, disabled };

  return (
    <Radio
      {...miniProps}
      className={CLASS_NAME}
      classes={{
        root: resolved.root,
        checked: resolved.checked
      }}
    />
  );
});

export class ChoiceInput extends React.Component {
  static propTypes = {
    choiceMode: PropTypes.oneOf(['radio', 'checkbox']),
    displayKey: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    correctness: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    feedback: PropTypes.string,
    label: PropTypes.string.isRequired,
    rationale: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    rationale: null
  };

  constructor(props) {
    super(props);
    this.onToggleChoice = this.onToggleChoice.bind(this);
  }

  onToggleChoice() {
    this.props.onChange({
      value: this.props.value,
      selected: !this.props.checked
    });
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
      className,
      rationale
    } = this.props;

    const Tag = choiceMode === 'checkbox' ? StyledCheckbox : StyledRadio;
    const classSuffix = choiceMode === 'checkbox' ? 'checkbox' : 'radio-button';

    return (
      <div className={classNames(className, 'corespring-' + classSuffix)}>
        <div className={classes.row}>
          <FeedbackTick correctness={correctness} />
          <div className={classes.checkboxHolder}>
            <StyledFormControlLabel
              disabled={disabled}
              label={displayKey ? displayKey + '. ' : ''}
              control={
                <Tag
                  checked={checked}
                  correctness={correctness}
                  onChange={this.onToggleChoice}
                />
              }
            />
            <span
              className={classes.label}
              onClick={this.onToggleChoice}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          </div>
        </div>
        {rationale && (
          <div
            className={classes.rationale}
            dangerouslySetInnerHTML={{ __html: rationale }}
          />
        )}
        <Feedback feedback={feedback} correctness={correctness} />
      </div>
    );
  }
}

export default withStyles(styleSheet)(ChoiceInput);
