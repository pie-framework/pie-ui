import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Card, { CardContent } from 'material-ui/Card';

export const ChoiceType = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string
};

export class Choice extends React.Component {
  static propTypes = {
    ...ChoiceType,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
  };
  static defaultProps = {};
  render() {
    const { classes, className, content } = this.props;
    return (
      <div className={classNames(classes.choice, className)}>
        <Card className={classes.card}>
          <CardContent dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  choice: {
    minHeight: '80px'
  },
  card: {
    height: '100%'
  }
});

export default withStyles(styles)(Choice);
