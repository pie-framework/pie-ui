import { withStyles } from 'material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';

const styles = () => ({
  radicalSymbol: {
    textDecoration: 'overline',
  },
});

class Radical extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    sqrt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    const { classes, sqrt } = this.props;

    return (
        <span>
          &radic;
          <span className={classes.radicalSymbol}>
          <i>{sqrt}</i>&nbsp;
      </span>
    </span>
    );
  }
}

export default withStyles(styles)(Radical);
