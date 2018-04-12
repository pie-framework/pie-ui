import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import { withStyles } from "material-ui/styles";
import Input from './input';

const log = debug('pie-ui:function-entry');

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
}

const Power = ({ classes, base, exponent }) => (
    <span>
      <i>{base}</i>
      <span className={classes.power}>{exponent}</span>
    </span>
)

Power.propTypes = {
  classes: PropTypes.object,
  base: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  exponent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const Radical = ({ classes, sqrt }) => (
    <span>
      &radic;
      <span className={classes['radical-symbol']}>
        <i>{sqrt}</i>&nbsp;
      </span>
    </span>
)

Radical.propTypes = {
  classes: PropTypes.object,
  sqrt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

class FunctionEntry extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object,
    model: PropTypes.object,
    onValueChanged: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      value: (props.session && props.session.value) || '',
      hintsAnchorEl: null,
      anchorReference: 'anchorEl',
      hintsOpen: false
    };
  }

  handleHintsPopoverOpen = event => {
    this.setState({ hintsAnchorEl: event.target });
  };

  handleHintsPopoverClose = () => {
    this.setState({ hintsAnchorEl: null });
  };

  onChange = event => {
    clearTimeout(this.state.timeoutId);

    this.setState({ warning: null, timeoutId: null });

    log('[onChange] value: ', event.target.value);

    if (this.state.value !== event.target.value) {
      let value = this.props.model.ignoreWhitespace
        ? event.target.value.trim()
        : event.target.value;

      this.setState({ value }, () => {
        this.props.onValueChanged(this.state.value);
      });
    }
  };

  render() {
    const { classes, model } = this.props;
    log('[render] model: ', model);
    const { value } = this.state;
    const { anchorReference, hintsAnchorEl } = this.state;
    const hintsOpen = model.showFormattingHelp && !!hintsAnchorEl;

    return (
        <div>
          <Input
            inputProps={{
              onFocus: this.handleHintsPopoverOpen,
              onBlur: this.handleHintsPopoverClose
            }}
            feedback={model.feedback}
            value={value}
            correctness={model.correctness}
            onChange={this.onChange}
            error={this.state.warning}
            disabled={model.disabled}
          />
          <Popover
              className={classes['hints-popover']}
              open={hintsOpen}
              anchorEl={hintsAnchorEl}
              anchorReference={anchorReference}
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
        </div>
    );
  }
}

export default withStyles(styles)(FunctionEntry);
