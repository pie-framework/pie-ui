import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Input from './input';
import { getFormatTag } from './formatting-component';

const log = debug('pie-elements:text-entry');

const TextEntryStyles = {

  'white_on_black': {
    backgroundColor: 'black'
  },
  'black_on_rose': {
    backgroundColor: 'mistyrose'
  }
}

export class TextEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.session && props.session.value || ''
    }

  }


  onChange = (event) => {

    clearTimeout(this.state.timeoutId);
    this.setState({ warning: null, timeoutId: null });
    log('[onChange] value: ', event.target.value);
    if (this.state.value !== event.target.value) {
      let sliceInput = (this.props.model.answerBlankSize && this.props.model.answerBlankSize > 0) ? event.target.value.slice(0, this.props.model.answerBlankSize) : event.target.value;

      this.setState({ value: sliceInput }, () => {
        this.props.onValueChanged(this.state.value);
      });
    }
  }


  onBadInput = (data) => {
    const { model } = this.props;
    const warning = model.numbersOnlyWarning || 'Please enter numbers only';
    log('[onBadInput] warning: ', warning);
    const timeoutId = setTimeout(() => {
      this.setState({ warning: null });
    }, 1000);
    this.setState({ warning, timeoutId });
  }

  render() {
    const { session, model, classes } = this.props;
    log('[render] model: ', model);
    const { allowIntegersOnly } = model;
    const { value } = this.state;
    const FormatTag = getFormatTag(model);

    const inputProps = model.allowIntegersOnly ? { onBadInput: this.onBadInput } : {}
    const names = classNames(classes.textEntry, classes[model.colorContrast]);

    return (
      <div className={names}>
        <Input
          dark={model.colorContrast === 'white_on_black'}
          feedback={model.feedback}
          value={value}
          correctness={model.correctness}
          alignment={model.answerAlignment}
          size={model.answerBlankSize}
          onChange={this.onChange}
          inputComponent={FormatTag}
          error={this.state.warning}
          inputProps={inputProps}
          disabled={model.disabled} />
      </div>
    );
  }
}

TextEntry.propTypes = {}

export default withStyles(TextEntryStyles)(TextEntry);