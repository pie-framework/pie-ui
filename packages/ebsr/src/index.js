import { SessionChangedEvent } from '@pie-framework/pie-player-events';
import MultipleChoice from '@pie-ui/multiple-choice';

import debug from 'debug';
const SESSION_CHANGED = SessionChangedEvent.TYPE;
const MC_TAG_NAME = 'ebsr-multiple-choice';
const log = debug('pie-elements:ebsr');

class EbsrMC extends MultipleChoice {}

const defineMultipleChoice = () => {
  if(!customElements.get(MC_TAG_NAME)){
    customElements.define(MC_TAG_NAME, EbsrMC);
  }
};

defineMultipleChoice();

export default class Ebsr extends HTMLElement {
  constructor() {
    super();
    this._model = {};
    this._session = {};
  }

  onSessionUpdated = e => {
    if (e.target === this) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const id = e.target.getAttribute('id');
    if (id) {
      const key = `part${id.toUpperCase()}`;
      this._model[key] = e.update;
      this.dispatchSessionChanged(e.srcElement._session, key);
    }
  };

  set model(m) {
    this._model = m;

    customElements.whenDefined(MC_TAG_NAME)
      .then(() => {
        this.setPartModel(this.partA, 'partA');
        this.setPartModel(this.partB, 'partB');
      })
  }

  set session(s) {
    this._session = s;

    customElements.whenDefined(MC_TAG_NAME)
      .then(() => {
        this.setPartSession(this.partA, 'partA');
        this.setPartSession(this.partB, 'partB');
      });
  }

  setPartModel(part, key) {
    if (this._model && this._model[key]) {
      const { mode } = this._model;

      part.model = {
        ...this._model[key],
        mode,
        keyMode: this._model[key].choicePrefix,
      };

      const partLabel = part._model.partLabel;
      const isFirst = key === 'partA';
      const el = document.getElementById(`${isFirst ? 'first' : 'second'}_label`);
      el.innerHTML = partLabel || '';
    }
  }

  setPartSession(part, key) {
    if (this._session && this._model) {
      const { value } = this._session;

      part.session = { id: key };

      if (value) {
        part.session = value[key];
      }
    }
  }

  dispatchSessionChanged(partSession, key) {
    this._session.value = {
      ...this._session.value,
      [key]: partSession
    };

    log('[onSessionChanged] session: ', this._session);

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), false)
    );
  }

  get partA() {
    return this.querySelector(`${MC_TAG_NAME}#a`);
  }

  get partB() {
    return this.querySelector(`${MC_TAG_NAME}#b`);
  }

  connectedCallback() {
    this._render();
    this.addEventListener(SESSION_CHANGED, this.onSessionUpdated);
  }

  disconnectedCallback() {
    this.removeEventListener(SESSION_CHANGED, this.onSessionUpdated);
  }

  _render() {
    this.innerHTML = `
      <div>
        <p id="first_label"></p>
        <${MC_TAG_NAME} id="a"></${MC_TAG_NAME}>
        <p id="second_label"></p>
        <${MC_TAG_NAME} id="b"></${MC_TAG_NAME}>
      </div>
    `;
  }
}
