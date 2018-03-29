import { ModelSetEvent, SessionChangedEvent } from '@pie-framework/pie-player-events';
import ReactFunctionEntry from './function-entry.jsx';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';

const log = debug('pie-elements:function-entry');

export default class FunctionEntry extends HTMLElement {

  constructor() {
    super();
  }

  set model(m) {
    this._model = m;
    this.dispatchEvent(new ModelSetEvent(
        this.tagName.toLowerCase(),
        false,
        !!this._model
    ));

    this.render();
  }

  set session(s) {
    this._session = s;
    this.render();
  }

  onValueChanged(value) {
    this._session.value = value;

    log('[onSessionChanged] session: ', this._session);

    this.dispatchEvent(new SessionChangedEvent(
        this.tagName.toLowerCase(),
        false,
    ));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._model && this._session) {

      const e = React.createElement(ReactFunctionEntry, {
        model: this._model,
        session: this._session,
        onValueChanged: this.onValueChanged.bind(this)
      });

      ReactDOM.render(e, this, () => {
        log('render completed');
      });
    }
  }
}
