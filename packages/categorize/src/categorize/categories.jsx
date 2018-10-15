import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Category, { CategoryType } from './category';
export { CategoryType };
import GridContent from './grid-content';

export class Categories extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryType)),
    config: PropTypes.shape({
      columns: PropTypes.number.isRequired
    }),
    disabled: PropTypes.bool,
    onDropChoice: PropTypes.func.isRequired,
    onRemoveChoice: PropTypes.func.isRequired,
    grid: PropTypes.object
  };

  static defaultProps = {
    config: {
      columns: 4
    }
  };

  render() {
    const {
      classes,
      categories,
      config,
      disabled,
      onDropChoice,
      onRemoveChoice,
      grid
    } = this.props;

    return (
      <GridContent columns={config.columns} className={classes.categories}>
        {categories.map((c, index) => (
          <Category
            grid={grid}
            onDropChoice={h => onDropChoice(c.id, h)}
            onRemoveChoice={onRemoveChoice}
            disabled={disabled}
            className={classes.category}
            key={index}
            {...c}
          />
        ))}
      </GridContent>
    );
  }
}

const styles = () => ({
  categories: {
    flex: 1
  }
});
export default withStyles(styles)(Categories);
