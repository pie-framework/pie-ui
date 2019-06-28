import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  GraphContainer as Graph,
  tools as graphingTools
} from '@pie-lib/graphing';
import _ from 'lodash';
export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    model: PropTypes.object.isRequired,
    marks: PropTypes.arrayOf(
      PropTypes.shape({ type: PropTypes.string.isRequired })
    ),
    onAnswersChange: PropTypes.func
  };

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     model: {
  //       marks: []
  //     }
  //   };
  // }

  // changeMarks = marks => {
  //   const model = { ...this.state.model, marks: cloneDeep(marks) };

  //   this.setState({ model });

  //   this.props.onAnswersChange(marks);
  // };

  render() {
    // const { model } = this.state;
    const { model, marks } = this.props;
    // backgroundMarks,
    // tools,
    // title,
    // labels,
    // graph,
    // domain,
    // range,
    // marks

    const tools = _(marks)
      .map(m => m.type)
      .concat(model.toolbarTools)
      .uniq()
      .map(t => {
        if (typeof graphingTools[t] === 'function') {
          const out = graphingTools[t]();
          out.toolbar = true;
          return out;
        }
      })
      .compact()
      .value();

    console.log('tools:', tools);

    const defaultAndCurrent = tools && tools.length > 0 && tools[0].type;
    return (
      <Graph
        size={model.size}
        domain={model.domain}
        range={model.range}
        title={model.title}
        labels={model.labels}
        marks={marks}
        backgroundMarks={model.backgroundMarks}
        onChangeMarks={this.changeMarks}
        tools={tools}
        currentTool={defaultAndCurrent}
        defaultTool={defaultAndCurrent}
      />
    );
  }
}

const styles = () => ({});

export default withStyles(styles)(Main);
