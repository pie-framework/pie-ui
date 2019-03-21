import React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { mq, HorizontalKeypad } from '@pie-lib/math-input';
import { MathToolbar } from '@pie-lib/math-toolbar';
import { Feedback } from '@pie-lib/render-ui';
import { renderMath } from '@pie-lib/math-rendering';
import { withStyles } from '@material-ui/core/styles';
import AnswerBlock from './answer-block';
import isEqual from 'lodash/isEqual';

export class SimpleQuestionBlockRaw extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    onSimpleResponseChange: PropTypes.func,
    model: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    showCorrect: PropTypes.bool
  };
  render() {
    const {
      classes,
      model,
      showCorrect,
      session,
      onSimpleResponseChange
    } = this.props;
    const correct =
      model.correctness &&
      model.correctness.info &&
      model.correctness.info.defaultResponse;
    const showAsCorrect = showCorrect || correct;
    const showAsIncorrect = showCorrect && !correct;

    if (!model.config) {
      return;
    }

    return (
      <div className={classes.expression}>
        {showCorrect || model.disabled ? (
          <div
            className={cx(classes.static, {
              [classes.correct]: showAsCorrect,
              [classes.incorrect]: showAsIncorrect
            })}
          >
            <mq.Static
              latex={
                showCorrect ? model.config.response.answer : session.response
              }
            />
          </div>
        ) : (
          <MathToolbar
            classNames={{ editor: classes.responseEditor }}
            latex={session.response || ''}
            keypadMode={model.config.equationEditor}
            onChange={onSimpleResponseChange}
            onDone={() => {}}
          />
        )}
      </div>
    );
  }
}
const SimpleQuestionBlock = withStyles(theme => ({
  responseEditor: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    minWidth: '500px',
    maxWidth: '900px',
    height: 'auto',
    minHeight: '130px',
    textAlign: 'left',
    padding: theme.spacing.unit,
    '&.mq-math-mode': {
      border: '1px solid lightgrey'
    }
  },
  expression: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    minHeight: '150px',
    '& > .mq-math-mode': {
      '& .mq-non-leaf': {
        display: 'inline-flex',
        alignItems: 'center'
      },
      '& .mq-non-leaf.mq-fraction': {
        display: 'inline-block'
      },
      '& .mq-paren': {
        verticalAlign: 'middle'
      }
    }
  },
  static: {
    color: 'grey',
    fontSize: '1rem',
    padding: theme.spacing.unit / 2,
    '& > .mq-math-mode': {
      '& > .mq-hasCursor': {
        '& > .mq-cursor': {
          display: 'none'
        }
      }
    }
  },
  correct: {
    color: 'green'
  },
  incorrect: {
    color: 'red'
  }
}))(SimpleQuestionBlockRaw);

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const answers = {};

    if (props.model.config && props.model.config.responses) {
      props.model.config.responses.forEach(response => {
        answers[response.id] = {
          value: ''
        };
      });
    }

    this.state = {
      session: {
        ...props.session,
        answers
      },
      activeAnswerBlock: '',
      showCorrect: false
    };

    this.callOnSessionChange();
  }

  componentDidUpdate(prevProps) {
    const { model } = this.props;
    const oldModel = prevProps.model;

    if (model.config.question !== oldModel.config.question) {
      renderMath(this.root);
    }

    this.checkAnswerBlocks();
  }

  componentWillReceiveProps(nextProps) {
    const config = this.props.model.config;
    const nextConfig = nextProps.model.config;

    if (
      (config &&
        config.responses &&
        config.responses.length !== nextConfig.responses.length) ||
      (!config && nextConfig && nextConfig.responses)
    ) {
      const answers = {};
      const stateAnswers = this.state.session.answers;

      nextConfig.responses.forEach(response => {
        answers[response.id] = {
          value: stateAnswers[response.id]
            ? stateAnswers[response.id].value
            : ''
        };
      });

      this.setState(state => ({ session: { ...state.session, answers } }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const sameModel = isEqual(this.props.model, nextProps.model);
    const sameState = isEqual(this.state, nextState);
    return !sameModel || !sameState;
  }

  componentDidMount() {
    renderMath(this.root);
    this.checkAnswerBlocks();
  }

  onDone = () => {};

  onSimpleResponseChange = response => {
    this.setState(
      state => ({ session: { ...state.session, response } }),
      this.callOnSessionChange
    );
  };

  onAnswerBlockClick = id => {
    this.setState({ activeAnswerBlock: id });
  };

  onAnswerBlockFocus = id => {
    this.setState({ activeAnswerBlock: id });
  };

  toNodeData = data => {
    if (!data) {
      return;
    }

    const { type, value } = data;

    if (type === 'command' || type === 'cursor') {
      return data;
    } else if (type === 'answer') {
      return { type: 'answer', ...data };
    } else if (value === 'clear') {
      return { type: 'clear' };
    } else {
      return { type: 'write', value };
    }
  };

  setInput = input => {
    this.input = input;
  };

  onClick = data => {
    const c = this.toNodeData(data);

    if (c.type === 'clear') {
      this.input.clear();
    } else if (c.type === 'command') {
      this.input.command(c.value);
    } else if (c.type === 'cursor') {
      this.input.keystroke(c.value);
    } else if (c.type === 'answer') {
      this.input.write(`\\embed{answerBlock}[${c.id}]`);
    } else {
      this.input.write(c.value);
    }
  };

  checkAnswerBlocks = () => {
    const { model } = this.props;
    const { activeAnswerBlock, session, showCorrect } = this.state;

    if (!model.config) {
      return;
    }

    const responses = model.config.responses;

    if (responses && responses.length) {
      responses.forEach((response, index) => {
        const elements = document.querySelectorAll(`#${response.id}`);

      if (elements.length > 0) {
        const element = elements.length === 2 ? elements[1] : elements[0];
        const correct = showCorrect || (model.correctness && model.correctness.info && model.correctness.info[response.id]);
        const elementToRender = (
          <AnswerBlock
            correct={correct}
            showCorrect={showCorrect || (model.disabled && !model.view)}
            onClick={this.onAnswerBlockClick}
            id={response.id}
            active={activeAnswerBlock === response.id}
            index={index}
            setInput={this.setInput}
            onChange={this.onAnswerChange(response.id)}
            onFocus={this.onAnswerBlockFocus}
            disabled={showCorrect || model.disabled}
            latex={showCorrect ? response.answer : session.answers[response.id].value || ''
          }
        />);

          ReactDOM.render(elementToRender, element);
        }
      })
    }
  }

  callOnSessionChange = () => {
    const { onSessionChange } = this.props;

    if (onSessionChange) {
      onSessionChange(this.state.session);
    }
  };

  toggleShowCorrect = show => {
    this.setState({ showCorrect: show });
  };

  onAnswerChange = id => (index, answer) => {
    this.setState(
      state => ({
        session: {
          ...state.session,
          answers: {
            ...state.session.answers,
            [id]: { value: answer }
          }
        }
      }),
      this.callOnSessionChange
    );
  };

  render() {
    const { model, classes } = this.props;
    const { showCorrect, activeAnswerBlock, session } = this.state;

    if (!this.props.model.config) {
      return null;
    }

    return (
      <div className={classes.mainContainer}  ref={r => (this.root = r)}>
        <div className={classes.main}>
          {model.correctness && <div>Score: {model.correctness.score}</div>}
          <CorrectAnswerToggle
            className={classes.toggle}
            show={
              model.correctness && model.correctness.correctness !== 'correct'
            }
            toggled={showCorrect}
            onToggle={this.toggleShowCorrect}
          />
          <div className={classes.content}>
            <div
              dangerouslySetInnerHTML={{ __html: model.config.question }}
            />
          </div>
          {model.config.mode === 'simple' && (
            <SimpleQuestionBlock
              onSimpleResponseChange={this.onSimpleResponseChange}
              showCorrect={showCorrect}
              model={model}
              session={session}
            />
          )}
          {model.config.mode === 'advanced' && (
            <div className={classes.expression}>
              <mq.Static latex={model.config.expression} />
            </div>
          )}
          <div className={classes.responseContainer}>
            {model.config.mode === 'advanced' && model.config.responses && model.config.responses.map(
              response =>
                (response.id === activeAnswerBlock && (
                  <HorizontalKeypad
                    key={response.id}
                    mode={model.config.equationEditor}
                    onClick={this.onClick}
                  />
                )) ||
                null
            )}
          </div>
        </div>
        {model.feedback && (
          <Feedback
            correctness={model.correctness.correctness}
            feedback={model.feedback}
          />
        )}
      </div>
    );
  }
}

const styles = theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  main: {
    width: '100%'
  },
  title: {
    fontSize: '1.1rem',
    display: 'block',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  content: {
    marginTop: theme.spacing.unit * 2
  },
  responseContainer: {
    marginTop: theme.spacing.unit * 2
  },
  toggle: {
    paddingBottom: theme.spacing.unit * 3
  },
  expression: {
    border: '1px solid lightgray',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    minHeight: '150px',
    '& > .mq-math-mode': {
      '& .mq-non-leaf': {
        display: 'inline-flex',
        alignItems: 'center'
      },
      '& .mq-non-leaf.mq-fraction': {
        display: 'inline-block'
      },
      '& .mq-paren': {
        verticalAlign: 'middle'
      }
    }
  }
});

export default withStyles(styles)(Main);
