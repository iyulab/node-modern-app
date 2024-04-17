import React from "react";
import ReactDOM from "react-dom";

import type { LitElement } from "lit";
import type { ComponentType } from "react";

export function renderReact (component: ComponentType) {
  const container = document.createElement('div');
  ReactDOM.render(React.createElement(component), container);
  return container.firstElementChild;
}

export function renderLit (element: typeof LitElement) {
  const litElement = new element();
  return litElement;
}