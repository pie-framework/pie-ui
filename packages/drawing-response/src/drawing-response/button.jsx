import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

const RawButton = ({ classes, className, label, onClick, disabled, title }) => (
  <Button
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={classNames(classes.addButton, className)}
    size="small"
    variant="contained"
    color="default"
  >
    {label}
  </Button>
);

RawButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string
};

RawButton.defaultProps = {
  className: '',
  disabled: false,
  label: 'Add',
  onClick: () => {},
  title: ''
};

const styles = () => ({
  addButton: {
    marginLeft: 8,
    minWidth: 32,
    height: 32
  }
});

const ButtonStyled = withStyles(styles)(RawButton);

export default ButtonStyled;
