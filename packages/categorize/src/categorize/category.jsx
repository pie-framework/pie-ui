import React from 'react';
import PropTypes from 'prop-types';
import DropBox from './drop-box';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

export const CategoryType = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
};

export class Category extends React.Component {
  static propTypes = { ...CategoryType, classes: PropTypes.object.isRequired };

  static defaultProps = {
    foo: 'foo'
  };

  render() {
    const { label, classes, className } = this.props;
    return (
      <div className={classNames(classes.category, className)}>
        <Typography className={classes.label}>
          <span dangerouslySetInnerHTML={{ __html: label }} />
        </Typography>
        <DropBox />
      </div>
    );
  }
}
const styles = theme => ({
  label: {
    paddingBottom: theme.spacing.unit
  },
  category: {
    textAlign: 'center'
  }
});
export default withStyles(styles)(Category);
