import { withStyles } from 'material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Fraction from './fraction';
import Power from './power';
import Radical from './radical';

const styles = (theme) => ({
  content: {
    paddingRight: theme.spacing.unit * 2,
  },
});

class Hints extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const { classes, className } = this.props;

    return (
      <ul className={className}>
        <Typography type="body1" className={classes.content}>
          <li>For 2 &#8729; 2 enter 2*2</li>
          <li>For 3y enter 3y or 3*y</li>
          <li>For <Fraction top={1} bottom="x" /> enter 1/x</li>
          <li>For <Fraction top={1} bottom="xy" /> enter 1/(x*y)</li>
          <li>For <Fraction top={2} bottom="x+3" /> enter 2/(x+3)</li>
          <li>For <Power base="x" exponent="y" /> enter (x ^ y)</li>
          <li>For <Power base="x" exponent="2" /> enter (x ^ 2)</li>
          <li>For 1 <Fraction top="x" bottom="y" /> enter 1 x/y</li>
          <li>For <Radical sqrt="x" /> enter sqrt(x)</li>
        </Typography>
      </ul>
    );
  }
}

export default withStyles(styles)(Hints);
