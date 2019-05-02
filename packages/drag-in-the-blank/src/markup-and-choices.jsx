import React from 'react';
import PropTypes from 'prop-types';

import { MaskMarkup } from '@pie-lib/mask-markup';
import { withDragContext } from '@pie-lib/drag';
import DragChoice from './drag-choice';

class Choices extends React.Component {
  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      right: PropTypes.string
    }))
  };

  render() {
    const { choices } = this.props;

    return (
      <div>
        {choices.map((c, index) => (
          <DragChoice key={`${index}-${c.label}`} value={c.label} />
        ))}
      </div>
    );
  }
}

export class MarkupAndChoices extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    choices: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      right: PropTypes.string
    }))
  };

  render() {
    const { choices, disabled } = this.props;

    return (
      <div>
        <Choices disabled={disabled} choices={choices} />
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

export default withDragContext(MarkupAndChoices);
