import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import HintsPopover from './hints-popover';
import Input from './input';

const log = debug('pie-ui:function-entry');

export default class FunctionEntry extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object,
    model: PropTypes.object,
    onValueChanged: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      value: (props.session && props.session.value) || '',
      hintsAnchorEl: null,
      anchorReference: 'anchorEl',
      hintsOpen: false
    };
  }

  handleHintsPopoverOpen = event => {
    this.setState({ hintsAnchorEl: event.target });
  };

  handleHintsPopoverClose = () => {
    this.setState({ hintsAnchorEl: null });
  };

  onChange = event => {
    clearTimeout(this.state.timeoutId);

    this.setState({ warning: null, timeoutId: null });

    log('[onChange] value: ', event.target.value);

    if (this.state.value !== event.target.value) {
      let value = this.props.model.ignoreWhitespace
        ? event.target.value.trim()
        : event.target.value;

      this.setState({ value }, () => {
        this.props.onValueChanged(this.state.value);
      });
    }
  };

  render() {
    const { model } = this.props;
    log('[render] model: ', model);
    const { value } = this.state;
    const { anchorReference, hintsAnchorEl } = this.state;
    const hintsOpen = model.showFormattingHelp && !!hintsAnchorEl;

    return (
        <div>
          <Input
            inputProps={{
              onFocus: this.handleHintsPopoverOpen,
              onBlur: this.handleHintsPopoverClose
            }}
            feedback={model.feedback}
            value={value}
            correctness={model.correctness}
            onChange={this.onChange}
            error={this.state.warning}
            disabled={model.disabled}
          />
          <HintsPopover
              hintsOpen={hintsOpen}
              anchorEl={hintsAnchorEl}
              anchorReference={anchorReference}
          />
        </div>
    );
  }
}
