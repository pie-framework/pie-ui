import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.shape({}),
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired
  };

  render() {
    return (
      <div />
    );
  }
}

const styles = theme => ({});

export default withStyles(styles)(Main);