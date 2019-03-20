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

    this.state = {
      session: {},
    }
  }

  componentDidMount() {
    this.updateModels();
    this.captureSessionChanges();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.model) !== JSON.stringify(this.props.model)) {
      this.updateModels();
    }
  }

  updateModels() {
    const {partA, partB} = this;

    if (partA && partB) {
      this.updatePartModel(partA, 'partA');
      this.updatePartModel(partB, 'partB');
    }
  }

  updatePartModel(part, key) {
    const { model, model: { mode }, session: { value } } = this.props;
    const { correctResponse, disabled, keyMode, showCorrect, choiceMode, choices, prompt } = model[key];

    part.model = {
      id: key,
      choiceMode,
      choices,
      correctResponse,
      disabled,
      keyMode,
      mode,
      prompt,
      showCorrect
    };

    part.session = { id: key };

    if (value) {
      part.session = value[key];
    }
  }

  captureSessionChanges() {
    const {partA, partB} = this;

    if (partA && partB) {
      this.capturePartSessionChanged(partA, 'partA');
      this.capturePartSessionChanged(partB, 'partB');
    }
  }

  capturePartSessionChanged(part, key) {
    const self = this;

    part.addEventListener('session-changed', (event)  => {
      event.stopImmediatePropagation();
      self.updateValue(event.srcElement._session, key);
    });
  }

  updateValue(partSession, key) {
    const { session } = this.state;
    const { onValueChanged } = this.props;

    const sessionRepacked = {
      ...session,
      [key]: partSession,
    };

    this.setState({ session: sessionRepacked });

    onValueChanged(sessionRepacked);
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
