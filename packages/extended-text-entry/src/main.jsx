import React from "react";
import EditableHTML from "@pie-lib/editable-html";

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.handleEditableChange = this.handleEditableChange.bind(this);
  }

  handleEditableChange(change) {
    this.props.onChange(change);
  }
  
  render() {
    return (
      <div>
        <EditableHTML 
          onChange={this.handleEditableChange} 
          markup="" 
          activePlugins={['bold', 'bulleted-list', 'numbered-list']}/>
      </div>
    )
  }
};

export default Main;