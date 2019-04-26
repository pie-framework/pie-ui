import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import compact from 'lodash/compact';
import Main from './main';

const log = debug('pie-ui:graph-lines');

export { Main as Component };

export default class MatchList extends HTMLElement {
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
    this._session.value = s.value;
    this.dispatchEvent(
      new CustomEvent('session-changed', {
        bubbles: true,
        detail: {
          component: this.tagName.toLowerCase(),
          complete:
          this._session &&
          this._session.value &&
          compact(this._session.value).length === (this._model.config.prompts || []).length
        }
      })
    );

    log('session: ', this._session);
    this._render();
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
