import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from './input';
import { getFormatTag } from './formatting-component';

const log = debug('pie-elements:text-entry');

export class TextEntry extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    onValueChanged: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: (props.session && props.session.value) || ''
    };
  }

  onChange = event => {
    clearTimeout(this.state.timeoutId);
    this.setState({ warning: null, timeoutId: null });
    log('[onChange] value: ', event.target.value);
    if (this.state.value !== event.target.value) {
      let sliceInput =
        this.props.model.answerBlankSize && this.props.model.answerBlankSize > 0
          ? event.target.value.slice(0, this.props.model.answerBlankSize)
          : event.target.value;

      this.setState({ value: sliceInput }, () => {
        this.props.onValueChanged(this.state.value);
      });
    }
  };

  onBadInput = () => {
    const { model } = this.props;
    const warning = model.numbersOnlyWarning || 'Please enter numbers only';
    log('[onBadInput] warning: ', warning);
    const timeoutId = setTimeout(() => {
      this.setState({ warning: null });
    }, 1000);
    this.setState({ warning, timeoutId });
  };

  render() {
    const { model, classes } = this.props;
    log('[render] model: ', model);
    const { value } = this.state;
    const FormatTag = getFormatTag(model);

    const inputProps = model.allowIntegersOnly
      ? { onBadInput: this.onBadInput }
      : {};

    const names = classNames(classes.textEntry, classes[model.colorContrast]);

    return (
      <div className={names}>
        <Input
          feedback={model.feedback}
          value={value}
          correctness={model.correctness}
          alignment={model.answerAlignment}
          size={model.answerBlankSize}
          onChange={this.onChange}
          inputComponent={FormatTag}
          error={this.state.warning}
          inputProps={inputProps}
          disabled={model.disabled}
        />
      </div>
    );
  }
}

export default withStyles({})(TextEntry);
