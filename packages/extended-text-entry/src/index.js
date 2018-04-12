import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ModelSetEvent,
  SessionChangedEvent
} from '@pie-framework/pie-player-events';

export default class RootExtendedTextEntry extends HTMLElement {
  constructor() {
    super();
    this._model = null;
    this._session = null;
  }

  set model(m) {
    this._model = m;
    this.dispatchEvent(
      new ModelSetEvent(this.tagName.toLowerCase(), false, !!this._model)
    );

    this.render();
  }

  set session(s) {
    this._session = s;
    this.render();
  }

  handleChange(value) {
    this._session.value = value;

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), this._session)
    );
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._model && this._session) {
      let elem = React.createElement(Main, {
        model: this._model,
        session: this._session,
        onChange: this.handleChange.bind(this)
      });
      ReactDOM.render(elem, this);
    }
  }
}
