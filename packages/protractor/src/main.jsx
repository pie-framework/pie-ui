import React from 'react';
import Protractor from './protractor';
import './main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="svg-container">
        <Protractor />
      </div>
    );
  }
}

export default Main;