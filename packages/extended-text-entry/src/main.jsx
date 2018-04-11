import React from 'react';
import EditableHTML from '@pie-lib/editable-html';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const style = () => ({
  main: {
    margin: '20px'
  }
});

class Main extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    model: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { model, onChange, classes } = this.props;
    const { width, height, disabled } = model;

    return (
      <div className={classes.main}>
        <EditableHTML
          onChange={onChange}
          markup=""
          width={width.toString()}
          height={height.toString()}
          disabled={disabled}
          highlightShape={true}
        />
      </div>
    );
  }
}

export default withStyles(style)(Main);
