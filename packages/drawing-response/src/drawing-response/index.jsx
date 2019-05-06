import React from 'react';
import PropTypes from 'prop-types';

class DrawingResponseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false
    };
  }

  render() {
    return (
      <div>
        Drawing response player
      </div>
    );
  }
}

DrawingResponseComponent.propTypes = {
  model: PropTypes.object.isRequired,
  onSelectChoice: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

export default DrawingResponseComponent;
