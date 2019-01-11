import React from 'react';
import PropTypes from 'prop-types';
import ChoiceInput from './choice-input';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  corespringChoice: {
    '& *': {
      fontFamily: "'Roboto', Arial, Helvetica, sans-serif", //eslint-disable-line
      '-webkit-font-smoothing': 'antialiased'
    }
  },
  prompt: {
    verticalAlign: 'middle'
  },
  choice: {
    paddingTop: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #E0DEE0'
  },
  last: {
    borderBottom: 'none'
  }
};

export class MultipleChoice extends React.Component {
  static propTypes = {
    mode: PropTypes.oneOf(['gather', 'view', 'evaluate']),
    choiceMode: PropTypes.oneOf(['radio', 'checkbox']),
    keyMode: PropTypes.oneOf(['numbers', 'letters', 'none']),
    choices: PropTypes.array,
    prompt: PropTypes.string,
    session: PropTypes.object,
    disabled: PropTypes.bool.isRequired,
    onChoiceChanged: PropTypes.func.isRequired,
    responseCorrect: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    correctResponse: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      showCorrect: false
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    if (this.props.mode === 'evaluate') {
      this.setState({ showCorrect: !this.state.showCorrect });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.correctResponse) {
      this.setState({ showCorrect: false });
    }
  }

  isSelected(value) {
    if (this.props.session.value) {
      return this.props.session.value.indexOf(value) >= 0;
    } else {
      return false;
    }
  }

  indexToSymbol(index) {
    if (this.props.keyMode === 'numbers') {
      return index + 1;
    }

    if (this.props.keyMode === 'letters') {
      return String.fromCharCode(97 + index).toUpperCase();
    }

    return '';
  }

  render() {
    const {
      mode,
      disabled,
      choices,
      choiceMode,
      prompt,
      onChoiceChanged,
      responseCorrect,
      classes
    } = this.props;

    const { showCorrect } = this.state;
    const isEvaluateMode = mode === 'evaluate';

    const correctness = (isCorrect, isChecked) => isCorrect ? (isChecked ? 'correct' : 'incorrect' ): undefined;

    const choiceToTag = (choice, index) => {
      const choiceClass =
        'choice' + (index === choices.length - 1 ? ' last' : '');

      const checked = showCorrect
        ? choice.correct || false
        : this.isSelected(choice.value);

      const feedback = !isEvaluateMode || showCorrect ? '' : choice.feedback;

      const choiceProps = {
        checked,
        choiceMode,
        disabled,
        feedback,
        value: choice.value,
        correctness: isEvaluateMode ? correctness(choice.correct, checked) : undefined,
        displayKey: this.indexToSymbol(index),
        label: choice.label,
        onChange: mode === 'gather' ? onChoiceChanged : () => {}
      };

      const names = classNames(classes.choice, {
        [classes.last]: index === choices.length - 1
      });

      return (
        <div className={choiceClass} key={index}>
          <ChoiceInput {...choiceProps} className={names} />
        </div>
      );
    };

    return (
      <div className={classes.corespringChoice}>
        <CorrectAnswerToggle
          show={isEvaluateMode && !responseCorrect}
          toggled={this.state.showCorrect}
          onToggle={this.onToggle.bind(this)}
        />
        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: prompt }}
        />
        {choices.map(choiceToTag)}
      </div>
    );
  }
}

MultipleChoice.defaultProps = {
  session: {
    value: []
  }
};

export default withStyles(styles)(MultipleChoice);
