import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import uniq from 'lodash/uniq';
import {
  GraphContainer as Graph,
  tools as graphingTools
} from '@pie-lib/graphing';
import { Collapsible } from '@pie-lib/render-ui';
export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    model: PropTypes.object.isRequired,
    marks: PropTypes.arrayOf(
      PropTypes.shape({ type: PropTypes.string.isRequired })
    ),
    onAnswersChange: PropTypes.func
  };

  render() {
    const { model, marks } = this.props;
    const tools = [];
    const marksTypes = marks.reduce((acc, m) => ([ ...acc, m.type]), []);
    const backgroundMarksTypes = model.backgroundMarks && model.backgroundMarks.reduce((acc, m) => ([ ...acc, m.type]), []);
    const markTypes = uniq([ ...marksTypes, ...backgroundMarksTypes, ...model.toolbarTools ]);

    markTypes.forEach((graphingToolKey) => {
      if (typeof graphingTools[graphingToolKey] === 'function') {
        const tool = graphingTools[graphingToolKey]();
        tool.toolbar = !!(model.toolbarTools && model.toolbarTools.find(tT => tT === tool.type));
        tools.push(tool)
      }
    });

    const defaultAndCurrent = tools && tools.find(t => t.toolbar);
    return (
      <div>
        <Graph
          size={model.size}
          domain={model.domain}
          range={model.range}
          title={model.title}
          labels={model.labels}
          marks={marks}
          backgroundMarks={model.backgroundMarks}
          onChangeMarks={this.props.onAnswersChange}
          tools={tools}
          currentTool={defaultAndCurrent}
          defaultTool={defaultAndCurrent}
        />
        {
          model.rationale && (
            <Collapsible labels={{ hidden: 'Show Rationale', visible: 'Hide Rationale' }}>
              <div dangerouslySetInnerHTML={{ __html: model.rationale }}/>
            </Collapsible>
          )
        }
      </div>
    );
  }
}

const styles = () => ({});

export default withStyles(styles)(Main);
