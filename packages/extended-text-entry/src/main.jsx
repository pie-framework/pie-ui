import React from 'react';
import EditableHTML from '@pie-lib/editable-html';
import PropTypes from 'prop-types';

const style = {
  rootAlign : {
    margin : '20px'
  }
}

class Main extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    model: PropTypes.object
  }

  constructor(props) {
    super(props);
    
    this.handleEditableChange = this.handleEditableChange.bind(this);
  }

  handleEditableChange(change) {
    this.props.onChange(change);
  }

  render() {

    let {width, height, colorContrast, disabled} = this.props.model;
    
    return (
      <div style={style.rootAlign}>
        <EditableHTML
          onChange={this.handleEditableChange}
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

export default Main;