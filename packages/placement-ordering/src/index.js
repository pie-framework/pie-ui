import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import compact from 'lodash/compact';
import debug from 'debug';
import katex from 'katex';
import { swap } from './ordering';
import withContext from './with-context';

const log = debug('pie-elements:placement-ordering');

//Auto render requires the katex global
window.katex = katex;
const renderMathInElement = require('katex/dist/contrib/auto-render.min');

require('katex/dist/katex.css');

export {
  withContext,
  swap
}

export default class Ordering extends HTMLElement {

  constructor() {
    super();
    this.sessionChange = this.sessionChange.bind(this);
  }

  render() {
    if (this._model && this._session) {
      log('[render] session: ', this._session);
      log('[render] model: ', this._model);

      const element = React.createElement(Main, {
        model: this._model,
        session: this._session,
        onSessionChange: this.sessionChange
      });

      ReactDOM.render(element, this, () => {
        renderMathInElement(this);
      });
    }
  }

  sessionChange(session) {
    this._session.value = session.value;
    this.render();
    this.dispatchEvent(new CustomEvent('session-changed', {
      bubbles: true,
      detail: {
        component: this.tagName.toLowerCase(),
        complete: this._session && this._session.value && compact(this._session.value).length === this._model.completeLength
      }
    }));
  }

  set model(newModel) {
    this._model = newModel;
    this.render();
    this.dispatchEvent(new CustomEvent('model-set', {
      bubbles: true,
      detail: {
        complete: false
      }
    }));
  }

  set session(newSession) {
    this._session = newSession;
    this.render();
  }

}