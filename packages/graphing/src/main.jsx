import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from '@material-ui/core/styles';
import { GraphContainer as Graph } from '@pie-lib/graphing';

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

    this.state = {
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
    const { model } = this.state;
    const { model: { backgroundMarks, tools, title, labels, graph, domain, range, marks } } = this.props;

    return (
      <div>
        <Graph
          size={{
            width: graph && graph.width,
            height: graph && graph.height
          }}
          domain={domain}
          range={range}
          title={title}
          labels={labels}
          marks={marks || model.marks}
          backgroundMarks={backgroundMarks}
          onChangeMarks={this.changeMarks}
          tools={tools}
          currentTool={tools && tools[0].Component}
          defaultTool={tools && tools[0].Component.type}
        />

      </div>
    );
  }
}

const styles = () => ({});

export default withStyles(styles)(Main);