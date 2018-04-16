import { withStyles } from 'material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  fraction: {
    display: 'inline-block',
    position: 'relative',
    'vertical-align': 'middle',
    'letter-spacing': '0.001em',
    'text-align': 'center',
    'margin-right': theme.spacing.unit,
  },
  'fraction-span': {
    display: 'block',
    padding: '0.1em',
  },
  'fraction-bottom': {
    'border-top': 'thin solid black',
  },
  'fraction-symbol': {
    display: 'none',
  },
  'radical-symbol': {
    'text-decoration': 'overline',
  },
  power: {
    'font-size': '12px',
    'vertical-align': '+50%',
    'margin-left': '2px',
  },
  'hints-popover': {
    marginTop: theme.spacing.unit * 2,
    pointerEvents: 'none',
  },
  'hints-checkbox': {
    display: 'inline-block',
  },
  'hint-popover-content': {
    'padding-right': theme.spacing.unit * 2,
  },
});

const Fraction = ({ classes, top, bottom }) => (
  <span className={classes.fraction}>
      <span><i>{top}</i></span>
      <span className={`${classes['fraction-span']} ${classes['fraction-symbol']}`}>/</span>
      <span className={`${classes['fraction-span']} ${classes['fraction-bottom']}`}><i>{bottom}</i></span>
    </span>
)

Fraction.propTypes = {
  classes: PropTypes.object,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const Power = ({ classes, base, exponent }) => (
  <span>
      <i>{base}</i>
      <span className={classes.power}>{exponent}</span>
    </span>
);

Power.propTypes = {
  classes: PropTypes.object,
  base: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  exponent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const Radical = ({ classes, sqrt }) => (
  <span>
      &radic;
    <span className={classes['radical-symbol']}>
        <i>{sqrt}</i>&nbsp;
      </span>
    </span>
);

Radical.propTypes = {
  classes: PropTypes.object,
  sqrt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

class HintsPopover extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    hintsOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    hintsAnchorEl: PropTypes.any,
    anchorReference: PropTypes.any,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className, classes, hintsOpen, hintsAnchorEl, anchorReference } = this.props;

    return (
      <Popover
        className={`${classes['hints-popover']} ${className}`}
        open={hintsOpen}
        anchorEl={hintsAnchorEl}
        anchorReference={anchorReference}
        onClose={this.handleHintsPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableAutoFocus
        disableRestoreFocus
        disableEnforceFocus
      >
        <div className={classes['hint-popover']}>
          <ul>
            <Typography type="body1" className={classes['hint-popover-content']}>
              <li>For 2 &#8729; 2 enter 2*2</li>
              <li>For 3y enter 3y or 3*y</li>
              <li>For <Fraction top={1} bottom="x" classes={classes} /> enter 1/x</li>
              <li>For <Fraction top={1} bottom="xy" classes={classes} /> enter 1/(x*y)</li>
              <li>For <Fraction top={2} bottom="x+3" classes={classes} /> enter 2/(x+3)</li>
              <li>For <Power classes={classes} base="x" exponent="y" /> enter (x ^ y)</li>
              <li>For <Power classes={classes} base="x" exponent="2" /> enter (x ^ 2)</li>
              <li>For 1 <Fraction top="x" bottom="y" classes={classes} /> enter 1 x/y</li>
              <li>For <Radical classes={classes} sqrt="x" /> enter sqrt(x)</li>
            </Typography>
          </ul>
        </div>
      </Popover>
    );
  }
}

export default withStyles(styles)(HintsPopover);
