import React from 'react';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("PROPS", this.props);
    return (
      <div>
      A
      </div>
    );
  }
}