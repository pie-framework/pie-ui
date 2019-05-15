import React from 'react';
import { GraphLines, lineUtils as utils } from '@pie-lib/charting';
import PropTypes from 'prop-types';
import Controls from './controls';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { Feedback, Collapsible } from '@pie-lib/render-ui';
import GraphLineControls from './GraphLineControls';
import { withStyles } from '@material-ui/core/styles';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.shape({
      lines: PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
          }),
          to: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
          })
        })
      )
    }),
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const lines = props.session.lines || [];

    this.state = {
      session: { ...props.session, lines },
      selection: [],
      useSessionLines: false,
      showCorrect: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const lines = nextProps.session.lines || [];
    let shouldUseSessionLines = true;

    // if we do not have lines in the session OR
    // if we previously had lines in the session and they were cleared out
    // it means the model has changed and we need to stop using the lines in the session
    if (
      !this.props.session.lines ||
      (this.props.session.lines &&
      this.props.session.lines.length &&
      this.state.useSessionLines &&
      !lines.length)
    ) {
      shouldUseSessionLines = false;
    }

    const session = { ...nextProps.session, lines };

    this.setState({ session, useSessionLines: shouldUseSessionLines });
  }

  setUseSessionLines = lines => {
    this.setState(
      state => ({
        session: { ...state.session, lines },
        useSessionLines: true
      }),
      this.callOnSessionChange
    );
  };

  callOnSessionChange = () => {
    const { onSessionChange } = this.props;

    if (onSessionChange) {
      onSessionChange(this.state.session);
    }
  };

  deleteSelection = () => {
    const lines = utils.removeLines(
      this.state.session.lines,
      this.state.selection
    );

    const session = { ...this.state.session, lines };
    this.setState({ session, selection: [] }, this.callOnSessionChange);
  };

  buildLines = () => {
    const { model } = this.props;
    const { session, showCorrect, selection, useSessionLines } = this.state;

    if (model.correctResponse) {
      if (showCorrect) {
        return model.correctResponse;
      } else {
        return session.lines.map(line => ({
          ...line,
          selected: utils.hasLine(selection, line),
          correct: utils.hasLine(model.correctResponse, line)
        }));
      }
    } else if (useSessionLines) {
      return session.lines;
    } else {
      const lines = [];

      model.graph.lines.forEach(line => {
        const lineExpression = utils.expressionFromDescriptor(line.initialView);
        const points = utils.pointsFromExpression(lineExpression);

        lines.push({ ...line, ...points });
      });

      return lines;
    }
  };

  toggleShowCorrect = show => {
    this.setState({ showCorrect: show });
  };

  onLineChange = (old, newLine) => {
    const { session, selection, useSessionLines } = this.state;
    const linesToUse = useSessionLines ? session.lines : this.buildLines();
    const newLines = utils.swapLine(linesToUse, old, newLine);
    const newSelection = utils.swapLine(selection, old, newLine);
    const newSession = { ...session, lines: newLines };

    this.setState(
      { session: newSession, selection: newSelection, useSessionLines: true },
      this.callOnSessionChange
    );
  };

  toggleSelectLine = line => {
    const { session, useSessionLines, selection } = this.state;
    let newLines;
    let newSelection;

    if (utils.hasLine(selection, line)) {
      newSelection = utils.removeLine(selection, line);
    } else {
      newSelection = selection.concat([{ ...line, selected: true }]);
    }

    const linesToUse = useSessionLines ? session.lines : this.buildLines();

    newLines = linesToUse.map(lineToUse => {
      if (utils.linesEqual(lineToUse, line)) {
        return { ...lineToUse, selected: !utils.hasLine(selection, line) };
      }

      return lineToUse;
    });

    const newSession = { ...session, lines: newLines };

    this.setState(
      { selection: newSelection, session: newSession, useSessionLines: true },
      this.callOnSessionChange
    );
  };

  onAddPoint = () => {
    const linesFromModel = this.buildLines();

    this.setUseSessionLines(linesFromModel);
  };

  onAddLine = line => {
    this.setState(
      state => ({
        session: { ...state.session, lines: [...state.session.lines, line] }
      }),
      this.callOnSessionChange
    );
  };

  updateLines = newLines => {
    this.setUseSessionLines(newLines);
  };

  onDeleteLine = line => {
    const { session, useSessionLines, selection } = this.state;
    const linesToUse = useSessionLines ? session.lines : this.buildLines();

    this.setState(
      state => ({
        session: {
          ...state.session,
          lines: utils.removeLine(linesToUse, line)
        },
        useSessionLines: true,
        selection: utils.removeLine(selection, line)
      }),
      this.callOnSessionChange
    );
  };

  render() {
    const { model, classes } = this.props;
    const { selection, showCorrect } = this.state;
    const lines = this.buildLines();

    return (
      <div className={classes.mainContainer}>
        <div className={classes.main}>
          {model.correctness && <div>Score: {model.correctness.score}</div>}
          <CorrectAnswerToggle
            className={classes.toggle}
            show={
              !model.exhibitOnly &&
              model.correctness &&
              model.correctness.correctness !== 'correct'
            }
            toggled={showCorrect}
            onToggle={this.toggleShowCorrect}
          />
          {!model.disabled &&
          !model.exhibitOnly && (
            <Controls
              iconOnly={false}
              disabled={!(selection && selection.length > 0)}
              onDeleteClick={this.deleteSelection}
            />
          )}
          <GraphLineControls
            lines={lines}
            model={model}
            onDeleteLine={this.onDeleteLine}
            updateLines={this.updateLines}
          />
          <GraphLines
            maxLines={model.multiple ? model.lines.length : 1}
            className={classes.graph}
            lines={lines}
            width={model.width}
            height={model.height}
            domain={model.domain}
            range={model.range}
            disabled={model.disabled || model.exhibitOnly || false}
            onAddPoint={this.onAddPoint}
            onAddLine={this.onAddLine}
            onLineChange={this.onLineChange}
            onLineClick={this.toggleSelectLine}
          />
        </div>
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
        {model.feedback && (
          <Feedback
            correctness={model.correctness.correctness}
            feedback={model.feedback}
            width={model.width - 20}
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
  graph: {
    display: 'flex',
    justifyContent: 'center'
  },
  main: {
    width: '100%'
  },
  toggle: {
    paddingBottom: theme.spacing.unit * 3
  },
  collapsible: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Main);