import React from 'react';
import PropTypes from 'prop-types';
import { TextSelect } from '@pie-lib/text-select';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
const Types = {
  model: PropTypes.object,
  session: PropTypes.object,
  onSelectionChange: PropTypes.func.isRequired
};

export class Main extends React.Component {
  static propTypes = Types;

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      showCorrectAnswer: false
    };
  }

  toggleShowCorrect = () => {
    this.setState({ showCorrectAnswer: !this.state.showCorrectAnswer });
  };

  correctAnswer = () => {
    const { model } = this.props;
    return model.tokens.filter(t => t.correct);
  };

  render() {
    const { model, session, onSelectionChange } = this.props;
    const { showCorrectAnswer } = this.state;

    return (
      <div>
        <CorrectAnswerToggle
          show={model.disabled && model.incorrect}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        <TextSelect
          disabled={model.disabled}
          text={model.text}
          tokens={model.tokens}
          selectedTokens={
            showCorrectAnswer ? this.correctAnswer() : session.selectedTokens
          }
          onChange={onSelectionChange}
          highlightChoices={model.highlightChoices}
        />
      </div>
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
