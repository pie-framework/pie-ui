import MultipleChoice from '@pie-ui/multiple-choice';

export default class Main extends HTMLElement {
  static defineMultipleChoice() {
    if(!customElements.get('multiple-choice')){
      customElements.define('multiple-choice', MultipleChoice);
    }
  }

  static getParts = () => ({
    partA: document.getElementById('part-a'),
    partB: document.getElementById('part-b'),
  });

  constructor() {
    super();

    Main.defineMultipleChoice();
  }


  set modelAndSession(modelAndSession) {
    this._main = modelAndSession;

    this.updateModels();
    this.captureSessionChanges();
  }

  updateModels() {
    const { partA, partB } = Main.getParts();

    if (partA && partB) {
      this.updatePartModel(partA, 'partA');
      this.updatePartModel(partB, 'partB');
    }
  }

  updatePartModel(part, key) {
    const { model, model: { mode }, session: { value } } = this._main;
    const { correctResponse, disabled, keyMode, showCorrect, choiceMode, choices, prompt } = model[key];

    part.model = {
      id: key,
      choiceMode,
      choices,
      correctResponse,
      disabled,
      keyMode,
      mode,
      prompt,
      showCorrect
    };

    part.session = { id: key };

    if (value) {
      part.session = value[key];
    }
  }

  captureSessionChanges() {
    const { partA, partB } = Main.getParts();

    if (partA && partB) {
      this.capturePartSessionChanged(partA, 'partA');
      this.capturePartSessionChanged(partB, 'partB');
    }
  }

  capturePartSessionChanged(part, key) {
    const self = this;

    part.addEventListener('session-changed', (event)  => {
      event.stopImmediatePropagation();
      self.updateValue(event.srcElement._session, key);
    });
  }

  updateValue(partSession, key) {
    const { session } = this._main;

    const sessionRepacked = {
      ...session,
      [key]: partSession,
    };

    this._main.session = sessionRepacked;

    const event = new CustomEvent('main-session-changed', {
      detail: {
        session: sessionRepacked,
      }
    });

    this.dispatchEvent(event);
  }

  connectedCallback() {
    this._render();
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
