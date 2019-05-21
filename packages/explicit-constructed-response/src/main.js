import React from 'react';
import PropTypes from 'prop-types';
import { ConstructedResponse } from '@pie-lib/mask-markup';

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
        <ConstructedResponse {...this.props} />
      </div>
    );
  }
}

export default Main;
