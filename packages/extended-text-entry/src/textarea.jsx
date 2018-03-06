import React from "react";
import { withStyles } from "material-ui/styles";
import EditableHTML from "@pie-lib/editable-html";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: "14px",
    resize: "none",
    padding: "5px",
    overflow: "hidden",
    boxSizing: "border-box",
    borderRadius: "5px 5px",
    border: "1.2px solid grey"
  }
});

class TextArea extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showEditable : false
    }
    this.resizeTextArea = this.resizeTextArea.bind(this);
    this.handleEditableChange = this.handleEditableChange.bind(this);
    this.showEditable = this.showEditable.bind(this);
  } 

  handleEditableChange(change) {
    console.log("change", change);
  }

  showEditable() {
    this.setState({showEditable : true});
  }

  resizeTextArea(event) {
    if(this.node.scrollHeight > this.node.clientHeight) {
      this.node.style.height = this.node.scrollHeight + "px"
    }
  }

  render() {
    const { classes, rows, cols, placeholder, value} = this.props;

    return (
      <div>
        <textarea
          ref={(n) => { this.node = n;}}
          className={classes.textField}
          rows={rows}
          cols={cols}
          value={value}
          onChange={this.resizeTextArea}
          placeholder={placeholder}
          onFocus={this.showEditable} />
        {this.state.showEditable && <EditableHTML onChange={this.handleEditableChange} markup="" />}
      </div>
    )
  }
};

export default withStyles(styles)(TextArea);