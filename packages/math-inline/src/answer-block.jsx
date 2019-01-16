import * as React from 'react';
import Static from '@pie-lib/math-toolbar/lib/mathquill/static';
import { withStyles } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import cx from 'classnames';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit,
    display: 'inline-flex',
    border: '2px solid grey',
    cursor: 'pointer'
  },
  response: {
    flex: 2,
    color: 'grey',
    background: 'lightgrey',
    fontSize: '0.8rem',
    padding: theme.spacing.unit / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '2px solid grey'
  },
  active: {
    border: '2px solid blue',
  },
  responseActive: {
    color: 'white',
    background: 'lightblue',
    borderRight: '2px solid blue'
  },
  math: {
    color: '#bdbdbd',
    padding: theme.spacing.unit / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
    '& > mq-math-mode': {
      '& > mq-hasCursor': {
        '& > .mq-cursor': {
          display: 'none'
        },
      }
    }
  }
});

class AnswerBlock extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    latex: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool
  };

  static defaultProps = {
    latex: '',
    active: false
  };

  onClick = () => {
    this.props.onClick(this.props.index);
  }

  render() {
    const { classes, latex, active, index } = this.props;

    return (
      <div className={cx(classes.container, { [classes.active]: active })} onClick={this.onClick}>
        <div className={cx(classes.response, { [classes.responseActive]: active })}>R{index + 1}</div>
        <div className={classes.math}>
          <Static latex={latex} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AnswerBlock);
