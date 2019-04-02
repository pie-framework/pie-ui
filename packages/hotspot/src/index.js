import debug from 'debug';

export default class Hotspot extends HTMLElement {
  constructor() {
    super();

    this._model = {};
    this._session = {};
  }

  set model(m) {
    console.log('New model received.');
    this._model = m;
  }

  set session(s) {
    console.log('New session received.');
    this._session = s;
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div>
        Hotspot interaction
      </div>
    `;
  }
}
