import React from 'react';
import ReactDOM from 'react-dom';
import {
  ModelSetEvent,
  SessionChangedEvent
} from '@pie-framework/pie-player-events';
import { MaskMarkup, componentize, components } from '@pie-lib/mask-markup';

const toConfig = fields => {
  return Object.keys(fields).reduce((acc, k) => {
    acc[k] = {
      choices: fields[k]
    };
    return acc;
  }, {});
};

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
      this._session.value = normalize(this._session.value, this._model.fields);
      let elem = React.createElement(MaskMarkup, {
        disabled: this._model.disabled,
        markup: componentize(this._model.markup, 'dropdown'),
        components: {
          dropdown: components.Dropdown
        },
        value: this._session.value,
        config: toConfig(this._model.fields),
        feedback: this._model.feedback,
        onChange: this.changeSession
      });
      ReactDOM.render(elem, this);
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
