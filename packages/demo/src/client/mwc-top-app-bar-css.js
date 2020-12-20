/* eslint-disable */

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
import { css } from '@material/mwc-base/base-element';
export const style = css`
  .mdc-top-app-bar {
    background-color: #6200ee;
    background-color: var(--mdc-theme-primary, #6200ee);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100vw;
    z-index: 4;
  }
  .mdc-top-app-bar .mdc-top-app-bar__action-item,
  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon {
    color: #fff;
    color: var(--mdc-theme-on-primary, #fff);
  }
  .mdc-top-app-bar .mdc-top-app-bar__action-item::before,
  .mdc-top-app-bar .mdc-top-app-bar__action-item::after,
  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,
  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after {
    background-color: #fff;
  }
  @supports not (-ms-ime-align: auto) {
    .mdc-top-app-bar .mdc-top-app-bar__action-item::before,
    .mdc-top-app-bar .mdc-top-app-bar__action-item::after,
    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,
    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after {
      background-color: var(--mdc-theme-on-primary, #fff);
    }
  }
  .mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,
  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before {
    opacity: 0.08;
  }
  .mdc-top-app-bar
    .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before,
  .mdc-top-app-bar
    .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,
  .mdc-top-app-bar
    .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before,
  .mdc-top-app-bar
    .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before {
    transition-duration: 75ms;
    opacity: 0.24;
  }
  .mdc-top-app-bar
    .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,
  .mdc-top-app-bar
    .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after {
    transition: opacity 150ms linear;
  }
  .mdc-top-app-bar
    .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,
  .mdc-top-app-bar
    .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after {
    transition-duration: 75ms;
    opacity: 0.32;
  }
  .mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,
  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded {
    --mdc-ripple-fg-opacity: 0.32;
  }
  .mdc-top-app-bar__row {
    display: flex;
    position: relative;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
    padding: 5px;
  }
  .mdc-top-app-bar__section {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
    padding: 8px 12px;
    z-index: 1;
  }
  .mdc-top-app-bar__section--align-start {
    justify-content: flex-start;
    order: -1;
  }
  .mdc-top-app-bar__section--align-end {
    justify-content: flex-end;
    order: 1;
  }
  .mdc-top-app-bar__section input { 
    margin-right: 5px;
  }
  .mdc-top-app-bar__section button { 
    padding: 5px;
    color: black;
    background: white;
    border-radius: 4px;
    margin-right: 5px;
  }
  .mdc-top-app-bar__title {
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1.25rem;
    line-height: 2rem;
    font-weight: 500;
    letter-spacing: 0.0125em;
    text-decoration: inherit;
    text-transform: inherit;
    padding-left: 20px;
    padding-right: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    z-index: 1;
  }
  [dir='rtl'] .mdc-top-app-bar__title,
  .mdc-top-app-bar__title[dir='rtl'] {
    padding-left: 0;
    padding-right: 20px;
  }
  .mdc-top-app-bar__action-item,
  .mdc-top-app-bar__navigation-icon {
    --mdc-ripple-fg-size: 0;
    --mdc-ripple-left: 0;
    --mdc-ripple-top: 0;
    --mdc-ripple-fg-scale: 1;
    --mdc-ripple-fg-translate-end: 0;
    --mdc-ripple-fg-translate-start: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    will-change: transform, opacity;
    display: flex;
    position: relative;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    padding: 12px;
    border: none;
    outline: none;
    background-color: transparent;
    fill: currentColor;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  .mdc-top-app-bar__action-item::before,
  .mdc-top-app-bar__action-item::after,
  .mdc-top-app-bar__navigation-icon::before,
  .mdc-top-app-bar__navigation-icon::after {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    content: '';
  }
  .mdc-top-app-bar__action-item::before,
  .mdc-top-app-bar__navigation-icon::before {
    transition: opacity 15ms linear, background-color 15ms linear;
    z-index: 1;
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded::before,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::before {
    transform: scale(var(--mdc-ripple-fg-scale, 1));
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded::after,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::after {
    top: 0;
    left: 0;
    transform: scale(0);
    transform-origin: center center;
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded--unbounded::after,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--unbounded::after {
    top: var(--mdc-ripple-top, 0);
    left: var(--mdc-ripple-left, 0);
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded--foreground-activation::after,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--foreground-activation::after {
    animation: mdc-ripple-fg-radius-in 225ms forwards,
      mdc-ripple-fg-opacity-in 75ms forwards;
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded--foreground-deactivation::after,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--foreground-deactivation::after {
    animation: mdc-ripple-fg-opacity-out 150ms;
    transform: translate(var(--mdc-ripple-fg-translate-end, 0))
      scale(var(--mdc-ripple-fg-scale, 1));
  }
  .mdc-top-app-bar__action-item::before,
  .mdc-top-app-bar__action-item::after,
  .mdc-top-app-bar__navigation-icon::before,
  .mdc-top-app-bar__navigation-icon::after {
    top: calc(50% - 50%);
    left: calc(50% - 50%);
    width: 100%;
    height: 100%;
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded::before,
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded::after,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::before,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::after {
    top: var(--mdc-ripple-top, calc(50% - 50%));
    left: var(--mdc-ripple-left, calc(50% - 50%));
    width: var(--mdc-ripple-fg-size, 100%);
    height: var(--mdc-ripple-fg-size, 100%);
  }
  .mdc-top-app-bar__action-item.mdc-ripple-upgraded::after,
  .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded::after {
    width: var(--mdc-ripple-fg-size, 100%);
    height: var(--mdc-ripple-fg-size, 100%);
  }
  .mdc-top-app-bar--short-collapsed {
    border-radius: 0 0 24px 0;
  }
  [dir='rtl'] .mdc-top-app-bar--short-collapsed,
  .mdc-top-app-bar--short-collapsed[dir='rtl'] {
    border-radius: 0 0 0 24px;
  }
  .mdc-top-app-bar--short {
    top: 0;
    right: auto;
    left: 0;
    width: 100%;
    transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  [dir='rtl'] .mdc-top-app-bar--short,
  .mdc-top-app-bar--short[dir='rtl'] {
    right: 0;
    left: auto;
  }
  .mdc-top-app-bar--short .mdc-top-app-bar__row {
    height: 56px;
  }
  .mdc-top-app-bar--short .mdc-top-app-bar__section {
    padding: 4px;
  }
  .mdc-top-app-bar--short .mdc-top-app-bar__title {
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }
  .mdc-top-app-bar--short-collapsed {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    width: 56px;
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title {
    display: none;
  }
  .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item {
    transition: padding 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item {
    width: 112px;
  }
  .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item
    .mdc-top-app-bar__section--align-end {
    padding-left: 0;
    padding-right: 12px;
  }
  [dir='rtl']
    .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item
    .mdc-top-app-bar__section--align-end,
  .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item
    .mdc-top-app-bar__section--align-end[dir='rtl'] {
    padding-left: 12px;
    padding-right: 0;
  }
  .mdc-top-app-bar--dense .mdc-top-app-bar__row {
    height: 48px;
  }
  .mdc-top-app-bar--dense .mdc-top-app-bar__section {
    padding: 0 4px;
  }
  .mdc-top-app-bar--dense .mdc-top-app-bar__title {
    padding-left: 12px;
    padding-right: 0;
  }
  [dir='rtl'] .mdc-top-app-bar--dense .mdc-top-app-bar__title,
  .mdc-top-app-bar--dense .mdc-top-app-bar__title[dir='rtl'] {
    padding-left: 0;
    padding-right: 12px;
  }
  .mdc-top-app-bar--prominent .mdc-top-app-bar__row {
    height: 128px;
  }
  .mdc-top-app-bar--prominent .mdc-top-app-bar__title {
    align-self: flex-end;
    padding-bottom: 2px;
  }
  .mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,
  .mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon {
    align-self: flex-start;
  }
  .mdc-top-app-bar--fixed {
    transition: box-shadow 200ms linear;
  }
  .mdc-top-app-bar--fixed-scrolled {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    transition: box-shadow 200ms linear;
  }
  .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row {
    height: 96px;
  }
  .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section {
    padding: 0 12px;
  }
  .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title {
    padding-left: 20px;
    padding-right: 0;
    padding-bottom: 9px;
  }
  [dir='rtl']
    .mdc-top-app-bar--dense.mdc-top-app-bar--prominent
    .mdc-top-app-bar__title,
  .mdc-top-app-bar--dense.mdc-top-app-bar--prominent
    .mdc-top-app-bar__title[dir='rtl'] {
    padding-left: 0;
    padding-right: 20px;
  }
  .mdc-top-app-bar--fixed-adjust {
    padding-top: 64px;
  }
  .mdc-top-app-bar--dense-fixed-adjust {
    padding-top: 48px;
  }
  .mdc-top-app-bar--short-fixed-adjust {
    padding-top: 56px;
  }
  .mdc-top-app-bar--prominent-fixed-adjust {
    padding-top: 128px;
  }
  .mdc-top-app-bar--dense-prominent-fixed-adjust {
    padding-top: 96px;
  }
  @media (max-width: 599px) {
    .mdc-top-app-bar__row {
      height: 56px;
    }
    .mdc-top-app-bar__section {
      padding: 4px;
    }
    .mdc-top-app-bar--short {
      transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .mdc-top-app-bar--short-collapsed {
      transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end {
      padding-left: 0;
      padding-right: 12px;
    }
    [dir='rtl']
      .mdc-top-app-bar--short-collapsed
      .mdc-top-app-bar__section--align-end,
    .mdc-top-app-bar--short-collapsed
      .mdc-top-app-bar__section--align-end[dir='rtl'] {
      padding-left: 12px;
      padding-right: 0;
    }
    .mdc-top-app-bar--prominent .mdc-top-app-bar__title {
      padding-bottom: 6px;
    }
    .mdc-top-app-bar--fixed-adjust {
      padding-top: 56px;
    }
  }
  :host {
    display: inline-flex;
  }
  .mdc-top-app-bar {
    flex: 1;
  }
  .mdc-top-app-bar--prominent slot[name='navigationIcon']::slotted(*),
  .mdc-top-app-bar--prominent slot[name='actionItems']::slotted(*) {
    align-self: flex-start;
  }
  .mdc-top-app-bar--short-collapsed slot[name='actionItems']::slotted(*) {
    transition: padding 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
//# sourceMappingURL=mwc-top-app-bar-css.js.map
