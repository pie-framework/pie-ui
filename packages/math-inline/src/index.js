import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import debug from 'debug';

const log = debug('pie-ui:math-inline');

export { Main as Component };

export default class Match extends HTMLElement {
  constructor() {
    super();
  }

  set model(m) {
    this._model = m;
    this._render();
  }

  set session(s) {
    this._session = s;
    this._render();
  }

  sessionChanged(s) {
    this._session.answers = s.answers;
    this._session.response = s.response;
    this._session.expression = s.expression;
    log('session: ', this._session);
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    if (!this._model || !this._session) {
      return;
    }

    const el = React.createElement(Main, {
      model: this._model,
      session: this._session,
      onSessionChange: this.sessionChanged.bind(this)
    });

    ReactDOM.render(el, this);
  }
}
