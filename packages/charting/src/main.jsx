import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Collapsible } from '@pie-lib/render-ui';
import { Chart, chartTypes } from '@pie-lib/charting';


export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    model: PropTypes.object.isRequired,
    marks: PropTypes.arrayOf(
      PropTypes.shape({ type: PropTypes.string.isRequired })
    ),
    onAnswersChange: PropTypes.func
  };

  static defaultProps = {
    classes: {}
  };

  changeData = () => {

  };

  render() {
    const { model, classes } = this.props;

    return (
      <div>
        {
          model.teacherInstructions && (
            <Collapsible
              labels={{ hidden: 'Show Teacher Instructions', visible: 'Hide Teacher Instructions' }}
            >
              <div dangerouslySetInnerHTML={{ __html: model.teacherInstructions }}/>
            </Collapsible>
          )
        }
        <br />
        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: model.prompt }}
        />
        <br />

        <Chart
          chartType={model.chartType}
          size={model.size}
          domain={model.domain}
          range={model.range}
          charts={[
            chartTypes.Bar(),
            chartTypes.Histogram(),
            chartTypes.LineDot(),
            chartTypes.LineCross(),
            chartTypes.DotPlot(),
            chartTypes.LinePlot()
          ]}
          data={model.data}
          title={model.title}
          onDataChange={this.changeData}
          editCategoryEnabled={model.editCategoryEnabled}
          addCategoryEnabled={model.addCategoryEnabled}
          categoryDefaultLabel={model.categoryDefaultLabel}
        />

        <br />
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

const styles = () => ({
  prompt: {
    verticalAlign: 'middle'
  }
});

export default withStyles(styles)(Main);
