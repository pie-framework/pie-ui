import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import debug from 'debug';
import katex from 'katex';
import { updateSessionValue } from './session-updater';

//Auto render requires the katex global
window.katex = katex;
const renderMathInElement = require('katex/dist/contrib/auto-render.min');

require('katex/dist/katex.css');

const log = debug('pie-elements:multiple-choice');

export default class MultipleChoice extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;

    this._rerender = debounce(() => {
      if (this._model && this._session) {
        var element = React.createElement(Main,
          {
            model: this._model,
            session: this._session,
            onChoiceChanged: this._onChange.bind(this)
          });
        ReactDOM.render(element, this, () => {
          log('render complete - render math');
          renderMathInElement(this);
        });

      } else {
        log('skip');
      }
    }, 50, { leading: false, trailing: true });

    this._dispatchResponseChanged = debounce(() => {

      var event = new CustomEvent('session-changed', {
        bubbles: true,
        composed: true,
        detail: {
          complete: this.isComplete(),
          component: this.tagName.toLowerCase()
        }
      });

      this.dispatchEvent(event);
    });

    this._dispatchModelSet = debounce(() => {
      this.dispatchEvent(new CustomEvent('model-set', {
        bubbles: true,
        composed: true,
        detail: {
          complete: this.isComplete(),
          component: this.tagName.toLowerCase(),
          hasModel: this._model !== undefined
        }
      }));
    }, 50, { leading: false, trailing: true });
  }

  set model(s) {
    this._model = s;
    this._rerender();
    this._dispatchModelSet();
  }

  get session() {
    return this._session;
  }

  set session(s) {
    this._session = s;
    this._rerender();
    this._dispatchResponseChanged();
  }

  _onChange(data) {
    updateSessionValue(this._session, this._model.choiceMode, data);
    this._dispatchResponseChanged();
    this._rerender();
  };

  isComplete() {
    const { complete } = this._model;
    if (complete) {
      const { min = -1, max = -1 } = complete;
      const choiceCount = this._session && this._session.value ? this._session.value.length : 0;
      const overMin = min === -1 || choiceCount >= min;
      const underMax = max === -1 || choiceCount <= max;
      return overMin && underMax;
    } else {
      return true;
    }
  }

  connectedCallback() {
    this._rerender();
  }

}