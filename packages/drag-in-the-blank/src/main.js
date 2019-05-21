import React from 'react';
import PropTypes from 'prop-types';
import { DragInTheBlank } from '@pie-lib/mask-markup';
import { withDragContext } from '@pie-lib/drag';

const DraggableDragInTheBlank = withDragContext(DragInTheBlank);

export class Main extends React.Component {
  static propTypes = {
    prompt: PropTypes.string,
    disabled: PropTypes.bool,
    markup: PropTypes.string,
    value: PropTypes.object,
    feedback: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: {}
  };

  render() {
    const { prompt } = this.props;

    return (
      <div>
        {prompt && <div dangerouslySetInnerHTML={{ __html: prompt }}/>}
        <DraggableDragInTheBlank {...this.props} />
      </div>
    );
  }
}

export default Main;
