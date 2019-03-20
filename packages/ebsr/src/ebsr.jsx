import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoice from '@pie-ui/multiple-choice';

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

    if(!customElements.get('multiple-choice')){
      customElements.define('multiple-choice', MultipleChoice);
    }
  }

  componentDidMount() {
    this.setupParts();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.model) !== JSON.stringify(this.props.model)) {
      this.setupParts();
    }
  }

  setupParts() {
    const { partA, partB } = this;

    if (partA && partB) {
      this.setupOnePart(partA, 'partA');
      this.setupOnePart(partB, 'partB');
    }
  }

  setupOnePart(part, key) {
    const { model, model: { mode } } = this.props;
    const { correctResponse, disabled, keyMode, showCorrect, choiceMode, choices, prompt } = model[key];

    part.model = {
      choiceMode,
      choices,
      correctResponse,
      disabled,
      keyMode,
      mode,
      prompt,
      showCorrect
    };

    part.session = this.props.session;
  }

  render() {
    const { model } = this.props;
    log('[render] model: ', model);

    return (
      <div>
        <multiple-choice ref={ref => { this.partA = ref; }} />
        <multiple-choice ref={ref => { this.partB = ref; }} />
      </div>
    );
  }
}

export default Ebsr;
