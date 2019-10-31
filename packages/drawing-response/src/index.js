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
    return this._session;
  }

  sessionChanged = (update) => {
    this._session = { drawables: update.drawables, texts: update.texts };
    this.dispatchEvent(
      new CustomEvent('session-changed', {
        bubbles: true,
        detail: {
          component: this.tagName.toLowerCase(),
          drawables: this._session.drawables,
          texts: this._session.texts
        }
      })
    );

    this._render();
  };

  set session(s) {
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
        onSessionChange: this.sessionChanged
      });
      ReactDOM.render(el, this, () => {
        renderMath(this);
      });
    }
  }
}
