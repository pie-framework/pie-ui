/* eslint-disable */

var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {
  BaseElement,
  html,
  property,
  query,
  customElement,
  classMap
} from '@material/mwc-base/base-element.js';
import MDCTopAppBarFoundation from '@material/top-app-bar/standard/foundation.js';
import MDCShortTopAppBarFoundation from '@material/top-app-bar/short/foundation.js';
import MDCFixedTopAppBarFoundation from '@material/top-app-bar/fixed/foundation.js';
import { strings } from '@material/top-app-bar/constants.js';
import { style } from './mwc-top-app-bar-css.js';

window.inputs = {};

window.setColorValue = function(input, color, value) {
  document.body.style.setProperty(color, value);

  window.inputs[color] = input;

  input.value = value;
};

window.setBlackTextOnWhiteBackground = function() {
  if (window.inputs['--pie-background']) window.inputs['--pie-background'].value = 'white';
  document.body.style.setProperty('--pie-background', 'white');
  if (window.inputs['--pie-text']) window.inputs['--pie-text'].value = 'black';
  document.body.style.setProperty('--pie-text', 'black');
  if (window.inputs['--pie-primary']) window.inputs['--pie-primary'].value = 'black';
  document.body.style.setProperty('--pie-primary', 'black');
};

window.setWhiteTextOnBlackBackground = function() {
  if (window.inputs['--pie-background']) window.inputs['--pie-background'].value = 'black';
  document.body.style.setProperty('--pie-background', 'black');
  if (window.inputs['--pie-text']) window.inputs['--pie-text'].value = 'white';
  document.body.style.setProperty('--pie-text', 'white');
  if (window.inputs['--pie-primary']) window.inputs['--pie-primary'].value = 'white';
  document.body.style.setProperty('--pie-primary', 'white');
};

window.setYellowTextOnBlueBackground = function() {
  if (window.inputs['--pie-background']) window.inputs['--pie-background'].value = 'darkblue';
  document.body.style.setProperty('--pie-background', 'darkblue');
  if (window.inputs['--pie-text']) window.inputs['--pie-text'].value = 'yellow';
  document.body.style.setProperty('--pie-text', 'yellow');
  if (window.inputs['--pie-primary']) window.inputs['--pie-primary'].value = 'yellow';
  document.body.style.setProperty('--pie-primary', 'yellow');
};

