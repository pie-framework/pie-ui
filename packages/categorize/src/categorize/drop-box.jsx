import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';

export class DropBox extends React.Component {
  static propTypes = { classes: PropTypes.object.isRequired };
  static defaultProps = {};
  render() {
    const { classes } = this.props;
    return <Card className={classes.dropBox} />;
  }
}

const styles = theme => ({
  dropBox: {
    minWidth: '100px',
    minHeight: '100px',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
});

export default withStyles(styles)(DropBox);
