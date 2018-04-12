import React from 'react';
import Calculator from '@pie-framework/material-ui-calculator';
import Draggable from 'react-draggable';
import Typography from 'material-ui/Typography';
import Close from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

const styles = theme => {
  const { palette: { secondary, primary } } = theme;

  const border = `solid 1px var(--pie-ui, ${grey[900]})`;

  return {
    handle: {
      border,
      zIndex: '10',
      position: 'absolute'
    },
    closeIcon: {
      width: '24px',
      height: '24px',
      color: 'white'
    },
    title: {
      color: secondary.contrastText,
      flex: 1
    },
    titleBar: {
      cursor: 'move',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing.unit,
      backgroundColor: primary.light,
      borderBottom: border
    }
  };
};

class DraggableCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deltaPosition: {
        x: 0,
        y: 0
      }
    };
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  render() {
    const { mode, show, onClose, classes } = this.props;
    const { x, y } = this.state.deltaPosition;
    return show ? (
      <Draggable
        onDrag={this.handleDrag}
        defaultPosition={{ x, y }}
        handle=".handle"
      >
        <div className={classes.handle}>
          <div className={`handle ${classes.titleBar}`}>
            <Typography variant="subheading" className={classes.title}>
              Calculator
            </Typography>
            <IconButton
              className={classes.closeIcon}
              onClick={onClose}
              aria-label="Delete"
            >
              <Close />
            </IconButton>
          </div>
          <Calculator mode={mode} />
        </div>
      </Draggable>
    ) : null;
  }
}

DraggableCalculator.propTypes = {
  mode: PropTypes.any,
  show: PropTypes.any,
  onClose: PropTypes.any,
  classes: PropTypes.any
};

export default withStyles(styles)(DraggableCalculator);
