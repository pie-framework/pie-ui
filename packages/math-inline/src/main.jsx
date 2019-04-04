import React from 'react';
import PropTypes from 'prop-types';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { mq, HorizontalKeypad } from '@pie-lib/math-input';
import { Feedback } from '@pie-lib/render-ui';
import { renderMath } from '@pie-lib/math-rendering';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual';
import SimpleQuestionBlock from './simple-question-block';

let registered = false;
const REGEX = /\\embed\{answerBlock\}\[(.*?)\]/g;

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

    if (this.root && model.config && model.config.responses) {
      model.config.responses.forEach((response, idx) => {
        const el = this.root.querySelector(`#${response.id}`);
        const indexEl = this.root.querySelector(`#${response.id}Index`);
        const shouldShowCorrect = showCorrect || (model.disabled && !model.view);
        const correct = showCorrect || (model.correctness && model.correctness.info && model.correctness.info[response.id]);

        if (el) {
          const MathQuill = require('@pie-framework/mathquill');
          let MQ = MathQuill.getInterface(2);
          const answer = answers[response.id];

          el.textContent = showCorrect ? response.answer : answer && answer.value || '';

          if (shouldShowCorrect) {
            el.parentElement.parentElement.classList.add(correct ? classes.correct : classes.incorrect);
          } else {
            el.parentElement.parentElement.classList.remove(classes.correct);
            el.parentElement.parentElement.classList.remove(classes.incorrect);
          }

          MQ.StaticMath(el);

          indexEl.textContent = `R${idx + 1}`;
        }
      })
    }
  };

  componentDidUpdate(prevProps) {
    const { model } = this.props;
    const oldModel = prevProps.model;

    if (model.config.question !== oldModel.config.question) {
      renderMath(this.root);
    }

    this.handleAnswerBlockDomUpdate();
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
    this.handleAnswerBlockDomUpdate();
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
      this.input.cmd(c.value);
    } else if (c.type === 'cursor') {
      this.input.keystroke(c.value);
    } else if (c.type === 'answer') {
      this.input.write(`\\embed{answerBlock}[${c.id}]`);
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
    this.setState(
      state => ({
        session: {
          ...state.session,
          answers: {
            ...state.session.answers,
            [name]: { value: subfieldValue }
          }
        }
      }),
      this.callOnSessionChange
    );
  }

  prepareForStatic(ltx) {
    const { model } = this.props;
    const { showCorrect } = this.state;

    if (showCorrect || model.disabled) {
      return ltx;
    }

    return ltx.replace(
      REGEX,
      (match, submatch) => {
        const answers = this.state.session.answers;
        const answer = answers[submatch];

        return `\\MathQuillMathField[${submatch}]{${answer && answer.value || ''}}`;
      }
    );
  }

  getFieldName = (changeField, fields) => {
    const { model } = this.props;

    if (model.config && model.config.responses && model.config.responses.length) {
      const keys = this.props.model.config.responses.map(response => response.id);

      return keys.find(k => {
        const tf = fields[k];
        return tf && tf.id == changeField.id;
      });
    }
  }

  render() {
    const { model, classes } = this.props;
    const { showCorrect, activeAnswerBlock, session } = this.state;

    if (!this.props.model.config) {
      return null;
    }

    return (
      <div className={classes.mainContainer} ref={r => (this.root = r || this.root)}>
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
              <mq.Static
                latex={this.prepareForStatic(model.config.expression)}
                onSubFieldChange={this.subFieldChanged}
                getFieldName={this.getFieldName}
                setInput={this.setInput}
                onSubFieldFocus={this.onAnswerBlockFocus}
              />
            </div>
          )}
          <div className={classes.responseContainer}>
            {model.config.mode === 'advanced' && model.config.responses && model.config.responses.map(
              response =>
                (response.id === activeAnswerBlock && !(showCorrect || model.disabled) && (
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
      },
      '& > .mq-root-block': {
        '& > .mq-editable-field': {
          minWidth: '40px',
          margin: theme.spacing.unit * 2 / 3,
          padding: theme.spacing.unit / 2
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
        },
      }
    }
  }
});

export default withStyles(styles)(Main);
