import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';
import Input from './input';

const log = debug('pie-elements:text-entry');

const FunctionEntryStyles = {
  'white_on_black': {
    backgroundColor: 'black'
  },
  'black_on_rose': {
    backgroundColor: 'mistyrose'
  }
}

export class FunctionEntry extends React.Component {
  static propTypes = {
    session: PropTypes.object,
    model: PropTypes.object,
    onValueChanged: PropTypes.func,
    classes: PropTypes.object,
  }

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
      let value = this.props.model.ignoreWhitespace ? event.target.value.trim() : event.target.value;

      this.setState({ value }, () => {
        this.props.onValueChanged(this.state.value);
      });
    }
  }


  render() {
    const { model, classes } = this.props;
    log('[render] model: ', model);
    const { value } = this.state;

    const inputProps = model.allowIntegersOnly ? { onBadInput: this.onBadInput } : {}

    return (
        <div className={classes[model.colorContrast]}>
          <Input
              dark={model.colorContrast === 'white_on_black'}
              feedback={model.feedback}
              value={value}
              correctness={model.correctness}
              onChange={this.onChange}
              error={this.state.warning}
              inputProps={inputProps}
              disabled={model.disabled} />
        </div>
    );
  }
}

export default withStyles(FunctionEntryStyles)(FunctionEntry);
