import { ModelSetEvent, SessionChangedEvent } from '@pie-framework/pie-player-events';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

export default class RootRuler extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
    this._rerender = () => {
      if (this._model && this._session) {
        let elem = React.createElement(Root, {
          model: this._model,
          session: this._session
        });
        ReactDOM.render(elem, this);
      }
    };
  }

  set model(m) {
    this._model = m;
    this.dispatchEvent(
      new ModelSetEvent(this.tagName.toLowerCase(), this._session, !!this._model)
    );

    this._rerender();
  }

  get session() {
    return this._session;
  }

  set session(s) {
    this._session = s;
    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), this._session)
    );
    this._rerender();
  }

  connectedCallback() {
    this._rerender();
  }

}