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
  };

  static defaultProps = { classes: {} };

  constructor(props) {
    super(props);
    const { model: { data = [] } } = props;

    this.state = { data };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { model: { data: nextData = [] } = {} } = nextProps;
    const { model: { data = [] } } = this.props;

    if (!isEqual(nextData, data)) {
      this.setState({ data: nextData })
    }
  }

  changeData = data => {
    this.setState({ data }, () => this.props.onAnswersChange(data));
  };

  render() {
    const { model, classes } = this.props;
    const { data } = this.state;
    const {
      teacherInstructions,
      prompt,
      chartType,
      size,
      domain,
      range,
      title,
      editCategoryEnabled,
      addCategoryEnabled,
      categoryDefaultLabel,
      rationale
    } = model;

    return (
      <div>
        {
          teacherInstructions && (
            <Collapsible
              labels={{ hidden: 'Show Teacher Instructions', visible: 'Hide Teacher Instructions' }}
            >
              <div dangerouslySetInnerHTML={{ __html: teacherInstructions }}/>
            </Collapsible>
          )
        }
        <br />
        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: prompt }}
        />
        <br />

        <Chart
          chartType={chartType}
          size={size}
          domain={domain}
          range={range}
          charts={[
            chartTypes.Bar(),
            chartTypes.Histogram(),
            chartTypes.LineDot(),
            chartTypes.LineCross(),
            chartTypes.DotPlot(),
            chartTypes.LinePlot()
          ]}
          data={data}
          title={title}
          onDataChange={this.changeData}
          editCategoryEnabled={editCategoryEnabled}
          addCategoryEnabled={addCategoryEnabled}
          categoryDefaultLabel={categoryDefaultLabel}
        />

        <br />
        {
          rationale && (
            <Collapsible labels={{ hidden: 'Show Rationale', visible: 'Hide Rationale' }}>
              <div dangerouslySetInnerHTML={{ __html: rationale }}/>
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
