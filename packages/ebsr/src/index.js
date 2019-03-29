import { SessionChangedEvent } from '@pie-framework/pie-player-events';
import MultipleChoice from '@pie-ui/multiple-choice';

import debug from 'debug';
const SESSION_CHANGED = SessionChangedEvent.TYPE;
const log = debug('pie-elements:ebsr');

const defineMultipleChoice = () => {
  if(!customElements.get('multiple-choice')){
    customElements.define('multiple-choice', MultipleChoice);
  }
};

export default class Ebsr extends HTMLElement {
  constructor() {
    super();
    defineMultipleChoice();

    this._model = {};
    this._session = {};

    this.onPartUpdated = e => {
      e.stopImmediatePropagation();
      const key =
        e.target.getAttribute('id') === 'part-a' ? 'partA' : 'partB';
      this.dispatchSessionChanged(e.srcElement._session, key);
    };
  }

  set model(m) {
    this._model = m;
    this.setPartModel(this.partA, 'partA');
    this.setPartModel(this.partB, 'partB');
  }

  set session(s) {
    this._session = s;
    this.setPartSession(this.partA, 'partA');
    this.setPartSession(this.partB, 'partB');
  }

  setPartModel(part, key) {
    const { mode } = this._model;

    part.model = {
      ...this._model[key],
      mode
    };
  }

  setPartSession(part, key) {
    const { value } = this._session;

    part.session = { id: key };

    if (value) {
      part.session = value[key];
    }
  }

  dispatchSessionChanged(partSession, key) {
    this._session.value = {
      ...this._session.value,
      [key]: partSession,
    };

    log('[onSessionChanged] session: ', this._session);

    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), false)
    );
  }

  get partA() {
    return this.querySelector('#part-a');
  }

  get partB() {
    return this.querySelector('#part-b');
  }

  connectedCallback() {
    this._render();
    this.partA.addEventListener(SESSION_CHANGED, this.onPartUpdated);
    this.partB.addEventListener(SESSION_CHANGED, this.onPartUpdated);
  }

  disconnectedCallback() {
    this.partA.removeEventListener(SESSION_CHANGED, this.onPartUpdated);
    this.partB.removeEventListener(SESSION_CHANGED, this.onPartUpdated);
  }

  _render() {
    this.innerHTML = `
      <div>
        <multiple-choice id="part-a"></multiple-choice>
        <multiple-choice id="part-b"></multiple-choice>
      </div>
    `;
  }
}
