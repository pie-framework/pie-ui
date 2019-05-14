import React from 'react';
import PropTypes from 'prop-types';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Collapsible } from '@pie-lib/tools';
import { mq, HorizontalKeypad } from '@pie-lib/math-input';
import { Feedback } from '@pie-lib/render-ui';
import { renderMath } from '@pie-lib/math-rendering';
import { withStyles } from '@material-ui/core/styles';
import { ResponseTypes } from './utils';
import isEqual from 'lodash/isEqual';
import SimpleQuestionBlock from './simple-question-block';

let registered = false;

const REGEX = /{{response}}/gm;
const DEFAULT_KEYPAD_VARIANT = '6';

function generateAdditionalKeys(keyData = []) {
  return keyData.map(key => ({
    name: key,
    latex: key,
    write: key,
    label: key
  }));
}

function prepareForStatic(model, state) {
  if (model.config && model.config.expression) {
    const modelExpression = model.config.expression;

    if (state.showCorrect) {
      return model.config.responseType === ResponseTypes.advanced ? model.config.responses[0].answer : model.config.response.answer;
    }

    let answerBlocks = 1; // assume one at least
    // build out local state model using responses declared in expression

    return (modelExpression || '').replace(REGEX, function() {
      const answer = state.session.answers[`r${answerBlocks}`];

      if (model.disabled) {
        return `\\embed{answerBlock}[r${answerBlocks++}]`;
      }

      return `\\MathQuillMathField[r${answerBlocks++}]{${(answer && answer.value) || ''}}`;
    });
  }
}

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

    if (props.model.config && props.model.config.expression) {
      let answerBlocks = 1; // assume one at least
      // build out local state model using responses declared in expression

      (props.model.config.expression || '').replace(REGEX, () => {
        answers[`r${answerBlocks++}`] = {
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

  UNSAFE_componentWillMount() {
    const { classes } = this.props;

    if (typeof window !== 'undefined') {
      const MathQuill = require('@pie-framework/mathquill');
      let MQ = MathQuill.getInterface(2);

      if (!registered) {
        MQ.registerEmbed('answerBlock', data => {
          return {
            htmlString: `<div class="${classes.blockContainer}">
                <div class="${classes.blockResponse}" id="${data}Index">R</div>
                <div class="${classes.blockMath}">
                  <span id="${data}"></span>
                </div>
              </div>`,
            text: () => 'text',
            latex: () => `\\embed{answerBlock}[${data}]`
          };
        });

        registered = true;
      }
    }
  }

  handleAnswerBlockDomUpdate = () => {
    const { model, classes } = this.props;
    const { session, showCorrect } = this.state;
    const answers = session.answers;

    if (this.root && model.disabled && !showCorrect) {
      Object.keys(answers).forEach((answerId, idx) => {
        const el = this.root.querySelector(`#${answerId}`);
        const indexEl = this.root.querySelector(`#${answerId}Index`);
        const correct = model.correctness && model.correctness.correct;

        if (el) {
          const MathQuill = require('@pie-framework/mathquill');
          let MQ = MathQuill.getInterface(2);
          const answer = answers[answerId];

          el.textContent = answer && answer.value || '';

          if (!model.view) {
            el.parentElement.parentElement.classList.add(
              correct ? classes.correct : classes.incorrect
            );
          } else {
            el.parentElement.parentElement.classList.remove(classes.correct);
            el.parentElement.parentElement.classList.remove(classes.incorrect);
          }

          MQ.StaticMath(el);

          indexEl.textContent = `R${idx + 1}`;
        }
      });
    }

    renderMath(this.root);
  };

  componentDidUpdate() {
    this.handleAnswerBlockDomUpdate();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const config = this.props.model.config;
    const nextConfig = nextProps.model.config;

    if (
      (config &&
        config.responses &&
        config.responses.length !== nextConfig.responses.length) ||
      (!config && nextConfig && nextConfig.responses) ||
      config.expression !== nextConfig.expression
    ) {
      const newAnswers = {};
      const answers = this.state.session.answers;

      let answerBlocks = 1; // assume one at least

      // build out local state model using responses declared in expression
      (nextConfig.expression || '').replace(REGEX, () => {
        newAnswers[`r${answerBlocks}`] = {
          value:
            (answers &&
              answers[`r${answerBlocks}`] &&
              answers[`r${answerBlocks}`].value) ||
            ''
        };
        answerBlocks++;
      });

      this.setState(
        state => ({
          session: {
            ...state.session,
            completeAnswer: this.mqStatic && this.mqStatic.mathField.latex(),
            answers: newAnswers
          }
        }),
        this.handleAnswerBlockDomUpdate
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const sameModel = isEqual(this.props.model, nextProps.model);
    const sameState = isEqual(this.state, nextState);

    return !sameModel || !sameState;
  }

  componentDidMount() {
    renderMath(this.root);
  }

  onDone = () => {};

  onSimpleResponseChange = response => {
    this.setState(
      state => ({ session: { ...state.session, response } }),
      this.callOnSessionChange
    );
  };

  onSubFieldFocus = id => {
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
      this.input.cmd(c.value);
    } else if (c.type === 'cursor') {
      this.input.keystroke(c.value);
    } else {
      this.input.write(c.value);
    }

    this.input.focus();
  };

  callOnSessionChange = () => {
    const { onSessionChange } = this.props;

    if (onSessionChange) {
      onSessionChange(this.state.session);
    }
  };

  toggleShowCorrect = show => {
    this.setState({ showCorrect: show }, this.handleAnswerBlockDomUpdate);
  };

  subFieldChanged = (name, subfieldValue) => {
    if (name) {
      this.setState(
        state => ({
          session: {
            ...state.session,
            completeAnswer: this.mqStatic && this.mqStatic.mathField.latex(),
            answers: {
              ...state.session.answers,
              [name]: { value: subfieldValue }
            }
          }
        }),
        this.callOnSessionChange
      );
    }
  };

  getFieldName = (changeField, fields) => {
    const { answers } = this.state.session;

    if (Object.keys(answers || {}).length) {
      const keys = Object.keys(answers);

      return keys.find(k => {
        const tf = fields[k];
        return tf && tf.id == changeField.id;
      });
    }
  };

  render() {
    const { model, classes } = this.props;
    const state = this.state;
    const { activeAnswerBlock, showCorrect, session } = state;

    if (!model.config) {
      return null;
    }

    const additionalKeys = generateAdditionalKeys(model.config.customKeys);

    return (
      <div
        className={classes.mainContainer}
        ref={r => (this.root = r || this.root)}
      >
        <div className={classes.main}>
          {model.correctness && <div>Score: {model.correctness.score}</div>}
          {model.correctness && model.correctness.correctness !== 'correct' && <CorrectAnswerToggle
            className={classes.toggle}
            show
            toggled={showCorrect}
            onToggle={this.toggleShowCorrect}
          />}
          <div className={classes.content}>
            <div dangerouslySetInnerHTML={{ __html: model.config.question }} />
          </div>
          {model.config.responseType === ResponseTypes.simple && (
            <SimpleQuestionBlock
              onSimpleResponseChange={this.onSimpleResponseChange}
              showCorrect={showCorrect}
              model={model}
              session={session}
            />
          )}
          {model.config.responseType === ResponseTypes.advanced && (
            <div className={classes.expression}>
              <mq.Static
                ref={mqStatic => (this.mqStatic = mqStatic || this.mqStatic)}
                latex={prepareForStatic(model, state) || ''}
                onSubFieldChange={this.subFieldChanged}
                getFieldName={this.getFieldName}
                setInput={this.setInput}
                onSubFieldFocus={this.onSubFieldFocus}
              />
            </div>
          )}
          <div className={classes.responseContainer}>
            {model.config.responseType === ResponseTypes.advanced &&
              Object.keys(session.answers).map(
                answerId =>
                  (answerId === activeAnswerBlock &&
                    !(showCorrect || model.disabled) && (
                      <HorizontalKeypad
                        key={answerId}
                        additionalKeys={additionalKeys}
                        mode={model.config.equationEditor || DEFAULT_KEYPAD_VARIANT}
                        onClick={this.onClick}
                      />
                    )) ||
                  null
              )}
          </div>
        </div>

        {
          model.rationale && (
            <Collapsible
              content={model.rationale}
              collapseTitle="Hide Rationale"
              extendTitle="Show Rationale"
            />
          )
        }
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
    marginTop: theme.spacing.unit * 2,
    '& > .mq-math-mode': {
      '& > .mq-root-block': {
        '& > .mq-editable-field': {
          minWidth: '10px',
          margin: (theme.spacing.unit * 2) / 3,
          padding: theme.spacing.unit / 4
        }
      }
    }
  },
  correct: {
    borderColor: 'green !important'
  },
  incorrect: {
    borderColor: 'red !important'
  },
  blockContainer: {
    margin: theme.spacing.unit,
    display: 'inline-flex',
    border: '2px solid grey'
  },
  blockResponse: {
    flex: 2,
    color: 'grey',
    background: 'lightgrey',
    fontSize: '0.8rem',
    padding: theme.spacing.unit / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '2px solid grey'
  },
  blockMath: {
    color: '#bdbdbd',
    padding: theme.spacing.unit / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
    '& > .mq-math-mode': {
      '& > .mq-hasCursor': {
        '& > .mq-cursor': {
          display: 'none'
        }
      }
    }
  }
});

export default withStyles(styles)(Main);
