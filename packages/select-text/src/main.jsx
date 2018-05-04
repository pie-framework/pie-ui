import React from 'react';
import PropTypes from 'prop-types';
import { TextSelect } from '@pie-lib/text-select';

const Types = {
  model: PropTypes.object,
  session: PropTypes.object,
  onSelectionChange: PropTypes.func.isRequired
};

export class Main extends React.Component {
  static propTypes = Types;

  static defaultProps = {};

  render() {
    const { model, session, onSelectionChange } = this.props;
    return (
      <TextSelect
        disabled={model.disabled}
        text={model.text}
        tokens={model.tokens}
        selectedTokens={session.selectedTokens}
        onChange={onSelectionChange}
        highlightChoices={model.highlightChoices}
      />
    );
  }
}

export default class Stateful extends React.Component {
  static propTypes = Types;

  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      session: props.session
    };
  }

  change = selectedTokens => {
    const session = { ...this.state.session, selectedTokens };
    this.setState({ session }, () => {
      this.props.onSelectionChange(this.state.session.selectedTokens);
    });
  };

  render() {
    const { model, session } = this.state;
    return (
      <Main model={model} session={session} onSelectionChange={this.change} />
    );
  }
}
