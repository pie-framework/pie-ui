import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Choice, { ChoiceType } from './choice';
export { ChoiceType };
import GridContent from './grid-content';

const Blank = () => <div />;

export class Choices extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape(ChoiceType),
        PropTypes.shape({ empty: PropTypes.bool })
      ])
    ),
    config: PropTypes.shape({
      columns: PropTypes.number.isRequired
    }),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    config: {
      columns: 4
    }
  };

  render() {
    const { classes, choices, config, disabled } = this.props;

    return (
      <GridContent columns={config.columns} className={classes.choices}>
        {choices.map((c, index) => {
          return c.empty ? (
            <Blank key={index} />
          ) : (
            <Choice
              disabled={disabled}
              className={classes.choice}
              key={index}
              {...c}
            />
          );
        })}
      </GridContent>
    );
  }
}

const styles = theme => ({
  choices: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(Choices);
