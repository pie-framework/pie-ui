import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Category, { CategoryType } from './category';
export { CategoryType };
import GridContent from './grid-content';

export class Categories extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryType)),
    config: PropTypes.shape({
      columns: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    config: {
      columns: 4
    }
  };

  render() {
    const { classes, categories, config } = this.props;

    return (
      <GridContent columns={config.columns} className={classes.categories}>
        {categories.map((c, index) => (
          <Category className={classes.category} key={index} {...c} />
        ))}
      </GridContent>
    );
  }
}

const styles = () => ({});
export default withStyles(styles)(Categories);
