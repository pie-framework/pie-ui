import React from "react";
import TextArea from "./textarea";

class Main extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <TextArea
          rows="8"
          cols="70"
          value="i am the value"
          placeholder="Hey I am placeholder"
        />

      </React.Fragment>
    )
  }
};

export default Main;