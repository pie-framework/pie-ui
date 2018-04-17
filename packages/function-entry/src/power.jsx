import { withStyles } from 'material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';

const styles = () => ({
  power: {
    fontSize: '12px',
    verticalAlign: '+50%',
    marginLeft: '2px',
  },
});

class Power extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    exponent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    base: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    const { classes, exponent, base } = this.props;

    return (
      <span>
        <i>{base}</i>
        <span className={classes.power}>{exponent}</span>
      </span>
    );
  }
}

export default withStyles(styles)(Power);
