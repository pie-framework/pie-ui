import React from 'react';
import EditableHTML from '@pie-lib/editable-html';
import PropTypes from 'prop-types';

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
    let {width, height} = this.props.model;

    return (
      <EditableHTML
        onChange={this.handleEditableChange}
        markup=""
        activePlugins={['bold', 'bulleted-list', 'numbered-list']}
        width={width.toString()}
        height={height.toString()}
        />
    );
  }
}

export default Main;