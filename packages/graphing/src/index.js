import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { SessionChangedEvent } from '@pie-framework/pie-player-events';

export { Main as Component };

export default class GraphLines extends HTMLElement {
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

  isComplete() {
    if (!this._session) {
      return false;
    }

    return (
      Array.isArray(this._session.answers) && this._session.answers.length > 0
    );
  }

  changeAnswers(answers) {
    this._session.answers = answers;

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), this.isComplete())
    );

    this._render();
  }

  _render() {
    if (!this._model || !this._session) {
      return;
    }

    const el = React.createElement(Main, {
      model: this._model,
      onAnswersChange: this.changeAnswers.bind(this),
    });

    ReactDOM.render(el, this);
  }
}
