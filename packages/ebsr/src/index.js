import { SessionChangedEvent } from '@pie-framework/pie-player-events';
import debug from 'debug';
import React from 'react';

import Main from './main';

const log = debug('pie-elements:ebsr');

export default class Ebsr extends HTMLElement {
  static defineMultipleChoice() {
    if(!customElements.get('multiple-choice')){
      customElements.define('multiple-choice', MultipleChoice);
    }
  }

  static getParts = () => ({
    partA: document.getElementById('part-a'),
    partB: document.getElementById('part-b'),
  });

  constructor() {
    super();

    Main.defineMultipleChoice();

    this._model = {};
    this._session = {};
  }

  set model(m) {
    this._model = m;
    this.setup();
  }

  set session(s) {
    this._session = s;
    this.setup();
  }

  setup() {
    this.updateModels();
    this.captureSessionChanges();
  }

  updateModels() {
    const { partA, partB } = Main.getParts();

    if (partA && partB) {
      this.updatePartModel(partA, 'partA');
      this.updatePartModel(partB, 'partB');
    }
  }

  updatePartModel(part, key) {
    const { mode } = this._model;
    const { value } = this._session;

    const { correctResponse, disabled, keyMode, showCorrect, choiceMode, choices, prompt } = this._model[key];

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
    const { partA, partB } = Main.getParts();

    if (partA && partB) {
      this.capturePartSessionChanged(partA, 'partA');
      this.capturePartSessionChanged(partB, 'partB');
    }
  }

  capturePartSessionChanged(part, key) {
    part.addEventListener('session-changed', (event)  => {
      event.stopImmediatePropagation();
      this.dispatchSessionChanged(event.srcElement._session, key);
    });
  }

  dispatchSessionChanged(partSession, key) {
    this._session.value = {
      ...this._session.value,
      [key]: partSession,
    };

    log('[onSessionChanged] session: ', this._session);

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), false)
    );
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div>
        <multiple-choice id="part-a"></multiple-choice>
        <multiple-choice id="part-b"></multiple-choice>
      </div>
    `;
  }
}