let TopAppBar = class TopAppBar extends BaseElement {
  constructor() {
    super(...arguments);
    // type can be 'fixed' || 'prominent' || 'short' || 'shortCollapsed' || 'prominentFixed'
    this.type = '';
    this.dense = false;
    // does not work with prominent
    this.extraRow = false;
  }
  get mdcFoundationClass() {
    return this.type === 'fixed' || this.type === 'prominentFixed'
      ? MDCFixedTopAppBarFoundation
      : this.type === 'short' || this.type === 'shortCollapsed'
      ? MDCShortTopAppBarFoundation
      : MDCTopAppBarFoundation;
  }
  get scrollTarget() {
    return this._scrollTarget || window;
  }
  set scrollTarget(value) {
    const old = this.scrollTarget;
    this._scrollTarget = value;
    this.requestUpdate('scrollTarget', old);
  }
  // TODO(sorvell): MDC decorates the navigation icon and action items with
  // ripples. Since these are slotted items here, the assumption is that the
  // user brings a web component with a ripple if rippling is desired.
  render() {
    const classes = {
      'mdc-top-app-bar--fixed':
        this.type === 'fixed' || this.type === 'prominentFixed',
      'mdc-top-app-bar--short':
        this.type === 'shortCollapsed' || this.type === 'short',
      'mdc-top-app-bar--short-collapsed': this.type === 'shortCollapsed',
      'mdc-top-app-bar--prominent':
        this.type === 'prominent' || this.type === 'prominentFixed',
      'mdc-top-app-bar--dense': this.dense
    };
    const extraRow = this.extraRow
      ? html`
          <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section">
              <slot name="extraRow"></slot>
              <section>
                <label>Text Color</label>
                <input onblur="setColorValue(this, '--pie-text', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-text')}"
                  onchange="setColorValue(this, '--pie-text', this.value)" />
              </section>
              <br />
              <section>
                <label>Disabled Color</label>
                <input onblur="setColorValue(this, '--pie-disabled', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-disabled')}"
                  onchange="setColorValue(this, '--pie-disabled', this.value)" />
              </section>
              <br />
              <section>
                <label>Correct Color</label>
                <input onblur="setColorValue(this, '--pie-correct', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-correct')}"
                  onchange="setColorValue(this, '--pie-correct', this.value)" />
              </section>
              <br />
              <section>
                <label>Incorrect Color</label>
                <input onblur="setColorValue(this, '--pie-incorrect', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-incorrect')}"
                  onchange="setColorValue(this, '--pie-incorrect', this.value)" />
              </section>
              <br />
              <section>
                <label>Primary Color</label>
                <input onblur="setColorValue(this, '--pie-primary', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-primary')}"
                  onchange="setColorValue(this, '--pie-primary', this.value)" />
              </section>
              <br />
              <section>
                <label>Secondary Color</label>
                <input onblur="setColorValue(this, '--pie-secondary', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-secondary')}"
                  onchange="setColorValue(this, '--pie-secondary', this.value)" />
              </section>
              <br />
              <section>
                <label>Background Color</label>
                <input onblur="setColorValue(this, '--pie-background', this.value)"
                 value="${document.body.style.getPropertyValue('--pie-background')}"
                  onchange="setColorValue(this, '--pie-background', this.value)" />
              </section>
              <br />
                <div>
                    <button onclick="setBlackTextOnWhiteBackground()">
                        Black Text on White Background
                    </button>
                </div>
                <div>
                    <button onclick="setWhiteTextOnBlackBackground()">
                        White Text on Black Background
                    </button>
                </div>
                <div>
                    <button onclick="setYellowTextOnBlueBackground()">
                        Yellow Text on Blue Background
                    </button>
                </div>
            </section>
          </div>
        `
      : '';
    return html`
      <header class="mdc-top-app-bar ${classMap(classes)}">
        <div class="mdc-top-app-bar__row">
          <section
            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
          >
            <slot name="navigationIcon"></slot>
            <span class="mdc-top-app-bar__title"
              ><slot name="title"></slot
            ></span>
          </section>
          <section
            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
            role="toolbar"
          >
            <slot name="actionItems"></slot>
          </section>
        </div>
        ${extraRow}
      </header>
    `;
  }
  createAdapter() {
    return Object.assign({}, super.createAdapter(), {
      setStyle: (property, value) =>
        this.mdcRoot.style.setProperty(property, value),
      getTopAppBarHeight: () => this.mdcRoot.clientHeight,
      // TODO(sorvell): don't understand why the top-app-bar knows about navigation
      registerNavigationIconInteractionHandler: (type, handler) => {
        if (this._navIconSlot) {
          this._navIconSlot.addEventListener(type, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: (type, handler) => {
        if (this._navIconSlot) {
          this._navIconSlot.removeEventListener(type, handler);
        }
      },
      notifyNavigationIconClicked: () => {
        this.dispatchEvent(
          new Event(strings.NAVIGATION_EVENT, {
            bubbles: true,
            cancelable: true
          })
        );
      },
      registerScrollHandler: handler =>
        this.scrollTarget.addEventListener('scroll', handler),
      deregisterScrollHandler: handler =>
        this.scrollTarget.removeEventListener('scroll', handler),
      registerResizeHandler: handler =>
        window.addEventListener('resize', handler),
      deregisterResizeHandler: handler =>
        window.removeEventListener('resize', handler),
      getViewportScrollY: () =>
        this.scrollTarget[
          this.scrollTarget === window ? 'pageYOffset' : 'scrollTop'
        ],
      getTotalActionItems: () =>
        this._actionItemsSlot.assignedNodes({ flatten: true }).length
    });
  }
  // override that prevents `super.firstUpdated` since we are controlling when `createFoundation` is called.
  firstUpdated() {}
  updated(changedProperties) {
    // update foundation if `type` or `scrollTarget` changes
    if (
      changedProperties.has('type') ||
      changedProperties.has('scrollTarget')
    ) {
      this.createFoundation();
    }
  }
  createFoundation() {
    super.createFoundation();
    const windowScroller = this.scrollTarget === window;
    // we add support for top-app-bar's tied to an element scroller.
    this.mdcRoot.style.position = windowScroller ? '' : 'absolute';
    // TODO(sorvell): not sure why this is necessary but the MDC demo does it.
    this.mdcRoot.style.top = windowScroller ? '0px' : '';
  }
};
TopAppBar.styles = style;
__decorate([query('.mdc-top-app-bar')], TopAppBar.prototype, 'mdcRoot', void 0);
__decorate(
  [query('[name="navigationIcon"]')],
  TopAppBar.prototype,
  '_navIconSlot',
  void 0
);
__decorate(
  [query('[name="actionItems"]')],
  TopAppBar.prototype,
  '_actionItemsSlot',
  void 0
);
__decorate([property({ reflect: true })], TopAppBar.prototype, 'type', void 0);
__decorate(
  [property({ type: Boolean, reflect: true })],
  TopAppBar.prototype,
  'dense',
  void 0
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  TopAppBar.prototype,
  'extraRow',
  void 0
);
TopAppBar = __decorate([customElement('mwc-top-app-bar')], TopAppBar);
export { TopAppBar };
//# sourceMappingURL=mwc-top-app-bar.js.map
