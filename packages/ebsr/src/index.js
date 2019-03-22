import {
  ModelSetEvent,
  SessionChangedEvent
} from '@pie-framework/pie-player-events';
import debug from 'debug';
import React from 'react';

import Main from './main';

const log = debug('pie-elements:ebsr');

export default class Ebsr extends HTMLElement {
  static getMain = ()  => document.querySelector('ebsr-ui-main');

  static defineMain() {
    if (!customElements.get('ebsr-ui-main')) {
      customElements.define('ebsr-ui-main', Main);
    }
  }

  constructor() {
    super();

    Ebsr.defineMain();

    this._main = {
      model: {},
      session: {}
    };

  }

  set model(model) {
    this.updateState({ model });
    this.setMain({ model });
  }

  set session(session) {
    this.updateState({ session });
    this.setMain({ session });
  }

  updateState(param) {
    this._main = {
      ...this._main,
      ...param
    };
  }

  setMain(param) {
    const main = Ebsr.getMain();

    main.data = {
      ...this._main,
      ...param
    };
  }

  connectedCallback() {
    this._render();

    const main = Ebsr.getMain();
    const self = this;

    main.addEventListener('main-session-changed', event => {
      self.dispatchSessionChanged(event.detail.session);
    });
  }

  dispatchSessionChanged(session) {
    this._main.session.value = {
      ...this._main.session.value,
      ...session
    };

    log('[onSessionChanged] session: ', this._main.session);

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), false)
    );
  }

  _render() {
    this.innerHTML = `<ebsr-ui-main></ebsr-ui-main>`;
  }
}
