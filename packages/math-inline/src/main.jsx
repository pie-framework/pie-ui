import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
// import { MathToolbar } from '@pie-lib/math-toolbar';
import Static from '@pie-lib/math-toolbar/lib/mathquill/static';
import { Feedback } from '@pie-lib/render-ui';
import { HorizontalKeypad } from '@pie-lib/math-input';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AnswerBlock from './answer-block';

let MQ;

if (typeof window !== 'undefined') {
  const MathQuill = require('mathquill');
  MQ = MathQuill.getInterface(2);

  MQ.registerEmbed('answerBlock', id => {
    return {
      htmlString: `<span id=${id}></span>`,
      text: () => 'testText',
      latex: () => '\\embed{answerBlock}[' + id + ']'
    };
  });
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

    if (props.model.config && props.model.config.responses) {
      props.model.config.responses.forEach(response => {
        answers[response.id] = {
          value: '',
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

  componentDidUpdate() {
    this.checkAnswerBlocks();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.model.config.responses.length !== nextProps.model.config.responses.length) {
      const answers = {};
      const stateAnswers = this.state.session.answers;

      nextProps.model.config.responses.forEach(response => {
        answers[response.id] = {
          value: stateAnswers[response.id] ? stateAnswers[response.id].value : '',
        };
      });

      this.setState(state => ({ session: { ...state.session, answers }}));
    }
  }

  componentDidMount() {
    this.checkAnswerBlocks();
  }

  onDone = () => {
    this.checkAnswerBlocks();
  };

  onAnswerBlockClick = id => {
    this.setState({ activeAnswerBlock: id }, this.checkAnswerBlocks);
  }

  onAnswerBlockFocus = id => {
    this.setState({ activeAnswerBlock: id }, this.checkAnswerBlocks);
  }

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
  }

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
    const responses = model.config.responses;

    responses.forEach((response, index) => {
      const elements = document.querySelectorAll(`#${response.id}`);

      if (elements.length === 2) {
        const element = elements[1];
        const elementToRender = (
          <AnswerBlock
            correct={showCorrect || (model.correctness && model.correctness.info && model.correctness.info[response.id])}
            showCorrect={showCorrect || (model.disabled && !model.view)}
            onClick={this.onAnswerBlockClick}
            id={response.id}
            active={activeAnswerBlock === response.id}
            index={index}
            setInput={this.setInput}
            onChange={this.onAnswerChange(response.id)}
            onFocus={this.onAnswerBlockFocus}
            disabled={showCorrect || model.disabled}
            latex={showCorrect ? response.answer : session.answers[response.id].value}
          />
        );

        ReactDOM.render(elementToRender, element);
      }
    })
  }

  callOnSessionChange = () => {
    const { onSessionChange } = this.props;

    if (onSessionChange) {
      onSessionChange(this.state.session);
    }
  };

  toggleShowCorrect = show => {
    this.setState({ showCorrect: show }, () => {
      this.checkAnswerBlocks();
      this.forceUpdate();
    });
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
    const { showCorrect, activeAnswerBlock } = this.state;

    if (!this.props.model.config) {
      return null;
    }

    return (
      <div className={classes.mainContainer}>
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
            <Typography component="div" type="body1">
              <span>
                Please fill out the response(s) below. You can select an answer block you wish to fill out by clicking on it to activate it.
              </span>
            </Typography>
          </div>
          <div className={classes.expression}>
            <Static latex={model.config.expression} />
          </div>
          <div className={classes.responseContainer}>
            {model.config.responses.map(response => response.id === activeAnswerBlock && (
              <HorizontalKeypad
                key={response.id}
                mode={model.config.equationEditor}
                onClick={this.onClick}
              />
            ) || null)}
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
    minHeight: '150px'
  },
  responseEditor: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    minWidth: '500px',
    maxWidth: '900px',
    height: 'auto',
    minHeight: '130px',
    textAlign: 'left',
    padding: theme.spacing.unit
  },
});

export default withStyles(styles)(Main);
