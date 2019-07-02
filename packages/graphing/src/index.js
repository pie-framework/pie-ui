import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { SessionChangedEvent } from '@pie-framework/pie-player-events';

export { Main as Component };

export default class Graphing extends HTMLElement {
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

  connectedCallback() {
    this._render();
  }

  isComplete = answer => Array.isArray(answer) && answer.length > 0;

  changeAnswers = answer => {
    this._session.answer = answer;

    this.dispatchEvent(
      new SessionChangedEvent(
        this.tagName.toLowerCase(),
        this.isComplete(this._session.answer)
      )
    );

    this._render();
  };

  _render() {
    if (!this._model || !this._session) {
      return;
    }

    const el = React.createElement(Main, {
      model: this._model,
      marks: this._model.answersCorrected || this._session.answer || [],
      onAnswersChange: this.changeAnswers
    });

    ReactDOM.render(el, this);
  }
}
