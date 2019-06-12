import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { ConstructedResponse } from '@pie-lib/mask-markup';

export class Main extends React.Component {
  static propTypes = {
    prompt: PropTypes.string,
    disabled: PropTypes.bool,
    markup: PropTypes.string,
    mode: PropTypes.string,
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
    const { mode, prompt } = this.props;

    return (
      <div>
        <CorrectAnswerToggle
          show={mode === 'evaluate'}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        {prompt && <div dangerouslySetInnerHTML={{ __html: prompt }}/>}
        <ConstructedResponse
          {...this.props}
          showCorrectAnswer={showCorrectAnswer}
        />
      </div>
    );
  }
}

export default Main;