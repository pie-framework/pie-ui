import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
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
      model: {
        marks: []
      }
    };
  }

  changeMarks = marks => {
    const model = { ...this.state.model, marks: cloneDeep(marks) };

    this.setState({ model });

    this.props.onAnswersChange(marks);
  };

  render() {
    const { model, tools } = this.state;
    const { model: { backgroundMarks, displayedTools = tools, correctMarks, title, labels, graph, domain, range } } = this.props;
    const correctAnswerMarks = correctMarks || null;

    return (
      <div>
        <Graph
          size={{
            width: graph && graph.domain,
            height: graph && graph.range
          }}
          domain={domain}
          range={range}
          title={title}
          labels={labels}
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