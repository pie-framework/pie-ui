import React from 'react';
import ReactDOM from 'react-dom';
import CategorizeComponent from './categorize';

export default class Categorize extends HTMLElement {
  constructor() {
    super();
  }

  set model(m) {
    this._model = m;
    this.render();
  }

  set session(s) {
    this._session = s;
  }

  render() {
    if (this._model && this._session) {
      const el = React.createElement(CategorizeComponent, {
        model: this._model,
        session: this._session
      });
      ReactDOM.render(el, this);
    }
  }
}
