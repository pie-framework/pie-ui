export default class FunctionEntry extends HTMLElement {

  constructor() {
    super();


  }

  set model(m) {
    this._model = m;

    this.render();
  }

  set session(s) {
    this._session = s;
    this.render();
  }

  render() {
    if (!this._model || !this._session) {
      return;
    }

    const all = { model: this._model, session: this._session };
    this.innerHTML = `<pre>${JSON.stringify(all, null, '  ')}</pre>`
  }
  connectedCallback() {
    this.render();
  }
}