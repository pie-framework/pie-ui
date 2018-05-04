import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

export default class MultipleChoice extends HTMLElement {

    constructor() {
        super();
        this._model = null;
        this._session = null;
    }

    set model(s) {
        this._model = s;
        this._rerender();
    }

    get session() {
        return this._session;
    }

    set session(s) {
        this._session = s;
        this._rerender();
    }

    _rerender () {
        if (this._model && this._session) {
            var element = React.createElement(Main,
                {
                    model: this._model,
                    session: this._session,
                    onChoiceChanged: console.log('changing'),
                    classes: ''
                });
            ReactDOM.render(element, this);

        }
    }

    connectedCallback() {
        this._rerender();
    }


}