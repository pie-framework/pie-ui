import React from 'react';
import Draggable from 'react-draggable';

class Container extends React.Component {

  constructor(props){
    super(props);
  }

  render (){
    return <Draggable onDrag={this.props.onDrag}>{this.props.children}</Draggable>
  }

}

export default Container;