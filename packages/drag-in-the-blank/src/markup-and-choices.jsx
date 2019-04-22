import React from 'react';

import PropTypes from 'prop-types';
import { MaskMarkup } from '@pie-lib/mask-markup';

const Choices = () => <div>choices here...</div>;

export default class MarkupAndChoices extends React.Component {
  static propTypes = {
    foo: PropTypes.string
  };

  static defaultProps = {
    foo: 'foo'
  };

  render() {
    return (
      <div>
        <Choices disabled={this.props.disabled} choices={this.props.choices} />
        <MaskMarkup {...this.props} />
      </div>
    );
  }
}
