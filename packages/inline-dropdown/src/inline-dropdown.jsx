import React from 'react';
import PropTypes from 'prop-types';
import { InlineDropdown as DropDown } from '@pie-lib/mask-markup';

export class InlineDropdown extends React.Component {
  static propTypes = {
    prompt: PropTypes.string,
    disabled: PropTypes.bool,
    markup: PropTypes.string,
    choices: PropTypes.object,
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
        <DropDown {...this.props} />
      </div>
    );
  }
}

export default InlineDropdown;
