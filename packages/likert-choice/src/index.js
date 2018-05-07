import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import debounce from 'lodash/debounce';
import debug from 'debug';

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
                ReactDOM.render(element, this);

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
        this._session.value =  this._session.value || [];
        if (data.selected) {
            this._session.value = [data.value]
        } else {
            this._session.value = [];
        }
        this._dispatchResponseChanged();
        this._rerender();
    }

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