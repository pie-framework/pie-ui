import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import debug from 'debug';
import { SessionChangedEvent } from '@pie-framework/pie-player-events';
import get from 'lodash/get';

const log = debug('pie-ui:graph-lines');

export { Main as Component };

export const isComplete = (session, model) => {
  const rows = get(model, 'config.rows');
  const ids = rows.map(r => r.id);
  return ids.reduce((acc, id) => {
    if (!acc) {
      return false;
    }
    const arr = session.answers && session.answers[id];
    const hasChoice = Array.isArray(arr) && arr.includes(true);
    return hasChoice && acc;
  }, true);
};

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
    const complete = isComplete(this._session, this._model);
    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), complete)
    );
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
