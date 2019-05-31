import React from 'react';
import ReactDOM from 'react-dom';
import { renderMath } from '@pie-lib/math-rendering';
import { ModelSetEvent } from '@pie-framework/pie-player-events';

import DrawingResponseComponent from './drawing-response';

export default class DrawingResponse extends HTMLElement {
  set model(m) {
    this._model = m;

    this.dispatchEvent(
      new ModelSetEvent(
        this.tagName.toLowerCase(),
        this.isComplete(),
        !!this._model
      )
    );
    this._render();
  }

  isComplete() {
    if (!this._session) {
      return false;
    }

    return (
      Array.isArray(this._session.answers) && this._session.answers.length > 0
    );
  }

  set session(s) {
    if (s && !s.answers) {
      s.answers = [];
    }

    this._session = s;
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    if (this._model && this._session) {
      const el = React.createElement(DrawingResponseComponent, {
        model: this._model,
        session: this._session,
      });
      ReactDOM.render(el, this, () => {
        renderMath(this);
      });
    }
  }
}
