import React from 'react';
import PropTypes from 'prop-types';
import { TextSelect } from '@pie-lib/text-select';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback, Collapsible } from '@pie-lib/render-ui';
import { withStyles } from '@material-ui/core/styles';

import debug from 'debug';

const log = debug('@pie-ui:select-text');

const Types = {
  model: PropTypes.object,
  session: PropTypes.object,
  onSelectionChange: PropTypes.func.isRequired
};

export class Main extends React.Component {
  static propTypes = { ...Types, classes: PropTypes.object.isRequired };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      showCorrectAnswer: false
    };
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ showCorrectAnswer: false });
  }

  toggleShowCorrect = () => {
    this.setState({ showCorrectAnswer: !this.state.showCorrectAnswer });
  };

  correctAnswer = () => {
    const { model } = this.props;
    return model.tokens.filter(t => t.correct);
  };

  render() {
    const { model, session, onSelectionChange, classes } = this.props;
    const { showCorrectAnswer } = this.state;

    const selectedTokens = showCorrectAnswer
      ? this.correctAnswer()
      : session.selectedTokens;

    log('[render] selectedTokens:', selectedTokens);

    return (
      <div>
        {
          model.teacherInstructions && (
            <Collapsible
              labels={{ hidden: 'Show Teacher Instructions', visible: 'Hide Teacher Instructions' }}
              className={classes.collapsible}
            >
              <div dangerouslySetInnerHTML={{ __html: model.teacherInstructions }}/>
            </Collapsible>
          )
        }
        <br />
        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: model.prompt }}
        />
        <CorrectAnswerToggle
          show={model.disabled && model.incorrect}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        <TextSelect
          className={classes.textSelect}
          disabled={model.disabled}
          text={model.text}
          tokens={model.tokens}
          selectedTokens={selectedTokens}
          onChange={onSelectionChange}
          highlightChoices={model.highlightChoices}
          maxNoOfSelections={model.maxSelections}
        />
        {
          model.rationale && (
            <Collapsible
              labels={{ hidden: 'Show Rationale', visible: 'Hide Rationale' }}
              className={classes.collapsible}
            >
              <div dangerouslySetInnerHTML={{ __html: model.rationale }}/>
            </Collapsible>
          )
        }
        {model.correctness && model.feedback && !showCorrectAnswer && (
          <Feedback correctness={model.correctness} feedback={model.feedback} />
        )}
      </div>
    );
  }
}

const StyledMain = withStyles(theme => ({
  textSelect: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  prompt: {
    verticalAlign: 'middle',
    marginBottom: theme.spacing.unit
  },
  collapsible: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3
  }
}))(Main);

export default class Stateful extends React.Component {
  static propTypes = Types;

  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      session: props.session
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ model: nextProps.model, session: nextProps.session });
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
      <StyledMain
        model={model}
        session={session}
        onSelectionChange={this.change}
      />
    );
  }
}
