import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Choice, { ChoiceType } from './choice';
export { ChoiceType };
import GridContent from './grid-content';

export class Choices extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape(ChoiceType)),
    config: PropTypes.shape({
      columns: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    config: {
      columns: 4
    }
  };

  render() {
    const { classes, choices, config } = this.props;

    return (
      <GridContent columns={config.columns} className={classes.choices}>
        {choices.map((c, index) => (
          <Choice className={classes.choice} key={index} {...c} />
        ))}
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
