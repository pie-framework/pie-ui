import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

const log = debug('pie-ui:ebsr');

class Ebsr extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object,
    model: PropTypes.object,
    onValueChanged: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { model } = this.props;
    log('[render] model: ', model);

    return (
      <div>
        EBSR
      </div>
    );
  }
}

export default Ebsr;
