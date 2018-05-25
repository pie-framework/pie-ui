import Main from './main';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  SessionChangedEvent,
  ModelSetEvent
} from '@pie-framework/pie-player-events';

export default class FillInTheBlank extends HTMLElement {
  set model(m) {
    this._model = m;

    this.render();

    this.dispatchEvent(
      new ModelSetEvent(
        this.tagName.toLowerCase(),
        this.isSessionComplete(),
        this._model !== undefined
      )
    );
  }

  set session(s) {
    this._session = s;
    this.render();
  }

  changeAnswers(answers) {
    this._session.answers = answers;
    this.render();
    this.dispatchEvent(
      new SessionChangedEvent(
        this.tagName.toLowerCase(),
        this.isSessionComplete()
      )
    );
  }

  isSessionComplete() {
    return (
      this._session && this._session.answers && this._session.answers.length > 0
    );
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._model && this._session) {
      const el = React.createElement(Main, {
        model: this._model,
        session: this._session,
        onAnswersChange: this.changeAnswers.bind(this)
      });

      ReactDOM.render(el, this);
    }
  }
}
