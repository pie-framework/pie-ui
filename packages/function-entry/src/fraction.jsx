import { withStyles } from 'material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = (theme) => ({
  fraction: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    letterSpacing: '0.001em',
    textAlign: 'center',
    marginRight: theme.spacing.unit,
  },
  fractionSpan: {
    display: 'block',
    padding: '0.1em',
  },
  fractionBottom: {
    borderTop: 'thin solid black',
  },
  fractionSymbol: {
    display: 'none',
  },
});

class Fraction extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    const { classes, top, bottom } = this.props;

    return (
      <span className={classes.fraction}>
        <span><i>{top}</i></span>
        <span className={classNames(classes.fractionSpan, classes.fractionSymbol)}>/</span>
        <span className={classNames(classes.fractionSpan, classes.fractionBottom)}><i>{bottom}</i></span>
      </span>
    );
  }
}

export default withStyles(styles)(Fraction);
