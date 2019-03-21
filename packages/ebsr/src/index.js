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

  setModel(model) {
    const main = Ebsr.getMain();

    main.modelAndSession = {
      ...this._main,
      model,
    };

    this._main = {
      ...this._main,
      model,
    };

    this.dispatchEvent(
      new ModelSetEvent(this.tagName.toLowerCase(), false, !!this._main)
    );
  }

  setSession(session) {
    const main = Ebsr.getMain();

    main.modelAndSession = {
      ...this._main,
      session,
    };

    this._main = {
      ...this._main,
      session,
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

  set model(m) {
    this.setModel(m);
  }

  set session(s) {
    this.setSession(s);
  }

  onValueChanged(value) {
    this._session.value = value;

    log('[onSessionChanged] session: ', this._session);

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), true)
    );
  }

  connectedCallback() {
    this._render();

    const main = Ebsr.getMain();

    main.addEventListener('main-session-changed', event => {
      this._main.session.value = event.detail.session;

      log('[onSessionChanged] session: ', this._session);

      this.dispatchEvent(
        new SessionChangedEvent(this.tagName.toLowerCase(), true)
      );
    });
  }

  _render() {
    this.innerHTML = `<ebsr-ui-main></ebsr-ui-main>`;
  }
}
