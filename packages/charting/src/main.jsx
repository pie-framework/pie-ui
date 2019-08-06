import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Collapsible } from '@pie-lib/render-ui';
import { Chart, chartTypes } from '@pie-lib/charting';
import isEqual from 'lodash/isEqual';


export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    model: PropTypes.object.isRequired,
    onAnswersChange: PropTypes.func,
    data: PropTypes.array
  };

  static defaultProps = { classes: {} };

  constructor(props) {
    super(props);

    this.state = {
      data: props.model.data
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.model.data, this.props.model.data)) {
      this.setState({ data: nextProps.model.data })
    }
  }

  changeData = data => {
    this.setState({ data }, () => this.props.onAnswersChange(data));
  };

  render() {
    const { model, classes } = this.props;
    const { data } = this.state;

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
          data={data}
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
