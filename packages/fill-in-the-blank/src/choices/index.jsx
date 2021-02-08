import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Choice from './choice';
import { color } from '@pie-lib/render-ui';

export class Choices extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    choices: PropTypes.array.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {};
  render() {
    const { classes, className, choices = [], label, disabled } = this.props;
    return (
      <div className={classNames(classes.choices, className)}>
        {label && <div className={classes.label}>{label}</div>}

        <div className={classNames(classes.choicesContainer)}>
          {choices.map((c, index) => (
            <div key={index} className={classes.choiceHolder}>
              <Choice {...c} disabled={disabled} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  choices: {
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    border: `solid 1px ${color.primaryLight()}`,
  },
  label: {
    textAlign: 'center',
  },
  choicesContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  choiceHolder: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(Choices);
