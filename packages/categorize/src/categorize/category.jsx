import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Choice from './choice';
import PlaceHolder from './droppable-placeholder';
import orange from '@material-ui/core/colors/orange';

export const CategoryType = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  categoryId: PropTypes.string
};

export class Category extends React.Component {
  static propTypes = {
    ...CategoryType,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    onDropChoice: PropTypes.func,
    onRemoveChoice: PropTypes.func
  };

  static defaultProps = {};

  render() {
    const {
      label,
      classes,
      className,
      choices,
      disabled,
      onDropChoice,
      onRemoveChoice,
      grid,
      id,
      correct
    } = this.props;

    const names = classNames(classes.category, className);

    const placeholderNames = classNames(
      classes.placeholder,
      correct === false && classes.incorrect
    );

    return (
      <div className={names}>
        <Typography className={classes.label}>
          <span dangerouslySetInnerHTML={{ __html: label }} />
        </Typography>
        <PlaceHolder
          grid={grid}
          onDropChoice={onDropChoice}
          disabled={disabled}
          className={placeholderNames}
        >
          {choices.map((c, index) => (
            <Choice
              onRemoveChoice={onRemoveChoice}
              disabled={disabled}
              key={index}
              choiceIndex={index}
              categoryId={id}
              {...c}
            />
          ))}
        </PlaceHolder>
      </div>
    );
  }
}
const styles = theme => ({
  incorrect: {
    border: `solid 1px ${orange[500]}`
  },
  label: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit
  },
  placeholder: {
    minHeight: '100px',
    flex: '1',
    display: 'grid'
  },
  category: {
    display: 'flex',
    flexDirection: 'column'
  }
});
export default withStyles(styles)(Category);
