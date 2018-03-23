import React from 'react';
import EditableHTML from '@pie-lib/editable-html';
import PropTypes from 'prop-types';

class Main extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.handleEditableChange = this.handleEditableChange.bind(this);
  }

  handleEditableChange(change) {
    this.props.onChange(change);
  }

  render() {
    return (
      <EditableHTML
        onChange={this.handleEditableChange}
        markup=""
        activePlugins={['bold', 'bulleted-list', 'numbered-list']} />
    );
  }
}

export default Main;