import React from 'react';
import ReactDOM from 'react-dom';
import {
  ModelSetEvent,
  SessionChangedEvent
} from '@pie-framework/pie-player-events';
import { MaskMarkup } from '@pie-lib/mask-markup';

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

    this._rerender();
  }

  set session(s) {
    this._session = s;
    this._rerender();
  }

  get session() {
    return this._session;
  }

  _render = () => {
    if (this._model && this._session) {
      let elem = React.createElement(MaskMarkup, {
        value: {},
        config: {},
        feedback: {},
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

  changeSession = (id, value) => {
    this.session.value[id] = value;
    this.dispatchChangedEvent();
    this._rerender();
  };

  connectedCallback() {
    this._rerender();
  }
}
