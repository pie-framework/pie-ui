import React from 'react';
import PropTypes from 'prop-types';
import Controls from './controls';
import Input from '@material-ui/core/Input';
import { InputContainer } from '@pie-lib/config-ui';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { lineUtils as utils } from '../../../../pie-lib/packages/charting/src';

export class GraphLineControls extends React.Component {
  static propTypes = {
    onDeleteLine: PropTypes.func.isRequired,
    updateLines: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    lines: PropTypes.array.isRequired,
    model: PropTypes.object.isRequired
  };

  onLineLabelChange = line => event => {
    const newLine = { ...line, label: event.target.value };

    const newLines = this.props.lines.map(propLine => utils.linesEqual(propLine, line) ? newLine : propLine);
    this.props.updateLines(newLines);
  }

  onChange = line => event => {
    const [point, coordinate] = event.target.name.split('.');
    const newLine = { ...line };
    const newValue = parseInt(event.target.value, 10);

    if (!isNaN(newValue)) {
      newLine[point][coordinate] = newValue;

      const newLines = this.props.lines.map(propLine => utils.linesEqual(propLine, line) ? newLine : propLine);
      this.props.updateLines(newLines);
    }
  }

  deleteLine = line => () => {
    this.props.onDeleteLine(line);
  }

  render() {
    const { classes, lines, model } = this.props;
    const disabled = model.exhibitOnly || model.disabled;

    return (
      <div className={classes.controlsContainer}>
        {lines.length === 0 &&
          <Typography component="div" className={classes.empty}>
            There are currently no lines on the chart. Add one by clicking on the chart.
          </Typography>
        }
        {lines.map((line, idx) => {
          const lineOnChange = this.onChange(line);
          const onLineLabelChange = this.onLineLabelChange(line);

          return (
              <div key={idx} className={classes.inputsContainer}>
                <div style={{ display: 'flex' }}>
                  <div className={classes.inputItem}>
                    <InputContainer label="Label">
                      <Input
                          disabled={disabled}
                          type="text"
                          name="label"
                          className={classes.input}
                          onChange={onLineLabelChange}
                          value={line.label || ''}
                          placeholder="Enter Value"
                      />
                    </InputContainer>
                  </div>
                  <div className={classes.inputItem}>
                    <Typography type="body1" className={classes.labelContainer}>
                      <span className={classes.label}>Point A: </span>
                    </Typography>
                    <InputContainer label="X">
                      <Input
                          disabled={disabled}
                          inputProps={{
                            min: model.domain.min,
                            max: model.domain.max,
                          }}
                          type="number"
                          name="from.x"
                          className={classes.input}
                          onChange={lineOnChange}
                          value={line.from.x}
                          placeholder="Enter Value"
                      />
                    </InputContainer>
                  </div>
                  <div className={classes.inputItem}>
                    <InputContainer label="Y">
                      <Input
                          disabled={disabled}
                          inputProps={{
                            min: model.range.min,
                            max: model.range.max,
                          }}
                          name="from.y"
                          type="number"
                          className={classes.input}
                          onChange={lineOnChange}
                          value={line.from.y}
                          placeholder="Enter Value"
                      />
                    </InputContainer>
                  </div>
                </div>
                <div style={{ marginLeft: '10px', display: 'flex' }}>
                  <div className={classes.inputItem}>
                    <Typography type="body1" className={classes.labelContainer}>
                      <span className={classes.label}>Point B: </span>
                    </Typography>
                    <InputContainer label="X">
                      <Input
                          disabled={disabled}
                          inputProps={{
                            min: model.domain.min,
                            max: model.domain.max,
                          }}
                          name="to.x"
                          type="number"
                          className={classes.input}
                          onChange={lineOnChange}
                          value={line.to.x}
                          placeholder="Enter Value"
                      />
                    </InputContainer>
                  </div>
                  <div className={classes.inputItem}>
                    <InputContainer label="Y">
                      <Input
                          disabled={disabled}
                          inputProps={{
                            min: model.range.min,
                            max: model.range.max,
                          }}
                          name="to.y"
                          type="number"
                          className={classes.input}
                          onChange={lineOnChange}
                          value={line.to.y}
                          placeholder="Enter Value"
                      />
                    </InputContainer>
                    <Controls
                        iconOnly
                        disabled={disabled}
                        onDeleteClick={this.deleteLine(line)}
                    />
                  </div>
                </div>
              </div>
          )
        })}
      </div>
    );
  }
}

const styles = theme => ({
  empty: {
    margin: theme.spacing.unit * 2
  },
  controlsContainer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  input: {
    display: 'flex',
    maxWidth: '80px'
  },
  labelContainer: {
    display: 'flex',
    flex: 1,
    minWidth: '60px'
  },
  label: {
    marginRight: theme.spacing.unit
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  inputItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export default withStyles(styles)(GraphLineControls);
