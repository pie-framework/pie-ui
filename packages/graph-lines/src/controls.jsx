import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import classnames from 'classnames';

export class Controls extends React.Component {
  static propTypes = {
    iconOnly: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  render() {
    const { classes, disabled, onDeleteClick, iconOnly } = this.props;

    return (
      <Button
        className={iconOnly ? classes.smallButton : classes.button }
        color="primary"
        disabled={disabled}
        onClick={onDeleteClick}
      >
        {!iconOnly && 'Delete'}
        <Delete className={classnames(classes.icon, { [classes.smallIcon]: iconOnly })} />
      </Button>
    );
  }
}

const styles = theme => ({
  smallButton: {
    margin: 0,
    padding: 0,
    minWidth: 0,
    width: '30px'
  },
  button: {
    margin: theme.spacing.unit
  },
  icon: {
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(Controls);
