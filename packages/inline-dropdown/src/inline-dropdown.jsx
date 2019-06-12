import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { InlineDropdown as DropDown } from '@pie-lib/mask-markup';

export class InlineDropdown extends React.Component {
  static propTypes = {
    prompt: PropTypes.string,
    disabled: PropTypes.bool,
    markup: PropTypes.string,
    mode: PropTypes.string,
    choices: PropTypes.object,
    value: PropTypes.object,
    feedback: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: {}
  };

  state = {
    showCorrectAnswer: false
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.feedback)) {
      this.setState({ showCorrectAnswer: false });
    }
  }

  toggleShowCorrect = () => {
    this.setState({ showCorrectAnswer: !this.state.showCorrectAnswer });
  };

  render() {
    const { showCorrectAnswer } = this.state;
    const { prompt, mode } = this.props;

    return (
      <div>
        <CorrectAnswerToggle
          show={mode === 'evaluate'}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        {prompt && <div dangerouslySetInnerHTML={{ __html: prompt }}/>}
        <DropDown
          {...this.props}
          showCorrectAnswer={showCorrectAnswer}
        />
      </div>
    );
  }
}

export default InlineDropdown;
