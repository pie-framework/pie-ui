import React from 'react';
import ReactDOM from 'react-dom';
import {
  ModelSetEvent,
  SessionChangedEvent
} from '@pie-framework/pie-player-events';
import { renderMath } from '@pie-lib/math-rendering';
import { componentize } from '@pie-lib/mask-markup';

import Main from './main';

const normalize = (v, fields) => {
  return Object.keys(fields).reduce((acc, k) => {
    acc[k] = acc[k] || { value: '' };
    return acc;
  }, v || {});
};

export default class InlineDropdown extends HTMLElement {
  constructor() {
    super();
    this._model = null;
    this._session = null;
  }

  set model(m) {
    this._model = m;
    this.dispatchEvent(
      new ModelSetEvent(
        this.tagName.toLowerCase(),
        this.session && !!this.session.value,
        !!this._model
      )
    );

    this._render();
  }

  set session(s) {
    this._session = s;
    this._render();
  }

  get session() {
    return this._session;
  }

  _render = () => {
    if (this._model && this._session) {
      const { ids } = componentize(this._model.markup, 'input');

      this._session.value = normalize(this._session.value, ids);
      let elem = React.createElement(Main, {
        teacherInstructions: this._model.teacherInstructions,
        prompt: this._model.prompt,
        disabled: this._model.disabled,
        choices: this._model.choices,
        markup: this._model.markup,
        mode: this._model.mode,
        value: this._session.value,
        feedback: this._model.feedback,
        onChange: this.changeSession
      });
      ReactDOM.render(elem, this, () => {
        renderMath(this);
      });
    }
  };

  dispatchChangedEvent = () => {
    this.dispatchEvent(
      new SessionChangedEvent(
        this.tagName.toLowerCase(),
        this.session && !!this.session.value
      )
    );
  };

  changeSession = value => {
    this.session.value = value;
    this.dispatchChangedEvent();
    this._render();
  };

  connectedCallback() {
    this._render();
  }
}
