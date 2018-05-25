import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Blank from './blank';

const Entry = ({ content, onDropChoice, onRemoveChoice, disabled }) =>
  typeof content === 'string' ? (
    <span>{content}</span>
  ) : (
    <Blank
      {...content}
      onDropChoice={onDropChoice}
      onRemoveChoice={onRemoveChoice}
      disabled={disabled}
    />
  );
Entry.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDropChoice: PropTypes.func.isRequired,
  onRemoveChoice: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export class Content extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    content: PropTypes.array,
    onDropChoice: PropTypes.func,
    onRemoveChoice: PropTypes.func,
    disabled: PropTypes.bool
  };
  static defaultProps = {};
  render() {
    const {
      classes,
      className,
      content,
      onDropChoice,
      onRemoveChoice,
      disabled
    } = this.props;

    return (
      <div
        className={classNames(
          classes.content,
          disabled && classes.disabled,
          className
        )}
      >
        <div className={classes.holder}>
          {content.map((c, index) => (
            <Entry
              key={index}
              content={c}
              disabled={disabled}
              onDropChoice={choice => onDropChoice(c.id, choice)}
              onRemoveChoice={choice => onRemoveChoice(c.id, choice)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const styles = () => ({
  content: {},
  holder: {},
  disabled: {}
});
export default withStyles(styles)(Content);
