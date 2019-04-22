import React from 'react';

import PropTypes from 'prop-types';
import { MaskMarkup } from '@pie-lib/mask-markup';
import { DragSource, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragChoice from './drag-choice';
import { withDragContext } from '@pie-lib/drag';
const Choices = props => (
  <div>
    {props.choices.map((c, index) => (
      <DragChoice key={`${index}-${c.label}`} value={c.label} />
    ))}
  </div>
);

export class MarkupAndChoices extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Choices disabled={this.props.disabled} choices={this.props.choices} />
        <MaskMarkup {...this.props} />
      </div>
    );
  }
}
// console.log('withDragContext:', withDragContext);
// const out = withDragContext(MarkupAndChoices);
// console.log('out:', out);
// export default MarkupAndChoices;
// export default DragDropContext(HTML5Backend)(MarkupAndChoices);
console.log('with drag context...', withDragContext);
export default withDragContext(MarkupAndChoices);
