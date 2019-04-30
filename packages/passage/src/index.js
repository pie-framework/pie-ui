import { ModelSetEvent } from '@pie-framework/pie-player-events';

export default class PiePassage extends HTMLElement {
  constructor() {
    super();
    this._model = {
      title: '',
      content: ''
    };
    this._session = null;
  }


  containerStyle =  `
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  `;

  titleStyle = `
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
  `;

  contentStyle = `
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
  `;
  set model(s) {
    this._model = s;
    this.dispatchEvent(
      new ModelSetEvent(
        this.tagName.toLowerCase(),
        this._session,
        !!this._model
      )
    );
    this._render();
  }

  set session(s) {
    this._session = s;
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div style="${this.containerStyle}">
        <h2 style="${this.titleStyle}">${this._model.title}</h2>
        <divs tyle="${this.contentStyle}">${this._model.content}</div>
      </div>
    `;
  }
}
