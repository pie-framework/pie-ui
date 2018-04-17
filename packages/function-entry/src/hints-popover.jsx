import { withStyles } from 'material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import classNames from 'classnames';
import Hints from './hints';

const styles = theme => ({
  hintsPopover: {
    marginTop: theme.spacing.unit * 2,
    pointerEvents: 'none',
  },
});

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
        className={classNames(classes.hintsPopover, className)}
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
        <Hints />
      </Popover>
    );
  }
}

export default withStyles(styles)(HintsPopover);
