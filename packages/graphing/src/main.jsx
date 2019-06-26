import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { GraphContainer as Graph, tools } from '@pie-lib/graphing';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.shape({}),
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired,
    onAnswersChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    const toolsArr = [
      tools.point(),
      tools.circle(),
      tools.polygon(),
      tools.segment(),
      tools.vector(),
      tools.ray(),
      tools.line(),
      tools.sine(),
      tools.parabola()
    ];
    this.state = {
      currentTool: toolsArr[2],
      tools: toolsArr,
      displayedTools: toolsArr,
      settings: {
        includeArrows: true,
        labels: true,
        graphTitle: false,
        coordinatesOnHover: false,
        size: {
          width: 400,
          height: 400
        }
      },
      model: {
        title: undefined,
        domain: {
          min: -10,
          max: 10,
          padding: 0,
          step: 1,
          labelStep: 1
        },
        range: {
          min: -5,
          max: 5,
          padding: 0,
          step: 1,
          labelStep: 1
        },
        backgroundMarks: (props.model && props.model.backgroundMarks) || [],
        marks: []
      }
    };
  }

  changeMarks = marks => {
    const model = { ...this.state.model, marks };

    this.setState({ model });
    this.props.onAnswersChange(marks);
  };

  render() {
    const { settings, model, tools } = this.state;
    const { model: { backgroundMarks, displayedTools = tools, correctMarks, score } } = this.props;

    // TODO check which one should be used (with alternates)
    const correctAnswerMarks = correctMarks || null;

    return (
      <div>
        {score && `Score: ${score}`}
        <Graph
          size={settings.size}
          domain={model.domain}
          range={model.range}
          title={model.title}
          axesSettings={{ includeArrows: settings.includeArrows }}
          labels={settings.labels && model.labels}
          marks={model.marks}
          correctnessMarks={correctAnswerMarks}
          backgroundMarks={backgroundMarks}
          onChangeMarks={this.changeMarks}
          displayedTools={displayedTools}
          tools={tools}
          currentTool={displayedTools[0]}
          defaultTool={displayedTools[0].type}
        />

      </div>
    );
  }
}

const styles = () => ({});

export default withStyles(styles)(Main);