import Main from "./main.jsx"
import React from "react";
import ReactDOM from "react-dom";
import { ModelSetEvent, SessionChangedEvent } from "@pie-framework/pie-player-events";

export default class RootExtendedTextEntry extends HTMLElement {

  constructor() {
    super();

    this._session = null;
    this._rerender = () => {
      if (this._session) {
        let elem = React.createElement(Main, {
          session: this._session,
          onChange: this._handleChange.bind(this)
        });
        ReactDOM.render(elem, this);
      }
    };
  }

  set session(s) {
    this._session = s;
    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), this.session)
    );
    this._rerender();
  }

  get session() {
    return this._session;
  }

  _handleChange(value) {
    this.session.value = value;
    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), this.session)
    );
    this._rerender();
  }

  connectedCallback() {
    this._rerender();
  }
}
