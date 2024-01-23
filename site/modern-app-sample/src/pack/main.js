var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
import "./assets/main.css";
import { LitElement, css as css$1, html as html$1, unsafeCSS } from "lit";
import React__default, { useState, forwardRef, memo, Component, PureComponent, useRef, useEffect, Children, isValidElement } from "react";
import { Link, NavLink, Outlet, useRouteError, useNavigate, isRouteErrorResponse, createBrowserRouter, RouterProvider } from "react-router-dom";
import require$$0, { unstable_batchedUpdates } from "react-dom";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target2, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target2 : desc === null ? desc = Object.getOwnPropertyDescriptor(target2, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target2, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d2 = decorators[i])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target2, key, r2) : d2(target2, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target2, key, r2), r2;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, e$4 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o$2 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$2.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$2.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$3 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s), S = (s2, o2) => {
  if (e$4)
    s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t$1.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
}, c$1 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e$3, getOwnPropertyDescriptor: r$2, getOwnPropertyNames: h, getOwnPropertySymbols: o$1, getPrototypeOf: n$2 } = Object, a = globalThis, c = a.trustedTypes, l$1 = c ? c.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t2, s2) => t2, u = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i = t2;
  switch (s2) {
    case Boolean:
      i = null !== t2;
      break;
    case Number:
      i = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t2);
      } catch (t3) {
        i = null;
      }
  }
  return i;
} }, f = (t2, s2) => !i$1(t2, s2), y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i = Symbol(), r2 = this.getPropertyDescriptor(t2, i, s2);
      void 0 !== r2 && e$3(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i) {
    const { get: e2, set: h2 } = r$2(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties")))
      return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t3 = this.properties, s2 = [...h(t3), ...o$1(t3)];
      for (const i of s2)
        this.createProperty(i, t3[i]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2)
        for (const [t3, i] of s2)
          this.elementProperties.set(t3, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i = this._$Eu(t3, s2);
      void 0 !== i && this._$Eh.set(i, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2)
        i.unshift(c$1(s3));
    } else
      void 0 !== s2 && i.push(c$1(s2));
    return i;
  }
  static _$Eu(t2, s2) {
    const i = s2.attribute;
    return false === i ? void 0 : "string" == typeof i ? i : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a3;
    this._$Eg = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), (_a3 = this.constructor.l) == null ? void 0 : _a3.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a3;
    (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2));
  }
  removeController(t2) {
    var _a3;
    (_a3 = this._$E_) == null ? void 0 : _a3.delete(t2);
  }
  _$ES() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i of s2.keys())
      this.hasOwnProperty(i) && (t2.set(i, this[i]), delete this[i]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a3;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a3 = this._$E_) == null ? void 0 : _a3.forEach((t2) => {
      var _a4;
      return (_a4 = t2.hostConnected) == null ? void 0 : _a4.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this._$E_) == null ? void 0 : _a3.forEach((t2) => {
      var _a4;
      return (_a4 = t2.hostDisconnected) == null ? void 0 : _a4.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i) {
    this._$AK(t2, i);
  }
  _$EO(t2, s2) {
    var _a3;
    const i = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i);
    if (void 0 !== e2 && true === i.reflect) {
      const r2 = (void 0 !== ((_a3 = i.converter) == null ? void 0 : _a3.toAttribute) ? i.converter : u).toAttribute(s2, i.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a3;
    const i = this.constructor, e2 = i._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a3 = t3.converter) == null ? void 0 : _a3.fromAttribute) ? t3.converter : u;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i) {
    if (void 0 !== t2) {
      if (i ?? (i = this.constructor.getPropertyOptions(t2)), !(i.hasChanged ?? f)(this[t2], s2))
        return;
      this.C(t2, s2, i);
    }
    false === this.isUpdatePending && (this._$Eg = this._$EP());
  }
  C(t2, s2, i) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i.reflect && this._$Em !== t2 && (this._$ET ?? (this._$ET = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$Eg;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a3;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep)
          this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s3, i] of t3)
          true !== i.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.C(s3, this[s3], i);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a3 = this._$E_) == null ? void 0 : _a3.forEach((t3) => {
        var _a4;
        return (_a4 = t3.hostUpdate) == null ? void 0 : _a4.call(t3);
      }), this.update(s2)) : this._$Ej();
    } catch (s3) {
      throw t2 = false, this._$Ej(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a3;
    (_a3 = this._$E_) == null ? void 0 : _a3.forEach((t3) => {
      var _a4;
      return (_a4 = t3.hostUpdated) == null ? void 0 : _a4.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ej() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$ET && (this._$ET = this._$ET.forEach((t3) => this._$EO(t3, this[t3]))), this._$Ej();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n$1({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$2 = (e2, t2, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, c2), c2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$1(e2, r2) {
  return (n3, s2, i) => {
    const o2 = (t2) => {
      var _a3;
      return ((_a3 = t2.renderRoot) == null ? void 0 : _a3.querySelector(e2)) ?? null;
    };
    if (r2) {
      const { get: e3, set: r3 } = "object" == typeof s2 ? n3 : i ?? (() => {
        const t2 = Symbol();
        return { get() {
          return this[t2];
        }, set(e4) {
          this[t2] = e4;
        } };
      })();
      return e$2(n3, s2, { get() {
        let t2 = e3.call(this);
        return void 0 === t2 && (t2 = o2(this), (null !== t2 || this.hasUpdated) && r3.call(this, t2)), t2;
      } });
    }
    return e$2(n3, s2, { get() {
      return o2(this);
    } });
  };
}
const $global = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  try {
    return new Function("return this")();
  } catch (_a3) {
    return {};
  }
}();
if ($global.trustedTypes === void 0) {
  $global.trustedTypes = { createPolicy: (n3, r2) => r2 };
}
const propConfig = {
  configurable: false,
  enumerable: false,
  writable: false
};
if ($global.FAST === void 0) {
  Reflect.defineProperty($global, "FAST", Object.assign({ value: /* @__PURE__ */ Object.create(null) }, propConfig));
}
const FAST = $global.FAST;
if (FAST.getById === void 0) {
  const storage = /* @__PURE__ */ Object.create(null);
  Reflect.defineProperty(FAST, "getById", Object.assign({ value(id, initialize) {
    let found = storage[id];
    if (found === void 0) {
      found = initialize ? storage[id] = initialize() : null;
    }
    return found;
  } }, propConfig));
}
const emptyArray = Object.freeze([]);
function createMetadataLocator() {
  const metadataLookup = /* @__PURE__ */ new WeakMap();
  return function(target2) {
    let metadata = metadataLookup.get(target2);
    if (metadata === void 0) {
      let currentTarget = Reflect.getPrototypeOf(target2);
      while (metadata === void 0 && currentTarget !== null) {
        metadata = metadataLookup.get(currentTarget);
        currentTarget = Reflect.getPrototypeOf(currentTarget);
      }
      metadata = metadata === void 0 ? [] : metadata.slice(0);
      metadataLookup.set(target2, metadata);
    }
    return metadata;
  };
}
const updateQueue = $global.FAST.getById(1, () => {
  const tasks = [];
  const pendingErrors = [];
  function throwFirstError() {
    if (pendingErrors.length) {
      throw pendingErrors.shift();
    }
  }
  function tryRunTask(task) {
    try {
      task.call();
    } catch (error2) {
      pendingErrors.push(error2);
      setTimeout(throwFirstError, 0);
    }
  }
  function process2() {
    const capacity = 1024;
    let index = 0;
    while (index < tasks.length) {
      tryRunTask(tasks[index]);
      index++;
      if (index > capacity) {
        for (let scan = 0, newLength = tasks.length - index; scan < newLength; scan++) {
          tasks[scan] = tasks[scan + index];
        }
        tasks.length -= index;
        index = 0;
      }
    }
    tasks.length = 0;
  }
  function enqueue(callable) {
    if (tasks.length < 1) {
      $global.requestAnimationFrame(process2);
    }
    tasks.push(callable);
  }
  return Object.freeze({
    enqueue,
    process: process2
  });
});
const fastHTMLPolicy = $global.trustedTypes.createPolicy("fast-html", {
  createHTML: (html2) => html2
});
let htmlPolicy = fastHTMLPolicy;
const marker = `fast-${Math.random().toString(36).substring(2, 8)}`;
const _interpolationStart = `${marker}{`;
const _interpolationEnd = `}${marker}`;
const DOM = Object.freeze({
  /**
   * Indicates whether the DOM supports the adoptedStyleSheets feature.
   */
  supportsAdoptedStyleSheets: Array.isArray(document.adoptedStyleSheets) && "replace" in CSSStyleSheet.prototype,
  /**
   * Sets the HTML trusted types policy used by the templating engine.
   * @param policy - The policy to set for HTML.
   * @remarks
   * This API can only be called once, for security reasons. It should be
   * called by the application developer at the start of their program.
   */
  setHTMLPolicy(policy) {
    if (htmlPolicy !== fastHTMLPolicy) {
      throw new Error("The HTML policy can only be set once.");
    }
    htmlPolicy = policy;
  },
  /**
   * Turns a string into trusted HTML using the configured trusted types policy.
   * @param html - The string to turn into trusted HTML.
   * @remarks
   * Used internally by the template engine when creating templates
   * and setting innerHTML.
   */
  createHTML(html2) {
    return htmlPolicy.createHTML(html2);
  },
  /**
   * Determines if the provided node is a template marker used by the runtime.
   * @param node - The node to test.
   */
  isMarker(node) {
    return node && node.nodeType === 8 && node.data.startsWith(marker);
  },
  /**
   * Given a marker node, extract the {@link HTMLDirective} index from the placeholder.
   * @param node - The marker node to extract the index from.
   */
  extractDirectiveIndexFromMarker(node) {
    return parseInt(node.data.replace(`${marker}:`, ""));
  },
  /**
   * Creates a placeholder string suitable for marking out a location *within*
   * an attribute value or HTML content.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by binding directives.
   */
  createInterpolationPlaceholder(index) {
    return `${_interpolationStart}${index}${_interpolationEnd}`;
  },
  /**
   * Creates a placeholder that manifests itself as an attribute on an
   * element.
   * @param attributeName - The name of the custom attribute.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
   */
  createCustomAttributePlaceholder(attributeName, index) {
    return `${attributeName}="${this.createInterpolationPlaceholder(index)}"`;
  },
  /**
   * Creates a placeholder that manifests itself as a marker within the DOM structure.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by structural directives such as `repeat`.
   */
  createBlockPlaceholder(index) {
    return `<!--${marker}:${index}-->`;
  },
  /**
   * Schedules DOM update work in the next async batch.
   * @param callable - The callable function or object to queue.
   */
  queueUpdate: updateQueue.enqueue,
  /**
   * Immediately processes all work previously scheduled
   * through queueUpdate.
   * @remarks
   * This also forces nextUpdate promises
   * to resolve.
   */
  processUpdates: updateQueue.process,
  /**
   * Resolves with the next DOM update.
   */
  nextUpdate() {
    return new Promise(updateQueue.enqueue);
  },
  /**
   * Sets an attribute value on an element.
   * @param element - The element to set the attribute value on.
   * @param attributeName - The attribute name to set.
   * @param value - The value of the attribute to set.
   * @remarks
   * If the value is `null` or `undefined`, the attribute is removed, otherwise
   * it is set to the provided value using the standard `setAttribute` API.
   */
  setAttribute(element, attributeName, value) {
    if (value === null || value === void 0) {
      element.removeAttribute(attributeName);
    } else {
      element.setAttribute(attributeName, value);
    }
  },
  /**
   * Sets a boolean attribute value.
   * @param element - The element to set the boolean attribute value on.
   * @param attributeName - The attribute name to set.
   * @param value - The value of the attribute to set.
   * @remarks
   * If the value is true, the attribute is added; otherwise it is removed.
   */
  setBooleanAttribute(element, attributeName, value) {
    value ? element.setAttribute(attributeName, "") : element.removeAttribute(attributeName);
  },
  /**
   * Removes all the child nodes of the provided parent node.
   * @param parent - The node to remove the children from.
   */
  removeChildNodes(parent) {
    for (let child = parent.firstChild; child !== null; child = parent.firstChild) {
      parent.removeChild(child);
    }
  },
  /**
   * Creates a TreeWalker configured to walk a template fragment.
   * @param fragment - The fragment to walk.
   */
  createTemplateWalker(fragment) {
    return document.createTreeWalker(
      fragment,
      133,
      // element, text, comment
      null,
      false
    );
  }
});
class SubscriberSet {
  /**
   * Creates an instance of SubscriberSet for the specified source.
   * @param source - The object source that subscribers will receive notifications from.
   * @param initialSubscriber - An initial subscriber to changes.
   */
  constructor(source, initialSubscriber) {
    this.sub1 = void 0;
    this.sub2 = void 0;
    this.spillover = void 0;
    this.source = source;
    this.sub1 = initialSubscriber;
  }
  /**
   * Checks whether the provided subscriber has been added to this set.
   * @param subscriber - The subscriber to test for inclusion in this set.
   */
  has(subscriber) {
    return this.spillover === void 0 ? this.sub1 === subscriber || this.sub2 === subscriber : this.spillover.indexOf(subscriber) !== -1;
  }
  /**
   * Subscribes to notification of changes in an object's state.
   * @param subscriber - The object that is subscribing for change notification.
   */
  subscribe(subscriber) {
    const spillover = this.spillover;
    if (spillover === void 0) {
      if (this.has(subscriber)) {
        return;
      }
      if (this.sub1 === void 0) {
        this.sub1 = subscriber;
        return;
      }
      if (this.sub2 === void 0) {
        this.sub2 = subscriber;
        return;
      }
      this.spillover = [this.sub1, this.sub2, subscriber];
      this.sub1 = void 0;
      this.sub2 = void 0;
    } else {
      const index = spillover.indexOf(subscriber);
      if (index === -1) {
        spillover.push(subscriber);
      }
    }
  }
  /**
   * Unsubscribes from notification of changes in an object's state.
   * @param subscriber - The object that is unsubscribing from change notification.
   */
  unsubscribe(subscriber) {
    const spillover = this.spillover;
    if (spillover === void 0) {
      if (this.sub1 === subscriber) {
        this.sub1 = void 0;
      } else if (this.sub2 === subscriber) {
        this.sub2 = void 0;
      }
    } else {
      const index = spillover.indexOf(subscriber);
      if (index !== -1) {
        spillover.splice(index, 1);
      }
    }
  }
  /**
   * Notifies all subscribers.
   * @param args - Data passed along to subscribers during notification.
   */
  notify(args) {
    const spillover = this.spillover;
    const source = this.source;
    if (spillover === void 0) {
      const sub1 = this.sub1;
      const sub2 = this.sub2;
      if (sub1 !== void 0) {
        sub1.handleChange(source, args);
      }
      if (sub2 !== void 0) {
        sub2.handleChange(source, args);
      }
    } else {
      for (let i = 0, ii = spillover.length; i < ii; ++i) {
        spillover[i].handleChange(source, args);
      }
    }
  }
}
class PropertyChangeNotifier {
  /**
   * Creates an instance of PropertyChangeNotifier for the specified source.
   * @param source - The object source that subscribers will receive notifications from.
   */
  constructor(source) {
    this.subscribers = {};
    this.sourceSubscribers = null;
    this.source = source;
  }
  /**
   * Notifies all subscribers, based on the specified property.
   * @param propertyName - The property name, passed along to subscribers during notification.
   */
  notify(propertyName) {
    var _a3;
    const subscribers = this.subscribers[propertyName];
    if (subscribers !== void 0) {
      subscribers.notify(propertyName);
    }
    (_a3 = this.sourceSubscribers) === null || _a3 === void 0 ? void 0 : _a3.notify(propertyName);
  }
  /**
   * Subscribes to notification of changes in an object's state.
   * @param subscriber - The object that is subscribing for change notification.
   * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
   */
  subscribe(subscriber, propertyToWatch) {
    var _a3;
    if (propertyToWatch) {
      let subscribers = this.subscribers[propertyToWatch];
      if (subscribers === void 0) {
        this.subscribers[propertyToWatch] = subscribers = new SubscriberSet(this.source);
      }
      subscribers.subscribe(subscriber);
    } else {
      this.sourceSubscribers = (_a3 = this.sourceSubscribers) !== null && _a3 !== void 0 ? _a3 : new SubscriberSet(this.source);
      this.sourceSubscribers.subscribe(subscriber);
    }
  }
  /**
   * Unsubscribes from notification of changes in an object's state.
   * @param subscriber - The object that is unsubscribing from change notification.
   * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
   */
  unsubscribe(subscriber, propertyToUnwatch) {
    var _a3;
    if (propertyToUnwatch) {
      const subscribers = this.subscribers[propertyToUnwatch];
      if (subscribers !== void 0) {
        subscribers.unsubscribe(subscriber);
      }
    } else {
      (_a3 = this.sourceSubscribers) === null || _a3 === void 0 ? void 0 : _a3.unsubscribe(subscriber);
    }
  }
}
const Observable = FAST.getById(2, () => {
  const volatileRegex = /(:|&&|\|\||if)/;
  const notifierLookup = /* @__PURE__ */ new WeakMap();
  const queueUpdate = DOM.queueUpdate;
  let watcher = void 0;
  let createArrayObserver = (array2) => {
    throw new Error("Must call enableArrayObservation before observing arrays.");
  };
  function getNotifier(source) {
    let found = source.$fastController || notifierLookup.get(source);
    if (found === void 0) {
      if (Array.isArray(source)) {
        found = createArrayObserver(source);
      } else {
        notifierLookup.set(source, found = new PropertyChangeNotifier(source));
      }
    }
    return found;
  }
  const getAccessors = createMetadataLocator();
  class DefaultObservableAccessor {
    constructor(name) {
      this.name = name;
      this.field = `_${name}`;
      this.callback = `${name}Changed`;
    }
    getValue(source) {
      if (watcher !== void 0) {
        watcher.watch(source, this.name);
      }
      return source[this.field];
    }
    setValue(source, newValue) {
      const field = this.field;
      const oldValue = source[field];
      if (oldValue !== newValue) {
        source[field] = newValue;
        const callback = source[this.callback];
        if (typeof callback === "function") {
          callback.call(source, oldValue, newValue);
        }
        getNotifier(source).notify(this.name);
      }
    }
  }
  class BindingObserverImplementation extends SubscriberSet {
    constructor(binding, initialSubscriber, isVolatileBinding = false) {
      super(binding, initialSubscriber);
      this.binding = binding;
      this.isVolatileBinding = isVolatileBinding;
      this.needsRefresh = true;
      this.needsQueue = true;
      this.first = this;
      this.last = null;
      this.propertySource = void 0;
      this.propertyName = void 0;
      this.notifier = void 0;
      this.next = void 0;
    }
    observe(source, context) {
      if (this.needsRefresh && this.last !== null) {
        this.disconnect();
      }
      const previousWatcher = watcher;
      watcher = this.needsRefresh ? this : void 0;
      this.needsRefresh = this.isVolatileBinding;
      const result = this.binding(source, context);
      watcher = previousWatcher;
      return result;
    }
    disconnect() {
      if (this.last !== null) {
        let current = this.first;
        while (current !== void 0) {
          current.notifier.unsubscribe(this, current.propertyName);
          current = current.next;
        }
        this.last = null;
        this.needsRefresh = this.needsQueue = true;
      }
    }
    watch(propertySource, propertyName) {
      const prev = this.last;
      const notifier = getNotifier(propertySource);
      const current = prev === null ? this.first : {};
      current.propertySource = propertySource;
      current.propertyName = propertyName;
      current.notifier = notifier;
      notifier.subscribe(this, propertyName);
      if (prev !== null) {
        if (!this.needsRefresh) {
          let prevValue;
          watcher = void 0;
          prevValue = prev.propertySource[prev.propertyName];
          watcher = this;
          if (propertySource === prevValue) {
            this.needsRefresh = true;
          }
        }
        prev.next = current;
      }
      this.last = current;
    }
    handleChange() {
      if (this.needsQueue) {
        this.needsQueue = false;
        queueUpdate(this);
      }
    }
    call() {
      if (this.last !== null) {
        this.needsQueue = true;
        this.notify(this);
      }
    }
    records() {
      let next = this.first;
      return {
        next: () => {
          const current = next;
          if (current === void 0) {
            return { value: void 0, done: true };
          } else {
            next = next.next;
            return {
              value: current,
              done: false
            };
          }
        },
        [Symbol.iterator]: function() {
          return this;
        }
      };
    }
  }
  return Object.freeze({
    /**
     * @internal
     * @param factory - The factory used to create array observers.
     */
    setArrayObserverFactory(factory) {
      createArrayObserver = factory;
    },
    /**
     * Gets a notifier for an object or Array.
     * @param source - The object or Array to get the notifier for.
     */
    getNotifier,
    /**
     * Records a property change for a source object.
     * @param source - The object to record the change against.
     * @param propertyName - The property to track as changed.
     */
    track(source, propertyName) {
      if (watcher !== void 0) {
        watcher.watch(source, propertyName);
      }
    },
    /**
     * Notifies watchers that the currently executing property getter or function is volatile
     * with respect to its observable dependencies.
     */
    trackVolatile() {
      if (watcher !== void 0) {
        watcher.needsRefresh = true;
      }
    },
    /**
     * Notifies subscribers of a source object of changes.
     * @param source - the object to notify of changes.
     * @param args - The change args to pass to subscribers.
     */
    notify(source, args) {
      getNotifier(source).notify(args);
    },
    /**
     * Defines an observable property on an object or prototype.
     * @param target - The target object to define the observable on.
     * @param nameOrAccessor - The name of the property to define as observable;
     * or a custom accessor that specifies the property name and accessor implementation.
     */
    defineProperty(target2, nameOrAccessor) {
      if (typeof nameOrAccessor === "string") {
        nameOrAccessor = new DefaultObservableAccessor(nameOrAccessor);
      }
      getAccessors(target2).push(nameOrAccessor);
      Reflect.defineProperty(target2, nameOrAccessor.name, {
        enumerable: true,
        get: function() {
          return nameOrAccessor.getValue(this);
        },
        set: function(newValue) {
          nameOrAccessor.setValue(this, newValue);
        }
      });
    },
    /**
     * Finds all the observable accessors defined on the target,
     * including its prototype chain.
     * @param target - The target object to search for accessor on.
     */
    getAccessors,
    /**
     * Creates a {@link BindingObserver} that can watch the
     * provided {@link Binding} for changes.
     * @param binding - The binding to observe.
     * @param initialSubscriber - An initial subscriber to changes in the binding value.
     * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
     */
    binding(binding, initialSubscriber, isVolatileBinding = this.isVolatileBinding(binding)) {
      return new BindingObserverImplementation(binding, initialSubscriber, isVolatileBinding);
    },
    /**
     * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
     * on every evaluation of the value.
     * @param binding - The binding to inspect.
     */
    isVolatileBinding(binding) {
      return volatileRegex.test(binding.toString());
    }
  });
});
function observable$1(target2, nameOrAccessor) {
  Observable.defineProperty(target2, nameOrAccessor);
}
function volatile(target2, name, descriptor) {
  return Object.assign({}, descriptor, {
    get: function() {
      Observable.trackVolatile();
      return descriptor.get.apply(this);
    }
  });
}
const contextEvent = FAST.getById(3, () => {
  let current = null;
  return {
    get() {
      return current;
    },
    set(event) {
      current = event;
    }
  };
});
class ExecutionContext {
  constructor() {
    this.index = 0;
    this.length = 0;
    this.parent = null;
    this.parentContext = null;
  }
  /**
   * The current event within an event handler.
   */
  get event() {
    return contextEvent.get();
  }
  /**
   * Indicates whether the current item within a repeat context
   * has an even index.
   */
  get isEven() {
    return this.index % 2 === 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * has an odd index.
   */
  get isOdd() {
    return this.index % 2 !== 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is the first item in the collection.
   */
  get isFirst() {
    return this.index === 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is somewhere in the middle of the collection.
   */
  get isInMiddle() {
    return !this.isFirst && !this.isLast;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is the last item in the collection.
   */
  get isLast() {
    return this.index === this.length - 1;
  }
  /**
   * Sets the event for the current execution context.
   * @param event - The event to set.
   * @internal
   */
  static setEvent(event) {
    contextEvent.set(event);
  }
}
Observable.defineProperty(ExecutionContext.prototype, "index");
Observable.defineProperty(ExecutionContext.prototype, "length");
const defaultExecutionContext = Object.seal(new ExecutionContext());
class HTMLDirective {
  constructor() {
    this.targetIndex = 0;
  }
}
class TargetedHTMLDirective extends HTMLDirective {
  constructor() {
    super(...arguments);
    this.createPlaceholder = DOM.createInterpolationPlaceholder;
  }
}
class AttachedBehaviorHTMLDirective extends HTMLDirective {
  /**
   *
   * @param name - The name of the behavior; used as a custom attribute on the element.
   * @param behavior - The behavior to instantiate and attach to the element.
   * @param options - Options to pass to the behavior during creation.
   */
  constructor(name, behavior, options) {
    super();
    this.name = name;
    this.behavior = behavior;
    this.options = options;
  }
  /**
   * Creates a placeholder string based on the directive's index within the template.
   * @param index - The index of the directive within the template.
   * @remarks
   * Creates a custom attribute placeholder.
   */
  createPlaceholder(index) {
    return DOM.createCustomAttributePlaceholder(this.name, index);
  }
  /**
   * Creates a behavior for the provided target node.
   * @param target - The node instance to create the behavior for.
   * @remarks
   * Creates an instance of the `behavior` type this directive was constructed with
   * and passes the target and options to that `behavior`'s constructor.
   */
  createBehavior(target2) {
    return new this.behavior(target2, this.options);
  }
}
function normalBind(source, context) {
  this.source = source;
  this.context = context;
  if (this.bindingObserver === null) {
    this.bindingObserver = Observable.binding(this.binding, this, this.isBindingVolatile);
  }
  this.updateTarget(this.bindingObserver.observe(source, context));
}
function triggerBind(source, context) {
  this.source = source;
  this.context = context;
  this.target.addEventListener(this.targetName, this);
}
function normalUnbind() {
  this.bindingObserver.disconnect();
  this.source = null;
  this.context = null;
}
function contentUnbind() {
  this.bindingObserver.disconnect();
  this.source = null;
  this.context = null;
  const view = this.target.$fastView;
  if (view !== void 0 && view.isComposed) {
    view.unbind();
    view.needsBindOnly = true;
  }
}
function triggerUnbind() {
  this.target.removeEventListener(this.targetName, this);
  this.source = null;
  this.context = null;
}
function updateAttributeTarget(value) {
  DOM.setAttribute(this.target, this.targetName, value);
}
function updateBooleanAttributeTarget(value) {
  DOM.setBooleanAttribute(this.target, this.targetName, value);
}
function updateContentTarget(value) {
  if (value === null || value === void 0) {
    value = "";
  }
  if (value.create) {
    this.target.textContent = "";
    let view = this.target.$fastView;
    if (view === void 0) {
      view = value.create();
    } else {
      if (this.target.$fastTemplate !== value) {
        if (view.isComposed) {
          view.remove();
          view.unbind();
        }
        view = value.create();
      }
    }
    if (!view.isComposed) {
      view.isComposed = true;
      view.bind(this.source, this.context);
      view.insertBefore(this.target);
      this.target.$fastView = view;
      this.target.$fastTemplate = value;
    } else if (view.needsBindOnly) {
      view.needsBindOnly = false;
      view.bind(this.source, this.context);
    }
  } else {
    const view = this.target.$fastView;
    if (view !== void 0 && view.isComposed) {
      view.isComposed = false;
      view.remove();
      if (view.needsBindOnly) {
        view.needsBindOnly = false;
      } else {
        view.unbind();
      }
    }
    this.target.textContent = value;
  }
}
function updatePropertyTarget(value) {
  this.target[this.targetName] = value;
}
function updateClassTarget(value) {
  const classVersions = this.classVersions || /* @__PURE__ */ Object.create(null);
  const target2 = this.target;
  let version = this.version || 0;
  if (value !== null && value !== void 0 && value.length) {
    const names = value.split(/\s+/);
    for (let i = 0, ii = names.length; i < ii; ++i) {
      const currentName = names[i];
      if (currentName === "") {
        continue;
      }
      classVersions[currentName] = version;
      target2.classList.add(currentName);
    }
  }
  this.classVersions = classVersions;
  this.version = version + 1;
  if (version === 0) {
    return;
  }
  version -= 1;
  for (const name in classVersions) {
    if (classVersions[name] === version) {
      target2.classList.remove(name);
    }
  }
}
class HTMLBindingDirective extends TargetedHTMLDirective {
  /**
   * Creates an instance of BindingDirective.
   * @param binding - A binding that returns the data used to update the DOM.
   */
  constructor(binding) {
    super();
    this.binding = binding;
    this.bind = normalBind;
    this.unbind = normalUnbind;
    this.updateTarget = updateAttributeTarget;
    this.isBindingVolatile = Observable.isVolatileBinding(this.binding);
  }
  /**
   * Gets/sets the name of the attribute or property that this
   * binding is targeting.
   */
  get targetName() {
    return this.originalTargetName;
  }
  set targetName(value) {
    this.originalTargetName = value;
    if (value === void 0) {
      return;
    }
    switch (value[0]) {
      case ":":
        this.cleanedTargetName = value.substr(1);
        this.updateTarget = updatePropertyTarget;
        if (this.cleanedTargetName === "innerHTML") {
          const binding = this.binding;
          this.binding = (s2, c2) => DOM.createHTML(binding(s2, c2));
        }
        break;
      case "?":
        this.cleanedTargetName = value.substr(1);
        this.updateTarget = updateBooleanAttributeTarget;
        break;
      case "@":
        this.cleanedTargetName = value.substr(1);
        this.bind = triggerBind;
        this.unbind = triggerUnbind;
        break;
      default:
        this.cleanedTargetName = value;
        if (value === "class") {
          this.updateTarget = updateClassTarget;
        }
        break;
    }
  }
  /**
   * Makes this binding target the content of an element rather than
   * a particular attribute or property.
   */
  targetAtContent() {
    this.updateTarget = updateContentTarget;
    this.unbind = contentUnbind;
  }
  /**
   * Creates the runtime BindingBehavior instance based on the configuration
   * information stored in the BindingDirective.
   * @param target - The target node that the binding behavior should attach to.
   */
  createBehavior(target2) {
    return new BindingBehavior(target2, this.binding, this.isBindingVolatile, this.bind, this.unbind, this.updateTarget, this.cleanedTargetName);
  }
}
class BindingBehavior {
  /**
   * Creates an instance of BindingBehavior.
   * @param target - The target of the data updates.
   * @param binding - The binding that returns the latest value for an update.
   * @param isBindingVolatile - Indicates whether the binding has volatile dependencies.
   * @param bind - The operation to perform during binding.
   * @param unbind - The operation to perform during unbinding.
   * @param updateTarget - The operation to perform when updating.
   * @param targetName - The name of the target attribute or property to update.
   */
  constructor(target2, binding, isBindingVolatile, bind, unbind, updateTarget, targetName) {
    this.source = null;
    this.context = null;
    this.bindingObserver = null;
    this.target = target2;
    this.binding = binding;
    this.isBindingVolatile = isBindingVolatile;
    this.bind = bind;
    this.unbind = unbind;
    this.updateTarget = updateTarget;
    this.targetName = targetName;
  }
  /** @internal */
  handleChange() {
    this.updateTarget(this.bindingObserver.observe(this.source, this.context));
  }
  /** @internal */
  handleEvent(event) {
    ExecutionContext.setEvent(event);
    const result = this.binding(this.source, this.context);
    ExecutionContext.setEvent(null);
    if (result !== true) {
      event.preventDefault();
    }
  }
}
let sharedContext = null;
class CompilationContext {
  addFactory(factory) {
    factory.targetIndex = this.targetIndex;
    this.behaviorFactories.push(factory);
  }
  captureContentBinding(directive) {
    directive.targetAtContent();
    this.addFactory(directive);
  }
  reset() {
    this.behaviorFactories = [];
    this.targetIndex = -1;
  }
  release() {
    sharedContext = this;
  }
  static borrow(directives) {
    const shareable = sharedContext || new CompilationContext();
    shareable.directives = directives;
    shareable.reset();
    sharedContext = null;
    return shareable;
  }
}
function createAggregateBinding(parts) {
  if (parts.length === 1) {
    return parts[0];
  }
  let targetName;
  const partCount = parts.length;
  const finalParts = parts.map((x) => {
    if (typeof x === "string") {
      return () => x;
    }
    targetName = x.targetName || targetName;
    return x.binding;
  });
  const binding = (scope, context) => {
    let output = "";
    for (let i = 0; i < partCount; ++i) {
      output += finalParts[i](scope, context);
    }
    return output;
  };
  const directive = new HTMLBindingDirective(binding);
  directive.targetName = targetName;
  return directive;
}
const interpolationEndLength = _interpolationEnd.length;
function parseContent(context, value) {
  const valueParts = value.split(_interpolationStart);
  if (valueParts.length === 1) {
    return null;
  }
  const bindingParts = [];
  for (let i = 0, ii = valueParts.length; i < ii; ++i) {
    const current = valueParts[i];
    const index = current.indexOf(_interpolationEnd);
    let literal;
    if (index === -1) {
      literal = current;
    } else {
      const directiveIndex = parseInt(current.substring(0, index));
      bindingParts.push(context.directives[directiveIndex]);
      literal = current.substring(index + interpolationEndLength);
    }
    if (literal !== "") {
      bindingParts.push(literal);
    }
  }
  return bindingParts;
}
function compileAttributes(context, node, includeBasicValues = false) {
  const attributes = node.attributes;
  for (let i = 0, ii = attributes.length; i < ii; ++i) {
    const attr2 = attributes[i];
    const attrValue = attr2.value;
    const parseResult = parseContent(context, attrValue);
    let result = null;
    if (parseResult === null) {
      if (includeBasicValues) {
        result = new HTMLBindingDirective(() => attrValue);
        result.targetName = attr2.name;
      }
    } else {
      result = createAggregateBinding(parseResult);
    }
    if (result !== null) {
      node.removeAttributeNode(attr2);
      i--;
      ii--;
      context.addFactory(result);
    }
  }
}
function compileContent(context, node, walker) {
  const parseResult = parseContent(context, node.textContent);
  if (parseResult !== null) {
    let lastNode = node;
    for (let i = 0, ii = parseResult.length; i < ii; ++i) {
      const currentPart = parseResult[i];
      const currentNode = i === 0 ? node : lastNode.parentNode.insertBefore(document.createTextNode(""), lastNode.nextSibling);
      if (typeof currentPart === "string") {
        currentNode.textContent = currentPart;
      } else {
        currentNode.textContent = " ";
        context.captureContentBinding(currentPart);
      }
      lastNode = currentNode;
      context.targetIndex++;
      if (currentNode !== node) {
        walker.nextNode();
      }
    }
    context.targetIndex--;
  }
}
function compileTemplate(template, directives) {
  const fragment = template.content;
  document.adoptNode(fragment);
  const context = CompilationContext.borrow(directives);
  compileAttributes(context, template, true);
  const hostBehaviorFactories = context.behaviorFactories;
  context.reset();
  const walker = DOM.createTemplateWalker(fragment);
  let node;
  while (node = walker.nextNode()) {
    context.targetIndex++;
    switch (node.nodeType) {
      case 1:
        compileAttributes(context, node);
        break;
      case 3:
        compileContent(context, node, walker);
        break;
      case 8:
        if (DOM.isMarker(node)) {
          context.addFactory(directives[DOM.extractDirectiveIndexFromMarker(node)]);
        }
    }
  }
  let targetOffset = 0;
  if (
    // If the first node in a fragment is a marker, that means it's an unstable first node,
    // because something like a when, repeat, etc. could add nodes before the marker.
    // To mitigate this, we insert a stable first node. However, if we insert a node,
    // that will alter the result of the TreeWalker. So, we also need to offset the target index.
    DOM.isMarker(fragment.firstChild) || // Or if there is only one node and a directive, it means the template's content
    // is *only* the directive. In that case, HTMLView.dispose() misses any nodes inserted by
    // the directive. Inserting a new node ensures proper disposal of nodes added by the directive.
    fragment.childNodes.length === 1 && directives.length
  ) {
    fragment.insertBefore(document.createComment(""), fragment.firstChild);
    targetOffset = -1;
  }
  const viewBehaviorFactories = context.behaviorFactories;
  context.release();
  return {
    fragment,
    viewBehaviorFactories,
    hostBehaviorFactories,
    targetOffset
  };
}
const range = document.createRange();
class HTMLView {
  /**
   * Constructs an instance of HTMLView.
   * @param fragment - The html fragment that contains the nodes for this view.
   * @param behaviors - The behaviors to be applied to this view.
   */
  constructor(fragment, behaviors) {
    this.fragment = fragment;
    this.behaviors = behaviors;
    this.source = null;
    this.context = null;
    this.firstChild = fragment.firstChild;
    this.lastChild = fragment.lastChild;
  }
  /**
   * Appends the view's DOM nodes to the referenced node.
   * @param node - The parent node to append the view's DOM nodes to.
   */
  appendTo(node) {
    node.appendChild(this.fragment);
  }
  /**
   * Inserts the view's DOM nodes before the referenced node.
   * @param node - The node to insert the view's DOM before.
   */
  insertBefore(node) {
    if (this.fragment.hasChildNodes()) {
      node.parentNode.insertBefore(this.fragment, node);
    } else {
      const end = this.lastChild;
      if (node.previousSibling === end)
        return;
      const parentNode = node.parentNode;
      let current = this.firstChild;
      let next;
      while (current !== end) {
        next = current.nextSibling;
        parentNode.insertBefore(current, node);
        current = next;
      }
      parentNode.insertBefore(end, node);
    }
  }
  /**
   * Removes the view's DOM nodes.
   * The nodes are not disposed and the view can later be re-inserted.
   */
  remove() {
    const fragment = this.fragment;
    const end = this.lastChild;
    let current = this.firstChild;
    let next;
    while (current !== end) {
      next = current.nextSibling;
      fragment.appendChild(current);
      current = next;
    }
    fragment.appendChild(end);
  }
  /**
   * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
   * Once a view has been disposed, it cannot be inserted or bound again.
   */
  dispose() {
    const parent = this.firstChild.parentNode;
    const end = this.lastChild;
    let current = this.firstChild;
    let next;
    while (current !== end) {
      next = current.nextSibling;
      parent.removeChild(current);
      current = next;
    }
    parent.removeChild(end);
    const behaviors = this.behaviors;
    const oldSource = this.source;
    for (let i = 0, ii = behaviors.length; i < ii; ++i) {
      behaviors[i].unbind(oldSource);
    }
  }
  /**
   * Binds a view's behaviors to its binding source.
   * @param source - The binding source for the view's binding behaviors.
   * @param context - The execution context to run the behaviors within.
   */
  bind(source, context) {
    const behaviors = this.behaviors;
    if (this.source === source) {
      return;
    } else if (this.source !== null) {
      const oldSource = this.source;
      this.source = source;
      this.context = context;
      for (let i = 0, ii = behaviors.length; i < ii; ++i) {
        const current = behaviors[i];
        current.unbind(oldSource);
        current.bind(source, context);
      }
    } else {
      this.source = source;
      this.context = context;
      for (let i = 0, ii = behaviors.length; i < ii; ++i) {
        behaviors[i].bind(source, context);
      }
    }
  }
  /**
   * Unbinds a view's behaviors from its binding source.
   */
  unbind() {
    if (this.source === null) {
      return;
    }
    const behaviors = this.behaviors;
    const oldSource = this.source;
    for (let i = 0, ii = behaviors.length; i < ii; ++i) {
      behaviors[i].unbind(oldSource);
    }
    this.source = null;
  }
  /**
   * Efficiently disposes of a contiguous range of synthetic view instances.
   * @param views - A contiguous range of views to be disposed.
   */
  static disposeContiguousBatch(views) {
    if (views.length === 0) {
      return;
    }
    range.setStartBefore(views[0].firstChild);
    range.setEndAfter(views[views.length - 1].lastChild);
    range.deleteContents();
    for (let i = 0, ii = views.length; i < ii; ++i) {
      const view = views[i];
      const behaviors = view.behaviors;
      const oldSource = view.source;
      for (let j = 0, jj = behaviors.length; j < jj; ++j) {
        behaviors[j].unbind(oldSource);
      }
    }
  }
}
class ViewTemplate {
  /**
   * Creates an instance of ViewTemplate.
   * @param html - The html representing what this template will instantiate, including placeholders for directives.
   * @param directives - The directives that will be connected to placeholders in the html.
   */
  constructor(html2, directives) {
    this.behaviorCount = 0;
    this.hasHostBehaviors = false;
    this.fragment = null;
    this.targetOffset = 0;
    this.viewBehaviorFactories = null;
    this.hostBehaviorFactories = null;
    this.html = html2;
    this.directives = directives;
  }
  /**
   * Creates an HTMLView instance based on this template definition.
   * @param hostBindingTarget - The element that host behaviors will be bound to.
   */
  create(hostBindingTarget) {
    if (this.fragment === null) {
      let template;
      const html2 = this.html;
      if (typeof html2 === "string") {
        template = document.createElement("template");
        template.innerHTML = DOM.createHTML(html2);
        const fec = template.content.firstElementChild;
        if (fec !== null && fec.tagName === "TEMPLATE") {
          template = fec;
        }
      } else {
        template = html2;
      }
      const result = compileTemplate(template, this.directives);
      this.fragment = result.fragment;
      this.viewBehaviorFactories = result.viewBehaviorFactories;
      this.hostBehaviorFactories = result.hostBehaviorFactories;
      this.targetOffset = result.targetOffset;
      this.behaviorCount = this.viewBehaviorFactories.length + this.hostBehaviorFactories.length;
      this.hasHostBehaviors = this.hostBehaviorFactories.length > 0;
    }
    const fragment = this.fragment.cloneNode(true);
    const viewFactories = this.viewBehaviorFactories;
    const behaviors = new Array(this.behaviorCount);
    const walker = DOM.createTemplateWalker(fragment);
    let behaviorIndex = 0;
    let targetIndex = this.targetOffset;
    let node = walker.nextNode();
    for (let ii = viewFactories.length; behaviorIndex < ii; ++behaviorIndex) {
      const factory = viewFactories[behaviorIndex];
      const factoryIndex = factory.targetIndex;
      while (node !== null) {
        if (targetIndex === factoryIndex) {
          behaviors[behaviorIndex] = factory.createBehavior(node);
          break;
        } else {
          node = walker.nextNode();
          targetIndex++;
        }
      }
    }
    if (this.hasHostBehaviors) {
      const hostFactories = this.hostBehaviorFactories;
      for (let i = 0, ii = hostFactories.length; i < ii; ++i, ++behaviorIndex) {
        behaviors[behaviorIndex] = hostFactories[i].createBehavior(hostBindingTarget);
      }
    }
    return new HTMLView(fragment, behaviors);
  }
  /**
   * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
   * @param source - The data source to bind the template to.
   * @param host - The Element where the template will be rendered.
   * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
   * host that the template is being attached to.
   */
  render(source, host, hostBindingTarget) {
    if (typeof host === "string") {
      host = document.getElementById(host);
    }
    if (hostBindingTarget === void 0) {
      hostBindingTarget = host;
    }
    const view = this.create(hostBindingTarget);
    view.bind(source, defaultExecutionContext);
    view.appendTo(host);
    return view;
  }
}
const lastAttributeNameRegex = (
  /* eslint-disable-next-line no-control-regex */
  /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
);
function html(strings, ...values) {
  const directives = [];
  let html2 = "";
  for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
    const currentString = strings[i];
    let value = values[i];
    html2 += currentString;
    if (value instanceof ViewTemplate) {
      const template = value;
      value = () => template;
    }
    if (typeof value === "function") {
      value = new HTMLBindingDirective(value);
    }
    if (value instanceof TargetedHTMLDirective) {
      const match = lastAttributeNameRegex.exec(currentString);
      if (match !== null) {
        value.targetName = match[2];
      }
    }
    if (value instanceof HTMLDirective) {
      html2 += value.createPlaceholder(directives.length);
      directives.push(value);
    } else {
      html2 += value;
    }
  }
  html2 += strings[strings.length - 1];
  return new ViewTemplate(html2, directives);
}
class ElementStyles {
  constructor() {
    this.targets = /* @__PURE__ */ new WeakSet();
  }
  /** @internal */
  addStylesTo(target2) {
    this.targets.add(target2);
  }
  /** @internal */
  removeStylesFrom(target2) {
    this.targets.delete(target2);
  }
  /** @internal */
  isAttachedTo(target2) {
    return this.targets.has(target2);
  }
  /**
   * Associates behaviors with this set of styles.
   * @param behaviors - The behaviors to associate.
   */
  withBehaviors(...behaviors) {
    this.behaviors = this.behaviors === null ? behaviors : this.behaviors.concat(behaviors);
    return this;
  }
}
ElementStyles.create = (() => {
  if (DOM.supportsAdoptedStyleSheets) {
    const styleSheetCache = /* @__PURE__ */ new Map();
    return (styles2) => (
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      new AdoptedStyleSheetsStyles(styles2, styleSheetCache)
    );
  }
  return (styles2) => new StyleElementStyles(styles2);
})();
function reduceStyles(styles2) {
  return styles2.map((x) => x instanceof ElementStyles ? reduceStyles(x.styles) : [x]).reduce((prev, curr) => prev.concat(curr), []);
}
function reduceBehaviors(styles2) {
  return styles2.map((x) => x instanceof ElementStyles ? x.behaviors : null).reduce((prev, curr) => {
    if (curr === null) {
      return prev;
    }
    if (prev === null) {
      prev = [];
    }
    return prev.concat(curr);
  }, null);
}
let addAdoptedStyleSheets = (target2, sheets) => {
  target2.adoptedStyleSheets = [...target2.adoptedStyleSheets, ...sheets];
};
let removeAdoptedStyleSheets = (target2, sheets) => {
  target2.adoptedStyleSheets = target2.adoptedStyleSheets.filter((x) => sheets.indexOf(x) === -1);
};
if (DOM.supportsAdoptedStyleSheets) {
  try {
    document.adoptedStyleSheets.push();
    document.adoptedStyleSheets.splice();
    addAdoptedStyleSheets = (target2, sheets) => {
      target2.adoptedStyleSheets.push(...sheets);
    };
    removeAdoptedStyleSheets = (target2, sheets) => {
      for (const sheet of sheets) {
        const index = target2.adoptedStyleSheets.indexOf(sheet);
        if (index !== -1) {
          target2.adoptedStyleSheets.splice(index, 1);
        }
      }
    };
  } catch (e2) {
  }
}
class AdoptedStyleSheetsStyles extends ElementStyles {
  constructor(styles2, styleSheetCache) {
    super();
    this.styles = styles2;
    this.styleSheetCache = styleSheetCache;
    this._styleSheets = void 0;
    this.behaviors = reduceBehaviors(styles2);
  }
  get styleSheets() {
    if (this._styleSheets === void 0) {
      const styles2 = this.styles;
      const styleSheetCache = this.styleSheetCache;
      this._styleSheets = reduceStyles(styles2).map((x) => {
        if (x instanceof CSSStyleSheet) {
          return x;
        }
        let sheet = styleSheetCache.get(x);
        if (sheet === void 0) {
          sheet = new CSSStyleSheet();
          sheet.replaceSync(x);
          styleSheetCache.set(x, sheet);
        }
        return sheet;
      });
    }
    return this._styleSheets;
  }
  addStylesTo(target2) {
    addAdoptedStyleSheets(target2, this.styleSheets);
    super.addStylesTo(target2);
  }
  removeStylesFrom(target2) {
    removeAdoptedStyleSheets(target2, this.styleSheets);
    super.removeStylesFrom(target2);
  }
}
let styleClassId = 0;
function getNextStyleClass() {
  return `fast-style-class-${++styleClassId}`;
}
class StyleElementStyles extends ElementStyles {
  constructor(styles2) {
    super();
    this.styles = styles2;
    this.behaviors = null;
    this.behaviors = reduceBehaviors(styles2);
    this.styleSheets = reduceStyles(styles2);
    this.styleClass = getNextStyleClass();
  }
  addStylesTo(target2) {
    const styleSheets = this.styleSheets;
    const styleClass = this.styleClass;
    target2 = this.normalizeTarget(target2);
    for (let i = 0; i < styleSheets.length; i++) {
      const element = document.createElement("style");
      element.innerHTML = styleSheets[i];
      element.className = styleClass;
      target2.append(element);
    }
    super.addStylesTo(target2);
  }
  removeStylesFrom(target2) {
    target2 = this.normalizeTarget(target2);
    const styles2 = target2.querySelectorAll(`.${this.styleClass}`);
    for (let i = 0, ii = styles2.length; i < ii; ++i) {
      target2.removeChild(styles2[i]);
    }
    super.removeStylesFrom(target2);
  }
  isAttachedTo(target2) {
    return super.isAttachedTo(this.normalizeTarget(target2));
  }
  normalizeTarget(target2) {
    return target2 === document ? document.body : target2;
  }
}
const AttributeConfiguration = Object.freeze({
  /**
   * Locates all attribute configurations associated with a type.
   */
  locate: createMetadataLocator()
});
const booleanConverter = {
  toView(value) {
    return value ? "true" : "false";
  },
  fromView(value) {
    if (value === null || value === void 0 || value === "false" || value === false || value === 0) {
      return false;
    }
    return true;
  }
};
const nullableNumberConverter = {
  toView(value) {
    if (value === null || value === void 0) {
      return null;
    }
    const number = value * 1;
    return isNaN(number) ? null : number.toString();
  },
  fromView(value) {
    if (value === null || value === void 0) {
      return null;
    }
    const number = value * 1;
    return isNaN(number) ? null : number;
  }
};
class AttributeDefinition {
  /**
   * Creates an instance of AttributeDefinition.
   * @param Owner - The class constructor that owns this attribute.
   * @param name - The name of the property associated with the attribute.
   * @param attribute - The name of the attribute in HTML.
   * @param mode - The {@link AttributeMode} that describes the behavior of this attribute.
   * @param converter - A {@link ValueConverter} that integrates with the property getter/setter
   * to convert values to and from a DOM string.
   */
  constructor(Owner, name, attribute = name.toLowerCase(), mode = "reflect", converter) {
    this.guards = /* @__PURE__ */ new Set();
    this.Owner = Owner;
    this.name = name;
    this.attribute = attribute;
    this.mode = mode;
    this.converter = converter;
    this.fieldName = `_${name}`;
    this.callbackName = `${name}Changed`;
    this.hasCallback = this.callbackName in Owner.prototype;
    if (mode === "boolean" && converter === void 0) {
      this.converter = booleanConverter;
    }
  }
  /**
   * Sets the value of the attribute/property on the source element.
   * @param source - The source element to access.
   * @param value - The value to set the attribute/property to.
   */
  setValue(source, newValue) {
    const oldValue = source[this.fieldName];
    const converter = this.converter;
    if (converter !== void 0) {
      newValue = converter.fromView(newValue);
    }
    if (oldValue !== newValue) {
      source[this.fieldName] = newValue;
      this.tryReflectToAttribute(source);
      if (this.hasCallback) {
        source[this.callbackName](oldValue, newValue);
      }
      source.$fastController.notify(this.name);
    }
  }
  /**
   * Gets the value of the attribute/property on the source element.
   * @param source - The source element to access.
   */
  getValue(source) {
    Observable.track(source, this.name);
    return source[this.fieldName];
  }
  /** @internal */
  onAttributeChangedCallback(element, value) {
    if (this.guards.has(element)) {
      return;
    }
    this.guards.add(element);
    this.setValue(element, value);
    this.guards.delete(element);
  }
  tryReflectToAttribute(element) {
    const mode = this.mode;
    const guards = this.guards;
    if (guards.has(element) || mode === "fromView") {
      return;
    }
    DOM.queueUpdate(() => {
      guards.add(element);
      const latestValue = element[this.fieldName];
      switch (mode) {
        case "reflect":
          const converter = this.converter;
          DOM.setAttribute(element, this.attribute, converter !== void 0 ? converter.toView(latestValue) : latestValue);
          break;
        case "boolean":
          DOM.setBooleanAttribute(element, this.attribute, latestValue);
          break;
      }
      guards.delete(element);
    });
  }
  /**
   * Collects all attribute definitions associated with the owner.
   * @param Owner - The class constructor to collect attribute for.
   * @param attributeLists - Any existing attributes to collect and merge with those associated with the owner.
   * @internal
   */
  static collect(Owner, ...attributeLists) {
    const attributes = [];
    attributeLists.push(AttributeConfiguration.locate(Owner));
    for (let i = 0, ii = attributeLists.length; i < ii; ++i) {
      const list = attributeLists[i];
      if (list === void 0) {
        continue;
      }
      for (let j = 0, jj = list.length; j < jj; ++j) {
        const config = list[j];
        if (typeof config === "string") {
          attributes.push(new AttributeDefinition(Owner, config));
        } else {
          attributes.push(new AttributeDefinition(Owner, config.property, config.attribute, config.mode, config.converter));
        }
      }
    }
    return attributes;
  }
}
function attr(configOrTarget, prop) {
  let config;
  function decorator($target, $prop) {
    if (arguments.length > 1) {
      config.property = $prop;
    }
    AttributeConfiguration.locate($target.constructor).push(config);
  }
  if (arguments.length > 1) {
    config = {};
    decorator(configOrTarget, prop);
    return;
  }
  config = configOrTarget === void 0 ? {} : configOrTarget;
  return decorator;
}
const defaultShadowOptions = { mode: "open" };
const defaultElementOptions = {};
const fastRegistry = FAST.getById(4, () => {
  const typeToDefinition = /* @__PURE__ */ new Map();
  return Object.freeze({
    register(definition) {
      if (typeToDefinition.has(definition.type)) {
        return false;
      }
      typeToDefinition.set(definition.type, definition);
      return true;
    },
    getByType(key) {
      return typeToDefinition.get(key);
    }
  });
});
class FASTElementDefinition {
  /**
   * Creates an instance of FASTElementDefinition.
   * @param type - The type this definition is being created for.
   * @param nameOrConfig - The name of the element to define or a config object
   * that describes the element to define.
   */
  constructor(type, nameOrConfig = type.definition) {
    if (typeof nameOrConfig === "string") {
      nameOrConfig = { name: nameOrConfig };
    }
    this.type = type;
    this.name = nameOrConfig.name;
    this.template = nameOrConfig.template;
    const attributes = AttributeDefinition.collect(type, nameOrConfig.attributes);
    const observedAttributes = new Array(attributes.length);
    const propertyLookup = {};
    const attributeLookup = {};
    for (let i = 0, ii = attributes.length; i < ii; ++i) {
      const current = attributes[i];
      observedAttributes[i] = current.attribute;
      propertyLookup[current.name] = current;
      attributeLookup[current.attribute] = current;
    }
    this.attributes = attributes;
    this.observedAttributes = observedAttributes;
    this.propertyLookup = propertyLookup;
    this.attributeLookup = attributeLookup;
    this.shadowOptions = nameOrConfig.shadowOptions === void 0 ? defaultShadowOptions : nameOrConfig.shadowOptions === null ? void 0 : Object.assign(Object.assign({}, defaultShadowOptions), nameOrConfig.shadowOptions);
    this.elementOptions = nameOrConfig.elementOptions === void 0 ? defaultElementOptions : Object.assign(Object.assign({}, defaultElementOptions), nameOrConfig.elementOptions);
    this.styles = nameOrConfig.styles === void 0 ? void 0 : Array.isArray(nameOrConfig.styles) ? ElementStyles.create(nameOrConfig.styles) : nameOrConfig.styles instanceof ElementStyles ? nameOrConfig.styles : ElementStyles.create([nameOrConfig.styles]);
  }
  /**
   * Indicates if this element has been defined in at least one registry.
   */
  get isDefined() {
    return !!fastRegistry.getByType(this.type);
  }
  /**
   * Defines a custom element based on this definition.
   * @param registry - The element registry to define the element in.
   */
  define(registry = customElements) {
    const type = this.type;
    if (fastRegistry.register(this)) {
      const attributes = this.attributes;
      const proto = type.prototype;
      for (let i = 0, ii = attributes.length; i < ii; ++i) {
        Observable.defineProperty(proto, attributes[i]);
      }
      Reflect.defineProperty(type, "observedAttributes", {
        value: this.observedAttributes,
        enumerable: true
      });
    }
    if (!registry.get(this.name)) {
      registry.define(this.name, type, this.elementOptions);
    }
    return this;
  }
}
FASTElementDefinition.forType = fastRegistry.getByType;
const shadowRoots = /* @__PURE__ */ new WeakMap();
const defaultEventOptions = {
  bubbles: true,
  composed: true,
  cancelable: true
};
function getShadowRoot(element) {
  return element.shadowRoot || shadowRoots.get(element) || null;
}
class Controller extends PropertyChangeNotifier {
  /**
   * Creates a Controller to control the specified element.
   * @param element - The element to be controlled by this controller.
   * @param definition - The element definition metadata that instructs this
   * controller in how to handle rendering and other platform integrations.
   * @internal
   */
  constructor(element, definition) {
    super(element);
    this.boundObservables = null;
    this.behaviors = null;
    this.needsInitialization = true;
    this._template = null;
    this._styles = null;
    this._isConnected = false;
    this.$fastController = this;
    this.view = null;
    this.element = element;
    this.definition = definition;
    const shadowOptions = definition.shadowOptions;
    if (shadowOptions !== void 0) {
      const shadowRoot = element.attachShadow(shadowOptions);
      if (shadowOptions.mode === "closed") {
        shadowRoots.set(element, shadowRoot);
      }
    }
    const accessors = Observable.getAccessors(element);
    if (accessors.length > 0) {
      const boundObservables = this.boundObservables = /* @__PURE__ */ Object.create(null);
      for (let i = 0, ii = accessors.length; i < ii; ++i) {
        const propertyName = accessors[i].name;
        const value = element[propertyName];
        if (value !== void 0) {
          delete element[propertyName];
          boundObservables[propertyName] = value;
        }
      }
    }
  }
  /**
   * Indicates whether or not the custom element has been
   * connected to the document.
   */
  get isConnected() {
    Observable.track(this, "isConnected");
    return this._isConnected;
  }
  setIsConnected(value) {
    this._isConnected = value;
    Observable.notify(this, "isConnected");
  }
  /**
   * Gets/sets the template used to render the component.
   * @remarks
   * This value can only be accurately read after connect but can be set at any time.
   */
  get template() {
    return this._template;
  }
  set template(value) {
    if (this._template === value) {
      return;
    }
    this._template = value;
    if (!this.needsInitialization) {
      this.renderTemplate(value);
    }
  }
  /**
   * Gets/sets the primary styles used for the component.
   * @remarks
   * This value can only be accurately read after connect but can be set at any time.
   */
  get styles() {
    return this._styles;
  }
  set styles(value) {
    if (this._styles === value) {
      return;
    }
    if (this._styles !== null) {
      this.removeStyles(this._styles);
    }
    this._styles = value;
    if (!this.needsInitialization && value !== null) {
      this.addStyles(value);
    }
  }
  /**
   * Adds styles to this element. Providing an HTMLStyleElement will attach the element instance to the shadowRoot.
   * @param styles - The styles to add.
   */
  addStyles(styles2) {
    const target2 = getShadowRoot(this.element) || this.element.getRootNode();
    if (styles2 instanceof HTMLStyleElement) {
      target2.append(styles2);
    } else if (!styles2.isAttachedTo(target2)) {
      const sourceBehaviors = styles2.behaviors;
      styles2.addStylesTo(target2);
      if (sourceBehaviors !== null) {
        this.addBehaviors(sourceBehaviors);
      }
    }
  }
  /**
   * Removes styles from this element. Providing an HTMLStyleElement will detach the element instance from the shadowRoot.
   * @param styles - the styles to remove.
   */
  removeStyles(styles2) {
    const target2 = getShadowRoot(this.element) || this.element.getRootNode();
    if (styles2 instanceof HTMLStyleElement) {
      target2.removeChild(styles2);
    } else if (styles2.isAttachedTo(target2)) {
      const sourceBehaviors = styles2.behaviors;
      styles2.removeStylesFrom(target2);
      if (sourceBehaviors !== null) {
        this.removeBehaviors(sourceBehaviors);
      }
    }
  }
  /**
   * Adds behaviors to this element.
   * @param behaviors - The behaviors to add.
   */
  addBehaviors(behaviors) {
    const targetBehaviors = this.behaviors || (this.behaviors = /* @__PURE__ */ new Map());
    const length = behaviors.length;
    const behaviorsToBind = [];
    for (let i = 0; i < length; ++i) {
      const behavior = behaviors[i];
      if (targetBehaviors.has(behavior)) {
        targetBehaviors.set(behavior, targetBehaviors.get(behavior) + 1);
      } else {
        targetBehaviors.set(behavior, 1);
        behaviorsToBind.push(behavior);
      }
    }
    if (this._isConnected) {
      const element = this.element;
      for (let i = 0; i < behaviorsToBind.length; ++i) {
        behaviorsToBind[i].bind(element, defaultExecutionContext);
      }
    }
  }
  /**
   * Removes behaviors from this element.
   * @param behaviors - The behaviors to remove.
   * @param force - Forces unbinding of behaviors.
   */
  removeBehaviors(behaviors, force = false) {
    const targetBehaviors = this.behaviors;
    if (targetBehaviors === null) {
      return;
    }
    const length = behaviors.length;
    const behaviorsToUnbind = [];
    for (let i = 0; i < length; ++i) {
      const behavior = behaviors[i];
      if (targetBehaviors.has(behavior)) {
        const count = targetBehaviors.get(behavior) - 1;
        count === 0 || force ? targetBehaviors.delete(behavior) && behaviorsToUnbind.push(behavior) : targetBehaviors.set(behavior, count);
      }
    }
    if (this._isConnected) {
      const element = this.element;
      for (let i = 0; i < behaviorsToUnbind.length; ++i) {
        behaviorsToUnbind[i].unbind(element);
      }
    }
  }
  /**
   * Runs connected lifecycle behavior on the associated element.
   */
  onConnectedCallback() {
    if (this._isConnected) {
      return;
    }
    const element = this.element;
    if (this.needsInitialization) {
      this.finishInitialization();
    } else if (this.view !== null) {
      this.view.bind(element, defaultExecutionContext);
    }
    const behaviors = this.behaviors;
    if (behaviors !== null) {
      for (const [behavior] of behaviors) {
        behavior.bind(element, defaultExecutionContext);
      }
    }
    this.setIsConnected(true);
  }
  /**
   * Runs disconnected lifecycle behavior on the associated element.
   */
  onDisconnectedCallback() {
    if (!this._isConnected) {
      return;
    }
    this.setIsConnected(false);
    const view = this.view;
    if (view !== null) {
      view.unbind();
    }
    const behaviors = this.behaviors;
    if (behaviors !== null) {
      const element = this.element;
      for (const [behavior] of behaviors) {
        behavior.unbind(element);
      }
    }
  }
  /**
   * Runs the attribute changed callback for the associated element.
   * @param name - The name of the attribute that changed.
   * @param oldValue - The previous value of the attribute.
   * @param newValue - The new value of the attribute.
   */
  onAttributeChangedCallback(name, oldValue, newValue) {
    const attrDef = this.definition.attributeLookup[name];
    if (attrDef !== void 0) {
      attrDef.onAttributeChangedCallback(this.element, newValue);
    }
  }
  /**
   * Emits a custom HTML event.
   * @param type - The type name of the event.
   * @param detail - The event detail object to send with the event.
   * @param options - The event options. By default bubbles and composed.
   * @remarks
   * Only emits events if connected.
   */
  emit(type, detail, options) {
    if (this._isConnected) {
      return this.element.dispatchEvent(new CustomEvent(type, Object.assign(Object.assign({ detail }, defaultEventOptions), options)));
    }
    return false;
  }
  finishInitialization() {
    const element = this.element;
    const boundObservables = this.boundObservables;
    if (boundObservables !== null) {
      const propertyNames = Object.keys(boundObservables);
      for (let i = 0, ii = propertyNames.length; i < ii; ++i) {
        const propertyName = propertyNames[i];
        element[propertyName] = boundObservables[propertyName];
      }
      this.boundObservables = null;
    }
    const definition = this.definition;
    if (this._template === null) {
      if (this.element.resolveTemplate) {
        this._template = this.element.resolveTemplate();
      } else if (definition.template) {
        this._template = definition.template || null;
      }
    }
    if (this._template !== null) {
      this.renderTemplate(this._template);
    }
    if (this._styles === null) {
      if (this.element.resolveStyles) {
        this._styles = this.element.resolveStyles();
      } else if (definition.styles) {
        this._styles = definition.styles || null;
      }
    }
    if (this._styles !== null) {
      this.addStyles(this._styles);
    }
    this.needsInitialization = false;
  }
  renderTemplate(template) {
    const element = this.element;
    const host = getShadowRoot(element) || element;
    if (this.view !== null) {
      this.view.dispose();
      this.view = null;
    } else if (!this.needsInitialization) {
      DOM.removeChildNodes(host);
    }
    if (template) {
      this.view = template.render(element, host, element);
    }
  }
  /**
   * Locates or creates a controller for the specified element.
   * @param element - The element to return the controller for.
   * @remarks
   * The specified element must have a {@link FASTElementDefinition}
   * registered either through the use of the {@link customElement}
   * decorator or a call to `FASTElement.define`.
   */
  static forCustomElement(element) {
    const controller = element.$fastController;
    if (controller !== void 0) {
      return controller;
    }
    const definition = FASTElementDefinition.forType(element.constructor);
    if (definition === void 0) {
      throw new Error("Missing FASTElement definition.");
    }
    return element.$fastController = new Controller(element, definition);
  }
}
function createFASTElement(BaseType) {
  return class extends BaseType {
    constructor() {
      super();
      Controller.forCustomElement(this);
    }
    $emit(type, detail, options) {
      return this.$fastController.emit(type, detail, options);
    }
    connectedCallback() {
      this.$fastController.onConnectedCallback();
    }
    disconnectedCallback() {
      this.$fastController.onDisconnectedCallback();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this.$fastController.onAttributeChangedCallback(name, oldValue, newValue);
    }
  };
}
const FASTElement = Object.assign(createFASTElement(HTMLElement), {
  /**
   * Creates a new FASTElement base class inherited from the
   * provided base type.
   * @param BaseType - The base element type to inherit from.
   */
  from(BaseType) {
    return createFASTElement(BaseType);
  },
  /**
   * Defines a platform custom element based on the provided type and definition.
   * @param type - The custom element type to define.
   * @param nameOrDef - The name of the element to define or a definition object
   * that describes the element to define.
   */
  define(type, nameOrDef) {
    return new FASTElementDefinition(type, nameOrDef).define().type;
  }
});
class CSSDirective {
  /**
   * Creates a CSS fragment to interpolate into the CSS document.
   * @returns - the string to interpolate into CSS
   */
  createCSS() {
    return "";
  }
  /**
   * Creates a behavior to bind to the host element.
   * @returns - the behavior to bind to the host element, or undefined.
   */
  createBehavior() {
    return void 0;
  }
}
function collectStyles(strings, values) {
  const styles2 = [];
  let cssString = "";
  const behaviors = [];
  for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
    cssString += strings[i];
    let value = values[i];
    if (value instanceof CSSDirective) {
      const behavior = value.createBehavior();
      value = value.createCSS();
      if (behavior) {
        behaviors.push(behavior);
      }
    }
    if (value instanceof ElementStyles || value instanceof CSSStyleSheet) {
      if (cssString.trim() !== "") {
        styles2.push(cssString);
        cssString = "";
      }
      styles2.push(value);
    } else {
      cssString += value;
    }
  }
  cssString += strings[strings.length - 1];
  if (cssString.trim() !== "") {
    styles2.push(cssString);
  }
  return {
    styles: styles2,
    behaviors
  };
}
function css(strings, ...values) {
  const { styles: styles2, behaviors } = collectStyles(strings, values);
  const elementStyles = ElementStyles.create(styles2);
  if (behaviors.length) {
    elementStyles.withBehaviors(...behaviors);
  }
  return elementStyles;
}
class CSSPartial extends CSSDirective {
  constructor(styles2, behaviors) {
    super();
    this.behaviors = behaviors;
    this.css = "";
    const stylesheets = styles2.reduce((accumulated, current) => {
      if (typeof current === "string") {
        this.css += current;
      } else {
        accumulated.push(current);
      }
      return accumulated;
    }, []);
    if (stylesheets.length) {
      this.styles = ElementStyles.create(stylesheets);
    }
  }
  createBehavior() {
    return this;
  }
  createCSS() {
    return this.css;
  }
  bind(el) {
    if (this.styles) {
      el.$fastController.addStyles(this.styles);
    }
    if (this.behaviors.length) {
      el.$fastController.addBehaviors(this.behaviors);
    }
  }
  unbind(el) {
    if (this.styles) {
      el.$fastController.removeStyles(this.styles);
    }
    if (this.behaviors.length) {
      el.$fastController.removeBehaviors(this.behaviors);
    }
  }
}
function cssPartial(strings, ...values) {
  const { styles: styles2, behaviors } = collectStyles(strings, values);
  return new CSSPartial(styles2, behaviors);
}
class RefBehavior {
  /**
   * Creates an instance of RefBehavior.
   * @param target - The element to reference.
   * @param propertyName - The name of the property to assign the reference to.
   */
  constructor(target2, propertyName) {
    this.target = target2;
    this.propertyName = propertyName;
  }
  /**
   * Bind this behavior to the source.
   * @param source - The source to bind to.
   * @param context - The execution context that the binding is operating within.
   */
  bind(source) {
    source[this.propertyName] = this.target;
  }
  /**
   * Unbinds this behavior from the source.
   * @param source - The source to unbind from.
   */
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  unbind() {
  }
}
function ref(propertyName) {
  return new AttachedBehaviorHTMLDirective("fast-ref", RefBehavior, propertyName);
}
const isFunction$1 = (object2) => typeof object2 === "function";
const noTemplate = () => null;
function normalizeBinding(value) {
  return value === void 0 ? noTemplate : isFunction$1(value) ? value : () => value;
}
function when(binding, templateOrTemplateBinding, elseTemplateOrTemplateBinding) {
  const dataBinding = isFunction$1(binding) ? binding : () => binding;
  const templateBinding = normalizeBinding(templateOrTemplateBinding);
  const elseBinding = normalizeBinding(elseTemplateOrTemplateBinding);
  return (source, context) => dataBinding(source, context) ? templateBinding(source, context) : elseBinding(source, context);
}
class NodeObservationBehavior {
  /**
   * Creates an instance of NodeObservationBehavior.
   * @param target - The target to assign the nodes property on.
   * @param options - The options to use in configuring node observation.
   */
  constructor(target2, options) {
    this.target = target2;
    this.options = options;
    this.source = null;
  }
  /**
   * Bind this behavior to the source.
   * @param source - The source to bind to.
   * @param context - The execution context that the binding is operating within.
   */
  bind(source) {
    const name = this.options.property;
    this.shouldUpdate = Observable.getAccessors(source).some((x) => x.name === name);
    this.source = source;
    this.updateTarget(this.computeNodes());
    if (this.shouldUpdate) {
      this.observe();
    }
  }
  /**
   * Unbinds this behavior from the source.
   * @param source - The source to unbind from.
   */
  unbind() {
    this.updateTarget(emptyArray);
    this.source = null;
    if (this.shouldUpdate) {
      this.disconnect();
    }
  }
  /** @internal */
  handleEvent() {
    this.updateTarget(this.computeNodes());
  }
  computeNodes() {
    let nodes = this.getNodes();
    if (this.options.filter !== void 0) {
      nodes = nodes.filter(this.options.filter);
    }
    return nodes;
  }
  updateTarget(value) {
    this.source[this.options.property] = value;
  }
}
class SlottedBehavior extends NodeObservationBehavior {
  /**
   * Creates an instance of SlottedBehavior.
   * @param target - The slot element target to observe.
   * @param options - The options to use when observing the slot.
   */
  constructor(target2, options) {
    super(target2, options);
  }
  /**
   * Begins observation of the nodes.
   */
  observe() {
    this.target.addEventListener("slotchange", this);
  }
  /**
   * Disconnects observation of the nodes.
   */
  disconnect() {
    this.target.removeEventListener("slotchange", this);
  }
  /**
   * Retrieves the nodes that should be assigned to the target.
   */
  getNodes() {
    return this.target.assignedNodes(this.options);
  }
}
function slotted(propertyOrOptions) {
  if (typeof propertyOrOptions === "string") {
    propertyOrOptions = { property: propertyOrOptions };
  }
  return new AttachedBehaviorHTMLDirective("fast-slotted", SlottedBehavior, propertyOrOptions);
}
class StartEnd {
  handleStartContentChange() {
    this.startContainer.classList.toggle("start", this.start.assignedNodes().length > 0);
  }
  handleEndContentChange() {
    this.endContainer.classList.toggle("end", this.end.assignedNodes().length > 0);
  }
}
const endSlotTemplate = (context, definition) => html`
    <span
        part="end"
        ${ref("endContainer")}
        class=${(x) => definition.end ? "end" : void 0}
    >
        <slot name="end" ${ref("end")} @slotchange="${(x) => x.handleEndContentChange()}">
            ${definition.end || ""}
        </slot>
    </span>
`;
const startSlotTemplate = (context, definition) => html`
    <span
        part="start"
        ${ref("startContainer")}
        class="${(x) => definition.start ? "start" : void 0}"
    >
        <slot
            name="start"
            ${ref("start")}
            @slotchange="${(x) => x.handleStartContentChange()}"
        >
            ${definition.start || ""}
        </slot>
    </span>
`;
html`
    <span part="end" ${ref("endContainer")}>
        <slot
            name="end"
            ${ref("end")}
            @slotchange="${(x) => x.handleEndContentChange()}"
        ></slot>
    </span>
`;
html`
    <span part="start" ${ref("startContainer")}>
        <slot
            name="start"
            ${ref("start")}
            @slotchange="${(x) => x.handleStartContentChange()}"
        ></slot>
    </span>
`;
const metadataByTarget = /* @__PURE__ */ new Map();
if (!("metadata" in Reflect)) {
  Reflect.metadata = function(key, value) {
    return function(target2) {
      Reflect.defineMetadata(key, value, target2);
    };
  };
  Reflect.defineMetadata = function(key, value, target2) {
    let metadata = metadataByTarget.get(target2);
    if (metadata === void 0) {
      metadataByTarget.set(target2, metadata = /* @__PURE__ */ new Map());
    }
    metadata.set(key, value);
  };
  Reflect.getOwnMetadata = function(key, target2) {
    const metadata = metadataByTarget.get(target2);
    if (metadata !== void 0) {
      return metadata.get(key);
    }
    return void 0;
  };
}
class ResolverBuilder {
  /**
   *
   * @param container - The container to create resolvers for.
   * @param key - The key to register resolvers under.
   */
  constructor(container2, key) {
    this.container = container2;
    this.key = key;
  }
  /**
   * Creates a resolver for an existing object instance.
   * @param value - The instance to resolve.
   * @returns The resolver.
   */
  instance(value) {
    return this.registerResolver(0, value);
  }
  /**
   * Creates a resolver that enforces a singleton lifetime.
   * @param value - The type to create and cache the singleton for.
   * @returns The resolver.
   */
  singleton(value) {
    return this.registerResolver(1, value);
  }
  /**
   * Creates a resolver that creates a new instance for every dependency request.
   * @param value - The type to create instances of.
   * @returns - The resolver.
   */
  transient(value) {
    return this.registerResolver(2, value);
  }
  /**
   * Creates a resolver that invokes a callback function for every dependency resolution
   * request, allowing custom logic to return the dependency.
   * @param value - The callback to call during resolution.
   * @returns The resolver.
   */
  callback(value) {
    return this.registerResolver(3, value);
  }
  /**
   * Creates a resolver that invokes a callback function the first time that a dependency
   * resolution is requested. The returned value is then cached and provided for all
   * subsequent requests.
   * @param value - The callback to call during the first resolution.
   * @returns The resolver.
   */
  cachedCallback(value) {
    return this.registerResolver(3, cacheCallbackResult(value));
  }
  /**
   * Aliases the current key to a different key.
   * @param destinationKey - The key to point the alias to.
   * @returns The resolver.
   */
  aliasTo(destinationKey) {
    return this.registerResolver(5, destinationKey);
  }
  registerResolver(strategy, state) {
    const { container: container2, key } = this;
    this.container = this.key = void 0;
    return container2.registerResolver(key, new ResolverImpl(key, strategy, state));
  }
}
function cloneArrayWithPossibleProps(source) {
  const clone = source.slice();
  const keys = Object.keys(source);
  const len = keys.length;
  let key;
  for (let i = 0; i < len; ++i) {
    key = keys[i];
    if (!isArrayIndex(key)) {
      clone[key] = source[key];
    }
  }
  return clone;
}
const DefaultResolver = Object.freeze({
  /**
   * Disables auto-registration and throws for all un-registered dependencies.
   * @param key - The key to create the resolver for.
   */
  none(key) {
    throw Error(`${key.toString()} not registered, did you forget to add @singleton()?`);
  },
  /**
   * Provides default singleton resolution behavior during auto-registration.
   * @param key - The key to create the resolver for.
   * @returns The resolver.
   */
  singleton(key) {
    return new ResolverImpl(key, 1, key);
  },
  /**
   * Provides default transient resolution behavior during auto-registration.
   * @param key - The key to create the resolver for.
   * @returns The resolver.
   */
  transient(key) {
    return new ResolverImpl(key, 2, key);
  }
});
const ContainerConfiguration = Object.freeze({
  /**
   * The default configuration used when creating a DOM-disconnected container.
   * @remarks
   * The default creates a root container, with no parent container. It does not handle
   * owner requests and it uses singleton resolution behavior for auto-registration.
   */
  default: Object.freeze({
    parentLocator: () => null,
    responsibleForOwnerRequests: false,
    defaultResolver: DefaultResolver.singleton
  })
});
const dependencyLookup = /* @__PURE__ */ new Map();
function getParamTypes(key) {
  return (Type) => {
    return Reflect.getOwnMetadata(key, Type);
  };
}
let rootDOMContainer = null;
const DI$1 = Object.freeze({
  /**
   * Creates a new dependency injection container.
   * @param config - The configuration for the container.
   * @returns A newly created dependency injection container.
   */
  createContainer(config) {
    return new ContainerImpl(null, Object.assign({}, ContainerConfiguration.default, config));
  },
  /**
   * Finds the dependency injection container responsible for providing dependencies
   * to the specified node.
   * @param node - The node to find the responsible container for.
   * @returns The container responsible for providing dependencies to the node.
   * @remarks
   * This will be the same as the parent container if the specified node
   * does not itself host a container configured with responsibleForOwnerRequests.
   */
  findResponsibleContainer(node) {
    const owned = node.$$container$$;
    if (owned && owned.responsibleForOwnerRequests) {
      return owned;
    }
    return DI$1.findParentContainer(node);
  },
  /**
   * Find the dependency injection container up the DOM tree from this node.
   * @param node - The node to find the parent container for.
   * @returns The parent container of this node.
   * @remarks
   * This will be the same as the responsible container if the specified node
   * does not itself host a container configured with responsibleForOwnerRequests.
   */
  findParentContainer(node) {
    const event = new CustomEvent(DILocateParentEventType, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { container: void 0 }
    });
    node.dispatchEvent(event);
    return event.detail.container || DI$1.getOrCreateDOMContainer();
  },
  /**
   * Returns a dependency injection container if one is explicitly owned by the specified
   * node. If one is not owned, then a new container is created and assigned to the node.
   * @param node - The node to find or create the container for.
   * @param config - The configuration for the container if one needs to be created.
   * @returns The located or created container.
   * @remarks
   * This API does not search for a responsible or parent container. It looks only for a container
   * directly defined on the specified node and creates one at that location if one does not
   * already exist.
   */
  getOrCreateDOMContainer(node, config) {
    if (!node) {
      return rootDOMContainer || (rootDOMContainer = new ContainerImpl(null, Object.assign({}, ContainerConfiguration.default, config, {
        parentLocator: () => null
      })));
    }
    return node.$$container$$ || new ContainerImpl(node, Object.assign({}, ContainerConfiguration.default, config, {
      parentLocator: DI$1.findParentContainer
    }));
  },
  /**
   * Gets the "design:paramtypes" metadata for the specified type.
   * @param Type - The type to get the metadata for.
   * @returns The metadata array or undefined if no metadata is found.
   */
  getDesignParamtypes: getParamTypes("design:paramtypes"),
  /**
   * Gets the "di:paramtypes" metadata for the specified type.
   * @param Type - The type to get the metadata for.
   * @returns The metadata array or undefined if no metadata is found.
   */
  getAnnotationParamtypes: getParamTypes("di:paramtypes"),
  /**
   *
   * @param Type - Gets the "di:paramtypes" metadata for the specified type. If none is found,
   * an empty metadata array is created and added.
   * @returns The metadata array.
   */
  getOrCreateAnnotationParamTypes(Type) {
    let annotationParamtypes = this.getAnnotationParamtypes(Type);
    if (annotationParamtypes === void 0) {
      Reflect.defineMetadata("di:paramtypes", annotationParamtypes = [], Type);
    }
    return annotationParamtypes;
  },
  /**
   * Gets the dependency keys representing what is needed to instantiate the specified type.
   * @param Type - The type to get the dependencies for.
   * @returns An array of dependency keys.
   */
  getDependencies(Type) {
    let dependencies = dependencyLookup.get(Type);
    if (dependencies === void 0) {
      const inject2 = Type.inject;
      if (inject2 === void 0) {
        const designParamtypes = DI$1.getDesignParamtypes(Type);
        const annotationParamtypes = DI$1.getAnnotationParamtypes(Type);
        if (designParamtypes === void 0) {
          if (annotationParamtypes === void 0) {
            const Proto = Object.getPrototypeOf(Type);
            if (typeof Proto === "function" && Proto !== Function.prototype) {
              dependencies = cloneArrayWithPossibleProps(DI$1.getDependencies(Proto));
            } else {
              dependencies = [];
            }
          } else {
            dependencies = cloneArrayWithPossibleProps(annotationParamtypes);
          }
        } else if (annotationParamtypes === void 0) {
          dependencies = cloneArrayWithPossibleProps(designParamtypes);
        } else {
          dependencies = cloneArrayWithPossibleProps(designParamtypes);
          let len = annotationParamtypes.length;
          let auAnnotationParamtype;
          for (let i = 0; i < len; ++i) {
            auAnnotationParamtype = annotationParamtypes[i];
            if (auAnnotationParamtype !== void 0) {
              dependencies[i] = auAnnotationParamtype;
            }
          }
          const keys = Object.keys(annotationParamtypes);
          len = keys.length;
          let key;
          for (let i = 0; i < len; ++i) {
            key = keys[i];
            if (!isArrayIndex(key)) {
              dependencies[key] = annotationParamtypes[key];
            }
          }
        }
      } else {
        dependencies = cloneArrayWithPossibleProps(inject2);
      }
      dependencyLookup.set(Type, dependencies);
    }
    return dependencies;
  },
  /**
   * Defines a property on a web component class. The value of this property will
   * be resolved from the dependency injection container responsible for the element
   * instance, based on where it is connected in the DOM.
   * @param target - The target to define the property on.
   * @param propertyName - The name of the property to define.
   * @param key - The dependency injection key.
   * @param respectConnection - Indicates whether or not to update the property value if the
   * hosting component is disconnected and then re-connected at a different location in the DOM.
   * @remarks
   * The respectConnection option is only applicable to elements that descend from FASTElement.
   */
  defineProperty(target2, propertyName, key, respectConnection = false) {
    const diPropertyKey = `$di_${propertyName}`;
    Reflect.defineProperty(target2, propertyName, {
      get: function() {
        let value = this[diPropertyKey];
        if (value === void 0) {
          const container2 = this instanceof HTMLElement ? DI$1.findResponsibleContainer(this) : DI$1.getOrCreateDOMContainer();
          value = container2.get(key);
          this[diPropertyKey] = value;
          if (respectConnection && this instanceof FASTElement) {
            const notifier = this.$fastController;
            const handleChange = () => {
              const newContainer = DI$1.findResponsibleContainer(this);
              const newValue = newContainer.get(key);
              const oldValue = this[diPropertyKey];
              if (newValue !== oldValue) {
                this[diPropertyKey] = value;
                notifier.notify(propertyName);
              }
            };
            notifier.subscribe({ handleChange }, "isConnected");
          }
        }
        return value;
      }
    });
  },
  /**
   * Creates a dependency injection key.
   * @param nameConfigOrCallback - A friendly name for the key or a lambda that configures a
   * default resolution for the dependency.
   * @param configuror - If a friendly name was provided for the first parameter, then an optional
   * lambda that configures a default resolution for the dependency can be provided second.
   * @returns The created key.
   * @remarks
   * The created key can be used as a property decorator or constructor parameter decorator,
   * in addition to its standard use in an inject array or through direct container APIs.
   */
  createInterface(nameConfigOrCallback, configuror) {
    const configure2 = typeof nameConfigOrCallback === "function" ? nameConfigOrCallback : configuror;
    const friendlyName = typeof nameConfigOrCallback === "string" ? nameConfigOrCallback : nameConfigOrCallback && "friendlyName" in nameConfigOrCallback ? nameConfigOrCallback.friendlyName || defaultFriendlyName : defaultFriendlyName;
    const respectConnection = typeof nameConfigOrCallback === "string" ? false : nameConfigOrCallback && "respectConnection" in nameConfigOrCallback ? nameConfigOrCallback.respectConnection || false : false;
    const Interface = function(target2, property, index) {
      if (target2 == null || new.target !== void 0) {
        throw new Error(`No registration for interface: '${Interface.friendlyName}'`);
      }
      if (property) {
        DI$1.defineProperty(target2, property, Interface, respectConnection);
      } else {
        const annotationParamtypes = DI$1.getOrCreateAnnotationParamTypes(target2);
        annotationParamtypes[index] = Interface;
      }
    };
    Interface.$isInterface = true;
    Interface.friendlyName = friendlyName == null ? "(anonymous)" : friendlyName;
    if (configure2 != null) {
      Interface.register = function(container2, key) {
        return configure2(new ResolverBuilder(container2, key !== null && key !== void 0 ? key : Interface));
      };
    }
    Interface.toString = function toString2() {
      return `InterfaceSymbol<${Interface.friendlyName}>`;
    };
    return Interface;
  },
  /**
   * A decorator that specifies what to inject into its target.
   * @param dependencies - The dependencies to inject.
   * @returns The decorator to be applied to the target class.
   * @remarks
   * The decorator can be used to decorate a class, listing all of the classes dependencies.
   * Or it can be used to decorate a constructor paramter, indicating what to inject for that
   * parameter.
   * Or it can be used for a web component property, indicating what that property should resolve to.
   */
  inject(...dependencies) {
    return function(target2, key, descriptor) {
      if (typeof descriptor === "number") {
        const annotationParamtypes = DI$1.getOrCreateAnnotationParamTypes(target2);
        const dep = dependencies[0];
        if (dep !== void 0) {
          annotationParamtypes[descriptor] = dep;
        }
      } else if (key) {
        DI$1.defineProperty(target2, key, dependencies[0]);
      } else {
        const annotationParamtypes = descriptor ? DI$1.getOrCreateAnnotationParamTypes(descriptor.value) : DI$1.getOrCreateAnnotationParamTypes(target2);
        let dep;
        for (let i = 0; i < dependencies.length; ++i) {
          dep = dependencies[i];
          if (dep !== void 0) {
            annotationParamtypes[i] = dep;
          }
        }
      }
    };
  },
  /**
   * Registers the `target` class as a transient dependency; each time the dependency is resolved
   * a new instance will be created.
   *
   * @param target - The class / constructor function to register as transient.
   * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
   *
   * @example
   * On an existing class
   * ```ts
   * class Foo { }
   * DI.transient(Foo);
   * ```
   *
   * @example
   * Inline declaration
   *
   * ```ts
   * const Foo = DI.transient(class { });
   * // Foo is now strongly typed with register
   * Foo.register(container);
   * ```
   *
   * @public
   */
  transient(target2) {
    target2.register = function register(container2) {
      const registration = Registration.transient(target2, target2);
      return registration.register(container2);
    };
    target2.registerInRequestor = false;
    return target2;
  },
  /**
   * Registers the `target` class as a singleton dependency; the class will only be created once. Each
   * consecutive time the dependency is resolved, the same instance will be returned.
   *
   * @param target - The class / constructor function to register as a singleton.
   * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
   * @example
   * On an existing class
   * ```ts
   * class Foo { }
   * DI.singleton(Foo);
   * ```
   *
   * @example
   * Inline declaration
   * ```ts
   * const Foo = DI.singleton(class { });
   * // Foo is now strongly typed with register
   * Foo.register(container);
   * ```
   *
   * @public
   */
  singleton(target2, options = defaultSingletonOptions) {
    target2.register = function register(container2) {
      const registration = Registration.singleton(target2, target2);
      return registration.register(container2);
    };
    target2.registerInRequestor = options.scoped;
    return target2;
  }
});
const Container = DI$1.createInterface("Container");
DI$1.inject;
const defaultSingletonOptions = { scoped: false };
class ResolverImpl {
  constructor(key, strategy, state) {
    this.key = key;
    this.strategy = strategy;
    this.state = state;
    this.resolving = false;
  }
  get $isResolver() {
    return true;
  }
  register(container2) {
    return container2.registerResolver(this.key, this);
  }
  resolve(handler, requestor) {
    switch (this.strategy) {
      case 0:
        return this.state;
      case 1: {
        if (this.resolving) {
          throw new Error(`Cyclic dependency found: ${this.state.name}`);
        }
        this.resolving = true;
        this.state = handler.getFactory(this.state).construct(requestor);
        this.strategy = 0;
        this.resolving = false;
        return this.state;
      }
      case 2: {
        const factory = handler.getFactory(this.state);
        if (factory === null) {
          throw new Error(`Resolver for ${String(this.key)} returned a null factory`);
        }
        return factory.construct(requestor);
      }
      case 3:
        return this.state(handler, requestor, this);
      case 4:
        return this.state[0].resolve(handler, requestor);
      case 5:
        return requestor.get(this.state);
      default:
        throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`);
    }
  }
  getFactory(container2) {
    var _a3, _b2, _c2;
    switch (this.strategy) {
      case 1:
      case 2:
        return container2.getFactory(this.state);
      case 5:
        return (_c2 = (_b2 = (_a3 = container2.getResolver(this.state)) === null || _a3 === void 0 ? void 0 : _a3.getFactory) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, container2)) !== null && _c2 !== void 0 ? _c2 : null;
      default:
        return null;
    }
  }
}
function containerGetKey(d2) {
  return this.get(d2);
}
function transformInstance(inst, transform) {
  return transform(inst);
}
class FactoryImpl {
  constructor(Type, dependencies) {
    this.Type = Type;
    this.dependencies = dependencies;
    this.transformers = null;
  }
  construct(container2, dynamicDependencies) {
    let instance;
    if (dynamicDependencies === void 0) {
      instance = new this.Type(...this.dependencies.map(containerGetKey, container2));
    } else {
      instance = new this.Type(...this.dependencies.map(containerGetKey, container2), ...dynamicDependencies);
    }
    if (this.transformers == null) {
      return instance;
    }
    return this.transformers.reduce(transformInstance, instance);
  }
  registerTransformer(transformer) {
    (this.transformers || (this.transformers = [])).push(transformer);
  }
}
const containerResolver = {
  $isResolver: true,
  resolve(handler, requestor) {
    return requestor;
  }
};
function isRegistry(obj) {
  return typeof obj.register === "function";
}
function isSelfRegistry(obj) {
  return isRegistry(obj) && typeof obj.registerInRequestor === "boolean";
}
function isRegisterInRequester(obj) {
  return isSelfRegistry(obj) && obj.registerInRequestor;
}
function isClass(obj) {
  return obj.prototype !== void 0;
}
const InstrinsicTypeNames = /* @__PURE__ */ new Set([
  "Array",
  "ArrayBuffer",
  "Boolean",
  "DataView",
  "Date",
  "Error",
  "EvalError",
  "Float32Array",
  "Float64Array",
  "Function",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Map",
  "Number",
  "Object",
  "Promise",
  "RangeError",
  "ReferenceError",
  "RegExp",
  "Set",
  "SharedArrayBuffer",
  "String",
  "SyntaxError",
  "TypeError",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "URIError",
  "WeakMap",
  "WeakSet"
]);
const DILocateParentEventType = "__DI_LOCATE_PARENT__";
const factories = /* @__PURE__ */ new Map();
class ContainerImpl {
  constructor(owner, config) {
    this.owner = owner;
    this.config = config;
    this._parent = void 0;
    this.registerDepth = 0;
    this.context = null;
    if (owner !== null) {
      owner.$$container$$ = this;
    }
    this.resolvers = /* @__PURE__ */ new Map();
    this.resolvers.set(Container, containerResolver);
    if (owner instanceof Node) {
      owner.addEventListener(DILocateParentEventType, (e2) => {
        if (e2.composedPath()[0] !== this.owner) {
          e2.detail.container = this;
          e2.stopImmediatePropagation();
        }
      });
    }
  }
  get parent() {
    if (this._parent === void 0) {
      this._parent = this.config.parentLocator(this.owner);
    }
    return this._parent;
  }
  get depth() {
    return this.parent === null ? 0 : this.parent.depth + 1;
  }
  get responsibleForOwnerRequests() {
    return this.config.responsibleForOwnerRequests;
  }
  registerWithContext(context, ...params) {
    this.context = context;
    this.register(...params);
    this.context = null;
    return this;
  }
  register(...params) {
    if (++this.registerDepth === 100) {
      throw new Error("Unable to autoregister dependency");
    }
    let current;
    let keys;
    let value;
    let j;
    let jj;
    const context = this.context;
    for (let i = 0, ii = params.length; i < ii; ++i) {
      current = params[i];
      if (!isObject$1(current)) {
        continue;
      }
      if (isRegistry(current)) {
        current.register(this, context);
      } else if (isClass(current)) {
        Registration.singleton(current, current).register(this);
      } else {
        keys = Object.keys(current);
        j = 0;
        jj = keys.length;
        for (; j < jj; ++j) {
          value = current[keys[j]];
          if (!isObject$1(value)) {
            continue;
          }
          if (isRegistry(value)) {
            value.register(this, context);
          } else {
            this.register(value);
          }
        }
      }
    }
    --this.registerDepth;
    return this;
  }
  registerResolver(key, resolver) {
    validateKey(key);
    const resolvers = this.resolvers;
    const result = resolvers.get(key);
    if (result == null) {
      resolvers.set(key, resolver);
    } else if (result instanceof ResolverImpl && result.strategy === 4) {
      result.state.push(resolver);
    } else {
      resolvers.set(key, new ResolverImpl(key, 4, [result, resolver]));
    }
    return resolver;
  }
  registerTransformer(key, transformer) {
    const resolver = this.getResolver(key);
    if (resolver == null) {
      return false;
    }
    if (resolver.getFactory) {
      const factory = resolver.getFactory(this);
      if (factory == null) {
        return false;
      }
      factory.registerTransformer(transformer);
      return true;
    }
    return false;
  }
  getResolver(key, autoRegister = true) {
    validateKey(key);
    if (key.resolve !== void 0) {
      return key;
    }
    let current = this;
    let resolver;
    while (current != null) {
      resolver = current.resolvers.get(key);
      if (resolver == null) {
        if (current.parent == null) {
          const handler = isRegisterInRequester(key) ? this : current;
          return autoRegister ? this.jitRegister(key, handler) : null;
        }
        current = current.parent;
      } else {
        return resolver;
      }
    }
    return null;
  }
  has(key, searchAncestors = false) {
    return this.resolvers.has(key) ? true : searchAncestors && this.parent != null ? this.parent.has(key, true) : false;
  }
  get(key) {
    validateKey(key);
    if (key.$isResolver) {
      return key.resolve(this, this);
    }
    let current = this;
    let resolver;
    while (current != null) {
      resolver = current.resolvers.get(key);
      if (resolver == null) {
        if (current.parent == null) {
          const handler = isRegisterInRequester(key) ? this : current;
          resolver = this.jitRegister(key, handler);
          return resolver.resolve(current, this);
        }
        current = current.parent;
      } else {
        return resolver.resolve(current, this);
      }
    }
    throw new Error(`Unable to resolve key: ${String(key)}`);
  }
  getAll(key, searchAncestors = false) {
    validateKey(key);
    const requestor = this;
    let current = requestor;
    let resolver;
    if (searchAncestors) {
      let resolutions = emptyArray;
      while (current != null) {
        resolver = current.resolvers.get(key);
        if (resolver != null) {
          resolutions = resolutions.concat(
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            buildAllResponse(resolver, current, requestor)
          );
        }
        current = current.parent;
      }
      return resolutions;
    } else {
      while (current != null) {
        resolver = current.resolvers.get(key);
        if (resolver == null) {
          current = current.parent;
          if (current == null) {
            return emptyArray;
          }
        } else {
          return buildAllResponse(resolver, current, requestor);
        }
      }
    }
    return emptyArray;
  }
  getFactory(Type) {
    let factory = factories.get(Type);
    if (factory === void 0) {
      if (isNativeFunction(Type)) {
        throw new Error(`${Type.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);
      }
      factories.set(Type, factory = new FactoryImpl(Type, DI$1.getDependencies(Type)));
    }
    return factory;
  }
  registerFactory(key, factory) {
    factories.set(key, factory);
  }
  createChild(config) {
    return new ContainerImpl(null, Object.assign({}, this.config, config, { parentLocator: () => this }));
  }
  jitRegister(keyAsValue, handler) {
    if (typeof keyAsValue !== "function") {
      throw new Error(`Attempted to jitRegister something that is not a constructor: '${keyAsValue}'. Did you forget to register this dependency?`);
    }
    if (InstrinsicTypeNames.has(keyAsValue.name)) {
      throw new Error(`Attempted to jitRegister an intrinsic type: ${keyAsValue.name}. Did you forget to add @inject(Key)`);
    }
    if (isRegistry(keyAsValue)) {
      const registrationResolver = keyAsValue.register(handler);
      if (!(registrationResolver instanceof Object) || registrationResolver.resolve == null) {
        const newResolver = handler.resolvers.get(keyAsValue);
        if (newResolver != void 0) {
          return newResolver;
        }
        throw new Error("A valid resolver was not returned from the static register method");
      }
      return registrationResolver;
    } else if (keyAsValue.$isInterface) {
      throw new Error(`Attempted to jitRegister an interface: ${keyAsValue.friendlyName}`);
    } else {
      const resolver = this.config.defaultResolver(keyAsValue, handler);
      handler.resolvers.set(keyAsValue, resolver);
      return resolver;
    }
  }
}
const cache = /* @__PURE__ */ new WeakMap();
function cacheCallbackResult(fun) {
  return function(handler, requestor, resolver) {
    if (cache.has(resolver)) {
      return cache.get(resolver);
    }
    const t2 = fun(handler, requestor, resolver);
    cache.set(resolver, t2);
    return t2;
  };
}
const Registration = Object.freeze({
  /**
   * Allows you to pass an instance.
   * Every time you request this {@link Key} you will get this instance back.
   *
   * @example
   * ```
   * Registration.instance(Foo, new Foo()));
   * ```
   *
   * @param key - The key to register the instance under.
   * @param value - The instance to return when the key is requested.
   */
  instance(key, value) {
    return new ResolverImpl(key, 0, value);
  },
  /**
   * Creates an instance from the class.
   * Every time you request this {@link Key} you will get the same one back.
   *
   * @example
   * ```
   * Registration.singleton(Foo, Foo);
   * ```
   *
   * @param key - The key to register the singleton under.
   * @param value - The class to instantiate as a singleton when first requested.
   */
  singleton(key, value) {
    return new ResolverImpl(key, 1, value);
  },
  /**
   * Creates an instance from a class.
   * Every time you request this {@link Key} you will get a new instance.
   *
   * @example
   * ```
   * Registration.instance(Foo, Foo);
   * ```
   *
   * @param key - The key to register the instance type under.
   * @param value - The class to instantiate each time the key is requested.
   */
  transient(key, value) {
    return new ResolverImpl(key, 2, value);
  },
  /**
   * Delegates to a callback function to provide the dependency.
   * Every time you request this {@link Key} the callback will be invoked to provide
   * the dependency.
   *
   * @example
   * ```
   * Registration.callback(Foo, () => new Foo());
   * Registration.callback(Bar, (c: Container) => new Bar(c.get(Foo)));
   * ```
   *
   * @param key - The key to register the callback for.
   * @param callback - The function that is expected to return the dependency.
   */
  callback(key, callback) {
    return new ResolverImpl(key, 3, callback);
  },
  /**
   * Delegates to a callback function to provide the dependency and then caches the
   * dependency for future requests.
   *
   * @example
   * ```
   * Registration.cachedCallback(Foo, () => new Foo());
   * Registration.cachedCallback(Bar, (c: Container) => new Bar(c.get(Foo)));
   * ```
   *
   * @param key - The key to register the callback for.
   * @param callback - The function that is expected to return the dependency.
   * @remarks
   * If you pass the same Registration to another container, the same cached value will be used.
   * Should all references to the resolver returned be removed, the cache will expire.
   */
  cachedCallback(key, callback) {
    return new ResolverImpl(key, 3, cacheCallbackResult(callback));
  },
  /**
   * Creates an alternate {@link Key} to retrieve an instance by.
   *
   * @example
   * ```
   * Register.singleton(Foo, Foo)
   * Register.aliasTo(Foo, MyFoos);
   *
   * container.getAll(MyFoos) // contains an instance of Foo
   * ```
   *
   * @param originalKey - The original key that has been registered.
   * @param aliasKey - The alias to the original key.
   */
  aliasTo(originalKey, aliasKey) {
    return new ResolverImpl(aliasKey, 5, originalKey);
  }
});
function validateKey(key) {
  if (key === null || key === void 0) {
    throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?");
  }
}
function buildAllResponse(resolver, handler, requestor) {
  if (resolver instanceof ResolverImpl && resolver.strategy === 4) {
    const state = resolver.state;
    let i = state.length;
    const results = new Array(i);
    while (i--) {
      results[i] = state[i].resolve(handler, requestor);
    }
    return results;
  }
  return [resolver.resolve(handler, requestor)];
}
const defaultFriendlyName = "(anonymous)";
function isObject$1(value) {
  return typeof value === "object" && value !== null || typeof value === "function";
}
const isNativeFunction = /* @__PURE__ */ function() {
  const lookup = /* @__PURE__ */ new WeakMap();
  let isNative = false;
  let sourceText = "";
  let i = 0;
  return function(fn) {
    isNative = lookup.get(fn);
    if (isNative === void 0) {
      sourceText = fn.toString();
      i = sourceText.length;
      isNative = // 29 is the length of 'function () { [native code] }' which is the smallest length of a native function string
      i >= 29 && // 100 seems to be a safe upper bound of the max length of a native function. In Chrome and FF it's 56, in Edge it's 61.
      i <= 100 && // This whole heuristic *could* be tricked by a comment. Do we need to care about that?
      sourceText.charCodeAt(i - 1) === 125 && // }
      // TODO: the spec is a little vague about the precise constraints, so we do need to test this across various browsers to make sure just one whitespace is a safe assumption.
      sourceText.charCodeAt(i - 2) <= 32 && // whitespace
      sourceText.charCodeAt(i - 3) === 93 && // ]
      sourceText.charCodeAt(i - 4) === 101 && // e
      sourceText.charCodeAt(i - 5) === 100 && // d
      sourceText.charCodeAt(i - 6) === 111 && // o
      sourceText.charCodeAt(i - 7) === 99 && // c
      sourceText.charCodeAt(i - 8) === 32 && //
      sourceText.charCodeAt(i - 9) === 101 && // e
      sourceText.charCodeAt(i - 10) === 118 && // v
      sourceText.charCodeAt(i - 11) === 105 && // i
      sourceText.charCodeAt(i - 12) === 116 && // t
      sourceText.charCodeAt(i - 13) === 97 && // a
      sourceText.charCodeAt(i - 14) === 110 && // n
      sourceText.charCodeAt(i - 15) === 88;
      lookup.set(fn, isNative);
    }
    return isNative;
  };
}();
const isNumericLookup = {};
function isArrayIndex(value) {
  switch (typeof value) {
    case "number":
      return value >= 0 && (value | 0) === value;
    case "string": {
      const result = isNumericLookup[value];
      if (result !== void 0) {
        return result;
      }
      const length = value.length;
      if (length === 0) {
        return isNumericLookup[value] = false;
      }
      let ch = 0;
      for (let i = 0; i < length; ++i) {
        ch = value.charCodeAt(i);
        if (i === 0 && ch === 48 && length > 1 || ch < 48 || ch > 57) {
          return isNumericLookup[value] = false;
        }
      }
      return isNumericLookup[value] = true;
    }
    default:
      return false;
  }
}
function presentationKeyFromTag(tagName) {
  return `${tagName.toLowerCase()}:presentation`;
}
const presentationRegistry = /* @__PURE__ */ new Map();
const ComponentPresentation = Object.freeze({
  /**
   * Defines a component presentation for an element.
   * @param tagName - The element name to define the presentation for.
   * @param presentation - The presentation that will be applied to matching elements.
   * @param container - The dependency injection container to register the configuration in.
   * @public
   */
  define(tagName, presentation, container2) {
    const key = presentationKeyFromTag(tagName);
    const existing = presentationRegistry.get(key);
    if (existing === void 0) {
      presentationRegistry.set(key, presentation);
    } else {
      presentationRegistry.set(key, false);
    }
    container2.register(Registration.instance(key, presentation));
  },
  /**
   * Finds a component presentation for the specified element name,
   * searching the DOM hierarchy starting from the provided element.
   * @param tagName - The name of the element to locate the presentation for.
   * @param element - The element to begin the search from.
   * @returns The component presentation or null if none is found.
   * @public
   */
  forTag(tagName, element) {
    const key = presentationKeyFromTag(tagName);
    const existing = presentationRegistry.get(key);
    if (existing === false) {
      const container2 = DI$1.findResponsibleContainer(element);
      return container2.get(key);
    }
    return existing || null;
  }
});
class DefaultComponentPresentation {
  /**
   * Creates an instance of DefaultComponentPresentation.
   * @param template - The template to apply to the element.
   * @param styles - The styles to apply to the element.
   * @public
   */
  constructor(template, styles2) {
    this.template = template || null;
    this.styles = styles2 === void 0 ? null : Array.isArray(styles2) ? ElementStyles.create(styles2) : styles2 instanceof ElementStyles ? styles2 : ElementStyles.create([styles2]);
  }
  /**
   * Applies the presentation details to the specified element.
   * @param element - The element to apply the presentation details to.
   * @public
   */
  applyTo(element) {
    const controller = element.$fastController;
    if (controller.template === null) {
      controller.template = this.template;
    }
    if (controller.styles === null) {
      controller.styles = this.styles;
    }
  }
}
class FoundationElement extends FASTElement {
  constructor() {
    super(...arguments);
    this._presentation = void 0;
  }
  /**
   * A property which resolves the ComponentPresentation instance
   * for the current component.
   * @public
   */
  get $presentation() {
    if (this._presentation === void 0) {
      this._presentation = ComponentPresentation.forTag(this.tagName, this);
    }
    return this._presentation;
  }
  templateChanged() {
    if (this.template !== void 0) {
      this.$fastController.template = this.template;
    }
  }
  stylesChanged() {
    if (this.styles !== void 0) {
      this.$fastController.styles = this.styles;
    }
  }
  /**
   * The connected callback for this FASTElement.
   * @remarks
   * This method is invoked by the platform whenever this FoundationElement
   * becomes connected to the document.
   * @public
   */
  connectedCallback() {
    if (this.$presentation !== null) {
      this.$presentation.applyTo(this);
    }
    super.connectedCallback();
  }
  /**
   * Defines an element registry function with a set of element definition defaults.
   * @param elementDefinition - The definition of the element to create the registry
   * function for.
   * @public
   */
  static compose(elementDefinition) {
    return (overrideDefinition = {}) => new FoundationElementRegistry(this === FoundationElement ? class extends FoundationElement {
    } : this, elementDefinition, overrideDefinition);
  }
}
__decorate([
  observable$1
], FoundationElement.prototype, "template", void 0);
__decorate([
  observable$1
], FoundationElement.prototype, "styles", void 0);
function resolveOption(option, context, definition) {
  if (typeof option === "function") {
    return option(context, definition);
  }
  return option;
}
class FoundationElementRegistry {
  constructor(type, elementDefinition, overrideDefinition) {
    this.type = type;
    this.elementDefinition = elementDefinition;
    this.overrideDefinition = overrideDefinition;
    this.definition = Object.assign(Object.assign({}, this.elementDefinition), this.overrideDefinition);
  }
  register(container2, context) {
    const definition = this.definition;
    const overrideDefinition = this.overrideDefinition;
    const prefix = definition.prefix || context.elementPrefix;
    const name = `${prefix}-${definition.baseName}`;
    context.tryDefineElement({
      name,
      type: this.type,
      baseClass: this.elementDefinition.baseClass,
      callback: (x) => {
        const presentation = new DefaultComponentPresentation(resolveOption(definition.template, x, definition), resolveOption(definition.styles, x, definition));
        x.definePresentation(presentation);
        let shadowOptions = resolveOption(definition.shadowOptions, x, definition);
        if (x.shadowRootMode) {
          if (shadowOptions) {
            if (!overrideDefinition.shadowOptions) {
              shadowOptions.mode = x.shadowRootMode;
            }
          } else if (shadowOptions !== null) {
            shadowOptions = { mode: x.shadowRootMode };
          }
        }
        x.defineElement({
          elementOptions: resolveOption(definition.elementOptions, x, definition),
          shadowOptions,
          attributes: resolveOption(definition.attributes, x, definition)
        });
      }
    });
  }
}
function applyMixins(derivedCtor, ...baseCtors) {
  const derivedAttributes = AttributeConfiguration.locate(derivedCtor);
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== "constructor") {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
        );
      }
    });
    const baseAttributes = AttributeConfiguration.locate(baseCtor);
    baseAttributes.forEach((x) => derivedAttributes.push(x));
  });
}
function findLastIndex(array2, predicate) {
  let k = array2.length;
  while (k--) {
    if (predicate(array2[k], k, array2)) {
      return k;
    }
  }
  return -1;
}
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function isHTMLElement(...args) {
  return args.every((arg) => arg instanceof HTMLElement);
}
function getNonce() {
  const node = document.querySelector('meta[property="csp-nonce"]');
  if (node) {
    return node.getAttribute("content");
  } else {
    return null;
  }
}
let _canUseFocusVisible;
function canUseFocusVisible() {
  if (typeof _canUseFocusVisible === "boolean") {
    return _canUseFocusVisible;
  }
  if (!canUseDOM()) {
    _canUseFocusVisible = false;
    return _canUseFocusVisible;
  }
  const styleElement = document.createElement("style");
  const styleNonce = getNonce();
  if (styleNonce !== null) {
    styleElement.setAttribute("nonce", styleNonce);
  }
  document.head.appendChild(styleElement);
  try {
    styleElement.sheet.insertRule("foo:focus-visible {color:inherit}", 0);
    _canUseFocusVisible = true;
  } catch (e2) {
    _canUseFocusVisible = false;
  } finally {
    document.head.removeChild(styleElement);
  }
  return _canUseFocusVisible;
}
var KeyCodes;
(function(KeyCodes2) {
  KeyCodes2[KeyCodes2["alt"] = 18] = "alt";
  KeyCodes2[KeyCodes2["arrowDown"] = 40] = "arrowDown";
  KeyCodes2[KeyCodes2["arrowLeft"] = 37] = "arrowLeft";
  KeyCodes2[KeyCodes2["arrowRight"] = 39] = "arrowRight";
  KeyCodes2[KeyCodes2["arrowUp"] = 38] = "arrowUp";
  KeyCodes2[KeyCodes2["back"] = 8] = "back";
  KeyCodes2[KeyCodes2["backSlash"] = 220] = "backSlash";
  KeyCodes2[KeyCodes2["break"] = 19] = "break";
  KeyCodes2[KeyCodes2["capsLock"] = 20] = "capsLock";
  KeyCodes2[KeyCodes2["closeBracket"] = 221] = "closeBracket";
  KeyCodes2[KeyCodes2["colon"] = 186] = "colon";
  KeyCodes2[KeyCodes2["colon2"] = 59] = "colon2";
  KeyCodes2[KeyCodes2["comma"] = 188] = "comma";
  KeyCodes2[KeyCodes2["ctrl"] = 17] = "ctrl";
  KeyCodes2[KeyCodes2["delete"] = 46] = "delete";
  KeyCodes2[KeyCodes2["end"] = 35] = "end";
  KeyCodes2[KeyCodes2["enter"] = 13] = "enter";
  KeyCodes2[KeyCodes2["equals"] = 187] = "equals";
  KeyCodes2[KeyCodes2["equals2"] = 61] = "equals2";
  KeyCodes2[KeyCodes2["equals3"] = 107] = "equals3";
  KeyCodes2[KeyCodes2["escape"] = 27] = "escape";
  KeyCodes2[KeyCodes2["forwardSlash"] = 191] = "forwardSlash";
  KeyCodes2[KeyCodes2["function1"] = 112] = "function1";
  KeyCodes2[KeyCodes2["function10"] = 121] = "function10";
  KeyCodes2[KeyCodes2["function11"] = 122] = "function11";
  KeyCodes2[KeyCodes2["function12"] = 123] = "function12";
  KeyCodes2[KeyCodes2["function2"] = 113] = "function2";
  KeyCodes2[KeyCodes2["function3"] = 114] = "function3";
  KeyCodes2[KeyCodes2["function4"] = 115] = "function4";
  KeyCodes2[KeyCodes2["function5"] = 116] = "function5";
  KeyCodes2[KeyCodes2["function6"] = 117] = "function6";
  KeyCodes2[KeyCodes2["function7"] = 118] = "function7";
  KeyCodes2[KeyCodes2["function8"] = 119] = "function8";
  KeyCodes2[KeyCodes2["function9"] = 120] = "function9";
  KeyCodes2[KeyCodes2["home"] = 36] = "home";
  KeyCodes2[KeyCodes2["insert"] = 45] = "insert";
  KeyCodes2[KeyCodes2["menu"] = 93] = "menu";
  KeyCodes2[KeyCodes2["minus"] = 189] = "minus";
  KeyCodes2[KeyCodes2["minus2"] = 109] = "minus2";
  KeyCodes2[KeyCodes2["numLock"] = 144] = "numLock";
  KeyCodes2[KeyCodes2["numPad0"] = 96] = "numPad0";
  KeyCodes2[KeyCodes2["numPad1"] = 97] = "numPad1";
  KeyCodes2[KeyCodes2["numPad2"] = 98] = "numPad2";
  KeyCodes2[KeyCodes2["numPad3"] = 99] = "numPad3";
  KeyCodes2[KeyCodes2["numPad4"] = 100] = "numPad4";
  KeyCodes2[KeyCodes2["numPad5"] = 101] = "numPad5";
  KeyCodes2[KeyCodes2["numPad6"] = 102] = "numPad6";
  KeyCodes2[KeyCodes2["numPad7"] = 103] = "numPad7";
  KeyCodes2[KeyCodes2["numPad8"] = 104] = "numPad8";
  KeyCodes2[KeyCodes2["numPad9"] = 105] = "numPad9";
  KeyCodes2[KeyCodes2["numPadDivide"] = 111] = "numPadDivide";
  KeyCodes2[KeyCodes2["numPadDot"] = 110] = "numPadDot";
  KeyCodes2[KeyCodes2["numPadMinus"] = 109] = "numPadMinus";
  KeyCodes2[KeyCodes2["numPadMultiply"] = 106] = "numPadMultiply";
  KeyCodes2[KeyCodes2["numPadPlus"] = 107] = "numPadPlus";
  KeyCodes2[KeyCodes2["openBracket"] = 219] = "openBracket";
  KeyCodes2[KeyCodes2["pageDown"] = 34] = "pageDown";
  KeyCodes2[KeyCodes2["pageUp"] = 33] = "pageUp";
  KeyCodes2[KeyCodes2["period"] = 190] = "period";
  KeyCodes2[KeyCodes2["print"] = 44] = "print";
  KeyCodes2[KeyCodes2["quote"] = 222] = "quote";
  KeyCodes2[KeyCodes2["scrollLock"] = 145] = "scrollLock";
  KeyCodes2[KeyCodes2["shift"] = 16] = "shift";
  KeyCodes2[KeyCodes2["space"] = 32] = "space";
  KeyCodes2[KeyCodes2["tab"] = 9] = "tab";
  KeyCodes2[KeyCodes2["tilde"] = 192] = "tilde";
  KeyCodes2[KeyCodes2["windowsLeft"] = 91] = "windowsLeft";
  KeyCodes2[KeyCodes2["windowsOpera"] = 219] = "windowsOpera";
  KeyCodes2[KeyCodes2["windowsRight"] = 92] = "windowsRight";
})(KeyCodes || (KeyCodes = {}));
const keyArrowDown = "ArrowDown";
const keyArrowUp = "ArrowUp";
const keyEnter = "Enter";
const keyEscape = "Escape";
const keyHome = "Home";
const keyEnd = "End";
const keySpace = " ";
const keyTab = "Tab";
var Direction;
(function(Direction2) {
  Direction2["ltr"] = "ltr";
  Direction2["rtl"] = "rtl";
})(Direction || (Direction = {}));
function limit(min, max, value) {
  return Math.min(Math.max(value, min), max);
}
function inRange(value, min, max = 0) {
  [min, max] = [min, max].sort((a2, b2) => a2 - b2);
  return min <= value && value < max;
}
let uniqueIdCounter = 0;
function uniqueId(prefix = "") {
  return `${prefix}${uniqueIdCounter++}`;
}
var SystemColors;
(function(SystemColors2) {
  SystemColors2["Canvas"] = "Canvas";
  SystemColors2["CanvasText"] = "CanvasText";
  SystemColors2["LinkText"] = "LinkText";
  SystemColors2["VisitedText"] = "VisitedText";
  SystemColors2["ActiveText"] = "ActiveText";
  SystemColors2["ButtonFace"] = "ButtonFace";
  SystemColors2["ButtonText"] = "ButtonText";
  SystemColors2["Field"] = "Field";
  SystemColors2["FieldText"] = "FieldText";
  SystemColors2["Highlight"] = "Highlight";
  SystemColors2["HighlightText"] = "HighlightText";
  SystemColors2["GrayText"] = "GrayText";
})(SystemColors || (SystemColors = {}));
class ARIAGlobalStatesAndProperties {
}
__decorate([
  attr({ attribute: "aria-atomic" })
], ARIAGlobalStatesAndProperties.prototype, "ariaAtomic", void 0);
__decorate([
  attr({ attribute: "aria-busy" })
], ARIAGlobalStatesAndProperties.prototype, "ariaBusy", void 0);
__decorate([
  attr({ attribute: "aria-controls" })
], ARIAGlobalStatesAndProperties.prototype, "ariaControls", void 0);
__decorate([
  attr({ attribute: "aria-current" })
], ARIAGlobalStatesAndProperties.prototype, "ariaCurrent", void 0);
__decorate([
  attr({ attribute: "aria-describedby" })
], ARIAGlobalStatesAndProperties.prototype, "ariaDescribedby", void 0);
__decorate([
  attr({ attribute: "aria-details" })
], ARIAGlobalStatesAndProperties.prototype, "ariaDetails", void 0);
__decorate([
  attr({ attribute: "aria-disabled" })
], ARIAGlobalStatesAndProperties.prototype, "ariaDisabled", void 0);
__decorate([
  attr({ attribute: "aria-errormessage" })
], ARIAGlobalStatesAndProperties.prototype, "ariaErrormessage", void 0);
__decorate([
  attr({ attribute: "aria-flowto" })
], ARIAGlobalStatesAndProperties.prototype, "ariaFlowto", void 0);
__decorate([
  attr({ attribute: "aria-haspopup" })
], ARIAGlobalStatesAndProperties.prototype, "ariaHaspopup", void 0);
__decorate([
  attr({ attribute: "aria-hidden" })
], ARIAGlobalStatesAndProperties.prototype, "ariaHidden", void 0);
__decorate([
  attr({ attribute: "aria-invalid" })
], ARIAGlobalStatesAndProperties.prototype, "ariaInvalid", void 0);
__decorate([
  attr({ attribute: "aria-keyshortcuts" })
], ARIAGlobalStatesAndProperties.prototype, "ariaKeyshortcuts", void 0);
__decorate([
  attr({ attribute: "aria-label" })
], ARIAGlobalStatesAndProperties.prototype, "ariaLabel", void 0);
__decorate([
  attr({ attribute: "aria-labelledby" })
], ARIAGlobalStatesAndProperties.prototype, "ariaLabelledby", void 0);
__decorate([
  attr({ attribute: "aria-live" })
], ARIAGlobalStatesAndProperties.prototype, "ariaLive", void 0);
__decorate([
  attr({ attribute: "aria-owns" })
], ARIAGlobalStatesAndProperties.prototype, "ariaOwns", void 0);
__decorate([
  attr({ attribute: "aria-relevant" })
], ARIAGlobalStatesAndProperties.prototype, "ariaRelevant", void 0);
__decorate([
  attr({ attribute: "aria-roledescription" })
], ARIAGlobalStatesAndProperties.prototype, "ariaRoledescription", void 0);
const buttonTemplate = (context, definition) => html`
    <button
        class="control"
        part="control"
        ?autofocus="${(x) => x.autofocus}"
        ?disabled="${(x) => x.disabled}"
        form="${(x) => x.formId}"
        formaction="${(x) => x.formaction}"
        formenctype="${(x) => x.formenctype}"
        formmethod="${(x) => x.formmethod}"
        formnovalidate="${(x) => x.formnovalidate}"
        formtarget="${(x) => x.formtarget}"
        name="${(x) => x.name}"
        type="${(x) => x.type}"
        value="${(x) => x.value}"
        aria-atomic="${(x) => x.ariaAtomic}"
        aria-busy="${(x) => x.ariaBusy}"
        aria-controls="${(x) => x.ariaControls}"
        aria-current="${(x) => x.ariaCurrent}"
        aria-describedby="${(x) => x.ariaDescribedby}"
        aria-details="${(x) => x.ariaDetails}"
        aria-disabled="${(x) => x.ariaDisabled}"
        aria-errormessage="${(x) => x.ariaErrormessage}"
        aria-expanded="${(x) => x.ariaExpanded}"
        aria-flowto="${(x) => x.ariaFlowto}"
        aria-haspopup="${(x) => x.ariaHaspopup}"
        aria-hidden="${(x) => x.ariaHidden}"
        aria-invalid="${(x) => x.ariaInvalid}"
        aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
        aria-label="${(x) => x.ariaLabel}"
        aria-labelledby="${(x) => x.ariaLabelledby}"
        aria-live="${(x) => x.ariaLive}"
        aria-owns="${(x) => x.ariaOwns}"
        aria-pressed="${(x) => x.ariaPressed}"
        aria-relevant="${(x) => x.ariaRelevant}"
        aria-roledescription="${(x) => x.ariaRoledescription}"
        ${ref("control")}
    >
        ${startSlotTemplate(context, definition)}
        <span class="content" part="content">
            <slot ${slotted("defaultSlottedContent")}></slot>
        </span>
        ${endSlotTemplate(context, definition)}
    </button>
`;
const proxySlotName = "form-associated-proxy";
const ElementInternalsKey = "ElementInternals";
const supportsElementInternals = ElementInternalsKey in window && "setFormValue" in window[ElementInternalsKey].prototype;
const InternalsMap = /* @__PURE__ */ new WeakMap();
function FormAssociated(BaseCtor) {
  const C = class extends BaseCtor {
    constructor(...args) {
      super(...args);
      this.dirtyValue = false;
      this.disabled = false;
      this.proxyEventsToBlock = ["change", "click"];
      this.proxyInitialized = false;
      this.required = false;
      this.initialValue = this.initialValue || "";
      if (!this.elementInternals) {
        this.formResetCallback = this.formResetCallback.bind(this);
      }
    }
    /**
     * Must evaluate to true to enable elementInternals.
     * Feature detects API support and resolve respectively
     *
     * @internal
     */
    static get formAssociated() {
      return supportsElementInternals;
    }
    /**
     * Returns the validity state of the element
     *
     * @alpha
     */
    get validity() {
      return this.elementInternals ? this.elementInternals.validity : this.proxy.validity;
    }
    /**
     * Retrieve a reference to the associated form.
     * Returns null if not associated to any form.
     *
     * @alpha
     */
    get form() {
      return this.elementInternals ? this.elementInternals.form : this.proxy.form;
    }
    /**
     * Retrieve the localized validation message,
     * or custom validation message if set.
     *
     * @alpha
     */
    get validationMessage() {
      return this.elementInternals ? this.elementInternals.validationMessage : this.proxy.validationMessage;
    }
    /**
     * Whether the element will be validated when the
     * form is submitted
     */
    get willValidate() {
      return this.elementInternals ? this.elementInternals.willValidate : this.proxy.willValidate;
    }
    /**
     * A reference to all associated label elements
     */
    get labels() {
      if (this.elementInternals) {
        return Object.freeze(Array.from(this.elementInternals.labels));
      } else if (this.proxy instanceof HTMLElement && this.proxy.ownerDocument && this.id) {
        const parentLabels = this.proxy.labels;
        const forLabels = Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`));
        const labels = parentLabels ? forLabels.concat(Array.from(parentLabels)) : forLabels;
        return Object.freeze(labels);
      } else {
        return emptyArray;
      }
    }
    /**
     * Invoked when the `value` property changes
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `valueChanged` method
     * They must be sure to invoke `super.valueChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    valueChanged(previous, next) {
      this.dirtyValue = true;
      if (this.proxy instanceof HTMLElement) {
        this.proxy.value = this.value;
      }
      this.currentValue = this.value;
      this.setFormValue(this.value);
      this.validate();
    }
    currentValueChanged() {
      this.value = this.currentValue;
    }
    /**
     * Invoked when the `initialValue` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `initialValueChanged` method
     * They must be sure to invoke `super.initialValueChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    initialValueChanged(previous, next) {
      if (!this.dirtyValue) {
        this.value = this.initialValue;
        this.dirtyValue = false;
      }
    }
    /**
     * Invoked when the `disabled` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `disabledChanged` method
     * They must be sure to invoke `super.disabledChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    disabledChanged(previous, next) {
      if (this.proxy instanceof HTMLElement) {
        this.proxy.disabled = this.disabled;
      }
      DOM.queueUpdate(() => this.classList.toggle("disabled", this.disabled));
    }
    /**
     * Invoked when the `name` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `nameChanged` method
     * They must be sure to invoke `super.nameChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    nameChanged(previous, next) {
      if (this.proxy instanceof HTMLElement) {
        this.proxy.name = this.name;
      }
    }
    /**
     * Invoked when the `required` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `requiredChanged` method
     * They must be sure to invoke `super.requiredChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    requiredChanged(prev, next) {
      if (this.proxy instanceof HTMLElement) {
        this.proxy.required = this.required;
      }
      DOM.queueUpdate(() => this.classList.toggle("required", this.required));
      this.validate();
    }
    /**
     * The element internals object. Will only exist
     * in browsers supporting the attachInternals API
     */
    get elementInternals() {
      if (!supportsElementInternals) {
        return null;
      }
      let internals = InternalsMap.get(this);
      if (!internals) {
        internals = this.attachInternals();
        InternalsMap.set(this, internals);
      }
      return internals;
    }
    /**
     * @internal
     */
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keypress", this._keypressHandler);
      if (!this.value) {
        this.value = this.initialValue;
        this.dirtyValue = false;
      }
      if (!this.elementInternals) {
        this.attachProxy();
        if (this.form) {
          this.form.addEventListener("reset", this.formResetCallback);
        }
      }
    }
    /**
     * @internal
     */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.proxyEventsToBlock.forEach((name) => this.proxy.removeEventListener(name, this.stopPropagation));
      if (!this.elementInternals && this.form) {
        this.form.removeEventListener("reset", this.formResetCallback);
      }
    }
    /**
     * Return the current validity of the element.
     */
    checkValidity() {
      return this.elementInternals ? this.elementInternals.checkValidity() : this.proxy.checkValidity();
    }
    /**
     * Return the current validity of the element.
     * If false, fires an invalid event at the element.
     */
    reportValidity() {
      return this.elementInternals ? this.elementInternals.reportValidity() : this.proxy.reportValidity();
    }
    /**
     * Set the validity of the control. In cases when the elementInternals object is not
     * available (and the proxy element is used to report validity), this function will
     * do nothing unless a message is provided, at which point the setCustomValidity method
     * of the proxy element will be invoked with the provided message.
     * @param flags - Validity flags
     * @param message - Optional message to supply
     * @param anchor - Optional element used by UA to display an interactive validation UI
     */
    setValidity(flags, message, anchor) {
      if (this.elementInternals) {
        this.elementInternals.setValidity(flags, message, anchor);
      } else if (typeof message === "string") {
        this.proxy.setCustomValidity(message);
      }
    }
    /**
     * Invoked when a connected component's form or fieldset has its disabled
     * state changed.
     * @param disabled - the disabled value of the form / fieldset
     */
    formDisabledCallback(disabled) {
      this.disabled = disabled;
    }
    formResetCallback() {
      this.value = this.initialValue;
      this.dirtyValue = false;
    }
    /**
     * Attach the proxy element to the DOM
     */
    attachProxy() {
      var _a3;
      if (!this.proxyInitialized) {
        this.proxyInitialized = true;
        this.proxy.style.display = "none";
        this.proxyEventsToBlock.forEach((name) => this.proxy.addEventListener(name, this.stopPropagation));
        this.proxy.disabled = this.disabled;
        this.proxy.required = this.required;
        if (typeof this.name === "string") {
          this.proxy.name = this.name;
        }
        if (typeof this.value === "string") {
          this.proxy.value = this.value;
        }
        this.proxy.setAttribute("slot", proxySlotName);
        this.proxySlot = document.createElement("slot");
        this.proxySlot.setAttribute("name", proxySlotName);
      }
      (_a3 = this.shadowRoot) === null || _a3 === void 0 ? void 0 : _a3.appendChild(this.proxySlot);
      this.appendChild(this.proxy);
    }
    /**
     * Detach the proxy element from the DOM
     */
    detachProxy() {
      var _a3;
      this.removeChild(this.proxy);
      (_a3 = this.shadowRoot) === null || _a3 === void 0 ? void 0 : _a3.removeChild(this.proxySlot);
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(anchor) {
      if (this.proxy instanceof HTMLElement) {
        this.setValidity(this.proxy.validity, this.proxy.validationMessage, anchor);
      }
    }
    /**
     * Associates the provided value (and optional state) with the parent form.
     * @param value - The value to set
     * @param state - The state object provided to during session restores and when autofilling.
     */
    setFormValue(value, state) {
      if (this.elementInternals) {
        this.elementInternals.setFormValue(value, state || value);
      }
    }
    _keypressHandler(e2) {
      switch (e2.key) {
        case keyEnter:
          if (this.form instanceof HTMLFormElement) {
            const defaultButton = this.form.querySelector("[type=submit]");
            defaultButton === null || defaultButton === void 0 ? void 0 : defaultButton.click();
          }
          break;
      }
    }
    /**
     * Used to stop propagation of proxy element events
     * @param e - Event object
     */
    stopPropagation(e2) {
      e2.stopPropagation();
    }
  };
  attr({ mode: "boolean" })(C.prototype, "disabled");
  attr({ mode: "fromView", attribute: "value" })(C.prototype, "initialValue");
  attr({ attribute: "current-value" })(C.prototype, "currentValue");
  attr(C.prototype, "name");
  attr({ mode: "boolean" })(C.prototype, "required");
  observable$1(C.prototype, "value");
  return C;
}
function CheckableFormAssociated(BaseCtor) {
  class C extends FormAssociated(BaseCtor) {
  }
  class D extends C {
    constructor(...args) {
      super(args);
      this.dirtyChecked = false;
      this.checkedAttribute = false;
      this.checked = false;
      this.dirtyChecked = false;
    }
    checkedAttributeChanged() {
      this.defaultChecked = this.checkedAttribute;
    }
    /**
     * @internal
     */
    defaultCheckedChanged() {
      if (!this.dirtyChecked) {
        this.checked = this.defaultChecked;
        this.dirtyChecked = false;
      }
    }
    checkedChanged(prev, next) {
      if (!this.dirtyChecked) {
        this.dirtyChecked = true;
      }
      this.currentChecked = this.checked;
      this.updateForm();
      if (this.proxy instanceof HTMLInputElement) {
        this.proxy.checked = this.checked;
      }
      if (prev !== void 0) {
        this.$emit("change");
      }
      this.validate();
    }
    currentCheckedChanged(prev, next) {
      this.checked = this.currentChecked;
    }
    updateForm() {
      const value = this.checked ? this.value : null;
      this.setFormValue(value, value);
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateForm();
    }
    formResetCallback() {
      super.formResetCallback();
      this.checked = !!this.checkedAttribute;
      this.dirtyChecked = false;
    }
  }
  attr({ attribute: "checked", mode: "boolean" })(D.prototype, "checkedAttribute");
  attr({ attribute: "current-checked", converter: booleanConverter })(D.prototype, "currentChecked");
  observable$1(D.prototype, "defaultChecked");
  observable$1(D.prototype, "checked");
  return D;
}
class _Button extends FoundationElement {
}
class FormAssociatedButton extends FormAssociated(_Button) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}
let Button$1 = class Button extends FormAssociatedButton {
  constructor() {
    super(...arguments);
    this.handleClick = (e2) => {
      var _a3;
      if (this.disabled && ((_a3 = this.defaultSlottedContent) === null || _a3 === void 0 ? void 0 : _a3.length) <= 1) {
        e2.stopPropagation();
      }
    };
    this.handleSubmission = () => {
      if (!this.form) {
        return;
      }
      const attached = this.proxy.isConnected;
      if (!attached) {
        this.attachProxy();
      }
      typeof this.form.requestSubmit === "function" ? this.form.requestSubmit(this.proxy) : this.proxy.click();
      if (!attached) {
        this.detachProxy();
      }
    };
    this.handleFormReset = () => {
      var _a3;
      (_a3 = this.form) === null || _a3 === void 0 ? void 0 : _a3.reset();
    };
    this.handleUnsupportedDelegatesFocus = () => {
      var _a3;
      if (window.ShadowRoot && !window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus") && ((_a3 = this.$fastController.definition.shadowOptions) === null || _a3 === void 0 ? void 0 : _a3.delegatesFocus)) {
        this.focus = () => {
          this.control.focus();
        };
      }
    };
  }
  formactionChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formAction = this.formaction;
    }
  }
  formenctypeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formEnctype = this.formenctype;
    }
  }
  formmethodChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formMethod = this.formmethod;
    }
  }
  formnovalidateChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formNoValidate = this.formnovalidate;
    }
  }
  formtargetChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formTarget = this.formtarget;
    }
  }
  typeChanged(previous, next) {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
    }
    next === "submit" && this.addEventListener("click", this.handleSubmission);
    previous === "submit" && this.removeEventListener("click", this.handleSubmission);
    next === "reset" && this.addEventListener("click", this.handleFormReset);
    previous === "reset" && this.removeEventListener("click", this.handleFormReset);
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
  /**
   * @internal
   */
  connectedCallback() {
    var _a3;
    super.connectedCallback();
    this.proxy.setAttribute("type", this.type);
    this.handleUnsupportedDelegatesFocus();
    const elements = Array.from((_a3 = this.control) === null || _a3 === void 0 ? void 0 : _a3.children);
    if (elements) {
      elements.forEach((span) => {
        span.addEventListener("click", this.handleClick);
      });
    }
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var _a3;
    super.disconnectedCallback();
    const elements = Array.from((_a3 = this.control) === null || _a3 === void 0 ? void 0 : _a3.children);
    if (elements) {
      elements.forEach((span) => {
        span.removeEventListener("click", this.handleClick);
      });
    }
  }
};
__decorate([
  attr({ mode: "boolean" })
], Button$1.prototype, "autofocus", void 0);
__decorate([
  attr({ attribute: "form" })
], Button$1.prototype, "formId", void 0);
__decorate([
  attr
], Button$1.prototype, "formaction", void 0);
__decorate([
  attr
], Button$1.prototype, "formenctype", void 0);
__decorate([
  attr
], Button$1.prototype, "formmethod", void 0);
__decorate([
  attr({ mode: "boolean" })
], Button$1.prototype, "formnovalidate", void 0);
__decorate([
  attr
], Button$1.prototype, "formtarget", void 0);
__decorate([
  attr
], Button$1.prototype, "type", void 0);
__decorate([
  observable$1
], Button$1.prototype, "defaultSlottedContent", void 0);
class DelegatesARIAButton {
}
__decorate([
  attr({ attribute: "aria-expanded" })
], DelegatesARIAButton.prototype, "ariaExpanded", void 0);
__decorate([
  attr({ attribute: "aria-pressed" })
], DelegatesARIAButton.prototype, "ariaPressed", void 0);
applyMixins(DelegatesARIAButton, ARIAGlobalStatesAndProperties);
applyMixins(Button$1, StartEnd, DelegatesARIAButton);
const cardTemplate = (context, definition) => html`
    <slot></slot>
`;
let Card$1 = class Card extends FoundationElement {
};
const checkboxTemplate = (context, definition) => html`
    <template
        role="checkbox"
        aria-checked="${(x) => x.checked}"
        aria-required="${(x) => x.required}"
        aria-disabled="${(x) => x.disabled}"
        aria-readonly="${(x) => x.readOnly}"
        tabindex="${(x) => x.disabled ? null : 0}"
        @keypress="${(x, c2) => x.keypressHandler(c2.event)}"
        @click="${(x, c2) => x.clickHandler(c2.event)}"
        class="${(x) => x.readOnly ? "readonly" : ""} ${(x) => x.checked ? "checked" : ""} ${(x) => x.indeterminate ? "indeterminate" : ""}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${definition.checkedIndicator || ""}
            </slot>
            <slot name="indeterminate-indicator">
                ${definition.indeterminateIndicator || ""}
            </slot>
        </div>
        <label
            part="label"
            class="${(x) => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"
        >
            <slot ${slotted("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;
class _Checkbox extends FoundationElement {
}
class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}
class Checkbox extends FormAssociatedCheckbox {
  constructor() {
    super();
    this.initialValue = "on";
    this.indeterminate = false;
    this.keypressHandler = (e2) => {
      if (this.readOnly) {
        return;
      }
      switch (e2.key) {
        case keySpace:
          if (this.indeterminate) {
            this.indeterminate = false;
          }
          this.checked = !this.checked;
          break;
      }
    };
    this.clickHandler = (e2) => {
      if (!this.disabled && !this.readOnly) {
        if (this.indeterminate) {
          this.indeterminate = false;
        }
        this.checked = !this.checked;
      }
    };
    this.proxy.setAttribute("type", "checkbox");
  }
  readOnlyChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
    }
  }
}
__decorate([
  attr({ attribute: "readonly", mode: "boolean" })
], Checkbox.prototype, "readOnly", void 0);
__decorate([
  observable$1
], Checkbox.prototype, "defaultSlottedNodes", void 0);
__decorate([
  observable$1
], Checkbox.prototype, "indeterminate", void 0);
function isListboxOption(el) {
  return isHTMLElement(el) && (el.getAttribute("role") === "option" || el instanceof HTMLOptionElement);
}
class ListboxOption extends FoundationElement {
  constructor(text2, value, defaultSelected, selected2) {
    super();
    this.defaultSelected = false;
    this.dirtySelected = false;
    this.selected = this.defaultSelected;
    this.dirtyValue = false;
    if (text2) {
      this.textContent = text2;
    }
    if (value) {
      this.initialValue = value;
    }
    if (defaultSelected) {
      this.defaultSelected = defaultSelected;
    }
    if (selected2) {
      this.selected = selected2;
    }
    this.proxy = new Option(`${this.textContent}`, this.initialValue, this.defaultSelected, this.selected);
    this.proxy.disabled = this.disabled;
  }
  /**
   * Updates the ariaChecked property when the checked property changes.
   *
   * @param prev - the previous checked value
   * @param next - the current checked value
   *
   * @public
   */
  checkedChanged(prev, next) {
    if (typeof next === "boolean") {
      this.ariaChecked = next ? "true" : "false";
      return;
    }
    this.ariaChecked = null;
  }
  /**
   * Updates the proxy's text content when the default slot changes.
   * @param prev - the previous content value
   * @param next - the current content value
   *
   * @internal
   */
  contentChanged(prev, next) {
    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.textContent = this.textContent;
    }
    this.$emit("contentchange", null, { bubbles: true });
  }
  defaultSelectedChanged() {
    if (!this.dirtySelected) {
      this.selected = this.defaultSelected;
      if (this.proxy instanceof HTMLOptionElement) {
        this.proxy.selected = this.defaultSelected;
      }
    }
  }
  disabledChanged(prev, next) {
    this.ariaDisabled = this.disabled ? "true" : "false";
    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.disabled = this.disabled;
    }
  }
  selectedAttributeChanged() {
    this.defaultSelected = this.selectedAttribute;
    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.defaultSelected = this.defaultSelected;
    }
  }
  selectedChanged() {
    this.ariaSelected = this.selected ? "true" : "false";
    if (!this.dirtySelected) {
      this.dirtySelected = true;
    }
    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.selected = this.selected;
    }
  }
  initialValueChanged(previous, next) {
    if (!this.dirtyValue) {
      this.value = this.initialValue;
      this.dirtyValue = false;
    }
  }
  get label() {
    var _a3;
    return (_a3 = this.value) !== null && _a3 !== void 0 ? _a3 : this.text;
  }
  get text() {
    var _a3, _b2;
    return (_b2 = (_a3 = this.textContent) === null || _a3 === void 0 ? void 0 : _a3.replace(/\s+/g, " ").trim()) !== null && _b2 !== void 0 ? _b2 : "";
  }
  set value(next) {
    const newValue = `${next !== null && next !== void 0 ? next : ""}`;
    this._value = newValue;
    this.dirtyValue = true;
    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.value = newValue;
    }
    Observable.notify(this, "value");
  }
  get value() {
    var _a3;
    Observable.track(this, "value");
    return (_a3 = this._value) !== null && _a3 !== void 0 ? _a3 : this.text;
  }
  get form() {
    return this.proxy ? this.proxy.form : null;
  }
}
__decorate([
  observable$1
], ListboxOption.prototype, "checked", void 0);
__decorate([
  observable$1
], ListboxOption.prototype, "content", void 0);
__decorate([
  observable$1
], ListboxOption.prototype, "defaultSelected", void 0);
__decorate([
  attr({ mode: "boolean" })
], ListboxOption.prototype, "disabled", void 0);
__decorate([
  attr({ attribute: "selected", mode: "boolean" })
], ListboxOption.prototype, "selectedAttribute", void 0);
__decorate([
  observable$1
], ListboxOption.prototype, "selected", void 0);
__decorate([
  attr({ attribute: "value", mode: "fromView" })
], ListboxOption.prototype, "initialValue", void 0);
class DelegatesARIAListboxOption {
}
__decorate([
  observable$1
], DelegatesARIAListboxOption.prototype, "ariaChecked", void 0);
__decorate([
  observable$1
], DelegatesARIAListboxOption.prototype, "ariaPosInSet", void 0);
__decorate([
  observable$1
], DelegatesARIAListboxOption.prototype, "ariaSelected", void 0);
__decorate([
  observable$1
], DelegatesARIAListboxOption.prototype, "ariaSetSize", void 0);
applyMixins(DelegatesARIAListboxOption, ARIAGlobalStatesAndProperties);
applyMixins(ListboxOption, StartEnd, DelegatesARIAListboxOption);
class Listbox extends FoundationElement {
  constructor() {
    super(...arguments);
    this._options = [];
    this.selectedIndex = -1;
    this.selectedOptions = [];
    this.shouldSkipFocus = false;
    this.typeaheadBuffer = "";
    this.typeaheadExpired = true;
    this.typeaheadTimeout = -1;
  }
  /**
   * The first selected option.
   *
   * @internal
   */
  get firstSelectedOption() {
    var _a3;
    return (_a3 = this.selectedOptions[0]) !== null && _a3 !== void 0 ? _a3 : null;
  }
  /**
   * Returns true if there is one or more selectable option.
   *
   * @internal
   */
  get hasSelectableOptions() {
    return this.options.length > 0 && !this.options.every((o2) => o2.disabled);
  }
  /**
   * The number of options.
   *
   * @public
   */
  get length() {
    var _a3, _b2;
    return (_b2 = (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.length) !== null && _b2 !== void 0 ? _b2 : 0;
  }
  /**
   * The list of options.
   *
   * @public
   */
  get options() {
    Observable.track(this, "options");
    return this._options;
  }
  set options(value) {
    this._options = value;
    Observable.notify(this, "options");
  }
  /**
   * Flag for the typeahead timeout expiration.
   *
   * @deprecated use `Listbox.typeaheadExpired`
   * @internal
   */
  get typeAheadExpired() {
    return this.typeaheadExpired;
  }
  set typeAheadExpired(value) {
    this.typeaheadExpired = value;
  }
  /**
   * Handle click events for listbox options.
   *
   * @internal
   */
  clickHandler(e2) {
    const captured = e2.target.closest(`option,[role=option]`);
    if (captured && !captured.disabled) {
      this.selectedIndex = this.options.indexOf(captured);
      return true;
    }
  }
  /**
   * Ensures that the provided option is focused and scrolled into view.
   *
   * @param optionToFocus - The option to focus
   * @internal
   */
  focusAndScrollOptionIntoView(optionToFocus = this.firstSelectedOption) {
    if (this.contains(document.activeElement) && optionToFocus !== null) {
      optionToFocus.focus();
      requestAnimationFrame(() => {
        optionToFocus.scrollIntoView({ block: "nearest" });
      });
    }
  }
  /**
   * Handles `focusin` actions for the component. When the component receives focus,
   * the list of selected options is refreshed and the first selected option is scrolled
   * into view.
   *
   * @internal
   */
  focusinHandler(e2) {
    if (!this.shouldSkipFocus && e2.target === e2.currentTarget) {
      this.setSelectedOptions();
      this.focusAndScrollOptionIntoView();
    }
    this.shouldSkipFocus = false;
  }
  /**
   * Returns the options which match the current typeahead buffer.
   *
   * @internal
   */
  getTypeaheadMatches() {
    const pattern = this.typeaheadBuffer.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`^${pattern}`, "gi");
    return this.options.filter((o2) => o2.text.trim().match(re));
  }
  /**
   * Determines the index of the next option which is selectable, if any.
   *
   * @param prev - the previous selected index
   * @param next - the next index to select
   *
   * @internal
   */
  getSelectableIndex(prev = this.selectedIndex, next) {
    const direction = prev > next ? -1 : prev < next ? 1 : 0;
    const potentialDirection = prev + direction;
    let nextSelectableOption = null;
    switch (direction) {
      case -1: {
        nextSelectableOption = this.options.reduceRight((nextSelectableOption2, thisOption, index) => !nextSelectableOption2 && !thisOption.disabled && index < potentialDirection ? thisOption : nextSelectableOption2, nextSelectableOption);
        break;
      }
      case 1: {
        nextSelectableOption = this.options.reduce((nextSelectableOption2, thisOption, index) => !nextSelectableOption2 && !thisOption.disabled && index > potentialDirection ? thisOption : nextSelectableOption2, nextSelectableOption);
        break;
      }
    }
    return this.options.indexOf(nextSelectableOption);
  }
  /**
   * Handles external changes to child options.
   *
   * @param source - the source object
   * @param propertyName - the property
   *
   * @internal
   */
  handleChange(source, propertyName) {
    switch (propertyName) {
      case "selected": {
        if (Listbox.slottedOptionFilter(source)) {
          this.selectedIndex = this.options.indexOf(source);
        }
        this.setSelectedOptions();
        break;
      }
    }
  }
  /**
   * Moves focus to an option whose label matches characters typed by the user.
   * Consecutive keystrokes are batched into a buffer of search text used
   * to match against the set of options.  If `TYPE_AHEAD_TIMEOUT_MS` passes
   * between consecutive keystrokes, the search restarts.
   *
   * @param key - the key to be evaluated
   *
   * @internal
   */
  handleTypeAhead(key) {
    if (this.typeaheadTimeout) {
      window.clearTimeout(this.typeaheadTimeout);
    }
    this.typeaheadTimeout = window.setTimeout(() => this.typeaheadExpired = true, Listbox.TYPE_AHEAD_TIMEOUT_MS);
    if (key.length > 1) {
      return;
    }
    this.typeaheadBuffer = `${this.typeaheadExpired ? "" : this.typeaheadBuffer}${key}`;
  }
  /**
   * Handles `keydown` actions for listbox navigation and typeahead.
   *
   * @internal
   */
  keydownHandler(e2) {
    if (this.disabled) {
      return true;
    }
    this.shouldSkipFocus = false;
    const key = e2.key;
    switch (key) {
      case keyHome: {
        if (!e2.shiftKey) {
          e2.preventDefault();
          this.selectFirstOption();
        }
        break;
      }
      case keyArrowDown: {
        if (!e2.shiftKey) {
          e2.preventDefault();
          this.selectNextOption();
        }
        break;
      }
      case keyArrowUp: {
        if (!e2.shiftKey) {
          e2.preventDefault();
          this.selectPreviousOption();
        }
        break;
      }
      case keyEnd: {
        e2.preventDefault();
        this.selectLastOption();
        break;
      }
      case keyTab: {
        this.focusAndScrollOptionIntoView();
        return true;
      }
      case keyEnter:
      case keyEscape: {
        return true;
      }
      case keySpace: {
        if (this.typeaheadExpired) {
          return true;
        }
      }
      default: {
        if (key.length === 1) {
          this.handleTypeAhead(`${key}`);
        }
        return true;
      }
    }
  }
  /**
   * Prevents `focusin` events from firing before `click` events when the
   * element is unfocused.
   *
   * @internal
   */
  mousedownHandler(e2) {
    this.shouldSkipFocus = !this.contains(document.activeElement);
    return true;
  }
  /**
   * Switches between single-selection and multi-selection mode.
   *
   * @param prev - the previous value of the `multiple` attribute
   * @param next - the next value of the `multiple` attribute
   *
   * @internal
   */
  multipleChanged(prev, next) {
    this.ariaMultiSelectable = next ? "true" : null;
  }
  /**
   * Updates the list of selected options when the `selectedIndex` changes.
   *
   * @param prev - the previous selected index value
   * @param next - the current selected index value
   *
   * @internal
   */
  selectedIndexChanged(prev, next) {
    var _a3;
    if (!this.hasSelectableOptions) {
      this.selectedIndex = -1;
      return;
    }
    if (((_a3 = this.options[this.selectedIndex]) === null || _a3 === void 0 ? void 0 : _a3.disabled) && typeof prev === "number") {
      const selectableIndex = this.getSelectableIndex(prev, next);
      const newNext = selectableIndex > -1 ? selectableIndex : prev;
      this.selectedIndex = newNext;
      if (next === newNext) {
        this.selectedIndexChanged(next, newNext);
      }
      return;
    }
    this.setSelectedOptions();
  }
  /**
   * Updates the selectedness of each option when the list of selected options changes.
   *
   * @param prev - the previous list of selected options
   * @param next - the current list of selected options
   *
   * @internal
   */
  selectedOptionsChanged(prev, next) {
    var _a3;
    const filteredNext = next.filter(Listbox.slottedOptionFilter);
    (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.forEach((o2) => {
      const notifier = Observable.getNotifier(o2);
      notifier.unsubscribe(this, "selected");
      o2.selected = filteredNext.includes(o2);
      notifier.subscribe(this, "selected");
    });
  }
  /**
   * Moves focus to the first selectable option.
   *
   * @public
   */
  selectFirstOption() {
    var _a3, _b2;
    if (!this.disabled) {
      this.selectedIndex = (_b2 = (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.findIndex((o2) => !o2.disabled)) !== null && _b2 !== void 0 ? _b2 : -1;
    }
  }
  /**
   * Moves focus to the last selectable option.
   *
   * @internal
   */
  selectLastOption() {
    if (!this.disabled) {
      this.selectedIndex = findLastIndex(this.options, (o2) => !o2.disabled);
    }
  }
  /**
   * Moves focus to the next selectable option.
   *
   * @internal
   */
  selectNextOption() {
    if (!this.disabled && this.selectedIndex < this.options.length - 1) {
      this.selectedIndex += 1;
    }
  }
  /**
   * Moves focus to the previous selectable option.
   *
   * @internal
   */
  selectPreviousOption() {
    if (!this.disabled && this.selectedIndex > 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }
  /**
   * Updates the selected index to match the first selected option.
   *
   * @internal
   */
  setDefaultSelectedOption() {
    var _a3, _b2;
    this.selectedIndex = (_b2 = (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.findIndex((el) => el.defaultSelected)) !== null && _b2 !== void 0 ? _b2 : -1;
  }
  /**
   * Sets an option as selected and gives it focus.
   *
   * @public
   */
  setSelectedOptions() {
    var _a3, _b2, _c2;
    if ((_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.length) {
      this.selectedOptions = [this.options[this.selectedIndex]];
      this.ariaActiveDescendant = (_c2 = (_b2 = this.firstSelectedOption) === null || _b2 === void 0 ? void 0 : _b2.id) !== null && _c2 !== void 0 ? _c2 : "";
      this.focusAndScrollOptionIntoView();
    }
  }
  /**
   * Updates the list of options and resets the selected option when the slotted option content changes.
   *
   * @param prev - the previous list of slotted options
   * @param next - the current list of slotted options
   *
   * @internal
   */
  slottedOptionsChanged(prev, next) {
    this.options = next.reduce((options, item) => {
      if (isListboxOption(item)) {
        options.push(item);
      }
      return options;
    }, []);
    const setSize = `${this.options.length}`;
    this.options.forEach((option, index) => {
      if (!option.id) {
        option.id = uniqueId("option-");
      }
      option.ariaPosInSet = `${index + 1}`;
      option.ariaSetSize = setSize;
    });
    if (this.$fastController.isConnected) {
      this.setSelectedOptions();
      this.setDefaultSelectedOption();
    }
  }
  /**
   * Updates the filtered list of options when the typeahead buffer changes.
   *
   * @param prev - the previous typeahead buffer value
   * @param next - the current typeahead buffer value
   *
   * @internal
   */
  typeaheadBufferChanged(prev, next) {
    if (this.$fastController.isConnected) {
      const typeaheadMatches = this.getTypeaheadMatches();
      if (typeaheadMatches.length) {
        const selectedIndex = this.options.indexOf(typeaheadMatches[0]);
        if (selectedIndex > -1) {
          this.selectedIndex = selectedIndex;
        }
      }
      this.typeaheadExpired = false;
    }
  }
}
Listbox.slottedOptionFilter = (n3) => isListboxOption(n3) && !n3.hidden;
Listbox.TYPE_AHEAD_TIMEOUT_MS = 1e3;
__decorate([
  attr({ mode: "boolean" })
], Listbox.prototype, "disabled", void 0);
__decorate([
  observable$1
], Listbox.prototype, "selectedIndex", void 0);
__decorate([
  observable$1
], Listbox.prototype, "selectedOptions", void 0);
__decorate([
  observable$1
], Listbox.prototype, "slottedOptions", void 0);
__decorate([
  observable$1
], Listbox.prototype, "typeaheadBuffer", void 0);
class DelegatesARIAListbox {
}
__decorate([
  observable$1
], DelegatesARIAListbox.prototype, "ariaActiveDescendant", void 0);
__decorate([
  observable$1
], DelegatesARIAListbox.prototype, "ariaDisabled", void 0);
__decorate([
  observable$1
], DelegatesARIAListbox.prototype, "ariaExpanded", void 0);
__decorate([
  observable$1
], DelegatesARIAListbox.prototype, "ariaMultiSelectable", void 0);
applyMixins(DelegatesARIAListbox, ARIAGlobalStatesAndProperties);
applyMixins(Listbox, DelegatesARIAListbox);
const SelectPosition = {
  above: "above",
  below: "below"
};
class _Combobox extends Listbox {
}
class FormAssociatedCombobox extends FormAssociated(_Combobox) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}
const ComboboxAutocomplete = {
  inline: "inline",
  list: "list",
  both: "both",
  none: "none"
};
let Combobox$1 = class Combobox extends FormAssociatedCombobox {
  constructor() {
    super(...arguments);
    this._value = "";
    this.filteredOptions = [];
    this.filter = "";
    this.forcedPosition = false;
    this.listboxId = uniqueId("listbox-");
    this.maxHeight = 0;
    this.open = false;
  }
  /**
   * Reset the element to its first selectable option when its parent form is reset.
   *
   * @internal
   */
  formResetCallback() {
    super.formResetCallback();
    this.setDefaultSelectedOption();
    this.updateValue();
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
  get isAutocompleteInline() {
    return this.autocomplete === ComboboxAutocomplete.inline || this.isAutocompleteBoth;
  }
  get isAutocompleteList() {
    return this.autocomplete === ComboboxAutocomplete.list || this.isAutocompleteBoth;
  }
  get isAutocompleteBoth() {
    return this.autocomplete === ComboboxAutocomplete.both;
  }
  /**
   * Sets focus and synchronize ARIA attributes when the open property changes.
   *
   * @param prev - the previous open value
   * @param next - the current open value
   *
   * @internal
   */
  openChanged() {
    if (this.open) {
      this.ariaControls = this.listboxId;
      this.ariaExpanded = "true";
      this.setPositioning();
      this.focusAndScrollOptionIntoView();
      DOM.queueUpdate(() => this.focus());
      return;
    }
    this.ariaControls = "";
    this.ariaExpanded = "false";
  }
  /**
   * The list of options.
   *
   * @public
   * @remarks
   * Overrides `Listbox.options`.
   */
  get options() {
    Observable.track(this, "options");
    return this.filteredOptions.length ? this.filteredOptions : this._options;
  }
  set options(value) {
    this._options = value;
    Observable.notify(this, "options");
  }
  /**
   * Updates the placeholder on the proxy element.
   * @internal
   */
  placeholderChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.placeholder = this.placeholder;
    }
  }
  positionChanged(prev, next) {
    this.positionAttribute = next;
    this.setPositioning();
  }
  /**
   * The value property.
   *
   * @public
   */
  get value() {
    Observable.track(this, "value");
    return this._value;
  }
  set value(next) {
    var _a3, _b2, _c2;
    const prev = `${this._value}`;
    if (this.$fastController.isConnected && this.options) {
      const selectedIndex = this.options.findIndex((el) => el.text.toLowerCase() === next.toLowerCase());
      const prevSelectedValue = (_a3 = this.options[this.selectedIndex]) === null || _a3 === void 0 ? void 0 : _a3.text;
      const nextSelectedValue = (_b2 = this.options[selectedIndex]) === null || _b2 === void 0 ? void 0 : _b2.text;
      this.selectedIndex = prevSelectedValue !== nextSelectedValue ? selectedIndex : this.selectedIndex;
      next = ((_c2 = this.firstSelectedOption) === null || _c2 === void 0 ? void 0 : _c2.text) || next;
    }
    if (prev !== next) {
      this._value = next;
      super.valueChanged(prev, next);
      Observable.notify(this, "value");
    }
  }
  /**
   * Handle opening and closing the listbox when the combobox is clicked.
   *
   * @param e - the mouse event
   * @internal
   */
  clickHandler(e2) {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      const captured = e2.target.closest(`option,[role=option]`);
      if (!captured || captured.disabled) {
        return;
      }
      this.selectedOptions = [captured];
      this.control.value = captured.text;
      this.clearSelectionRange();
      this.updateValue(true);
    }
    this.open = !this.open;
    if (this.open) {
      this.control.focus();
    }
    return true;
  }
  connectedCallback() {
    super.connectedCallback();
    this.forcedPosition = !!this.positionAttribute;
    if (this.value) {
      this.initialValue = this.value;
    }
  }
  /**
   * Synchronize the `aria-disabled` property when the `disabled` property changes.
   *
   * @param prev - The previous disabled value
   * @param next - The next disabled value
   *
   * @internal
   */
  disabledChanged(prev, next) {
    if (super.disabledChanged) {
      super.disabledChanged(prev, next);
    }
    this.ariaDisabled = this.disabled ? "true" : "false";
  }
  /**
   * Filter available options by text value.
   *
   * @public
   */
  filterOptions() {
    if (!this.autocomplete || this.autocomplete === ComboboxAutocomplete.none) {
      this.filter = "";
    }
    const filter = this.filter.toLowerCase();
    this.filteredOptions = this._options.filter((o2) => o2.text.toLowerCase().startsWith(this.filter.toLowerCase()));
    if (this.isAutocompleteList) {
      if (!this.filteredOptions.length && !filter) {
        this.filteredOptions = this._options;
      }
      this._options.forEach((o2) => {
        o2.hidden = !this.filteredOptions.includes(o2);
      });
    }
  }
  /**
   * Focus the control and scroll the first selected option into view.
   *
   * @internal
   * @remarks
   * Overrides: `Listbox.focusAndScrollOptionIntoView`
   */
  focusAndScrollOptionIntoView() {
    if (this.contains(document.activeElement)) {
      this.control.focus();
      if (this.firstSelectedOption) {
        requestAnimationFrame(() => {
          var _a3;
          (_a3 = this.firstSelectedOption) === null || _a3 === void 0 ? void 0 : _a3.scrollIntoView({ block: "nearest" });
        });
      }
    }
  }
  /**
   * Handle focus state when the element or its children lose focus.
   *
   * @param e - The focus event
   * @internal
   */
  focusoutHandler(e2) {
    this.syncValue();
    if (!this.open) {
      return true;
    }
    const focusTarget = e2.relatedTarget;
    if (this.isSameNode(focusTarget)) {
      this.focus();
      return;
    }
    if (!this.options || !this.options.includes(focusTarget)) {
      this.open = false;
    }
  }
  /**
   * Handle content changes on the control input.
   *
   * @param e - the input event
   * @internal
   */
  inputHandler(e2) {
    this.filter = this.control.value;
    this.filterOptions();
    if (!this.isAutocompleteInline) {
      this.selectedIndex = this.options.map((option) => option.text).indexOf(this.control.value);
    }
    if (e2.inputType.includes("deleteContent") || !this.filter.length) {
      return true;
    }
    if (this.isAutocompleteList && !this.open) {
      this.open = true;
    }
    if (this.isAutocompleteInline) {
      if (this.filteredOptions.length) {
        this.selectedOptions = [this.filteredOptions[0]];
        this.selectedIndex = this.options.indexOf(this.firstSelectedOption);
        this.setInlineSelection();
      } else {
        this.selectedIndex = -1;
      }
    }
    return;
  }
  /**
   * Handle keydown actions for listbox navigation.
   *
   * @param e - the keyboard event
   * @internal
   */
  keydownHandler(e2) {
    const key = e2.key;
    if (e2.ctrlKey || e2.shiftKey) {
      return true;
    }
    switch (key) {
      case "Enter": {
        this.syncValue();
        if (this.isAutocompleteInline) {
          this.filter = this.value;
        }
        this.open = false;
        this.clearSelectionRange();
        break;
      }
      case "Escape": {
        if (!this.isAutocompleteInline) {
          this.selectedIndex = -1;
        }
        if (this.open) {
          this.open = false;
          break;
        }
        this.value = "";
        this.control.value = "";
        this.filter = "";
        this.filterOptions();
        break;
      }
      case "Tab": {
        this.setInputToSelection();
        if (!this.open) {
          return true;
        }
        e2.preventDefault();
        this.open = false;
        break;
      }
      case "ArrowUp":
      case "ArrowDown": {
        this.filterOptions();
        if (!this.open) {
          this.open = true;
          break;
        }
        if (this.filteredOptions.length > 0) {
          super.keydownHandler(e2);
        }
        if (this.isAutocompleteInline) {
          this.setInlineSelection();
        }
        break;
      }
      default: {
        return true;
      }
    }
  }
  /**
   * Handle keyup actions for value input and text field manipulations.
   *
   * @param e - the keyboard event
   * @internal
   */
  keyupHandler(e2) {
    const key = e2.key;
    switch (key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "Backspace":
      case "Delete":
      case "Home":
      case "End": {
        this.filter = this.control.value;
        this.selectedIndex = -1;
        this.filterOptions();
        break;
      }
    }
  }
  /**
   * Ensure that the selectedIndex is within the current allowable filtered range.
   *
   * @param prev - the previous selected index value
   * @param next - the current selected index value
   *
   * @internal
   */
  selectedIndexChanged(prev, next) {
    if (this.$fastController.isConnected) {
      next = limit(-1, this.options.length - 1, next);
      if (next !== this.selectedIndex) {
        this.selectedIndex = next;
        return;
      }
      super.selectedIndexChanged(prev, next);
    }
  }
  /**
   * Move focus to the previous selectable option.
   *
   * @internal
   * @remarks
   * Overrides `Listbox.selectPreviousOption`
   */
  selectPreviousOption() {
    if (!this.disabled && this.selectedIndex >= 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }
  /**
   * Set the default selected options at initialization or reset.
   *
   * @internal
   * @remarks
   * Overrides `Listbox.setDefaultSelectedOption`
   */
  setDefaultSelectedOption() {
    if (this.$fastController.isConnected && this.options) {
      const selectedIndex = this.options.findIndex((el) => el.getAttribute("selected") !== null || el.selected);
      this.selectedIndex = selectedIndex;
      if (!this.dirtyValue && this.firstSelectedOption) {
        this.value = this.firstSelectedOption.text;
      }
      this.setSelectedOptions();
    }
  }
  /**
   * Focus and set the content of the control based on the first selected option.
   *
   * @internal
   */
  setInputToSelection() {
    if (this.firstSelectedOption) {
      this.control.value = this.firstSelectedOption.text;
      this.control.focus();
    }
  }
  /**
   * Focus, set and select the content of the control based on the first selected option.
   *
   * @internal
   */
  setInlineSelection() {
    if (this.firstSelectedOption) {
      this.setInputToSelection();
      this.control.setSelectionRange(this.filter.length, this.control.value.length, "backward");
    }
  }
  /**
   * Determines if a value update should involve emitting a change event, then updates the value.
   *
   * @internal
   */
  syncValue() {
    var _a3;
    const newValue = this.selectedIndex > -1 ? (_a3 = this.firstSelectedOption) === null || _a3 === void 0 ? void 0 : _a3.text : this.control.value;
    this.updateValue(this.value !== newValue);
  }
  /**
   * Calculate and apply listbox positioning based on available viewport space.
   *
   * @param force - direction to force the listbox to display
   * @public
   */
  setPositioning() {
    const currentBox = this.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const availableBottom = viewportHeight - currentBox.bottom;
    this.position = this.forcedPosition ? this.positionAttribute : currentBox.top > availableBottom ? SelectPosition.above : SelectPosition.below;
    this.positionAttribute = this.forcedPosition ? this.positionAttribute : this.position;
    this.maxHeight = this.position === SelectPosition.above ? ~~currentBox.top : ~~availableBottom;
  }
  /**
   * Ensure that the entire list of options is used when setting the selected property.
   *
   * @param prev - the previous list of selected options
   * @param next - the current list of selected options
   *
   * @internal
   * @remarks
   * Overrides: `Listbox.selectedOptionsChanged`
   */
  selectedOptionsChanged(prev, next) {
    if (this.$fastController.isConnected) {
      this._options.forEach((o2) => {
        o2.selected = next.includes(o2);
      });
    }
  }
  /**
   * Synchronize the form-associated proxy and update the value property of the element.
   *
   * @param prev - the previous collection of slotted option elements
   * @param next - the next collection of slotted option elements
   *
   * @internal
   */
  slottedOptionsChanged(prev, next) {
    super.slottedOptionsChanged(prev, next);
    this.updateValue();
  }
  /**
   * Sets the value and to match the first selected option.
   *
   * @param shouldEmit - if true, the change event will be emitted
   *
   * @internal
   */
  updateValue(shouldEmit) {
    var _a3;
    if (this.$fastController.isConnected) {
      this.value = ((_a3 = this.firstSelectedOption) === null || _a3 === void 0 ? void 0 : _a3.text) || this.control.value;
      this.control.value = this.value;
    }
    if (shouldEmit) {
      this.$emit("change");
    }
  }
  /**
   * @internal
   */
  clearSelectionRange() {
    const controlValueLength = this.control.value.length;
    this.control.setSelectionRange(controlValueLength, controlValueLength);
  }
};
__decorate([
  attr({ attribute: "autocomplete", mode: "fromView" })
], Combobox$1.prototype, "autocomplete", void 0);
__decorate([
  observable$1
], Combobox$1.prototype, "maxHeight", void 0);
__decorate([
  attr({ attribute: "open", mode: "boolean" })
], Combobox$1.prototype, "open", void 0);
__decorate([
  attr
], Combobox$1.prototype, "placeholder", void 0);
__decorate([
  attr({ attribute: "position" })
], Combobox$1.prototype, "positionAttribute", void 0);
__decorate([
  observable$1
], Combobox$1.prototype, "position", void 0);
class DelegatesARIACombobox {
}
__decorate([
  observable$1
], DelegatesARIACombobox.prototype, "ariaAutoComplete", void 0);
__decorate([
  observable$1
], DelegatesARIACombobox.prototype, "ariaControls", void 0);
applyMixins(DelegatesARIACombobox, DelegatesARIAListbox);
applyMixins(Combobox$1, StartEnd, DelegatesARIACombobox);
const comboboxTemplate = (context, definition) => html`
    <template
        aria-disabled="${(x) => x.ariaDisabled}"
        autocomplete="${(x) => x.autocomplete}"
        class="${(x) => x.open ? "open" : ""} ${(x) => x.disabled ? "disabled" : ""} ${(x) => x.position}"
        ?open="${(x) => x.open}"
        tabindex="${(x) => !x.disabled ? "0" : null}"
        @click="${(x, c2) => x.clickHandler(c2.event)}"
        @focusout="${(x, c2) => x.focusoutHandler(c2.event)}"
        @keydown="${(x, c2) => x.keydownHandler(c2.event)}"
    >
        <div class="control" part="control">
            ${startSlotTemplate(context, definition)}
            <slot name="control">
                <input
                    aria-activedescendant="${(x) => x.open ? x.ariaActiveDescendant : null}"
                    aria-autocomplete="${(x) => x.ariaAutoComplete}"
                    aria-controls="${(x) => x.ariaControls}"
                    aria-disabled="${(x) => x.ariaDisabled}"
                    aria-expanded="${(x) => x.ariaExpanded}"
                    aria-haspopup="listbox"
                    class="selected-value"
                    part="selected-value"
                    placeholder="${(x) => x.placeholder}"
                    role="combobox"
                    type="text"
                    ?disabled="${(x) => x.disabled}"
                    :value="${(x) => x.value}"
                    @input="${(x, c2) => x.inputHandler(c2.event)}"
                    @keyup="${(x, c2) => x.keyupHandler(c2.event)}"
                    ${ref("control")}
                />
                <div class="indicator" part="indicator" aria-hidden="true">
                    <slot name="indicator">
                        ${definition.indicator || ""}
                    </slot>
                </div>
            </slot>
            ${endSlotTemplate(context, definition)}
        </div>
        <div
            class="listbox"
            id="${(x) => x.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${(x) => x.disabled}"
            ?hidden="${(x) => !x.open}"
            ${ref("listbox")}
        >
            <slot
                ${slotted({
  filter: Listbox.slottedOptionFilter,
  flatten: true,
  property: "slottedOptions"
})}
            ></slot>
        </div>
    </template>
`;
function composedParent(element) {
  const parentNode = element.parentElement;
  if (parentNode) {
    return parentNode;
  } else {
    const rootNode = element.getRootNode();
    if (rootNode.host instanceof HTMLElement) {
      return rootNode.host;
    }
  }
  return null;
}
function composedContains(reference, test) {
  let current = test;
  while (current !== null) {
    if (current === reference) {
      return true;
    }
    current = composedParent(current);
  }
  return false;
}
const defaultElement = document.createElement("div");
function isFastElement(element) {
  return element instanceof FASTElement;
}
class QueuedStyleSheetTarget {
  setProperty(name, value) {
    DOM.queueUpdate(() => this.target.setProperty(name, value));
  }
  removeProperty(name) {
    DOM.queueUpdate(() => this.target.removeProperty(name));
  }
}
class ConstructableStyleSheetTarget extends QueuedStyleSheetTarget {
  constructor(source) {
    super();
    const sheet = new CSSStyleSheet();
    this.target = sheet.cssRules[sheet.insertRule(":host{}")].style;
    source.$fastController.addStyles(ElementStyles.create([sheet]));
  }
}
class DocumentStyleSheetTarget extends QueuedStyleSheetTarget {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    this.target = sheet.cssRules[sheet.insertRule(":root{}")].style;
    document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      sheet
    ];
  }
}
class HeadStyleElementStyleSheetTarget extends QueuedStyleSheetTarget {
  constructor() {
    super();
    this.style = document.createElement("style");
    document.head.appendChild(this.style);
    const { sheet } = this.style;
    if (sheet) {
      const index = sheet.insertRule(":root{}", sheet.cssRules.length);
      this.target = sheet.cssRules[index].style;
    }
  }
}
class StyleElementStyleSheetTarget {
  constructor(target2) {
    this.store = /* @__PURE__ */ new Map();
    this.target = null;
    const controller = target2.$fastController;
    this.style = document.createElement("style");
    controller.addStyles(this.style);
    Observable.getNotifier(controller).subscribe(this, "isConnected");
    this.handleChange(controller, "isConnected");
  }
  targetChanged() {
    if (this.target !== null) {
      for (const [key, value] of this.store.entries()) {
        this.target.setProperty(key, value);
      }
    }
  }
  setProperty(name, value) {
    this.store.set(name, value);
    DOM.queueUpdate(() => {
      if (this.target !== null) {
        this.target.setProperty(name, value);
      }
    });
  }
  removeProperty(name) {
    this.store.delete(name);
    DOM.queueUpdate(() => {
      if (this.target !== null) {
        this.target.removeProperty(name);
      }
    });
  }
  handleChange(source, key) {
    const { sheet } = this.style;
    if (sheet) {
      const index = sheet.insertRule(":host{}", sheet.cssRules.length);
      this.target = sheet.cssRules[index].style;
    } else {
      this.target = null;
    }
  }
}
__decorate([
  observable$1
], StyleElementStyleSheetTarget.prototype, "target", void 0);
class ElementStyleSheetTarget {
  constructor(source) {
    this.target = source.style;
  }
  setProperty(name, value) {
    DOM.queueUpdate(() => this.target.setProperty(name, value));
  }
  removeProperty(name) {
    DOM.queueUpdate(() => this.target.removeProperty(name));
  }
}
class RootStyleSheetTarget {
  setProperty(name, value) {
    RootStyleSheetTarget.properties[name] = value;
    for (const target2 of RootStyleSheetTarget.roots.values()) {
      PropertyTargetManager.getOrCreate(RootStyleSheetTarget.normalizeRoot(target2)).setProperty(name, value);
    }
  }
  removeProperty(name) {
    delete RootStyleSheetTarget.properties[name];
    for (const target2 of RootStyleSheetTarget.roots.values()) {
      PropertyTargetManager.getOrCreate(RootStyleSheetTarget.normalizeRoot(target2)).removeProperty(name);
    }
  }
  static registerRoot(root) {
    const { roots } = RootStyleSheetTarget;
    if (!roots.has(root)) {
      roots.add(root);
      const target2 = PropertyTargetManager.getOrCreate(this.normalizeRoot(root));
      for (const key in RootStyleSheetTarget.properties) {
        target2.setProperty(key, RootStyleSheetTarget.properties[key]);
      }
    }
  }
  static unregisterRoot(root) {
    const { roots } = RootStyleSheetTarget;
    if (roots.has(root)) {
      roots.delete(root);
      const target2 = PropertyTargetManager.getOrCreate(RootStyleSheetTarget.normalizeRoot(root));
      for (const key in RootStyleSheetTarget.properties) {
        target2.removeProperty(key);
      }
    }
  }
  /**
   * Returns the document when provided the default element,
   * otherwise is a no-op
   * @param root - the root to normalize
   */
  static normalizeRoot(root) {
    return root === defaultElement ? document : root;
  }
}
RootStyleSheetTarget.roots = /* @__PURE__ */ new Set();
RootStyleSheetTarget.properties = {};
const propertyTargetCache = /* @__PURE__ */ new WeakMap();
const propertyTargetCtor = DOM.supportsAdoptedStyleSheets ? ConstructableStyleSheetTarget : StyleElementStyleSheetTarget;
const PropertyTargetManager = Object.freeze({
  getOrCreate(source) {
    if (propertyTargetCache.has(source)) {
      return propertyTargetCache.get(source);
    }
    let target2;
    if (source === defaultElement) {
      target2 = new RootStyleSheetTarget();
    } else if (source instanceof Document) {
      target2 = DOM.supportsAdoptedStyleSheets ? new DocumentStyleSheetTarget() : new HeadStyleElementStyleSheetTarget();
    } else if (isFastElement(source)) {
      target2 = new propertyTargetCtor(source);
    } else {
      target2 = new ElementStyleSheetTarget(source);
    }
    propertyTargetCache.set(source, target2);
    return target2;
  }
});
class DesignTokenImpl extends CSSDirective {
  constructor(configuration) {
    super();
    this.subscribers = /* @__PURE__ */ new WeakMap();
    this._appliedTo = /* @__PURE__ */ new Set();
    this.name = configuration.name;
    if (configuration.cssCustomPropertyName !== null) {
      this.cssCustomProperty = `--${configuration.cssCustomPropertyName}`;
      this.cssVar = `var(${this.cssCustomProperty})`;
    }
    this.id = DesignTokenImpl.uniqueId();
    DesignTokenImpl.tokensById.set(this.id, this);
  }
  get appliedTo() {
    return [...this._appliedTo];
  }
  static from(nameOrConfig) {
    return new DesignTokenImpl({
      name: typeof nameOrConfig === "string" ? nameOrConfig : nameOrConfig.name,
      cssCustomPropertyName: typeof nameOrConfig === "string" ? nameOrConfig : nameOrConfig.cssCustomPropertyName === void 0 ? nameOrConfig.name : nameOrConfig.cssCustomPropertyName
    });
  }
  static isCSSDesignToken(token) {
    return typeof token.cssCustomProperty === "string";
  }
  static isDerivedDesignTokenValue(value) {
    return typeof value === "function";
  }
  /**
   * Gets a token by ID. Returns undefined if the token was not found.
   * @param id - The ID of the token
   * @returns
   */
  static getTokenById(id) {
    return DesignTokenImpl.tokensById.get(id);
  }
  getOrCreateSubscriberSet(target2 = this) {
    return this.subscribers.get(target2) || this.subscribers.set(target2, /* @__PURE__ */ new Set()) && this.subscribers.get(target2);
  }
  createCSS() {
    return this.cssVar || "";
  }
  getValueFor(element) {
    const value = DesignTokenNode.getOrCreate(element).get(this);
    if (value !== void 0) {
      return value;
    }
    throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${element} or an ancestor of ${element}.`);
  }
  setValueFor(element, value) {
    this._appliedTo.add(element);
    if (value instanceof DesignTokenImpl) {
      value = this.alias(value);
    }
    DesignTokenNode.getOrCreate(element).set(this, value);
    return this;
  }
  deleteValueFor(element) {
    this._appliedTo.delete(element);
    if (DesignTokenNode.existsFor(element)) {
      DesignTokenNode.getOrCreate(element).delete(this);
    }
    return this;
  }
  withDefault(value) {
    this.setValueFor(defaultElement, value);
    return this;
  }
  subscribe(subscriber, target2) {
    const subscriberSet = this.getOrCreateSubscriberSet(target2);
    if (target2 && !DesignTokenNode.existsFor(target2)) {
      DesignTokenNode.getOrCreate(target2);
    }
    if (!subscriberSet.has(subscriber)) {
      subscriberSet.add(subscriber);
    }
  }
  unsubscribe(subscriber, target2) {
    const list = this.subscribers.get(target2 || this);
    if (list && list.has(subscriber)) {
      list.delete(subscriber);
    }
  }
  /**
   * Notifies subscribers that the value for an element has changed.
   * @param element - The element to emit a notification for
   */
  notify(element) {
    const record = Object.freeze({ token: this, target: element });
    if (this.subscribers.has(this)) {
      this.subscribers.get(this).forEach((sub) => sub.handleChange(record));
    }
    if (this.subscribers.has(element)) {
      this.subscribers.get(element).forEach((sub) => sub.handleChange(record));
    }
  }
  /**
   * Alias the token to the provided token.
   * @param token - the token to alias to
   */
  alias(token) {
    return (target2) => token.getValueFor(target2);
  }
}
DesignTokenImpl.uniqueId = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(16);
  };
})();
DesignTokenImpl.tokensById = /* @__PURE__ */ new Map();
class CustomPropertyReflector {
  startReflection(token, target2) {
    token.subscribe(this, target2);
    this.handleChange({ token, target: target2 });
  }
  stopReflection(token, target2) {
    token.unsubscribe(this, target2);
    this.remove(token, target2);
  }
  handleChange(record) {
    const { token, target: target2 } = record;
    this.add(token, target2);
  }
  add(token, target2) {
    PropertyTargetManager.getOrCreate(target2).setProperty(token.cssCustomProperty, this.resolveCSSValue(DesignTokenNode.getOrCreate(target2).get(token)));
  }
  remove(token, target2) {
    PropertyTargetManager.getOrCreate(target2).removeProperty(token.cssCustomProperty);
  }
  resolveCSSValue(value) {
    return value && typeof value.createCSS === "function" ? value.createCSS() : value;
  }
}
class DesignTokenBindingObserver {
  constructor(source, token, node) {
    this.source = source;
    this.token = token;
    this.node = node;
    this.dependencies = /* @__PURE__ */ new Set();
    this.observer = Observable.binding(source, this, false);
    this.observer.handleChange = this.observer.call;
    this.handleChange();
  }
  disconnect() {
    this.observer.disconnect();
  }
  /**
   * @internal
   */
  handleChange() {
    this.node.store.set(this.token, this.observer.observe(this.node.target, defaultExecutionContext));
  }
}
class Store {
  constructor() {
    this.values = /* @__PURE__ */ new Map();
  }
  set(token, value) {
    if (this.values.get(token) !== value) {
      this.values.set(token, value);
      Observable.getNotifier(this).notify(token.id);
    }
  }
  get(token) {
    Observable.track(this, token.id);
    return this.values.get(token);
  }
  delete(token) {
    this.values.delete(token);
  }
  all() {
    return this.values.entries();
  }
}
const nodeCache = /* @__PURE__ */ new WeakMap();
const childToParent = /* @__PURE__ */ new WeakMap();
class DesignTokenNode {
  constructor(target2) {
    this.target = target2;
    this.store = new Store();
    this.children = [];
    this.assignedValues = /* @__PURE__ */ new Map();
    this.reflecting = /* @__PURE__ */ new Set();
    this.bindingObservers = /* @__PURE__ */ new Map();
    this.tokenValueChangeHandler = {
      handleChange: (source, arg) => {
        const token = DesignTokenImpl.getTokenById(arg);
        if (token) {
          token.notify(this.target);
          if (DesignTokenImpl.isCSSDesignToken(token)) {
            const parent = this.parent;
            const reflecting = this.isReflecting(token);
            if (parent) {
              const parentValue = parent.get(token);
              const sourceValue = source.get(token);
              if (parentValue !== sourceValue && !reflecting) {
                this.reflectToCSS(token);
              } else if (parentValue === sourceValue && reflecting) {
                this.stopReflectToCSS(token);
              }
            } else if (!reflecting) {
              this.reflectToCSS(token);
            }
          }
        }
      }
    };
    nodeCache.set(target2, this);
    Observable.getNotifier(this.store).subscribe(this.tokenValueChangeHandler);
    if (target2 instanceof FASTElement) {
      target2.$fastController.addBehaviors([this]);
    } else if (target2.isConnected) {
      this.bind();
    }
  }
  /**
   * Returns a DesignTokenNode for an element.
   * Creates a new instance if one does not already exist for a node,
   * otherwise returns the cached instance
   *
   * @param target - The HTML element to retrieve a DesignTokenNode for
   */
  static getOrCreate(target2) {
    return nodeCache.get(target2) || new DesignTokenNode(target2);
  }
  /**
   * Determines if a DesignTokenNode has been created for a target
   * @param target - The element to test
   */
  static existsFor(target2) {
    return nodeCache.has(target2);
  }
  /**
   * Searches for and return the nearest parent DesignTokenNode.
   * Null is returned if no node is found or the node provided is for a default element.
   */
  static findParent(node) {
    if (!(defaultElement === node.target)) {
      let parent = composedParent(node.target);
      while (parent !== null) {
        if (nodeCache.has(parent)) {
          return nodeCache.get(parent);
        }
        parent = composedParent(parent);
      }
      return DesignTokenNode.getOrCreate(defaultElement);
    }
    return null;
  }
  /**
   * Finds the closest node with a value explicitly assigned for a token, otherwise null.
   * @param token - The token to look for
   * @param start - The node to start looking for value assignment
   * @returns
   */
  static findClosestAssignedNode(token, start) {
    let current = start;
    do {
      if (current.has(token)) {
        return current;
      }
      current = current.parent ? current.parent : current.target !== defaultElement ? DesignTokenNode.getOrCreate(defaultElement) : null;
    } while (current !== null);
    return null;
  }
  /**
   * The parent DesignTokenNode, or null.
   */
  get parent() {
    return childToParent.get(this) || null;
  }
  /**
   * Checks if a token has been assigned an explicit value the node.
   * @param token - the token to check.
   */
  has(token) {
    return this.assignedValues.has(token);
  }
  /**
   * Gets the value of a token for a node
   * @param token - The token to retrieve the value for
   * @returns
   */
  get(token) {
    const value = this.store.get(token);
    if (value !== void 0) {
      return value;
    }
    const raw = this.getRaw(token);
    if (raw !== void 0) {
      this.hydrate(token, raw);
      return this.get(token);
    }
  }
  /**
   * Retrieves the raw assigned value of a token from the nearest assigned node.
   * @param token - The token to retrieve a raw value for
   * @returns
   */
  getRaw(token) {
    var _a3;
    if (this.assignedValues.has(token)) {
      return this.assignedValues.get(token);
    }
    return (_a3 = DesignTokenNode.findClosestAssignedNode(token, this)) === null || _a3 === void 0 ? void 0 : _a3.getRaw(token);
  }
  /**
   * Sets a token to a value for a node
   * @param token - The token to set
   * @param value - The value to set the token to
   */
  set(token, value) {
    if (DesignTokenImpl.isDerivedDesignTokenValue(this.assignedValues.get(token))) {
      this.tearDownBindingObserver(token);
    }
    this.assignedValues.set(token, value);
    if (DesignTokenImpl.isDerivedDesignTokenValue(value)) {
      this.setupBindingObserver(token, value);
    } else {
      this.store.set(token, value);
    }
  }
  /**
   * Deletes a token value for the node.
   * @param token - The token to delete the value for
   */
  delete(token) {
    this.assignedValues.delete(token);
    this.tearDownBindingObserver(token);
    const upstream = this.getRaw(token);
    if (upstream) {
      this.hydrate(token, upstream);
    } else {
      this.store.delete(token);
    }
  }
  /**
   * Invoked when the DesignTokenNode.target is attached to the document
   */
  bind() {
    const parent = DesignTokenNode.findParent(this);
    if (parent) {
      parent.appendChild(this);
    }
    for (const key of this.assignedValues.keys()) {
      key.notify(this.target);
    }
  }
  /**
   * Invoked when the DesignTokenNode.target is detached from the document
   */
  unbind() {
    if (this.parent) {
      const parent = childToParent.get(this);
      parent.removeChild(this);
    }
  }
  /**
   * Appends a child to a parent DesignTokenNode.
   * @param child - The child to append to the node
   */
  appendChild(child) {
    if (child.parent) {
      childToParent.get(child).removeChild(child);
    }
    const reParent = this.children.filter((x) => child.contains(x));
    childToParent.set(child, this);
    this.children.push(child);
    reParent.forEach((x) => child.appendChild(x));
    Observable.getNotifier(this.store).subscribe(child);
    for (const [token, value] of this.store.all()) {
      child.hydrate(token, this.bindingObservers.has(token) ? this.getRaw(token) : value);
    }
  }
  /**
   * Removes a child from a node.
   * @param child - The child to remove.
   */
  removeChild(child) {
    const childIndex = this.children.indexOf(child);
    if (childIndex !== -1) {
      this.children.splice(childIndex, 1);
    }
    Observable.getNotifier(this.store).unsubscribe(child);
    return child.parent === this ? childToParent.delete(child) : false;
  }
  /**
   * Tests whether a provided node is contained by
   * the calling node.
   * @param test - The node to test
   */
  contains(test) {
    return composedContains(this.target, test.target);
  }
  /**
   * Instructs the node to reflect a design token for the provided token.
   * @param token - The design token to reflect
   */
  reflectToCSS(token) {
    if (!this.isReflecting(token)) {
      this.reflecting.add(token);
      DesignTokenNode.cssCustomPropertyReflector.startReflection(token, this.target);
    }
  }
  /**
   * Stops reflecting a DesignToken to CSS
   * @param token - The design token to stop reflecting
   */
  stopReflectToCSS(token) {
    if (this.isReflecting(token)) {
      this.reflecting.delete(token);
      DesignTokenNode.cssCustomPropertyReflector.stopReflection(token, this.target);
    }
  }
  /**
   * Determines if a token is being reflected to CSS for a node.
   * @param token - The token to check for reflection
   * @returns
   */
  isReflecting(token) {
    return this.reflecting.has(token);
  }
  /**
   * Handle changes to upstream tokens
   * @param source - The parent DesignTokenNode
   * @param property - The token ID that changed
   */
  handleChange(source, property) {
    const token = DesignTokenImpl.getTokenById(property);
    if (!token) {
      return;
    }
    this.hydrate(token, this.getRaw(token));
  }
  /**
   * Hydrates a token with a DesignTokenValue, making retrieval available.
   * @param token - The token to hydrate
   * @param value - The value to hydrate
   */
  hydrate(token, value) {
    if (!this.has(token)) {
      const observer2 = this.bindingObservers.get(token);
      if (DesignTokenImpl.isDerivedDesignTokenValue(value)) {
        if (observer2) {
          if (observer2.source !== value) {
            this.tearDownBindingObserver(token);
            this.setupBindingObserver(token, value);
          }
        } else {
          this.setupBindingObserver(token, value);
        }
      } else {
        if (observer2) {
          this.tearDownBindingObserver(token);
        }
        this.store.set(token, value);
      }
    }
  }
  /**
   * Sets up a binding observer for a derived token value that notifies token
   * subscribers on change.
   *
   * @param token - The token to notify when the binding updates
   * @param source - The binding source
   */
  setupBindingObserver(token, source) {
    const binding = new DesignTokenBindingObserver(source, token, this);
    this.bindingObservers.set(token, binding);
    return binding;
  }
  /**
   * Tear down a binding observer for a token.
   */
  tearDownBindingObserver(token) {
    if (this.bindingObservers.has(token)) {
      this.bindingObservers.get(token).disconnect();
      this.bindingObservers.delete(token);
      return true;
    }
    return false;
  }
}
DesignTokenNode.cssCustomPropertyReflector = new CustomPropertyReflector();
__decorate([
  observable$1
], DesignTokenNode.prototype, "children", void 0);
function create$2(nameOrConfig) {
  return DesignTokenImpl.from(nameOrConfig);
}
const DesignToken = Object.freeze({
  create: create$2,
  /**
   * Informs DesignToken that an HTMLElement for which tokens have
   * been set has been connected to the document.
   *
   * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
   * in all scenarios, so invoking this method manually is necessary when:
   *
   * 1. Token values are set for an HTMLElement.
   * 2. The HTMLElement does not inherit from FASTElement.
   * 3. The HTMLElement is not connected to the document when token values are set.
   *
   * @param element - The element to notify
   * @returns - true if notification was successful, otherwise false.
   */
  notifyConnection(element) {
    if (!element.isConnected || !DesignTokenNode.existsFor(element)) {
      return false;
    }
    DesignTokenNode.getOrCreate(element).bind();
    return true;
  },
  /**
   * Informs DesignToken that an HTMLElement for which tokens have
   * been set has been disconnected to the document.
   *
   * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
   * in all scenarios, so invoking this method manually is necessary when:
   *
   * 1. Token values are set for an HTMLElement.
   * 2. The HTMLElement does not inherit from FASTElement.
   *
   * @param element - The element to notify
   * @returns - true if notification was successful, otherwise false.
   */
  notifyDisconnection(element) {
    if (element.isConnected || !DesignTokenNode.existsFor(element)) {
      return false;
    }
    DesignTokenNode.getOrCreate(element).unbind();
    return true;
  },
  /**
   * Registers and element or document as a DesignToken root.
   * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
   * {@link (DesignToken:interface).withDefault} will emit CSS custom properties to all
   * registered roots.
   * @param target - The root to register
   */
  registerRoot(target2 = defaultElement) {
    RootStyleSheetTarget.registerRoot(target2);
  },
  /**
   * Unregister an element or document as a DesignToken root.
   * @param target - The root to deregister
   */
  unregisterRoot(target2 = defaultElement) {
    RootStyleSheetTarget.unregisterRoot(target2);
  }
});
const ElementDisambiguation = Object.freeze({
  /**
   * Skip defining the element but still call the provided callback passed
   * to DesignSystemRegistrationContext.tryDefineElement
   */
  definitionCallbackOnly: null,
  /**
   * Ignore the duplicate element entirely.
   */
  ignoreDuplicate: Symbol()
});
const elementTypesByTag = /* @__PURE__ */ new Map();
const elementTagsByType = /* @__PURE__ */ new Map();
let rootDesignSystem = null;
const designSystemKey = DI$1.createInterface((x) => x.cachedCallback((handler) => {
  if (rootDesignSystem === null) {
    rootDesignSystem = new DefaultDesignSystem(null, handler);
  }
  return rootDesignSystem;
}));
const DesignSystem = Object.freeze({
  /**
   * Returns the HTML element name that the type is defined as.
   * @param type - The type to lookup.
   * @public
   */
  tagFor(type) {
    return elementTagsByType.get(type);
  },
  /**
   * Searches the DOM hierarchy for the design system that is responsible
   * for the provided element.
   * @param element - The element to locate the design system for.
   * @returns The located design system.
   * @public
   */
  responsibleFor(element) {
    const owned = element.$$designSystem$$;
    if (owned) {
      return owned;
    }
    const container2 = DI$1.findResponsibleContainer(element);
    return container2.get(designSystemKey);
  },
  /**
   * Gets the DesignSystem if one is explicitly defined on the provided element;
   * otherwise creates a design system defined directly on the element.
   * @param element - The element to get or create a design system for.
   * @returns The design system.
   * @public
   */
  getOrCreate(node) {
    if (!node) {
      if (rootDesignSystem === null) {
        rootDesignSystem = DI$1.getOrCreateDOMContainer().get(designSystemKey);
      }
      return rootDesignSystem;
    }
    const owned = node.$$designSystem$$;
    if (owned) {
      return owned;
    }
    const container2 = DI$1.getOrCreateDOMContainer(node);
    if (container2.has(designSystemKey, false)) {
      return container2.get(designSystemKey);
    } else {
      const system = new DefaultDesignSystem(node, container2);
      container2.register(Registration.instance(designSystemKey, system));
      return system;
    }
  }
});
function extractTryDefineElementParams(params, elementDefinitionType, elementDefinitionCallback) {
  if (typeof params === "string") {
    return {
      name: params,
      type: elementDefinitionType,
      callback: elementDefinitionCallback
    };
  } else {
    return params;
  }
}
class DefaultDesignSystem {
  constructor(owner, container2) {
    this.owner = owner;
    this.container = container2;
    this.designTokensInitialized = false;
    this.prefix = "fast";
    this.shadowRootMode = void 0;
    this.disambiguate = () => ElementDisambiguation.definitionCallbackOnly;
    if (owner !== null) {
      owner.$$designSystem$$ = this;
    }
  }
  withPrefix(prefix) {
    this.prefix = prefix;
    return this;
  }
  withShadowRootMode(mode) {
    this.shadowRootMode = mode;
    return this;
  }
  withElementDisambiguation(callback) {
    this.disambiguate = callback;
    return this;
  }
  withDesignTokenRoot(root) {
    this.designTokenRoot = root;
    return this;
  }
  register(...registrations) {
    const container2 = this.container;
    const elementDefinitionEntries = [];
    const disambiguate = this.disambiguate;
    const shadowRootMode = this.shadowRootMode;
    const context = {
      elementPrefix: this.prefix,
      tryDefineElement(params, elementDefinitionType, elementDefinitionCallback) {
        const extractedParams = extractTryDefineElementParams(params, elementDefinitionType, elementDefinitionCallback);
        const { name, callback, baseClass } = extractedParams;
        let { type } = extractedParams;
        let elementName = name;
        let typeFoundByName = elementTypesByTag.get(elementName);
        let needsDefine = true;
        while (typeFoundByName) {
          const result = disambiguate(elementName, type, typeFoundByName);
          switch (result) {
            case ElementDisambiguation.ignoreDuplicate:
              return;
            case ElementDisambiguation.definitionCallbackOnly:
              needsDefine = false;
              typeFoundByName = void 0;
              break;
            default:
              elementName = result;
              typeFoundByName = elementTypesByTag.get(elementName);
              break;
          }
        }
        if (needsDefine) {
          if (elementTagsByType.has(type) || type === FoundationElement) {
            type = class extends type {
            };
          }
          elementTypesByTag.set(elementName, type);
          elementTagsByType.set(type, elementName);
          if (baseClass) {
            elementTagsByType.set(baseClass, elementName);
          }
        }
        elementDefinitionEntries.push(new ElementDefinitionEntry(container2, elementName, type, shadowRootMode, callback, needsDefine));
      }
    };
    if (!this.designTokensInitialized) {
      this.designTokensInitialized = true;
      if (this.designTokenRoot !== null) {
        DesignToken.registerRoot(this.designTokenRoot);
      }
    }
    container2.registerWithContext(context, ...registrations);
    for (const entry of elementDefinitionEntries) {
      entry.callback(entry);
      if (entry.willDefine && entry.definition !== null) {
        entry.definition.define();
      }
    }
    return this;
  }
}
class ElementDefinitionEntry {
  constructor(container2, name, type, shadowRootMode, callback, willDefine) {
    this.container = container2;
    this.name = name;
    this.type = type;
    this.shadowRootMode = shadowRootMode;
    this.callback = callback;
    this.willDefine = willDefine;
    this.definition = null;
  }
  definePresentation(presentation) {
    ComponentPresentation.define(this.name, presentation, this.container);
  }
  defineElement(definition) {
    this.definition = new FASTElementDefinition(this.type, Object.assign(Object.assign({}, definition), { name: this.name }));
  }
  tagFor(type) {
    return DesignSystem.tagFor(type);
  }
}
const dialogTemplate = (context, definition) => html`
    <div class="positioning-region" part="positioning-region">
        ${when((x) => x.modal, html`
                <div
                    class="overlay"
                    part="overlay"
                    role="presentation"
                    @click="${(x) => x.dismiss()}"
                ></div>
            `)}
        <div
            role="dialog"
            tabindex="-1"
            class="control"
            part="control"
            aria-modal="${(x) => x.modal}"
            aria-describedby="${(x) => x.ariaDescribedby}"
            aria-labelledby="${(x) => x.ariaLabelledby}"
            aria-label="${(x) => x.ariaLabel}"
            ${ref("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;
/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  return element.getRootNode();
} : function(element) {
  return element.ownerDocument;
};
var getTabindex = function getTabindex2(node, isScope) {
  if (node.tabIndex < 0) {
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute("tabindex"), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r2 = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r2;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot2 = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);
  if (!displayCheck || displayCheck === "full") {
    if (typeof getShadowRoot2 === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot2(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (nodeIsAttached) {
      return !node.getClientRects().length;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
class Dialog extends FoundationElement {
  constructor() {
    super(...arguments);
    this.modal = true;
    this.hidden = false;
    this.trapFocus = true;
    this.trapFocusChanged = () => {
      if (this.$fastController.isConnected) {
        this.updateTrapFocus();
      }
    };
    this.isTrappingFocus = false;
    this.handleDocumentKeydown = (e2) => {
      if (!e2.defaultPrevented && !this.hidden) {
        switch (e2.key) {
          case keyEscape:
            this.dismiss();
            e2.preventDefault();
            break;
          case keyTab:
            this.handleTabKeyDown(e2);
            break;
        }
      }
    };
    this.handleDocumentFocus = (e2) => {
      if (!e2.defaultPrevented && this.shouldForceFocus(e2.target)) {
        this.focusFirstElement();
        e2.preventDefault();
      }
    };
    this.handleTabKeyDown = (e2) => {
      if (!this.trapFocus || this.hidden) {
        return;
      }
      const bounds = this.getTabQueueBounds();
      if (bounds.length === 0) {
        return;
      }
      if (bounds.length === 1) {
        bounds[0].focus();
        e2.preventDefault();
        return;
      }
      if (e2.shiftKey && e2.target === bounds[0]) {
        bounds[bounds.length - 1].focus();
        e2.preventDefault();
      } else if (!e2.shiftKey && e2.target === bounds[bounds.length - 1]) {
        bounds[0].focus();
        e2.preventDefault();
      }
      return;
    };
    this.getTabQueueBounds = () => {
      const bounds = [];
      return Dialog.reduceTabbableItems(bounds, this);
    };
    this.focusFirstElement = () => {
      const bounds = this.getTabQueueBounds();
      if (bounds.length > 0) {
        bounds[0].focus();
      } else {
        if (this.dialog instanceof HTMLElement) {
          this.dialog.focus();
        }
      }
    };
    this.shouldForceFocus = (currentFocusElement) => {
      return this.isTrappingFocus && !this.contains(currentFocusElement);
    };
    this.shouldTrapFocus = () => {
      return this.trapFocus && !this.hidden;
    };
    this.updateTrapFocus = (shouldTrapFocusOverride) => {
      const shouldTrapFocus = shouldTrapFocusOverride === void 0 ? this.shouldTrapFocus() : shouldTrapFocusOverride;
      if (shouldTrapFocus && !this.isTrappingFocus) {
        this.isTrappingFocus = true;
        document.addEventListener("focusin", this.handleDocumentFocus);
        DOM.queueUpdate(() => {
          if (this.shouldForceFocus(document.activeElement)) {
            this.focusFirstElement();
          }
        });
      } else if (!shouldTrapFocus && this.isTrappingFocus) {
        this.isTrappingFocus = false;
        document.removeEventListener("focusin", this.handleDocumentFocus);
      }
    };
  }
  /**
   * @internal
   */
  dismiss() {
    this.$emit("dismiss");
    this.$emit("cancel");
  }
  /**
   * The method to show the dialog.
   *
   * @public
   */
  show() {
    this.hidden = false;
  }
  /**
   * The method to hide the dialog.
   *
   * @public
   */
  hide() {
    this.hidden = true;
    this.$emit("close");
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this.handleDocumentKeydown);
    this.notifier = Observable.getNotifier(this);
    this.notifier.subscribe(this, "hidden");
    this.updateTrapFocus();
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeydown);
    this.updateTrapFocus(false);
    this.notifier.unsubscribe(this, "hidden");
  }
  /**
   * @internal
   */
  handleChange(source, propertyName) {
    switch (propertyName) {
      case "hidden":
        this.updateTrapFocus();
        break;
    }
  }
  /**
   * Reduce a collection to only its focusable elements.
   *
   * @param elements - Collection of elements to reduce
   * @param element - The current element
   *
   * @internal
   */
  static reduceTabbableItems(elements, element) {
    if (element.getAttribute("tabindex") === "-1") {
      return elements;
    }
    if (isTabbable(element) || Dialog.isFocusableFastElement(element) && Dialog.hasTabbableShadow(element)) {
      elements.push(element);
      return elements;
    }
    if (element.childElementCount) {
      return elements.concat(Array.from(element.children).reduce(Dialog.reduceTabbableItems, []));
    }
    return elements;
  }
  /**
   * Test if element is focusable fast element
   *
   * @param element - The element to check
   *
   * @internal
   */
  static isFocusableFastElement(element) {
    var _a3, _b2;
    return !!((_b2 = (_a3 = element.$fastController) === null || _a3 === void 0 ? void 0 : _a3.definition.shadowOptions) === null || _b2 === void 0 ? void 0 : _b2.delegatesFocus);
  }
  /**
   * Test if the element has a focusable shadow
   *
   * @param element - The element to check
   *
   * @internal
   */
  static hasTabbableShadow(element) {
    var _a3, _b2;
    return Array.from((_b2 = (_a3 = element.shadowRoot) === null || _a3 === void 0 ? void 0 : _a3.querySelectorAll("*")) !== null && _b2 !== void 0 ? _b2 : []).some((x) => {
      return isTabbable(x);
    });
  }
}
__decorate([
  attr({ mode: "boolean" })
], Dialog.prototype, "modal", void 0);
__decorate([
  attr({ mode: "boolean" })
], Dialog.prototype, "hidden", void 0);
__decorate([
  attr({ attribute: "trap-focus", mode: "boolean" })
], Dialog.prototype, "trapFocus", void 0);
__decorate([
  attr({ attribute: "aria-describedby" })
], Dialog.prototype, "ariaDescribedby", void 0);
__decorate([
  attr({ attribute: "aria-labelledby" })
], Dialog.prototype, "ariaLabelledby", void 0);
__decorate([
  attr({ attribute: "aria-label" })
], Dialog.prototype, "ariaLabel", void 0);
const listboxOptionTemplate = (context, definition) => html`
    <template
        aria-checked="${(x) => x.ariaChecked}"
        aria-disabled="${(x) => x.ariaDisabled}"
        aria-posinset="${(x) => x.ariaPosInSet}"
        aria-selected="${(x) => x.ariaSelected}"
        aria-setsize="${(x) => x.ariaSetSize}"
        class="${(x) => [x.checked && "checked", x.selected && "selected", x.disabled && "disabled"].filter(Boolean).join(" ")}"
        role="option"
    >
        ${startSlotTemplate(context, definition)}
        <span class="content" part="content">
            <slot ${slotted("content")}></slot>
        </span>
        ${endSlotTemplate(context, definition)}
    </template>
`;
class ListboxElement extends Listbox {
  constructor() {
    super(...arguments);
    this.activeIndex = -1;
    this.rangeStartIndex = -1;
  }
  /**
   * Returns the last checked option.
   *
   * @internal
   */
  get activeOption() {
    return this.options[this.activeIndex];
  }
  /**
   * Returns the list of checked options.
   *
   * @internal
   */
  get checkedOptions() {
    var _a3;
    return (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.filter((o2) => o2.checked);
  }
  /**
   * Returns the index of the first selected option.
   *
   * @internal
   */
  get firstSelectedOptionIndex() {
    return this.options.indexOf(this.firstSelectedOption);
  }
  /**
   * Updates the `ariaActiveDescendant` property when the active index changes.
   *
   * @param prev - the previous active index
   * @param next - the next active index
   *
   * @internal
   */
  activeIndexChanged(prev, next) {
    var _a3, _b2;
    this.ariaActiveDescendant = (_b2 = (_a3 = this.options[next]) === null || _a3 === void 0 ? void 0 : _a3.id) !== null && _b2 !== void 0 ? _b2 : "";
    this.focusAndScrollOptionIntoView();
  }
  /**
   * Toggles the checked state for the currently active option.
   *
   * @remarks
   * Multiple-selection mode only.
   *
   * @internal
   */
  checkActiveIndex() {
    if (!this.multiple) {
      return;
    }
    const activeItem = this.activeOption;
    if (activeItem) {
      activeItem.checked = true;
    }
  }
  /**
   * Sets the active index to the first option and marks it as checked.
   *
   * @remarks
   * Multi-selection mode only.
   *
   * @param preserveChecked - mark all options unchecked before changing the active index
   *
   * @internal
   */
  checkFirstOption(preserveChecked = false) {
    if (preserveChecked) {
      if (this.rangeStartIndex === -1) {
        this.rangeStartIndex = this.activeIndex + 1;
      }
      this.options.forEach((o2, i) => {
        o2.checked = inRange(i, this.rangeStartIndex);
      });
    } else {
      this.uncheckAllOptions();
    }
    this.activeIndex = 0;
    this.checkActiveIndex();
  }
  /**
   * Decrements the active index and sets the matching option as checked.
   *
   * @remarks
   * Multi-selection mode only.
   *
   * @param preserveChecked - mark all options unchecked before changing the active index
   *
   * @internal
   */
  checkLastOption(preserveChecked = false) {
    if (preserveChecked) {
      if (this.rangeStartIndex === -1) {
        this.rangeStartIndex = this.activeIndex;
      }
      this.options.forEach((o2, i) => {
        o2.checked = inRange(i, this.rangeStartIndex, this.options.length);
      });
    } else {
      this.uncheckAllOptions();
    }
    this.activeIndex = this.options.length - 1;
    this.checkActiveIndex();
  }
  /**
   * @override
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("focusout", this.focusoutHandler);
  }
  /**
   * @override
   * @internal
   */
  disconnectedCallback() {
    this.removeEventListener("focusout", this.focusoutHandler);
    super.disconnectedCallback();
  }
  /**
   * Increments the active index and marks the matching option as checked.
   *
   * @remarks
   * Multiple-selection mode only.
   *
   * @param preserveChecked - mark all options unchecked before changing the active index
   *
   * @internal
   */
  checkNextOption(preserveChecked = false) {
    if (preserveChecked) {
      if (this.rangeStartIndex === -1) {
        this.rangeStartIndex = this.activeIndex;
      }
      this.options.forEach((o2, i) => {
        o2.checked = inRange(i, this.rangeStartIndex, this.activeIndex + 1);
      });
    } else {
      this.uncheckAllOptions();
    }
    this.activeIndex += this.activeIndex < this.options.length - 1 ? 1 : 0;
    this.checkActiveIndex();
  }
  /**
   * Decrements the active index and marks the matching option as checked.
   *
   * @remarks
   * Multiple-selection mode only.
   *
   * @param preserveChecked - mark all options unchecked before changing the active index
   *
   * @internal
   */
  checkPreviousOption(preserveChecked = false) {
    if (preserveChecked) {
      if (this.rangeStartIndex === -1) {
        this.rangeStartIndex = this.activeIndex;
      }
      if (this.checkedOptions.length === 1) {
        this.rangeStartIndex += 1;
      }
      this.options.forEach((o2, i) => {
        o2.checked = inRange(i, this.activeIndex, this.rangeStartIndex);
      });
    } else {
      this.uncheckAllOptions();
    }
    this.activeIndex -= this.activeIndex > 0 ? 1 : 0;
    this.checkActiveIndex();
  }
  /**
   * Handles click events for listbox options.
   *
   * @param e - the event object
   *
   * @override
   * @internal
   */
  clickHandler(e2) {
    var _a3;
    if (!this.multiple) {
      return super.clickHandler(e2);
    }
    const captured = (_a3 = e2.target) === null || _a3 === void 0 ? void 0 : _a3.closest(`[role=option]`);
    if (!captured || captured.disabled) {
      return;
    }
    this.uncheckAllOptions();
    this.activeIndex = this.options.indexOf(captured);
    this.checkActiveIndex();
    this.toggleSelectedForAllCheckedOptions();
    return true;
  }
  /**
   * @override
   * @internal
   */
  focusAndScrollOptionIntoView() {
    super.focusAndScrollOptionIntoView(this.activeOption);
  }
  /**
   * In multiple-selection mode:
   * If any options are selected, the first selected option is checked when
   * the listbox receives focus. If no options are selected, the first
   * selectable option is checked.
   *
   * @override
   * @internal
   */
  focusinHandler(e2) {
    if (!this.multiple) {
      return super.focusinHandler(e2);
    }
    if (!this.shouldSkipFocus && e2.target === e2.currentTarget) {
      this.uncheckAllOptions();
      if (this.activeIndex === -1) {
        this.activeIndex = this.firstSelectedOptionIndex !== -1 ? this.firstSelectedOptionIndex : 0;
      }
      this.checkActiveIndex();
      this.setSelectedOptions();
      this.focusAndScrollOptionIntoView();
    }
    this.shouldSkipFocus = false;
  }
  /**
   * Unchecks all options when the listbox loses focus.
   *
   * @internal
   */
  focusoutHandler(e2) {
    if (this.multiple) {
      this.uncheckAllOptions();
    }
  }
  /**
   * Handles keydown actions for listbox navigation and typeahead
   *
   * @override
   * @internal
   */
  keydownHandler(e2) {
    if (!this.multiple) {
      return super.keydownHandler(e2);
    }
    if (this.disabled) {
      return true;
    }
    const { key, shiftKey } = e2;
    this.shouldSkipFocus = false;
    switch (key) {
      case keyHome: {
        this.checkFirstOption(shiftKey);
        return;
      }
      case keyArrowDown: {
        this.checkNextOption(shiftKey);
        return;
      }
      case keyArrowUp: {
        this.checkPreviousOption(shiftKey);
        return;
      }
      case keyEnd: {
        this.checkLastOption(shiftKey);
        return;
      }
      case keyTab: {
        this.focusAndScrollOptionIntoView();
        return true;
      }
      case keyEscape: {
        this.uncheckAllOptions();
        this.checkActiveIndex();
        return true;
      }
      case keySpace: {
        e2.preventDefault();
        if (this.typeAheadExpired) {
          this.toggleSelectedForAllCheckedOptions();
          return;
        }
      }
      default: {
        if (key.length === 1) {
          this.handleTypeAhead(`${key}`);
        }
        return true;
      }
    }
  }
  /**
   * Prevents `focusin` events from firing before `click` events when the
   * element is unfocused.
   *
   * @override
   * @internal
   */
  mousedownHandler(e2) {
    if (e2.offsetX >= 0 && e2.offsetX <= this.scrollWidth) {
      return super.mousedownHandler(e2);
    }
  }
  /**
   * Switches between single-selection and multi-selection mode.
   *
   * @internal
   */
  multipleChanged(prev, next) {
    var _a3;
    this.ariaMultiSelectable = next ? "true" : null;
    (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.forEach((o2) => {
      o2.checked = next ? false : void 0;
    });
    this.setSelectedOptions();
  }
  /**
   * Sets an option as selected and gives it focus.
   *
   * @override
   * @public
   */
  setSelectedOptions() {
    if (!this.multiple) {
      super.setSelectedOptions();
      return;
    }
    if (this.$fastController.isConnected && this.options) {
      this.selectedOptions = this.options.filter((o2) => o2.selected);
      this.focusAndScrollOptionIntoView();
    }
  }
  /**
   * Ensures the size is a positive integer when the property is updated.
   *
   * @param prev - the previous size value
   * @param next - the current size value
   *
   * @internal
   */
  sizeChanged(prev, next) {
    var _a3;
    const size = Math.max(0, parseInt((_a3 = next === null || next === void 0 ? void 0 : next.toFixed()) !== null && _a3 !== void 0 ? _a3 : "", 10));
    if (size !== next) {
      DOM.queueUpdate(() => {
        this.size = size;
      });
    }
  }
  /**
   * Toggles the selected state of the provided options. If any provided items
   * are in an unselected state, all items are set to selected. If every
   * provided item is selected, they are all unselected.
   *
   * @internal
   */
  toggleSelectedForAllCheckedOptions() {
    const enabledCheckedOptions = this.checkedOptions.filter((o2) => !o2.disabled);
    const force = !enabledCheckedOptions.every((o2) => o2.selected);
    enabledCheckedOptions.forEach((o2) => o2.selected = force);
    this.selectedIndex = this.options.indexOf(enabledCheckedOptions[enabledCheckedOptions.length - 1]);
    this.setSelectedOptions();
  }
  /**
   * @override
   * @internal
   */
  typeaheadBufferChanged(prev, next) {
    if (!this.multiple) {
      super.typeaheadBufferChanged(prev, next);
      return;
    }
    if (this.$fastController.isConnected) {
      const typeaheadMatches = this.getTypeaheadMatches();
      const activeIndex = this.options.indexOf(typeaheadMatches[0]);
      if (activeIndex > -1) {
        this.activeIndex = activeIndex;
        this.uncheckAllOptions();
        this.checkActiveIndex();
      }
      this.typeAheadExpired = false;
    }
  }
  /**
   * Unchecks all options.
   *
   * @remarks
   * Multiple-selection mode only.
   *
   * @param preserveChecked - reset the rangeStartIndex
   *
   * @internal
   */
  uncheckAllOptions(preserveChecked = false) {
    this.options.forEach((o2) => o2.checked = this.multiple ? false : void 0);
    if (!preserveChecked) {
      this.rangeStartIndex = -1;
    }
  }
}
__decorate([
  observable$1
], ListboxElement.prototype, "activeIndex", void 0);
__decorate([
  attr({ mode: "boolean" })
], ListboxElement.prototype, "multiple", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], ListboxElement.prototype, "size", void 0);
const numberFieldTemplate = (context, definition) => html`
    <template class="${(x) => x.readOnly ? "readonly" : ""}">
        <label
            part="label"
            for="control"
            class="${(x) => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"
        >
            <slot ${slotted("defaultSlottedNodes")}></slot>
        </label>
        <div class="root" part="root">
            ${startSlotTemplate(context, definition)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${(x) => x.handleTextInput()}"
                @change="${(x) => x.handleChange()}"
                @keydown="${(x, c2) => x.handleKeyDown(c2.event)}"
                @blur="${(x, c2) => x.handleBlur()}"
                ?autofocus="${(x) => x.autofocus}"
                ?disabled="${(x) => x.disabled}"
                list="${(x) => x.list}"
                maxlength="${(x) => x.maxlength}"
                minlength="${(x) => x.minlength}"
                placeholder="${(x) => x.placeholder}"
                ?readonly="${(x) => x.readOnly}"
                ?required="${(x) => x.required}"
                size="${(x) => x.size}"
                type="text"
                inputmode="numeric"
                min="${(x) => x.min}"
                max="${(x) => x.max}"
                step="${(x) => x.step}"
                aria-atomic="${(x) => x.ariaAtomic}"
                aria-busy="${(x) => x.ariaBusy}"
                aria-controls="${(x) => x.ariaControls}"
                aria-current="${(x) => x.ariaCurrent}"
                aria-describedby="${(x) => x.ariaDescribedby}"
                aria-details="${(x) => x.ariaDetails}"
                aria-disabled="${(x) => x.ariaDisabled}"
                aria-errormessage="${(x) => x.ariaErrormessage}"
                aria-flowto="${(x) => x.ariaFlowto}"
                aria-haspopup="${(x) => x.ariaHaspopup}"
                aria-hidden="${(x) => x.ariaHidden}"
                aria-invalid="${(x) => x.ariaInvalid}"
                aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
                aria-label="${(x) => x.ariaLabel}"
                aria-labelledby="${(x) => x.ariaLabelledby}"
                aria-live="${(x) => x.ariaLive}"
                aria-owns="${(x) => x.ariaOwns}"
                aria-relevant="${(x) => x.ariaRelevant}"
                aria-roledescription="${(x) => x.ariaRoledescription}"
                ${ref("control")}
            />
            ${when((x) => !x.hideStep && !x.readOnly && !x.disabled, html`
                    <div class="controls" part="controls">
                        <div class="step-up" part="step-up" @click="${(x) => x.stepUp()}">
                            <slot name="step-up-glyph">
                                ${definition.stepUpGlyph || ""}
                            </slot>
                        </div>
                        <div
                            class="step-down"
                            part="step-down"
                            @click="${(x) => x.stepDown()}"
                        >
                            <slot name="step-down-glyph">
                                ${definition.stepDownGlyph || ""}
                            </slot>
                        </div>
                    </div>
                `)}
            ${endSlotTemplate(context, definition)}
        </div>
    </template>
`;
class _TextField extends FoundationElement {
}
class FormAssociatedTextField extends FormAssociated(_TextField) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}
const TextFieldType = {
  /**
   * An email TextField
   */
  email: "email",
  /**
   * A password TextField
   */
  password: "password",
  /**
   * A telephone TextField
   */
  tel: "tel",
  /**
   * A text TextField
   */
  text: "text",
  /**
   * A URL TextField
   */
  url: "url"
};
let TextField$1 = class TextField extends FormAssociatedTextField {
  constructor() {
    super(...arguments);
    this.type = TextFieldType.text;
  }
  readOnlyChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
      this.validate();
    }
  }
  autofocusChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.autofocus = this.autofocus;
      this.validate();
    }
  }
  placeholderChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.placeholder = this.placeholder;
    }
  }
  typeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
      this.validate();
    }
  }
  listChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.setAttribute("list", this.list);
      this.validate();
    }
  }
  maxlengthChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.maxLength = this.maxlength;
      this.validate();
    }
  }
  minlengthChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.minLength = this.minlength;
      this.validate();
    }
  }
  patternChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.pattern = this.pattern;
      this.validate();
    }
  }
  sizeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.size = this.size;
    }
  }
  spellcheckChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.spellcheck = this.spellcheck;
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.proxy.setAttribute("type", this.type);
    this.validate();
    if (this.autofocus) {
      DOM.queueUpdate(() => {
        this.focus();
      });
    }
  }
  /**
   * Selects all the text in the text field
   *
   * @public
   */
  select() {
    this.control.select();
    this.$emit("select");
  }
  /**
   * Handles the internal control's `input` event
   * @internal
   */
  handleTextInput() {
    this.value = this.control.value;
  }
  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  handleChange() {
    this.$emit("change");
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
};
__decorate([
  attr({ attribute: "readonly", mode: "boolean" })
], TextField$1.prototype, "readOnly", void 0);
__decorate([
  attr({ mode: "boolean" })
], TextField$1.prototype, "autofocus", void 0);
__decorate([
  attr
], TextField$1.prototype, "placeholder", void 0);
__decorate([
  attr
], TextField$1.prototype, "type", void 0);
__decorate([
  attr
], TextField$1.prototype, "list", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], TextField$1.prototype, "maxlength", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], TextField$1.prototype, "minlength", void 0);
__decorate([
  attr
], TextField$1.prototype, "pattern", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], TextField$1.prototype, "size", void 0);
__decorate([
  attr({ mode: "boolean" })
], TextField$1.prototype, "spellcheck", void 0);
__decorate([
  observable$1
], TextField$1.prototype, "defaultSlottedNodes", void 0);
class DelegatesARIATextbox {
}
applyMixins(DelegatesARIATextbox, ARIAGlobalStatesAndProperties);
applyMixins(TextField$1, StartEnd, DelegatesARIATextbox);
class _NumberField extends FoundationElement {
}
class FormAssociatedNumberField extends FormAssociated(_NumberField) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("input");
  }
}
let NumberField$1 = class NumberField extends FormAssociatedNumberField {
  constructor() {
    super(...arguments);
    this.hideStep = false;
    this.step = 1;
    this.isUserInput = false;
  }
  /**
   * Ensures that the max is greater than the min and that the value
   *  is less than the max
   * @param previous - the previous max value
   * @param next - updated max value
   *
   * @internal
   */
  maxChanged(previous, next) {
    var _a3;
    this.max = Math.max(next, (_a3 = this.min) !== null && _a3 !== void 0 ? _a3 : next);
    const min = Math.min(this.min, this.max);
    if (this.min !== void 0 && this.min !== min) {
      this.min = min;
    }
    this.value = this.getValidValue(this.value);
  }
  /**
   * Ensures that the min is less than the max and that the value
   *  is greater than the min
   * @param previous - previous min value
   * @param next - updated min value
   *
   * @internal
   */
  minChanged(previous, next) {
    var _a3;
    this.min = Math.min(next, (_a3 = this.max) !== null && _a3 !== void 0 ? _a3 : next);
    const max = Math.max(this.min, this.max);
    if (this.max !== void 0 && this.max !== max) {
      this.max = max;
    }
    this.value = this.getValidValue(this.value);
  }
  /**
   * The value property, typed as a number.
   *
   * @public
   */
  get valueAsNumber() {
    return parseFloat(super.value);
  }
  set valueAsNumber(next) {
    this.value = next.toString();
  }
  /**
   * Validates that the value is a number between the min and max
   * @param previous - previous stored value
   * @param next - value being updated
   * @param updateControl - should the text field be updated with value, defaults to true
   * @internal
   */
  valueChanged(previous, next) {
    this.value = this.getValidValue(next);
    if (next !== this.value) {
      return;
    }
    if (this.control && !this.isUserInput) {
      this.control.value = this.value;
    }
    super.valueChanged(previous, this.value);
    if (previous !== void 0 && !this.isUserInput) {
      this.$emit("input");
      this.$emit("change");
    }
    this.isUserInput = false;
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
  /**
   * Sets the internal value to a valid number between the min and max properties
   * @param value - user input
   *
   * @internal
   */
  getValidValue(value) {
    var _a3, _b2;
    let validValue = parseFloat(parseFloat(value).toPrecision(12));
    if (isNaN(validValue)) {
      validValue = "";
    } else {
      validValue = Math.min(validValue, (_a3 = this.max) !== null && _a3 !== void 0 ? _a3 : validValue);
      validValue = Math.max(validValue, (_b2 = this.min) !== null && _b2 !== void 0 ? _b2 : validValue).toString();
    }
    return validValue;
  }
  /**
   * Increments the value using the step value
   *
   * @public
   */
  stepUp() {
    const value = parseFloat(this.value);
    const stepUpValue = !isNaN(value) ? value + this.step : this.min > 0 ? this.min : this.max < 0 ? this.max : !this.min ? this.step : 0;
    this.value = stepUpValue.toString();
  }
  /**
   * Decrements the value using the step value
   *
   * @public
   */
  stepDown() {
    const value = parseFloat(this.value);
    const stepDownValue = !isNaN(value) ? value - this.step : this.min > 0 ? this.min : this.max < 0 ? this.max : !this.min ? 0 - this.step : 0;
    this.value = stepDownValue.toString();
  }
  /**
   * Sets up the initial state of the number field
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.proxy.setAttribute("type", "number");
    this.validate();
    this.control.value = this.value;
    if (this.autofocus) {
      DOM.queueUpdate(() => {
        this.focus();
      });
    }
  }
  /**
   * Selects all the text in the number field
   *
   * @public
   */
  select() {
    this.control.select();
    this.$emit("select");
  }
  /**
   * Handles the internal control's `input` event
   * @internal
   */
  handleTextInput() {
    this.control.value = this.control.value.replace(/[^0-9\-+e.]/g, "");
    this.isUserInput = true;
    this.value = this.control.value;
  }
  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  handleChange() {
    this.$emit("change");
  }
  /**
   * Handles the internal control's `keydown` event
   * @internal
   */
  handleKeyDown(e2) {
    const key = e2.key;
    switch (key) {
      case keyArrowUp:
        this.stepUp();
        return false;
      case keyArrowDown:
        this.stepDown();
        return false;
    }
    return true;
  }
  /**
   * Handles populating the input field with a validated value when
   *  leaving the input field.
   * @internal
   */
  handleBlur() {
    this.control.value = this.value;
  }
};
__decorate([
  attr({ attribute: "readonly", mode: "boolean" })
], NumberField$1.prototype, "readOnly", void 0);
__decorate([
  attr({ mode: "boolean" })
], NumberField$1.prototype, "autofocus", void 0);
__decorate([
  attr({ attribute: "hide-step", mode: "boolean" })
], NumberField$1.prototype, "hideStep", void 0);
__decorate([
  attr
], NumberField$1.prototype, "placeholder", void 0);
__decorate([
  attr
], NumberField$1.prototype, "list", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], NumberField$1.prototype, "maxlength", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], NumberField$1.prototype, "minlength", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], NumberField$1.prototype, "size", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], NumberField$1.prototype, "step", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], NumberField$1.prototype, "max", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], NumberField$1.prototype, "min", void 0);
__decorate([
  observable$1
], NumberField$1.prototype, "defaultSlottedNodes", void 0);
applyMixins(NumberField$1, StartEnd, DelegatesARIATextbox);
const progressSegments = 44;
const progressRingTemplate = (context, definition) => html`
    <template
        role="progressbar"
        aria-valuenow="${(x) => x.value}"
        aria-valuemin="${(x) => x.min}"
        aria-valuemax="${(x) => x.max}"
        class="${(x) => x.paused ? "paused" : ""}"
    >
        ${when((x) => typeof x.value === "number", html`
                <svg
                    class="progress"
                    part="progress"
                    viewBox="0 0 16 16"
                    slot="determinate"
                >
                    <circle
                        class="background"
                        part="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        part="determinate"
                        style="stroke-dasharray: ${(x) => progressSegments * x.percentComplete / 100}px ${progressSegments}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `, html`
                <slot name="indeterminate" slot="indeterminate">
                    ${definition.indeterminateIndicator || ""}
                </slot>
            `)}
    </template>
`;
class BaseProgress extends FoundationElement {
  constructor() {
    super(...arguments);
    this.percentComplete = 0;
  }
  valueChanged() {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }
  minChanged() {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }
  maxChanged() {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.updatePercentComplete();
  }
  updatePercentComplete() {
    const min = typeof this.min === "number" ? this.min : 0;
    const max = typeof this.max === "number" ? this.max : 100;
    const value = typeof this.value === "number" ? this.value : 0;
    const range2 = max - min;
    this.percentComplete = range2 === 0 ? 0 : Math.fround((value - min) / range2 * 100);
  }
}
__decorate([
  attr({ converter: nullableNumberConverter })
], BaseProgress.prototype, "value", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], BaseProgress.prototype, "min", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], BaseProgress.prototype, "max", void 0);
__decorate([
  attr({ mode: "boolean" })
], BaseProgress.prototype, "paused", void 0);
__decorate([
  observable$1
], BaseProgress.prototype, "percentComplete", void 0);
function whitespaceFilter(value, index, array2) {
  return value.nodeType !== Node.TEXT_NODE ? true : typeof value.nodeValue === "string" && !!value.nodeValue.trim().length;
}
class _Select extends ListboxElement {
}
class FormAssociatedSelect extends FormAssociated(_Select) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("select");
  }
}
class Select extends FormAssociatedSelect {
  constructor() {
    super(...arguments);
    this.open = false;
    this.forcedPosition = false;
    this.listboxId = uniqueId("listbox-");
    this.maxHeight = 0;
  }
  /**
   * Sets focus and synchronizes ARIA attributes when the open property changes.
   *
   * @param prev - the previous open value
   * @param next - the current open value
   *
   * @internal
   */
  openChanged(prev, next) {
    if (!this.collapsible) {
      return;
    }
    if (this.open) {
      this.ariaControls = this.listboxId;
      this.ariaExpanded = "true";
      this.setPositioning();
      this.focusAndScrollOptionIntoView();
      this.indexWhenOpened = this.selectedIndex;
      DOM.queueUpdate(() => this.focus());
      return;
    }
    this.ariaControls = "";
    this.ariaExpanded = "false";
  }
  /**
   * The component is collapsible when in single-selection mode with no size attribute.
   *
   * @internal
   */
  get collapsible() {
    return !(this.multiple || typeof this.size === "number");
  }
  /**
   * The value property.
   *
   * @public
   */
  get value() {
    Observable.track(this, "value");
    return this._value;
  }
  set value(next) {
    var _a3, _b2, _c2, _d2, _e2, _f2, _g2;
    const prev = `${this._value}`;
    if ((_a3 = this._options) === null || _a3 === void 0 ? void 0 : _a3.length) {
      const selectedIndex = this._options.findIndex((el) => el.value === next);
      const prevSelectedValue = (_c2 = (_b2 = this._options[this.selectedIndex]) === null || _b2 === void 0 ? void 0 : _b2.value) !== null && _c2 !== void 0 ? _c2 : null;
      const nextSelectedValue = (_e2 = (_d2 = this._options[selectedIndex]) === null || _d2 === void 0 ? void 0 : _d2.value) !== null && _e2 !== void 0 ? _e2 : null;
      if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
        next = "";
        this.selectedIndex = selectedIndex;
      }
      next = (_g2 = (_f2 = this.firstSelectedOption) === null || _f2 === void 0 ? void 0 : _f2.value) !== null && _g2 !== void 0 ? _g2 : next;
    }
    if (prev !== next) {
      this._value = next;
      super.valueChanged(prev, next);
      Observable.notify(this, "value");
      this.updateDisplayValue();
    }
  }
  /**
   * Sets the value and display value to match the first selected option.
   *
   * @param shouldEmit - if true, the input and change events will be emitted
   *
   * @internal
   */
  updateValue(shouldEmit) {
    var _a3, _b2;
    if (this.$fastController.isConnected) {
      this.value = (_b2 = (_a3 = this.firstSelectedOption) === null || _a3 === void 0 ? void 0 : _a3.value) !== null && _b2 !== void 0 ? _b2 : "";
    }
    if (shouldEmit) {
      this.$emit("input");
      this.$emit("change", this, {
        bubbles: true,
        composed: void 0
      });
    }
  }
  /**
   * Updates the proxy value when the selected index changes.
   *
   * @param prev - the previous selected index
   * @param next - the next selected index
   *
   * @internal
   */
  selectedIndexChanged(prev, next) {
    super.selectedIndexChanged(prev, next);
    this.updateValue();
  }
  positionChanged(prev, next) {
    this.positionAttribute = next;
    this.setPositioning();
  }
  /**
   * Calculate and apply listbox positioning based on available viewport space.
   *
   * @public
   */
  setPositioning() {
    const currentBox = this.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const availableBottom = viewportHeight - currentBox.bottom;
    this.position = this.forcedPosition ? this.positionAttribute : currentBox.top > availableBottom ? SelectPosition.above : SelectPosition.below;
    this.positionAttribute = this.forcedPosition ? this.positionAttribute : this.position;
    this.maxHeight = this.position === SelectPosition.above ? ~~currentBox.top : ~~availableBottom;
  }
  /**
   * The value displayed on the button.
   *
   * @public
   */
  get displayValue() {
    var _a3, _b2;
    Observable.track(this, "displayValue");
    return (_b2 = (_a3 = this.firstSelectedOption) === null || _a3 === void 0 ? void 0 : _a3.text) !== null && _b2 !== void 0 ? _b2 : "";
  }
  /**
   * Synchronize the `aria-disabled` property when the `disabled` property changes.
   *
   * @param prev - The previous disabled value
   * @param next - The next disabled value
   *
   * @internal
   */
  disabledChanged(prev, next) {
    if (super.disabledChanged) {
      super.disabledChanged(prev, next);
    }
    this.ariaDisabled = this.disabled ? "true" : "false";
  }
  /**
   * Reset the element to its first selectable option when its parent form is reset.
   *
   * @internal
   */
  formResetCallback() {
    this.setProxyOptions();
    super.setDefaultSelectedOption();
    if (this.selectedIndex === -1) {
      this.selectedIndex = 0;
    }
  }
  /**
   * Handle opening and closing the listbox when the select is clicked.
   *
   * @param e - the mouse event
   * @internal
   */
  clickHandler(e2) {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      const captured = e2.target.closest(`option,[role=option]`);
      if (captured && captured.disabled) {
        return;
      }
    }
    super.clickHandler(e2);
    this.open = this.collapsible && !this.open;
    if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
      this.updateValue(true);
    }
    return true;
  }
  /**
   * Handles focus state when the element or its children lose focus.
   *
   * @param e - The focus event
   * @internal
   */
  focusoutHandler(e2) {
    var _a3;
    super.focusoutHandler(e2);
    if (!this.open) {
      return true;
    }
    const focusTarget = e2.relatedTarget;
    if (this.isSameNode(focusTarget)) {
      this.focus();
      return;
    }
    if (!((_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.includes(focusTarget))) {
      this.open = false;
      if (this.indexWhenOpened !== this.selectedIndex) {
        this.updateValue(true);
      }
    }
  }
  /**
   * Updates the value when an option's value changes.
   *
   * @param source - the source object
   * @param propertyName - the property to evaluate
   *
   * @internal
   * @override
   */
  handleChange(source, propertyName) {
    super.handleChange(source, propertyName);
    if (propertyName === "value") {
      this.updateValue();
    }
  }
  /**
   * Synchronize the form-associated proxy and updates the value property of the element.
   *
   * @param prev - the previous collection of slotted option elements
   * @param next - the next collection of slotted option elements
   *
   * @internal
   */
  slottedOptionsChanged(prev, next) {
    this.options.forEach((o2) => {
      const notifier = Observable.getNotifier(o2);
      notifier.unsubscribe(this, "value");
    });
    super.slottedOptionsChanged(prev, next);
    this.options.forEach((o2) => {
      const notifier = Observable.getNotifier(o2);
      notifier.subscribe(this, "value");
    });
    this.setProxyOptions();
    this.updateValue();
  }
  /**
   * Prevents focus when size is set and a scrollbar is clicked.
   *
   * @param e - the mouse event object
   *
   * @override
   * @internal
   */
  mousedownHandler(e2) {
    var _a3;
    if (e2.offsetX >= 0 && e2.offsetX <= ((_a3 = this.listbox) === null || _a3 === void 0 ? void 0 : _a3.scrollWidth)) {
      return super.mousedownHandler(e2);
    }
    return this.collapsible;
  }
  /**
   * Sets the multiple property on the proxy element.
   *
   * @param prev - the previous multiple value
   * @param next - the current multiple value
   */
  multipleChanged(prev, next) {
    super.multipleChanged(prev, next);
    if (this.proxy) {
      this.proxy.multiple = next;
    }
  }
  /**
   * Updates the selectedness of each option when the list of selected options changes.
   *
   * @param prev - the previous list of selected options
   * @param next - the current list of selected options
   *
   * @override
   * @internal
   */
  selectedOptionsChanged(prev, next) {
    var _a3;
    super.selectedOptionsChanged(prev, next);
    (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.forEach((o2, i) => {
      var _a4;
      const proxyOption = (_a4 = this.proxy) === null || _a4 === void 0 ? void 0 : _a4.options.item(i);
      if (proxyOption) {
        proxyOption.selected = o2.selected;
      }
    });
  }
  /**
   * Sets the selected index to match the first option with the selected attribute, or
   * the first selectable option.
   *
   * @override
   * @internal
   */
  setDefaultSelectedOption() {
    var _a3;
    const options = (_a3 = this.options) !== null && _a3 !== void 0 ? _a3 : Array.from(this.children).filter(Listbox.slottedOptionFilter);
    const selectedIndex = options === null || options === void 0 ? void 0 : options.findIndex((el) => el.hasAttribute("selected") || el.selected || el.value === this.value);
    if (selectedIndex !== -1) {
      this.selectedIndex = selectedIndex;
      return;
    }
    this.selectedIndex = 0;
  }
  /**
   * Resets and fills the proxy to match the component's options.
   *
   * @internal
   */
  setProxyOptions() {
    if (this.proxy instanceof HTMLSelectElement && this.options) {
      this.proxy.options.length = 0;
      this.options.forEach((option) => {
        const proxyOption = option.proxy || (option instanceof HTMLOptionElement ? option.cloneNode() : null);
        if (proxyOption) {
          this.proxy.options.add(proxyOption);
        }
      });
    }
  }
  /**
   * Handle keyboard interaction for the select.
   *
   * @param e - the keyboard event
   * @internal
   */
  keydownHandler(e2) {
    super.keydownHandler(e2);
    const key = e2.key || e2.key.charCodeAt(0);
    switch (key) {
      case keySpace: {
        e2.preventDefault();
        if (this.collapsible && this.typeAheadExpired) {
          this.open = !this.open;
        }
        break;
      }
      case keyHome:
      case keyEnd: {
        e2.preventDefault();
        break;
      }
      case keyEnter: {
        e2.preventDefault();
        this.open = !this.open;
        break;
      }
      case keyEscape: {
        if (this.collapsible && this.open) {
          e2.preventDefault();
          this.open = false;
        }
        break;
      }
      case keyTab: {
        if (this.collapsible && this.open) {
          e2.preventDefault();
          this.open = false;
        }
        return true;
      }
    }
    if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
      this.updateValue(true);
      this.indexWhenOpened = this.selectedIndex;
    }
    return !(key === keyArrowDown || key === keyArrowUp);
  }
  connectedCallback() {
    super.connectedCallback();
    this.forcedPosition = !!this.positionAttribute;
    this.addEventListener("contentchange", this.updateDisplayValue);
  }
  disconnectedCallback() {
    this.removeEventListener("contentchange", this.updateDisplayValue);
    super.disconnectedCallback();
  }
  /**
   * Updates the proxy's size property when the size attribute changes.
   *
   * @param prev - the previous size
   * @param next - the current size
   *
   * @override
   * @internal
   */
  sizeChanged(prev, next) {
    super.sizeChanged(prev, next);
    if (this.proxy) {
      this.proxy.size = next;
    }
  }
  /**
   *
   * @internal
   */
  updateDisplayValue() {
    if (this.collapsible) {
      Observable.notify(this, "displayValue");
    }
  }
}
__decorate([
  attr({ attribute: "open", mode: "boolean" })
], Select.prototype, "open", void 0);
__decorate([
  volatile
], Select.prototype, "collapsible", null);
__decorate([
  observable$1
], Select.prototype, "control", void 0);
__decorate([
  attr({ attribute: "position" })
], Select.prototype, "positionAttribute", void 0);
__decorate([
  observable$1
], Select.prototype, "position", void 0);
__decorate([
  observable$1
], Select.prototype, "maxHeight", void 0);
class DelegatesARIASelect {
}
__decorate([
  observable$1
], DelegatesARIASelect.prototype, "ariaControls", void 0);
applyMixins(DelegatesARIASelect, DelegatesARIAListbox);
applyMixins(Select, StartEnd, DelegatesARIASelect);
class _TextArea extends FoundationElement {
}
class FormAssociatedTextArea extends FormAssociated(_TextArea) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement("textarea");
  }
}
const TextAreaResize = {
  /**
   * No resize.
   */
  none: "none",
  /**
   * Resize vertically and horizontally.
   */
  both: "both",
  /**
   * Resize horizontally.
   */
  horizontal: "horizontal",
  /**
   * Resize vertically.
   */
  vertical: "vertical"
};
let TextArea$1 = class TextArea extends FormAssociatedTextArea {
  constructor() {
    super(...arguments);
    this.resize = TextAreaResize.none;
    this.cols = 20;
    this.handleTextInput = () => {
      this.value = this.control.value;
    };
  }
  readOnlyChanged() {
    if (this.proxy instanceof HTMLTextAreaElement) {
      this.proxy.readOnly = this.readOnly;
    }
  }
  autofocusChanged() {
    if (this.proxy instanceof HTMLTextAreaElement) {
      this.proxy.autofocus = this.autofocus;
    }
  }
  listChanged() {
    if (this.proxy instanceof HTMLTextAreaElement) {
      this.proxy.setAttribute("list", this.list);
    }
  }
  maxlengthChanged() {
    if (this.proxy instanceof HTMLTextAreaElement) {
      this.proxy.maxLength = this.maxlength;
    }
  }
  minlengthChanged() {
    if (this.proxy instanceof HTMLTextAreaElement) {
      this.proxy.minLength = this.minlength;
    }
  }
  spellcheckChanged() {
    if (this.proxy instanceof HTMLTextAreaElement) {
      this.proxy.spellcheck = this.spellcheck;
    }
  }
  /**
   * Selects all the text in the text area
   *
   * @public
   */
  select() {
    this.control.select();
    this.$emit("select");
  }
  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  handleChange() {
    this.$emit("change");
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
};
__decorate([
  attr({ mode: "boolean" })
], TextArea$1.prototype, "readOnly", void 0);
__decorate([
  attr
], TextArea$1.prototype, "resize", void 0);
__decorate([
  attr({ mode: "boolean" })
], TextArea$1.prototype, "autofocus", void 0);
__decorate([
  attr({ attribute: "form" })
], TextArea$1.prototype, "formId", void 0);
__decorate([
  attr
], TextArea$1.prototype, "list", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], TextArea$1.prototype, "maxlength", void 0);
__decorate([
  attr({ converter: nullableNumberConverter })
], TextArea$1.prototype, "minlength", void 0);
__decorate([
  attr
], TextArea$1.prototype, "name", void 0);
__decorate([
  attr
], TextArea$1.prototype, "placeholder", void 0);
__decorate([
  attr({ converter: nullableNumberConverter, mode: "fromView" })
], TextArea$1.prototype, "cols", void 0);
__decorate([
  attr({ converter: nullableNumberConverter, mode: "fromView" })
], TextArea$1.prototype, "rows", void 0);
__decorate([
  attr({ mode: "boolean" })
], TextArea$1.prototype, "spellcheck", void 0);
__decorate([
  observable$1
], TextArea$1.prototype, "defaultSlottedNodes", void 0);
applyMixins(TextArea$1, DelegatesARIATextbox);
const textAreaTemplate = (context, definition) => html`
    <template
        class="
            ${(x) => x.readOnly ? "readonly" : ""}
            ${(x) => x.resize !== TextAreaResize.none ? `resize-${x.resize}` : ""}"
    >
        <label
            part="label"
            for="control"
            class="${(x) => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"
        >
            <slot ${slotted("defaultSlottedNodes")}></slot>
        </label>
        <textarea
            part="control"
            class="control"
            id="control"
            ?autofocus="${(x) => x.autofocus}"
            cols="${(x) => x.cols}"
            ?disabled="${(x) => x.disabled}"
            form="${(x) => x.form}"
            list="${(x) => x.list}"
            maxlength="${(x) => x.maxlength}"
            minlength="${(x) => x.minlength}"
            name="${(x) => x.name}"
            placeholder="${(x) => x.placeholder}"
            ?readonly="${(x) => x.readOnly}"
            ?required="${(x) => x.required}"
            rows="${(x) => x.rows}"
            ?spellcheck="${(x) => x.spellcheck}"
            :value="${(x) => x.value}"
            aria-atomic="${(x) => x.ariaAtomic}"
            aria-busy="${(x) => x.ariaBusy}"
            aria-controls="${(x) => x.ariaControls}"
            aria-current="${(x) => x.ariaCurrent}"
            aria-describedby="${(x) => x.ariaDescribedby}"
            aria-details="${(x) => x.ariaDetails}"
            aria-disabled="${(x) => x.ariaDisabled}"
            aria-errormessage="${(x) => x.ariaErrormessage}"
            aria-flowto="${(x) => x.ariaFlowto}"
            aria-haspopup="${(x) => x.ariaHaspopup}"
            aria-hidden="${(x) => x.ariaHidden}"
            aria-invalid="${(x) => x.ariaInvalid}"
            aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
            aria-label="${(x) => x.ariaLabel}"
            aria-labelledby="${(x) => x.ariaLabelledby}"
            aria-live="${(x) => x.ariaLive}"
            aria-owns="${(x) => x.ariaOwns}"
            aria-relevant="${(x) => x.ariaRelevant}"
            aria-roledescription="${(x) => x.ariaRoledescription}"
            @input="${(x, c2) => x.handleTextInput()}"
            @change="${(x) => x.handleChange()}"
            ${ref("control")}
        ></textarea>
    </template>
`;
const textFieldTemplate = (context, definition) => html`
    <template
        class="
            ${(x) => x.readOnly ? "readonly" : ""}
        "
    >
        <label
            part="label"
            for="control"
            class="${(x) => x.defaultSlottedNodes && x.defaultSlottedNodes.length ? "label" : "label label__hidden"}"
        >
            <slot
                ${slotted({ property: "defaultSlottedNodes", filter: whitespaceFilter })}
            ></slot>
        </label>
        <div class="root" part="root">
            ${startSlotTemplate(context, definition)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${(x) => x.handleTextInput()}"
                @change="${(x) => x.handleChange()}"
                ?autofocus="${(x) => x.autofocus}"
                ?disabled="${(x) => x.disabled}"
                list="${(x) => x.list}"
                maxlength="${(x) => x.maxlength}"
                minlength="${(x) => x.minlength}"
                pattern="${(x) => x.pattern}"
                placeholder="${(x) => x.placeholder}"
                ?readonly="${(x) => x.readOnly}"
                ?required="${(x) => x.required}"
                size="${(x) => x.size}"
                ?spellcheck="${(x) => x.spellcheck}"
                :value="${(x) => x.value}"
                type="${(x) => x.type}"
                aria-atomic="${(x) => x.ariaAtomic}"
                aria-busy="${(x) => x.ariaBusy}"
                aria-controls="${(x) => x.ariaControls}"
                aria-current="${(x) => x.ariaCurrent}"
                aria-describedby="${(x) => x.ariaDescribedby}"
                aria-details="${(x) => x.ariaDetails}"
                aria-disabled="${(x) => x.ariaDisabled}"
                aria-errormessage="${(x) => x.ariaErrormessage}"
                aria-flowto="${(x) => x.ariaFlowto}"
                aria-haspopup="${(x) => x.ariaHaspopup}"
                aria-hidden="${(x) => x.ariaHidden}"
                aria-invalid="${(x) => x.ariaInvalid}"
                aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
                aria-label="${(x) => x.ariaLabel}"
                aria-labelledby="${(x) => x.ariaLabelledby}"
                aria-live="${(x) => x.ariaLive}"
                aria-owns="${(x) => x.ariaOwns}"
                aria-relevant="${(x) => x.ariaRelevant}"
                aria-roledescription="${(x) => x.ariaRoledescription}"
                ${ref("control")}
            />
            ${endSlotTemplate(context, definition)}
        </div>
    </template>
`;
class MatchMediaBehavior {
  /**
   *
   * @param query - The media query to operate from.
   */
  constructor(query) {
    this.listenerCache = /* @__PURE__ */ new WeakMap();
    this.query = query;
  }
  /**
   * Binds the behavior to the element.
   * @param source - The element for which the behavior is bound.
   */
  bind(source) {
    const { query } = this;
    const listener = this.constructListener(source);
    listener.bind(query)();
    query.addListener(listener);
    this.listenerCache.set(source, listener);
  }
  /**
   * Unbinds the behavior from the element.
   * @param source - The element for which the behavior is unbinding.
   */
  unbind(source) {
    const listener = this.listenerCache.get(source);
    if (listener) {
      this.query.removeListener(listener);
      this.listenerCache.delete(source);
    }
  }
}
class MatchMediaStyleSheetBehavior extends MatchMediaBehavior {
  /**
   * Constructs a {@link MatchMediaStyleSheetBehavior} instance.
   * @param query - The media query to operate from.
   * @param styles - The styles to coordinate with the query.
   */
  constructor(query, styles2) {
    super(query);
    this.styles = styles2;
  }
  /**
   * Defines a function to construct {@link MatchMediaStyleSheetBehavior | MatchMediaStyleSheetBehaviors} for
   * a provided query.
   * @param query - The media query to operate from.
   *
   * @public
   * @example
   *
   * ```ts
   * import { css } from "@microsoft/fast-element";
   * import { MatchMediaStyleSheetBehavior } from "@microsoft/fast-foundation";
   *
   * const landscapeBehavior = MatchMediaStyleSheetBehavior.with(
   *   window.matchMedia("(orientation: landscape)")
   * );
   * const styles = css`
   *   :host {
   *     width: 200px;
   *     height: 400px;
   *   }
   * `
   * .withBehaviors(landscapeBehavior(css`
   *   :host {
   *     width: 400px;
   *     height: 200px;
   *   }
   * `))
   * ```
   */
  static with(query) {
    return (styles2) => {
      return new MatchMediaStyleSheetBehavior(query, styles2);
    };
  }
  /**
   * Constructs a match-media listener for a provided element.
   * @param source - the element for which to attach or detach styles.
   * @internal
   */
  constructListener(source) {
    let attached = false;
    const styles2 = this.styles;
    return function listener() {
      const { matches: matches2 } = this;
      if (matches2 && !attached) {
        source.$fastController.addStyles(styles2);
        attached = matches2;
      } else if (!matches2 && attached) {
        source.$fastController.removeStyles(styles2);
        attached = matches2;
      }
    };
  }
  /**
   * Unbinds the behavior from the element.
   * @param source - The element for which the behavior is unbinding.
   * @internal
   */
  unbind(source) {
    super.unbind(source);
    source.$fastController.removeStyles(this.styles);
  }
}
const forcedColorsStylesheetBehavior = MatchMediaStyleSheetBehavior.with(window.matchMedia("(forced-colors)"));
MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: dark)"));
MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: light)"));
class PropertyStyleSheetBehavior {
  /**
   * Constructs a {@link PropertyStyleSheetBehavior} instance.
   * @param propertyName - The property name to operate from.
   * @param value - The property value to operate from.
   * @param styles - The styles to coordinate with the property.
   */
  constructor(propertyName, value, styles2) {
    this.propertyName = propertyName;
    this.value = value;
    this.styles = styles2;
  }
  /**
   * Binds the behavior to the element.
   * @param elementInstance - The element for which the property is applied.
   */
  bind(elementInstance) {
    Observable.getNotifier(elementInstance).subscribe(this, this.propertyName);
    this.handleChange(elementInstance, this.propertyName);
  }
  /**
   * Unbinds the behavior from the element.
   * @param source - The element for which the behavior is unbinding.
   * @internal
   */
  unbind(source) {
    Observable.getNotifier(source).unsubscribe(this, this.propertyName);
    source.$fastController.removeStyles(this.styles);
  }
  /**
   * Change event for the provided element.
   * @param source - the element for which to attach or detach styles.
   * @param key - the key to lookup to know if the element already has the styles
   * @internal
   */
  handleChange(source, key) {
    if (source[key] === this.value) {
      source.$fastController.addStyles(this.styles);
    } else {
      source.$fastController.removeStyles(this.styles);
    }
  }
}
const disabledCursor = "not-allowed";
const hidden = `:host([hidden]){display:none}`;
function display(displayValue) {
  return `${hidden}:host{display:${displayValue}}`;
}
const focusVisible = canUseFocusVisible() ? "focus-visible" : "focus";
function clamp(i, min, max) {
  if (isNaN(i) || i <= min) {
    return min;
  } else if (i >= max) {
    return max;
  }
  return i;
}
function normalize(i, min, max) {
  if (isNaN(i) || i <= min) {
    return 0;
  } else if (i >= max) {
    return 1;
  }
  return i / (max - min);
}
function denormalize(i, min, max) {
  if (isNaN(i)) {
    return min;
  }
  return min + i * (max - min);
}
function degreesToRadians(i) {
  return i * (Math.PI / 180);
}
function radiansToDegrees(i) {
  return i * (180 / Math.PI);
}
function getHexStringForByte(i) {
  const s2 = Math.round(clamp(i, 0, 255)).toString(16);
  if (s2.length === 1) {
    return "0" + s2;
  }
  return s2;
}
function lerp(i, min, max) {
  if (isNaN(i) || i <= 0) {
    return min;
  } else if (i >= 1) {
    return max;
  }
  return min + i * (max - min);
}
function lerpAnglesInDegrees(i, min, max) {
  if (i <= 0) {
    return min % 360;
  } else if (i >= 1) {
    return max % 360;
  }
  const a2 = (min - max + 360) % 360;
  const b2 = (max - min + 360) % 360;
  if (a2 <= b2) {
    return (min - a2 * i + 360) % 360;
  }
  return (min + a2 * i + 360) % 360;
}
function roundToPrecisionSmall(i, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(i * factor) / factor;
}
class ColorHSL {
  constructor(hue, sat, lum) {
    this.h = hue;
    this.s = sat;
    this.l = lum;
  }
  /**
   * Construct a {@link ColorHSL} from a config object.
   */
  static fromObject(data) {
    if (data && !isNaN(data.h) && !isNaN(data.s) && !isNaN(data.l)) {
      return new ColorHSL(data.h, data.s, data.l);
    }
    return null;
  }
  /**
   * Determines if a color is equal to another
   * @param rhs - the value to compare
   */
  equalValue(rhs) {
    return this.h === rhs.h && this.s === rhs.s && this.l === rhs.l;
  }
  /**
   * Returns a new {@link ColorHSL} rounded to the provided precision
   * @param precision - the precision to round to
   */
  roundToPrecision(precision) {
    return new ColorHSL(roundToPrecisionSmall(this.h, precision), roundToPrecisionSmall(this.s, precision), roundToPrecisionSmall(this.l, precision));
  }
  /**
   * Returns the {@link ColorHSL} formatted as an object.
   */
  toObject() {
    return { h: this.h, s: this.s, l: this.l };
  }
}
class ColorHSV {
  constructor(hue, sat, val) {
    this.h = hue;
    this.s = sat;
    this.v = val;
  }
  /**
   * Construct a {@link ColorHSV} from a config object.
   */
  static fromObject(data) {
    if (data && !isNaN(data.h) && !isNaN(data.s) && !isNaN(data.v)) {
      return new ColorHSV(data.h, data.s, data.v);
    }
    return null;
  }
  /**
   * Determines if a color is equal to another
   * @param rhs - the value to compare
   */
  equalValue(rhs) {
    return this.h === rhs.h && this.s === rhs.s && this.v === rhs.v;
  }
  /**
   * Returns a new {@link ColorHSV} rounded to the provided precision
   * @param precision - the precision to round to
   */
  roundToPrecision(precision) {
    return new ColorHSV(roundToPrecisionSmall(this.h, precision), roundToPrecisionSmall(this.s, precision), roundToPrecisionSmall(this.v, precision));
  }
  /**
   * Returns the {@link ColorHSV} formatted as an object.
   */
  toObject() {
    return { h: this.h, s: this.s, v: this.v };
  }
}
class ColorLAB {
  constructor(l2, a2, b2) {
    this.l = l2;
    this.a = a2;
    this.b = b2;
  }
  /**
   * Construct a {@link ColorLAB} from a config object.
   */
  static fromObject(data) {
    if (data && !isNaN(data.l) && !isNaN(data.a) && !isNaN(data.b)) {
      return new ColorLAB(data.l, data.a, data.b);
    }
    return null;
  }
  /**
   * Determines if a color is equal to another
   * @param rhs - the value to compare
   */
  equalValue(rhs) {
    return this.l === rhs.l && this.a === rhs.a && this.b === rhs.b;
  }
  /**
   * Returns a new {@link ColorLAB} rounded to the provided precision
   * @param precision - the precision to round to
   */
  roundToPrecision(precision) {
    return new ColorLAB(roundToPrecisionSmall(this.l, precision), roundToPrecisionSmall(this.a, precision), roundToPrecisionSmall(this.b, precision));
  }
  /**
   * Returns the {@link ColorLAB} formatted as an object.
   */
  toObject() {
    return { l: this.l, a: this.a, b: this.b };
  }
}
ColorLAB.epsilon = 216 / 24389;
ColorLAB.kappa = 24389 / 27;
class ColorLCH {
  constructor(l2, c2, h2) {
    this.l = l2;
    this.c = c2;
    this.h = h2;
  }
  /**
   * Construct a {@link ColorLCH} from a config object.
   * @param data - the config object
   */
  static fromObject(data) {
    if (data && !isNaN(data.l) && !isNaN(data.c) && !isNaN(data.h)) {
      return new ColorLCH(data.l, data.c, data.h);
    }
    return null;
  }
  /**
   * Determines if one color is equal to another.
   * @param rhs - the color to compare
   */
  equalValue(rhs) {
    return this.l === rhs.l && this.c === rhs.c && this.h === rhs.h;
  }
  /**
   * Returns a new {@link ColorLCH} rounded to the provided precision
   * @param precision - the precision to round to
   */
  roundToPrecision(precision) {
    return new ColorLCH(roundToPrecisionSmall(this.l, precision), roundToPrecisionSmall(this.c, precision), roundToPrecisionSmall(this.h, precision));
  }
  /**
   * Converts the {@link ColorLCH} to a config object.
   */
  toObject() {
    return { l: this.l, c: this.c, h: this.h };
  }
}
class ColorRGBA64 {
  /**
   *
   * @param red - the red value
   * @param green - the green value
   * @param blue - the blue value
   * @param alpha - the alpha value
   */
  constructor(red, green, blue, alpha) {
    this.r = red;
    this.g = green;
    this.b = blue;
    this.a = typeof alpha === "number" && !isNaN(alpha) ? alpha : 1;
  }
  /**
   * Construct a {@link ColorRGBA64} from a {@link ColorRGBA64Config}
   * @param data - the config object
   */
  static fromObject(data) {
    return data && !isNaN(data.r) && !isNaN(data.g) && !isNaN(data.b) ? new ColorRGBA64(data.r, data.g, data.b, data.a) : null;
  }
  /**
   * Determines if one color is equal to another.
   * @param rhs - the color to compare
   */
  equalValue(rhs) {
    return this.r === rhs.r && this.g === rhs.g && this.b === rhs.b && this.a === rhs.a;
  }
  /**
   * Returns the color formatted as a string; #RRGGBB
   */
  toStringHexRGB() {
    return "#" + [this.r, this.g, this.b].map(this.formatHexValue).join("");
  }
  /**
   * Returns the color formatted as a string; #RRGGBBAA
   */
  toStringHexRGBA() {
    return this.toStringHexRGB() + this.formatHexValue(this.a);
  }
  /**
   * Returns the color formatted as a string; #AARRGGBB
   */
  toStringHexARGB() {
    return "#" + [this.a, this.r, this.g, this.b].map(this.formatHexValue).join("");
  }
  /**
   * Returns the color formatted as a string; "rgb(0xRR, 0xGG, 0xBB)"
   */
  toStringWebRGB() {
    return `rgb(${Math.round(denormalize(this.r, 0, 255))},${Math.round(denormalize(this.g, 0, 255))},${Math.round(denormalize(this.b, 0, 255))})`;
  }
  /**
   * Returns the color formatted as a string; "rgba(0xRR, 0xGG, 0xBB, a)"
   * @remarks
   * Note that this follows the convention of putting alpha in the range [0.0,1.0] while the other three channels are [0,255]
   */
  toStringWebRGBA() {
    return `rgba(${Math.round(denormalize(this.r, 0, 255))},${Math.round(denormalize(this.g, 0, 255))},${Math.round(denormalize(this.b, 0, 255))},${clamp(this.a, 0, 1)})`;
  }
  /**
   * Returns a new {@link ColorRGBA64} rounded to the provided precision
   * @param precision - the precision to round to
   */
  roundToPrecision(precision) {
    return new ColorRGBA64(roundToPrecisionSmall(this.r, precision), roundToPrecisionSmall(this.g, precision), roundToPrecisionSmall(this.b, precision), roundToPrecisionSmall(this.a, precision));
  }
  /**
   * Returns a new {@link ColorRGBA64} with channel values clamped between 0 and 1.
   */
  clamp() {
    return new ColorRGBA64(clamp(this.r, 0, 1), clamp(this.g, 0, 1), clamp(this.b, 0, 1), clamp(this.a, 0, 1));
  }
  /**
   * Converts the {@link ColorRGBA64} to a {@link ColorRGBA64Config}.
   */
  toObject() {
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }
  formatHexValue(value) {
    return getHexStringForByte(denormalize(value, 0, 255));
  }
}
class ColorXYZ {
  constructor(x, y2, z) {
    this.x = x;
    this.y = y2;
    this.z = z;
  }
  /**
   * Construct a {@link ColorXYZ} from a config object.
   */
  static fromObject(data) {
    if (data && !isNaN(data.x) && !isNaN(data.y) && !isNaN(data.z)) {
      return new ColorXYZ(data.x, data.y, data.z);
    }
    return null;
  }
  /**
   * Determines if a color is equal to another
   * @param rhs - the value to compare
   */
  equalValue(rhs) {
    return this.x === rhs.x && this.y === rhs.y && this.z === rhs.z;
  }
  /**
   * Returns a new {@link ColorXYZ} rounded to the provided precision
   * @param precision - the precision to round to
   */
  roundToPrecision(precision) {
    return new ColorXYZ(roundToPrecisionSmall(this.x, precision), roundToPrecisionSmall(this.y, precision), roundToPrecisionSmall(this.z, precision));
  }
  /**
   * Returns the {@link ColorXYZ} formatted as an object.
   */
  toObject() {
    return { x: this.x, y: this.y, z: this.z };
  }
}
ColorXYZ.whitePoint = new ColorXYZ(0.95047, 1, 1.08883);
function rgbToLinearLuminance(rgb) {
  return rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722;
}
function rgbToRelativeLuminance(rgb) {
  function luminanceHelper(i) {
    if (i <= 0.03928) {
      return i / 12.92;
    }
    return Math.pow((i + 0.055) / 1.055, 2.4);
  }
  return rgbToLinearLuminance(new ColorRGBA64(luminanceHelper(rgb.r), luminanceHelper(rgb.g), luminanceHelper(rgb.b), 1));
}
const calculateContrastRatio = (a2, b2) => (a2 + 0.05) / (b2 + 0.05);
function contrastRatio(a2, b2) {
  const luminanceA = rgbToRelativeLuminance(a2);
  const luminanceB = rgbToRelativeLuminance(b2);
  return luminanceA > luminanceB ? calculateContrastRatio(luminanceA, luminanceB) : calculateContrastRatio(luminanceB, luminanceA);
}
function rgbToHSL(rgb) {
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const delta = max - min;
  let hue = 0;
  if (delta !== 0) {
    if (max === rgb.r) {
      hue = 60 * ((rgb.g - rgb.b) / delta % 6);
    } else if (max === rgb.g) {
      hue = 60 * ((rgb.b - rgb.r) / delta + 2);
    } else {
      hue = 60 * ((rgb.r - rgb.g) / delta + 4);
    }
  }
  if (hue < 0) {
    hue += 360;
  }
  const lum = (max + min) / 2;
  let sat = 0;
  if (delta !== 0) {
    sat = delta / (1 - Math.abs(2 * lum - 1));
  }
  return new ColorHSL(hue, sat, lum);
}
function hslToRGB(hsl, alpha = 1) {
  const c2 = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
  const x = c2 * (1 - Math.abs(hsl.h / 60 % 2 - 1));
  const m2 = hsl.l - c2 / 2;
  let r2 = 0;
  let g = 0;
  let b2 = 0;
  if (hsl.h < 60) {
    r2 = c2;
    g = x;
    b2 = 0;
  } else if (hsl.h < 120) {
    r2 = x;
    g = c2;
    b2 = 0;
  } else if (hsl.h < 180) {
    r2 = 0;
    g = c2;
    b2 = x;
  } else if (hsl.h < 240) {
    r2 = 0;
    g = x;
    b2 = c2;
  } else if (hsl.h < 300) {
    r2 = x;
    g = 0;
    b2 = c2;
  } else if (hsl.h < 360) {
    r2 = c2;
    g = 0;
    b2 = x;
  }
  return new ColorRGBA64(r2 + m2, g + m2, b2 + m2, alpha);
}
function rgbToHSV(rgb) {
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const delta = max - min;
  let hue = 0;
  if (delta !== 0) {
    if (max === rgb.r) {
      hue = 60 * ((rgb.g - rgb.b) / delta % 6);
    } else if (max === rgb.g) {
      hue = 60 * ((rgb.b - rgb.r) / delta + 2);
    } else {
      hue = 60 * ((rgb.r - rgb.g) / delta + 4);
    }
  }
  if (hue < 0) {
    hue += 360;
  }
  let sat = 0;
  if (max !== 0) {
    sat = delta / max;
  }
  return new ColorHSV(hue, sat, max);
}
function hsvToRGB(hsv, alpha = 1) {
  const c2 = hsv.s * hsv.v;
  const x = c2 * (1 - Math.abs(hsv.h / 60 % 2 - 1));
  const m2 = hsv.v - c2;
  let r2 = 0;
  let g = 0;
  let b2 = 0;
  if (hsv.h < 60) {
    r2 = c2;
    g = x;
    b2 = 0;
  } else if (hsv.h < 120) {
    r2 = x;
    g = c2;
    b2 = 0;
  } else if (hsv.h < 180) {
    r2 = 0;
    g = c2;
    b2 = x;
  } else if (hsv.h < 240) {
    r2 = 0;
    g = x;
    b2 = c2;
  } else if (hsv.h < 300) {
    r2 = x;
    g = 0;
    b2 = c2;
  } else if (hsv.h < 360) {
    r2 = c2;
    g = 0;
    b2 = x;
  }
  return new ColorRGBA64(r2 + m2, g + m2, b2 + m2, alpha);
}
function lchToLAB(lch) {
  let a2 = 0;
  let b2 = 0;
  if (lch.h !== 0) {
    a2 = Math.cos(degreesToRadians(lch.h)) * lch.c;
    b2 = Math.sin(degreesToRadians(lch.h)) * lch.c;
  }
  return new ColorLAB(lch.l, a2, b2);
}
function labToLCH(lab) {
  let h2 = 0;
  if (Math.abs(lab.b) > 1e-3 || Math.abs(lab.a) > 1e-3) {
    h2 = radiansToDegrees(Math.atan2(lab.b, lab.a));
  }
  if (h2 < 0) {
    h2 += 360;
  }
  const c2 = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  return new ColorLCH(lab.l, c2, h2);
}
function labToXYZ(lab) {
  const fy = (lab.l + 16) / 116;
  const fx = fy + lab.a / 500;
  const fz = fy - lab.b / 200;
  const xcubed = Math.pow(fx, 3);
  const ycubed = Math.pow(fy, 3);
  const zcubed = Math.pow(fz, 3);
  let x = 0;
  if (xcubed > ColorLAB.epsilon) {
    x = xcubed;
  } else {
    x = (116 * fx - 16) / ColorLAB.kappa;
  }
  let y2 = 0;
  if (lab.l > ColorLAB.epsilon * ColorLAB.kappa) {
    y2 = ycubed;
  } else {
    y2 = lab.l / ColorLAB.kappa;
  }
  let z = 0;
  if (zcubed > ColorLAB.epsilon) {
    z = zcubed;
  } else {
    z = (116 * fz - 16) / ColorLAB.kappa;
  }
  x = ColorXYZ.whitePoint.x * x;
  y2 = ColorXYZ.whitePoint.y * y2;
  z = ColorXYZ.whitePoint.z * z;
  return new ColorXYZ(x, y2, z);
}
function xyzToLAB(xyz) {
  function xyzToLABHelper(i) {
    if (i > ColorLAB.epsilon) {
      return Math.pow(i, 1 / 3);
    }
    return (ColorLAB.kappa * i + 16) / 116;
  }
  const x = xyzToLABHelper(xyz.x / ColorXYZ.whitePoint.x);
  const y2 = xyzToLABHelper(xyz.y / ColorXYZ.whitePoint.y);
  const z = xyzToLABHelper(xyz.z / ColorXYZ.whitePoint.z);
  const l2 = 116 * y2 - 16;
  const a2 = 500 * (x - y2);
  const b2 = 200 * (y2 - z);
  return new ColorLAB(l2, a2, b2);
}
function rgbToXYZ(rgb) {
  function rgbToXYZHelper(i) {
    if (i <= 0.04045) {
      return i / 12.92;
    }
    return Math.pow((i + 0.055) / 1.055, 2.4);
  }
  const r2 = rgbToXYZHelper(rgb.r);
  const g = rgbToXYZHelper(rgb.g);
  const b2 = rgbToXYZHelper(rgb.b);
  const x = r2 * 0.4124564 + g * 0.3575761 + b2 * 0.1804375;
  const y2 = r2 * 0.2126729 + g * 0.7151522 + b2 * 0.072175;
  const z = r2 * 0.0193339 + g * 0.119192 + b2 * 0.9503041;
  return new ColorXYZ(x, y2, z);
}
function xyzToRGB(xyz, alpha = 1) {
  function xyzToRGBHelper(i) {
    if (i <= 31308e-7) {
      return i * 12.92;
    }
    return 1.055 * Math.pow(i, 1 / 2.4) - 0.055;
  }
  const r2 = xyzToRGBHelper(xyz.x * 3.2404542 - xyz.y * 1.5371385 - xyz.z * 0.4985314);
  const g = xyzToRGBHelper(xyz.x * -0.969266 + xyz.y * 1.8760108 + xyz.z * 0.041556);
  const b2 = xyzToRGBHelper(xyz.x * 0.0556434 - xyz.y * 0.2040259 + xyz.z * 1.0572252);
  return new ColorRGBA64(r2, g, b2, alpha);
}
function rgbToLAB(rgb) {
  return xyzToLAB(rgbToXYZ(rgb));
}
function labToRGB(lab, alpha = 1) {
  return xyzToRGB(labToXYZ(lab), alpha);
}
function rgbToLCH(rgb) {
  return labToLCH(rgbToLAB(rgb));
}
function lchToRGB(lch, alpha = 1) {
  return labToRGB(lchToLAB(lch), alpha);
}
function saturateViaLCH(input, saturation, saturationConstant = 18) {
  const lch = rgbToLCH(input);
  let sat = lch.c + saturation * saturationConstant;
  if (sat < 0) {
    sat = 0;
  }
  return lchToRGB(new ColorLCH(lch.l, sat, lch.h));
}
function blendMultiplyChannel(bottom2, top2) {
  return bottom2 * top2;
}
function blendMultiply(bottom2, top2) {
  return new ColorRGBA64(blendMultiplyChannel(bottom2.r, top2.r), blendMultiplyChannel(bottom2.g, top2.g), blendMultiplyChannel(bottom2.b, top2.b), 1);
}
function blendOverlayChannel(bottom2, top2) {
  if (bottom2 < 0.5) {
    return clamp(2 * top2 * bottom2, 0, 1);
  }
  return clamp(1 - 2 * (1 - top2) * (1 - bottom2), 0, 1);
}
function blendOverlay(bottom2, top2) {
  return new ColorRGBA64(blendOverlayChannel(bottom2.r, top2.r), blendOverlayChannel(bottom2.g, top2.g), blendOverlayChannel(bottom2.b, top2.b), 1);
}
var ColorBlendMode;
(function(ColorBlendMode2) {
  ColorBlendMode2[ColorBlendMode2["Burn"] = 0] = "Burn";
  ColorBlendMode2[ColorBlendMode2["Color"] = 1] = "Color";
  ColorBlendMode2[ColorBlendMode2["Darken"] = 2] = "Darken";
  ColorBlendMode2[ColorBlendMode2["Dodge"] = 3] = "Dodge";
  ColorBlendMode2[ColorBlendMode2["Lighten"] = 4] = "Lighten";
  ColorBlendMode2[ColorBlendMode2["Multiply"] = 5] = "Multiply";
  ColorBlendMode2[ColorBlendMode2["Overlay"] = 6] = "Overlay";
  ColorBlendMode2[ColorBlendMode2["Screen"] = 7] = "Screen";
})(ColorBlendMode || (ColorBlendMode = {}));
function interpolateRGB(position, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  return new ColorRGBA64(lerp(position, left.r, right2.r), lerp(position, left.g, right2.g), lerp(position, left.b, right2.b), lerp(position, left.a, right2.a));
}
function interpolateHSL(position, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  return new ColorHSL(lerpAnglesInDegrees(position, left.h, right2.h), lerp(position, left.s, right2.s), lerp(position, left.l, right2.l));
}
function interpolateHSV(position, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  return new ColorHSV(lerpAnglesInDegrees(position, left.h, right2.h), lerp(position, left.s, right2.s), lerp(position, left.v, right2.v));
}
function interpolateXYZ(position, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  return new ColorXYZ(lerp(position, left.x, right2.x), lerp(position, left.y, right2.y), lerp(position, left.z, right2.z));
}
function interpolateLAB(position, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  return new ColorLAB(lerp(position, left.l, right2.l), lerp(position, left.a, right2.a), lerp(position, left.b, right2.b));
}
function interpolateLCH(position, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  return new ColorLCH(lerp(position, left.l, right2.l), lerp(position, left.c, right2.c), lerpAnglesInDegrees(position, left.h, right2.h));
}
var ColorInterpolationSpace;
(function(ColorInterpolationSpace2) {
  ColorInterpolationSpace2[ColorInterpolationSpace2["RGB"] = 0] = "RGB";
  ColorInterpolationSpace2[ColorInterpolationSpace2["HSL"] = 1] = "HSL";
  ColorInterpolationSpace2[ColorInterpolationSpace2["HSV"] = 2] = "HSV";
  ColorInterpolationSpace2[ColorInterpolationSpace2["XYZ"] = 3] = "XYZ";
  ColorInterpolationSpace2[ColorInterpolationSpace2["LAB"] = 4] = "LAB";
  ColorInterpolationSpace2[ColorInterpolationSpace2["LCH"] = 5] = "LCH";
})(ColorInterpolationSpace || (ColorInterpolationSpace = {}));
function interpolateByColorSpace(position, space, left, right2) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right2;
  }
  switch (space) {
    case ColorInterpolationSpace.HSL:
      return hslToRGB(interpolateHSL(position, rgbToHSL(left), rgbToHSL(right2)));
    case ColorInterpolationSpace.HSV:
      return hsvToRGB(interpolateHSV(position, rgbToHSV(left), rgbToHSV(right2)));
    case ColorInterpolationSpace.XYZ:
      return xyzToRGB(interpolateXYZ(position, rgbToXYZ(left), rgbToXYZ(right2)));
    case ColorInterpolationSpace.LAB:
      return labToRGB(interpolateLAB(position, rgbToLAB(left), rgbToLAB(right2)));
    case ColorInterpolationSpace.LCH:
      return lchToRGB(interpolateLCH(position, rgbToLCH(left), rgbToLCH(right2)));
    default:
      return interpolateRGB(position, left, right2);
  }
}
class ColorScale {
  constructor(stops) {
    if (stops == null || stops.length === 0) {
      throw new Error("The stops argument must be non-empty");
    } else {
      this.stops = this.sortColorScaleStops(stops);
    }
  }
  static createBalancedColorScale(colors2) {
    if (colors2 == null || colors2.length === 0) {
      throw new Error("The colors argument must be non-empty");
    }
    const stops = new Array(colors2.length);
    for (let i = 0; i < colors2.length; i++) {
      if (i === 0) {
        stops[i] = { color: colors2[i], position: 0 };
      } else if (i === colors2.length - 1) {
        stops[i] = { color: colors2[i], position: 1 };
      } else {
        stops[i] = {
          color: colors2[i],
          position: i * (1 / (colors2.length - 1))
        };
      }
    }
    return new ColorScale(stops);
  }
  getColor(position, interpolationMode = ColorInterpolationSpace.RGB) {
    if (this.stops.length === 1) {
      return this.stops[0].color;
    } else if (position <= 0) {
      return this.stops[0].color;
    } else if (position >= 1) {
      return this.stops[this.stops.length - 1].color;
    }
    let lowerIndex = 0;
    for (let i = 0; i < this.stops.length; i++) {
      if (this.stops[i].position <= position) {
        lowerIndex = i;
      }
    }
    let upperIndex = lowerIndex + 1;
    if (upperIndex >= this.stops.length) {
      upperIndex = this.stops.length - 1;
    }
    const scalePosition = (position - this.stops[lowerIndex].position) * (1 / (this.stops[upperIndex].position - this.stops[lowerIndex].position));
    return interpolateByColorSpace(scalePosition, interpolationMode, this.stops[lowerIndex].color, this.stops[upperIndex].color);
  }
  trim(lowerBound, upperBound, interpolationMode = ColorInterpolationSpace.RGB) {
    if (lowerBound < 0 || upperBound > 1 || upperBound < lowerBound) {
      throw new Error("Invalid bounds");
    }
    if (lowerBound === upperBound) {
      return new ColorScale([
        { color: this.getColor(lowerBound, interpolationMode), position: 0 }
      ]);
    }
    const containedStops = [];
    for (let i = 0; i < this.stops.length; i++) {
      if (this.stops[i].position >= lowerBound && this.stops[i].position <= upperBound) {
        containedStops.push(this.stops[i]);
      }
    }
    if (containedStops.length === 0) {
      return new ColorScale([
        { color: this.getColor(lowerBound), position: lowerBound },
        { color: this.getColor(upperBound), position: upperBound }
      ]);
    }
    if (containedStops[0].position !== lowerBound) {
      containedStops.unshift({
        color: this.getColor(lowerBound),
        position: lowerBound
      });
    }
    if (containedStops[containedStops.length - 1].position !== upperBound) {
      containedStops.push({
        color: this.getColor(upperBound),
        position: upperBound
      });
    }
    const range2 = upperBound - lowerBound;
    const finalStops = new Array(containedStops.length);
    for (let i = 0; i < containedStops.length; i++) {
      finalStops[i] = {
        color: containedStops[i].color,
        position: (containedStops[i].position - lowerBound) / range2
      };
    }
    return new ColorScale(finalStops);
  }
  findNextColor(position, contrast2, searchDown = false, interpolationMode = ColorInterpolationSpace.RGB, contrastErrorMargin = 5e-3, maxSearchIterations = 32) {
    if (isNaN(position) || position <= 0) {
      position = 0;
    } else if (position >= 1) {
      position = 1;
    }
    const startingColor = this.getColor(position, interpolationMode);
    const finalPosition = searchDown ? 0 : 1;
    const finalColor = this.getColor(finalPosition, interpolationMode);
    const finalContrast = contrastRatio(startingColor, finalColor);
    if (finalContrast <= contrast2) {
      return finalPosition;
    }
    let testRangeMin = searchDown ? 0 : position;
    let testRangeMax = searchDown ? position : 0;
    let mid = finalPosition;
    let iterations = 0;
    while (iterations <= maxSearchIterations) {
      mid = Math.abs(testRangeMax - testRangeMin) / 2 + testRangeMin;
      const midColor = this.getColor(mid, interpolationMode);
      const midContrast = contrastRatio(startingColor, midColor);
      if (Math.abs(midContrast - contrast2) <= contrastErrorMargin) {
        return mid;
      } else if (midContrast > contrast2) {
        if (searchDown) {
          testRangeMin = mid;
        } else {
          testRangeMax = mid;
        }
      } else {
        if (searchDown) {
          testRangeMax = mid;
        } else {
          testRangeMin = mid;
        }
      }
      iterations++;
    }
    return mid;
  }
  clone() {
    const newStops = new Array(this.stops.length);
    for (let i = 0; i < newStops.length; i++) {
      newStops[i] = {
        color: this.stops[i].color,
        position: this.stops[i].position
      };
    }
    return new ColorScale(newStops);
  }
  sortColorScaleStops(stops) {
    return stops.sort((a2, b2) => {
      const A = a2.position;
      const B = b2.position;
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
const hexRGBRegex = /^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;
function parseColorHexRGB(raw) {
  const result = hexRGBRegex.exec(raw);
  if (result === null) {
    return null;
  }
  let digits = result[1];
  if (digits.length === 3) {
    const r2 = digits.charAt(0);
    const g = digits.charAt(1);
    const b2 = digits.charAt(2);
    digits = r2.concat(r2, g, g, b2, b2);
  }
  const rawInt = parseInt(digits, 16);
  if (isNaN(rawInt)) {
    return null;
  }
  return new ColorRGBA64(normalize((rawInt & 16711680) >>> 16, 0, 255), normalize((rawInt & 65280) >>> 8, 0, 255), normalize(rawInt & 255, 0, 255), 1);
}
class ColorPalette {
  constructor(config) {
    this.config = Object.assign({}, ColorPalette.defaultPaletteConfig, config);
    this.palette = [];
    this.updatePaletteColors();
  }
  updatePaletteGenerationValues(newConfig) {
    let changed = false;
    for (const key in newConfig) {
      if (this.config[key]) {
        if (this.config[key].equalValue) {
          if (!this.config[key].equalValue(newConfig[key])) {
            this.config[key] = newConfig[key];
            changed = true;
          }
        } else {
          if (newConfig[key] !== this.config[key]) {
            this.config[key] = newConfig[key];
            changed = true;
          }
        }
      }
    }
    if (changed) {
      this.updatePaletteColors();
    }
    return changed;
  }
  updatePaletteColors() {
    const scale = this.generatePaletteColorScale();
    for (let i = 0; i < this.config.steps; i++) {
      this.palette[i] = scale.getColor(i / (this.config.steps - 1), this.config.interpolationMode);
    }
  }
  generatePaletteColorScale() {
    const baseColorHSL = rgbToHSL(this.config.baseColor);
    const baseScale = new ColorScale([
      { position: 0, color: this.config.scaleColorLight },
      { position: 0.5, color: this.config.baseColor },
      { position: 1, color: this.config.scaleColorDark }
    ]);
    const trimmedScale = baseScale.trim(this.config.clipLight, 1 - this.config.clipDark);
    const trimmedLight = trimmedScale.getColor(0);
    const trimmedDark = trimmedScale.getColor(1);
    let adjustedLight = trimmedLight;
    let adjustedDark = trimmedDark;
    if (baseColorHSL.s >= this.config.saturationAdjustmentCutoff) {
      adjustedLight = saturateViaLCH(adjustedLight, this.config.saturationLight);
      adjustedDark = saturateViaLCH(adjustedDark, this.config.saturationDark);
    }
    if (this.config.multiplyLight !== 0) {
      const multiply = blendMultiply(this.config.baseColor, adjustedLight);
      adjustedLight = interpolateByColorSpace(this.config.multiplyLight, this.config.interpolationMode, adjustedLight, multiply);
    }
    if (this.config.multiplyDark !== 0) {
      const multiply = blendMultiply(this.config.baseColor, adjustedDark);
      adjustedDark = interpolateByColorSpace(this.config.multiplyDark, this.config.interpolationMode, adjustedDark, multiply);
    }
    if (this.config.overlayLight !== 0) {
      const overlay = blendOverlay(this.config.baseColor, adjustedLight);
      adjustedLight = interpolateByColorSpace(this.config.overlayLight, this.config.interpolationMode, adjustedLight, overlay);
    }
    if (this.config.overlayDark !== 0) {
      const overlay = blendOverlay(this.config.baseColor, adjustedDark);
      adjustedDark = interpolateByColorSpace(this.config.overlayDark, this.config.interpolationMode, adjustedDark, overlay);
    }
    if (this.config.baseScalePosition) {
      if (this.config.baseScalePosition <= 0) {
        return new ColorScale([
          { position: 0, color: this.config.baseColor },
          { position: 1, color: adjustedDark.clamp() }
        ]);
      } else if (this.config.baseScalePosition >= 1) {
        return new ColorScale([
          { position: 0, color: adjustedLight.clamp() },
          { position: 1, color: this.config.baseColor }
        ]);
      }
      return new ColorScale([
        { position: 0, color: adjustedLight.clamp() },
        {
          position: this.config.baseScalePosition,
          color: this.config.baseColor
        },
        { position: 1, color: adjustedDark.clamp() }
      ]);
    }
    return new ColorScale([
      { position: 0, color: adjustedLight.clamp() },
      { position: 0.5, color: this.config.baseColor },
      { position: 1, color: adjustedDark.clamp() }
    ]);
  }
}
ColorPalette.defaultPaletteConfig = {
  baseColor: parseColorHexRGB("#808080"),
  steps: 11,
  interpolationMode: ColorInterpolationSpace.RGB,
  scaleColorLight: new ColorRGBA64(1, 1, 1, 1),
  scaleColorDark: new ColorRGBA64(0, 0, 0, 1),
  clipLight: 0.185,
  clipDark: 0.16,
  saturationAdjustmentCutoff: 0.05,
  saturationLight: 0.35,
  saturationDark: 1.25,
  overlayLight: 0,
  overlayDark: 0.25,
  multiplyLight: 0,
  multiplyDark: 0,
  baseScalePosition: 0.5
};
ColorPalette.greyscalePaletteConfig = {
  baseColor: parseColorHexRGB("#808080"),
  steps: 11,
  interpolationMode: ColorInterpolationSpace.RGB,
  scaleColorLight: new ColorRGBA64(1, 1, 1, 1),
  scaleColorDark: new ColorRGBA64(0, 0, 0, 1),
  clipLight: 0,
  clipDark: 0,
  saturationAdjustmentCutoff: 0,
  saturationLight: 0,
  saturationDark: 0,
  overlayLight: 0,
  overlayDark: 0,
  multiplyLight: 0,
  multiplyDark: 0,
  baseScalePosition: 0.5
};
({
  targetSize: 63,
  spacing: 4,
  scaleColorLight: ColorPalette.defaultPaletteConfig.scaleColorLight,
  scaleColorDark: ColorPalette.defaultPaletteConfig.scaleColorDark
});
class ComponentStateColorPalette {
  constructor(config) {
    this.palette = [];
    this.config = Object.assign({}, ComponentStateColorPalette.defaultPaletteConfig, config);
    this.regenPalettes();
  }
  regenPalettes() {
    let steps = this.config.steps;
    if (isNaN(steps) || steps < 3) {
      steps = 3;
    }
    const darkLum = 0.14;
    const darkestLum = 0.06;
    const darkLumColor = new ColorRGBA64(darkLum, darkLum, darkLum, 1);
    const stepsForLuminanceRamp = 94;
    const r2 = new ColorPalette(Object.assign(Object.assign({}, ColorPalette.greyscalePaletteConfig), { baseColor: darkLumColor, baseScalePosition: (1 - darkLum) * 100 / stepsForLuminanceRamp, steps }));
    const referencePalette = r2.palette;
    const baseColorLum1 = rgbToLinearLuminance(this.config.baseColor);
    const baseColorLum2 = rgbToHSL(this.config.baseColor).l;
    const baseColorLum = (baseColorLum1 + baseColorLum2) / 2;
    const baseColorRefIndex = this.matchRelativeLuminanceIndex(baseColorLum, referencePalette);
    const baseColorPercent = baseColorRefIndex / (steps - 1);
    const darkRefIndex = this.matchRelativeLuminanceIndex(darkLum, referencePalette);
    const darkPercent = darkRefIndex / (steps - 1);
    const baseColorHSL = rgbToHSL(this.config.baseColor);
    const darkBaseColor = hslToRGB(ColorHSL.fromObject({
      h: baseColorHSL.h,
      s: baseColorHSL.s,
      l: darkLum
    }));
    const darkestBaseColor = hslToRGB(ColorHSL.fromObject({
      h: baseColorHSL.h,
      s: baseColorHSL.s,
      l: darkestLum
    }));
    const fullColorScaleStops = new Array(5);
    fullColorScaleStops[0] = {
      position: 0,
      color: new ColorRGBA64(1, 1, 1, 1)
    };
    fullColorScaleStops[1] = {
      position: baseColorPercent,
      color: this.config.baseColor
    };
    fullColorScaleStops[2] = {
      position: darkPercent,
      color: darkBaseColor
    };
    fullColorScaleStops[3] = {
      position: 0.99,
      color: darkestBaseColor
    };
    fullColorScaleStops[4] = {
      position: 1,
      color: new ColorRGBA64(0, 0, 0, 1)
    };
    const scale = new ColorScale(fullColorScaleStops);
    this.palette = new Array(steps);
    for (let i = 0; i < steps; i++) {
      const c2 = scale.getColor(i / (steps - 1), ColorInterpolationSpace.RGB);
      this.palette[i] = c2;
    }
  }
  matchRelativeLuminanceIndex(input, reference) {
    let bestFitValue = Number.MAX_VALUE;
    let bestFitIndex = 0;
    let i = 0;
    const referenceLength = reference.length;
    for (; i < referenceLength; i++) {
      const fitValue = Math.abs(rgbToLinearLuminance(reference[i]) - input);
      if (fitValue < bestFitValue) {
        bestFitValue = fitValue;
        bestFitIndex = i;
      }
    }
    return bestFitIndex;
  }
}
ComponentStateColorPalette.defaultPaletteConfig = {
  baseColor: parseColorHexRGB("#808080"),
  steps: 94
};
function contrast(a2, b2) {
  const L1 = a2.relativeLuminance > b2.relativeLuminance ? a2 : b2;
  const L2 = a2.relativeLuminance > b2.relativeLuminance ? b2 : a2;
  return (L1.relativeLuminance + 0.05) / (L2.relativeLuminance + 0.05);
}
const SwatchRGB = Object.freeze({
  create(r2, g, b2) {
    return new SwatchRGBImpl(r2, g, b2);
  },
  from(obj) {
    return new SwatchRGBImpl(obj.r, obj.g, obj.b);
  }
});
function isSwatchRGB(value) {
  const test = {
    r: 0,
    g: 0,
    b: 0,
    toColorString: () => "",
    contrast: () => 0,
    relativeLuminance: 0
  };
  for (const key in test) {
    if (typeof test[key] !== typeof value[key]) {
      return false;
    }
  }
  return true;
}
class SwatchRGBImpl extends ColorRGBA64 {
  /**
   *
   * @param red - Red channel expressed as a number between 0 and 1
   * @param green - Green channel expressed as a number between 0 and 1
   * @param blue - Blue channel expressed as a number between 0 and 1
   */
  constructor(red, green, blue) {
    super(red, green, blue, 1);
    this.toColorString = this.toStringHexRGB;
    this.contrast = contrast.bind(null, this);
    this.createCSS = this.toColorString;
    this.relativeLuminance = rgbToRelativeLuminance(this);
  }
  static fromObject(obj) {
    return new SwatchRGBImpl(obj.r, obj.g, obj.b);
  }
}
function binarySearch(valuesToSearch, searchCondition, startIndex = 0, endIndex = valuesToSearch.length - 1) {
  if (endIndex === startIndex) {
    return valuesToSearch[startIndex];
  }
  const middleIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
  return searchCondition(valuesToSearch[middleIndex]) ? binarySearch(
    valuesToSearch,
    searchCondition,
    startIndex,
    middleIndex
    // include this index because it passed the search condition
  ) : binarySearch(
    valuesToSearch,
    searchCondition,
    middleIndex + 1,
    // exclude this index because it failed the search condition
    endIndex
  );
}
const target = (-0.1 + Math.sqrt(0.21)) / 2;
function isDark(color) {
  return color.relativeLuminance <= target;
}
function directionByIsDark(color) {
  return isDark(color) ? -1 : 1;
}
function create$1(rOrSource, g, b2) {
  if (typeof rOrSource === "number") {
    return PaletteRGB.from(SwatchRGB.create(rOrSource, g, b2));
  } else {
    return PaletteRGB.from(rOrSource);
  }
}
function from(source) {
  return isSwatchRGB(source) ? PaletteRGBImpl.from(source) : PaletteRGBImpl.from(SwatchRGB.create(source.r, source.g, source.b));
}
const PaletteRGB = Object.freeze({
  create: create$1,
  from
});
class PaletteRGBImpl {
  /**
   *
   * @param source - The source color for the palette
   * @param swatches - All swatches in the palette
   */
  constructor(source, swatches) {
    this.closestIndexCache = /* @__PURE__ */ new Map();
    this.source = source;
    this.swatches = swatches;
    this.reversedSwatches = Object.freeze([...this.swatches].reverse());
    this.lastIndex = this.swatches.length - 1;
  }
  /**
   * {@inheritdoc Palette.colorContrast}
   */
  colorContrast(reference, contrastTarget, initialSearchIndex, direction) {
    if (initialSearchIndex === void 0) {
      initialSearchIndex = this.closestIndexOf(reference);
    }
    let source = this.swatches;
    const endSearchIndex = this.lastIndex;
    let startSearchIndex = initialSearchIndex;
    if (direction === void 0) {
      direction = directionByIsDark(reference);
    }
    const condition = (value) => contrast(reference, value) >= contrastTarget;
    if (direction === -1) {
      source = this.reversedSwatches;
      startSearchIndex = endSearchIndex - startSearchIndex;
    }
    return binarySearch(source, condition, startSearchIndex, endSearchIndex);
  }
  /**
   * {@inheritdoc Palette.get}
   */
  get(index) {
    return this.swatches[index] || this.swatches[clamp(index, 0, this.lastIndex)];
  }
  /**
   * {@inheritdoc Palette.closestIndexOf}
   */
  closestIndexOf(reference) {
    if (this.closestIndexCache.has(reference.relativeLuminance)) {
      return this.closestIndexCache.get(reference.relativeLuminance);
    }
    let index = this.swatches.indexOf(reference);
    if (index !== -1) {
      this.closestIndexCache.set(reference.relativeLuminance, index);
      return index;
    }
    const closest = this.swatches.reduce((previous, next) => Math.abs(next.relativeLuminance - reference.relativeLuminance) < Math.abs(previous.relativeLuminance - reference.relativeLuminance) ? next : previous);
    index = this.swatches.indexOf(closest);
    this.closestIndexCache.set(reference.relativeLuminance, index);
    return index;
  }
  /**
   * Create a color palette from a provided swatch
   * @param source - The source swatch to create a palette from
   * @returns
   */
  static from(source) {
    return new PaletteRGBImpl(source, Object.freeze(new ComponentStateColorPalette({
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      baseColor: ColorRGBA64.fromObject(source)
    }).palette.map((x) => {
      const _x = parseColorHexRGB(x.toStringHexRGB());
      return SwatchRGB.create(_x.r, _x.g, _x.b);
    })));
  }
}
function accentFill(palette, neutralPalette2, reference, hoverDelta, activeDelta, focusDelta, neutralFillRestDelta2, neutralFillHoverDelta2, neutralFillActiveDelta2) {
  const accent = palette.source;
  const referenceIndex = neutralPalette2.closestIndexOf(reference);
  const swapThreshold = Math.max(neutralFillRestDelta2, neutralFillHoverDelta2, neutralFillActiveDelta2);
  const direction = referenceIndex >= swapThreshold ? -1 : 1;
  const accentIndex = palette.closestIndexOf(accent);
  const hoverIndex = accentIndex;
  const restIndex = hoverIndex + direction * -1 * hoverDelta;
  const activeIndex = restIndex + direction * activeDelta;
  const focusIndex = restIndex + direction * focusDelta;
  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex)
  };
}
function accentForeground(palette, reference, contrastTarget, restDelta, hoverDelta, activeDelta, focusDelta) {
  const accent = palette.source;
  const accentIndex = palette.closestIndexOf(accent);
  const direction = directionByIsDark(reference);
  const startIndex = accentIndex + (direction === 1 ? Math.min(restDelta, hoverDelta) : Math.max(direction * restDelta, direction * hoverDelta));
  const accessibleSwatch = palette.colorContrast(reference, contrastTarget, startIndex, direction);
  const accessibleIndex1 = palette.closestIndexOf(accessibleSwatch);
  const accessibleIndex2 = accessibleIndex1 + direction * Math.abs(restDelta - hoverDelta);
  const indexOneIsRestState = direction === 1 ? restDelta < hoverDelta : direction * restDelta > direction * hoverDelta;
  let restIndex;
  let hoverIndex;
  if (indexOneIsRestState) {
    restIndex = accessibleIndex1;
    hoverIndex = accessibleIndex2;
  } else {
    restIndex = accessibleIndex2;
    hoverIndex = accessibleIndex1;
  }
  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(restIndex + direction * activeDelta),
    focus: palette.get(restIndex + direction * focusDelta)
  };
}
const white = SwatchRGB.create(1, 1, 1);
const black = SwatchRGB.create(0, 0, 0);
const middleGrey = SwatchRGB.from(parseColorHexRGB("#808080"));
const accentBase = SwatchRGB.from(parseColorHexRGB("#DA1A5F"));
function foregroundOnAccent(reference, contrastTarget) {
  return reference.contrast(white) >= contrastTarget ? white : black;
}
function neutralFill(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
  const referenceIndex = palette.closestIndexOf(reference);
  const threshold = Math.max(restDelta, hoverDelta, activeDelta, focusDelta);
  const direction = referenceIndex >= threshold ? -1 : 1;
  return {
    rest: palette.get(referenceIndex + direction * restDelta),
    hover: palette.get(referenceIndex + direction * hoverDelta),
    active: palette.get(referenceIndex + direction * activeDelta),
    focus: palette.get(referenceIndex + direction * focusDelta)
  };
}
function neutralFillInput(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
  const direction = directionByIsDark(reference);
  const referenceIndex = palette.closestIndexOf(reference);
  return {
    rest: palette.get(referenceIndex - direction * restDelta),
    hover: palette.get(referenceIndex - direction * hoverDelta),
    active: palette.get(referenceIndex - direction * activeDelta),
    focus: palette.get(referenceIndex - direction * focusDelta)
  };
}
function neutralFillLayer(palette, reference, delta) {
  const referenceIndex = palette.closestIndexOf(reference);
  return palette.get(referenceIndex - (referenceIndex < delta ? delta * -1 : delta));
}
function neutralFillStealth(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta, fillRestDelta, fillHoverDelta, fillActiveDelta, fillFocusDelta) {
  const swapThreshold = Math.max(restDelta, hoverDelta, activeDelta, focusDelta, fillRestDelta, fillHoverDelta, fillActiveDelta, fillFocusDelta);
  const referenceIndex = palette.closestIndexOf(reference);
  const direction = referenceIndex >= swapThreshold ? -1 : 1;
  return {
    rest: palette.get(referenceIndex + direction * restDelta),
    hover: palette.get(referenceIndex + direction * hoverDelta),
    active: palette.get(referenceIndex + direction * activeDelta),
    focus: palette.get(referenceIndex + direction * focusDelta)
  };
}
function neutralFillContrast(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
  const direction = directionByIsDark(reference);
  const accessibleIndex = palette.closestIndexOf(palette.colorContrast(reference, 4.5));
  const accessibleIndex2 = accessibleIndex + direction * Math.abs(restDelta - hoverDelta);
  const indexOneIsRest = direction === 1 ? restDelta < hoverDelta : direction * restDelta > direction * hoverDelta;
  let restIndex;
  let hoverIndex;
  if (indexOneIsRest) {
    restIndex = accessibleIndex;
    hoverIndex = accessibleIndex2;
  } else {
    restIndex = accessibleIndex2;
    hoverIndex = accessibleIndex;
  }
  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(restIndex + direction * activeDelta),
    focus: palette.get(restIndex + direction * focusDelta)
  };
}
function focusStrokeOuter$1(palette, reference) {
  return palette.colorContrast(reference, 3.5);
}
function focusStrokeInner$1(palette, reference, focusColor) {
  return palette.colorContrast(focusColor, 3.5, palette.closestIndexOf(palette.source), directionByIsDark(reference) * -1);
}
function neutralForeground(palette, reference) {
  return palette.colorContrast(reference, 14);
}
function neutralForegroundHint$1(palette, reference) {
  return palette.colorContrast(reference, 4.5);
}
function baseLayerLuminanceSwatch(luminance) {
  return SwatchRGB.create(luminance, luminance, luminance);
}
const StandardLuminance = {
  LightMode: 1,
  DarkMode: 0.23
};
function neutralLayerCardContainer(palette, relativeLuminance, layerDelta) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) + layerDelta);
}
function neutralLayerFloating(palette, relativeLuminance, layerDelta) {
  const cardIndex = palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - layerDelta;
  return palette.get(cardIndex - layerDelta);
}
function neutralLayer1$1(palette, baseLayerLuminance2) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance2)));
}
function neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) {
  return Math.max(palette.closestIndexOf(baseLayerLuminanceSwatch(luminance)) + layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta);
}
function neutralLayer2(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) {
  return palette.get(neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta));
}
function neutralLayer3(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) {
  return palette.get(neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) + layerDelta);
}
function neutralLayer4(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) {
  return palette.get(neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) + layerDelta * 2);
}
function neutralStroke(palette, reference, restDelta, hoverDelta, activeDelta, focusDelta) {
  const referenceIndex = palette.closestIndexOf(reference);
  const direction = directionByIsDark(reference);
  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);
  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex)
  };
}
function neutralStrokeDivider(palette, reference, delta) {
  return palette.get(palette.closestIndexOf(reference) + directionByIsDark(reference) * delta);
}
const { create } = DesignToken;
function createNonCss(name) {
  return DesignToken.create({ name, cssCustomPropertyName: null });
}
const bodyFont = create("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif');
const baseHeightMultiplier = create("base-height-multiplier").withDefault(10);
create("base-horizontal-spacing-multiplier").withDefault(3);
const baseLayerLuminance = create("base-layer-luminance").withDefault(StandardLuminance.DarkMode);
const controlCornerRadius = create("control-corner-radius").withDefault(4);
const density = create("density").withDefault(0);
const designUnit = create("design-unit").withDefault(4);
create("direction").withDefault(Direction.ltr);
const disabledOpacity = create("disabled-opacity").withDefault(0.3);
const strokeWidth = create("stroke-width").withDefault(1);
const focusStrokeWidth = create("focus-stroke-width").withDefault(2);
const typeRampBaseFontSize = create("type-ramp-base-font-size").withDefault("14px");
const typeRampBaseLineHeight = create("type-ramp-base-line-height").withDefault("20px");
create("type-ramp-minus-1-font-size").withDefault("12px");
create("type-ramp-minus-1-line-height").withDefault("16px");
create("type-ramp-minus-2-font-size").withDefault("10px");
create("type-ramp-minus-2-line-height").withDefault("16px");
create("type-ramp-plus-1-font-size").withDefault("16px");
create("type-ramp-plus-1-line-height").withDefault("24px");
create("type-ramp-plus-2-font-size").withDefault("20px");
create("type-ramp-plus-2-line-height").withDefault("28px");
create("type-ramp-plus-3-font-size").withDefault("28px");
create("type-ramp-plus-3-line-height").withDefault("36px");
create("type-ramp-plus-4-font-size").withDefault("34px");
create("type-ramp-plus-4-line-height").withDefault("44px");
create("type-ramp-plus-5-font-size").withDefault("46px");
create("type-ramp-plus-5-line-height").withDefault("56px");
create("type-ramp-plus-6-font-size").withDefault("60px");
create("type-ramp-plus-6-line-height").withDefault("72px");
createNonCss("accent-fill-rest-delta").withDefault(0);
const accentFillHoverDelta = createNonCss("accent-fill-hover-delta").withDefault(4);
const accentFillActiveDelta = createNonCss("accent-fill-active-delta").withDefault(-5);
const accentFillFocusDelta = createNonCss("accent-fill-focus-delta").withDefault(0);
const accentForegroundRestDelta = createNonCss("accent-foreground-rest-delta").withDefault(0);
const accentForegroundHoverDelta = createNonCss("accent-foreground-hover-delta").withDefault(6);
const accentForegroundActiveDelta = createNonCss("accent-foreground-active-delta").withDefault(-4);
const accentForegroundFocusDelta = createNonCss("accent-foreground-focus-delta").withDefault(0);
const neutralFillRestDelta = createNonCss("neutral-fill-rest-delta").withDefault(7);
const neutralFillHoverDelta = createNonCss("neutral-fill-hover-delta").withDefault(10);
const neutralFillActiveDelta = createNonCss("neutral-fill-active-delta").withDefault(5);
const neutralFillFocusDelta = createNonCss("neutral-fill-focus-delta").withDefault(0);
const neutralFillInputRestDelta = createNonCss("neutral-fill-input-rest-delta").withDefault(0);
const neutralFillInputHoverDelta = createNonCss("neutral-fill-input-hover-delta").withDefault(0);
const neutralFillInputActiveDelta = createNonCss("neutral-fill-input-active-delta").withDefault(0);
const neutralFillInputFocusDelta = createNonCss("neutral-fill-input-focus-delta").withDefault(0);
const neutralFillStealthRestDelta = createNonCss("neutral-fill-stealth-rest-delta").withDefault(0);
const neutralFillStealthHoverDelta = createNonCss("neutral-fill-stealth-hover-delta").withDefault(5);
const neutralFillStealthActiveDelta = createNonCss("neutral-fill-stealth-active-delta").withDefault(3);
const neutralFillStealthFocusDelta = createNonCss("neutral-fill-stealth-focus-delta").withDefault(0);
const neutralFillStrongRestDelta = createNonCss("neutral-fill-strong-rest-delta").withDefault(0);
const neutralFillStrongHoverDelta = createNonCss("neutral-fill-strong-hover-delta").withDefault(8);
const neutralFillStrongActiveDelta = createNonCss("neutral-fill-strong-active-delta").withDefault(-5);
const neutralFillStrongFocusDelta = createNonCss("neutral-fill-strong-focus-delta").withDefault(0);
const neutralFillLayerRestDelta = createNonCss("neutral-fill-layer-rest-delta").withDefault(3);
const neutralStrokeRestDelta = createNonCss("neutral-stroke-rest-delta").withDefault(25);
const neutralStrokeHoverDelta = createNonCss("neutral-stroke-hover-delta").withDefault(40);
const neutralStrokeActiveDelta = createNonCss("neutral-stroke-active-delta").withDefault(16);
const neutralStrokeFocusDelta = createNonCss("neutral-stroke-focus-delta").withDefault(25);
const neutralStrokeDividerRestDelta = createNonCss("neutral-stroke-divider-rest-delta").withDefault(8);
const neutralColor = create("neutral-color").withDefault(middleGrey);
const neutralPalette = createNonCss("neutral-palette").withDefault((element) => PaletteRGB.from(neutralColor.getValueFor(element)));
const accentColor = create("accent-color").withDefault(accentBase);
const accentPalette = createNonCss("accent-palette").withDefault((element) => PaletteRGB.from(accentColor.getValueFor(element)));
const neutralLayerCardContainerRecipe = createNonCss("neutral-layer-card-container-recipe").withDefault({
  evaluate: (element) => neutralLayerCardContainer(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element))
});
create("neutral-layer-card-container").withDefault((element) => neutralLayerCardContainerRecipe.getValueFor(element).evaluate(element));
const neutralLayerFloatingRecipe = createNonCss("neutral-layer-floating-recipe").withDefault({
  evaluate: (element) => neutralLayerFloating(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element))
});
create("neutral-layer-floating").withDefault((element) => neutralLayerFloatingRecipe.getValueFor(element).evaluate(element));
const neutralLayer1Recipe = createNonCss("neutral-layer-1-recipe").withDefault({
  evaluate: (element) => neutralLayer1$1(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element))
});
const neutralLayer1 = create("neutral-layer-1").withDefault((element) => neutralLayer1Recipe.getValueFor(element).evaluate(element));
const neutralLayer2Recipe = createNonCss("neutral-layer-2-recipe").withDefault({
  evaluate: (element) => neutralLayer2(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element))
});
create("neutral-layer-2").withDefault((element) => neutralLayer2Recipe.getValueFor(element).evaluate(element));
const neutralLayer3Recipe = createNonCss("neutral-layer-3-recipe").withDefault({
  evaluate: (element) => neutralLayer3(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element))
});
create("neutral-layer-3").withDefault((element) => neutralLayer3Recipe.getValueFor(element).evaluate(element));
const neutralLayer4Recipe = createNonCss("neutral-layer-4-recipe").withDefault({
  evaluate: (element) => neutralLayer4(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element))
});
create("neutral-layer-4").withDefault((element) => neutralLayer4Recipe.getValueFor(element).evaluate(element));
const fillColor = create("fill-color").withDefault((element) => neutralLayer1.getValueFor(element));
var ContrastTarget;
(function(ContrastTarget2) {
  ContrastTarget2[ContrastTarget2["normal"] = 4.5] = "normal";
  ContrastTarget2[ContrastTarget2["large"] = 7] = "large";
})(ContrastTarget || (ContrastTarget = {}));
const accentFillRecipe = create({
  name: "accent-fill-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element, reference) => accentFill(accentPalette.getValueFor(element), neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), accentFillHoverDelta.getValueFor(element), accentFillActiveDelta.getValueFor(element), accentFillFocusDelta.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element))
});
const accentFillRest = create("accent-fill-rest").withDefault((element) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).rest;
});
const accentFillHover = create("accent-fill-hover").withDefault((element) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).hover;
});
const accentFillActive = create("accent-fill-active").withDefault((element) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).active;
});
const accentFillFocus = create("accent-fill-focus").withDefault((element) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).focus;
});
const foregroundOnAccentByContrast = (contrast2) => (element, reference) => {
  return foregroundOnAccent(reference || accentFillRest.getValueFor(element), contrast2);
};
const foregroundOnAccentRecipe = createNonCss("foreground-on-accent-recipe").withDefault({
  evaluate: (element, reference) => foregroundOnAccentByContrast(ContrastTarget.normal)(element, reference)
});
const foregroundOnAccentRest = create("foreground-on-accent-rest").withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillRest.getValueFor(element)));
const foregroundOnAccentHover = create("foreground-on-accent-hover").withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillHover.getValueFor(element)));
const foregroundOnAccentActive = create("foreground-on-accent-active").withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillActive.getValueFor(element)));
const foregroundOnAccentFocus = create("foreground-on-accent-focus").withDefault((element) => foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillFocus.getValueFor(element)));
const foregroundOnAccentLargeRecipe = createNonCss("foreground-on-accent-large-recipe").withDefault({
  evaluate: (element, reference) => foregroundOnAccentByContrast(ContrastTarget.large)(element, reference)
});
create("foreground-on-accent-rest-large").withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillRest.getValueFor(element)));
create("foreground-on-accent-hover-large").withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillHover.getValueFor(element)));
create("foreground-on-accent-active-large").withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillActive.getValueFor(element)));
create("foreground-on-accent-focus-large").withDefault((element) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillFocus.getValueFor(element)));
const accentForegroundByContrast = (contrast2) => (element, reference) => accentForeground(accentPalette.getValueFor(element), reference || fillColor.getValueFor(element), contrast2, accentForegroundRestDelta.getValueFor(element), accentForegroundHoverDelta.getValueFor(element), accentForegroundActiveDelta.getValueFor(element), accentForegroundFocusDelta.getValueFor(element));
const accentForegroundRecipe = create({
  name: "accent-foreground-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element, reference) => accentForegroundByContrast(ContrastTarget.normal)(element, reference)
});
const accentForegroundRest = create("accent-foreground-rest").withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).rest);
const accentForegroundHover = create("accent-foreground-hover").withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).hover);
const accentForegroundActive = create("accent-foreground-active").withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).active);
create("accent-foreground-focus").withDefault((element) => accentForegroundRecipe.getValueFor(element).evaluate(element).focus);
const neutralFillRecipe = create({
  name: "neutral-fill-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element, reference) => neutralFill(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element), neutralFillFocusDelta.getValueFor(element))
});
const neutralFillRest = create("neutral-fill-rest").withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).rest);
const neutralFillHover = create("neutral-fill-hover").withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).hover);
const neutralFillActive = create("neutral-fill-active").withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).active);
create("neutral-fill-focus").withDefault((element) => neutralFillRecipe.getValueFor(element).evaluate(element).focus);
const neutralFillInputRecipe = create({
  name: "neutral-fill-input-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element, reference) => neutralFillInput(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillInputRestDelta.getValueFor(element), neutralFillInputHoverDelta.getValueFor(element), neutralFillInputActiveDelta.getValueFor(element), neutralFillInputFocusDelta.getValueFor(element))
});
const neutralFillInputRest = create("neutral-fill-input-rest").withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).rest);
const neutralFillInputHover = create("neutral-fill-input-hover").withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).hover);
const neutralFillInputActive = create("neutral-fill-input-active").withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).active);
create("neutral-fill-input-focus").withDefault((element) => neutralFillInputRecipe.getValueFor(element).evaluate(element).focus);
const neutralFillStealthRecipe = create({
  name: "neutral-fill-stealth-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element, reference) => neutralFillStealth(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillStealthRestDelta.getValueFor(element), neutralFillStealthHoverDelta.getValueFor(element), neutralFillStealthActiveDelta.getValueFor(element), neutralFillStealthFocusDelta.getValueFor(element), neutralFillRestDelta.getValueFor(element), neutralFillHoverDelta.getValueFor(element), neutralFillActiveDelta.getValueFor(element), neutralFillFocusDelta.getValueFor(element))
});
const neutralFillStealthRest = create("neutral-fill-stealth-rest").withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).rest);
const neutralFillStealthHover = create("neutral-fill-stealth-hover").withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).hover);
const neutralFillStealthActive = create("neutral-fill-stealth-active").withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).active);
create("neutral-fill-stealth-focus").withDefault((element) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).focus);
const neutralFillStrongRecipe = create({
  name: "neutral-fill-strong-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element, reference) => neutralFillContrast(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillStrongRestDelta.getValueFor(element), neutralFillStrongHoverDelta.getValueFor(element), neutralFillStrongActiveDelta.getValueFor(element), neutralFillStrongFocusDelta.getValueFor(element))
});
create("neutral-fill-strong-rest").withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).rest);
create("neutral-fill-strong-hover").withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).hover);
create("neutral-fill-strong-active").withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).active);
create("neutral-fill-strong-focus").withDefault((element) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).focus);
const neutralFillLayerRecipe = createNonCss("neutral-fill-layer-recipe").withDefault({
  evaluate: (element, reference) => neutralFillLayer(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralFillLayerRestDelta.getValueFor(element))
});
create("neutral-fill-layer-rest").withDefault((element) => neutralFillLayerRecipe.getValueFor(element).evaluate(element));
const focusStrokeOuterRecipe = createNonCss("focus-stroke-outer-recipe").withDefault({
  evaluate: (element) => focusStrokeOuter$1(neutralPalette.getValueFor(element), fillColor.getValueFor(element))
});
const focusStrokeOuter = create("focus-stroke-outer").withDefault((element) => focusStrokeOuterRecipe.getValueFor(element).evaluate(element));
const focusStrokeInnerRecipe = createNonCss("focus-stroke-inner-recipe").withDefault({
  evaluate: (element) => focusStrokeInner$1(accentPalette.getValueFor(element), fillColor.getValueFor(element), focusStrokeOuter.getValueFor(element))
});
const focusStrokeInner = create("focus-stroke-inner").withDefault((element) => focusStrokeInnerRecipe.getValueFor(element).evaluate(element));
const neutralForegroundHintRecipe = createNonCss("neutral-foreground-hint-recipe").withDefault({
  evaluate: (element) => neutralForegroundHint$1(neutralPalette.getValueFor(element), fillColor.getValueFor(element))
});
const neutralForegroundHint = create("neutral-foreground-hint").withDefault((element) => neutralForegroundHintRecipe.getValueFor(element).evaluate(element));
const neutralForegroundRecipe = createNonCss("neutral-foreground-recipe").withDefault({
  evaluate: (element) => neutralForeground(neutralPalette.getValueFor(element), fillColor.getValueFor(element))
});
const neutralForegroundRest = create("neutral-foreground-rest").withDefault((element) => neutralForegroundRecipe.getValueFor(element).evaluate(element));
const neutralStrokeRecipe = create({
  name: "neutral-stroke-recipe",
  cssCustomPropertyName: null
}).withDefault({
  evaluate: (element) => {
    return neutralStroke(neutralPalette.getValueFor(element), fillColor.getValueFor(element), neutralStrokeRestDelta.getValueFor(element), neutralStrokeHoverDelta.getValueFor(element), neutralStrokeActiveDelta.getValueFor(element), neutralStrokeFocusDelta.getValueFor(element));
  }
});
const neutralStrokeRest = create("neutral-stroke-rest").withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).rest);
const neutralStrokeHover = create("neutral-stroke-hover").withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).hover);
const neutralStrokeActive = create("neutral-stroke-active").withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).active);
create("neutral-stroke-focus").withDefault((element) => neutralStrokeRecipe.getValueFor(element).evaluate(element).focus);
const neutralStrokeDividerRecipe = createNonCss("neutral-stroke-divider-recipe").withDefault({
  evaluate: (element, reference) => neutralStrokeDivider(neutralPalette.getValueFor(element), reference || fillColor.getValueFor(element), neutralStrokeDividerRestDelta.getValueFor(element))
});
create("neutral-stroke-divider-rest").withDefault((element) => neutralStrokeDividerRecipe.getValueFor(element).evaluate(element));
const heightNumberAsToken = DesignToken.create({
  name: "height-number",
  cssCustomPropertyName: null
}).withDefault((target2) => (baseHeightMultiplier.getValueFor(target2) + density.getValueFor(target2)) * designUnit.getValueFor(target2));
const heightNumber = cssPartial`(${baseHeightMultiplier} + ${density}) * ${designUnit}`;
const ambientShadow = "0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))";
const directionalShadow = "0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))";
const elevation = `box-shadow: ${ambientShadow}, ${directionalShadow};`;
const BaseButtonStyles = css`
    ${display("inline-flex")} :host {
        font-family: ${bodyFont};
        outline: none;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        height: calc(${heightNumber} * 1px);
        min-width: calc(${heightNumber} * 1px);
        background-color: ${neutralFillRest};
        color: ${neutralForegroundRest};
        border-radius: calc(${controlCornerRadius} * 1px);
        fill: currentcolor;
        cursor: pointer;
    }

    .control {
        background: transparent;
        height: inherit;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: baseline;
        padding: 0 calc((10 + (${designUnit} * 2 * ${density})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${strokeWidth} * 1px) solid transparent;
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-weight: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    :host(:hover) {
        background-color: ${neutralFillHover};
    }

    :host(:active) {
        background-color: ${neutralFillActive};
    }

    .control:${focusVisible} {
        border-color: ${focusStrokeOuter};
        box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset;
    }

    .control::-moz-focus-inner {
        border: 0;
    }

    .start,
    .content,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
    }

    .control.icon-only {
        padding: 0;
        line-height: 0;
    }

    ::slotted(svg) {
        ${/* Glyph size and margin-left is temporary -
replace when adaptive typography is figured out */
""} width: 16px;
        height: 16px;
        pointer-events: none;
    }

    .start {
        margin-inline-end: 11px;
    }

    .end {
        margin-inline-start: 11px;
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
            :host .control {
              background-color: ${SystemColors.ButtonFace};
              border-color: ${SystemColors.ButtonText};
              color: ${SystemColors.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${SystemColors.Highlight};
              color: ${SystemColors.HighlightText};
            }

            .control:${focusVisible} {
              forced-color-adjust: none;
              background-color: ${SystemColors.Highlight};
              border-color: ${SystemColors.ButtonText};
              box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.ButtonText} inset;
              color: ${SystemColors.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${SystemColors.ButtonText};
            }

            :host([href]) .control {
                border-color: ${SystemColors.LinkText};
                color: ${SystemColors.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${focusVisible}{
              forced-color-adjust: none;
              background: ${SystemColors.ButtonFace};
              border-color: ${SystemColors.LinkText};
              box-shadow: 0 0 0 1px ${SystemColors.LinkText} inset;
              color: ${SystemColors.LinkText};
              fill: currentColor;
            }
        `));
const AccentButtonStyles = css`
    :host([appearance="accent"]) {
        background: ${accentFillRest};
        color: ${foregroundOnAccentRest};
    }

    :host([appearance="accent"]:hover) {
        background: ${accentFillHover};
        color: ${foregroundOnAccentHover};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${accentFillActive};
        color: ${foregroundOnAccentActive};
    }

    :host([appearance="accent"]) .control:${focusVisible} {
        box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset,
            0 0 0 calc((${focusStrokeWidth} + ${strokeWidth}) * 1px) ${focusStrokeInner} inset;
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${SystemColors.HighlightText};
                border-color: ${SystemColors.Highlight};
                color: ${SystemColors.Highlight};
            }

            :host([appearance="accent"]) .control:${focusVisible} {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${SystemColors.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${SystemColors.LinkText};
                color: ${SystemColors.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${SystemColors.ButtonFace};
                border-color: ${SystemColors.LinkText};
                box-shadow: none;
                color: ${SystemColors.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${focusVisible} {
                border-color: ${SystemColors.LinkText};
                box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${SystemColors.HighlightText} inset;
            }
        `));
css`
    :host([appearance="hypertext"]) {
        font-size: inherit;
        line-height: inherit;
        height: auto;
        min-width: 0;
        background: transparent;
    }

    :host([appearance="hypertext"]) .control {
        display: inline;
        padding: 0;
        border: none;
        box-shadow: none;
        border-radius: 0;
        line-height: 1;
    }

    :host a.control:not(:link) {
        background-color: transparent;
        cursor: default;
    }
    :host([appearance="hypertext"]) .control:link,
    :host([appearance="hypertext"]) .control:visited {
        background: transparent;
        color: ${accentForegroundRest};
        border-bottom: calc(${strokeWidth} * 1px) solid ${accentForegroundRest};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${accentForegroundHover};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${accentForegroundActive};
    }

    :host([appearance="hypertext"]) .control:${focusVisible} {
        border-bottom: calc(${focusStrokeWidth} * 1px) solid ${focusStrokeOuter};
        margin-bottom: calc(calc(${strokeWidth} - ${focusStrokeWidth}) * 1px);
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
            :host([appearance="hypertext"]:hover) {
                background-color: ${SystemColors.ButtonFace};
                color: ${SystemColors.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${focusVisible} {
                color: ${SystemColors.LinkText};
                border-bottom-color: ${SystemColors.LinkText};
                box-shadow: none;
            }
        `));
const LightweightButtonStyles = css`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${accentForegroundRest};
    }

    :host([appearance="lightweight"]) .control {
        padding: 0;
        height: initial;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }

    :host([appearance="lightweight"]:hover) {
        background: transparent;
        color: ${accentForegroundHover};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${accentForegroundActive};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${strokeWidth} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${accentForegroundHover};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${accentForegroundActive};
    }

    :host([appearance="lightweight"]) .control:${focusVisible} .content::before {
        background: ${neutralForegroundRest};
        height: calc(${focusStrokeWidth} * 1px);
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${focusVisible} {
                forced-color-adjust: none;
                background: ${SystemColors.ButtonFace};
                color: ${SystemColors.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${focusVisible} .content::before {
                background: ${SystemColors.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${focusVisible} {
                background: ${SystemColors.ButtonFace};
                box-shadow: none;
                color: ${SystemColors.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${focusVisible} .content::before {
                background: ${SystemColors.LinkText};
            }
        `));
const OutlineButtonStyles = css`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${accentFillRest};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${accentFillHover};
    }

    :host([appearance="outline"]:active) {
        border-color: ${accentFillActive};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${focusVisible} {
        box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset;
        border-color: ${focusStrokeOuter};
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
            :host([appearance="outline"]) .control {
                border-color: ${SystemColors.ButtonText};
            }
            :host([appearance="outline"]) .control:${focusVisible} {
              forced-color-adjust: none;
              background-color: ${SystemColors.Highlight};
              border-color: ${SystemColors.ButtonText};
              box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.ButtonText} inset;
              color: ${SystemColors.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${SystemColors.ButtonFace};
                border-color: ${SystemColors.LinkText};
                color: ${SystemColors.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${focusVisible} {
              forced-color-adjust: none;
              border-color: ${SystemColors.LinkText};
              box-shadow: 0 0 0 1px ${SystemColors.LinkText} inset;
            }
        `));
const StealthButtonStyles = css`
    :host([appearance="stealth"]) {
        background: ${neutralFillStealthRest};
    }

    :host([appearance="stealth"]:hover) {
        background: ${neutralFillStealthHover};
    }

    :host([appearance="stealth"]:active) {
        background: ${neutralFillStealthActive};
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${SystemColors.ButtonFace};
                border-color: transparent;
                color: ${SystemColors.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${focusVisible}) .control {
                background: ${SystemColors.Highlight};
                box-shadow: 0 0 0 1px ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${SystemColors.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${focusVisible}) .control {
                background: ${SystemColors.LinkText};
                border-color: ${SystemColors.LinkText};
                color: ${SystemColors.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${focusVisible}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${SystemColors.LinkText};
            }
        `));
function appearanceBehavior(value, styles2) {
  return new PropertyStyleSheetBehavior("appearance", value, styles2);
}
const buttonStyles = (context, definition) => css`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${disabledOpacity};
            background-color: ${neutralFillRest};
            cursor: ${disabledCursor};
        }

        ${BaseButtonStyles}
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${SystemColors.ButtonFace};
                    border-color: ${SystemColors.GrayText};
                    color: ${SystemColors.GrayText};
                    cursor: ${disabledCursor};
                    opacity: 1;
                }
            `), appearanceBehavior("accent", css`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${accentFillRest};
                }

                ${AccentButtonStyles}
            `.withBehaviors(forcedColorsStylesheetBehavior(css`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${SystemColors.ButtonFace};
                            border-color: ${SystemColors.GrayText};
                            color: ${SystemColors.GrayText};
                        }
                    `))), appearanceBehavior("lightweight", css`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${accentForegroundRest};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${LightweightButtonStyles}
            `.withBehaviors(forcedColorsStylesheetBehavior(css`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${SystemColors.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))), appearanceBehavior("outline", css`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${accentFillRest};
                }

                ${OutlineButtonStyles}
            `.withBehaviors(forcedColorsStylesheetBehavior(css`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${SystemColors.GrayText};
                        }
                    `))), appearanceBehavior("stealth", css`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${neutralFillStealthRest};
                }

                ${StealthButtonStyles}
            `.withBehaviors(forcedColorsStylesheetBehavior(css`
                        :host([appearance="stealth"][disabled]) {
                            background: ${SystemColors.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${SystemColors.ButtonFace};
                            border-color: transparent;
                            color: ${SystemColors.GrayText};
                        }
                    `))));
class Button2 extends Button$1 {
  constructor() {
    super(...arguments);
    this.appearance = "neutral";
  }
  /**
   * Applies 'icon-only' class when there is only an SVG in the default slot
   *
   * @public
   * @remarks
   */
  defaultSlottedContentChanged(oldValue, newValue) {
    const slottedElements = this.defaultSlottedContent.filter((x) => x.nodeType === Node.ELEMENT_NODE);
    if (slottedElements.length === 1 && slottedElements[0] instanceof SVGElement) {
      this.control.classList.add("icon-only");
    } else {
      this.control.classList.remove("icon-only");
    }
  }
}
__decorate([
  attr
], Button2.prototype, "appearance", void 0);
const fastButton = Button2.compose({
  baseName: "button",
  baseClass: Button$1,
  template: buttonTemplate,
  styles: buttonStyles,
  shadowOptions: {
    delegatesFocus: true
  }
});
const cardStyles = (context, definition) => css`
        ${display("block")} :host {
            --elevation: 4;
            display: block;
            contain: content;
            height: var(--card-height, 100%);
            width: var(--card-width, 100%);
            box-sizing: border-box;
            background: ${fillColor};
            border-radius: calc(${controlCornerRadius} * 1px);
            ${elevation}
        }
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
                :host {
                    forced-color-adjust: none;
                    background: ${SystemColors.Canvas};
                    box-shadow: 0 0 0 1px ${SystemColors.CanvasText};
                }
            `));
class Card2 extends Card$1 {
  connectedCallback() {
    super.connectedCallback();
    const parent = composedParent(this);
    if (parent) {
      fillColor.setValueFor(this, (target2) => neutralFillLayerRecipe.getValueFor(target2).evaluate(target2, fillColor.getValueFor(parent)));
    }
  }
}
const fastCard = Card2.compose({
  baseName: "card",
  baseClass: Card$1,
  template: cardTemplate,
  styles: cardStyles
});
const checkboxStyles = (context, definition) => css`
        ${display("inline-flex")} :host {
            align-items: center;
            outline: none;
            margin: calc(${designUnit} * 1px) 0;
            /* Chromium likes to select label text or the default slot when the checkbox is
                clicked. Maybe there is a better solution here? */
            user-select: none;
        }

        .control {
            position: relative;
            width: calc((${heightNumber} / 2 + ${designUnit}) * 1px);
            height: calc((${heightNumber} / 2 + ${designUnit}) * 1px);
            box-sizing: border-box;
            border-radius: calc(${controlCornerRadius} * 1px);
            border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
            background: ${neutralFillInputRest};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${bodyFont};
            color: ${neutralForegroundRest};
            padding-inline-start: calc(${designUnit} * 2px + 2px);
            margin-inline-end: calc(${designUnit} * 2px + 2px);
            cursor: pointer;
            font-size: ${typeRampBaseFontSize};
            line-height: ${typeRampBaseLineHeight};
        }

        .label__hidden {
            display: none;
            visibility: hidden;
        }

        .checked-indicator {
            width: 100%;
            height: 100%;
            display: block;
            fill: ${foregroundOnAccentRest};
            opacity: 0;
            pointer-events: none;
        }

        .indeterminate-indicator {
            border-radius: calc(${controlCornerRadius} * 1px);
            background: ${foregroundOnAccentRest};
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
        }

        :host(:not([disabled])) .control:hover {
            background: ${neutralFillInputHover};
            border-color: ${neutralStrokeHover};
        }

        :host(:not([disabled])) .control:active {
            background: ${neutralFillInputActive};
            border-color: ${neutralStrokeActive};
        }

        :host(:${focusVisible}) .control {
            box-shadow: 0 0 0 2px ${fillColor}, 0 0 0 4px ${focusStrokeOuter};
        }

        :host([aria-checked="true"]) .control {
            background: ${accentFillRest};
            border: calc(${strokeWidth} * 1px) solid ${accentFillRest};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${accentFillHover};
            border: calc(${strokeWidth} * 1px) solid ${accentFillHover};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            fill: ${foregroundOnAccentHover};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .indeterminate-indicator {
            background: ${foregroundOnAccentHover};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${accentFillActive};
            border: calc(${strokeWidth} * 1px) solid ${accentFillActive};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            fill: ${foregroundOnAccentActive};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .indeterminate-indicator {
            background: ${foregroundOnAccentActive};
        }

        :host([aria-checked="true"]:${focusVisible}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${fillColor}, 0 0 0 4px ${focusStrokeOuter};
        }


        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${disabledCursor};
        }

        :host([aria-checked="true"]:not(.indeterminate)) .checked-indicator,
        :host(.indeterminate) .indeterminate-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${disabledOpacity};
        }
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
            .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.FieldText};
                background: ${SystemColors.Field};
            }
            .checked-indicator {
                fill: ${SystemColors.FieldText};
            }
            .indeterminate-indicator {
                background: ${SystemColors.FieldText};
            }
            :host(:not([disabled])) .control:hover, .control:active {
                border-color: ${SystemColors.Highlight};
                background: ${SystemColors.Field};
            }
            :host(:${focusVisible}) .control {
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host([aria-checked="true"]:${focusVisible}:not([disabled])) .control {
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host([aria-checked="true"]) .control {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover, .control:active {
                border-color: ${SystemColors.Highlight};
                background: ${SystemColors.HighlightText};
            }
            :host([aria-checked="true"]) .checked-indicator {
                fill: ${SystemColors.HighlightText};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
                fill: ${SystemColors.Highlight}
            }
            :host([aria-checked="true"]) .indeterminate-indicator {
                background: ${SystemColors.HighlightText};
            }
            :host([aria-checked="true"]) .control:hover .indeterminate-indicator {
                background: ${SystemColors.Highlight}
            }
            :host([disabled]) {
                opacity: 1;
            }
            :host([disabled]) .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.GrayText};
                background: ${SystemColors.Field};
            }
            :host([disabled]) .indeterminate-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .indeterminate-indicator {
                forced-color-adjust: none;
                background: ${SystemColors.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                forced-color-adjust: none;
                fill: ${SystemColors.GrayText};
            }
        `));
const fastCheckbox = Checkbox.compose({
  baseName: "checkbox",
  template: checkboxTemplate,
  styles: checkboxStyles,
  checkedIndicator: (
    /* html */
    `
        <svg
            part="checked-indicator"
            class="checked-indicator"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
            />
        </svg>
    `
  ),
  indeterminateIndicator: (
    /* html */
    `
        <div part="indeterminate-indicator" class="indeterminate-indicator"></div>
    `
  )
});
const listboxStyles = (context, definition) => {
  const ListboxOptionTag = context.tagFor(ListboxOption);
  const hostContext = context.name === context.tagFor(ListboxElement) ? "" : ".listbox";
  return css`
        ${!hostContext ? display("inline-flex") : ""}

        :host ${hostContext} {
            background: ${fillColor};
            border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
            border-radius: calc(${controlCornerRadius} * 1px);
            box-sizing: border-box;
            flex-direction: column;
            padding: calc(${designUnit} * 1px) 0;
        }

        ${!hostContext ? css`
            :host(:focus-within:not([disabled])) {
                border-color: ${focusStrokeOuter};
                box-shadow: 0 0 0
                    calc((${focusStrokeWidth} - ${strokeWidth}) * 1px)
                    ${focusStrokeOuter} inset;
            }

            :host([disabled]) ::slotted(*) {
                cursor: ${disabledCursor};
                opacity: ${disabledOpacity};
                pointer-events: none;
            }
        ` : ``}

        ${hostContext || `:host([size])`} {
            max-height: calc(
                (var(--size) * ${heightNumber} + (${designUnit} * ${strokeWidth} * 2)) * 1px
            );
            overflow-y: auto;
        }

        :host([size="0"]) ${hostContext} {
            max-height: none;
        }
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
                :host(:not([multiple]):${focusVisible}) ::slotted(${ListboxOptionTag}[aria-selected="true"]),
                :host([multiple]:${focusVisible}) ::slotted(${ListboxOptionTag}[aria-checked="true"]) {
                    border-color: ${SystemColors.ButtonText};
                    box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${SystemColors.HighlightText};
                }

                :host(:not([multiple]):${focusVisible}) ::slotted(${ListboxOptionTag}[aria-selected="true"]) {
                    background: ${SystemColors.Highlight};
                    color: ${SystemColors.HighlightText};
                    fill: currentcolor;
                }

                ::slotted(${ListboxOptionTag}[aria-selected="true"]:not([aria-checked="true"])) {
                    background: ${SystemColors.Highlight};
                    border-color: ${SystemColors.HighlightText};
                    color: ${SystemColors.HighlightText};
                }
            `));
};
const selectStyles = (context, definition) => {
  const selectContext = context.name === context.tagFor(Select);
  return css`
        ${display("inline-flex")}

        :host {
            --elevation: 14;
            background: ${neutralFillInputRest};
            border-radius: calc(${controlCornerRadius} * 1px);
            border: calc(${strokeWidth} * 1px) solid ${accentFillRest};
            box-sizing: border-box;
            color: ${neutralForegroundRest};
            font-family: ${bodyFont};
            height: calc(${heightNumber} * 1px);
            position: relative;
            user-select: none;
            min-width: 250px;
            outline: none;
            vertical-align: top;
        }

        ${selectContext ? css`
            :host(:not([aria-haspopup])) {
                --elevation: 0;
                border: 0;
                height: auto;
                min-width: 0;
            }
        ` : ""}

        ${listboxStyles(context)}

        :host .listbox {
            ${elevation}
            border: none;
            display: flex;
            left: 0;
            position: absolute;
            width: 100%;
            z-index: 1;
        }

        .control + .listbox {
            --stroke-size: calc(${designUnit} * ${strokeWidth} * 2);
            max-height: calc(
                (var(--listbox-max-height) * ${heightNumber} + var(--stroke-size)) * 1px
            );
        }

        ${selectContext ? css`
            :host(:not([aria-haspopup])) .listbox {
                left: auto;
                position: static;
                z-index: auto;
            }
        ` : ""}

        .listbox[hidden] {
            display: none;
        }

        .control {
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            font-size: ${typeRampBaseFontSize};
            font-family: inherit;
            line-height: ${typeRampBaseLineHeight};
            min-height: 100%;
            padding: 0 calc(${designUnit} * 2.25px);
            width: 100%;
        }

        :host(:not([disabled]):hover) {
            background: ${neutralFillInputHover};
            border-color: ${accentFillHover};
        }

        :host(:${focusVisible}) {
            border-color: ${focusStrokeOuter};
        }

        :host(:not([size]):not([multiple]):not([open]):${focusVisible}),
        :host([multiple]:${focusVisible}),
        :host([size]:${focusVisible}) {
            box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter};
        }

        :host(:not([multiple]):not([size]):${focusVisible}) ::slotted(${context.tagFor(ListboxOption)}[aria-selected="true"]:not([disabled])) {
            box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${focusStrokeInner};
            border-color: ${focusStrokeOuter};
            background: ${accentFillFocus};
            color: ${foregroundOnAccentFocus};
        }

        :host([disabled]) {
            cursor: ${disabledCursor};
            opacity: ${disabledOpacity};
        }

        :host([disabled]) .control {
            cursor: ${disabledCursor};
            user-select: none;
        }

        :host([disabled]:hover) {
            background: ${neutralFillStealthRest};
            color: ${neutralForegroundRest};
            fill: currentcolor;
        }

        :host(:not([disabled])) .control:active {
            background: ${neutralFillInputActive};
            border-color: ${accentFillActive};
            border-radius: calc(${controlCornerRadius} * 1px);
        }

        :host([open][position="above"]) .listbox {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: 0;
            bottom: calc(${heightNumber} * 1px);
        }

        :host([open][position="below"]) .listbox {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 0;
            top: calc(${heightNumber} * 1px);
        }

        .selected-value {
            flex: 1 1 auto;
            font-family: inherit;
            min-width: calc(var(--listbox-scroll-width, 0) - (${designUnit} * 4) * 1px);
            overflow: hidden;
            text-align: start;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .indicator {
            flex: 0 0 auto;
            margin-inline-start: 1em;
        }

        slot[name="listbox"] {
            display: none;
            width: 100%;
        }

        :host([open]) slot[name="listbox"] {
            display: flex;
            position: absolute;
            ${elevation}
        }

        .end {
            margin-inline-start: auto;
        }

        .start,
        .end,
        .indicator,
        .select-indicator,
        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            fill: currentcolor;
            height: 1em;
            min-height: calc(${designUnit} * 4px);
            min-width: calc(${designUnit} * 4px);
            width: 1em;
        }

        ::slotted([role="option"]),
        ::slotted(option) {
            flex: 0 0 auto;
        }
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
                :host(:not([disabled]):hover),
                :host(:not([disabled]):active) {
                    border-color: ${SystemColors.Highlight};
                }

                :host(:not([disabled]):${focusVisible}) {
                    background-color: ${SystemColors.ButtonFace};
                    box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${SystemColors.Highlight};
                    color: ${SystemColors.ButtonText};
                    fill: currentcolor;
                    forced-color-adjust: none;
                }

                :host(:not([disabled]):${focusVisible}) .listbox {
                    background: ${SystemColors.ButtonFace};
                }

                :host([disabled]) {
                    border-color: ${SystemColors.GrayText};
                    background-color: ${SystemColors.ButtonFace};
                    color: ${SystemColors.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                    forced-color-adjust: none;
                }

                :host([disabled]:hover) {
                    background: ${SystemColors.ButtonFace};
                }

                :host([disabled]) .control {
                    color: ${SystemColors.GrayText};
                    border-color: ${SystemColors.GrayText};
                }

                :host([disabled]) .control .select-indicator {
                    fill: ${SystemColors.GrayText};
                }

                :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]),
                :host(:${focusVisible}) ::slotted(option[aria-selected="true"]),
                :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
                    background: ${SystemColors.Highlight};
                    border-color: ${SystemColors.ButtonText};
                    box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${SystemColors.HighlightText};
                    color: ${SystemColors.HighlightText};
                    fill: currentcolor;
                }

                .start,
                .end,
                .indicator,
                .select-indicator,
                ::slotted(svg) {
                    color: ${SystemColors.ButtonText};
                    fill: currentcolor;
                }
            `));
};
const comboboxStyles = (context, definition) => css`
    ${selectStyles(context)}

    :host(:empty) .listbox {
        display: none;
    }

    :host([disabled]) *,
    :host([disabled]) {
        cursor: ${disabledCursor};
        user-select: none;
    }

    .selected-value {
        -webkit-appearance: none;
        background: transparent;
        border: none;
        color: inherit;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        height: calc(100% - (${strokeWidth} * 1px));
        margin: auto 0;
        width: 100%;
    }

    .selected-value:hover,
    .selected-value:${focusVisible},
    .selected-value:disabled,
    .selected-value:active {
        outline: none;
    }
`;
class Combobox2 extends Combobox$1 {
  /**
   * @internal
   */
  maxHeightChanged(prev, next) {
    this.updateComputedStylesheet();
  }
  /**
   * Updates an internal stylesheet with calculated CSS custom properties.
   *
   * @internal
   */
  updateComputedStylesheet() {
    if (this.computedStylesheet) {
      this.$fastController.removeStyles(this.computedStylesheet);
    }
    const popupMaxHeight = Math.floor(this.maxHeight / heightNumberAsToken.getValueFor(this)).toString();
    this.computedStylesheet = css`
            :host {
                --listbox-max-height: ${popupMaxHeight};
            }
        `;
    this.$fastController.addStyles(this.computedStylesheet);
  }
}
const fastCombobox = Combobox2.compose({
  baseName: "combobox",
  baseClass: Combobox$1,
  template: comboboxTemplate,
  styles: comboboxStyles,
  shadowOptions: {
    delegatesFocus: true
  },
  indicator: (
    /* html */
    `
        <svg
            class="select-indicator"
            part="select-indicator"
            viewBox="0 0 12 7"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
            />
        </svg>
    `
  )
});
const dialogStyles = (context, definition) => css`
    :host([hidden]) {
        display: none;
    }

    :host {
        --elevation: 14;
        --dialog-height: 480px;
        --dialog-width: 640px;
        display: block;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        touch-action: none;
    }

    .positioning-region {
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
    }

    .control {
        ${elevation}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${fillColor};
        z-index: 1;
        border-radius: calc(${controlCornerRadius} * 1px);
        border: calc(${strokeWidth} * 1px) solid transparent;
    }
`;
const fastDialog = Dialog.compose({
  baseName: "dialog",
  template: dialogTemplate,
  styles: dialogStyles
});
const optionStyles = (context, definition) => css`
        ${display("inline-flex")} :host {
            align-items: center;
            font-family: ${bodyFont};
            border-radius: calc(${controlCornerRadius} * 1px);
            border: calc(${focusStrokeWidth} * 1px) solid transparent;
            box-sizing: border-box;
            background: ${neutralFillStealthRest};
            color: ${neutralForegroundRest};
            cursor: pointer;
            flex: 0 0 auto;
            fill: currentcolor;
            font-size: ${typeRampBaseFontSize};
            height: calc(${heightNumber} * 1px);
            line-height: ${typeRampBaseLineHeight};
            margin: 0 calc((${designUnit} - ${focusStrokeWidth}) * 1px);
            outline: none;
            overflow: hidden;
            padding: 0 1ch;
            user-select: none;
            white-space: nowrap;
        }

        :host(:not([disabled]):not([aria-selected="true"]):hover) {
            background: ${neutralFillStealthHover};
        }

        :host(:not([disabled]):not([aria-selected="true"]):active) {
            background: ${neutralFillStealthActive};
        }

        :host([aria-selected="true"]) {
            background: ${accentFillRest};
            color: ${foregroundOnAccentRest};
        }

        :host(:not([disabled])[aria-selected="true"]:hover) {
            background: ${accentFillHover};
            color: ${foregroundOnAccentHover};
        }

        :host(:not([disabled])[aria-selected="true"]:active) {
            background: ${accentFillActive};
            color: ${foregroundOnAccentActive};
        }

        :host([disabled]) {
            cursor: ${disabledCursor};
            opacity: ${disabledOpacity};
        }

        .content {
            grid-column-start: 2;
            justify-self: start;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .start,
        .end,
        ::slotted(svg) {
            display: flex;
        }

        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            height: calc(${designUnit} * 4px);
            width: calc(${designUnit} * 4px);
        }

        ::slotted([slot="end"]) {
            margin-inline-start: 1ch;
        }

        ::slotted([slot="start"]) {
            margin-inline-end: 1ch;
        }

        :host([aria-checked="true"][aria-selected="false"]) {
            border-color: ${focusStrokeOuter};
        }

        :host([aria-checked="true"][aria-selected="true"]) {
            border-color: ${focusStrokeOuter};
            box-shadow: 0 0 0 calc(${focusStrokeWidth} * 2 * 1px) inset
                ${focusStrokeInner};
        }
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
                :host {
                    border-color: transparent;
                    forced-color-adjust: none;
                    color: ${SystemColors.ButtonText};
                    fill: currentcolor;
                }

                :host(:not([aria-selected="true"]):hover),
                :host([aria-selected="true"]) {
                    background: ${SystemColors.Highlight};
                    color: ${SystemColors.HighlightText};
                }

                :host([disabled]),
                :host([disabled][aria-selected="false"]:hover) {
                    background: ${SystemColors.Canvas};
                    color: ${SystemColors.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                }

                :host([aria-checked="true"][aria-selected="false"]) {
                    background: ${SystemColors.ButtonFace};
                    color: ${SystemColors.ButtonText};
                    border-color: ${SystemColors.ButtonText};
                }

                :host([aria-checked="true"][aria-selected="true"]),
                :host([aria-checked="true"][aria-selected="true"]:hover) {
                    background: ${SystemColors.Highlight};
                    color: ${SystemColors.HighlightText};
                    border-color: ${SystemColors.ButtonText};
                }
            `));
const fastOption = ListboxOption.compose({
  baseName: "option",
  template: listboxOptionTemplate,
  styles: optionStyles
});
const numberFieldStyles = (context, definition) => css`
    ${display("inline-block")} :host {
        font-family: ${bodyFont};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${neutralForegroundRest};
        background: ${neutralFillInputRest};
        border-radius: calc(${controlCornerRadius} * 1px);
        border: calc(${strokeWidth} * 1px) solid ${accentFillRest};
        height: calc(${heightNumber} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${designUnit} * 2px + 1px);
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .controls {
        opacity: 0;
    }

    .label {
        display: block;
        color: ${neutralForegroundRest};
        cursor: pointer;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .control,
    .controls,
    .end {
        align-self: center;
    }

    .start,
    .end {
        margin: auto;
        fill: currentcolor;
    }

    .step-up-glyph,
    .step-down-glyph {
        display: block;
        padding: 4px 10px;
        cursor: pointer;
    }

    .step-up-glyph:before,
    .step-down-glyph:before {
        content: '';
        display: block;
        border: solid transparent 6px;
    }

    .step-up-glyph:before {
        border-bottom-color: ${neutralForegroundRest};
    }

    .step-down-glyph:before {
        border-top-color: ${neutralForegroundRest};
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${neutralFillInputHover};
        border-color: ${accentFillHover};
    }

    :host(:active:not([disabled])) .root {
        background: ${neutralFillInputHover};
        border-color: ${accentFillActive};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${focusStrokeOuter};
        box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter} inset;
    }

    :host(:hover:not([disabled])) .controls,
    :host(:focus-within:not([disabled])) .controls {
        opacity: 1;
    }

    :host([appearance="filled"]) .root {
        background: ${neutralFillRest};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${neutralFillHover};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${disabledCursor};
    }

    :host([disabled]) {
        opacity: ${disabledOpacity};
    }

    :host([disabled]) .control {
        border-color: ${neutralStrokeRest};
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${SystemColors.Field};
                    border-color: ${SystemColors.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${SystemColors.Field};
                    border-color: ${SystemColors.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${SystemColors.GrayText};
                    background: ${SystemColors.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${SystemColors.Highlight};
                    box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
                }
                input::placeholder {
                    color: ${SystemColors.GrayText};
                }
            `));
class NumberField2 extends NumberField$1 {
  constructor() {
    super(...arguments);
    this.appearance = "outline";
  }
}
__decorate([
  attr
], NumberField2.prototype, "appearance", void 0);
const fastNumberField = NumberField2.compose({
  baseName: "number-field",
  baseClass: NumberField$1,
  styles: numberFieldStyles,
  template: numberFieldTemplate,
  shadowOptions: {
    delegatesFocus: true
  },
  stepDownGlyph: (
    /* html */
    `
        <span class="step-down-glyph" part="step-down-glyph"></span>
    `
  ),
  stepUpGlyph: (
    /* html */
    `
        <span class="step-up-glyph" part="step-up-glyph"></span>
    `
  )
});
const progressRingStyles = (context, definition) => css`
        ${display("flex")} :host {
            align-items: center;
            outline: none;
            height: calc(${heightNumber} * 1px);
            width: calc(${heightNumber} * 1px);
            margin: calc(${heightNumber} * 1px) 0;
        }

        .progress {
            height: 100%;
            width: 100%;
        }

        .background {
            stroke: ${neutralFillRest};
            fill: none;
            stroke-width: 2px;
        }

        .determinate {
            stroke: ${accentForegroundRest};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
        }

        .indeterminate-indicator-1 {
            stroke: ${accentForegroundRest};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
            animation: spin-infinite 2s linear infinite;
        }

        :host([paused]) .indeterminate-indicator-1 {
            animation-play-state: paused;
            stroke: ${neutralFillRest};
        }

        :host([paused]) .determinate {
            stroke: ${neutralForegroundHint};
        }

        @keyframes spin-infinite {
            0% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(0deg);
            }
            50% {
                stroke-dasharray: 21.99px 21.99px;
                transform: rotate(450deg);
            }
            100% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(1080deg);
            }
        }
    `.withBehaviors(forcedColorsStylesheetBehavior(css`
                .indeterminate-indicator-1,
                .determinate {
                    stroke: ${SystemColors.FieldText};
                }
                .background {
                    stroke: ${SystemColors.Field};
                }
                :host([paused]) .indeterminate-indicator-1 {
                    stroke: ${SystemColors.Field};
                }
                :host([paused]) .determinate {
                    stroke: ${SystemColors.GrayText};
                }
            `));
const fastProgressRing = BaseProgress.compose({
  baseName: "progress-ring",
  template: progressRingTemplate,
  styles: progressRingStyles,
  indeterminateIndicator: (
    /* html */
    `
        <svg class="progress" part="progress" viewBox="0 0 16 16">
            <circle
                class="background"
                part="background"
                cx="8px"
                cy="8px"
                r="7px"
            ></circle>
            <circle
                class="indeterminate-indicator-1"
                part="indeterminate-indicator-1"
                cx="8px"
                cy="8px"
                r="7px"
            ></circle>
        </svg>
    `
  )
});
const textAreaStyles = (context, definition) => css`
    ${display("inline-block")} :host {
        font-family: ${bodyFont};
        outline: none;
        user-select: none;
    }

    .control {
        box-sizing: border-box;
        position: relative;
        color: ${neutralForegroundRest};
        background: ${neutralFillInputRest};
        border-radius: calc(${controlCornerRadius} * 1px);
        border: calc(${strokeWidth} * 1px) solid ${accentFillRest};
        height: calc(${heightNumber} * 2px);
        font: inherit;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        padding: calc(${designUnit} * 2px + 1px);
        width: 100%;
        resize: none;
    }

    .control:hover:enabled {
        background: ${neutralFillInputHover};
        border-color: ${accentFillHover};
    }

    .control:active:enabled {
        background: ${neutralFillInputActive};
        border-color: ${accentFillActive};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
    }

    :host(:focus-within) .control {
        border-color: ${focusStrokeOuter};
        box-shadow: 0 0 0 1px ${focusStrokeOuter} inset;
    }

    :host([appearance="filled"]) .control {
        background: ${neutralFillRest};
    }

    :host([appearance="filled"]:hover:not([disabled])) .control {
        background: ${neutralFillHover};
    }

    :host([resize="both"]) .control {
        resize: both;
    }

    :host([resize="horizontal"]) .control {
        resize: horizontal;
    }

    :host([resize="vertical"]) .control {
        resize: vertical;
    }

    .label {
        display: block;
        color: ${neutralForegroundRest};
        cursor: pointer;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${disabledCursor};
    }
    :host([disabled]) {
        opacity: ${disabledOpacity};
    }
    :host([disabled]) .control {
        border-color: ${neutralStrokeRest};
    }

    :host([cols]){
        width: initial;
    }

    :host([rows]) .control {
        height: initial;
    }
 `.withBehaviors(forcedColorsStylesheetBehavior(css`
                :host([disabled]) {
                    opacity: 1;
                }
            `));
class TextArea2 extends TextArea$1 {
  constructor() {
    super(...arguments);
    this.appearance = "outline";
  }
}
__decorate([
  attr
], TextArea2.prototype, "appearance", void 0);
const fastTextArea = TextArea2.compose({
  baseName: "text-area",
  baseClass: TextArea$1,
  template: textAreaTemplate,
  styles: textAreaStyles,
  shadowOptions: {
    delegatesFocus: true
  }
});
const textFieldStyles = (context, definition) => css`
    ${display("inline-block")} :host {
        font-family: ${bodyFont};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${neutralForegroundRest};
        background: ${neutralFillInputRest};
        border-radius: calc(${controlCornerRadius} * 1px);
        border: calc(${strokeWidth} * 1px) solid ${accentFillRest};
        height: calc(${heightNumber} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${designUnit} * 2px + 1px);
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .label {
        display: block;
        color: ${neutralForegroundRest};
        cursor: pointer;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .control,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
        margin: auto;
        fill: currentcolor;
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${neutralFillInputHover};
        border-color: ${accentFillHover};
    }

    :host(:active:not([disabled])) .root {
        background: ${neutralFillInputHover};
        border-color: ${accentFillActive};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${focusStrokeOuter};
        box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter} inset;
    }

    :host([appearance="filled"]) .root {
        background: ${neutralFillRest};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${neutralFillHover};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${disabledCursor};
    }

    :host([disabled]) {
        opacity: ${disabledOpacity};
    }

    :host([disabled]) .control {
        border-color: ${neutralStrokeRest};
    }
`.withBehaviors(forcedColorsStylesheetBehavior(css`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${SystemColors.Field};
                    border-color: ${SystemColors.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${SystemColors.Field};
                    border-color: ${SystemColors.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${SystemColors.GrayText};
                    background: ${SystemColors.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${SystemColors.Highlight};
                    box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
                }
                input::placeholder {
                    color: ${SystemColors.GrayText};
                }
            `));
class TextField2 extends TextField$1 {
  constructor() {
    super(...arguments);
    this.appearance = "outline";
  }
}
__decorate([
  attr
], TextField2.prototype, "appearance", void 0);
const fastTextField = TextField2.compose({
  baseName: "text-field",
  baseClass: TextField$1,
  template: textFieldTemplate,
  styles: textFieldStyles,
  shadowOptions: {
    delegatesFocus: true
  }
});
function provideFASTDesignSystem(element) {
  return DesignSystem.getOrCreate(element).withPrefix("fast");
}
provideFASTDesignSystem().register(fastProgressRing());
let BusyIndicator = (_a = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "message");
    // 화면 전체영역을 커버합니다. <busy-indicator full></busy-indicator>
    __publicField(this, "full", false);
    __publicField(this, "show", true);
  }
  render() {
    if (!this.show)
      return html$1``;
    return html$1`
      <div class="busy-indicator">
        <fast-progress-ring indeterminate></fast-progress-ring>
        <div>${this.message}</div>
      </div>`;
  }
}, __publicField(_a, "styles", [
  css$1`
      :host {
        z-index: 999;
      }

      :host([full]) .busy-indicator {
        position: fixed; /* 전체 화면을 커버하기 위한 스타일 */
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
      
      .busy-indicator {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #2224;
        display: flex;
        align-items: center;
        justify-content: center;

        display: flex;
        flex-direction: column;
      }
      `
]), _a);
__decorate([
  n$1({ type: String })
], BusyIndicator.prototype, "message", void 0);
__decorate([
  n$1({ type: Boolean, reflect: true })
], BusyIndicator.prototype, "full", void 0);
__decorate([
  n$1({ type: Boolean, reflect: true })
], BusyIndicator.prototype, "show", void 0);
BusyIndicator = __decorate([
  t$2("busy-indicator")
], BusyIndicator);
let XSplitter = (_b = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "orientation", "horizontal");
    __publicField(this, "host");
    __publicField(this, "thumb");
    __publicField(this, "isDragging", false);
    __publicField(this, "initValue", 0);
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    if (this.orientation === "horizontal") {
      this.style.minWidth = "2px";
      this.style.maxWidth = "2px";
      this.host.style.height = "100%";
      this.host.style.width = "2px";
      this.thumb.style.width = "8px";
      this.thumb.style.height = "20px";
      this.thumb.style.top = "calc(50% - 10px)";
      this.thumb.style.left = "-3px";
      this.thumb.style.cursor = "ew-resize";
    } else {
      this.style.minHeight = "2px";
      this.style.maxHeight = "2px";
      this.host.style.width = "100%";
      this.host.style.height = "2px";
      this.thumb.style.height = "8px";
      this.thumb.style.width = "20px";
      this.thumb.style.left = "50%";
      this.thumb.style.top = "-3px";
      this.thumb.style.cursor = "ns-resize";
    }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.thumb.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("keydown", this.onKeyDown);
  }
  onMouseDown(e2) {
    this.isDragging = true;
    this.classList.add("dragging");
    this.initValue = this.orientation == "horizontal" ? e2.clientX : e2.clientY;
  }
  onMouseMove(e2) {
    if (!this.isDragging)
      return;
    if (this.orientation === "horizontal") {
      const dx = e2.clientX - this.initValue;
      this.host.style.left = `${dx}px`;
    } else {
      const dy = e2.clientY - this.initValue;
      this.host.style.top = `${dy}px`;
    }
  }
  onMouseUp(e2) {
    if (!this.isDragging)
      return;
    this.isDragging = false;
    this.classList.remove("dragging");
    if (this.orientation == "horizontal") {
      this.host.style.left = "0px";
    } else {
      this.host.style.top = "0px";
    }
    const distance = this.orientation === "horizontal" ? e2.clientX - this.initValue : e2.clientY - this.initValue;
    this.dispatchEvent(new CustomEvent("on-dragged", {
      detail: distance
    }));
  }
  onKeyDown(e2) {
    if (!this.isDragging)
      return;
    if (e2.key == "Escape") {
      this.isDragging = false;
      this.classList.remove("dragging");
      if (this.orientation == "horizontal") {
        this.host.style.left = "0px";
      } else {
        this.host.style.top = "0px";
      }
    }
  }
  render() {
    return html$1`
      <div id="host">
        <div id="thumb">
        </div>
      </div>
    `;
  }
}, __publicField(_b, "styles", [
  css$1`

    :host {
      background: transparent;
      position: relative;
    }

    #host {
      visibility: hidden;
      background: #7a7a7a;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      z-index: 9999;
    }

    #thumb {
      background: red;
      border-radius: 4px;
      visibility: hidden;
      position: absolute;
    }

    :host(:hover) #thumb {
      visibility: visible;
    }

    :host(.dragging) #thumb,:host(.dragging) #host {
      visibility: visible;
    }
    `
]), _b);
__decorate([
  n$1({ type: String })
], XSplitter.prototype, "orientation", void 0);
__decorate([
  e$1("#host")
], XSplitter.prototype, "host", void 0);
__decorate([
  e$1("#thumb")
], XSplitter.prototype, "thumb", void 0);
XSplitter = __decorate([
  t$2("x-splitter")
], XSplitter);
let GridUnit = (_c = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "key");
    __publicField(this, "orientation", "horizontal");
    __publicField(this, "init", "5:5");
    // 초기비율
    __publicField(this, "item1");
    __publicField(this, "item2");
  }
  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    await this.updateComplete;
    this.load();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("orientation")) {
      this.style.setProperty("--flex-direction", this.orientation === "horizontal" ? "row" : "column");
    }
  }
  render() {
    return html$1`
      <div id="item1">
        <slot name="item1"></slot>
      </div>
      <x-splitter orientation=${this.orientation} @on-dragged=${this.onDragged}></x-splitter>
      <div id="item2">
        <slot name="item2"></slot>
      </div>
    `;
  }
  onDragged(e2) {
    if (e2.detail) {
      const v = e2.detail;
      this.resize(v);
    }
  }
  resize(v) {
    if (this.orientation === "horizontal") {
      const item1Width = this.item1.clientWidth;
      const item2Width = this.item2.clientWidth;
      const totalWidth = item1Width + item2Width;
      const item1WidthPercent = (item1Width + v) / totalWidth * 100;
      const item2WidthPercent = (item2Width - v) / totalWidth * 100;
      this.item1.style.width = `${item1WidthPercent}%`;
      this.item2.style.width = `${item2WidthPercent}%`;
    } else {
      const item1Height = this.item1.clientHeight;
      const item2Height = this.item2.clientHeight;
      const totalHeight = item1Height + item2Height;
      const item1HeightPercent = (item1Height + v) / totalHeight * 100;
      const item2HeightPercent = (item2Height - v) / totalHeight * 100;
      this.item1.style.height = `${item1HeightPercent}%`;
      this.item2.style.height = `${item2HeightPercent}%`;
    }
    this.save();
  }
  save() {
    if (this.key) {
      let sizeRatio;
      if (this.orientation === "horizontal") {
        sizeRatio = JSON.stringify({
          width1: this.item1.style.width,
          width2: this.item2.style.width
        });
      } else {
        sizeRatio = JSON.stringify({
          height1: this.item1.style.height,
          height2: this.item2.style.height
        });
      }
      localStorage.setItem(this.key, sizeRatio);
    }
  }
  load() {
    if (this.key) {
      const sizeRatio = localStorage.getItem(this.key);
      if (sizeRatio) {
        const parsedRatio = JSON.parse(sizeRatio);
        if (this.orientation === "horizontal") {
          this.item1.style.width = parsedRatio.width1;
          this.item2.style.width = parsedRatio.width2;
        } else {
          this.item1.style.height = parsedRatio.height1;
          this.item2.style.height = parsedRatio.height2;
        }
        return;
      }
    }
    if (this.init && this.init.includes(":")) {
      const parts = this.init.split(":");
      let left = parseFloat(parts[0]);
      let right2 = parseFloat(parts[1]);
      const total = left + right2;
      if (left && right2 && total != 0) {
        left = left / total * 100;
        right2 = right2 / total * 100;
        if (this.orientation === "horizontal") {
          this.item1.style.width = `${left}%`;
          this.item2.style.width = `${right2}%`;
        } else {
          this.item1.style.height = `${left}%`;
          this.item2.style.height = `${right2}%`;
        }
      }
    }
  }
}, __publicField(_c, "styles", css$1`
      :host {
        position: relative;
        display: flex;
        flex-direction: var(--flex-direction, row);
        width: 100%;
        height: 100%;
      }

      #item1, #item2 {
        flex-grow: 1;
      }
  `), _c);
__decorate([
  n$1({ type: String })
], GridUnit.prototype, "key", void 0);
__decorate([
  n$1({ type: String })
], GridUnit.prototype, "orientation", void 0);
__decorate([
  n$1({ type: String })
], GridUnit.prototype, "init", void 0);
__decorate([
  e$1("#item1")
], GridUnit.prototype, "item1", void 0);
__decorate([
  e$1("#item2")
], GridUnit.prototype, "item2", void 0);
GridUnit = __decorate([
  t$2("grid-unit")
], GridUnit);
let PopupMenu = (_d = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "menu");
    __publicField(this, "menuItems", []);
    __publicField(this, "location", { x: 0, y: 0 });
    __publicField(this, "selectedItem", null);
    __publicField(this, "resolve");
    __publicField(this, "reject");
    this.onMouseUp = this.onMouseUp.bind(this);
    this.addEventListener("mouseup", this.onMouseUp);
  }
  onMouseUp(e2) {
    const r2 = this.menu.isCursorInElement(e2);
    if (r2)
      return;
    this.cancel();
  }
  render() {
    return html$1`
      <fast-menu id="menu" style="left: ${this.location.x}px; top: ${this.location.y}px">
        ${this.menuItems.map((item) => html$1`
          <fast-menu-item @click="${() => this.onMenuItemClick(item)}" .value="${item.name}">
            ${item.label}
          </fast-menu-item>
        `)}
      </fast-menu>
    `;
  }
  onMenuItemClick(item) {
    this.selectedItem = item;
    this.ok();
  }
  ok() {
    if (this.selectedItem && this.resolve) {
      this.resolve({
        success: true,
        value: this.selectedItem.name
      });
    } else {
      this.cancel();
    }
  }
  cancel() {
    this.close();
    if (this.reject) {
      this.reject();
    }
  }
  async showAsync() {
    await this.updateComplete;
    this.visible();
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      console.warn(_error);
      return { success: false, value: null };
    });
  }
  visible() {
    this.hidden = false;
  }
  close() {
    this.hidden = true;
  }
}, __publicField(_d, "styles", [
  css$1`
    :host {
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    
    #menu {
      position: absolute;
    }
    `
]), _d);
__decorate([
  e$1("#menu")
], PopupMenu.prototype, "menu", void 0);
__decorate([
  n$1({ type: Array })
], PopupMenu.prototype, "menuItems", void 0);
__decorate([
  n$1({ type: Object })
], PopupMenu.prototype, "location", void 0);
PopupMenu = __decorate([
  t$2("popup-menu")
], PopupMenu);
var niceErrors = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function _(annotationType, key) {
    return "Cannot apply '" + annotationType + "' to '" + key.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function _2(index, length) {
    return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function _3(other) {
    return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
  },
  20: function _4(other) {
    return "Cannot initialize map from " + other;
  },
  21: function _5(dataStructure) {
    return "Cannot convert to map from '" + dataStructure + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function _6(thing) {
    return "Cannot obtain administration from " + thing;
  },
  25: function _7(property, name) {
    return "the entry '" + property + "' does not exist in the observable map '" + name + "'";
  },
  26: "please specify a property",
  27: function _8(property, name) {
    return "no observable property '" + property.toString() + "' found on the observable object '" + name + "'";
  },
  28: function _9(thing) {
    return "Cannot obtain atom from " + thing;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function _10(name, derivation) {
    return "Cycle detected in computation " + name + ": " + derivation;
  },
  33: function _11(name) {
    return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function _12(name) {
    return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function _13(method) {
    return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
};
var errors = process.env.NODE_ENV !== "production" ? niceErrors : {};
function die(error2) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (process.env.NODE_ENV !== "production") {
    var e2 = typeof error2 === "string" ? error2 : errors[error2];
    if (typeof e2 === "function")
      e2 = e2.apply(null, args);
    throw new Error("[MobX] " + e2);
  }
  throw new Error(typeof error2 === "number" ? "[MobX] minified error nr: " + error2 + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error2);
}
var mockGlobal = {};
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return mockGlobal;
}
var assign = Object.assign;
var getDescriptor = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var objectPrototype = Object.prototype;
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
var hasProxy = typeof Proxy !== "undefined";
var plainObjectString = /* @__PURE__ */ Object.toString();
function assertProxies() {
  if (!hasProxy) {
    die(process.env.NODE_ENV !== "production" ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
  }
}
function warnAboutProxyRequirement(msg) {
  if (process.env.NODE_ENV !== "production" && globalState.verifyProxies) {
    die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
  }
}
function getNextId() {
  return ++globalState.mobxGuid;
}
function once(func) {
  var invoked = false;
  return function() {
    if (invoked) {
      return;
    }
    invoked = true;
    return func.apply(this, arguments);
  };
}
var noop = function noop2() {
};
function isFunction(fn) {
  return typeof fn === "function";
}
function isStringish(value) {
  var t2 = typeof value;
  switch (t2) {
    case "string":
    case "symbol":
    case "number":
      return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
}
function isGenerator(obj) {
  var constructor = obj == null ? void 0 : obj.constructor;
  if (!constructor) {
    return false;
  }
  if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) {
    return true;
  }
  return false;
}
function addHiddenProp(object2, propName, value) {
  defineProperty(object2, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value
  });
}
function addHiddenFinalProp(object2, propName, value) {
  defineProperty(object2, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value
  });
}
function createInstanceofPredicate(name, theClass) {
  var propName = "isMobX" + name;
  theClass.prototype[propName] = true;
  return function(x) {
    return isObject(x) && x[propName] === true;
  };
}
function isES6Map(thing) {
  return thing instanceof Map;
}
function isES6Set(thing) {
  return thing instanceof Set;
}
var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
function getPlainObjectKeys(object2) {
  var keys = Object.keys(object2);
  if (!hasGetOwnPropertySymbols) {
    return keys;
  }
  var symbols = Object.getOwnPropertySymbols(object2);
  if (!symbols.length) {
    return keys;
  }
  return [].concat(keys, symbols.filter(function(s2) {
    return objectPrototype.propertyIsEnumerable.call(object2, s2);
  }));
}
var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function(obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function stringifyKey(key) {
  if (typeof key === "string") {
    return key;
  }
  if (typeof key === "symbol") {
    return key.toString();
  }
  return new String(key).toString();
}
function toPrimitive(value) {
  return value === null ? null : typeof value === "object" ? "" + value : value;
}
function hasProp(target2, prop) {
  return objectPrototype.hasOwnProperty.call(target2, prop);
}
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(target2) {
  var res = {};
  ownKeys(target2).forEach(function(key) {
    res[key] = getDescriptor(target2, key);
  });
  return res;
};
function _defineProperties(target2, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target2, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target2) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target2[key] = source[key];
        }
      }
    }
    return target2;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n3 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n3 === "Object" && o2.constructor)
    n3 = o2.constructor.name;
  if (n3 === "Map" || n3 === "Set")
    return Array.from(o2);
  if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
    return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o2, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it)
    return (it = it.call(o2)).next.bind(it);
  if (Array.isArray(o2) || (it = _unsupportedIterableToArray(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it)
      o2 = it;
    var i = 0;
    return function() {
      if (i >= o2.length)
        return {
          done: true
        };
      return {
        done: false,
        value: o2[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var storedAnnotationsSymbol = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function createDecoratorAnnotation(annotation) {
  function decorator(target2, property) {
    if (is20223Decorator(property)) {
      return annotation.decorate_20223_(target2, property);
    } else {
      storeAnnotation(target2, property, annotation);
    }
  }
  return Object.assign(decorator, annotation);
}
function storeAnnotation(prototype, key, annotation) {
  if (!hasProp(prototype, storedAnnotationsSymbol)) {
    addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
  }
  if (process.env.NODE_ENV !== "production" && isOverride(annotation) && !hasProp(prototype[storedAnnotationsSymbol], key)) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    die("'" + fieldName + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  assertNotDecorated(prototype, annotation, key);
  if (!isOverride(annotation)) {
    prototype[storedAnnotationsSymbol][key] = annotation;
  }
}
function assertNotDecorated(prototype, annotation, key) {
  if (process.env.NODE_ENV !== "production" && !isOverride(annotation) && hasProp(prototype[storedAnnotationsSymbol], key)) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.") + "\nRe-decorating fields is not allowed.\nUse '@override' decorator for methods overridden by subclass.");
  }
}
function collectStoredAnnotations(target2) {
  if (!hasProp(target2, storedAnnotationsSymbol)) {
    addHiddenProp(target2, storedAnnotationsSymbol, _extends({}, target2[storedAnnotationsSymbol]));
  }
  return target2[storedAnnotationsSymbol];
}
function is20223Decorator(context) {
  return typeof context == "object" && typeof context["kind"] == "string";
}
function assert20223DecoratorType(context, types) {
  if (process.env.NODE_ENV !== "production" && !types.includes(context.kind)) {
    die("The decorator applied to '" + String(context.name) + "' cannot be used on a " + context.kind + " element");
  }
}
var $mobx = /* @__PURE__ */ Symbol("mobx administration");
var Atom = /* @__PURE__ */ function() {
  function Atom2(name_) {
    if (name_ === void 0) {
      name_ = process.env.NODE_ENV !== "production" ? "Atom@" + getNextId() : "Atom";
    }
    this.name_ = void 0;
    this.isPendingUnobservation_ = false;
    this.isBeingObserved_ = false;
    this.observers_ = /* @__PURE__ */ new Set();
    this.diffValue_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
    this.onBOL = void 0;
    this.onBUOL = void 0;
    this.name_ = name_;
  }
  var _proto = Atom2.prototype;
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.reportObserved = function reportObserved$1() {
    return reportObserved(this);
  };
  _proto.reportChanged = function reportChanged() {
    startBatch();
    propagateChanged(this);
    endBatch();
  };
  _proto.toString = function toString2() {
    return this.name_;
  };
  return Atom2;
}();
var isAtom = /* @__PURE__ */ createInstanceofPredicate("Atom", Atom);
function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
  if (onBecomeObservedHandler === void 0) {
    onBecomeObservedHandler = noop;
  }
  if (onBecomeUnobservedHandler === void 0) {
    onBecomeUnobservedHandler = noop;
  }
  var atom = new Atom(name);
  if (onBecomeObservedHandler !== noop) {
    onBecomeObserved(atom, onBecomeObservedHandler);
  }
  if (onBecomeUnobservedHandler !== noop) {
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
  }
  return atom;
}
function identityComparer(a2, b2) {
  return a2 === b2;
}
function structuralComparer(a2, b2) {
  return deepEqual(a2, b2);
}
function shallowComparer(a2, b2) {
  return deepEqual(a2, b2, 1);
}
function defaultComparer(a2, b2) {
  if (Object.is) {
    return Object.is(a2, b2);
  }
  return a2 === b2 ? a2 !== 0 || 1 / a2 === 1 / b2 : a2 !== a2 && b2 !== b2;
}
var comparer = {
  identity: identityComparer,
  structural: structuralComparer,
  "default": defaultComparer,
  shallow: shallowComparer
};
function deepEnhancer(v, _14, name) {
  if (isObservable(v)) {
    return v;
  }
  if (Array.isArray(v)) {
    return observable.array(v, {
      name
    });
  }
  if (isPlainObject(v)) {
    return observable.object(v, void 0, {
      name
    });
  }
  if (isES6Map(v)) {
    return observable.map(v, {
      name
    });
  }
  if (isES6Set(v)) {
    return observable.set(v, {
      name
    });
  }
  if (typeof v === "function" && !isAction(v) && !isFlow(v)) {
    if (isGenerator(v)) {
      return flow(v);
    } else {
      return autoAction(name, v);
    }
  }
  return v;
}
function shallowEnhancer(v, _14, name) {
  if (v === void 0 || v === null) {
    return v;
  }
  if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) {
    return v;
  }
  if (Array.isArray(v)) {
    return observable.array(v, {
      name,
      deep: false
    });
  }
  if (isPlainObject(v)) {
    return observable.object(v, void 0, {
      name,
      deep: false
    });
  }
  if (isES6Map(v)) {
    return observable.map(v, {
      name,
      deep: false
    });
  }
  if (isES6Set(v)) {
    return observable.set(v, {
      name,
      deep: false
    });
  }
  if (process.env.NODE_ENV !== "production") {
    die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
}
function referenceEnhancer(newValue) {
  return newValue;
}
function refStructEnhancer(v, oldValue) {
  if (process.env.NODE_ENV !== "production" && isObservable(v)) {
    die("observable.struct should not be used with observable values");
  }
  if (deepEqual(v, oldValue)) {
    return oldValue;
  }
  return v;
}
var OVERRIDE = "override";
function isOverride(annotation) {
  return annotation.annotationType_ === OVERRIDE;
}
function createActionAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$1,
    extend_: extend_$1,
    decorate_20223_: decorate_20223_$1
  };
}
function make_$1(adm, key, descriptor, source) {
  var _this$options_;
  if ((_this$options_ = this.options_) != null && _this$options_.bound) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
  }
  if (isAction(descriptor.value)) {
    return 1;
  }
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
  defineProperty(source, key, actionDescriptor);
  return 2;
}
function extend_$1(adm, key, descriptor, proxyTrap) {
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
  return adm.defineProperty_(key, actionDescriptor, proxyTrap);
}
function decorate_20223_$1(mthd, context) {
  if (process.env.NODE_ENV !== "production") {
    assert20223DecoratorType(context, ["method", "field"]);
  }
  var kind = context.kind, name = context.name, addInitializer = context.addInitializer;
  var ann = this;
  var _createAction = function _createAction2(m2) {
    var _ann$options_$name, _ann$options_, _ann$options_$autoAct, _ann$options_2;
    return createAction((_ann$options_$name = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.name) != null ? _ann$options_$name : name.toString(), m2, (_ann$options_$autoAct = (_ann$options_2 = ann.options_) == null ? void 0 : _ann$options_2.autoAction) != null ? _ann$options_$autoAct : false);
  };
  if (kind == "field") {
    addInitializer(function() {
      storeAnnotation(this, name, ann);
    });
    return;
  }
  if (kind == "method") {
    var _this$options_2;
    if (!isAction(mthd)) {
      mthd = _createAction(mthd);
    }
    if ((_this$options_2 = this.options_) != null && _this$options_2.bound) {
      addInitializer(function() {
        var self2 = this;
        var bound = self2[name].bind(self2);
        bound.isMobxAction = true;
        self2[name] = bound;
      });
    }
    return mthd;
  }
  die("Cannot apply '" + ann.annotationType_ + "' to '" + String(name) + "' (kind: " + kind + "):" + ("\n'" + ann.annotationType_ + "' can only be used on properties with a function value."));
}
function assertActionDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (process.env.NODE_ENV !== "production" && !isFunction(value)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
  }
}
function createActionDescriptor(adm, annotation, key, descriptor, safeDescriptors) {
  var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
  if (safeDescriptors === void 0) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertActionDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return {
    value: createAction(
      (_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(),
      value,
      (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false,
      // https://github.com/mobxjs/mobx/discussions/3140
      (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: false,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: safeDescriptors ? false : true
  };
}
function createFlowAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$2,
    extend_: extend_$2,
    decorate_20223_: decorate_20223_$2
  };
}
function make_$2(adm, key, descriptor, source) {
  var _this$options_;
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
  }
  if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
    if (this.extend_(adm, key, descriptor, false) === null) {
      return 0;
    }
  }
  if (isFlow(descriptor.value)) {
    return 1;
  }
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
  defineProperty(source, key, flowDescriptor);
  return 2;
}
function extend_$2(adm, key, descriptor, proxyTrap) {
  var _this$options_2;
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
  return adm.defineProperty_(key, flowDescriptor, proxyTrap);
}
function decorate_20223_$2(mthd, context) {
  var _this$options_3;
  if (process.env.NODE_ENV !== "production") {
    assert20223DecoratorType(context, ["method"]);
  }
  var name = context.name, addInitializer = context.addInitializer;
  if (!isFlow(mthd)) {
    mthd = flow(mthd);
  }
  if ((_this$options_3 = this.options_) != null && _this$options_3.bound) {
    addInitializer(function() {
      var self2 = this;
      var bound = self2[name].bind(self2);
      bound.isMobXFlow = true;
      self2[name] = bound;
    });
  }
  return mthd;
}
function assertFlowDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (process.env.NODE_ENV !== "production" && !isFunction(value)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
  }
}
function createFlowDescriptor(adm, annotation, key, descriptor, bound, safeDescriptors) {
  if (safeDescriptors === void 0) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertFlowDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if (!isFlow(value)) {
    value = flow(value);
  }
  if (bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    value.isMobXFlow = true;
  }
  return {
    value,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: false,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: safeDescriptors ? false : true
  };
}
function createComputedAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$3,
    extend_: extend_$3,
    decorate_20223_: decorate_20223_$3
  };
}
function make_$3(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
}
function extend_$3(adm, key, descriptor, proxyTrap) {
  assertComputedDescriptor(adm, this, key, descriptor);
  return adm.defineComputedProperty_(key, _extends({}, this.options_, {
    get: descriptor.get,
    set: descriptor.set
  }), proxyTrap);
}
function decorate_20223_$3(get3, context) {
  if (process.env.NODE_ENV !== "production") {
    assert20223DecoratorType(context, ["getter"]);
  }
  var ann = this;
  var key = context.name, addInitializer = context.addInitializer;
  addInitializer(function() {
    var adm = asObservableObject(this)[$mobx];
    var options = _extends({}, ann.options_, {
      get: get3,
      context: this
    });
    options.name || (options.name = process.env.NODE_ENV !== "production" ? adm.name_ + "." + key.toString() : "ObservableObject." + key.toString());
    adm.values_.set(key, new ComputedValue(options));
  });
  return function() {
    return this[$mobx].getObservablePropValue_(key);
  };
}
function assertComputedDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var get3 = _ref2.get;
  if (process.env.NODE_ENV !== "production" && !get3) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
  }
}
function createObservableAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$4,
    extend_: extend_$4,
    decorate_20223_: decorate_20223_$4
  };
}
function make_$4(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
}
function extend_$4(adm, key, descriptor, proxyTrap) {
  var _this$options_$enhanc, _this$options_;
  assertObservableDescriptor(adm, this, key, descriptor);
  return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
}
function decorate_20223_$4(desc, context) {
  if (process.env.NODE_ENV !== "production") {
    if (context.kind === "field") {
      throw die("Please use `@observable accessor " + String(context.name) + "` instead of `@observable " + String(context.name) + "`");
    }
    assert20223DecoratorType(context, ["accessor"]);
  }
  var ann = this;
  var kind = context.kind, name = context.name;
  var initializedObjects = /* @__PURE__ */ new WeakSet();
  function initializeObservable(target2, value) {
    var _ann$options_$enhance, _ann$options_;
    var adm = asObservableObject(target2)[$mobx];
    var observable2 = new ObservableValue(value, (_ann$options_$enhance = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.enhancer) != null ? _ann$options_$enhance : deepEnhancer, process.env.NODE_ENV !== "production" ? adm.name_ + "." + name.toString() : "ObservableObject." + name.toString(), false);
    adm.values_.set(name, observable2);
    initializedObjects.add(target2);
  }
  if (kind == "accessor") {
    return {
      get: function get3() {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, desc.get.call(this));
        }
        return this[$mobx].getObservablePropValue_(name);
      },
      set: function set4(value) {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, value);
        }
        return this[$mobx].setObservablePropValue_(name, value);
      },
      init: function init(value) {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, value);
        }
        return value;
      }
    };
  }
  return;
}
function assertObservableDescriptor(adm, _ref, key, descriptor) {
  var annotationType_ = _ref.annotationType_;
  if (process.env.NODE_ENV !== "production" && !("value" in descriptor)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
  }
}
var AUTO = "true";
var autoAnnotation = /* @__PURE__ */ createAutoAnnotation();
function createAutoAnnotation(options) {
  return {
    annotationType_: AUTO,
    options_: options,
    make_: make_$5,
    extend_: extend_$5,
    decorate_20223_: decorate_20223_$5
  };
}
function make_$5(adm, key, descriptor, source) {
  var _this$options_3, _this$options_4;
  if (descriptor.get) {
    return computed.make_(adm, key, descriptor, source);
  }
  if (descriptor.set) {
    var set4 = createAction(key.toString(), descriptor.set);
    if (source === adm.target_) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: set4
      }) === null ? 0 : 2;
    }
    defineProperty(source, key, {
      configurable: true,
      set: set4
    });
    return 2;
  }
  if (source !== adm.target_ && typeof descriptor.value === "function") {
    var _this$options_2;
    if (isGenerator(descriptor.value)) {
      var _this$options_;
      var flowAnnotation2 = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
      return flowAnnotation2.make_(adm, key, descriptor, source);
    }
    var actionAnnotation2 = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
    return actionAnnotation2.make_(adm, key, descriptor, source);
  }
  var observableAnnotation2 = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable;
  if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
    var _adm$proxy_;
    descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return observableAnnotation2.make_(adm, key, descriptor, source);
}
function extend_$5(adm, key, descriptor, proxyTrap) {
  var _this$options_5, _this$options_6;
  if (descriptor.get) {
    return computed.extend_(adm, key, descriptor, proxyTrap);
  }
  if (descriptor.set) {
    return adm.defineProperty_(key, {
      configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
      set: createAction(key.toString(), descriptor.set)
    }, proxyTrap);
  }
  if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
    var _adm$proxy_2;
    descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
  }
  var observableAnnotation2 = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
  return observableAnnotation2.extend_(adm, key, descriptor, proxyTrap);
}
function decorate_20223_$5(desc, context) {
  die("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var OBSERVABLE = "observable";
var OBSERVABLE_REF = "observable.ref";
var OBSERVABLE_SHALLOW = "observable.shallow";
var OBSERVABLE_STRUCT = "observable.struct";
var defaultCreateObservableOptions = {
  deep: true,
  name: void 0,
  defaultDecorator: void 0,
  proxy: true
};
Object.freeze(defaultCreateObservableOptions);
function asCreateObservableOptions(thing) {
  return thing || defaultCreateObservableOptions;
}
var observableAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE);
var observableRefAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_REF, {
  enhancer: referenceEnhancer
});
var observableShallowAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_SHALLOW, {
  enhancer: shallowEnhancer
});
var observableStructAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_STRUCT, {
  enhancer: refStructEnhancer
});
var observableDecoratorAnnotation = /* @__PURE__ */ createDecoratorAnnotation(observableAnnotation);
function getEnhancerFromOptions(options) {
  return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
}
function getAnnotationFromOptions(options) {
  var _options$defaultDecor;
  return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : void 0;
}
function getEnhancerFromAnnotation(annotation) {
  var _annotation$options_$, _annotation$options_;
  return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
}
function createObservable(v, arg2, arg3) {
  if (is20223Decorator(arg2)) {
    return observableAnnotation.decorate_20223_(v, arg2);
  }
  if (isStringish(arg2)) {
    storeAnnotation(v, arg2, observableAnnotation);
    return;
  }
  if (isObservable(v)) {
    return v;
  }
  if (isPlainObject(v)) {
    return observable.object(v, arg2, arg3);
  }
  if (Array.isArray(v)) {
    return observable.array(v, arg2);
  }
  if (isES6Map(v)) {
    return observable.map(v, arg2);
  }
  if (isES6Set(v)) {
    return observable.set(v, arg2);
  }
  if (typeof v === "object" && v !== null) {
    return v;
  }
  return observable.box(v, arg2);
}
assign(createObservable, observableDecoratorAnnotation);
var observableFactories = {
  box: function box(value, options) {
    var o2 = asCreateObservableOptions(options);
    return new ObservableValue(value, getEnhancerFromOptions(o2), o2.name, true, o2.equals);
  },
  array: function array(initialValues, options) {
    var o2 = asCreateObservableOptions(options);
    return (globalState.useProxies === false || o2.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o2), o2.name);
  },
  map: function map(initialValues, options) {
    var o2 = asCreateObservableOptions(options);
    return new ObservableMap(initialValues, getEnhancerFromOptions(o2), o2.name);
  },
  set: function set(initialValues, options) {
    var o2 = asCreateObservableOptions(options);
    return new ObservableSet(initialValues, getEnhancerFromOptions(o2), o2.name);
  },
  object: function object(props, decorators, options) {
    return initObservable(function() {
      return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
    });
  },
  ref: /* @__PURE__ */ createDecoratorAnnotation(observableRefAnnotation),
  shallow: /* @__PURE__ */ createDecoratorAnnotation(observableShallowAnnotation),
  deep: observableDecoratorAnnotation,
  struct: /* @__PURE__ */ createDecoratorAnnotation(observableStructAnnotation)
};
var observable = /* @__PURE__ */ assign(createObservable, observableFactories);
var COMPUTED = "computed";
var COMPUTED_STRUCT = "computed.struct";
var computedAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED);
var computedStructAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED_STRUCT, {
  equals: comparer.structural
});
var computed = function computed2(arg1, arg2) {
  if (is20223Decorator(arg2)) {
    return computedAnnotation.decorate_20223_(arg1, arg2);
  }
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, computedAnnotation);
  }
  if (isPlainObject(arg1)) {
    return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
  }
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(arg1)) {
      die("First argument to `computed` should be an expression.");
    }
    if (isFunction(arg2)) {
      die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
    }
  }
  var opts = isPlainObject(arg2) ? arg2 : {};
  opts.get = arg1;
  opts.name || (opts.name = arg1.name || "");
  return new ComputedValue(opts);
};
Object.assign(computed, computedAnnotation);
computed.struct = /* @__PURE__ */ createDecoratorAnnotation(computedStructAnnotation);
var _getDescriptor$config, _getDescriptor;
var currentActionId = 0;
var nextActionId = 1;
var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /* @__PURE__ */ getDescriptor(function() {
}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
var tmpNameDescriptor = {
  value: "action",
  configurable: true,
  writable: false,
  enumerable: false
};
function createAction(actionName, fn, autoAction2, ref2) {
  if (autoAction2 === void 0) {
    autoAction2 = false;
  }
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(fn)) {
      die("`action` can only be invoked on functions");
    }
    if (typeof actionName !== "string" || !actionName) {
      die("actions should have valid names, got: '" + actionName + "'");
    }
  }
  function res() {
    return executeAction(actionName, autoAction2, fn, ref2 || this, arguments);
  }
  res.isMobxAction = true;
  res.toString = function() {
    return fn.toString();
  };
  if (isFunctionNameConfigurable) {
    tmpNameDescriptor.value = actionName;
    defineProperty(res, "name", tmpNameDescriptor);
  }
  return res;
}
function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
  var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);
  try {
    return fn.apply(scope, args);
  } catch (err) {
    runInfo.error_ = err;
    throw err;
  } finally {
    _endAction(runInfo);
  }
}
function _startAction(actionName, canRunAsDerivation, scope, args) {
  var notifySpy_ = process.env.NODE_ENV !== "production" && isSpyEnabled() && !!actionName;
  var startTime_ = 0;
  if (process.env.NODE_ENV !== "production" && notifySpy_) {
    startTime_ = Date.now();
    var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
    spyReportStart({
      type: ACTION,
      name: actionName,
      object: scope,
      arguments: flattenedArgs
    });
  }
  var prevDerivation_ = globalState.trackingDerivation;
  var runAsAction = !canRunAsDerivation || !prevDerivation_;
  startBatch();
  var prevAllowStateChanges_ = globalState.allowStateChanges;
  if (runAsAction) {
    untrackedStart();
    prevAllowStateChanges_ = allowStateChangesStart(true);
  }
  var prevAllowStateReads_ = allowStateReadsStart(true);
  var runInfo = {
    runAsAction_: runAsAction,
    prevDerivation_,
    prevAllowStateChanges_,
    prevAllowStateReads_,
    notifySpy_,
    startTime_,
    actionId_: nextActionId++,
    parentActionId_: currentActionId
  };
  currentActionId = runInfo.actionId_;
  return runInfo;
}
function _endAction(runInfo) {
  if (currentActionId !== runInfo.actionId_) {
    die(30);
  }
  currentActionId = runInfo.parentActionId_;
  if (runInfo.error_ !== void 0) {
    globalState.suppressReactionErrors = true;
  }
  allowStateChangesEnd(runInfo.prevAllowStateChanges_);
  allowStateReadsEnd(runInfo.prevAllowStateReads_);
  endBatch();
  if (runInfo.runAsAction_) {
    untrackedEnd(runInfo.prevDerivation_);
  }
  if (process.env.NODE_ENV !== "production" && runInfo.notifySpy_) {
    spyReportEnd({
      time: Date.now() - runInfo.startTime_
    });
  }
  globalState.suppressReactionErrors = false;
}
function allowStateChanges(allowStateChanges2, func) {
  var prev = allowStateChangesStart(allowStateChanges2);
  try {
    return func();
  } finally {
    allowStateChangesEnd(prev);
  }
}
function allowStateChangesStart(allowStateChanges2) {
  var prev = globalState.allowStateChanges;
  globalState.allowStateChanges = allowStateChanges2;
  return prev;
}
function allowStateChangesEnd(prev) {
  globalState.allowStateChanges = prev;
}
var _Symbol$toPrimitive;
var CREATE = "create";
_Symbol$toPrimitive = Symbol.toPrimitive;
var ObservableValue = /* @__PURE__ */ function(_Atom) {
  _inheritsLoose(ObservableValue2, _Atom);
  function ObservableValue2(value, enhancer, name_, notifySpy, equals) {
    var _this;
    if (name_ === void 0) {
      name_ = process.env.NODE_ENV !== "production" ? "ObservableValue@" + getNextId() : "ObservableValue";
    }
    if (notifySpy === void 0) {
      notifySpy = true;
    }
    if (equals === void 0) {
      equals = comparer["default"];
    }
    _this = _Atom.call(this, name_) || this;
    _this.enhancer = void 0;
    _this.name_ = void 0;
    _this.equals = void 0;
    _this.hasUnreportedChange_ = false;
    _this.interceptors_ = void 0;
    _this.changeListeners_ = void 0;
    _this.value_ = void 0;
    _this.dehancer = void 0;
    _this.enhancer = enhancer;
    _this.name_ = name_;
    _this.equals = equals;
    _this.value_ = enhancer(value, void 0, name_);
    if (process.env.NODE_ENV !== "production" && notifySpy && isSpyEnabled()) {
      spyReport({
        type: CREATE,
        object: _assertThisInitialized(_this),
        observableKind: "value",
        debugObjectName: _this.name_,
        newValue: "" + _this.value_
      });
    }
    return _this;
  }
  var _proto = ObservableValue2.prototype;
  _proto.dehanceValue = function dehanceValue(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.set = function set4(newValue) {
    var oldValue = this.value_;
    newValue = this.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportStart({
          type: UPDATE,
          object: this,
          observableKind: "value",
          debugObjectName: this.name_,
          newValue,
          oldValue
        });
      }
      this.setNewValue_(newValue);
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportEnd();
      }
    }
  };
  _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
    checkIfStateModificationsAreAllowed(this);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this,
        type: UPDATE,
        newValue
      });
      if (!change) {
        return globalState.UNCHANGED;
      }
      newValue = change.newValue;
    }
    newValue = this.enhancer(newValue, this.value_, this.name_);
    return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
  };
  _proto.setNewValue_ = function setNewValue_(newValue) {
    var oldValue = this.value_;
    this.value_ = newValue;
    this.reportChanged();
    if (hasListeners(this)) {
      notifyListeners(this, {
        type: UPDATE,
        object: this,
        newValue,
        oldValue
      });
    }
  };
  _proto.get = function get3() {
    this.reportObserved();
    return this.dehanceValue(this.value_);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately) {
      listener({
        observableKind: "value",
        debugObjectName: this.name_,
        object: this,
        type: UPDATE,
        newValue: this.value_,
        oldValue: void 0
      });
    }
    return registerListener(this, listener);
  };
  _proto.raw = function raw() {
    return this.value_;
  };
  _proto.toJSON = function toJSON2() {
    return this.get();
  };
  _proto.toString = function toString2() {
    return this.name_ + "[" + this.value_ + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[_Symbol$toPrimitive] = function() {
    return this.valueOf();
  };
  return ObservableValue2;
}(Atom);
var _Symbol$toPrimitive$1;
_Symbol$toPrimitive$1 = Symbol.toPrimitive;
var ComputedValue = /* @__PURE__ */ function() {
  function ComputedValue2(options) {
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.observing_ = [];
    this.newObserving_ = null;
    this.isBeingObserved_ = false;
    this.isPendingUnobservation_ = false;
    this.observers_ = /* @__PURE__ */ new Set();
    this.diffValue_ = 0;
    this.runId_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    this.unboundDepsCount_ = 0;
    this.value_ = new CaughtException(null);
    this.name_ = void 0;
    this.triggeredBy_ = void 0;
    this.isComputing_ = false;
    this.isRunningSetter_ = false;
    this.derivation = void 0;
    this.setter_ = void 0;
    this.isTracing_ = TraceMode.NONE;
    this.scope_ = void 0;
    this.equals_ = void 0;
    this.requiresReaction_ = void 0;
    this.keepAlive_ = void 0;
    this.onBOL = void 0;
    this.onBUOL = void 0;
    if (!options.get) {
      die(31);
    }
    this.derivation = options.get;
    this.name_ = options.name || (process.env.NODE_ENV !== "production" ? "ComputedValue@" + getNextId() : "ComputedValue");
    if (options.set) {
      this.setter_ = createAction(process.env.NODE_ENV !== "production" ? this.name_ + "-setter" : "ComputedValue-setter", options.set);
    }
    this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
    this.scope_ = options.context;
    this.requiresReaction_ = options.requiresReaction;
    this.keepAlive_ = !!options.keepAlive;
  }
  var _proto = ComputedValue2.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    propagateMaybeChanged(this);
  };
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.get = function get3() {
    if (this.isComputing_) {
      die(32, this.name_, this.derivation);
    }
    if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_) {
      if (shouldCompute(this)) {
        this.warnAboutUntrackedRead_();
        startBatch();
        this.value_ = this.computeValue_(false);
        endBatch();
      }
    } else {
      reportObserved(this);
      if (shouldCompute(this)) {
        var prevTrackingContext = globalState.trackingContext;
        if (this.keepAlive_ && !prevTrackingContext) {
          globalState.trackingContext = this;
        }
        if (this.trackAndCompute()) {
          propagateChangeConfirmed(this);
        }
        globalState.trackingContext = prevTrackingContext;
      }
    }
    var result = this.value_;
    if (isCaughtException(result)) {
      throw result.cause;
    }
    return result;
  };
  _proto.set = function set4(value) {
    if (this.setter_) {
      if (this.isRunningSetter_) {
        die(33, this.name_);
      }
      this.isRunningSetter_ = true;
      try {
        this.setter_.call(this.scope_, value);
      } finally {
        this.isRunningSetter_ = false;
      }
    } else {
      die(34, this.name_);
    }
  };
  _proto.trackAndCompute = function trackAndCompute() {
    var oldValue = this.value_;
    var wasSuspended = (
      /* see #1208 */
      this.dependenciesState_ === IDerivationState_.NOT_TRACKING_
    );
    var newValue = this.computeValue_(true);
    var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
    if (changed) {
      this.value_ = newValue;
      if (process.env.NODE_ENV !== "production" && isSpyEnabled()) {
        spyReport({
          observableKind: "computed",
          debugObjectName: this.name_,
          object: this.scope_,
          type: "update",
          oldValue,
          newValue
        });
      }
    }
    return changed;
  };
  _proto.computeValue_ = function computeValue_(track) {
    this.isComputing_ = true;
    var prev = allowStateChangesStart(false);
    var res;
    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.scope_);
    } else {
      if (globalState.disableErrorBoundaries === true) {
        res = this.derivation.call(this.scope_);
      } else {
        try {
          res = this.derivation.call(this.scope_);
        } catch (e2) {
          res = new CaughtException(e2);
        }
      }
    }
    allowStateChangesEnd(prev);
    this.isComputing_ = false;
    return res;
  };
  _proto.suspend_ = function suspend_() {
    if (!this.keepAlive_) {
      clearObserving(this);
      this.value_ = void 0;
      if (process.env.NODE_ENV !== "production" && this.isTracing_ !== TraceMode.NONE) {
        console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access.");
      }
    }
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    var _this = this;
    var firstTime = true;
    var prevValue = void 0;
    return autorun(function() {
      var newValue = _this.get();
      if (!firstTime || fireImmediately) {
        var prevU = untrackedStart();
        listener({
          observableKind: "computed",
          debugObjectName: _this.name_,
          type: UPDATE,
          object: _this,
          newValue,
          oldValue: prevValue
        });
        untrackedEnd(prevU);
      }
      firstTime = false;
      prevValue = newValue;
    });
  };
  _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
    if (!(process.env.NODE_ENV !== "production")) {
      return;
    }
    if (this.isTracing_ !== TraceMode.NONE) {
      console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
    if (typeof this.requiresReaction_ === "boolean" ? this.requiresReaction_ : globalState.computedRequiresReaction) {
      console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
  };
  _proto.toString = function toString2() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[_Symbol$toPrimitive$1] = function() {
    return this.valueOf();
  };
  return ComputedValue2;
}();
var isComputedValue = /* @__PURE__ */ createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState_;
(function(IDerivationState_2) {
  IDerivationState_2[IDerivationState_2["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
  IDerivationState_2[IDerivationState_2["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
  IDerivationState_2[IDerivationState_2["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
  IDerivationState_2[IDerivationState_2["STALE_"] = 2] = "STALE_";
})(IDerivationState_ || (IDerivationState_ = {}));
var TraceMode;
(function(TraceMode2) {
  TraceMode2[TraceMode2["NONE"] = 0] = "NONE";
  TraceMode2[TraceMode2["LOG"] = 1] = "LOG";
  TraceMode2[TraceMode2["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));
var CaughtException = function CaughtException2(cause) {
  this.cause = void 0;
  this.cause = cause;
};
function isCaughtException(e2) {
  return e2 instanceof CaughtException;
}
function shouldCompute(derivation) {
  switch (derivation.dependenciesState_) {
    case IDerivationState_.UP_TO_DATE_:
      return false;
    case IDerivationState_.NOT_TRACKING_:
    case IDerivationState_.STALE_:
      return true;
    case IDerivationState_.POSSIBLY_STALE_: {
      var prevAllowStateReads = allowStateReadsStart(true);
      var prevUntracked = untrackedStart();
      var obs = derivation.observing_, l2 = obs.length;
      for (var i = 0; i < l2; i++) {
        var obj = obs[i];
        if (isComputedValue(obj)) {
          if (globalState.disableErrorBoundaries) {
            obj.get();
          } else {
            try {
              obj.get();
            } catch (e2) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
          if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
            untrackedEnd(prevUntracked);
            allowStateReadsEnd(prevAllowStateReads);
            return true;
          }
        }
      }
      changeDependenciesStateTo0(derivation);
      untrackedEnd(prevUntracked);
      allowStateReadsEnd(prevAllowStateReads);
      return false;
    }
  }
}
function checkIfStateModificationsAreAllowed(atom) {
  if (!(process.env.NODE_ENV !== "production")) {
    return;
  }
  var hasObservers = atom.observers_.size > 0;
  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) {
    console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
  }
}
function checkIfStateReadsAreAllowed(observable2) {
  if (process.env.NODE_ENV !== "production" && !globalState.allowStateReads && globalState.observableRequiresReaction) {
    console.warn("[mobx] Observable '" + observable2.name_ + "' being read outside a reactive context.");
  }
}
function trackDerivedFunction(derivation, f2, context) {
  var prevAllowStateReads = allowStateReadsStart(true);
  changeDependenciesStateTo0(derivation);
  derivation.newObserving_ = new Array(derivation.observing_.length + 100);
  derivation.unboundDepsCount_ = 0;
  derivation.runId_ = ++globalState.runId;
  var prevTracking = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;
  globalState.inBatch++;
  var result;
  if (globalState.disableErrorBoundaries === true) {
    result = f2.call(context);
  } else {
    try {
      result = f2.call(context);
    } catch (e2) {
      result = new CaughtException(e2);
    }
  }
  globalState.inBatch--;
  globalState.trackingDerivation = prevTracking;
  bindDependencies(derivation);
  warnAboutDerivationWithoutDependencies(derivation);
  allowStateReadsEnd(prevAllowStateReads);
  return result;
}
function warnAboutDerivationWithoutDependencies(derivation) {
  if (!(process.env.NODE_ENV !== "production")) {
    return;
  }
  if (derivation.observing_.length !== 0) {
    return;
  }
  if (typeof derivation.requiresObservable_ === "boolean" ? derivation.requiresObservable_ : globalState.reactionRequiresObservable) {
    console.warn("[mobx] Derivation '" + derivation.name_ + "' is created/updated without reading any observable value.");
  }
}
function bindDependencies(derivation) {
  var prevObserving = derivation.observing_;
  var observing = derivation.observing_ = derivation.newObserving_;
  var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
  var i0 = 0, l2 = derivation.unboundDepsCount_;
  for (var i = 0; i < l2; i++) {
    var dep = observing[i];
    if (dep.diffValue_ === 0) {
      dep.diffValue_ = 1;
      if (i0 !== i) {
        observing[i0] = dep;
      }
      i0++;
    }
    if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState_;
    }
  }
  observing.length = i0;
  derivation.newObserving_ = null;
  l2 = prevObserving.length;
  while (l2--) {
    var _dep = prevObserving[l2];
    if (_dep.diffValue_ === 0) {
      removeObserver(_dep, derivation);
    }
    _dep.diffValue_ = 0;
  }
  while (i0--) {
    var _dep2 = observing[i0];
    if (_dep2.diffValue_ === 1) {
      _dep2.diffValue_ = 0;
      addObserver(_dep2, derivation);
    }
  }
  if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
    derivation.dependenciesState_ = lowestNewObservingDerivationState;
    derivation.onBecomeStale_();
  }
}
function clearObserving(derivation) {
  var obs = derivation.observing_;
  derivation.observing_ = [];
  var i = obs.length;
  while (i--) {
    removeObserver(obs[i], derivation);
  }
  derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
}
function untracked(action2) {
  var prev = untrackedStart();
  try {
    return action2();
  } finally {
    untrackedEnd(prev);
  }
}
function untrackedStart() {
  var prev = globalState.trackingDerivation;
  globalState.trackingDerivation = null;
  return prev;
}
function untrackedEnd(prev) {
  globalState.trackingDerivation = prev;
}
function allowStateReadsStart(allowStateReads) {
  var prev = globalState.allowStateReads;
  globalState.allowStateReads = allowStateReads;
  return prev;
}
function allowStateReadsEnd(prev) {
  globalState.allowStateReads = prev;
}
function changeDependenciesStateTo0(derivation) {
  if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
    return;
  }
  derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
  var obs = derivation.observing_;
  var i = obs.length;
  while (i--) {
    obs[i].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
  }
}
var MobXGlobals = function MobXGlobals2() {
  this.version = 6;
  this.UNCHANGED = {};
  this.trackingDerivation = null;
  this.trackingContext = null;
  this.runId = 0;
  this.mobxGuid = 0;
  this.inBatch = 0;
  this.pendingUnobservations = [];
  this.pendingReactions = [];
  this.isRunningReactions = false;
  this.allowStateChanges = false;
  this.allowStateReads = true;
  this.enforceActions = true;
  this.spyListeners = [];
  this.globalReactionErrorHandlers = [];
  this.computedRequiresReaction = false;
  this.reactionRequiresObservable = false;
  this.observableRequiresReaction = false;
  this.disableErrorBoundaries = false;
  this.suppressReactionErrors = false;
  this.useProxies = true;
  this.verifyProxies = false;
  this.safeDescriptors = true;
};
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState = /* @__PURE__ */ function() {
  var global2 = /* @__PURE__ */ getGlobal();
  if (global2.__mobxInstanceCount > 0 && !global2.__mobxGlobals) {
    canMergeGlobalState = false;
  }
  if (global2.__mobxGlobals && global2.__mobxGlobals.version !== new MobXGlobals().version) {
    canMergeGlobalState = false;
  }
  if (!canMergeGlobalState) {
    setTimeout(function() {
      if (!isolateCalled) {
        die(35);
      }
    }, 1);
    return new MobXGlobals();
  } else if (global2.__mobxGlobals) {
    global2.__mobxInstanceCount += 1;
    if (!global2.__mobxGlobals.UNCHANGED) {
      global2.__mobxGlobals.UNCHANGED = {};
    }
    return global2.__mobxGlobals;
  } else {
    global2.__mobxInstanceCount = 1;
    return global2.__mobxGlobals = /* @__PURE__ */ new MobXGlobals();
  }
}();
function isolateGlobalState() {
  if (globalState.pendingReactions.length || globalState.inBatch || globalState.isRunningReactions) {
    die(36);
  }
  isolateCalled = true;
  if (canMergeGlobalState) {
    var global2 = getGlobal();
    if (--global2.__mobxInstanceCount === 0) {
      global2.__mobxGlobals = void 0;
    }
    globalState = new MobXGlobals();
  }
}
function getGlobalState() {
  return globalState;
}
function addObserver(observable2, node) {
  observable2.observers_.add(node);
  if (observable2.lowestObserverState_ > node.dependenciesState_) {
    observable2.lowestObserverState_ = node.dependenciesState_;
  }
}
function removeObserver(observable2, node) {
  observable2.observers_["delete"](node);
  if (observable2.observers_.size === 0) {
    queueForUnobservation(observable2);
  }
}
function queueForUnobservation(observable2) {
  if (observable2.isPendingUnobservation_ === false) {
    observable2.isPendingUnobservation_ = true;
    globalState.pendingUnobservations.push(observable2);
  }
}
function startBatch() {
  globalState.inBatch++;
}
function endBatch() {
  if (--globalState.inBatch === 0) {
    runReactions();
    var list = globalState.pendingUnobservations;
    for (var i = 0; i < list.length; i++) {
      var observable2 = list[i];
      observable2.isPendingUnobservation_ = false;
      if (observable2.observers_.size === 0) {
        if (observable2.isBeingObserved_) {
          observable2.isBeingObserved_ = false;
          observable2.onBUO();
        }
        if (observable2 instanceof ComputedValue) {
          observable2.suspend_();
        }
      }
    }
    globalState.pendingUnobservations = [];
  }
}
function reportObserved(observable2) {
  checkIfStateReadsAreAllowed(observable2);
  var derivation = globalState.trackingDerivation;
  if (derivation !== null) {
    if (derivation.runId_ !== observable2.lastAccessedBy_) {
      observable2.lastAccessedBy_ = derivation.runId_;
      derivation.newObserving_[derivation.unboundDepsCount_++] = observable2;
      if (!observable2.isBeingObserved_ && globalState.trackingContext) {
        observable2.isBeingObserved_ = true;
        observable2.onBO();
      }
    }
    return observable2.isBeingObserved_;
  } else if (observable2.observers_.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable2);
  }
  return false;
}
function propagateChanged(observable2) {
  if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable2.lowestObserverState_ = IDerivationState_.STALE_;
  observable2.observers_.forEach(function(d2) {
    if (d2.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      if (process.env.NODE_ENV !== "production" && d2.isTracing_ !== TraceMode.NONE) {
        logTraceInfo(d2, observable2);
      }
      d2.onBecomeStale_();
    }
    d2.dependenciesState_ = IDerivationState_.STALE_;
  });
}
function propagateChangeConfirmed(observable2) {
  if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable2.lowestObserverState_ = IDerivationState_.STALE_;
  observable2.observers_.forEach(function(d2) {
    if (d2.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
      d2.dependenciesState_ = IDerivationState_.STALE_;
      if (process.env.NODE_ENV !== "production" && d2.isTracing_ !== TraceMode.NONE) {
        logTraceInfo(d2, observable2);
      }
    } else if (d2.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      observable2.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  });
}
function propagateMaybeChanged(observable2) {
  if (observable2.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
    return;
  }
  observable2.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
  observable2.observers_.forEach(function(d2) {
    if (d2.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      d2.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
      d2.onBecomeStale_();
    }
  });
}
function logTraceInfo(derivation, observable2) {
  console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable2.name_ + "'");
  if (derivation.isTracing_ === TraceMode.BREAK) {
    var lines = [];
    printDepTree(getDependencyTree(derivation), lines, 1);
    new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable2.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
  }
}
function printDepTree(tree, lines, depth) {
  if (lines.length >= 1e3) {
    lines.push("(and many more)");
    return;
  }
  lines.push("" + "	".repeat(depth - 1) + tree.name);
  if (tree.dependencies) {
    tree.dependencies.forEach(function(child) {
      return printDepTree(child, lines, depth + 1);
    });
  }
}
var Reaction = /* @__PURE__ */ function() {
  function Reaction2(name_, onInvalidate_, errorHandler_, requiresObservable_) {
    if (name_ === void 0) {
      name_ = process.env.NODE_ENV !== "production" ? "Reaction@" + getNextId() : "Reaction";
    }
    this.name_ = void 0;
    this.onInvalidate_ = void 0;
    this.errorHandler_ = void 0;
    this.requiresObservable_ = void 0;
    this.observing_ = [];
    this.newObserving_ = [];
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.diffValue_ = 0;
    this.runId_ = 0;
    this.unboundDepsCount_ = 0;
    this.isDisposed_ = false;
    this.isScheduled_ = false;
    this.isTrackPending_ = false;
    this.isRunning_ = false;
    this.isTracing_ = TraceMode.NONE;
    this.name_ = name_;
    this.onInvalidate_ = onInvalidate_;
    this.errorHandler_ = errorHandler_;
    this.requiresObservable_ = requiresObservable_;
  }
  var _proto = Reaction2.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    this.schedule_();
  };
  _proto.schedule_ = function schedule_() {
    if (!this.isScheduled_) {
      this.isScheduled_ = true;
      globalState.pendingReactions.push(this);
      runReactions();
    }
  };
  _proto.isScheduled = function isScheduled() {
    return this.isScheduled_;
  };
  _proto.runReaction_ = function runReaction_() {
    if (!this.isDisposed_) {
      startBatch();
      this.isScheduled_ = false;
      var prev = globalState.trackingContext;
      globalState.trackingContext = this;
      if (shouldCompute(this)) {
        this.isTrackPending_ = true;
        try {
          this.onInvalidate_();
          if (process.env.NODE_ENV !== "production" && this.isTrackPending_ && isSpyEnabled()) {
            spyReport({
              name: this.name_,
              type: "scheduled-reaction"
            });
          }
        } catch (e2) {
          this.reportExceptionInDerivation_(e2);
        }
      }
      globalState.trackingContext = prev;
      endBatch();
    }
  };
  _proto.track = function track(fn) {
    if (this.isDisposed_) {
      return;
    }
    startBatch();
    var notify = isSpyEnabled();
    var startTime;
    if (process.env.NODE_ENV !== "production" && notify) {
      startTime = Date.now();
      spyReportStart({
        name: this.name_,
        type: "reaction"
      });
    }
    this.isRunning_ = true;
    var prevReaction = globalState.trackingContext;
    globalState.trackingContext = this;
    var result = trackDerivedFunction(this, fn, void 0);
    globalState.trackingContext = prevReaction;
    this.isRunning_ = false;
    this.isTrackPending_ = false;
    if (this.isDisposed_) {
      clearObserving(this);
    }
    if (isCaughtException(result)) {
      this.reportExceptionInDerivation_(result.cause);
    }
    if (process.env.NODE_ENV !== "production" && notify) {
      spyReportEnd({
        time: Date.now() - startTime
      });
    }
    endBatch();
  };
  _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error2) {
    var _this = this;
    if (this.errorHandler_) {
      this.errorHandler_(error2, this);
      return;
    }
    if (globalState.disableErrorBoundaries) {
      throw error2;
    }
    var message = process.env.NODE_ENV !== "production" ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    if (!globalState.suppressReactionErrors) {
      console.error(message, error2);
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)");
    }
    if (process.env.NODE_ENV !== "production" && isSpyEnabled()) {
      spyReport({
        type: "error",
        name: this.name_,
        message,
        error: "" + error2
      });
    }
    globalState.globalReactionErrorHandlers.forEach(function(f2) {
      return f2(error2, _this);
    });
  };
  _proto.dispose = function dispose() {
    if (!this.isDisposed_) {
      this.isDisposed_ = true;
      if (!this.isRunning_) {
        startBatch();
        clearObserving(this);
        endBatch();
      }
    }
  };
  _proto.getDisposer_ = function getDisposer_(abortSignal) {
    var _this2 = this;
    var dispose = function dispose2() {
      _this2.dispose();
      abortSignal == null ? void 0 : abortSignal.removeEventListener == null ? void 0 : abortSignal.removeEventListener("abort", dispose2);
    };
    abortSignal == null ? void 0 : abortSignal.addEventListener == null ? void 0 : abortSignal.addEventListener("abort", dispose);
    dispose[$mobx] = this;
    return dispose;
  };
  _proto.toString = function toString2() {
    return "Reaction[" + this.name_ + "]";
  };
  _proto.trace = function trace$1(enterBreakPoint) {
    if (enterBreakPoint === void 0) {
      enterBreakPoint = false;
    }
    trace(this, enterBreakPoint);
  };
  return Reaction2;
}();
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function reactionScheduler2(f2) {
  return f2();
};
function runReactions() {
  if (globalState.inBatch > 0 || globalState.isRunningReactions) {
    return;
  }
  reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
  globalState.isRunningReactions = true;
  var allReactions = globalState.pendingReactions;
  var iterations = 0;
  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error(process.env.NODE_ENV !== "production" ? "Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) : "[mobx] cycle in reaction: " + allReactions[0]);
      allReactions.splice(0);
    }
    var remainingReactions = allReactions.splice(0);
    for (var i = 0, l2 = remainingReactions.length; i < l2; i++) {
      remainingReactions[i].runReaction_();
    }
  }
  globalState.isRunningReactions = false;
}
var isReaction = /* @__PURE__ */ createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
  var baseScheduler = reactionScheduler;
  reactionScheduler = function reactionScheduler3(f2) {
    return fn(function() {
      return baseScheduler(f2);
    });
  };
}
function isSpyEnabled() {
  return process.env.NODE_ENV !== "production" && !!globalState.spyListeners.length;
}
function spyReport(event) {
  if (!(process.env.NODE_ENV !== "production")) {
    return;
  }
  if (!globalState.spyListeners.length) {
    return;
  }
  var listeners = globalState.spyListeners;
  for (var i = 0, l2 = listeners.length; i < l2; i++) {
    listeners[i](event);
  }
}
function spyReportStart(event) {
  if (!(process.env.NODE_ENV !== "production")) {
    return;
  }
  var change = _extends({}, event, {
    spyReportStart: true
  });
  spyReport(change);
}
var END_EVENT = {
  type: "report-end",
  spyReportEnd: true
};
function spyReportEnd(change) {
  if (!(process.env.NODE_ENV !== "production")) {
    return;
  }
  if (change) {
    spyReport(_extends({}, change, {
      type: "report-end",
      spyReportEnd: true
    }));
  } else {
    spyReport(END_EVENT);
  }
}
function spy(listener) {
  if (!(process.env.NODE_ENV !== "production")) {
    console.warn("[mobx.spy] Is a no-op in production builds");
    return function() {
    };
  } else {
    globalState.spyListeners.push(listener);
    return once(function() {
      globalState.spyListeners = globalState.spyListeners.filter(function(l2) {
        return l2 !== listener;
      });
    });
  }
}
var ACTION = "action";
var ACTION_BOUND = "action.bound";
var AUTOACTION = "autoAction";
var AUTOACTION_BOUND = "autoAction.bound";
var DEFAULT_ACTION_NAME = "<unnamed action>";
var actionAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION);
var actionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION_BOUND, {
  bound: true
});
var autoActionAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION, {
  autoAction: true
});
var autoActionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION_BOUND, {
  autoAction: true,
  bound: true
});
function createActionFactory(autoAction2) {
  var res = function action2(arg1, arg2) {
    if (isFunction(arg1)) {
      return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction2);
    }
    if (isFunction(arg2)) {
      return createAction(arg1, arg2, autoAction2);
    }
    if (is20223Decorator(arg2)) {
      return (autoAction2 ? autoActionAnnotation : actionAnnotation).decorate_20223_(arg1, arg2);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, autoAction2 ? autoActionAnnotation : actionAnnotation);
    }
    if (isStringish(arg1)) {
      return createDecoratorAnnotation(createActionAnnotation(autoAction2 ? AUTOACTION : ACTION, {
        name: arg1,
        autoAction: autoAction2
      }));
    }
    if (process.env.NODE_ENV !== "production") {
      die("Invalid arguments for `action`");
    }
  };
  return res;
}
var action = /* @__PURE__ */ createActionFactory(false);
Object.assign(action, actionAnnotation);
var autoAction = /* @__PURE__ */ createActionFactory(true);
Object.assign(autoAction, autoActionAnnotation);
action.bound = /* @__PURE__ */ createDecoratorAnnotation(actionBoundAnnotation);
autoAction.bound = /* @__PURE__ */ createDecoratorAnnotation(autoActionBoundAnnotation);
function runInAction(fn) {
  return executeAction(fn.name || DEFAULT_ACTION_NAME, false, fn, this, void 0);
}
function isAction(thing) {
  return isFunction(thing) && thing.isMobxAction === true;
}
function autorun(view, opts) {
  var _opts$name, _opts, _opts2, _opts2$signal, _opts3;
  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(view)) {
      die("Autorun expects a function as first argument");
    }
    if (isAction(view)) {
      die("Autorun does not accept actions since actions are untrackable");
    }
  }
  var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : process.env.NODE_ENV !== "production" ? view.name || "Autorun@" + getNextId() : "Autorun";
  var runSync = !opts.scheduler && !opts.delay;
  var reaction2;
  if (runSync) {
    reaction2 = new Reaction(name, function() {
      this.track(reactionRunner);
    }, opts.onError, opts.requiresObservable);
  } else {
    var scheduler = createSchedulerFromOptions(opts);
    var isScheduled = false;
    reaction2 = new Reaction(name, function() {
      if (!isScheduled) {
        isScheduled = true;
        scheduler(function() {
          isScheduled = false;
          if (!reaction2.isDisposed_) {
            reaction2.track(reactionRunner);
          }
        });
      }
    }, opts.onError, opts.requiresObservable);
  }
  function reactionRunner() {
    view(reaction2);
  }
  if (!((_opts2 = opts) != null && (_opts2$signal = _opts2.signal) != null && _opts2$signal.aborted)) {
    reaction2.schedule_();
  }
  return reaction2.getDisposer_((_opts3 = opts) == null ? void 0 : _opts3.signal);
}
var run = function run2(f2) {
  return f2();
};
function createSchedulerFromOptions(opts) {
  return opts.scheduler ? opts.scheduler : opts.delay ? function(f2) {
    return setTimeout(f2, opts.delay);
  } : run;
}
function reaction$1(expression, effect, opts) {
  var _opts$name2, _opts4, _opts4$signal, _opts5;
  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(expression) || !isFunction(effect)) {
      die("First and second argument to reaction should be functions");
    }
    if (!isPlainObject(opts)) {
      die("Third argument of reactions should be an object");
    }
  }
  var name = (_opts$name2 = opts.name) != null ? _opts$name2 : process.env.NODE_ENV !== "production" ? "Reaction@" + getNextId() : "Reaction";
  var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
  var runSync = !opts.scheduler && !opts.delay;
  var scheduler = createSchedulerFromOptions(opts);
  var firstTime = true;
  var isScheduled = false;
  var value;
  var oldValue;
  var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer["default"];
  var r2 = new Reaction(name, function() {
    if (firstTime || runSync) {
      reactionRunner();
    } else if (!isScheduled) {
      isScheduled = true;
      scheduler(reactionRunner);
    }
  }, opts.onError, opts.requiresObservable);
  function reactionRunner() {
    isScheduled = false;
    if (r2.isDisposed_) {
      return;
    }
    var changed = false;
    r2.track(function() {
      var nextValue = allowStateChanges(false, function() {
        return expression(r2);
      });
      changed = firstTime || !equals(value, nextValue);
      oldValue = value;
      value = nextValue;
    });
    if (firstTime && opts.fireImmediately) {
      effectAction(value, oldValue, r2);
    } else if (!firstTime && changed) {
      effectAction(value, oldValue, r2);
    }
    firstTime = false;
  }
  if (!((_opts4 = opts) != null && (_opts4$signal = _opts4.signal) != null && _opts4$signal.aborted)) {
    r2.schedule_();
  }
  return r2.getDisposer_((_opts5 = opts) == null ? void 0 : _opts5.signal);
}
function wrapErrorHandler(errorHandler, baseFn) {
  return function() {
    try {
      return baseFn.apply(this, arguments);
    } catch (e2) {
      errorHandler.call(this, e2);
    }
  };
}
var ON_BECOME_OBSERVED = "onBO";
var ON_BECOME_UNOBSERVED = "onBUO";
function onBecomeObserved(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
}
function onBecomeUnobserved(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
  var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
  var cb = isFunction(arg3) ? arg3 : arg2;
  var listenersKey = hook + "L";
  if (atom[listenersKey]) {
    atom[listenersKey].add(cb);
  } else {
    atom[listenersKey] = /* @__PURE__ */ new Set([cb]);
  }
  return function() {
    var hookListeners = atom[listenersKey];
    if (hookListeners) {
      hookListeners["delete"](cb);
      if (hookListeners.size === 0) {
        delete atom[listenersKey];
      }
    }
  };
}
var NEVER = "never";
var ALWAYS = "always";
var OBSERVED = "observed";
function configure(options) {
  if (options.isolateGlobalState === true) {
    isolateGlobalState();
  }
  var useProxies = options.useProxies, enforceActions = options.enforceActions;
  if (useProxies !== void 0) {
    globalState.useProxies = useProxies === ALWAYS ? true : useProxies === NEVER ? false : typeof Proxy !== "undefined";
  }
  if (useProxies === "ifavailable") {
    globalState.verifyProxies = true;
  }
  if (enforceActions !== void 0) {
    var ea = enforceActions === ALWAYS ? ALWAYS : enforceActions === OBSERVED;
    globalState.enforceActions = ea;
    globalState.allowStateChanges = ea === true || ea === ALWAYS ? false : true;
  }
  ["computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries", "safeDescriptors"].forEach(function(key) {
    if (key in options) {
      globalState[key] = !!options[key];
    }
  });
  globalState.allowStateReads = !globalState.observableRequiresReaction;
  if (process.env.NODE_ENV !== "production" && globalState.disableErrorBoundaries === true) {
    console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
  }
  if (options.reactionScheduler) {
    setReactionScheduler(options.reactionScheduler);
  }
}
function extendObservable(target2, properties, annotations, options) {
  if (process.env.NODE_ENV !== "production") {
    if (arguments.length > 4) {
      die("'extendObservable' expected 2-4 arguments");
    }
    if (typeof target2 !== "object") {
      die("'extendObservable' expects an object as first argument");
    }
    if (isObservableMap(target2)) {
      die("'extendObservable' should not be used on maps, use map.merge instead");
    }
    if (!isPlainObject(properties)) {
      die("'extendObservable' only accepts plain objects as second argument");
    }
    if (isObservable(properties) || isObservable(annotations)) {
      die("Extending an object with another observable (object) is not supported");
    }
  }
  var descriptors = getOwnPropertyDescriptors(properties);
  initObservable(function() {
    var adm = asObservableObject(target2, options)[$mobx];
    ownKeys(descriptors).forEach(function(key) {
      adm.extend_(
        key,
        descriptors[key],
        // must pass "undefined" for { key: undefined }
        !annotations ? true : key in annotations ? annotations[key] : true
      );
    });
  });
  return target2;
}
function getDependencyTree(thing, property) {
  return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
  var result = {
    name: node.name_
  };
  if (node.observing_ && node.observing_.length > 0) {
    result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
  }
  return result;
}
function unique(list) {
  return Array.from(new Set(list));
}
var generatorId = 0;
function FlowCancellationError() {
  this.message = "FLOW_CANCELLED";
}
FlowCancellationError.prototype = /* @__PURE__ */ Object.create(Error.prototype);
var flowAnnotation = /* @__PURE__ */ createFlowAnnotation("flow");
var flowBoundAnnotation = /* @__PURE__ */ createFlowAnnotation("flow.bound", {
  bound: true
});
var flow = /* @__PURE__ */ Object.assign(function flow2(arg1, arg2) {
  if (is20223Decorator(arg2)) {
    return flowAnnotation.decorate_20223_(arg1, arg2);
  }
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, flowAnnotation);
  }
  if (process.env.NODE_ENV !== "production" && arguments.length !== 1) {
    die("Flow expects single argument with generator function");
  }
  var generator = arg1;
  var name = generator.name || "<unnamed flow>";
  var res = function res2() {
    var ctx = this;
    var args = arguments;
    var runId = ++generatorId;
    var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
    var rejector;
    var pendingPromise = void 0;
    var promise = new Promise(function(resolve, reject) {
      var stepId = 0;
      rejector = reject;
      function onFulfilled(res3) {
        pendingPromise = void 0;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res3);
        } catch (e2) {
          return reject(e2);
        }
        next(ret);
      }
      function onRejected(err) {
        pendingPromise = void 0;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
        } catch (e2) {
          return reject(e2);
        }
        next(ret);
      }
      function next(ret) {
        if (isFunction(ret == null ? void 0 : ret.then)) {
          ret.then(next, reject);
          return;
        }
        if (ret.done) {
          return resolve(ret.value);
        }
        pendingPromise = Promise.resolve(ret.value);
        return pendingPromise.then(onFulfilled, onRejected);
      }
      onFulfilled(void 0);
    });
    promise.cancel = action(name + " - runid: " + runId + " - cancel", function() {
      try {
        if (pendingPromise) {
          cancelPromise(pendingPromise);
        }
        var _res = gen["return"](void 0);
        var yieldedPromise = Promise.resolve(_res.value);
        yieldedPromise.then(noop, noop);
        cancelPromise(yieldedPromise);
        rejector(new FlowCancellationError());
      } catch (e2) {
        rejector(e2);
      }
    });
    return promise;
  };
  res.isMobXFlow = true;
  return res;
}, flowAnnotation);
flow.bound = /* @__PURE__ */ createDecoratorAnnotation(flowBoundAnnotation);
function cancelPromise(promise) {
  if (isFunction(promise.cancel)) {
    promise.cancel();
  }
}
function isFlow(fn) {
  return (fn == null ? void 0 : fn.isMobXFlow) === true;
}
function _isObservable(value, property) {
  if (!value) {
    return false;
  }
  if (property !== void 0) {
    if (process.env.NODE_ENV !== "production" && (isObservableMap(value) || isObservableArray(value))) {
      return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
    }
    if (isObservableObject(value)) {
      return value[$mobx].values_.has(property);
    }
    return false;
  }
  return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
}
function isObservable(value) {
  if (process.env.NODE_ENV !== "production" && arguments.length !== 1) {
    die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  }
  return _isObservable(value);
}
function trace() {
  if (!(process.env.NODE_ENV !== "production")) {
    return;
  }
  var enterBreakPoint = false;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (typeof args[args.length - 1] === "boolean") {
    enterBreakPoint = args.pop();
  }
  var derivation = getAtomFromArgs(args);
  if (!derivation) {
    return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
  }
  if (derivation.isTracing_ === TraceMode.NONE) {
    console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
  }
  derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}
function getAtomFromArgs(args) {
  switch (args.length) {
    case 0:
      return globalState.trackingDerivation;
    case 1:
      return getAtom(args[0]);
    case 2:
      return getAtom(args[0], args[1]);
  }
}
function transaction(action2, thisArg) {
  if (thisArg === void 0) {
    thisArg = void 0;
  }
  startBatch();
  try {
    return action2.apply(thisArg);
  } finally {
    endBatch();
  }
}
function getAdm(target2) {
  return target2[$mobx];
}
var objectProxyTraps = {
  has: function has(target2, name) {
    if (process.env.NODE_ENV !== "production" && globalState.trackingDerivation) {
      warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
    }
    return getAdm(target2).has_(name);
  },
  get: function get(target2, name) {
    return getAdm(target2).get_(name);
  },
  set: function set2(target2, name, value) {
    var _getAdm$set_;
    if (!isStringish(name)) {
      return false;
    }
    if (process.env.NODE_ENV !== "production" && !getAdm(target2).values_.has(name)) {
      warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
    }
    return (_getAdm$set_ = getAdm(target2).set_(name, value, true)) != null ? _getAdm$set_ : true;
  },
  deleteProperty: function deleteProperty(target2, name) {
    var _getAdm$delete_;
    if (process.env.NODE_ENV !== "production") {
      warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
    }
    if (!isStringish(name)) {
      return false;
    }
    return (_getAdm$delete_ = getAdm(target2).delete_(name, true)) != null ? _getAdm$delete_ : true;
  },
  defineProperty: function defineProperty2(target2, name, descriptor) {
    var _getAdm$definePropert;
    if (process.env.NODE_ENV !== "production") {
      warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
    }
    return (_getAdm$definePropert = getAdm(target2).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
  },
  ownKeys: function ownKeys2(target2) {
    if (process.env.NODE_ENV !== "production" && globalState.trackingDerivation) {
      warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
    }
    return getAdm(target2).ownKeys_();
  },
  preventExtensions: function preventExtensions(target2) {
    die(13);
  }
};
function asDynamicObservableObject(target2, options) {
  var _target$$mobx, _target$$mobx$proxy_;
  assertProxies();
  target2 = asObservableObject(target2, options);
  return (_target$$mobx$proxy_ = (_target$$mobx = target2[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target2, objectProxyTraps);
}
function hasInterceptors(interceptable) {
  return interceptable.interceptors_ !== void 0 && interceptable.interceptors_.length > 0;
}
function registerInterceptor(interceptable, handler) {
  var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
  interceptors.push(handler);
  return once(function() {
    var idx = interceptors.indexOf(handler);
    if (idx !== -1) {
      interceptors.splice(idx, 1);
    }
  });
}
function interceptChange(interceptable, change) {
  var prevU = untrackedStart();
  try {
    var interceptors = [].concat(interceptable.interceptors_ || []);
    for (var i = 0, l2 = interceptors.length; i < l2; i++) {
      change = interceptors[i](change);
      if (change && !change.type) {
        die(14);
      }
      if (!change) {
        break;
      }
    }
    return change;
  } finally {
    untrackedEnd(prevU);
  }
}
function hasListeners(listenable) {
  return listenable.changeListeners_ !== void 0 && listenable.changeListeners_.length > 0;
}
function registerListener(listenable, handler) {
  var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
  listeners.push(handler);
  return once(function() {
    var idx = listeners.indexOf(handler);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  });
}
function notifyListeners(listenable, change) {
  var prevU = untrackedStart();
  var listeners = listenable.changeListeners_;
  if (!listeners) {
    return;
  }
  listeners = listeners.slice();
  for (var i = 0, l2 = listeners.length; i < l2; i++) {
    listeners[i](change);
  }
  untrackedEnd(prevU);
}
function makeObservable(target2, annotations, options) {
  initObservable(function() {
    var _annotations;
    var adm = asObservableObject(target2, options)[$mobx];
    if (process.env.NODE_ENV !== "production" && annotations && target2[storedAnnotationsSymbol]) {
      die("makeObservable second arg must be nullish when using decorators. Mixing @decorator syntax with annotations is not supported.");
    }
    (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target2);
    ownKeys(annotations).forEach(function(key) {
      return adm.make_(key, annotations[key]);
    });
  });
  return target2;
}
var keysSymbol = /* @__PURE__ */ Symbol("mobx-keys");
function makeAutoObservable(target2, overrides, options) {
  if (process.env.NODE_ENV !== "production") {
    if (!isPlainObject(target2) && !isPlainObject(Object.getPrototypeOf(target2))) {
      die("'makeAutoObservable' can only be used for classes that don't have a superclass");
    }
    if (isObservableObject(target2)) {
      die("makeAutoObservable can only be used on objects not already made observable");
    }
  }
  if (isPlainObject(target2)) {
    return extendObservable(target2, target2, overrides, options);
  }
  initObservable(function() {
    var adm = asObservableObject(target2, options)[$mobx];
    if (!target2[keysSymbol]) {
      var proto = Object.getPrototypeOf(target2);
      var keys = new Set([].concat(ownKeys(target2), ownKeys(proto)));
      keys["delete"]("constructor");
      keys["delete"]($mobx);
      addHiddenProp(proto, keysSymbol, keys);
    }
    target2[keysSymbol].forEach(function(key) {
      return adm.make_(
        key,
        // must pass "undefined" for { key: undefined }
        !overrides ? true : key in overrides ? overrides[key] : true
      );
    });
  });
  return target2;
}
var SPLICE = "splice";
var UPDATE = "update";
var MAX_SPLICE_SIZE = 1e4;
var arrayTraps = {
  get: function get2(target2, name) {
    var adm = target2[$mobx];
    if (name === $mobx) {
      return adm;
    }
    if (name === "length") {
      return adm.getArrayLength_();
    }
    if (typeof name === "string" && !isNaN(name)) {
      return adm.get_(parseInt(name));
    }
    if (hasProp(arrayExtensions, name)) {
      return arrayExtensions[name];
    }
    return target2[name];
  },
  set: function set3(target2, name, value) {
    var adm = target2[$mobx];
    if (name === "length") {
      adm.setArrayLength_(value);
    }
    if (typeof name === "symbol" || isNaN(name)) {
      target2[name] = value;
    } else {
      adm.set_(parseInt(name), value);
    }
    return true;
  },
  preventExtensions: function preventExtensions2() {
    die(15);
  }
};
var ObservableArrayAdministration = /* @__PURE__ */ function() {
  function ObservableArrayAdministration2(name, enhancer, owned_, legacyMode_) {
    if (name === void 0) {
      name = process.env.NODE_ENV !== "production" ? "ObservableArray@" + getNextId() : "ObservableArray";
    }
    this.owned_ = void 0;
    this.legacyMode_ = void 0;
    this.atom_ = void 0;
    this.values_ = [];
    this.interceptors_ = void 0;
    this.changeListeners_ = void 0;
    this.enhancer_ = void 0;
    this.dehancer = void 0;
    this.proxy_ = void 0;
    this.lastKnownLength_ = 0;
    this.owned_ = owned_;
    this.legacyMode_ = legacyMode_;
    this.atom_ = new Atom(name);
    this.enhancer_ = function(newV, oldV) {
      return enhancer(newV, oldV, process.env.NODE_ENV !== "production" ? name + "[..]" : "ObservableArray[..]");
    };
  }
  var _proto = ObservableArrayAdministration2.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.dehanceValues_ = function dehanceValues_(values) {
    if (this.dehancer !== void 0 && values.length > 0) {
      return values.map(this.dehancer);
    }
    return values;
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === void 0) {
      fireImmediately = false;
    }
    if (fireImmediately) {
      listener({
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: "splice",
        index: 0,
        added: this.values_.slice(),
        addedCount: this.values_.length,
        removed: [],
        removedCount: 0
      });
    }
    return registerListener(this, listener);
  };
  _proto.getArrayLength_ = function getArrayLength_() {
    this.atom_.reportObserved();
    return this.values_.length;
  };
  _proto.setArrayLength_ = function setArrayLength_(newLength) {
    if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
      die("Out of range: " + newLength);
    }
    var currentLength = this.values_.length;
    if (newLength === currentLength) {
      return;
    } else if (newLength > currentLength) {
      var newItems = new Array(newLength - currentLength);
      for (var i = 0; i < newLength - currentLength; i++) {
        newItems[i] = void 0;
      }
      this.spliceWithArray_(currentLength, 0, newItems);
    } else {
      this.spliceWithArray_(newLength, currentLength - newLength);
    }
  };
  _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
    if (oldLength !== this.lastKnownLength_) {
      die(16);
    }
    this.lastKnownLength_ += delta;
    if (this.legacyMode_ && delta > 0) {
      reserveArrayBuffer(oldLength + delta + 1);
    }
  };
  _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
    var _this = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    var length = this.values_.length;
    if (index === void 0) {
      index = 0;
    } else if (index > length) {
      index = length;
    } else if (index < 0) {
      index = Math.max(0, length + index);
    }
    if (arguments.length === 1) {
      deleteCount = length - index;
    } else if (deleteCount === void 0 || deleteCount === null) {
      deleteCount = 0;
    } else {
      deleteCount = Math.max(0, Math.min(deleteCount, length - index));
    }
    if (newItems === void 0) {
      newItems = EMPTY_ARRAY;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_,
        type: SPLICE,
        index,
        removedCount: deleteCount,
        added: newItems
      });
      if (!change) {
        return EMPTY_ARRAY;
      }
      deleteCount = change.removedCount;
      newItems = change.added;
    }
    newItems = newItems.length === 0 ? newItems : newItems.map(function(v) {
      return _this.enhancer_(v, void 0);
    });
    if (this.legacyMode_ || process.env.NODE_ENV !== "production") {
      var lengthDelta = newItems.length - deleteCount;
      this.updateArrayLength_(length, lengthDelta);
    }
    var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
    if (deleteCount !== 0 || newItems.length !== 0) {
      this.notifyArraySplice_(index, newItems, res);
    }
    return this.dehanceValues_(res);
  };
  _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
    if (newItems.length < MAX_SPLICE_SIZE) {
      var _this$values_;
      return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
    } else {
      var res = this.values_.slice(index, index + deleteCount);
      var oldItems = this.values_.slice(index + deleteCount);
      this.values_.length += newItems.length - deleteCount;
      for (var i = 0; i < newItems.length; i++) {
        this.values_[index + i] = newItems[i];
      }
      for (var _i2 = 0; _i2 < oldItems.length; _i2++) {
        this.values_[index + newItems.length + _i2] = oldItems[_i2];
      }
      return res;
    }
  };
  _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      type: UPDATE,
      debugObjectName: this.atom_.name_,
      index,
      newValue,
      oldValue
    } : null;
    if (process.env.NODE_ENV !== "production" && notifySpy) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (process.env.NODE_ENV !== "production" && notifySpy) {
      spyReportEnd();
    }
  };
  _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: SPLICE,
      index,
      removed,
      added,
      removedCount: removed.length,
      addedCount: added.length
    } : null;
    if (process.env.NODE_ENV !== "production" && notifySpy) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (process.env.NODE_ENV !== "production" && notifySpy) {
      spyReportEnd();
    }
  };
  _proto.get_ = function get_(index) {
    if (this.legacyMode_ && index >= this.values_.length) {
      console.warn(process.env.NODE_ENV !== "production" ? "[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + index);
      return void 0;
    }
    this.atom_.reportObserved();
    return this.dehanceValue_(this.values_[index]);
  };
  _proto.set_ = function set_(index, newValue) {
    var values = this.values_;
    if (this.legacyMode_ && index > values.length) {
      die(17, index, values.length);
    }
    if (index < values.length) {
      checkIfStateModificationsAreAllowed(this.atom_);
      var oldValue = values[index];
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_,
          index,
          newValue
        });
        if (!change) {
          return;
        }
        newValue = change.newValue;
      }
      newValue = this.enhancer_(newValue, oldValue);
      var changed = newValue !== oldValue;
      if (changed) {
        values[index] = newValue;
        this.notifyArrayChildUpdate_(index, newValue, oldValue);
      }
    } else {
      var newItems = new Array(index + 1 - values.length);
      for (var i = 0; i < newItems.length - 1; i++) {
        newItems[i] = void 0;
      }
      newItems[newItems.length - 1] = newValue;
      this.spliceWithArray_(values.length, 0, newItems);
    }
  };
  return ObservableArrayAdministration2;
}();
function createObservableArray(initialValues, enhancer, name, owned) {
  if (name === void 0) {
    name = process.env.NODE_ENV !== "production" ? "ObservableArray@" + getNextId() : "ObservableArray";
  }
  if (owned === void 0) {
    owned = false;
  }
  assertProxies();
  return initObservable(function() {
    var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
    addHiddenFinalProp(adm.values_, $mobx, adm);
    var proxy = new Proxy(adm.values_, arrayTraps);
    adm.proxy_ = proxy;
    if (initialValues && initialValues.length) {
      adm.spliceWithArray_(0, 0, initialValues);
    }
    return proxy;
  });
}
var arrayExtensions = {
  clear: function clear() {
    return this.splice(0);
  },
  replace: function replace(newItems) {
    var adm = this[$mobx];
    return adm.spliceWithArray_(0, adm.values_.length, newItems);
  },
  // Used by JSON.stringify
  toJSON: function toJSON() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function splice(index, deleteCount) {
    for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      newItems[_key - 2] = arguments[_key];
    }
    var adm = this[$mobx];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return adm.spliceWithArray_(index);
      case 2:
        return adm.spliceWithArray_(index, deleteCount);
    }
    return adm.spliceWithArray_(index, deleteCount, newItems);
  },
  spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
    return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
  },
  push: function push() {
    var adm = this[$mobx];
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }
    adm.spliceWithArray_(adm.values_.length, 0, items);
    return adm.values_.length;
  },
  pop: function pop() {
    return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
  },
  shift: function shift() {
    return this.splice(0, 1)[0];
  },
  unshift: function unshift() {
    var adm = this[$mobx];
    for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }
    adm.spliceWithArray_(0, 0, items);
    return adm.values_.length;
  },
  reverse: function reverse() {
    if (globalState.trackingDerivation) {
      die(37, "reverse");
    }
    this.replace(this.slice().reverse());
    return this;
  },
  sort: function sort() {
    if (globalState.trackingDerivation) {
      die(37, "sort");
    }
    var copy = this.slice();
    copy.sort.apply(copy, arguments);
    this.replace(copy);
    return this;
  },
  remove: function remove(value) {
    var adm = this[$mobx];
    var idx = adm.dehanceValues_(adm.values_).indexOf(value);
    if (idx > -1) {
      this.splice(idx, 1);
      return true;
    }
    return false;
  }
};
addArrayExtension("at", simpleFunc);
addArrayExtension("concat", simpleFunc);
addArrayExtension("flat", simpleFunc);
addArrayExtension("includes", simpleFunc);
addArrayExtension("indexOf", simpleFunc);
addArrayExtension("join", simpleFunc);
addArrayExtension("lastIndexOf", simpleFunc);
addArrayExtension("slice", simpleFunc);
addArrayExtension("toString", simpleFunc);
addArrayExtension("toLocaleString", simpleFunc);
addArrayExtension("toSorted", simpleFunc);
addArrayExtension("toSpliced", simpleFunc);
addArrayExtension("with", simpleFunc);
addArrayExtension("every", mapLikeFunc);
addArrayExtension("filter", mapLikeFunc);
addArrayExtension("find", mapLikeFunc);
addArrayExtension("findIndex", mapLikeFunc);
addArrayExtension("findLast", mapLikeFunc);
addArrayExtension("findLastIndex", mapLikeFunc);
addArrayExtension("flatMap", mapLikeFunc);
addArrayExtension("forEach", mapLikeFunc);
addArrayExtension("map", mapLikeFunc);
addArrayExtension("some", mapLikeFunc);
addArrayExtension("toReversed", mapLikeFunc);
addArrayExtension("reduce", reduceLikeFunc);
addArrayExtension("reduceRight", reduceLikeFunc);
function addArrayExtension(funcName, funcFactory) {
  if (typeof Array.prototype[funcName] === "function") {
    arrayExtensions[funcName] = funcFactory(funcName);
  }
}
function simpleFunc(funcName) {
  return function() {
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
}
function mapLikeFunc(funcName) {
  return function(callback, thisArg) {
    var _this2 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName](function(element, index) {
      return callback.call(thisArg, element, index, _this2);
    });
  };
}
function reduceLikeFunc(funcName) {
  return function() {
    var _this3 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    var callback = arguments[0];
    arguments[0] = function(accumulator, currentValue, index) {
      return callback(accumulator, currentValue, index, _this3);
    };
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
}
var isObservableArrayAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
  return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}
var _Symbol$iterator, _Symbol$toStringTag;
var ObservableMapMarker = {};
var ADD = "add";
var DELETE = "delete";
_Symbol$iterator = Symbol.iterator;
_Symbol$toStringTag = Symbol.toStringTag;
var ObservableMap = /* @__PURE__ */ function() {
  function ObservableMap2(initialData, enhancer_, name_) {
    var _this = this;
    if (enhancer_ === void 0) {
      enhancer_ = deepEnhancer;
    }
    if (name_ === void 0) {
      name_ = process.env.NODE_ENV !== "production" ? "ObservableMap@" + getNextId() : "ObservableMap";
    }
    this.enhancer_ = void 0;
    this.name_ = void 0;
    this[$mobx] = ObservableMapMarker;
    this.data_ = void 0;
    this.hasMap_ = void 0;
    this.keysAtom_ = void 0;
    this.interceptors_ = void 0;
    this.changeListeners_ = void 0;
    this.dehancer = void 0;
    this.enhancer_ = enhancer_;
    this.name_ = name_;
    if (!isFunction(Map)) {
      die(18);
    }
    initObservable(function() {
      _this.keysAtom_ = createAtom(process.env.NODE_ENV !== "production" ? _this.name_ + ".keys()" : "ObservableMap.keys()");
      _this.data_ = /* @__PURE__ */ new Map();
      _this.hasMap_ = /* @__PURE__ */ new Map();
      if (initialData) {
        _this.merge(initialData);
      }
    });
  }
  var _proto = ObservableMap2.prototype;
  _proto.has_ = function has_(key) {
    return this.data_.has(key);
  };
  _proto.has = function has2(key) {
    var _this2 = this;
    if (!globalState.trackingDerivation) {
      return this.has_(key);
    }
    var entry = this.hasMap_.get(key);
    if (!entry) {
      var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, process.env.NODE_ENV !== "production" ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableMap.key?", false);
      this.hasMap_.set(key, newEntry);
      onBecomeUnobserved(newEntry, function() {
        return _this2.hasMap_["delete"](key);
      });
    }
    return entry.get();
  };
  _proto.set = function set4(key, value) {
    var hasKey = this.has_(key);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: hasKey ? UPDATE : ADD,
        object: this,
        newValue: value,
        name: key
      });
      if (!change) {
        return this;
      }
      value = change.newValue;
    }
    if (hasKey) {
      this.updateValue_(key, value);
    } else {
      this.addValue_(key, value);
    }
    return this;
  };
  _proto["delete"] = function _delete(key) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        name: key
      });
      if (!change) {
        return false;
      }
    }
    if (this.has_(key)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: this.data_.get(key).value_,
        name: key
      } : null;
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportStart(_change);
      }
      transaction(function() {
        var _this3$hasMap_$get;
        _this3.keysAtom_.reportChanged();
        (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null ? void 0 : _this3$hasMap_$get.setNewValue_(false);
        var observable2 = _this3.data_.get(key);
        observable2.setNewValue_(void 0);
        _this3.data_["delete"](key);
      });
      if (notify) {
        notifyListeners(this, _change);
      }
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.updateValue_ = function updateValue_(key, newValue) {
    var observable2 = this.data_.get(key);
    newValue = observable2.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: UPDATE,
        object: this,
        oldValue: observable2.value_,
        name: key,
        newValue
      } : null;
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportStart(change);
      }
      observable2.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, change);
      }
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportEnd();
      }
    }
  };
  _proto.addValue_ = function addValue_(key, newValue) {
    var _this4 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    transaction(function() {
      var _this4$hasMap_$get;
      var observable2 = new ObservableValue(newValue, _this4.enhancer_, process.env.NODE_ENV !== "production" ? _this4.name_ + "." + stringifyKey(key) : "ObservableMap.key", false);
      _this4.data_.set(key, observable2);
      newValue = observable2.value_;
      (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null ? void 0 : _this4$hasMap_$get.setNewValue_(true);
      _this4.keysAtom_.reportChanged();
    });
    var notifySpy = isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: ADD,
      object: this,
      name: key,
      newValue
    } : null;
    if (process.env.NODE_ENV !== "production" && notifySpy) {
      spyReportStart(change);
    }
    if (notify) {
      notifyListeners(this, change);
    }
    if (process.env.NODE_ENV !== "production" && notifySpy) {
      spyReportEnd();
    }
  };
  _proto.get = function get3(key) {
    if (this.has(key)) {
      return this.dehanceValue_(this.data_.get(key).get());
    }
    return this.dehanceValue_(void 0);
  };
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.keys = function keys() {
    this.keysAtom_.reportObserved();
    return this.data_.keys();
  };
  _proto.values = function values() {
    var self2 = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next = keys.next(), done = _keys$next.done, value = _keys$next.value;
        return {
          done,
          value: done ? void 0 : self2.get(value)
        };
      }
    });
  };
  _proto.entries = function entries() {
    var self2 = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next2 = keys.next(), done = _keys$next2.done, value = _keys$next2.value;
        return {
          done,
          value: done ? void 0 : [value, self2.get(value)]
        };
      }
    });
  };
  _proto[_Symbol$iterator] = function() {
    return this.entries();
  };
  _proto.forEach = function forEach(callback, thisArg) {
    for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done; ) {
      var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
      callback.call(thisArg, value, key, this);
    }
  };
  _proto.merge = function merge(other) {
    var _this5 = this;
    if (isObservableMap(other)) {
      other = new Map(other);
    }
    transaction(function() {
      if (isPlainObject(other)) {
        getPlainObjectKeys(other).forEach(function(key) {
          return _this5.set(key, other[key]);
        });
      } else if (Array.isArray(other)) {
        other.forEach(function(_ref) {
          var key = _ref[0], value = _ref[1];
          return _this5.set(key, value);
        });
      } else if (isES6Map(other)) {
        if (other.constructor !== Map) {
          die(19, other);
        }
        other.forEach(function(value, key) {
          return _this5.set(key, value);
        });
      } else if (other !== null && other !== void 0) {
        die(20, other);
      }
    });
    return this;
  };
  _proto.clear = function clear2() {
    var _this6 = this;
    transaction(function() {
      untracked(function() {
        for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done; ) {
          var key = _step2.value;
          _this6["delete"](key);
        }
      });
    });
  };
  _proto.replace = function replace2(values) {
    var _this7 = this;
    transaction(function() {
      var replacementMap = convertToMap(values);
      var orderedData = /* @__PURE__ */ new Map();
      var keysReportChangedCalled = false;
      for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done; ) {
        var key = _step3.value;
        if (!replacementMap.has(key)) {
          var deleted = _this7["delete"](key);
          if (deleted) {
            keysReportChangedCalled = true;
          } else {
            var value = _this7.data_.get(key);
            orderedData.set(key, value);
          }
        }
      }
      for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done; ) {
        var _step4$value = _step4.value, _key = _step4$value[0], _value = _step4$value[1];
        var keyExisted = _this7.data_.has(_key);
        _this7.set(_key, _value);
        if (_this7.data_.has(_key)) {
          var _value2 = _this7.data_.get(_key);
          orderedData.set(_key, _value2);
          if (!keyExisted) {
            keysReportChangedCalled = true;
          }
        }
      }
      if (!keysReportChangedCalled) {
        if (_this7.data_.size !== orderedData.size) {
          _this7.keysAtom_.reportChanged();
        } else {
          var iter1 = _this7.data_.keys();
          var iter2 = orderedData.keys();
          var next1 = iter1.next();
          var next2 = iter2.next();
          while (!next1.done) {
            if (next1.value !== next2.value) {
              _this7.keysAtom_.reportChanged();
              break;
            }
            next1 = iter1.next();
            next2 = iter2.next();
          }
        }
      }
      _this7.data_ = orderedData;
    });
    return this;
  };
  _proto.toString = function toString2() {
    return "[object ObservableMap]";
  };
  _proto.toJSON = function toJSON2() {
    return Array.from(this);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (process.env.NODE_ENV !== "production" && fireImmediately === true) {
      die("`observe` doesn't support fireImmediately=true in combination with maps.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _createClass(ObservableMap2, [{
    key: "size",
    get: function get3() {
      this.keysAtom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: _Symbol$toStringTag,
    get: function get3() {
      return "Map";
    }
  }]);
  return ObservableMap2;
}();
var isObservableMap = /* @__PURE__ */ createInstanceofPredicate("ObservableMap", ObservableMap);
function convertToMap(dataStructure) {
  if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
    return dataStructure;
  } else if (Array.isArray(dataStructure)) {
    return new Map(dataStructure);
  } else if (isPlainObject(dataStructure)) {
    var map2 = /* @__PURE__ */ new Map();
    for (var key in dataStructure) {
      map2.set(key, dataStructure[key]);
    }
    return map2;
  } else {
    return die(21, dataStructure);
  }
}
var _Symbol$iterator$1, _Symbol$toStringTag$1;
var ObservableSetMarker = {};
_Symbol$iterator$1 = Symbol.iterator;
_Symbol$toStringTag$1 = Symbol.toStringTag;
var ObservableSet = /* @__PURE__ */ function() {
  function ObservableSet2(initialData, enhancer, name_) {
    var _this = this;
    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }
    if (name_ === void 0) {
      name_ = process.env.NODE_ENV !== "production" ? "ObservableSet@" + getNextId() : "ObservableSet";
    }
    this.name_ = void 0;
    this[$mobx] = ObservableSetMarker;
    this.data_ = /* @__PURE__ */ new Set();
    this.atom_ = void 0;
    this.changeListeners_ = void 0;
    this.interceptors_ = void 0;
    this.dehancer = void 0;
    this.enhancer_ = void 0;
    this.name_ = name_;
    if (!isFunction(Set)) {
      die(22);
    }
    this.enhancer_ = function(newV, oldV) {
      return enhancer(newV, oldV, name_);
    };
    initObservable(function() {
      _this.atom_ = createAtom(_this.name_);
      if (initialData) {
        _this.replace(initialData);
      }
    });
  }
  var _proto = ObservableSet2.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.clear = function clear2() {
    var _this2 = this;
    transaction(function() {
      untracked(function() {
        for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step; !(_step = _iterator()).done; ) {
          var value = _step.value;
          _this2["delete"](value);
        }
      });
    });
  };
  _proto.forEach = function forEach(callbackFn, thisArg) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done; ) {
      var value = _step2.value;
      callbackFn.call(thisArg, value, value, this);
    }
  };
  _proto.add = function add(value) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: ADD,
        object: this,
        newValue: value
      });
      if (!change) {
        return this;
      }
    }
    if (!this.has(value)) {
      transaction(function() {
        _this3.data_.add(_this3.enhancer_(value, void 0));
        _this3.atom_.reportChanged();
      });
      var notifySpy = process.env.NODE_ENV !== "production" && isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        newValue: value
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") {
        spyReportStart(_change);
      }
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy && process.env.NODE_ENV !== "production") {
        spyReportEnd();
      }
    }
    return this;
  };
  _proto["delete"] = function _delete(value) {
    var _this4 = this;
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        oldValue: value
      });
      if (!change) {
        return false;
      }
    }
    if (this.has(value)) {
      var notifySpy = process.env.NODE_ENV !== "production" && isSpyEnabled();
      var notify = hasListeners(this);
      var _change2 = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: value
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") {
        spyReportStart(_change2);
      }
      transaction(function() {
        _this4.atom_.reportChanged();
        _this4.data_["delete"](value);
      });
      if (notify) {
        notifyListeners(this, _change2);
      }
      if (notifySpy && process.env.NODE_ENV !== "production") {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.has = function has2(value) {
    this.atom_.reportObserved();
    return this.data_.has(this.dehanceValue_(value));
  };
  _proto.entries = function entries() {
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    var values = Array.from(this.values());
    return makeIterable({
      next: function next() {
        var index = nextIndex;
        nextIndex += 1;
        return index < values.length ? {
          value: [keys[index], values[index]],
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.keys = function keys() {
    return this.values();
  };
  _proto.values = function values() {
    this.atom_.reportObserved();
    var self2 = this;
    var nextIndex = 0;
    var observableValues = Array.from(this.data_.values());
    return makeIterable({
      next: function next() {
        return nextIndex < observableValues.length ? {
          value: self2.dehanceValue_(observableValues[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.replace = function replace2(other) {
    var _this5 = this;
    if (isObservableSet(other)) {
      other = new Set(other);
    }
    transaction(function() {
      if (Array.isArray(other)) {
        _this5.clear();
        other.forEach(function(value) {
          return _this5.add(value);
        });
      } else if (isES6Set(other)) {
        _this5.clear();
        other.forEach(function(value) {
          return _this5.add(value);
        });
      } else if (other !== null && other !== void 0) {
        die("Cannot initialize set from " + other);
      }
    });
    return this;
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (process.env.NODE_ENV !== "production" && fireImmediately === true) {
      die("`observe` doesn't support fireImmediately=true in combination with sets.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.toJSON = function toJSON2() {
    return Array.from(this);
  };
  _proto.toString = function toString2() {
    return "[object ObservableSet]";
  };
  _proto[_Symbol$iterator$1] = function() {
    return this.values();
  };
  _createClass(ObservableSet2, [{
    key: "size",
    get: function get3() {
      this.atom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: _Symbol$toStringTag$1,
    get: function get3() {
      return "Set";
    }
  }]);
  return ObservableSet2;
}();
var isObservableSet = /* @__PURE__ */ createInstanceofPredicate("ObservableSet", ObservableSet);
var descriptorCache = /* @__PURE__ */ Object.create(null);
var REMOVE = "remove";
var ObservableObjectAdministration = /* @__PURE__ */ function() {
  function ObservableObjectAdministration2(target_, values_, name_, defaultAnnotation_) {
    if (values_ === void 0) {
      values_ = /* @__PURE__ */ new Map();
    }
    if (defaultAnnotation_ === void 0) {
      defaultAnnotation_ = autoAnnotation;
    }
    this.target_ = void 0;
    this.values_ = void 0;
    this.name_ = void 0;
    this.defaultAnnotation_ = void 0;
    this.keysAtom_ = void 0;
    this.changeListeners_ = void 0;
    this.interceptors_ = void 0;
    this.proxy_ = void 0;
    this.isPlainObject_ = void 0;
    this.appliedAnnotations_ = void 0;
    this.pendingKeys_ = void 0;
    this.target_ = target_;
    this.values_ = values_;
    this.name_ = name_;
    this.defaultAnnotation_ = defaultAnnotation_;
    this.keysAtom_ = new Atom(process.env.NODE_ENV !== "production" ? this.name_ + ".keys" : "ObservableObject.keys");
    this.isPlainObject_ = isPlainObject(this.target_);
    if (process.env.NODE_ENV !== "production" && !isAnnotation(this.defaultAnnotation_)) {
      die("defaultAnnotation must be valid annotation");
    }
    if (process.env.NODE_ENV !== "production") {
      this.appliedAnnotations_ = {};
    }
  }
  var _proto = ObservableObjectAdministration2.prototype;
  _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
    return this.values_.get(key).get();
  };
  _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
    var observable2 = this.values_.get(key);
    if (observable2 instanceof ComputedValue) {
      observable2.set(newValue);
      return true;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: UPDATE,
        object: this.proxy_ || this.target_,
        name: key,
        newValue
      });
      if (!change) {
        return null;
      }
      newValue = change.newValue;
    }
    newValue = observable2.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notify = hasListeners(this);
      var notifySpy = process.env.NODE_ENV !== "production" && isSpyEnabled();
      var _change = notify || notifySpy ? {
        type: UPDATE,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: observable2.value_,
        name: key,
        newValue
      } : null;
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportStart(_change);
      }
      observable2.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, _change);
      }
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportEnd();
      }
    }
    return true;
  };
  _proto.get_ = function get_(key) {
    if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
      this.has_(key);
    }
    return this.target_[key];
  };
  _proto.set_ = function set_(key, value, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    if (hasProp(this.target_, key)) {
      if (this.values_.has(key)) {
        return this.setObservablePropValue_(key, value);
      } else if (proxyTrap) {
        return Reflect.set(this.target_, key, value);
      } else {
        this.target_[key] = value;
        return true;
      }
    } else {
      return this.extend_(key, {
        value,
        enumerable: true,
        writable: true,
        configurable: true
      }, this.defaultAnnotation_, proxyTrap);
    }
  };
  _proto.has_ = function has_(key) {
    if (!globalState.trackingDerivation) {
      return key in this.target_;
    }
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var entry = this.pendingKeys_.get(key);
    if (!entry) {
      entry = new ObservableValue(key in this.target_, referenceEnhancer, process.env.NODE_ENV !== "production" ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableObject.key?", false);
      this.pendingKeys_.set(key, entry);
    }
    return entry.get();
  };
  _proto.make_ = function make_(key, annotation) {
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return;
    }
    assertAnnotable(this, annotation, key);
    if (!(key in this.target_)) {
      var _this$target_$storedA;
      if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
        return;
      } else {
        die(1, annotation.annotationType_, this.name_ + "." + key.toString());
      }
    }
    var source = this.target_;
    while (source && source !== objectPrototype) {
      var descriptor = getDescriptor(source, key);
      if (descriptor) {
        var outcome = annotation.make_(this, key, descriptor, source);
        if (outcome === 0) {
          return;
        }
        if (outcome === 1) {
          break;
        }
      }
      source = Object.getPrototypeOf(source);
    }
    recordAnnotationApplied(this, annotation, key);
  };
  _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return this.defineProperty_(key, descriptor, proxyTrap);
    }
    assertAnnotable(this, annotation, key);
    var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
    if (outcome) {
      recordAnnotationApplied(this, annotation, key);
    }
    return outcome;
  };
  _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: descriptor.value
        });
        if (!change) {
          return null;
        }
        var newValue = change.newValue;
        if (descriptor.value !== newValue) {
          descriptor = _extends({}, descriptor, {
            value: newValue
          });
        }
      }
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.notifyPropertyAddition_(key, descriptor.value);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: value
        });
        if (!change) {
          return null;
        }
        value = change.newValue;
      }
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: true,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      var observable2 = new ObservableValue(value, enhancer, process.env.NODE_ENV !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
      this.values_.set(key, observable2);
      this.notifyPropertyAddition_(key, observable2.value_);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: void 0
        });
        if (!change) {
          return null;
        }
      }
      options.name || (options.name = process.env.NODE_ENV !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key");
      options.context = this.proxy_ || this.target_;
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: false,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.values_.set(key, new ComputedValue(options));
      this.notifyPropertyAddition_(key, void 0);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.delete_ = function delete_(key, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (!hasProp(this.target_, key)) {
      return true;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_ || this.target_,
        name: key,
        type: REMOVE
      });
      if (!change) {
        return null;
      }
    }
    try {
      var _this$pendingKeys_, _this$pendingKeys_$ge;
      startBatch();
      var notify = hasListeners(this);
      var notifySpy = process.env.NODE_ENV !== "production" && isSpyEnabled();
      var observable2 = this.values_.get(key);
      var value = void 0;
      if (!observable2 && (notify || notifySpy)) {
        var _getDescriptor2;
        value = (_getDescriptor2 = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor2.value;
      }
      if (proxyTrap) {
        if (!Reflect.deleteProperty(this.target_, key)) {
          return false;
        }
      } else {
        delete this.target_[key];
      }
      if (process.env.NODE_ENV !== "production") {
        delete this.appliedAnnotations_[key];
      }
      if (observable2) {
        this.values_["delete"](key);
        if (observable2 instanceof ObservableValue) {
          value = observable2.value_;
        }
        propagateChanged(observable2);
      }
      this.keysAtom_.reportChanged();
      (_this$pendingKeys_ = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? void 0 : _this$pendingKeys_$ge.set(key in this.target_);
      if (notify || notifySpy) {
        var _change2 = {
          type: REMOVE,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: value,
          name: key
        };
        if (process.env.NODE_ENV !== "production" && notifySpy) {
          spyReportStart(_change2);
        }
        if (notify) {
          notifyListeners(this, _change2);
        }
        if (process.env.NODE_ENV !== "production" && notifySpy) {
          spyReportEnd();
        }
      }
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.observe_ = function observe_(callback, fireImmediately) {
    if (process.env.NODE_ENV !== "production" && fireImmediately === true) {
      die("`observe` doesn't support the fire immediately property for observable objects.");
    }
    return registerListener(this, callback);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
    var _this$pendingKeys_2, _this$pendingKeys_2$g;
    var notify = hasListeners(this);
    var notifySpy = process.env.NODE_ENV !== "production" && isSpyEnabled();
    if (notify || notifySpy) {
      var change = notify || notifySpy ? {
        type: ADD,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: key,
        newValue: value
      } : null;
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportStart(change);
      }
      if (notify) {
        notifyListeners(this, change);
      }
      if (process.env.NODE_ENV !== "production" && notifySpy) {
        spyReportEnd();
      }
    }
    (_this$pendingKeys_2 = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? void 0 : _this$pendingKeys_2$g.set(true);
    this.keysAtom_.reportChanged();
  };
  _proto.ownKeys_ = function ownKeys_() {
    this.keysAtom_.reportObserved();
    return ownKeys(this.target_);
  };
  _proto.keys_ = function keys_() {
    this.keysAtom_.reportObserved();
    return Object.keys(this.target_);
  };
  return ObservableObjectAdministration2;
}();
function asObservableObject(target2, options) {
  var _options$name;
  if (process.env.NODE_ENV !== "production" && options && isObservableObject(target2)) {
    die("Options can't be provided for already observable objects.");
  }
  if (hasProp(target2, $mobx)) {
    if (process.env.NODE_ENV !== "production" && !(getAdministration$1(target2) instanceof ObservableObjectAdministration)) {
      die("Cannot convert '" + getDebugName(target2) + "' into observable object:\nThe target is already observable of different type.\nExtending builtins is not supported.");
    }
    return target2;
  }
  if (process.env.NODE_ENV !== "production" && !Object.isExtensible(target2)) {
    die("Cannot make the designated object observable; it is not extensible");
  }
  var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : process.env.NODE_ENV !== "production" ? (isPlainObject(target2) ? "ObservableObject" : target2.constructor.name) + "@" + getNextId() : "ObservableObject";
  var adm = new ObservableObjectAdministration(target2, /* @__PURE__ */ new Map(), String(name), getAnnotationFromOptions(options));
  addHiddenProp(target2, $mobx, adm);
  return target2;
}
var isObservableObjectAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function getCachedObservablePropDescriptor(key) {
  return descriptorCache[key] || (descriptorCache[key] = {
    get: function get3() {
      return this[$mobx].getObservablePropValue_(key);
    },
    set: function set4(value) {
      return this[$mobx].setObservablePropValue_(key, value);
    }
  });
}
function isObservableObject(thing) {
  if (isObject(thing)) {
    return isObservableObjectAdministration(thing[$mobx]);
  }
  return false;
}
function recordAnnotationApplied(adm, annotation, key) {
  var _adm$target_$storedAn;
  if (process.env.NODE_ENV !== "production") {
    adm.appliedAnnotations_[key] = annotation;
  }
  (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
}
function assertAnnotable(adm, annotation, key) {
  if (process.env.NODE_ENV !== "production" && !isAnnotation(annotation)) {
    die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
  }
  if (process.env.NODE_ENV !== "production" && !isOverride(annotation) && hasProp(adm.appliedAnnotations_, key)) {
    var fieldName = adm.name_ + "." + key.toString();
    var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.") + "\nRe-annotating fields is not allowed.\nUse 'override' annotation for methods overridden by subclass.");
  }
}
var ENTRY_0 = /* @__PURE__ */ createArrayEntryDescriptor(0);
var safariPrototypeSetterInheritanceBug = /* @__PURE__ */ function() {
  var v = false;
  var p2 = {};
  Object.defineProperty(p2, "0", {
    set: function set4() {
      v = true;
    }
  });
  Object.create(p2)["0"] = 1;
  return v === false;
}();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = function StubArray2() {
};
function inherit(ctor, proto) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ctor.prototype, proto);
  } else if (ctor.prototype.__proto__ !== void 0) {
    ctor.prototype.__proto__ = proto;
  } else {
    ctor.prototype = proto;
  }
}
inherit(StubArray, Array.prototype);
var LegacyObservableArray = /* @__PURE__ */ function(_StubArray, _Symbol$toStringTag2, _Symbol$iterator2) {
  _inheritsLoose(LegacyObservableArray2, _StubArray);
  function LegacyObservableArray2(initialValues, enhancer, name, owned) {
    var _this;
    if (name === void 0) {
      name = process.env.NODE_ENV !== "production" ? "ObservableArray@" + getNextId() : "ObservableArray";
    }
    if (owned === void 0) {
      owned = false;
    }
    _this = _StubArray.call(this) || this;
    initObservable(function() {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
      adm.proxy_ = _assertThisInitialized(_this);
      addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);
      if (initialValues && initialValues.length) {
        _this.spliceWithArray(0, 0, initialValues);
      }
      if (safariPrototypeSetterInheritanceBug) {
        Object.defineProperty(_assertThisInitialized(_this), "0", ENTRY_0);
      }
    });
    return _this;
  }
  var _proto = LegacyObservableArray2.prototype;
  _proto.concat = function concat() {
    this[$mobx].atom_.reportObserved();
    for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
      arrays[_key] = arguments[_key];
    }
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      arrays.map(function(a2) {
        return isObservableArray(a2) ? a2.slice() : a2;
      })
    );
  };
  _proto[_Symbol$iterator2] = function() {
    var self2 = this;
    var nextIndex = 0;
    return makeIterable({
      next: function next() {
        return nextIndex < self2.length ? {
          value: self2[nextIndex++],
          done: false
        } : {
          done: true,
          value: void 0
        };
      }
    });
  };
  _createClass(LegacyObservableArray2, [{
    key: "length",
    get: function get3() {
      return this[$mobx].getArrayLength_();
    },
    set: function set4(newLength) {
      this[$mobx].setArrayLength_(newLength);
    }
  }, {
    key: _Symbol$toStringTag2,
    get: function get3() {
      return "Array";
    }
  }]);
  return LegacyObservableArray2;
}(StubArray, Symbol.toStringTag, Symbol.iterator);
Object.entries(arrayExtensions).forEach(function(_ref) {
  var prop = _ref[0], fn = _ref[1];
  if (prop !== "concat") {
    addHiddenProp(LegacyObservableArray.prototype, prop, fn);
  }
});
function createArrayEntryDescriptor(index) {
  return {
    enumerable: false,
    configurable: true,
    get: function get3() {
      return this[$mobx].get_(index);
    },
    set: function set4(value) {
      this[$mobx].set_(index, value);
    }
  };
}
function createArrayBufferItem(index) {
  defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
}
function reserveArrayBuffer(max) {
  if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
      createArrayBufferItem(index);
    }
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
  }
}
reserveArrayBuffer(1e3);
function createLegacyArray(initialValues, enhancer, name) {
  return new LegacyObservableArray(initialValues, enhancer, name);
}
function getAtom(thing, property) {
  if (typeof thing === "object" && thing !== null) {
    if (isObservableArray(thing)) {
      if (property !== void 0) {
        die(23);
      }
      return thing[$mobx].atom_;
    }
    if (isObservableSet(thing)) {
      return thing.atom_;
    }
    if (isObservableMap(thing)) {
      if (property === void 0) {
        return thing.keysAtom_;
      }
      var observable2 = thing.data_.get(property) || thing.hasMap_.get(property);
      if (!observable2) {
        die(25, property, getDebugName(thing));
      }
      return observable2;
    }
    if (isObservableObject(thing)) {
      if (!property) {
        return die(26);
      }
      var _observable = thing[$mobx].values_.get(property);
      if (!_observable) {
        die(27, property, getDebugName(thing));
      }
      return _observable;
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
  } else if (isFunction(thing)) {
    if (isReaction(thing[$mobx])) {
      return thing[$mobx];
    }
  }
  die(28);
}
function getAdministration$1(thing, property) {
  if (!thing) {
    die(29);
  }
  if (property !== void 0) {
    return getAdministration$1(getAtom(thing, property));
  }
  if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
    return thing;
  }
  if (isObservableMap(thing) || isObservableSet(thing)) {
    return thing;
  }
  if (thing[$mobx]) {
    return thing[$mobx];
  }
  die(24, thing);
}
function getDebugName(thing, property) {
  var named;
  if (property !== void 0) {
    named = getAtom(thing, property);
  } else if (isAction(thing)) {
    return thing.name;
  } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
    named = getAdministration$1(thing);
  } else {
    named = getAtom(thing);
  }
  return named.name_;
}
function initObservable(cb) {
  var derivation = untrackedStart();
  var allowStateChanges2 = allowStateChangesStart(true);
  startBatch();
  try {
    return cb();
  } finally {
    endBatch();
    allowStateChangesEnd(allowStateChanges2);
    untrackedEnd(derivation);
  }
}
var toString = objectPrototype.toString;
function deepEqual(a2, b2, depth) {
  if (depth === void 0) {
    depth = -1;
  }
  return eq(a2, b2, depth);
}
function eq(a2, b2, depth, aStack, bStack) {
  if (a2 === b2) {
    return a2 !== 0 || 1 / a2 === 1 / b2;
  }
  if (a2 == null || b2 == null) {
    return false;
  }
  if (a2 !== a2) {
    return b2 !== b2;
  }
  var type = typeof a2;
  if (type !== "function" && type !== "object" && typeof b2 != "object") {
    return false;
  }
  var className = toString.call(a2);
  if (className !== toString.call(b2)) {
    return false;
  }
  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a2 === "" + b2;
    case "[object Number]":
      if (+a2 !== +a2) {
        return +b2 !== +b2;
      }
      return +a2 === 0 ? 1 / +a2 === 1 / b2 : +a2 === +b2;
    case "[object Date]":
    case "[object Boolean]":
      return +a2 === +b2;
    case "[object Symbol]":
      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a2) === Symbol.valueOf.call(b2);
    case "[object Map]":
    case "[object Set]":
      if (depth >= 0) {
        depth++;
      }
      break;
  }
  a2 = unwrap(a2);
  b2 = unwrap(b2);
  var areArrays = className === "[object Array]";
  if (!areArrays) {
    if (typeof a2 != "object" || typeof b2 != "object") {
      return false;
    }
    var aCtor = a2.constructor, bCtor = b2.constructor;
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a2 && "constructor" in b2) {
      return false;
    }
  }
  if (depth === 0) {
    return false;
  } else if (depth < 0) {
    depth = -1;
  }
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    if (aStack[length] === a2) {
      return bStack[length] === b2;
    }
  }
  aStack.push(a2);
  bStack.push(b2);
  if (areArrays) {
    length = a2.length;
    if (length !== b2.length) {
      return false;
    }
    while (length--) {
      if (!eq(a2[length], b2[length], depth - 1, aStack, bStack)) {
        return false;
      }
    }
  } else {
    var keys = Object.keys(a2);
    var key;
    length = keys.length;
    if (Object.keys(b2).length !== length) {
      return false;
    }
    while (length--) {
      key = keys[length];
      if (!(hasProp(b2, key) && eq(a2[key], b2[key], depth - 1, aStack, bStack))) {
        return false;
      }
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}
function unwrap(a2) {
  if (isObservableArray(a2)) {
    return a2.slice();
  }
  if (isES6Map(a2) || isObservableMap(a2)) {
    return Array.from(a2.entries());
  }
  if (isES6Set(a2) || isObservableSet(a2)) {
    return Array.from(a2.entries());
  }
  return a2;
}
function makeIterable(iterator) {
  iterator[Symbol.iterator] = getSelf;
  return iterator;
}
function getSelf() {
  return this;
}
function isAnnotation(thing) {
  return (
    // Can be function
    thing instanceof Object && typeof thing.annotationType_ === "string" && isFunction(thing.make_) && isFunction(thing.extend_)
  );
}
["Symbol", "Map", "Set"].forEach(function(m2) {
  var g = getGlobal();
  if (typeof g[m2] === "undefined") {
    die("MobX requires global '" + m2 + "' to be available or polyfilled");
  }
});
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy,
    extras: {
      getDebugName
    },
    $mobx
  });
}
const reaction = Symbol("LitMobxRenderReaction");
const cachedRequestUpdate = Symbol("LitMobxRequestUpdate");
function MobxReactionUpdateCustom(constructor, ReactionConstructor) {
  var _a3, _b2;
  return _b2 = class MobxReactingElement extends constructor {
    constructor() {
      super(...arguments);
      this[_a3] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const name = this.constructor.name || this.nodeName;
      this[reaction] = new ReactionConstructor(`${name}.update()`, this[cachedRequestUpdate]);
      if (this.hasUpdated)
        this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this[reaction]) {
        this[reaction].dispose();
        this[reaction] = void 0;
      }
    }
    update(changedProperties) {
      if (this[reaction]) {
        this[reaction].track(super.update.bind(this, changedProperties));
      } else {
        super.update(changedProperties);
      }
    }
  }, _a3 = cachedRequestUpdate, _b2;
}
function MobxReactionUpdate(constructor) {
  return MobxReactionUpdateCustom(constructor, Reaction);
}
class MobxLitElement extends MobxReactionUpdate(LitElement) {
}
function findContext(propertyName, element) {
  let node = element ?? this;
  while (node) {
    if (node[propertyName]) {
      return node[propertyName];
    }
    let shadowNode = node;
    while (shadowNode && shadowNode.shadowRoot) {
      shadowNode = shadowNode.shadowRoot;
      if (shadowNode[propertyName]) {
        return shadowNode[propertyName];
      }
    }
    node = node.parentNode || node.host;
  }
}
function aware(element) {
  const el = element;
  if (el.__proto__.findContext != true) {
    el.__proto__.findContext = findContext;
  }
}
LitElement.prototype.findContext = findContext;
const LitHelper = {
  findContext,
  aware
};
const baseStyle = "@tailwind base;\r\n@tailwind components;\r\n@tailwind utilities;";
const ElementMixin = (superClass) => {
  class ElementClass extends superClass {
    async updated(_changedProperties) {
      super.updated(_changedProperties);
      await this.updateComplete;
      if (this.isConnected != true)
        return;
      for (const [propertyName] of _changedProperties) {
        const pName = `${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;
        const methodName = `onChanged${pName}`;
        const method = Reflect.get(this, methodName);
        if (typeof method === "function") {
          method.call(this, this[propertyName]);
        }
      }
    }
    findContext(propertyName) {
      return LitHelper.findContext(propertyName, this);
    }
  }
  __publicField(ElementClass, "styles", [
    unsafeCSS(baseStyle),
    superClass.styles ?? []
  ]);
  return ElementClass;
};
class ElementBase extends ElementMixin(MobxLitElement) {
}
__publicField(ElementBase, "styles", [
  ElementMixin(MobxLitElement).styles
]);
provideFASTDesignSystem().register(fastButton());
let UButton = (_e = class extends ElementMixin(LitElement) {
  constructor() {
    super();
    __publicField(this, "href", null);
    __publicField(this, "appearance", null);
    // accent, lightweight, neutral, outline, stealth
    __publicField(this, "accent", false);
    __publicField(this, "disabled", false);
    __publicField(this, "command");
    __publicField(this, "commandParameter");
    if (this.hasAttribute("icon")) {
      this.appearance = "stealth";
    }
  }
  onChangedCommand(command) {
    if (command) {
      if (command.content) {
        this.innerText = command.content;
      }
      reaction$1(() => command.content, (content2) => {
        this.innerText = content2;
      });
    }
  }
  render() {
    if (this.accent) {
      this.appearance = "accent";
    } else if (this.href && this.appearance == null) {
      this.appearance = "lightweight";
    }
    return html$1`
      <fast-button id='btn' @click=${this.onClick} .appearance=${this.appearance} ?disabled=${this.disabled}>
        <slot></slot>
      </fast-button>
    `;
  }
  onClick() {
    if (this.command) {
      this.command.execute(this.commandParameter);
    } else if (this.href) {
      window.location.href = this.href;
    } else
      ;
  }
}, __publicField(_e, "styles", [
  css$1`
      :host {
        --neutral-fill-stealth-rest: none;
        --btn-min-width: 80px;
        display: inline-flex;
      }
      
      :host(.block) {
        display: block;
        width: 100%;
        padding: 0.2em 0;
      }

      :host(.block) #btn {
        display: flex;
      }

      #btn {
        min-width: var(--btn-min-width);
      }
    `
]), _e);
__decorate([
  n$1({ type: String })
], UButton.prototype, "href", void 0);
__decorate([
  n$1({ type: String, attribute: "appearance" })
], UButton.prototype, "appearance", void 0);
__decorate([
  n$1({ type: Boolean, attribute: "accent" })
], UButton.prototype, "accent", void 0);
__decorate([
  n$1({ type: Boolean, attribute: "disabled" })
], UButton.prototype, "disabled", void 0);
__decorate([
  n$1({ type: Object })
], UButton.prototype, "command", void 0);
__decorate([
  n$1()
], UButton.prototype, "commandParameter", void 0);
UButton = __decorate([
  t$2("u-button")
], UButton);
let UButtons = (_f = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "right", false);
  }
  render() {
    const alignmentClass = this.right ? "justify-end" : "justify-start";
    return html$1`
      <div class="button-container ${alignmentClass}">
        <slot></slot>
      </div>
    `;
  }
}, __publicField(_f, "styles", [
  css$1`
      :host {
        display: block;
        margin-top: 1rem;
      }
      .button-container {
        display: flex;
        gap: 4px;
      }
      .justify-end {
        justify-content: flex-end;
      }
      .justify-start {
        justify-content: flex-start;
      }
    `
]), _f);
__decorate([
  n$1({ type: Boolean })
], UButtons.prototype, "right", void 0);
UButtons = __decorate([
  t$2("u-buttons")
], UButtons);
provideFASTDesignSystem().register(fastCard());
let UCards = (_g = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "items", []);
    // [
    //   { title: "Title #1", description: "Description" },
    //   { title: "Title #2", description: "Description" },
    //   { title: "Title #3", description: "Description" },
    //   { title: "Title #4", description: "Description" },
    //   { title: "Title #5", description: "Description" },
    //   { title: "Title #6", description: "Description" },
    // ];
    __publicField(this, "selectedItem", null);
    __publicField(this, "useAdd", true);
    this.getCardElement = this.getCardElement.bind(this);
  }
  render() {
    return html$1`
        <div class="flex flex-wrap gap-2">
          ${this.items.map(this.getCardElement)}
          ${this.useAdd ? this.getAddCardElement() : null}
        </div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.onSelectedItem.bind(this);
  }
  getCardElement(item, index) {
    return html$1`
    <fast-card index=${index} class="card hover:cursor-pointer" @click=${() => this.onSelectedItem(item)}>
      <div class="label p-2">
        <h3 class="text-lg font-bold">${item.title}</h3>
        ${this.getDescriptionElement(item)}
      </div>
    </fast-card>`;
  }
  getDescriptionElement(item) {
    return html$1`<p class="text-sm font-light" style="color: #888">${item.description}</p>`;
  }
  getAddCardElement() {
    return html$1`
    <fast-card class="card hover:cursor-pointer" style="background: #888" @click=${this.onAdd}>
      <div class="flex justify-center items-center h-full">
        <div class="ui-plus-01"></div>
      </div>
    </fast-card>`;
  }
  onSelectedItem(item) {
    this.selectedItem = item;
    this.dispatchEvent(new CustomEvent("changed", { detail: this.selectedItem }));
  }
  onAdd() {
    this.dispatchEvent(new CustomEvent("clickAdd"));
  }
}, __publicField(_g, "styles", [
  css$1`
      .card {
        width: 300px; 
        height: 200px; 
        min-width: 300px;
        background: white url(https://picsum.photos/300/200) center/cover;
      }

      .label {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #222; 
        color: #eee;
      }

      .ui-plus-01 {
        position: relative;
        cursor: pointer;
        border: none;
        background-color: transparent;
        width: 30px;
        height: 30px;
      }
      .ui-plus-01:before,
      .ui-plus-01:after {
        content: "";
        height: 20%;
        width: 100%;
        background-color: var(--accent-color);
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10%;
      }
      .ui-plus-01:before {
        transform: rotate(90deg);
      }
      .ui-plus-01:before {
        transition: transform 0.3s ease;
      }
      .ui-plus-01.is-active:before {
        transform: rotate(0);
      }
            
    `
]), _g);
__decorate([
  n$1({ type: Array })
], UCards.prototype, "items", void 0);
UCards = __decorate([
  t$2("u-cards")
], UCards);
function cloneFrom(from2, to) {
  const propertyNames = Object.getOwnPropertyNames(from2);
  for (const propertyName of propertyNames) {
    if (propertyName !== "constructor") {
      to[propertyName] = from2[propertyName];
    }
  }
}
const Reflections = {
  cloneFrom
};
Array.prototype.last = function() {
  if (this.length === 0) {
    return void 0;
  }
  return this[this.length - 1];
};
Array.prototype.replaceBy = function(keySelector, newItem) {
  const itemIndex = this.findIndex((item) => keySelector(item));
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1, newItem);
    return true;
  } else {
    return false;
  }
};
Array.prototype.upsert = function(keySelector, item) {
  const itemIndex = this.findIndex((item2) => keySelector(item2));
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1, item);
  } else {
    this.push(item);
  }
};
Array.prototype.removeBy = function(keySelector) {
  const itemIndex = this.findIndex((item) => keySelector(item));
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1);
    return true;
  } else {
    return false;
  }
};
Array.prototype.remove = function(item) {
  const itemIndex = this.indexOf(item);
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1);
    return true;
  } else {
    return false;
  }
};
Array.prototype.contains = function(item) {
  const itemIndex = this.indexOf(item);
  return itemIndex !== -1;
};
Array.prototype.sortBy = function(keyFn) {
  return this.slice().sort((a2, b2) => {
    const valueA = keyFn(a2);
    const valueB = keyFn(b2);
    if (valueA < valueB)
      return -1;
    if (valueA > valueB)
      return 1;
    return 0;
  });
};
Array.prototype.except = function(excepts) {
  if (excepts == null)
    return this;
  return this.filter((item) => !excepts.includes(item));
};
Array.prototype.groupBy = function(keySelector) {
  return this.reduce((acc, item) => {
    const key = keySelector(item);
    const found = acc.find((group2) => group2.key === key);
    if (found) {
      found.value.push(item);
    } else {
      acc.push({ key, value: [item] });
    }
    return acc;
  }, []);
};
Document.prototype.findElementsWithSelector = function(selector, root = document) {
  const elements = Array.from(root.querySelectorAll("*"));
  const matchingElements = [];
  elements.forEach((element) => {
    if (element instanceof HTMLElement && element.shadowRoot) {
      const shadowElements = findElementsWithSelector(selector, element.shadowRoot);
      matchingElements.push(...shadowElements);
    }
    if (element.matches && element.matches(selector)) {
      matchingElements.push(element);
    }
  });
  return matchingElements;
};
HTMLElement.prototype.isCursorInElement = function(e2) {
  const rect = this.getBoundingClientRect();
  return e2.clientX >= rect.left && e2.clientX <= rect.right && e2.clientY >= rect.top && e2.clientY <= rect.bottom;
};
Location.prototype.getQueryParameter = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};
String.prototype.left = function(search, last = false) {
  const s2 = String(this).toString();
  return last ? s2.substring(0, s2.lastIndexOf(search)) : s2.substring(0, s2.indexOf(search));
};
String.prototype.right = function(search, last = true) {
  const s2 = String(this).toString();
  return last ? s2.substring(s2.lastIndexOf(search) + search.length) : s2.substring(s2.indexOf(search) + search.length);
};
URLSearchParams.prototype.getCaseIgnore = function(key) {
  const params = new URLSearchParams(window.location.search);
  for (const [name, value] of params) {
    if (name.toLowerCase() == key.toLowerCase()) {
      return value;
    }
  }
  return null;
};
function removeDashes(guid) {
  return guid.replace(/-/g, "");
}
function formatToGuid(value) {
  return value.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
}
const Guid = {
  removeDashes,
  formatToGuid
};
provideFASTDesignSystem().register(fastCombobox());
class ComboboxContext {
  // 키입력을 막고 선택만 가능하게 합니다. ! 구현필요
  constructor(context) {
    __publicField(this, "source", []);
    __publicField(this, "value", null);
    __publicField(this, "selectedItem");
    __publicField(this, "displayPath");
    __publicField(this, "valuePath");
    __publicField(this, "listType", false);
    Reflections.cloneFrom(context, this);
  }
}
let UCombobox = (_h = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "source", []);
    __publicField(this, "context");
    __publicField(this, "label", "");
    __publicField(this, "hint", null);
    __publicField(this, "value");
    __publicField(this, "dataContext", null);
    __publicField(this, "path", null);
  }
  onChangedContext() {
    if (this.context) {
      if (this.context.source) {
        this.source = this.context.source;
      }
      if (this.context.value) {
        this.value = this.context.value;
      }
    }
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("dataContext")) {
      if (this.dataContext && this.path) {
        const v = this.dataContext[this.path];
        if (v != null && v != void 0)
          this.value = v;
        if (this.value != v) {
          this.value = "Text";
        }
      }
    } else if (changedProperties.has("context")) {
      this.onChangedContext();
    }
  }
  getCurrentValue() {
    var _a3;
    if (this.context) {
      if (this.context.valuePath && this.context.displayPath) {
        const item = (_a3 = this.context.source) == null ? void 0 : _a3.find((item2) => item2[this.context.valuePath] == this.value);
        if (item) {
          return item[this.context.displayPath];
        }
      }
    }
    return this.value;
  }
  render() {
    var _a3;
    return html$1`
    ${this.label ? html$1`<label class="label">${this.label}</label>` : null}
    <fast-combobox 
      autocomplete="both" 
      @change=${this.changeValue} 
      placeholder=${this.hint ?? this.label} 
      value=${this.value} 
      current-value=${this.getCurrentValue()}>

      ${(_a3 = this.source) == null ? void 0 : _a3.map((item) => {
      const value = this.context != null && this.context.valuePath ? item[this.context.valuePath] : item;
      const display2 = this.context != null && this.context.displayPath ? item[this.context.displayPath] : item;
      const selected2 = this.value == value;
      return html$1`<fast-option ?selected=${selected2} value=${value} .dataContext=${item}>${display2}</fast-option>`;
    })}
    </fast-combobox>`;
  }
  changeValue(e2) {
    this.value = e2.target.currentValue;
    const option = e2.target.options[e2.target.selectedIndex];
    const item = option["dataContext"];
    const value = option.value;
    if (this.context) {
      this.context.selectedItem = item;
      this.context.value = value;
    }
    if (this.dataContext && this.path) {
      this.dataContext[this.path] = value;
    }
    this.dispatchEvent(new CustomEvent("changed", { detail: {
      text: e2.target.currentValue,
      value
    }, bubbles: true, composed: true }));
  }
}, __publicField(_h, "styles", [
  css$1`
    :host {
      display: block;
    }

    fast-combobox {
      min-width: 80px;
      width: 100%;
    }

    .label {
      display: block;
      padding: 4px 0;
    }
    `
]), _h);
__decorate([
  n$1({ type: Array })
], UCombobox.prototype, "source", void 0);
__decorate([
  n$1({ type: Object })
], UCombobox.prototype, "context", void 0);
__decorate([
  n$1({ type: String })
], UCombobox.prototype, "label", void 0);
__decorate([
  n$1({ type: String })
], UCombobox.prototype, "hint", void 0);
__decorate([
  n$1({ type: Object })
], UCombobox.prototype, "value", void 0);
__decorate([
  n$1({ type: Object })
], UCombobox.prototype, "dataContext", void 0);
__decorate([
  n$1({ type: String })
], UCombobox.prototype, "path", void 0);
UCombobox = __decorate([
  t$2("u-combobox")
], UCombobox);
let UErrors = (_i = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "errors", []);
    __publicField(this, "expanded", false);
  }
  render() {
    if (this.errors.length < 1)
      return html$1``;
    const subClass = this.expanded ? "expanded" : "";
    return html$1`
      <div id="iyu-error-msg-container">
        <div id="iyu-error-main">
          ${this.renderErrorSVG()}
          <span id="first-error">${this.errors[0]}</span>

          ${this.errors.length > 1 ? html$1` 
              <span id="error-expand-button" @click=${() => this.expanded = !this.expanded}>
                ...more[${this.errors.length - 1}]
              </span>` : html$1``}
        </div>
        <div id="iyu-error-sub" class=${subClass}>
          ${this.errors.slice(1).map((error2) => html$1` <div class="expanded-error">&#9900; ${error2}</div> `)}
        </div>
      </div>
    `;
  }
  renderErrorSVG() {
    return html$1`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
        <defs></defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 87 83.294 H 3 c -1.079 0 -2.075 -0.579 -2.608 -1.518 c -0.533 -0.938 -0.522 -2.089 0.03 -3.017 l 42 -70.588 C 42.963 7.263 43.942 6.706 45 6.706 s 2.037 0.557 2.578 1.466 l 42 70.588 c 0.552 0.928 0.563 2.079 0.029 3.017 C 89.074 82.715 88.079 83.294 87 83.294 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,188,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 63.666 c -1.888 0 -3.419 -1.53 -3.419 -3.419 V 32.693 c 0 -1.888 1.531 -3.419 3.419 -3.419 c 1.888 0 3.419 1.531 3.419 3.419 v 27.554 C 48.419 62.136 46.888 63.666 45 63.666 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(63,63,63); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 74.275 c -0.9 0 -1.778 -0.364 -2.416 -1.003 c -0.638 -0.638 -1.003 -1.516 -1.003 -2.416 c 0 -0.228 0.023 -0.444 0.068 -0.672 c 0.045 -0.216 0.102 -0.433 0.194 -0.638 c 0.08 -0.206 0.194 -0.4 0.319 -0.593 c 0.114 -0.183 0.262 -0.353 0.422 -0.513 c 0.16 -0.159 0.331 -0.296 0.512 -0.421 c 0.194 -0.126 0.388 -0.24 0.593 -0.319 c 0.205 -0.08 0.422 -0.148 0.638 -0.194 c 1.117 -0.228 2.291 0.137 3.089 0.934 c 0.638 0.639 1.003 1.516 1.003 2.416 s -0.365 1.778 -1.003 2.416 c -0.16 0.16 -0.331 0.308 -0.524 0.422 c -0.183 0.126 -0.376 0.239 -0.582 0.319 c -0.205 0.091 -0.421 0.148 -0.638 0.194 C 45.444 74.252 45.228 74.275 45 74.275 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(63,63,63); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
      </svg>
    `;
  }
}, __publicField(_i, "styles", css$1`
    #iyu-error-msg-container {
      display: block;
      width: auto;
      padding: 5px 10px 2px 10px;
      background-color: #ffdddd;
      border: 1px solid #ff0000;
      border-radius: 4px;
      color: #747474;
    }

    #iyu-error-main {
      display: flex;
      align-items: center;
      margin-bottom: 3px;
    }

    #iyu-error-main svg {
      margin-right: 5px;
    }

    #first-error {
      font-size: 14px;
    }

    #error-expand-button{
      margin-left: 5px;
      font-size: 14px;
      color: black;
      cursor: pointer;
      text-decoration: underline;
      user-select: none;
    }

    #error-expand-button:hover {
      color: #999; 
    }

    #error-expand-button:active {
      color: #333; 
    }

    #iyu-error-sub {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //text-align: left;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }

    #iyu-error-sub.expanded {
      max-height: 500px;
    }

    .expanded-error {
      margin-bottom: 3px;
      font-size: 14px;
    }
  `), _i);
__decorate([
  n$1({ type: Array })
], UErrors.prototype, "errors", void 0);
__decorate([
  n$1({ type: Boolean })
], UErrors.prototype, "expanded", void 0);
UErrors = __decorate([
  t$2("u-errors")
], UErrors);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect$1;
(function(Reflect2) {
  (function(factory) {
    var root = typeof globalThis === "object" ? globalThis : typeof commonjsGlobal === "object" ? commonjsGlobal : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
    var exporter = makeExporter(Reflect2);
    if (typeof root.Reflect !== "undefined") {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter, root);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect2;
    }
    function makeExporter(target2, previous) {
      return function(key, value) {
        Object.defineProperty(target2, key, { configurable: true, writable: true, value });
        if (previous)
          previous(key, value);
      };
    }
    function functionThis() {
      try {
        return Function("return this;")();
      } catch (_14) {
      }
    }
    function indirectEvalThis() {
      try {
        return (void 0, eval)("(function() { return this; })()");
      } catch (_14) {
      }
    }
    function sloppyModeThis() {
      return functionThis() || indirectEvalThis();
    }
  })(function(exporter, root) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function() {
        return MakeDictionary(/* @__PURE__ */ Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map2, key) {
        return hasOwn.call(map2, key);
      } : function(map2, key) {
        return key in map2;
      },
      get: downLevel ? function(map2, key) {
        return hasOwn.call(map2, key) ? map2[key] : void 0;
      } : function(map2, key) {
        return map2[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
    var metadataRegistry = GetOrCreateMetadataRegistry();
    var metadataProvider = CreateMetadataProvider(metadataRegistry);
    function decorate(decorators, target2, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target2))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target2, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target2))
          throw new TypeError();
        return DecorateConstructor(decorators, target2);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target2, propertyKey) {
        if (!IsObject(target2))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target2, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target2, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target2, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target2, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target2, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target2, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target2, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target2, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target2, propertyKey) {
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      if (!IsObject(target2))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var provider = GetMetadataProvider(
        target2,
        propertyKey,
        /*Create*/
        false
      );
      if (IsUndefined(provider))
        return false;
      return provider.OrdinaryDeleteMetadata(metadataKey, target2, propertyKey);
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target2) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target2);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target2 = decorated;
        }
      }
      return target2;
    }
    function DecorateProperty(decorators, target2, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target2, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var provider = GetMetadataProvider(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(provider))
        return false;
      return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var provider = GetMetadataProvider(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(provider))
        return;
      return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var provider = GetMetadataProvider(
        O,
        P,
        /*Create*/
        true
      );
      provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys3 = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null)
        return ownKeys3;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0)
        return ownKeys3;
      if (ownKeys3.length <= 0)
        return parentKeys;
      var set4 = new _Set();
      var keys = [];
      for (var _i2 = 0, ownKeys_1 = ownKeys3; _i2 < ownKeys_1.length; _i2++) {
        var key = ownKeys_1[_i2];
        var hasKey = set4.has(key);
        if (!hasKey) {
          set4.add(key);
          keys.push(key);
        }
      }
      for (var _a3 = 0, parentKeys_1 = parentKeys; _a3 < parentKeys_1.length; _a3++) {
        var key = parentKeys_1[_a3];
        var hasKey = set4.has(key);
        if (!hasKey) {
          set4.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var provider = GetMetadataProvider(
        O,
        P,
        /*create*/
        false
      );
      if (!provider) {
        return [];
      }
      return provider.OrdinaryOwnMetadataKeys(O, P);
    }
    function Type(x) {
      if (x === null)
        return 1;
      switch (typeof x) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x) {
      return x === void 0;
    }
    function IsNull(x) {
      return x === null;
    }
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(
        argument,
        3
        /* String */
      );
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function SameValueZero(x, y2) {
      return x === y2 || x !== x && y2 !== y2;
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f2 = iterator["return"];
      if (f2)
        f2.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O)
        return proto;
      return constructor;
    }
    function CreateMetadataRegistry() {
      var fallback;
      if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
        fallback = CreateFallbackProvider(root.Reflect);
      }
      var first;
      var second;
      var rest;
      var targetProviderMap = new _WeakMap();
      var registry = {
        registerProvider,
        getProvider,
        setProvider
      };
      return registry;
      function registerProvider(provider) {
        if (!Object.isExtensible(registry)) {
          throw new Error("Cannot add provider to a frozen registry.");
        }
        switch (true) {
          case fallback === provider:
            break;
          case IsUndefined(first):
            first = provider;
            break;
          case first === provider:
            break;
          case IsUndefined(second):
            second = provider;
            break;
          case second === provider:
            break;
          default:
            if (rest === void 0)
              rest = new _Set();
            rest.add(provider);
            break;
        }
      }
      function getProviderNoCache(O, P) {
        if (!IsUndefined(first)) {
          if (first.isProviderFor(O, P))
            return first;
          if (!IsUndefined(second)) {
            if (second.isProviderFor(O, P))
              return first;
            if (!IsUndefined(rest)) {
              var iterator = GetIterator(rest);
              while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                  return void 0;
                }
                var provider = IteratorValue(next);
                if (provider.isProviderFor(O, P)) {
                  IteratorClose(iterator);
                  return provider;
                }
              }
            }
          }
        }
        if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
          return fallback;
        }
        return void 0;
      }
      function getProvider(O, P) {
        var providerMap = targetProviderMap.get(O);
        var provider;
        if (!IsUndefined(providerMap)) {
          provider = providerMap.get(P);
        }
        if (!IsUndefined(provider)) {
          return provider;
        }
        provider = getProviderNoCache(O, P);
        if (!IsUndefined(provider)) {
          if (IsUndefined(providerMap)) {
            providerMap = new _Map();
            targetProviderMap.set(O, providerMap);
          }
          providerMap.set(P, provider);
        }
        return provider;
      }
      function hasProvider(provider) {
        if (IsUndefined(provider))
          throw new TypeError();
        return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
      }
      function setProvider(O, P, provider) {
        if (!hasProvider(provider)) {
          throw new Error("Metadata provider not registered.");
        }
        var existingProvider = getProvider(O, P);
        if (existingProvider !== provider) {
          if (!IsUndefined(existingProvider)) {
            return false;
          }
          var providerMap = targetProviderMap.get(O);
          if (IsUndefined(providerMap)) {
            providerMap = new _Map();
            targetProviderMap.set(O, providerMap);
          }
          providerMap.set(P, provider);
        }
        return true;
      }
    }
    function GetOrCreateMetadataRegistry() {
      var metadataRegistry2;
      if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
        metadataRegistry2 = root.Reflect[registrySymbol];
      }
      if (IsUndefined(metadataRegistry2)) {
        metadataRegistry2 = CreateMetadataRegistry();
      }
      if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
        Object.defineProperty(root.Reflect, registrySymbol, {
          enumerable: false,
          configurable: false,
          writable: false,
          value: metadataRegistry2
        });
      }
      return metadataRegistry2;
    }
    function CreateMetadataProvider(registry) {
      var metadata2 = new _WeakMap();
      var provider = {
        isProviderFor: function(O, P) {
          var targetMetadata = metadata2.get(O);
          if (IsUndefined(targetMetadata))
            return false;
          return targetMetadata.has(P);
        },
        OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
        OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
        OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
        OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
        OrdinaryDeleteMetadata
      };
      metadataRegistry.registerProvider(provider);
      return provider;
      function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = metadata2.get(O);
        var createdTargetMetadata = false;
        if (IsUndefined(targetMetadata)) {
          if (!Create)
            return void 0;
          targetMetadata = new _Map();
          metadata2.set(O, targetMetadata);
          createdTargetMetadata = true;
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
          if (!Create)
            return void 0;
          metadataMap = new _Map();
          targetMetadata.set(P, metadataMap);
          if (!registry.setProvider(O, P, provider)) {
            targetMetadata.delete(P);
            if (createdTargetMetadata) {
              metadata2.delete(O);
            }
            throw new Error("Wrong provider for target.");
          }
        }
        return metadataMap;
      }
      function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      }
      function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return void 0;
        return metadataMap.get(MetadataKey);
      }
      function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          true
        );
        metadataMap.set(MetadataKey, MetadataValue);
      }
      function OrdinaryOwnMetadataKeys2(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
          var next = IteratorStep(iterator);
          if (!next) {
            keys.length = k;
            return keys;
          }
          var nextValue = IteratorValue(next);
          try {
            keys[k] = nextValue;
          } catch (e2) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e2;
            }
          }
          k++;
        }
      }
      function OrdinaryDeleteMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return false;
        if (!metadataMap.delete(MetadataKey))
          return false;
        if (metadataMap.size === 0) {
          var targetMetadata = metadata2.get(O);
          if (!IsUndefined(targetMetadata)) {
            targetMetadata.delete(P);
            if (targetMetadata.size === 0) {
              metadata2.delete(targetMetadata);
            }
          }
        }
        return true;
      }
    }
    function CreateFallbackProvider(reflect) {
      var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
      var metadataOwner = new _WeakMap();
      var provider = {
        isProviderFor: function(O, P) {
          var metadataPropertySet = metadataOwner.get(O);
          if (!IsUndefined(metadataPropertySet)) {
            return metadataPropertySet.has(P);
          }
          if (getOwnMetadataKeys2(O, P).length) {
            if (IsUndefined(metadataPropertySet)) {
              metadataPropertySet = new _Set();
              metadataOwner.set(O, metadataPropertySet);
            }
            metadataPropertySet.add(P);
            return true;
          }
          return false;
        },
        OrdinaryDefineOwnMetadata: defineMetadata2,
        OrdinaryHasOwnMetadata: hasOwnMetadata2,
        OrdinaryGetOwnMetadata: getOwnMetadata2,
        OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
        OrdinaryDeleteMetadata: deleteMetadata2
      };
      return provider;
    }
    function GetMetadataProvider(O, P, Create) {
      var registeredProvider = metadataRegistry.getProvider(O, P);
      if (!IsUndefined(registeredProvider)) {
        return registeredProvider;
      }
      if (Create) {
        if (metadataRegistry.setProvider(O, P, metadataProvider)) {
          return metadataProvider;
        }
        throw new Error("Illegal state.");
      }
      return void 0;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = (
        /** @class */
        function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: void 0, done: true };
          };
          MapIterator2.prototype.throw = function(error2) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error2;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }()
      );
      var Map2 = (
        /** @class */
        function() {
          function Map3() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map3.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map3.prototype.has = function(key) {
            return this._find(
              key,
              /*insert*/
              false
            ) >= 0;
          };
          Map3.prototype.get = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            return index >= 0 ? this._values[index] : void 0;
          };
          Map3.prototype.set = function(key, value) {
            var index = this._find(
              key,
              /*insert*/
              true
            );
            this._values[index] = value;
            return this;
          };
          Map3.prototype.delete = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            if (index >= 0) {
              var size = this._keys.length;
              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (SameValueZero(key, this._cacheKey)) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map3.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map3.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map3.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map3.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map3.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map3.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map3.prototype._find = function(key, insert) {
            if (!SameValueZero(this._cacheKey, key)) {
              this._cacheIndex = -1;
              for (var i = 0; i < this._keys.length; i++) {
                if (SameValueZero(this._keys[i], key)) {
                  this._cacheIndex = i;
                  break;
                }
              }
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map3;
        }()
      );
      return Map2;
      function getKey(key, _14) {
        return key;
      }
      function getValue(_14, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      var Set2 = (
        /** @class */
        function() {
          function Set3() {
            this._map = new _Map();
          }
          Object.defineProperty(Set3.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set3.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set3.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set3.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set3.prototype.clear = function() {
            this._map.clear();
          };
          Set3.prototype.keys = function() {
            return this._map.keys();
          };
          Set3.prototype.values = function() {
            return this._map.keys();
          };
          Set3.prototype.entries = function() {
            return this._map.entries();
          };
          Set3.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set3.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set3;
        }()
      );
      return Set2;
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target2) {
            var table = GetOrCreateWeakMapTable(
              target2,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target2) {
            var table = GetOrCreateWeakMapTable(
              target2,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target2, value) {
            var table = GetOrCreateWeakMapTable(
              target2,
              /*create*/
              true
            );
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target2) {
            var table = GetOrCreateWeakMapTable(
              target2,
              /*create*/
              false
            );
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }()
      );
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target2, create2) {
        if (!hasOwn.call(target2, rootKey)) {
          if (!create2)
            return void 0;
          Object.defineProperty(target2, rootKey, { value: HashMap.create() });
        }
        return target2[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i)
          buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect$1 || (Reflect$1 = {}));
const propertyKeyName = "propertyMeta";
const propertyMetaKey = Symbol(propertyKeyName);
const objectName = "Object";
const __propertyMeta = {};
document.__propertyMeta__ = __propertyMeta;
function propertyMeta(metadata) {
  return (target2, propertyKey) => {
    try {
      Reflect.defineMetadata(propertyMetaKey, metadata, target2, propertyKey);
    } catch {
    }
    const key = target2.constructor.name;
    if (__propertyMeta[key] === void 0) {
      __propertyMeta[key] = {};
    }
    __propertyMeta[key][propertyKey] = metadata;
  };
}
function getPropertyMeta(target2, propertyKey) {
  let metadata = void 0;
  try {
    metadata = Reflect.getMetadata(propertyMetaKey, target2, propertyKey);
    if (metadata) {
      return metadata;
    }
  } catch {
  }
  if (metadata === void 0) {
    const key = target2.constructor.name;
    if (__propertyMeta[key] === void 0) {
      if (target2.constructor.name === objectName) {
        return void 0;
      } else {
        return getPropertyMeta(__propertyMeta, propertyKey);
      }
    } else {
      return __propertyMeta[key][propertyKey];
    }
  }
  return metadata;
}
provideFASTDesignSystem().register(fastTextField(), fastTextArea(), fastNumberField(), fastCheckbox(), fastCombobox(), fastOption());
var InputTypes;
(function(InputTypes2) {
  InputTypes2[InputTypes2["text"] = 0] = "text";
  InputTypes2[InputTypes2["email"] = 1] = "email";
  InputTypes2[InputTypes2["password"] = 2] = "password";
  InputTypes2[InputTypes2["tel"] = 3] = "tel";
  InputTypes2[InputTypes2["url"] = 4] = "url";
  InputTypes2[InputTypes2["checkbox"] = 5] = "checkbox";
  InputTypes2[InputTypes2["number"] = 6] = "number";
  InputTypes2[InputTypes2["date"] = 7] = "date";
  InputTypes2[InputTypes2["time"] = 8] = "time";
  InputTypes2[InputTypes2["datetime"] = 9] = "datetime";
})(InputTypes || (InputTypes = {}));
let UInput = (_j = class extends ElementMixin(LitElement) {
  constructor() {
    super(...arguments);
    __publicField(this, "type", InputTypes.text);
    __publicField(this, "value", null);
    __publicField(this, "label", null);
    __publicField(this, "hint", null);
    __publicField(this, "required", false);
    __publicField(this, "context", null);
    __publicField(this, "path", null);
    __publicField(this, "skipUpdate", false);
    // context[path] = value; 값이 변경될 때 업데이트하지 않습니다.
    __publicField(this, "readonly", false);
    __publicField(this, "autoFocus", false);
    __publicField(this, "multiline", false);
    __publicField(this, "pattern", null);
    __publicField(this, "updatedAction", null);
    __publicField(this, "errorMessage", null);
    __publicField(this, "lastContext", null);
    __publicField(this, "lastPath", null);
  }
  async updated(_changedProperties) {
    super.updated(_changedProperties);
    await this.updateComplete;
    if (this.context && this.path) {
      if (this.context == this.lastContext && this.path == this.lastPath)
        return;
      this.lastContext = this.context;
      this.lastPath = this.path;
      this.autoWire(this.context, this.path);
    }
  }
  autoWire(context, path2) {
    const options = getPropertyMeta(context, path2);
    if (options) {
      if (options.label) {
        this.label = options.label;
      }
      if (options.hint) {
        this.hint = options.hint;
      }
      if (options.required) {
        this.required = options.required;
      }
      if (options.type) {
        const typeName = options.type.name;
        if (typeName == "String") {
          this.type = InputTypes.text;
        }
        if (typeName == "Boolean") {
          this.type = InputTypes.checkbox;
        }
        if (typeName == "Number") {
          this.type = InputTypes.number;
        }
      }
      if (options.format) {
        const inputType = InputTypes[options.format];
        if (inputType == void 0) {
          throw `not suppreted ${options.format}`;
        } else {
          this.type = inputType;
        }
      }
    }
    if (this.hint == null) {
      if (this.label) {
        this.hint = this.label;
      } else {
        this.hint = path2;
      }
    }
    const v = context[path2];
    this.value = v == void 0 ? "" : v;
  }
  render() {
    return html$1`
      ${this.renderInput()}
      ${this.renderError()}
    `;
  }
  renderInput() {
    if (this.type == InputTypes.checkbox || this.type == InputTypes[InputTypes.checkbox]) {
      return this.renderCheckbox();
    } else if (this.type == InputTypes.email || this.type == InputTypes[InputTypes.email]) {
      return this.renderText("email");
    } else if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
      return this.renderNumber();
    } else if (this.type == InputTypes.date || this.type == InputTypes[InputTypes.date]) {
      return html$1`<input type="date">`;
    } else if (this.type == InputTypes.time || this.type == InputTypes[InputTypes.time]) {
      return html$1`<input type="time">`;
    } else if (this.type == InputTypes.datetime || this.type == InputTypes[InputTypes.datetime]) {
      return html$1`<input type="datetime-local">`;
    } else {
      let inputType = this.type;
      if (typeof this.type == "number") {
        inputType = InputTypes[this.type];
      }
      if (this.multiline) {
        return this.renderTextArea(`${inputType}`);
      } else {
        return this.renderText(`${inputType}`);
      }
    }
  }
  renderError() {
    if (this.errorMessage) {
      return html$1`<div style="color: red; font-size: 12px;">${this.errorMessage}</div>`;
    }
    return html$1``;
  }
  renderText(type) {
    const pattern = this.pattern ?? this.getPatternByType(type);
    return html$1`
    <fast-text-field @change=${this.onChangeTextField}
      .type=${type}
      .value=${this.value} 
      .placeholder=${this.hint ?? this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      pattern=${pattern}
      tabindex=0>
      ${this.label && this.required ? html$1`<span style="color:red;">&#42;</span>` : html$1``}
      ${this.label}
    </fast-text-field>
    `;
  }
  renderTextArea(type) {
    return html$1`
    <fast-text-area @change=${(e2) => {
      this.value = e2.target.value.trim();
      this.onChange(this.value);
      e2.cancelBubble = true;
    }} 
      .type=${type}
      .value=${this.value} 
      .placeholder=${this.hint ?? this.label}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label && this.required ? html$1`<span style="color:red;">&#42;</span>` : html$1``}
      ${this.label}
    </fast-text-area>
    `;
  }
  renderCheckbox() {
    return html$1`
    <fast-checkbox @change=${(e2) => {
      this.value = e2.target.currentChecked;
      this.onChange(this.value);
      e2.cancelBubble = true;
    }} 
      ?checked=${this.value}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label}
    </fast-checkbox>`;
  }
  renderNumber() {
    return html$1`
    <fast-number-field @change=${(e2) => {
      this.value = e2.target.value !== null ? Number(e2.target.value) : null;
      this.onChange(this.value);
      e2.cancelBubble = true;
    }}
      .value=${this.value} 
      .placeholder=${this.hint ?? this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label && this.required ? html$1`<span style="color:red;">&#42;</span>` : html$1``}
      ${this.label}
    </fast-number-field>
    `;
  }
  onChangeTextField(e2) {
    const value = e2.target.value;
    const pattern = e2.target.pattern;
    if (this.validate(value, pattern)) {
      this.value = e2.target.value.trim();
      this.onChange(this.value);
      e2.cancelBubble = true;
    }
  }
  validate(value, pattern) {
    if (value && pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        this.errorMessage = "입력된 값이 유효하지 않습니다.";
        return false;
      }
    }
    this.errorMessage = null;
    return true;
  }
  onChange(value) {
    if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
      if (value == "") {
        value = null;
      }
    }
    const event = new CustomEvent("change", { detail: { value } });
    this.dispatchEvent(event);
    if (this.skipUpdate != true && this.context && this.path) {
      if (isObservableObject(this.context)) {
        runInAction(() => {
          this.context[this.path] = value;
        });
      } else {
        this.context[this.path] = value;
      }
    }
    if (this.updatedAction && this.path) {
      this.updatedAction(this.path, value, this.context);
    }
  }
  getPatternByType(type) {
    if (type == null || type == void 0 || type == "text") {
      return null;
    } else if (type == "email") {
      return "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";
    } else if (type == "tel") {
      return "^[-+()0-9]+$";
    } else if (type == "url") {
      return "^((http|https):\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}((:[0-9]{1,5})?\\/.*)?$";
    } else if (type == "password") {
      return "[0-9a-zA-Z!@#$%^&*()-_=+]";
    } else {
      return null;
    }
  }
}, __publicField(_j, "styles", [
  css$1`
    :host {
      display: block;
    }

    :host(:focus-within) {
      outline: none;
    }

    fast-text-field {
      display: block;
      margin: 2px 0px;
    }

    fast-text-area {
      display: block;
      margin: 2px 0px;
    }

    fast-number-field {
      display: block;
      margin: 2px 0px;      
    }
    
    fast-checkbox {
      margin: 4px 0px 4px 0px;
    }
    `
]), _j);
__decorate([
  n$1({ type: InputTypes })
], UInput.prototype, "type", void 0);
__decorate([
  n$1()
], UInput.prototype, "value", void 0);
__decorate([
  n$1({ type: String })
], UInput.prototype, "label", void 0);
__decorate([
  n$1({ type: String })
], UInput.prototype, "hint", void 0);
__decorate([
  n$1({ type: Boolean })
], UInput.prototype, "required", void 0);
__decorate([
  n$1({ type: Object })
], UInput.prototype, "context", void 0);
__decorate([
  n$1({ type: String })
], UInput.prototype, "path", void 0);
__decorate([
  n$1({ type: Boolean, attribute: "skip-update" })
], UInput.prototype, "skipUpdate", void 0);
__decorate([
  n$1({ type: Boolean })
], UInput.prototype, "readonly", void 0);
__decorate([
  n$1({ type: Boolean, attribute: "auto-focus" })
], UInput.prototype, "autoFocus", void 0);
__decorate([
  n$1({ type: Boolean, attribute: true })
], UInput.prototype, "multiline", void 0);
__decorate([
  n$1({ type: String })
], UInput.prototype, "pattern", void 0);
__decorate([
  n$1({ type: Function })
], UInput.prototype, "updatedAction", void 0);
__decorate([
  n$1({ type: String })
], UInput.prototype, "errorMessage", void 0);
UInput = __decorate([
  t$2("u-input")
], UInput);
let UPopup = (_k = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "anchorElement", null);
    __publicField(this, "viewportElement", null);
    __publicField(this, "isOpen", false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  render() {
    this.ensureEvent();
    return html$1`<h1><slot></slot></h1>`;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEvents();
  }
  ensureEvent() {
    this.removeEvents();
    if (this.anchorElement) {
      this.anchorElement.addEventListener("click", this.open);
    }
    if (this.viewportElement) {
      this.viewportElement.addEventListener("click", this.close);
    }
  }
  removeEvents() {
    if (this.anchorElement) {
      this.anchorElement.removeEventListener("click", this.open);
    }
    if (this.viewportElement) {
      this.viewportElement.removeEventListener("click", this.close);
    }
  }
  open(e2) {
    if (this.anchorElement && this.isOpen != true) {
      this.isOpen = true;
      e2.stopImmediatePropagation();
      this.dispatchEvent(new CustomEvent("on-opening", { bubbles: true, composed: true }));
      this.style.display = "block";
      this.style.position = "absolute";
      this.style.zIndex = "9999";
      const anchorRect = this.anchorElement.getBoundingClientRect();
      const popupRect = this.getBoundingClientRect();
      if (anchorRect.bottom + popupRect.height > window.innerHeight) {
        this.style.top = anchorRect.top - popupRect.height + "px";
      } else {
        this.style.top = anchorRect.bottom + "px";
      }
      if (anchorRect.right + popupRect.width > window.innerWidth) {
        this.style.left = anchorRect.left - popupRect.width + "px";
      } else {
        this.style.left = anchorRect.right + "px";
      }
    }
  }
  close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.style.display = "none";
    }
  }
}, __publicField(_k, "styles", [
  css$1`
    :host {
      display: none;
    }
    `
]), _k);
__decorate([
  n$1({ type: Object })
], UPopup.prototype, "anchorElement", void 0);
__decorate([
  n$1({ type: Object })
], UPopup.prototype, "viewportElement", void 0);
__decorate([
  r()
], UPopup.prototype, "isOpen", void 0);
UPopup = __decorate([
  t$2("u-popup")
], UPopup);
let ViewBox = (_l = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "resizeObserver");
    __publicField(this, "mutationObserver");
    this.resizeObserver = new ResizeObserver(() => this.adjustScale());
    this.mutationObserver = new MutationObserver(() => this.adjustScale());
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    var _a3;
    const slot = (_a3 = this.shadowRoot) == null ? void 0 : _a3.querySelector("slot");
    if (slot) {
      this.mutationObserver.observe(slot, { childList: true });
    }
    this.adjustScale();
  }
  adjustScale() {
    var _a3;
    const container2 = (_a3 = this.shadowRoot) == null ? void 0 : _a3.querySelector(".container");
    if (container2) {
      const originalTransform = container2.style.transform;
      container2.style.transform = "scale(1)";
      const rect = container2.getBoundingClientRect();
      container2.style.transform = originalTransform;
      const scaleX = this.clientWidth / rect.width;
      const scaleY = this.clientHeight / rect.height;
      const scale = Math.min(scaleX, scaleY);
      container2.style.transform = `scale(${scale})`;
    }
  }
  render() {
    return html$1`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}, __publicField(_l, "styles", css$1`
    :host {
      display: block;
      position: relative;
    }

    .container {
      transform-origin: top left;
    }
  `), _l);
ViewBox = __decorate([
  t$2("view-box")
], ViewBox);
provideFASTDesignSystem().register(fastDialog());
let BlankDialog = (_m = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "dialog");
    __publicField(this, "content", null);
    __publicField(this, "resolve");
    __publicField(this, "reject");
  }
  render() {
    return html$1`
      <fast-dialog id="dialog" modal="true" hidden>
        ${this.content}
        <button id="close-button" @click=${this.cancel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
        </button>
      </fast-dialog>
    `;
  }
  ok() {
    this.close();
    if (this.resolve) {
      this.resolve({
        success: true,
        value: this.content
      });
    }
  }
  cancel() {
    this.close();
    if (this.reject) {
      this.reject();
    }
  }
  async showAsync() {
    await this.updateComplete;
    this.visible();
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      if (this.content && this.content.loadPromise) {
        this.content.loadPromise(resolve, reject);
      }
    }).catch((_error) => {
      return { success: false, value: _error };
    });
  }
  visible() {
    if (this.dialog) {
      this.dialog.show();
    }
    this.hidden = false;
  }
  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    this.hidden = true;
  }
}, __publicField(_m, "styles", [
  unsafeCSS(baseStyle),
  css$1`
    :host {
      z-index: 999; 
      position: absolute;
    }
    
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }
    `
]), _m);
__decorate([
  e$1("#dialog")
], BlankDialog.prototype, "dialog", void 0);
__decorate([
  n$1()
], BlankDialog.prototype, "content", void 0);
BlankDialog = __decorate([
  t$2("blank-dialog")
], BlankDialog);
provideFASTDesignSystem().register(fastDialog(), fastButton());
let ContentDialog = (_n = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "positiveText", "Ok");
    __publicField(this, "negativeText", "Cancel");
    __publicField(this, "useNegative", false);
    __publicField(this, "hiddenButtons", false);
    __publicField(this, "boundCancel", () => {
    });
    __publicField(this, "dialog");
    __publicField(this, "errors");
    __publicField(this, "title", "");
    __publicField(this, "content", null);
    __publicField(this, "resolve");
    __publicField(this, "reject");
    __publicField(this, "validationHandler");
    this.boundCancel = this.cancel.bind(this);
  }
  async connectedCallback() {
    var _a3;
    super.connectedCallback();
    await this.updateComplete;
    (_a3 = this.dialog) == null ? void 0 : _a3.addEventListener("cancel", this.boundCancel);
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this.dialog) == null ? void 0 : _a3.removeEventListener("cancel", this.boundCancel);
    super.disconnectedCallback();
  }
  render() {
    var _a3;
    return html$1`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <h2>${this.title}</h2>
          ${this.content}
          ${(_a3 = this.errors) == null ? void 0 : _a3.map((p2) => html$1`<div class="row" style="color: var(--accent-foreground-rest)">${p2}</div>`)}
          ${this.hiddenButtons ? null : html$1`
            <div class="row" style="justify-content: end; padding-top: 4px">
              ${this.useNegative ? html$1`<fast-button @click=${this.cancel}>${this.negativeText}</fast-button>` : null}
              <fast-button @click=${this.ok}>${this.positiveText}</fast-button>
            </div>`}
        </div>
      </fast-dialog>
    `;
  }
  ok() {
    if (this.validationHandler) {
      const errors2 = this.validationHandler();
      if (errors2.length > 0) {
        this.errors = errors2;
        return;
      }
    }
    this.close();
    if (this.resolve) {
      this.resolve({
        success: true,
        value: this.content
      });
    }
  }
  cancel() {
    this.close();
    if (this.reject) {
      this.reject();
    }
  }
  async showAsync(title2) {
    await this.updateComplete;
    this.title = title2;
    this.visible();
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      return { success: false, value: _error };
    });
  }
  visible() {
    if (this.dialog) {
      this.dialog.show();
    }
    this.hidden = false;
  }
  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    this.hidden = true;
  }
}, __publicField(_n, "styles", [
  css$1`
    :host {
      z-index: 999; 
      position: absolute;
    }
    
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }
    
    fast-button {
      min-width: 80px;
      margin: 0px 4px;
    }
    `
]), _n);
__decorate([
  e$1("#dialog")
], ContentDialog.prototype, "dialog", void 0);
__decorate([
  r()
], ContentDialog.prototype, "errors", void 0);
__decorate([
  n$1({ type: String })
], ContentDialog.prototype, "title", void 0);
__decorate([
  n$1({ attribute: false })
], ContentDialog.prototype, "content", void 0);
ContentDialog = __decorate([
  t$2("content-dialog")
], ContentDialog);
function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}
function validateTel(value) {
  const regex = /^(?:|\+\d+\s*)(?:|\d{2,3}(?:|-))\d{3,4}(?:|-)\d{4}$/;
  return regex.test(value);
}
function validatePath(obj, path2) {
  const errors2 = [];
  const meta = getPropertyMeta(obj, path2);
  if (meta == null)
    return errors2;
  const key = `[${meta.label ?? path2}]`;
  const value = obj[path2];
  if (meta.required && (value == null || value.length < 1)) {
    errors2.push(`Required ${key} Field`);
    return errors2;
  }
  if (value == null || value.length < 1)
    return errors2;
  if (meta.minLength && meta.minLength > value.length) {
    errors2.push(`At least ${meta.minLength} characters are required for ${key}`);
  }
  if (meta.maxLength && meta.maxLength < value.length) {
    errors2.push(`Up to ${meta.maxLength} characters are allowed for ${key}`);
  }
  if (meta.format) {
    if (meta.format == "email" && validateEmail(value) != true) {
      errors2.push(`${key} is not an email format`);
    } else if (meta.format == "tel" && validateTel(value) != true) {
      errors2.push(`${key} is not a phone number format`);
    }
  }
  if (meta.regex) {
    const r2 = meta.regex.test(value);
    if (r2 == false) {
      errors2.push(`${key} is not a valid format.`);
    }
  }
  return errors2;
}
function validate(obj, ...paths) {
  const errors2 = [];
  if (paths.length > 0) {
    paths.forEach((path2) => {
      validatePath(obj, path2).forEach((e2) => {
        errors2.push(e2);
      });
    });
  } else {
    Object.keys(obj).forEach((key) => {
      validatePath(obj, key).forEach((e2) => {
        errors2.push(e2);
      });
    });
  }
  return errors2;
}
const Validations = {
  validateEmail,
  validateTel,
  validatePath,
  validate
};
provideFASTDesignSystem().register(fastDialog(), fastButton());
let InputDialog = (_o = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "boundCancel", () => {
    });
    __publicField(this, "dialog");
    __publicField(this, "title", "");
    __publicField(this, "message", "");
    __publicField(this, "format", "");
    __publicField(this, "value", "");
    __publicField(this, "resolve");
    __publicField(this, "reject");
    this.boundCancel = this.cancel.bind(this);
  }
  async connectedCallback() {
    var _a3;
    super.connectedCallback();
    await this.updateComplete;
    (_a3 = this.dialog) == null ? void 0 : _a3.addEventListener("cancel", this.boundCancel);
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this.dialog) == null ? void 0 : _a3.removeEventListener("cancel", this.boundCancel);
    super.disconnectedCallback();
  }
  render() {
    return html$1`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <h2>${this.title}</h2>
          <p>${this.message}</p>
          <u-input 
            @change=${(e2) => this.value = e2.detail.value} 
            value=${this.value} 
            label='' 
            type=${this.format} 
            auto-focus>
          </u-input>
          <div class="row" style="justify-content: end">
            <fast-button @click=${this.ok}>Ok</fast-button>
          </div>
        </div>
      </fast-dialog>
    `;
  }
  ok() {
    if (this.format == "email") {
      if (Validations.validateEmail(this.value) != true) {
        return;
      }
    }
    this.close();
    if (this.resolve) {
      this.resolve({
        success: true,
        value: this.value
      });
    }
  }
  cancel() {
    this.close();
    if (this.reject) {
      this.reject();
    }
  }
  async showAsync(title2, message, options) {
    await this.updateComplete;
    this.title = title2;
    this.message = message;
    this.format = (options == null ? void 0 : options.format) ?? "";
    this.value = (options == null ? void 0 : options.value) ?? "";
    this.visible();
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      return { success: false, value: _error };
    });
  }
  visible() {
    if (this.dialog) {
      this.dialog.show();
    }
    this.hidden = false;
  }
  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    this.hidden = true;
  }
}, __publicField(_o, "styles", [
  css$1`
    :host {
      z-index: 999; 
      position: absolute;
    }
        
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }    
    `
]), _o);
__decorate([
  e$1("#dialog")
], InputDialog.prototype, "dialog", void 0);
__decorate([
  n$1()
], InputDialog.prototype, "title", void 0);
__decorate([
  n$1()
], InputDialog.prototype, "message", void 0);
__decorate([
  n$1()
], InputDialog.prototype, "format", void 0);
__decorate([
  n$1()
], InputDialog.prototype, "value", void 0);
InputDialog = __decorate([
  t$2("input-dialog")
], InputDialog);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = /* @__PURE__ */ new Set(["children", "localName", "ref", "style", "className"]), n2 = /* @__PURE__ */ new WeakMap(), t = (e2, t2, l2, o2, a2) => {
  const s2 = a2 == null ? void 0 : a2[t2];
  void 0 === s2 || l2 === o2 ? (e2[t2] = l2, null == l2 && t2 in HTMLElement.prototype && e2.removeAttribute(t2)) : ((e3, t3, l3) => {
    let o3 = n2.get(e3);
    void 0 === o3 && n2.set(e3, o3 = /* @__PURE__ */ new Map());
    let a3 = o3.get(t3);
    void 0 !== l3 ? void 0 === a3 ? (o3.set(t3, a3 = { handleEvent: l3 }), e3.addEventListener(t3, a3)) : a3.handleEvent = l3 : void 0 !== a3 && (o3.delete(t3), e3.removeEventListener(t3, a3));
  })(e2, s2, l2);
}, l = ({ react: n3, tagName: l2, elementClass: o2, events: a2, displayName: s2 }) => {
  const c2 = new Set(Object.keys(a2 ?? {})), i = n3.forwardRef((s3, i2) => {
    const r2 = n3.useRef(null), d2 = n3.useRef(null), f2 = {}, u2 = {};
    for (const [n4, t2] of Object.entries(s3))
      e.has(n4) ? f2["className" === n4 ? "class" : n4] = t2 : c2.has(n4) || n4 in o2.prototype ? u2[n4] = t2 : f2[n4] = t2;
    return n3.useLayoutEffect(() => {
      if (null !== d2.current) {
        for (const e2 in u2)
          t(d2.current, e2, s3[e2], r2.current ? r2.current[e2] : void 0, a2);
        r2.current = s3;
      }
    }), n3.useLayoutEffect(() => {
      var _a3;
      (_a3 = d2.current) == null ? void 0 : _a3.removeAttribute("defer-hydration");
    }, []), f2.suppressHydrationWarning = true, n3.createElement(l2, { ...f2, ref: n3.useCallback((e2) => {
      d2.current = e2, "function" == typeof i2 ? i2(e2) : null !== i2 && (i2.current = e2);
    }, [i2]) });
  });
  return i.displayName = s2 ?? o2.name, i;
};
provideFASTDesignSystem().register(fastDialog(), fastButton());
let MessageDialog = (_p = class extends LitElement {
  constructor() {
    super();
    __publicField(this, "positiveText", "Ok");
    __publicField(this, "negativeText", "Cancel");
    __publicField(this, "useNegative", false);
    __publicField(this, "boundCancel", () => {
    });
    __publicField(this, "dialog");
    __publicField(this, "title", "");
    __publicField(this, "message", "");
    __publicField(this, "resolve");
    __publicField(this, "reject");
    this.boundCancel = this.cancel.bind(this);
  }
  async connectedCallback() {
    var _a3;
    super.connectedCallback();
    await this.updateComplete;
    this.hidden = true;
    (_a3 = this.dialog) == null ? void 0 : _a3.addEventListener("cancel", this.boundCancel);
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this.dialog) == null ? void 0 : _a3.removeEventListener("cancel", this.boundCancel);
    super.disconnectedCallback();
  }
  render() {
    return html$1`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <label id="title">${this.title}</label>
          <pre>${this.message}</pre>
          <div class="row">
            <fast-button @click=${() => this.ok()}>${this.positiveText}</fast-button>
            ${this.useNegative ? html$1`<fast-button @click=${() => this.cancel()}>${this.negativeText}</fast-button>` : null}
          </div>
        </div>
      </fast-dialog>
    `;
  }
  initOk() {
    this.positiveText = "Ok";
    this.negativeText = "Cancel";
    this.useNegative = false;
  }
  initOkCancel() {
    this.positiveText = "Ok";
    this.negativeText = "Cancel";
    this.useNegative = true;
  }
  initYesNo() {
    this.positiveText = "Yes";
    this.negativeText = "No";
    this.useNegative = true;
  }
  initCustom(positiveText, negativeText, useNegative) {
    this.positiveText = positiveText;
    this.negativeText = negativeText;
    this.useNegative = useNegative ?? true;
  }
  ok() {
    this.close();
    if (this.resolve) {
      this.resolve(true);
    }
  }
  cancel() {
    this.close();
    if (this.reject) {
      this.reject("cancel");
    }
  }
  showAsync(title2, message) {
    this.title = title2;
    this.message = message;
    this.visible();
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch(() => {
      return false;
    });
  }
  visible() {
    if (this.dialog) {
      this.dialog.show();
    }
    this.hidden = false;
  }
  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    this.hidden = true;
  }
}, __publicField(_p, "styles", [
  css$1`
      :host {
        z-index: 999; 
        position: absolute;
      }
          
      fast-dialog {
        --dialog-height: auto;
        --dialog-width: auto;
      }

      .row {
        display: flex;
        justify-content: space-between;
        justify-content: end;
      }
      
      fast-button {
        min-width: 80px;
        margin: 0px 4px;
      }

      #title {
        font-weight: initial;
        opacity: 0.6;
        font-size: large;
      }
    `
]), _p);
__decorate([
  e$1("#dialog")
], MessageDialog.prototype, "dialog", void 0);
__decorate([
  n$1()
], MessageDialog.prototype, "title", void 0);
__decorate([
  n$1()
], MessageDialog.prototype, "message", void 0);
MessageDialog = __decorate([
  t$2("message-dialog")
], MessageDialog);
const MessageDialogComponent = l({
  tagName: "message-dialog",
  elementClass: MessageDialog,
  react: React__default
});
provideFASTDesignSystem().register(fastDialog());
let RightDialog = (_q = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "dialog");
    __publicField(this, "title", "");
    __publicField(this, "content");
    __publicField(this, "resolve");
    __publicField(this, "reject");
  }
  render() {
    return html$1`
      <fast-dialog id="dialog" modal="true" hidden>
        <div id="title">
          ${this.title}        
        </div>
        <div id="content">
          ${this.content}
        </div>
        <button id="close-button" @click=${this.cancel} tabindex="-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24px" height="24px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
        </button>
      </fast-dialog>
    `;
  }
  ok(result) {
    this.close();
    if (this.resolve) {
      result ?? (result = {
        success: true,
        value: this.content
      });
      this.resolve(result);
    }
  }
  cancel(result) {
    this.close();
    if (this.reject) {
      this.reject(result);
    }
  }
  async showAsync() {
    await this.updateComplete;
    this.visible();
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      if (this.content) {
        if (this.content.loadPromise) {
          this.content.loadPromise(resolve, reject);
        }
        if (this.content.title) {
          this.title = this.content.title;
        }
        this.content.addEventListener("close", (e2) => {
          const customEvent = e2;
          const result = customEvent.detail;
          if (result.success) {
            this.ok(result);
          } else {
            this.cancel(result);
          }
        });
      }
    }).catch((_error) => {
      return { success: false, value: _error };
    });
  }
  visible() {
    if (this.dialog) {
      this.dialog.show();
    }
    this.hidden = false;
  }
  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    this.hidden = true;
  }
}, __publicField(_q, "styles", [
  unsafeCSS(baseStyle),
  css$1`
    :host {
      z-index: 999;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  
    fast-dialog {
      --dialog-height: 100%;
      --dialog-width: 320px;
      
      position: fixed;
      right: 0;
    }
    
    fast-dialog::part(control) {
      margin: auto;
      position: fixed;
      right: 0;
      top: 0;
      height: 100%;
    }
  
    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }

    #title {
      font-size: 1.5rem;
      font-weight: 600;
      padding: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: calc(100% - 30px);
    }    
    
    #content {
      overflow-y: auto;
      max-height: calc(100% - 60px);
      padding: 12px;

      height: 100%;
      overflow: auto;
    }
    `
]), _q);
__decorate([
  e$1("#dialog")
], RightDialog.prototype, "dialog", void 0);
__decorate([
  n$1()
], RightDialog.prototype, "title", void 0);
__decorate([
  n$1()
], RightDialog.prototype, "content", void 0);
RightDialog = __decorate([
  t$2("right-dialog")
], RightDialog);
class RelayCommand {
  constructor(x) {
    __publicField(this, "content", null);
    __publicField(this, "execute");
    __publicField(this, "canExecute");
    makeAutoObservable(this);
    this.content = x.content;
    this.execute = x.execute;
    this.canExecute = x.canExecute || (() => true);
  }
}
__decorate([
  observable
], RelayCommand.prototype, "content", void 0);
class Service {
  constructor(type) {
    __publicField(this, "key");
    __publicField(this, "instance");
    __publicField(this, "type");
    this.key = Symbol();
    this.type = type;
  }
}
const _DIContainer = class _DIContainer {
  constructor() {
    __publicField(this, "singletons", /* @__PURE__ */ new Map());
    __publicField(this, "multitons", /* @__PURE__ */ new Map());
    __publicField(this, "services", []);
  }
  static getOrCreate() {
    if (!_DIContainer.instance) {
      _DIContainer.instance = new _DIContainer();
    }
    return _DIContainer.instance;
  }
  // args : 생성자 인자 목록 튜플타입으로 전달해야하는 사항이 있음
  // ConstructorParameters로 전달불가
  addSingleton(type, args) {
    const singleton = this.singletons.get(type);
    if (singleton) {
      return singleton;
    } else {
      const instance = new type(...args ?? []);
      this.singletons.set(type, instance);
      return instance;
    }
  }
  // args : 생성자 인자 목록 튜플타입으로 전달해야하는 사항이 있음
  // ConstructorParameters로 전달불가
  addMultiton(key, type, args) {
    const multiton = this.multitons.get(key);
    if (multiton) {
      console.warn(`${key} already exists`);
      return multiton;
    } else {
      const instance = new type(...args ?? []);
      this.multitons.set(key, instance);
      return instance;
    }
  }
  createService(type = "singleton") {
    const service = new Service(type);
    this.services.push(service);
    return service.key;
  }
  register(key, instance) {
    const service = this.services.find((n3) => n3.key == key);
    if (service) {
      service.instance = instance;
    } else {
      console.warn(`Service ${key.toString()} is not registered`);
    }
  }
  resolve(key) {
    const service = this.services.find((n3) => n3.key == key);
    if (service) {
      if (service.type == "singleton") {
        return service.instance;
      } else if (service.type == "multiton") {
        const constructor = service.instance.constructor;
        const instance = constructor();
        return instance;
      } else {
        throw new Error(`Service ${key.toString()} is not registered`);
      }
    } else {
      console.warn(`Service ${key.toString()} is not registered`);
      return null;
    }
  }
  get(type, key) {
    if (key) {
      const multiton = this.multitons.get(key);
      if (multiton) {
        return multiton;
      } else {
        console.warn(`${key} is not registered, it will be registered as a multiton`);
        return this.addMultiton(key, type);
      }
    } else {
      const singleton = this.singletons.get(type);
      if (singleton) {
        return singleton;
      } else {
        console.warn(`${type.name} is not registered, it will be registered as a singleton`);
        return this.addSingleton(type);
      }
    }
  }
};
__publicField(_DIContainer, "instance");
let DIContainer = _DIContainer;
function inject(type, key) {
  return function(target2, propertyKey) {
    Object.defineProperty(target2, propertyKey, {
      get: () => DI.get(type, key)
    });
  };
}
function injectOf(key) {
  return function(target2, propertyKey) {
    Object.defineProperty(target2, propertyKey, {
      get: function() {
        return DI.resolve(key);
      }
    });
  };
}
const DI = DIContainer.getOrCreate();
var Position;
(function(Position2) {
  Position2[Position2["TopLeft"] = 0] = "TopLeft";
  Position2[Position2["TopCenter"] = 1] = "TopCenter";
  Position2[Position2["TopRight"] = 2] = "TopRight";
  Position2[Position2["BottomLeft"] = 3] = "BottomLeft";
  Position2[Position2["BottomCenter"] = 4] = "BottomCenter";
  Position2[Position2["BottomRight"] = 5] = "BottomRight";
  Position2[Position2["LeftTop"] = 6] = "LeftTop";
  Position2[Position2["LeftCenter"] = 7] = "LeftCenter";
  Position2[Position2["LeftBottom"] = 8] = "LeftBottom";
  Position2[Position2["RightTop"] = 9] = "RightTop";
  Position2[Position2["RightCenter"] = 10] = "RightCenter";
  Position2[Position2["RightBottom"] = 11] = "RightBottom";
  Position2[Position2["Auto"] = 12] = "Auto";
})(Position || (Position = {}));
class FlyoutElement extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "open", false);
    __publicField(this, "target");
    // event bind Start
    __publicField(this, "handleOutsideClickBind", this.handleOutsideClick.bind(this));
    __publicField(this, "handleEscapeKeyBind", this.handleEscapeKey.bind(this));
    __publicField(this, "handleHoverTargetBind", this.handleHoverTarget.bind(this));
    __publicField(this, "handleHoverThisBind", this.handleHoverThis.bind(this));
    __publicField(this, "adjustPositionBind", this.adjustPosition.bind(this));
  }
  /**
   * 현재 컨텐츠가 보여지고 있는지 여부
   */
  get isOpen() {
    return this.open;
  }
  /**
   * 현재 컨텐츠에 연결되어 있는 타겟 엘리먼트
  */
  get targetElement() {
    return this.target;
  }
  connectedCallback() {
    super.connectedCallback();
    this.style.position = "absolute";
    this.style.zIndex = "5";
    this.hidden = true;
  }
  /**
   * 토글 방식의 이벤트를 사용할 경우 사용합니다(with onClick event)
  */
  async toggleAsync(event) {
    const target2 = event.currentTarget;
    if (!target2)
      throw new Error("event target is null");
    if (event.currentTarget === this.target && this.open) {
      await this.hideClickAsync();
    } else {
      await this.showClickAsync(event);
    }
  }
  /**
   * 클릭 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onClick event)
   */
  async showClickAsync(event) {
    var _a3;
    await this.showAsync(event);
    document.removeEventListener("click", this.handleOutsideClickBind, { capture: true });
    document.removeEventListener("keydown", this.handleEscapeKeyBind, { capture: true });
    document.removeEventListener("scroll", this.adjustPositionBind, { capture: true });
    window.removeEventListener("resize", this.adjustPositionBind);
    document.addEventListener("click", this.handleOutsideClickBind, { capture: true });
    document.addEventListener("keydown", this.handleEscapeKeyBind, { capture: true });
    document.addEventListener("scroll", this.adjustPositionBind, { capture: true });
    window.addEventListener("resize", this.adjustPositionBind);
    (_a3 = this.target) == null ? void 0 : _a3.classList.add("active");
    setTimeout(() => {
      this.open = true;
    }, 100);
  }
  /**
   * 클릭 이벤트를 사용할때 컨텐츠를 감춥니다. (with onClick event)
  */
  async hideClickAsync() {
    var _a3;
    this.hidden = true;
    document.removeEventListener("click", this.handleOutsideClickBind, { capture: true });
    document.removeEventListener("keydown", this.handleEscapeKeyBind, { capture: true });
    document.removeEventListener("scroll", this.adjustPositionBind, { capture: true });
    window.removeEventListener("resize", this.adjustPositionBind);
    (_a3 = this.target) == null ? void 0 : _a3.classList.remove("active");
    setTimeout(() => {
      this.open = false;
    }, 100);
  }
  /**
   * 호버링 방식의 이벤트를 사용할 경우 사용합니다(with onMouseEnter event)
   */
  async hoverAsync(event) {
    await this.showHoverAsync(event);
  }
  /**
   * 호버링 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onMouseEnter event)
   */
  async showHoverAsync(event) {
    await this.showAsync(event);
    if (this.target)
      this.target.removeEventListener("mouseleave", this.handleHoverTargetBind);
    this.removeEventListener("mouseleave", this.handleHoverThisBind);
    if (this.target)
      this.target.addEventListener("mouseleave", this.handleHoverTargetBind);
    this.addEventListener("mouseleave", this.handleHoverThisBind);
    this.open = true;
  }
  /**
   * 호버링 이벤트를 사용할때 컨텐츠를 감춥니다. (with onMouseLeave event)
  */
  async hideHoverAsync() {
    this.hidden = true;
    if (this.target)
      this.target.removeEventListener("mouseleave", this.handleHoverTargetBind);
    this.removeEventListener("mouseleave", this.handleHoverThisBind);
    this.open = false;
  }
  // 컨텐츠를 보여줍니다.
  async showAsync(event) {
    const target2 = event.currentTarget;
    if (!target2)
      throw new Error("event target is null");
    this.target = target2;
    this.style.opacity = "0";
    this.hidden = false;
    await this.updateComplete;
    await this.adjustPosition();
    this.style.opacity = "1";
  }
  // event bind End
  // event methods Start
  async handleOutsideClick(event) {
    var _a3;
    const target2 = event.target;
    const isInside = this.contains(target2);
    const isTarget = (_a3 = this.target) == null ? void 0 : _a3.contains(target2);
    if (!isInside && !isTarget) {
      this.hideClickAsync();
    }
  }
  async handleEscapeKey(event) {
    if (event.key === "Escape") {
      this.hideClickAsync();
    }
  }
  async handleHoverTarget(event) {
    if (event.relatedTarget === this && this.keepHover)
      return;
    this.hideHoverAsync();
  }
  async handleHoverThis() {
    this.hideHoverAsync();
  }
  // event methods End
  // 컨텐츠의 위치를 조정합니다.
  async adjustPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (!this.target)
      return;
    const targetRect = this.target.getBoundingClientRect();
    const spaceTop = targetRect.top;
    const spaceBottom = windowHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = windowWidth - targetRect.right;
    const isTopLarger = spaceTop > spaceBottom;
    const isLeftLarger = spaceLeft > spaceRight;
    const contentRect = this.getBoundingClientRect();
    const { width, height } = contentRect;
    const isTopEnough = spaceTop > height;
    const isBottomEnough = spaceBottom > height;
    const isLeftEnough = spaceLeft > width;
    const isRightEnough = spaceRight > width;
    let top2, left, right2, bottom2;
    switch (this.position) {
      case Position.TopLeft: {
        if (isTopEnough || isTopLarger) {
          bottom2 = spaceBottom + targetRect.height;
        } else {
          top2 = spaceTop + targetRect.height;
        }
        if (spaceLeft + targetRect.width > width) {
          if (width > targetRect.width)
            right2 = spaceRight;
          else
            left = spaceLeft;
        } else {
          left = 1;
        }
        break;
      }
      case Position.TopCenter: {
        if (isTopEnough || isTopLarger) {
          bottom2 = spaceBottom + targetRect.height;
        } else {
          top2 = spaceTop + targetRect.height;
        }
        const spaceNeed = (width - targetRect.width) / 2;
        const leftNotEnough = spaceLeft < spaceNeed;
        const rightNotEnough = spaceRight < spaceNeed;
        if (leftNotEnough)
          left = 1;
        else if (rightNotEnough)
          right2 = 1;
        else
          left = spaceLeft - spaceNeed;
        break;
      }
      case Position.TopRight: {
        if (isTopEnough || isTopLarger) {
          bottom2 = spaceBottom + targetRect.height;
        } else {
          top2 = spaceTop + targetRect.height;
        }
        if (spaceRight + targetRect.width > width) {
          if (width > targetRect.width)
            left = spaceLeft;
          else
            right2 = spaceRight;
        } else {
          right2 = 1;
        }
        break;
      }
      case Position.BottomLeft: {
        if (isBottomEnough || !isTopLarger) {
          top2 = spaceTop + targetRect.height;
        } else {
          bottom2 = spaceBottom + targetRect.height;
        }
        if (spaceLeft + targetRect.width > width) {
          right2 = spaceRight;
        } else {
          left = 1;
        }
        break;
      }
      case Position.BottomCenter: {
        if (isBottomEnough || !isTopLarger) {
          top2 = spaceTop + targetRect.height;
        } else {
          bottom2 = spaceBottom + targetRect.height;
        }
        const spaceNeed = (width - targetRect.width) / 2;
        const leftNotEnough = spaceLeft < spaceNeed;
        const rightNotEnough = spaceRight < spaceNeed;
        if (leftNotEnough)
          left = 1;
        else if (rightNotEnough)
          right2 = 1;
        else
          left = spaceLeft - spaceNeed;
        break;
      }
      case Position.BottomRight: {
        if (isBottomEnough || !isTopLarger) {
          top2 = spaceTop + targetRect.height;
        } else {
          bottom2 = spaceBottom + targetRect.height;
        }
        if (spaceRight + targetRect.width > width) {
          left = spaceLeft;
        } else {
          right2 = 1;
        }
        break;
      }
      case Position.LeftTop: {
        if (isLeftEnough || isLeftLarger) {
          left = spaceLeft - width;
        } else {
          right2 = spaceRight - width;
        }
        if (spaceTop > height - targetRect.height) {
          if (height > targetRect.height)
            bottom2 = spaceBottom;
          else
            top2 = spaceTop;
        } else {
          top2 = 1;
        }
        break;
      }
      case Position.LeftCenter: {
        if (isLeftEnough || isLeftLarger) {
          left = spaceLeft - width;
        } else {
          right2 = spaceRight - width;
        }
        const spaceNeed = (height - targetRect.height) / 2;
        const topNotEnough = spaceTop < spaceNeed;
        const bottomNotEnough = spaceBottom < spaceNeed;
        if (topNotEnough)
          top2 = 1;
        else if (bottomNotEnough)
          bottom2 = 1;
        else
          top2 = spaceTop - spaceNeed;
        break;
      }
      case Position.LeftBottom: {
        if (isLeftEnough || isLeftLarger) {
          left = spaceLeft - width;
        } else {
          right2 = spaceRight - width;
        }
        if (spaceBottom > height - targetRect.height) {
          if (height > targetRect.height)
            top2 = spaceTop;
          else
            bottom2 = spaceBottom;
        } else {
          bottom2 = 1;
        }
        break;
      }
      case Position.RightTop: {
        if (isRightEnough || !isLeftLarger) {
          right2 = spaceRight - width;
        } else {
          left = spaceLeft - width;
        }
        if (spaceTop > height - targetRect.height) {
          if (height > targetRect.height)
            bottom2 = spaceBottom;
          else
            top2 = spaceTop;
        } else {
          top2 = 1;
        }
        break;
      }
      case Position.RightCenter: {
        if (isRightEnough || !isLeftLarger) {
          right2 = spaceRight - width;
        } else {
          left = spaceLeft - width;
        }
        const spaceNeed = (height - targetRect.height) / 2;
        const topNotEnough = spaceTop < spaceNeed;
        const bottomNotEnough = spaceBottom < spaceNeed;
        if (topNotEnough)
          top2 = 1;
        else if (bottomNotEnough)
          bottom2 = 1;
        else
          top2 = spaceTop - spaceNeed;
        break;
      }
      case Position.RightBottom: {
        if (isRightEnough || !isLeftLarger) {
          right2 = spaceRight - width;
        } else {
          left = spaceLeft - width;
        }
        if (spaceBottom > height - targetRect.height) {
          if (height > targetRect.height)
            top2 = spaceTop;
          else
            bottom2 = spaceBottom;
        } else {
          bottom2 = 1;
        }
        break;
      }
      case Position.Auto:
        if (isTopLarger) {
          top2 = spaceTop - height;
        } else {
          bottom2 = spaceBottom - height;
        }
        if (isLeftLarger) {
          right2 = spaceRight;
        } else {
          left = spaceLeft;
        }
        break;
    }
    this.style.top = top2 ? `${top2}px` : "unset";
    this.style.bottom = bottom2 ? `${bottom2}px` : "unset";
    this.style.left = left ? `${left}px` : "unset";
    this.style.right = right2 ? `${right2}px` : "unset";
  }
}
const cube = "m3.514 6.61c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508m15.986 2.115v7.525l-6.75 3.722v-7.578zm-15 7.425v-7.458l6.75 3.75v7.511zm.736-8.769 6.764-3.813 6.801 3.834-6.801 3.716z";
const user = "M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z";
const group = "M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z";
const setting = "M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z";
const overview = "M13.04 6.25L14.8 4.5l.7.7-1.75 1.76-.7-.7zM9 5V2.5h1V5H9zM5.26 6.97L3.5 5.2l.7-.7 1.77 1.76-.7.7zM7 10.5C7 9.12 8.12 8 9.5 8S12 9.12 12 10.5 10.88 13 9.5 13 7 11.88 7 10.5zm4 0c0-.83-.67-1.5-1.5-1.5S8 9.67 8 10.5 8.67 12 9.5 12s1.5-.67 1.5-1.5zm4-.5h2.5v1H15v-1zM1.5 10H4v1H1.5v-1zm14.93 5.43c1-1.4 1.57-3.1 1.57-4.93C18 5.8 14.2 2 9.5 2S1 5.8 1 10.5c0 1.84.58 3.54 1.57 4.93l-.7.7C.67 14.58 0 12.63 0 10.5 0 5.25 4.25 1 9.5 1S19 5.25 19 10.5c0 2.1-.7 4.07-1.86 5.64l-.7-.7z";
const labs = "m17,9.04V2h2V0H5v2h2v7.04c-1.497,1.311-7,6.427-7,10.817,0,3.035,2.927,4.102,3.044,4.143h17.912c.117-.042,3.044-1.108,3.044-4.143,0-4.39-5.503-9.506-7-10.817Zm3.585,12.96H3.415c-.396-.186-1.415-.796-1.415-2.143,0-.9.347-1.899.89-2.908h15.768c-.434-.656-.958-1.337-1.524-2H4.188c1.513-2.019,3.43-3.833,4.45-4.679l.362-.3V2h6v7.97l.362.3c1.846,1.529,6.638,6.232,6.638,9.587,0,1.347-1.019,1.957-1.415,2.143Z";
const question = "M431-330q1-72 16.5-105t58.5-72q42-38 64.5-70.5T593-647q0-45-30-75t-84-30q-52 0-80 29.5T358-661l-84-37q22-59 74.5-100.5T479-840q100 0 154 55.5T687-651q0 48-20.5 87T601-482q-49 47-59 72t-11 80H431Zm48 250q-29 0-49.5-20.5T409-150q0-29 20.5-49.5T479-220q29 0 49.5 20.5T549-150q0 29-20.5 49.5T479-80Z";
const sun = "M480-340q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0 60q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-450H40v-60h160v60Zm720 0H760v-60h160v60ZM450-760v-160h60v160h-60Zm0 720v-160h60v160h-60ZM262-658l-100-97 43-44 96 100-39 41Zm494 496-98-100 41-41 99 98-42 43Zm-99-537 98-99 44 42-99 98-43-41ZM162-205l99-98 42 42-98 99-43-43Zm318-275Z";
const moon = "M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.667 16.5Q688.667-384 660-384q-114.689 0-195.345-80.655Q384-545.311 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z";
const notification = "M160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z";
const trash = "M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z";
const angleUp = "m23.181,17.974L12.354,7.146c-.189-.189-.518-.189-.707,0L.819,17.974l-.707-.707L10.939,6.439c.566-.566,1.555-.566,2.121,0l10.827,10.827-.707.707Z";
const angleDown = "m12,18c-.4,0-.777-.156-1.061-.439L.112,6.733l.707-.707,10.827,10.827c.189.189.518.189.707,0l10.827-10.827.707.707-10.827,10.827c-.283.283-.66.439-1.061.439Z";
const leftChevron = "M18.3 2.3L4.5 16l13.8 13.7-2 2L.9 16 16.4.4l1.9 1.9zm13.3 0L18 16l13.7 13.7-1.9 2L14.1 16 29.7.4l2 1.9z";
const rightChevron = "M13.7 2.3l2-2L31.1 16 15.6 31.6l-1.9-1.9L27.5 16 13.7 2.3zM.4 2.3l1.9-2L17.9 16 2.3 31.6l-2-1.9L14.2 16 .4 2.3z";
const angleUp2 = "M22.5,18a1.5,1.5,0,0,1-1.061-.44L13.768,9.889a2.5,2.5,0,0,0-3.536,0L2.57,17.551A1.5,1.5,0,0,1,.449,15.43L8.111,7.768a5.505,5.505,0,0,1,7.778,0l7.672,7.672A1.5,1.5,0,0,1,22.5,18Z";
const close$1 = "m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z";
const pin$1 = "M9.068,16.347l4.9,4.9.707-.707a7.977,7.977,0,0,0,2.075-7.619l-.246-1,2.086-2.086.217.217a3.085,3.085,0,0,0,3.938.4,3,3,0,0,0,.38-4.565L18.2.954a3.085,3.085,0,0,0-3.938-.4,3,3,0,0,0-.38,4.565l.293.293L12.085,7.5,11.1,7.258A7.985,7.985,0,0,0,3.464,9.33l-.707.707,4.9,4.895L.293,22.293l1.414,1.414ZM10.607,9.2l2.1.514,4.3-4.3L15.293,3.707a1,1,0,0,1,.134-1.528,1.084,1.084,0,0,1,1.356.19l4.924,4.924h0a1,1,0,0,1-.134,1.528,1.084,1.084,0,0,1-1.356-.19L18.586,7l-4.3,4.3.518,2.111a5.977,5.977,0,0,1-.9,4.946L5.646,10.1A5.986,5.986,0,0,1,10.607,9.2Z";
const VectorIcons = {
  cube,
  user,
  group,
  setting,
  overview,
  labs,
  question,
  sun,
  moon,
  notification,
  trash,
  angleUp,
  angleDown,
  leftChevron,
  rightChevron,
  angleUp2,
  close: close$1,
  pin: pin$1
};
let NotificationMenu = (_r = class extends FlyoutElement {
  constructor() {
    super(...arguments);
    __publicField(this, "keepHover", true);
    __publicField(this, "position", Position.BottomLeft);
    __publicField(this, "items", []);
  }
  connectedCallback() {
    super.connectedCallback();
    this.getUserInfo();
  }
  render() {
    return html$1`
      <div class="container">
          <div class="header">
            <div class="title">Notification</div>
            <div class="count">${this.items.filter((i) => {
      if (i.read === false)
        return i;
      else
        return null;
    }).length}</div>
            <div class="flex"></div>
            <div class="delete" @click=${this.deleteAll}>Delete All</div>
            <div class="delete" @click=${this.deleteRead}>Delete Read</div>
          </div>
          <div class="body">
          ${this.items.length > 0 ? this.items.map((i) => html$1`
              <div class="item">
                <div class=${`main ${i.read ? "read" : ""}`} @click=${() => this.readItem(i.id)}>
                  <div class="title">${i.title}</div>
                  <div class="content" title=${i.content}>${i.content}</div>
                  <div class="date">${i.date ? this.formatDate(i.date) : null}</div>
                </div>
                <div class="delete" @click=${() => this.deleteItem(i.id)}>
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d=${VectorIcons.trash}></path>
                  </svg>
                </div>
              </div>
            `) : html$1`<div class="empty">There is no notification</div>`}
          </div>
      </div>
    `;
  }
  async getUserInfo() {
    this.items = [
      {
        id: 1,
        title: "길이 테스트용입니다. ㄴㄴㄴㄴㄴㄴㄴㄴㄴsssㄴㄴㄴㄴㄴㄴㄴㄴㄴ",
        content: "첫 번째 알림 길이테스트입니다.ㅁㄴㅇㄴㅁㅇㅁㄴ차처챵ㅊㄴ마ㅡㅊㅋㅌ,ㅡ차트ㅏ킅챠ㅐㅁ차ㅣㅇ추카티추먕추ㅏㅣㅋ추애ㅣ차퉄차ㅣ",
        date: new Date(2022, 10, 10),
        read: false
      },
      {
        id: 2,
        title: "두 번째 알림입니다.",
        content: "두 번째 알림 내용입니다.",
        date: new Date(2023, 7, 10),
        read: false
      },
      {
        id: 3,
        title: "세 번째 알림입니다.",
        content: "세 번째 알림 내용입니다.",
        date: new Date(2023, 9, 10),
        read: false
      },
      {
        id: 4,
        title: "네 번째 알림입니다.",
        content: "네 번째 알림 내용입니다.",
        date: new Date(2023, 9, 16, 10),
        read: false
      },
      {
        id: 5,
        title: "다섯 번째 알림입니다.",
        content: "다섯 번째 알림 내용입니다.",
        date: new Date(2023, 9, 16, 12, 33, 50),
        read: false
      }
    ];
  }
  async readItem(id) {
    const item = this.items.find((item2) => item2.id === id);
    if (item) {
      item.read = true;
    }
    this.requestUpdate();
  }
  async deleteItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }
  async deleteAll() {
    this.items = [];
  }
  async deleteRead() {
    this.items = this.items.filter((item) => !item.read);
  }
  // UTC시간을 현재 시간과의 차이를 계산하여 표시
  formatDate(utc) {
    const now = /* @__PURE__ */ new Date();
    const locale = navigator.language;
    const clientLocalDate = new Date(utc.getTime() - utc.getTimezoneOffset() * 6e4);
    const timeDiffSec = Math.floor((now.getTime() - clientLocalDate.getTime()) / 1e3);
    const dateFormatted = this.formatDateToFullDate(clientLocalDate);
    if (timeDiffSec < 60) {
      return `${timeDiffSec} seconds ago - ${dateFormatted} ${locale}`;
    } else if (timeDiffSec < 3600) {
      const minutes = Math.floor(timeDiffSec / 60);
      return `${minutes} minutes ago - ${dateFormatted} ${locale}`;
    } else if (timeDiffSec < 86400) {
      const hours = Math.floor(timeDiffSec / 3600);
      return `${hours} hours ago - ${dateFormatted} ${locale}`;
    } else if (timeDiffSec < 2592e3) {
      const days = Math.floor(timeDiffSec / 86400);
      return `${days} days ago - ${dateFormatted} ${locale}`;
    } else if (timeDiffSec < 31536e3) {
      const months = Math.floor(timeDiffSec / 2592e3);
      return `${months} months ago - ${dateFormatted} ${locale}`;
    } else {
      const years = Math.floor(timeDiffSec / 31536e3);
      return `${years} years ago - ${dateFormatted} ${locale}`;
    }
  }
  // date "yyyy/MM/dd hh:mm" 형식 변환 (클라이언트 로컬 시간 기준)
  formatDateToFullDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
}, __publicField(_r, "styles", css$1`
    .container {
      margin: 5px;
      width: 400px;
      background-color: var(--surface-card);
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    .header {
      padding: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-bottom: 2px solid #ccc;

      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10px;
        height: 10px;
        padding: 4px;
        border-radius: 50%;
        background-color: red;
        color: white;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .flex {
        flex-grow: 1;
      }

      .delete {
        font-size: 14px;
        color: var(--alpha-80);
        cursor: pointer;

        &:hover {
          opacity: 0.6;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      height: 350px;
      overflow-x: hidden;
      overflow-y: auto;

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        .main {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 5px;
          overflow: hidden;

          .title {
            color: var(--primary-text);
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
  
          .content {
            color: var(--alpha-80);
            font-size: 12px;
            overflow: hidden;
            display: -webkit-box; /* for box-orient 레거시 */
            -webkit-line-clamp: 2; /* 두 줄로 제한 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
          }
  
          .date {
            color: var(--alpha-30);
            font-size: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &.read {
            .title {
              font-weight: normal;
              color: #999;
            }
  
            .content {
              color: #999;
            }

            .date {
              color: #999;
            }
          }
        }
    
        .delete {
          display: none;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 30px;
          height: 100%;

          .icon {
            width: 20px;
            height: 20px;
            fill: var(--primary-text);
            fill-rule: evenodd;
          }

          &:hover {
            background-color: #ff00004d;
          }
        }

        &:hover {
          background-color: var(--ui-subtle-hover);

          .delete {
            display: flex;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }

      .empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: 16px;
      }

      &::-webkit-scrollbar {
        width: 16px;
      }

      &::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: hsl(0,0%,37%)
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: hsl(0,0%,67%)
      }
    }
    
  `), _r);
__decorate([
  n$1({ type: Array })
], NotificationMenu.prototype, "items", void 0);
NotificationMenu = __decorate([
  t$2("notification-menu")
], NotificationMenu);
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f2 = React__default, k = Symbol.for("react.element"), l2 = Symbol.for("react.fragment"), m2 = Object.prototype.hasOwnProperty, n3 = f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p2 = { key: true, ref: true, __self: true, __source: true };
  function q(c2, a2, g) {
    var b2, d2 = {}, e2 = null, h2 = null;
    void 0 !== g && (e2 = "" + g);
    void 0 !== a2.key && (e2 = "" + a2.key);
    void 0 !== a2.ref && (h2 = a2.ref);
    for (b2 in a2)
      m2.call(a2, b2) && !p2.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
    if (c2 && c2.defaultProps)
      for (b2 in a2 = c2.defaultProps, a2)
        void 0 === d2[b2] && (d2[b2] = a2[b2]);
    return { $$typeof: k, type: c2, key: e2, ref: h2, props: d2, _owner: n3.current };
  }
  reactJsxRuntime_production_min.Fragment = l2;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React = React__default;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error2(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error2("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign2 = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign2({}, props, {
                value: prevLog
              }),
              info: assign2({}, props, {
                value: prevInfo
              }),
              warn: assign2({}, props, {
                value: prevWarn
              }),
              error: assign2({}, props, {
                value: prevError
              }),
              group: assign2({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign2({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign2({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error2("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s2 = sampleLines.length - 1;
            var c2 = controlLines.length - 1;
            while (s2 >= 1 && c2 >= 0 && sampleLines[s2] !== controlLines[c2]) {
              c2--;
            }
            for (; s2 >= 1 && c2 >= 0; s2--, c2--) {
              if (sampleLines[s2] !== controlLines[c2]) {
                if (s2 !== 1 || c2 !== 1) {
                  do {
                    s2--;
                    c2--;
                    if (c2 < 0 || sampleLines[s2] !== controlLines[c2]) {
                      var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s2 >= 1 && c2 >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has2 = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has2(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error2("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error2("Failed %s type: %s", location2, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a2) {
        return isArrayImpl(a2);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e2) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error2("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error2('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error2("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error2("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref2, self2, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref: ref2,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self2) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref2 = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref2 = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self2);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref2) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref2) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref2, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement2(object2) {
        {
          return typeof object2 === "object" && object2 !== null && object2.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info2 = getDeclarationErrorAddendum();
          if (!info2) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info2 = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info2;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error2('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement2(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement2(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement2(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error2("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error2("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error2("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error2("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info2 = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info2 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info2 += sourceInfo;
            } else {
              info2 += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info2 = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error2("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info2);
          }
          var element = jsxDEV(type, props, key, source, self2);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error2("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
class AppInfoStore {
  constructor() {
    __publicField(this, "logo");
    __publicField(this, "title", "IYULAB APP");
    makeAutoObservable(this);
  }
  initAppInfo(title2, logo2) {
    this.logo = logo2;
    this.title = title2 ?? this.title;
  }
}
class MenuStore {
  constructor() {
    __publicField(this, "menuItems", []);
    makeAutoObservable(this);
  }
  get menus() {
    return this.menuItems;
  }
  initMenu(items, keyPath) {
    this.menuItems = this.resolvePath(items, keyPath);
  }
  // key값으로 path를 찾아서 menu에 할당
  resolvePath(item, keyPath) {
    return item.map((i) => {
      if (i.type === "single") {
        const path2 = keyPath.get(i.key);
        if (path2 && !i.path)
          i.path = path2;
        return i;
      } else if (i.type === "group") {
        i.subMenu = i.subMenu.map((s2) => {
          const path2 = keyPath.get(s2.key);
          if (path2 && !s2.path)
            s2.path = path2;
          return s2;
        });
        return i;
      } else {
        return i;
      }
    });
  }
}
var Breakpoint;
(function(Breakpoint2) {
  Breakpoint2[Breakpoint2["Tablet"] = 768] = "Tablet";
  Breakpoint2[Breakpoint2["Small"] = 1100] = "Small";
  Breakpoint2[Breakpoint2["Medium"] = 1300] = "Medium";
  Breakpoint2[Breakpoint2["Large"] = 1500] = "Large";
})(Breakpoint || (Breakpoint = {}));
var Themes;
(function(Themes2) {
  Themes2[Themes2["dark"] = 0] = "dark";
  Themes2[Themes2["light"] = 1] = "light";
})(Themes || (Themes = {}));
class LayoutStore {
  constructor() {
    __publicField(this, "_title", "IYULAB APP");
    __publicField(this, "_logo");
    __publicField(this, "_theme", Themes.light);
    __publicField(this, "_isMediumScreen", window.innerWidth < Breakpoint.Medium);
    makeAutoObservable(this);
    window.addEventListener("resize", this.onWindowResized.bind(this));
    this._theme = localStorage.theme === "dark" ? Themes.dark : Themes.light;
    this.updateTheme(this.theme);
  }
  get title() {
    return this._title;
  }
  get logo() {
    return this._logo;
  }
  get theme() {
    return this._theme;
  }
  get isMediumScreen() {
    return this._isMediumScreen;
  }
  initLayout(title2, logo2) {
    this._title = title2 ?? this.title;
    this._logo = logo2;
  }
  toggleTheme(targetElement) {
    const otherTheme = this.theme === Themes.dark ? Themes.light : Themes.dark;
    this.updateTheme(otherTheme, targetElement);
  }
  updateTheme(theme, targetElement) {
    this._theme = theme;
    localStorage.theme = theme === Themes.dark ? "dark" : "light";
    if (theme == Themes.dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-dark-theme", "true");
      document.documentElement.setAttribute("data-prefers-color-scheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-dark-theme");
      document.documentElement.setAttribute("data-prefers-color-scheme", "light");
    }
    const target2 = targetElement ?? window.document.body;
    if (target2) {
      DOM.queueUpdate(() => {
        baseLayerLuminance.setValueFor(target2, theme == Themes.dark ? StandardLuminance.DarkMode : StandardLuminance.LightMode);
      });
    }
    const root = document.querySelector("#root");
    if (root) {
      if (theme == Themes.dark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }
  onWindowResized() {
    const medium = window.innerWidth < Breakpoint.Medium;
    if (!this.isMediumScreen && medium) {
      this._isMediumScreen = true;
    } else if (this.isMediumScreen && !medium) {
      this._isMediumScreen = false;
    }
  }
}
function useLayout() {
  const layout = DI.get(LayoutStore);
  return layout;
}
function useMenu() {
  const menu2 = DI.get(MenuStore);
  return menu2;
}
function useLocator() {
  const locator = DI.get(LocatorStore);
  return locator;
}
function useUI() {
  const ui = DI.get(UIStore);
  ui.initUI();
  return ui;
}
const logo$1 = "data:image/svg+xml,%3csvg%20width='520'%20height='520'%20viewBox='0%200%20520%20520'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_f_10_3)'%3e%3ccircle%20cx='261.5'%20cy='261.5'%20r='254.5'%20fill='%23D9D9D9'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_f_10_3)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M260%204C296.254%204%20330.747%2011.536%20362%2025.1271V359H23.8452C11.063%20328.546%204%20295.098%204%20260C4%20118.615%20118.615%204%20260%204Z'%20fill='%23111111'/%3e%3c/g%3e%3cg%20filter='url(%23filter2_f_10_3)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M299%20427H220V512.893C233.033%20514.938%20246.393%20516%20260%20516C273.26%20516%20286.284%20514.992%20299%20513.048V427Z'%20fill='%23111111'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_10_3'%20x='3'%20y='3'%20width='517'%20height='517'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20result='effect1_foregroundBlur_10_3'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_10_3'%20x='0'%20y='0'%20width='366'%20height='363'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20result='effect1_foregroundBlur_10_3'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_10_3'%20x='216'%20y='423'%20width='86.9999'%20height='97'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20result='effect1_foregroundBlur_10_3'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e";
const tabletScreen = "768px";
const smallScreen = "1100px";
const mediumScreen = "1300px";
const largeScreen = "1500px";
const azure = "#006fc8";
const cyan = "#1FAECE";
const primaryText = "var(--primary-text)";
const secondaryText = "var(--secondary-text)";
const chartGridColor = "var(--ui-divider)";
const gray10 = "#dedede";
const msDarkBlue = "#002050";
const amberLight2 = "#F7E28B";
const violetLight2 = "#CEC0EC";
const tealLight3 = "#CFECE8";
const bannerBlue = "var(--banner-blue)";
const spaceXXS = "4px";
const spaceXS = "8px";
const spaceS = "16px";
const spaceM = "20px";
const spaceXM = "24px";
const spaceL = "32px";
const spaceXL = "40px";
const spaceXXL = "60px";
const panelSlideDuration = "200ms";
const panelFadeDuration = "100ms";
const ccBannerHeight = "46px";
const container$1 = "_container_1jo64_216";
const logo = "_logo_1jo64_222";
const icon$2 = "_icon_1jo64_235";
const img$1 = "_img_1jo64_244";
const title$1 = "_title_1jo64_250";
const breadCrumb = "_breadCrumb_1jo64_263";
const bread = "_bread_1jo64_263";
const path = "_path_1jo64_275";
const slash = "_slash_1jo64_294";
const flex$2 = "_flex_1jo64_301";
const userButtons = "_userButtons_1jo64_305";
const hoverButton = "_hoverButton_1jo64_310";
const badge = "_badge_1jo64_329";
const tooltip = "_tooltip_1jo64_341";
const progressbar = "_progressbar_1jo64_369";
const bar = "_bar_1jo64_380";
const styles$4 = {
  tabletScreen,
  smallScreen,
  mediumScreen,
  largeScreen,
  azure,
  cyan,
  primaryText,
  secondaryText,
  chartGridColor,
  gray10,
  msDarkBlue,
  amberLight2,
  violetLight2,
  tealLight3,
  bannerBlue,
  spaceXXS,
  spaceXS,
  spaceS,
  spaceM,
  spaceXM,
  spaceL,
  spaceXL,
  spaceXXL,
  panelSlideDuration,
  panelFadeDuration,
  ccBannerHeight,
  container: container$1,
  logo,
  icon: icon$2,
  img: img$1,
  title: title$1,
  breadCrumb,
  bread,
  path,
  slash,
  flex: flex$2,
  userButtons,
  hoverButton,
  badge,
  tooltip,
  progressbar,
  bar
};
if (!useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!makeObservable) {
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}
function defaultNoopBatch(callback) {
  callback();
}
function observerBatching(reactionScheduler3) {
  if (!reactionScheduler3) {
    reactionScheduler3 = defaultNoopBatch;
    if ("production" !== process.env.NODE_ENV) {
      console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
    }
  }
  configure({ reactionScheduler: reactionScheduler3 });
}
function printDebugValue(v) {
  return getDependencyTree(v);
}
var REGISTRY_FINALIZE_AFTER = 1e4;
var REGISTRY_SWEEP_INTERVAL = 1e4;
var TimerBasedFinalizationRegistry = (
  /** @class */
  function() {
    function TimerBasedFinalizationRegistry2(finalize) {
      var _this = this;
      Object.defineProperty(this, "finalize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: finalize
      });
      Object.defineProperty(this, "registrations", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /* @__PURE__ */ new Map()
      });
      Object.defineProperty(this, "sweepTimeout", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "sweep", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function(maxAge) {
          if (maxAge === void 0) {
            maxAge = REGISTRY_FINALIZE_AFTER;
          }
          clearTimeout(_this.sweepTimeout);
          _this.sweepTimeout = void 0;
          var now = Date.now();
          _this.registrations.forEach(function(registration, token) {
            if (now - registration.registeredAt >= maxAge) {
              _this.finalize(registration.value);
              _this.registrations.delete(token);
            }
          });
          if (_this.registrations.size > 0) {
            _this.scheduleSweep();
          }
        }
      });
      Object.defineProperty(this, "finalizeAllImmediately", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function() {
          _this.sweep(0);
        }
      });
    }
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "register", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target2, value, token) {
        this.registrations.set(token, {
          value,
          registeredAt: Date.now()
        });
        this.scheduleSweep();
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "unregister", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(token) {
        this.registrations.delete(token);
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "scheduleSweep", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function() {
        if (this.sweepTimeout === void 0) {
          this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
        }
      }
    });
    return TimerBasedFinalizationRegistry2;
  }()
);
var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;
var observerFinalizationRegistry = new UniversalFinalizationRegistry(function(adm) {
  var _a3;
  (_a3 = adm.reaction) === null || _a3 === void 0 ? void 0 : _a3.dispose();
  adm.reaction = null;
});
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredUseSyncExternalStoreShim_production_min;
function requireUseSyncExternalStoreShim_production_min() {
  if (hasRequiredUseSyncExternalStoreShim_production_min)
    return useSyncExternalStoreShim_production_min;
  hasRequiredUseSyncExternalStoreShim_production_min = 1;
  var e2 = React__default;
  function h2(a2, b2) {
    return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
  }
  var k = "function" === typeof Object.is ? Object.is : h2, l2 = e2.useState, m2 = e2.useEffect, n3 = e2.useLayoutEffect, p2 = e2.useDebugValue;
  function q(a2, b2) {
    var d2 = b2(), f2 = l2({ inst: { value: d2, getSnapshot: b2 } }), c2 = f2[0].inst, g = f2[1];
    n3(function() {
      c2.value = d2;
      c2.getSnapshot = b2;
      r2(c2) && g({ inst: c2 });
    }, [a2, d2, b2]);
    m2(function() {
      r2(c2) && g({ inst: c2 });
      return a2(function() {
        r2(c2) && g({ inst: c2 });
      });
    }, [a2]);
    p2(d2);
    return d2;
  }
  function r2(a2) {
    var b2 = a2.getSnapshot;
    a2 = a2.value;
    try {
      var d2 = b2();
      return !k(a2, d2);
    } catch (f2) {
      return true;
    }
  }
  function t2(a2, b2) {
    return b2();
  }
  var u2 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t2 : q;
  useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e2.useSyncExternalStore ? e2.useSyncExternalStore : u2;
  return useSyncExternalStoreShim_production_min;
}
var useSyncExternalStoreShim_development = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredUseSyncExternalStoreShim_development;
function requireUseSyncExternalStoreShim_development() {
  if (hasRequiredUseSyncExternalStoreShim_development)
    return useSyncExternalStoreShim_development;
  hasRequiredUseSyncExternalStoreShim_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      }
      var React = React__default;
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error2(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function is2(x, y2) {
        return x === y2 && (x !== 0 || 1 / x === 1 / y2) || x !== x && y2 !== y2;
      }
      var objectIs = typeof Object.is === "function" ? Object.is : is2;
      var useState2 = React.useState, useEffect2 = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
      var didWarnOld18Alpha = false;
      var didWarnUncachedGetSnapshot = false;
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot2) {
        {
          if (!didWarnOld18Alpha) {
            if (React.startTransition !== void 0) {
              didWarnOld18Alpha = true;
              error2("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
            }
          }
        }
        var value = getSnapshot();
        {
          if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            if (!objectIs(value, cachedValue)) {
              error2("The result of getSnapshot should be cached to avoid an infinite loop");
              didWarnUncachedGetSnapshot = true;
            }
          }
        }
        var _useState = useState2({
          inst: {
            value,
            getSnapshot
          }
        }), inst = _useState[0].inst, forceUpdate = _useState[1];
        useLayoutEffect(function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({
              inst
            });
          }
        }, [subscribe, value, getSnapshot]);
        useEffect2(function() {
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({
              inst
            });
          }
          var handleStoreChange = function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          };
          return subscribe(handleStoreChange);
        }, [subscribe]);
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        var prevValue = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(prevValue, nextValue);
        } catch (error3) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot2) {
        return getSnapshot();
      }
      var canUseDOM2 = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
      var isServerEnvironment = !canUseDOM2;
      var shim2 = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
      var useSyncExternalStore$2 = React.useSyncExternalStore !== void 0 ? React.useSyncExternalStore : shim2;
      useSyncExternalStoreShim_development.useSyncExternalStore = useSyncExternalStore$2;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }
    })();
  }
  return useSyncExternalStoreShim_development;
}
if (process.env.NODE_ENV === "production") {
  shim.exports = requireUseSyncExternalStoreShim_production_min();
} else {
  shim.exports = requireUseSyncExternalStoreShim_development();
}
var shimExports = shim.exports;
var getServerSnapshot = function() {
};
function createReaction$1(adm) {
  adm.reaction = new Reaction("observer".concat(adm.name), function() {
    var _a3;
    adm.stateVersion = Symbol();
    (_a3 = adm.onStoreChange) === null || _a3 === void 0 ? void 0 : _a3.call(adm);
  });
}
function useObserver(render, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  var admRef = React__default.useRef(null);
  if (!admRef.current) {
    var adm_1 = {
      reaction: null,
      onStoreChange: null,
      stateVersion: Symbol(),
      name: baseComponentName,
      subscribe: function(onStoreChange) {
        observerFinalizationRegistry.unregister(adm_1);
        adm_1.onStoreChange = onStoreChange;
        if (!adm_1.reaction) {
          createReaction$1(adm_1);
          adm_1.stateVersion = Symbol();
        }
        return function() {
          var _a3;
          adm_1.onStoreChange = null;
          (_a3 = adm_1.reaction) === null || _a3 === void 0 ? void 0 : _a3.dispose();
          adm_1.reaction = null;
        };
      },
      getSnapshot: function() {
        return adm_1.stateVersion;
      }
    };
    admRef.current = adm_1;
  }
  var adm = admRef.current;
  if (!adm.reaction) {
    createReaction$1(adm);
    observerFinalizationRegistry.register(admRef, adm, adm);
  }
  React__default.useDebugValue(adm.reaction, printDebugValue);
  shimExports.useSyncExternalStore(
    // Both of these must be stable, otherwise it would keep resubscribing every render.
    adm.subscribe,
    adm.getSnapshot,
    getServerSnapshot
  );
  var renderResult;
  var exception;
  adm.reaction.track(function() {
    try {
      renderResult = render();
    } catch (e2) {
      exception = e2;
    }
  });
  if (exception) {
    throw exception;
  }
  return renderResult;
}
var warnObserverOptionsDeprecated = true;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof forwardRef === "function" && forwardRef(function(props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof memo === "function" && memo(function(props) {
  return null;
})["$$typeof"];
function observer$1(baseComponent, options) {
  var _a3;
  if (process.env.NODE_ENV !== "production" && warnObserverOptionsDeprecated && options) {
    warnObserverOptionsDeprecated = false;
    console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
  }
  if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  var useForwardRef = (_a3 = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a3 !== void 0 ? _a3 : false;
  var render = baseComponent;
  var baseComponentName = baseComponent.displayName || baseComponent.name;
  if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
    useForwardRef = true;
    render = baseComponent["render"];
    if (typeof render !== "function") {
      throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
    }
  }
  var observerComponent = function(props, ref2) {
    return useObserver(function() {
      return render(props, ref2);
    }, baseComponentName);
  };
  observerComponent.displayName = baseComponent.displayName;
  Object.defineProperty(observerComponent, "name", {
    value: baseComponent.name,
    writable: true,
    configurable: true
  });
  if (baseComponent.contextTypes) {
    observerComponent.contextTypes = baseComponent.contextTypes;
  }
  if (useForwardRef) {
    observerComponent = forwardRef(observerComponent);
  }
  observerComponent = memo(observerComponent);
  copyStaticProperties(baseComponent, observerComponent);
  if ("production" !== process.env.NODE_ENV) {
    Object.defineProperty(observerComponent, "contextTypes", {
      set: function() {
        var _a4, _b2;
        throw new Error("[mobx-react-lite] `".concat(this.displayName || ((_a4 = this.type) === null || _a4 === void 0 ? void 0 : _a4.displayName) || ((_b2 = this.type) === null || _b2 === void 0 ? void 0 : _b2.name) || "Component", ".contextTypes` must be set before applying `observer`."));
      }
    });
  }
  return observerComponent;
}
var hoistBlackList = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: true
};
function copyStaticProperties(base, target2) {
  Object.keys(base).forEach(function(key) {
    if (!hoistBlackList[key]) {
      Object.defineProperty(target2, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}
if ("production" !== process.env.NODE_ENV)
  ;
(function(o2, n3) {
  var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m2)
    return o2;
  var i = m2.call(o2), r2, ar = [], e2;
  try {
    while ((n3 === void 0 || n3-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error2) {
    e2 = { error: error2 };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
});
var _a2;
observerBatching(unstable_batchedUpdates);
(_a2 = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a2 !== void 0 ? _a2 : function() {
};
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (var i = 0; i < keysA.length; i++) {
    if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
function is(x, y2) {
  if (x === y2) {
    return x !== 0 || 1 / x === 1 / y2;
  } else {
    return x !== x && y2 !== y2;
  }
}
var mobxMixins = /* @__PURE__ */ Symbol("patchMixins");
var mobxPatchedDefinition = /* @__PURE__ */ Symbol("patchedDefinition");
function getMixins(target2, methodName) {
  var mixins = target2[mobxMixins] = target2[mobxMixins] || {};
  var methodMixins = mixins[methodName] = mixins[methodName] || {};
  methodMixins.locks = methodMixins.locks || 0;
  methodMixins.methods = methodMixins.methods || [];
  return methodMixins;
}
function wrapper(realMethod, mixins) {
  var _this = this;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  mixins.locks++;
  try {
    var retVal;
    if (realMethod !== void 0 && realMethod !== null) {
      retVal = realMethod.apply(this, args);
    }
    return retVal;
  } finally {
    mixins.locks--;
    if (mixins.locks === 0) {
      mixins.methods.forEach(function(mx) {
        mx.apply(_this, args);
      });
    }
  }
}
function wrapFunction(realMethod, mixins) {
  var fn = function fn2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
  };
  return fn;
}
function patch(target2, methodName, mixinMethod) {
  var mixins = getMixins(target2, methodName);
  if (mixins.methods.indexOf(mixinMethod) < 0) {
    mixins.methods.push(mixinMethod);
  }
  var oldDefinition = Object.getOwnPropertyDescriptor(target2, methodName);
  if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
    return;
  }
  var originalMethod = target2[methodName];
  var newDefinition = createDefinition(target2, methodName, oldDefinition ? oldDefinition.enumerable : void 0, mixins, originalMethod);
  Object.defineProperty(target2, methodName, newDefinition);
}
function createDefinition(target2, methodName, enumerable, mixins, originalMethod) {
  var _ref;
  var wrappedFunc = wrapFunction(originalMethod, mixins);
  return _ref = {}, _ref[mobxPatchedDefinition] = true, _ref.get = function get3() {
    return wrappedFunc;
  }, _ref.set = function set4(value) {
    if (this === target2) {
      wrappedFunc = wrapFunction(value, mixins);
    } else {
      var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
      Object.defineProperty(this, methodName, newDefinition);
    }
  }, _ref.configurable = true, _ref.enumerable = enumerable, _ref;
}
var administrationSymbol = /* @__PURE__ */ Symbol("ObserverAdministration");
var isMobXReactObserverSymbol = /* @__PURE__ */ Symbol("isMobXReactObserver");
var observablePropDescriptors;
if (process.env.NODE_ENV !== "production") {
  observablePropDescriptors = {
    props: /* @__PURE__ */ createObservablePropDescriptor("props"),
    state: /* @__PURE__ */ createObservablePropDescriptor("state"),
    context: /* @__PURE__ */ createObservablePropDescriptor("context")
  };
}
function getAdministration(component) {
  var _component$administra;
  return (_component$administra = component[administrationSymbol]) != null ? _component$administra : component[administrationSymbol] = {
    reaction: null,
    mounted: false,
    reactionInvalidatedBeforeMount: false,
    forceUpdate: null,
    name: getDisplayName(component.constructor),
    state: void 0,
    props: void 0,
    context: void 0
  };
}
function makeClassComponentObserver(componentClass) {
  var prototype = componentClass.prototype;
  if (componentClass[isMobXReactObserverSymbol]) {
    var displayName = getDisplayName(componentClass);
    throw new Error("The provided component class (" + displayName + ") has already been declared as an observer component.");
  } else {
    componentClass[isMobXReactObserverSymbol] = true;
  }
  if (prototype.componentWillReact) {
    throw new Error("The componentWillReact life-cycle event is no longer supported");
  }
  if (componentClass["__proto__"] !== PureComponent) {
    if (!prototype.shouldComponentUpdate) {
      prototype.shouldComponentUpdate = observerSCU;
    } else if (prototype.shouldComponentUpdate !== observerSCU) {
      throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
    }
  }
  if (process.env.NODE_ENV !== "production") {
    Object.defineProperties(prototype, observablePropDescriptors);
  }
  var originalRender = prototype.render;
  if (typeof originalRender !== "function") {
    var _displayName = getDisplayName(componentClass);
    throw new Error("[mobx-react] class component (" + _displayName + ") is missing `render` method.\n`observer` requires `render` being a function defined on prototype.\n`render = () => {}` or `render = function() {}` is not supported.");
  }
  prototype.render = function() {
    Object.defineProperty(this, "render", {
      // There is no safe way to replace render, therefore it's forbidden.
      configurable: false,
      writable: false,
      value: createReactiveRender.call(this, originalRender)
    });
    return this.render();
  };
  var originalComponentDidMount = prototype.componentDidMount;
  prototype.componentDidMount = function() {
    var _this = this;
    if (process.env.NODE_ENV !== "production" && this.componentDidMount !== Object.getPrototypeOf(this).componentDidMount) {
      var _displayName2 = getDisplayName(componentClass);
      throw new Error("[mobx-react] `observer(" + _displayName2 + ").componentDidMount` must be defined on prototype.\n`componentDidMount = () => {}` or `componentDidMount = function() {}` is not supported.");
    }
    var admin = getAdministration(this);
    admin.mounted = true;
    observerFinalizationRegistry.unregister(this);
    admin.forceUpdate = function() {
      return _this.forceUpdate();
    };
    if (!admin.reaction || admin.reactionInvalidatedBeforeMount) {
      admin.forceUpdate();
    }
    return originalComponentDidMount == null ? void 0 : originalComponentDidMount.apply(this, arguments);
  };
  patch(prototype, "componentWillUnmount", function() {
    var _admin$reaction;
    var admin = getAdministration(this);
    (_admin$reaction = admin.reaction) == null ? void 0 : _admin$reaction.dispose();
    admin.reaction = null;
    admin.forceUpdate = null;
    admin.mounted = false;
    admin.reactionInvalidatedBeforeMount = false;
  });
  return componentClass;
}
function getDisplayName(componentClass) {
  return componentClass.displayName || componentClass.name || "<component>";
}
function createReactiveRender(originalRender) {
  var boundOriginalRender = originalRender.bind(this);
  var admin = getAdministration(this);
  function reactiveRender() {
    if (!admin.reaction) {
      admin.reaction = createReaction(admin);
      if (!admin.mounted) {
        observerFinalizationRegistry.register(this, admin, this);
      }
    }
    var error2 = void 0;
    var renderResult = void 0;
    admin.reaction.track(function() {
      try {
        renderResult = allowStateChanges(false, boundOriginalRender);
      } catch (e2) {
        error2 = e2;
      }
    });
    if (error2) {
      throw error2;
    }
    return renderResult;
  }
  return reactiveRender;
}
function createReaction(admin) {
  return new Reaction(admin.name + ".render()", function() {
    if (!admin.mounted) {
      admin.reactionInvalidatedBeforeMount = true;
      return;
    }
    try {
      admin.forceUpdate == null ? void 0 : admin.forceUpdate();
    } catch (error2) {
      var _admin$reaction2;
      (_admin$reaction2 = admin.reaction) == null ? void 0 : _admin$reaction2.dispose();
      admin.reaction = null;
    }
  });
}
function observerSCU(nextProps, nextState) {
  if (this.state !== nextState) {
    return true;
  }
  return !shallowEqual(this.props, nextProps);
}
function createObservablePropDescriptor(key) {
  return {
    configurable: true,
    enumerable: true,
    get: function get3() {
      var admin = getAdministration(this);
      var derivation = getGlobalState().trackingDerivation;
      if (derivation && derivation !== admin.reaction) {
        throw new Error('[mobx-react] Cannot read "' + admin.name + "." + key + `" in a reactive context, as it isn't observable.
                    Please use component lifecycle method to copy the value into a local observable first.
                    See https://github.com/mobxjs/mobx/blob/main/packages/mobx-react/README.md#note-on-using-props-and-state-in-derivations`);
      }
      return admin[key];
    },
    set: function set4(value) {
      getAdministration(this)[key] = value;
    }
  };
}
function observer(component, context) {
  if (context && context.kind !== "class") {
    throw new Error("The @observer decorator can be used on classes only");
  }
  if (component["isMobxInjector"] === true) {
    console.warn("Mobx observer: You are trying to use `observer` on a component that already has `inject`. Please apply `observer` before applying `inject`");
  }
  if (Object.prototype.isPrototypeOf.call(Component, component) || Object.prototype.isPrototypeOf.call(PureComponent, component)) {
    return makeClassComponentObserver(component);
  } else {
    return observer$1(component);
  }
}
/* @__PURE__ */ Number.parseInt(React__default.version.split(".")[0]);
if (!Component) {
  throw new Error("mobx-react requires React to be available");
}
if (!observable) {
  throw new Error("mobx-react requires mobx to be available");
}
class TopBarOptions {
  constructor() {
    __publicField(this, "visibleHelp", true);
    __publicField(this, "visibleNotification", true);
    makeAutoObservable(this);
  }
  setVisibleHelp(visible) {
    this.visibleHelp = visible;
  }
  setVisibleNotification(visible) {
    this.visibleNotification = visible;
  }
}
const topBarOptions = new TopBarOptions();
const TopBar = observer(() => {
  const locator = useLocator();
  const layout = useLayout();
  const ui = useUI();
  const progressbar2 = useRef(null);
  const themeIcon = useRef(null);
  const [paths, setPaths] = useState([]);
  const [notiCount, setNotiCount] = useState(0);
  useEffect(() => {
    const setTheme = autorun(() => {
      const path2 = themeIcon.current;
      if (!path2)
        return;
      if (layout.theme === Themes.dark) {
        path2.setAttribute("d", VectorIcons.sun);
      } else {
        path2.setAttribute("d", VectorIcons.moon);
      }
    });
    return () => {
      setTheme();
    };
  });
  useEffect(() => {
    const setProgress = autorun(() => {
      const bar2 = progressbar2.current;
      if (!bar2)
        return;
      const progress = locator.progress;
      if (progress === 1) {
        bar2.style.opacity = "0";
        bar2.style.transform = `scaleX(1)`;
        setTimeout(() => clearProgress(), 350);
      } else {
        bar2.style.opacity = "1";
        bar2.style.transitionDuration = "350ms, 350ms, 350ms";
        bar2.style.transform = `scaleX(${progress})`;
      }
    });
    const clearProgress = () => {
      if (locator.isLoading)
        return;
      const bar2 = progressbar2.current;
      if (!bar2)
        return;
      bar2.style.opacity = "1";
      bar2.style.transitionDuration = "0ms, 350ms, 350ms";
      bar2.style.transform = `scaleX(0)`;
    };
    return () => {
      setProgress();
    };
  });
  useEffect(() => {
    const setBread = autorun(() => {
      var _a3;
      (_a3 = locator.current) == null ? void 0 : _a3.fullPaths;
      const paths2 = locator.getBreadcrumbPaths();
      setPaths(paths2);
    });
    return () => {
      setBread();
    };
  }, []);
  useEffect(() => {
    setNotiCount(2);
  }, []);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: styles$4.container, children: [jsxRuntimeExports.jsxs(Link, { className: styles$4.logo, to: locator.baseUrl, children: [jsxRuntimeExports.jsx("div", { className: styles$4.icon, children: jsxRuntimeExports.jsx("img", { className: styles$4.img, src: layout.logo ?? logo$1 }) }), jsxRuntimeExports.jsx("div", { className: styles$4.title, children: layout.title })] }), jsxRuntimeExports.jsx("div", { className: styles$4.breadCrumb, children: paths.map((display2, index) => {
    var _a3;
    const fullPath = ((_a3 = locator.current) == null ? void 0 : _a3.fullPaths) ?? [];
    const toPath = fullPath.slice(0, index + 1).join("/");
    return jsxRuntimeExports.jsxs("div", { className: styles$4.bread, children: [jsxRuntimeExports.jsx(Link, { to: toPath, className: styles$4.path, children: display2 }), index !== paths.length - 1 ? jsxRuntimeExports.jsx("div", { className: styles$4.slash, children: "/" }) : null] }, index);
  }) }), jsxRuntimeExports.jsx("div", { className: styles$4.flex }), jsxRuntimeExports.jsxs("div", { className: styles$4.userButtons, children: [topBarOptions.visibleHelp && jsxRuntimeExports.jsxs("div", { className: styles$4.hoverButton, onClick: () => locator.go(locator.helpUrl), children: [jsxRuntimeExports.jsx("svg", { className: styles$4.icon, viewBox: "0 -960 960 960", children: jsxRuntimeExports.jsx("path", { d: VectorIcons.question }) }), jsxRuntimeExports.jsx("div", { className: styles$4.tooltip, children: "HELP" })] }), jsxRuntimeExports.jsxs("div", { className: styles$4.hoverButton, onClick: () => layout.toggleTheme(), children: [jsxRuntimeExports.jsx("svg", { className: styles$4.icon, viewBox: "0 -960 960 960", children: jsxRuntimeExports.jsx("path", { ref: themeIcon }) }), jsxRuntimeExports.jsx("div", { className: styles$4.tooltip, children: "THEME" })] }), topBarOptions.visibleNotification && jsxRuntimeExports.jsxs("div", { className: styles$4.hoverButton, onClick: (e2) => ui.toggleNotificationAsync(e2), children: [jsxRuntimeExports.jsx("svg", { className: styles$4.icon, viewBox: "0 -960 960 960", children: jsxRuntimeExports.jsx("path", { d: VectorIcons.notification }) }), notiCount > 0 ? jsxRuntimeExports.jsx("span", { className: styles$4.badge, children: notiCount }) : null, jsxRuntimeExports.jsx("div", { className: styles$4.tooltip, children: "NOTIFICATION" })] }), jsxRuntimeExports.jsxs("div", { className: styles$4.hoverButton, onClick: (e2) => ui.showUserMenuAsync(e2), children: [jsxRuntimeExports.jsx("svg", { className: styles$4.icon, children: jsxRuntimeExports.jsx("path", { d: VectorIcons.user }) }), jsxRuntimeExports.jsx("div", { className: styles$4.tooltip, children: "User" })] })] })] }), jsxRuntimeExports.jsx("span", { className: styles$4.progressbar, children: jsxRuntimeExports.jsx("span", { className: styles$4.bar, ref: progressbar2 }) })] });
});
const leftNavContainer = "_leftNavContainer_10b87_185";
const navMenus = "_navMenus_10b87_198";
const singleMenu = "_singleMenu_10b87_204";
const icon$1 = "_icon_10b87_213";
const text = "_text_10b87_227";
const selected = "_selected_10b87_240";
const groupMenu = "_groupMenu_10b87_255";
const groupHeader = "_groupHeader_10b87_258";
const flex$1 = "_flex_10b87_291";
const toggle = "_toggle_10b87_295";
const groupBody = "_groupBody_10b87_312";
const subMenu = "_subMenu_10b87_312";
const collapsed = "_collapsed_10b87_358";
const separator = "_separator_10b87_370";
const line = "_line_10b87_376";
const navFooter = "_navFooter_10b87_399";
const button$1 = "_button_10b87_403";
const img = "_img_10b87_409";
const expand = "_expand_10b87_420";
const small = "_small_10b87_424";
const smallWindowExpandedOverlay = "_smallWindowExpandedOverlay_10b87_428";
const styles$3 = {
  leftNavContainer,
  navMenus,
  singleMenu,
  icon: icon$1,
  text,
  selected,
  groupMenu,
  groupHeader,
  flex: flex$1,
  toggle,
  groupBody,
  subMenu,
  collapsed,
  separator,
  line,
  navFooter,
  button: button$1,
  img,
  expand,
  small,
  smallWindowExpandedOverlay
};
function LeftNav() {
  const menu2 = useMenu();
  const layout = useLayout();
  const ui = useUI();
  const [expand2, setExpand] = useState(true);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  const [toggleGroup, setToggleGroup] = useState({});
  const [selectedGroup, setSelectedGroup] = useState("");
  const groupChanged = (key) => {
    setTimeout(() => {
      setSelectedGroup(key);
    }, 0);
  };
  const onToggleGroupMenu = (e2, key, menu22) => {
    if (expand2) {
      setToggleGroup((prevState) => ({
        ...prevState,
        [key]: !prevState[key]
      }));
    } else {
      ui.toggleSubNavAsync(e2, menu22);
    }
  };
  const onHoverMenuDisplay = (e2, display2) => {
    if (expand2)
      return;
    ui.hoverNavTooltipAsync(e2, display2);
  };
  useEffect(() => {
    const setLayout = autorun(() => {
      const isSmall = layout.isMediumScreen;
      if (isSmall) {
        setIsSmallWindow(true);
        setExpand(false);
      } else {
        setIsSmallWindow(false);
        setExpand(true);
        ui.subNavMenu.hideClickAsync();
      }
    });
    return () => {
      setLayout();
    };
  }, []);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: `${styles$3.leftNavContainer} ${isSmallWindow ? styles$3.small : ""} ${expand2 ? styles$3.expand : ""}`, children: [jsxRuntimeExports.jsx("div", { className: styles$3.navMenus, children: menu2.menus.map((menu22, index) => {
    var _a3, _b2;
    if (menu22.type === "separator") {
      const height = { height: menu22.height ? menu22.height : void 0 };
      return jsxRuntimeExports.jsx("div", { className: styles$3.separator, style: height, children: menu22.line && jsxRuntimeExports.jsx("div", { className: styles$3.line }) }, index);
    } else if (menu22.type === "single") {
      const hasParm = (_a3 = menu22.path) == null ? void 0 : _a3.endsWith("/:id?");
      const path2 = hasParm ? (_b2 = menu22.path) == null ? void 0 : _b2.replace("/:id?", "") : menu22.path;
      return jsxRuntimeExports.jsxs(NavLink, { to: path2, className: ({ isActive }) => {
        if (isActive)
          groupChanged("");
        return `${styles$3.singleMenu} ${isActive ? styles$3.selected : ""}`;
      }, onMouseEnter: (e2) => onHoverMenuDisplay(e2, menu22.display), end: !hasParm, children: [jsxRuntimeExports.jsx("svg", { className: styles$3.icon, viewBox: menu22.iconViewBox ?? "0 0 24 24", children: jsxRuntimeExports.jsx("path", { d: menu22.iconData ?? VectorIcons.cube }) }), jsxRuntimeExports.jsx("div", { className: styles$3.text, children: menu22.display })] }, menu22.key);
    } else if (menu22.type === "group") {
      const selected2 = menu22.subMenu.find((s2) => s2.key === selectedGroup) !== void 0;
      const showMenu = toggleGroup[index] ?? false;
      return jsxRuntimeExports.jsxs("div", { className: `${styles$3.groupMenu}
                  ${selected2 ? styles$3.selected : ""} ${expand2 ? "" : styles$3.collapsed}`, children: [jsxRuntimeExports.jsxs("div", { className: `${styles$3.groupHeader}`, onClick: (e2) => onToggleGroupMenu(e2, index, menu22), onMouseEnter: (e2) => onHoverMenuDisplay(e2, menu22.display), children: [jsxRuntimeExports.jsx("svg", { className: styles$3.icon, viewBox: menu22.iconViewBox ?? "0 0 24 24", children: jsxRuntimeExports.jsx("path", { d: menu22.iconData ?? VectorIcons.group }) }), jsxRuntimeExports.jsx("div", { className: styles$3.text, children: menu22.display }), jsxRuntimeExports.jsx("div", { className: styles$3.flex }), jsxRuntimeExports.jsx("svg", { className: styles$3.toggle, viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { d: showMenu ? VectorIcons.angleDown : VectorIcons.angleUp }) })] }), jsxRuntimeExports.jsx("div", { className: styles$3.groupBody, hidden: !showMenu || !expand2, children: menu22.subMenu.map((child) => {
        var _a4, _b3;
        const hasParm = (_a4 = child.path) == null ? void 0 : _a4.endsWith("/:id?");
        const path2 = hasParm ? (_b3 = child.path) == null ? void 0 : _b3.replace("/:id?", "") : child.path;
        return jsxRuntimeExports.jsx(NavLink, { to: path2, className: ({ isActive }) => {
          if (isActive)
            groupChanged(child.key);
          return `${styles$3.subMenu} ${isActive ? styles$3.selected : ""}`;
        }, end: !hasParm, children: jsxRuntimeExports.jsx("div", { className: styles$3.text, children: child.display }) }, child.key);
      }) })] }, index);
    } else {
      return null;
    }
  }) }), jsxRuntimeExports.jsx("div", { className: styles$3.navFooter, children: jsxRuntimeExports.jsx("div", { className: styles$3.button, onClick: () => setExpand(!expand2), children: jsxRuntimeExports.jsx("svg", { className: styles$3.img, viewBox: "0 0 32 32", children: jsxRuntimeExports.jsx("path", { d: expand2 ? VectorIcons.leftChevron : VectorIcons.rightChevron }) }) }) })] }), jsxRuntimeExports.jsx("div", { className: isSmallWindow && expand2 ? styles$3.smallWindowExpandedOverlay : "", onClick: () => setExpand(false) })] });
}
const shell = "_shell_bv7ze_185";
const header = "_header_bv7ze_190";
const main$1 = "_main_bv7ze_197";
const nav = "_nav_bv7ze_205";
const content$1 = "_content_bv7ze_210";
const styles$2 = {
  shell,
  header,
  main: main$1,
  nav,
  content: content$1
};
function AppShell() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted && jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: jsxRuntimeExports.jsxs("div", { className: styles$2.shell, children: [jsxRuntimeExports.jsx("header", { className: styles$2.header, children: jsxRuntimeExports.jsx(TopBar, {}) }), jsxRuntimeExports.jsxs("main", { className: styles$2.main, children: [jsxRuntimeExports.jsx("div", { className: styles$2.nav, children: jsxRuntimeExports.jsx(LeftNav, {}) }), jsxRuntimeExports.jsx("div", { className: styles$2.content, children: jsxRuntimeExports.jsx(Outlet, {}) })] }), jsxRuntimeExports.jsx("footer", {})] }) });
}
const teapot = "_teapot_1p2xm_35";
const styles$1 = {
  "error-container": "_error-container_1p2xm_1",
  "error-button": "_error-button_1p2xm_21",
  teapot
};
function useDocumentTitle(title2, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);
  useEffect(() => {
    document.title = title2 ?? defaultTitle.current;
  }, [title2]);
  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, []);
}
function ErrorPage() {
  useDocumentTitle("Error Occurred");
  const error2 = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("error occurred");
  }, []);
  if (isRouteErrorResponse(error2)) {
    switch (error2.status) {
      case 400:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { children: "400 - 잘못된 요청" }), jsxRuntimeExports.jsx("p", { children: "죄송합니다, 요청이 잘못되었습니다." }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
      case 401:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { children: "401 - 권한 없음" }), jsxRuntimeExports.jsx("p", { children: "이 페이지를 볼 권한이 없습니다." }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
      case 403:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { children: "403 - 액세스 거부" }), jsxRuntimeExports.jsx("p", { children: "죄송합니다, 해당 페이지에 액세스 권한이 없습니다." }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
      case 404:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { children: "404 - 페이지를 찾을 수 없음" }), jsxRuntimeExports.jsx("p", { children: "죄송합니다, 요청하신 페이지를 찾을 수 없습니다." }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
      case 418:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { className: styles$1["teapot"], children: "418 - I'm a teapot" }), jsxRuntimeExports.jsx("p", { children: "이게 뭐에요? ☕" }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
      case 500:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { children: "500 - 서버 오류" }), jsxRuntimeExports.jsx("p", { children: "죄송합니다, 서버에서 오류가 발생했습니다." }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
      default:
        return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsxs("h1", { children: [error2.status, " - 알 수 없는 오류"] }), jsxRuntimeExports.jsx("p", { children: "죄송합니다, 알 수 없는 오류가 발생했습니다." }), jsxRuntimeExports.jsx("p", { children: error2.data }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
    }
  }
  return jsxRuntimeExports.jsxs("div", { className: styles$1["error-container"], children: [jsxRuntimeExports.jsx("h1", { children: "오류 발생" }), jsxRuntimeExports.jsx("p", { children: "죄송합니다, 뭔가 잘못되었습니다." }), jsxRuntimeExports.jsx("div", { onClick: () => navigate(-1), className: styles$1["error-button"], children: "이전으로 돌아가기" })] });
}
const _LocatorStore = class _LocatorStore {
  constructor() {
    __publicField(this, "routeData");
    __publicField(this, "helpPath", "/help");
    __publicField(this, "basePath", "/");
    __publicField(this, "keyPath", /* @__PURE__ */ new Map());
    __publicField(this, "router");
    __publicField(this, "currentlocation");
    __publicField(this, "eventHandler", /* @__PURE__ */ new Map());
    __publicField(this, "_progress", 0);
    __publicField(this, "loading", false);
    makeAutoObservable(this);
  }
  get helpUrl() {
    return this.helpPath;
  }
  get baseUrl() {
    return this.basePath;
  }
  get current() {
    return this.currentlocation;
  }
  set progress(value) {
    if (value > 100)
      value = 100;
    if (value < 20)
      value = 20;
    if (value === 100) {
      this.loading = false;
    } else {
      this.loading = true;
    }
    this._progress = value / 100;
  }
  get progress() {
    return this._progress;
  }
  get isLoading() {
    return this.loading;
  }
  initLocator(routes, helpPath, basePath, baseElement, errorElement, otherShells) {
    this.basePath = basePath ?? this.basePath;
    if (!this.basePath.startsWith("/")) {
      this.basePath = `/${this.basePath}`;
    }
    this.helpPath = helpPath ?? this.helpPath;
    if (!this.helpPath.startsWith("/")) {
      this.helpPath = `/${this.helpPath}`;
    }
    const baseRoutes = this.setRoute(routes);
    const router = this.setRouter(baseRoutes, baseElement, errorElement, otherShells);
    this.router = router;
    return [this.keyPath, this.router];
  }
  go(path2, data) {
    var _a3, _b2;
    this.routeData = data;
    if (path2.startsWith("/")) {
      (_a3 = this.router) == null ? void 0 : _a3.navigate(path2);
    } else {
      (_b2 = this.router) == null ? void 0 : _b2.navigate(`${this.basePath}/${path2}`);
    }
  }
  goBack() {
    var _a3;
    (_a3 = this.router) == null ? void 0 : _a3.navigate(-1);
  }
  goForward() {
    var _a3;
    (_a3 = this.router) == null ? void 0 : _a3.navigate(1);
  }
  reload() {
    var _a3;
    (_a3 = this.router) == null ? void 0 : _a3.navigate(0);
  }
  // 설정한 key값과 일치하는 로케이션 체인지 이벤트가 발생하면 callback을 실행한다.
  addChangedEvent(key, callback) {
    this.eventHandler.set(key, callback);
  }
  // 설정한 key값과 일치하는 로케이션 체인지 이벤트를 제거한다.
  removeChangedEvent(key) {
    this.eventHandler.delete(key);
  }
  onLocationChanged(current) {
    window.dispatchEvent(new CustomEvent(_LocatorStore.LOCATION_CHANGED_NAME, {
      detail: current
    }));
  }
  setRoute(routes, parentPath) {
    return routes.map((r2) => {
      const { key, useParam, children, ...route } = r2;
      if (!key)
        throw new Error("key is required");
      if (parentPath == null ? void 0 : parentPath.endsWith("/:id?"))
        throw new Error("You cannot use 'useParam' with 'children' in a Route.");
      if (route.path) {
        if (route.path === "" || route.path === "/") {
          route.path = "";
          route.index = true;
          this.keyPath.set(key, parentPath ? `${parentPath}` : "/");
          if (useParam)
            throw new Error("You cannot use 'useParam' in 'index route'");
        } else {
          if (route.path.startsWith("/")) {
            route.path = route.path.substring(1, route.path.length);
          }
          if (route.path.endsWith("/")) {
            route.path = route.path.substring(0, route.path.length - 1);
          }
          if (useParam) {
            route.path = `${route.path}/:id?`;
          }
          this.keyPath.set(key, parentPath ? `${parentPath}/${route.path}` : route.path);
        }
      } else if (route.index) {
        route.path = "";
        this.keyPath.set(key, parentPath ? `${parentPath}` : this.basePath);
        if (useParam)
          throw new Error("You cannot use 'useParam' in 'index route'");
      } else {
        throw new Error("path or index is required");
      }
      const loaderCopy = route.loader;
      route.loader = async ({ request, params }) => {
        var _a3, _b2;
        let newPage = false;
        if (request.url !== ((_a3 = this.currentlocation) == null ? void 0 : _a3.request.url) && !params.id) {
          this.progress = 20;
          newPage = true;
        }
        const url = new URL(request.url);
        const fullPaths = decodeURIComponent(url.pathname).replace(this.basePath, "").split("/").filter((x) => x.length > 0);
        const paths = (_b2 = params.id) == null ? void 0 : _b2.split("/").filter((x) => x.length > 0);
        const query = Object.fromEntries(url.searchParams.entries());
        this.currentlocation = {
          key,
          request,
          url,
          fullPaths,
          paths,
          query
        };
        this.onLocationChanged(this.currentlocation);
        if (this.eventHandler.has(key)) {
          const callback = this.eventHandler.get(key);
          if (callback)
            callback(this.currentlocation);
        }
        if (newPage)
          this.progress = 40;
        if (loaderCopy) {
          const result = await loaderCopy({ request, params });
          if (newPage)
            this.progress = 100;
          return result;
        } else {
          if (newPage)
            this.progress = 100;
          return new Response(null, { status: 200 });
        }
      };
      if (children) {
        if (route.element || route.Component) {
          throw new Error(`You cannot use 'element' or 'Component' with 'children' in a Route. 
          Please using 'index' in children instead.`);
        }
        if (useParam) {
          throw new Error("You cannot use 'useParam' with 'children' in a Route.");
        }
        route.children = this.setRoute(children, this.keyPath.get(key));
      }
      return route;
    });
  }
  setRouter(routes, base, error2, other) {
    const baseRoutes = [
      {
        path: this.basePath,
        element: base ?? jsxRuntimeExports.jsx(AppShell, {}),
        errorElement: this.basePath === "/" ? error2 ?? jsxRuntimeExports.jsx(ErrorPage, {}) : void 0,
        children: routes
      }
    ];
    if (other) {
      baseRoutes.push(...other);
    }
    if (this.basePath !== "/") {
      baseRoutes.push({
        path: "",
        element: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: jsxRuntimeExports.jsxs("pre", { children: [" WRONG URL! Base Path: [", this.basePath, "] "] }) }),
        errorElement: error2 ?? jsxRuntimeExports.jsx(ErrorPage, {})
      });
    }
    return createBrowserRouter([...baseRoutes]);
  }
  getBreadcrumbPaths() {
    var _a3, _b2, _c2, _d2, _e2;
    const key = (_a3 = this.currentlocation) == null ? void 0 : _a3.key;
    const menu2 = DI.get(MenuStore);
    const paths = [];
    const currentMenu = menu2.menus.find((x) => {
      if (x.type === "single") {
        return x.key === key;
      } else if (x.type === "group" && x.subMenu) {
        return x.subMenu.find((y2) => y2.key === key);
      }
    });
    if ((currentMenu == null ? void 0 : currentMenu.type) === "single") {
      paths.push(currentMenu.display);
      const rest = ((_c2 = (_b2 = this.currentlocation) == null ? void 0 : _b2.fullPaths) == null ? void 0 : _c2.slice(1)) ?? [];
      paths.push(...rest);
    } else if ((currentMenu == null ? void 0 : currentMenu.type) === "group" && currentMenu.subMenu) {
      paths.push(currentMenu.display);
      const subMenu2 = currentMenu.subMenu.find((y2) => y2.key === key);
      if (subMenu2)
        paths.push(subMenu2.display);
      const rest = ((_e2 = (_d2 = this.currentlocation) == null ? void 0 : _d2.fullPaths) == null ? void 0 : _e2.slice(2)) ?? [];
      paths.push(...rest);
    }
    return paths;
  }
  // 현재 로케이션의 특정 인덱스의 표시(Display)경로를 가져옵니다.
  getDisplay(index) {
    var _a3, _b2;
    const path2 = (_b2 = (_a3 = this.currentlocation) == null ? void 0 : _a3.fullPaths) == null ? void 0 : _b2.at(index);
    if (path2 == null)
      return "";
    if (path2.match(/^[a-zA-Z]/)) {
      const display2 = path2.charAt(0).toUpperCase() + path2.slice(1);
      return display2;
    } else {
      return path2;
    }
  }
};
__publicField(_LocatorStore, "LOCATION_CHANGED_NAME", "location-changed");
let LocatorStore = _LocatorStore;
let SubNavMenu = (_s = class extends FlyoutElement {
  constructor() {
    super(...arguments);
    __publicField(this, "keepHover", true);
    __publicField(this, "position", Position.RightBottom);
    __publicField(this, "locator");
    __publicField(this, "key");
    __publicField(this, "item");
  }
  connectedCallback() {
    super.connectedCallback();
    this.style.zIndex = "4";
    autorun(() => {
      var _a3, _b2;
      this.key = (_b2 = (_a3 = this.locator) == null ? void 0 : _a3.current) == null ? void 0 : _b2.key;
    });
  }
  render() {
    var _a3, _b2, _c2;
    const selected2 = ((_a3 = this.item) == null ? void 0 : _a3.subMenu.find((i) => i.key === this.key)) ? true : false;
    return html$1`
      <div class="container">
        <div class="header ${selected2 ? "selected" : null}">
          ${(_b2 = this.item) == null ? void 0 : _b2.display}
        </div>
        <div class="body">
          ${(_c2 = this.item) == null ? void 0 : _c2.subMenu.map((menu2) => html$1`
            <div key=${menu2.key} class="menu ${menu2.key === this.key ? "selected" : null}"
              @click=${() => this.handleChangeLocation(menu2)}>
              ${menu2.display}
            </div>
          `)}
        </div>
      </div>
    `;
  }
  handleChangeLocation(menu2) {
    const path2 = menu2.path;
    const hasParm = path2.endsWith("/:id?");
    const url = hasParm ? path2.replace("/:id?", "") : path2;
    if (menu2.force) {
      window.location.href = url;
    } else {
      this.locator.go(url);
    }
  }
}, __publicField(_s, "styles", css$1`
    .container {
      position: relative;
      display: block;
      margin-left: 5px;
      background-color: var(--gray-light3);
      width: 180px;
      user-select: none;
      box-shadow: 0 6px 12px rgba(0,0,0,.12);
      padding: 5px;
    }

    .header {
      padding: 10px;
      color: var(--primary-text);
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid var(--alpha-20);

      &.selected {
        font-weight: bold;
      }
    }

    .body {
      overflow: hidden;
      overflow-y: auto;
      min-height: 20px;

      &::-webkit-scrollbar {
        width: 16px;
      }

      &::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: hsl(0,0%,37%)
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: hsl(0,0%,67%)
      }
    }

    .menu {
      padding: 5px 5px 5px 25px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal;
      font-size: 14px;
      color: var(--primary-text);
      line-height: 30px;
      cursor: pointer;

      &:hover {
        background-color: var(--ui-subtle-hover);
      }

      &.selected {
        font-weight: bold;
        background-color: var(--ui-subtle-active);
      }
    }
  `), _s);
__decorate([
  inject(LocatorStore)
], SubNavMenu.prototype, "locator", void 0);
__decorate([
  r()
], SubNavMenu.prototype, "key", void 0);
__decorate([
  n$1({ type: Object })
], SubNavMenu.prototype, "item", void 0);
SubNavMenu = __decorate([
  t$2("sub-nav-menu")
], SubNavMenu);
let SubNavTooltip = (_t = class extends FlyoutElement {
  constructor() {
    super(...arguments);
    __publicField(this, "keepHover", false);
    __publicField(this, "position", Position.RightCenter);
    __publicField(this, "display", "");
  }
  render() {
    return html$1`
            <div class="container">
                ${this.display}
            </div>
        `;
  }
}, __publicField(_t, "styles", css$1`
        .container {
            padding: 6px 12px;
            margin: 5px;
            background-color: rgba(0, 0, 0, .65);
            border-radius: 2px;
            box-shadow: none;

            color: #fff;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            white-space: nowrap;
        }
    `), _t);
__decorate([
  n$1({ type: String })
], SubNavTooltip.prototype, "display", void 0);
SubNavTooltip = __decorate([
  t$2("sub-nav-tooltip")
], SubNavTooltip);
const info = "M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z";
const error = "m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z";
const warning = "m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM454-348h60v-224h-60v224Zm26-122Z";
const close = "m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z";
const colors = {
  info: "#2ecc71",
  // 인포: 그린 (밝은 그린 계열)
  error: "#e74c3c",
  // 에러: 레드
  warning: "#f1c40f"
};
let ToastBar = (_u = class extends LitElement {
  constructor() {
    super(...arguments);
    __publicField(this, "hideTimeout");
    __publicField(this, "closeTimeout");
    __publicField(this, "expanded", false);
    __publicField(this, "container");
    __publicField(this, "body");
    __publicField(this, "status");
    __publicField(this, "icon");
    __publicField(this, "color");
    __publicField(this, "message");
  }
  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
  }
  async updated(changedProperties) {
    super.updated(changedProperties);
    await this.updateComplete;
    if (changedProperties.has("color")) {
      this.style.setProperty("--color-background", this.color);
    }
  }
  render() {
    return html$1`
            <div id="container"
                @mouseenter=${this.cancelHideAsync}
                @mouseleave=${this.startHideAsync}>
                <div class="header">
                    <svg class="icon" viewBox="0 -960 960 960">
                        <path d="${this.icon}"></path>
                    </svg>
                    <div class="title">
                        ${this.status}
                    </div>
                    <svg class="close" viewBox="0 -960 960 960"
                        @click=${this.close}>
                        <path d="${close}"></path>
                    </svg>
                </div>
                <div id="body">
                    <div class="message"
                    @click=${this.toggleMessageExpand}>
                        ${this.message}
                    </div>
                </div>
            </div>
        `;
  }
  async info(message) {
    this.icon = info;
    this.status = "INFO";
    this.color = colors.info;
    this.show(message);
    this.startHideAsync();
  }
  async error(message) {
    this.icon = error;
    this.status = "ERROR";
    this.color = colors.error;
    this.show(message);
    this.startHideAsync();
  }
  async warning(message) {
    this.icon = warning;
    this.status = "WARNING";
    this.color = colors.warning;
    this.show(message);
    this.startHideAsync();
  }
  async show(message) {
    this.cancelHideAsync();
    this.message = message;
    this.hidden = false;
  }
  async close() {
    this.container.classList.remove("hide");
    this.body.classList.remove("expanded");
    this.expanded = false;
    this.message = "";
    this.hidden = true;
  }
  async startHideAsync() {
    this.hideTimeout = setTimeout(() => {
      this.container.classList.add("hide");
    }, 1e3);
    this.closeTimeout = setTimeout(() => {
      this.close();
    }, 2e3);
  }
  async cancelHideAsync() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.container.classList.remove("hide");
  }
  toggleMessageExpand() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.body.classList.add("expanded");
    } else {
      this.body.classList.remove("expanded");
    }
  }
}, __publicField(_u, "styles", css$1`
        :host {
            --color-background: #2ecc71;
        }

        #container {
            opacity: 1;
            position: fixed;
            z-index: 10;
            bottom: 10%;
            left: 25%;
            width: 50%;
            display: flex;
            flex-direction: column;
            background: var(--color-background);
            color: #fff;
            border-radius: 4px;
            padding: 8px 12px;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
            transition: opacity 1s ease-in-out;

            &.hide {
                opacity: 0;
            }
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            user-select: none;

            .icon {
                width: 24px;
                height: 24px;
                fill: #fff;
                fill-rule: evenodd;
            }

            .title {
                flex: 1;
                font-size: 18px;
                font-weight: 600;
            }

            .close {
                position: relative;
                width: 24px;
                height: 24px;
                fill: #fff;
                fill-rule: evenodd;
                cursor: pointer;
            }
        }

        #body {
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 20px;

            .message {
                flex: 1;
                font-size: 14px;
                line-height: 20px;
                font-weight: 300;
            }

            &:hover {
                cursor: n-resize;
                background-color: rgba(0, 0, 0, 0.1);
            }

            &.expanded {
                overflow: auto;
                height: auto;
                white-space: normal;
            }
        }
  `), _u);
__decorate([
  e$1("#container")
], ToastBar.prototype, "container", void 0);
__decorate([
  e$1("#body")
], ToastBar.prototype, "body", void 0);
__decorate([
  r()
], ToastBar.prototype, "status", void 0);
__decorate([
  r()
], ToastBar.prototype, "icon", void 0);
__decorate([
  r()
], ToastBar.prototype, "color", void 0);
__decorate([
  n$1({ type: String })
], ToastBar.prototype, "message", void 0);
ToastBar = __decorate([
  t$2("toast-bar")
], ToastBar);
class UIStore {
  constructor() {
    __publicField(this, "pageBusyIndicator", new BusyIndicator());
    __publicField(this, "messageBoxDialog", new MessageDialog());
    __publicField(this, "notificationMenu", new NotificationMenu());
    __publicField(this, "subNavMenu", new SubNavMenu());
    __publicField(this, "subNavTooltip", new SubNavTooltip());
    __publicField(this, "toastBar", new ToastBar());
  }
  initUI() {
    if (this.pageBusyIndicator && this.pageBusyIndicator.parentElement) {
      return;
    }
    document.body.appendChild(this.pageBusyIndicator);
    document.body.appendChild(this.messageBoxDialog);
    this.pageBusyIndicator.hidden = true;
    this.messageBoxDialog.hidden = true;
    document.body.appendChild(this.notificationMenu);
    document.body.appendChild(this.subNavMenu);
    document.body.appendChild(this.subNavTooltip);
    document.body.appendChild(this.toastBar);
  }
  async toggleNotificationAsync(event) {
    this.notificationMenu.toggleAsync(event);
  }
  async toggleSubNavAsync(event, menu2) {
    this.subNavMenu.item = menu2;
    this.subNavMenu.toggleAsync(event);
  }
  async hoverNavTooltipAsync(event, display2) {
    this.subNavTooltip.display = display2;
    this.subNavTooltip.hoverAsync(event);
  }
  createElement(html2) {
    const template = document.createElement("template");
    template.innerHTML = html2.trim();
    return template.content.firstChild;
  }
  async showContextMenu(menuItems, e2) {
    const html2 = `<popup-menu hidden></popup-menu>`;
    const element = this.createElement(html2);
    document.body.appendChild(element);
    try {
      const popupMenu = element;
      popupMenu.menuItems = menuItems;
      popupMenu.location = {
        x: e2.x,
        y: e2.y
      };
      const r2 = await popupMenu.showAsync();
      return r2;
    } catch (ex) {
      return {
        success: false,
        value: ex
      };
    } finally {
      document.body.removeChild(element);
    }
  }
  async showUserMenuAsync(event) {
    this.subNavMenu.item = {
      type: "group",
      display: "User",
      subMenu: [
        {
          key: "Profile",
          display: "Profile",
          path: "/app/profile"
        },
        {
          key: "SignOut",
          display: "Sign Out",
          path: "/accounts/logout",
          force: true
        }
      ]
    };
    this.subNavMenu.toggleAsync(event);
  }
  async showMessageAsync(title2, message) {
    this.messageBoxDialog.initOk();
    return this.messageBoxDialog.showAsync(title2, message);
  }
  async showMessageOkCancelAsync(title2, message) {
    this.messageBoxDialog.initOkCancel();
    return this.messageBoxDialog.showAsync(title2, message);
  }
  async showConfirmDialog(title2, message) {
    this.messageBoxDialog.initYesNo();
    return this.messageBoxDialog.showAsync(title2, message);
  }
  async showInputDialogAsync(title2, message, options) {
    const html2 = `<input-dialog hidden></input-dialog>`;
    const element = this.createElement(html2);
    document.body.appendChild(element);
    try {
      const dlg = element;
      const r2 = await dlg.showAsync(title2, message, options);
      return r2;
    } catch (ex) {
      return {
        success: false,
        value: ex
      };
    } finally {
      document.body.removeChild(element);
    }
  }
  async showContentDialogAsync(title2, content2, options) {
    const html2 = `<content-dialog hidden></content-dialog>`;
    const element = this.createElement(html2);
    document.body.appendChild(element);
    try {
      const dlg = element;
      dlg.content = content2;
      if (options != null) {
        if (options.okCancel) {
          dlg.positiveText = "Ok";
          dlg.negativeText = "Cancel";
          dlg.useNegative = true;
        } else if (options.yesNo) {
          dlg.positiveText = "Yes";
          dlg.negativeText = "No";
          dlg.useNegative = true;
        }
        if (options.hiddenButtons) {
          dlg.hiddenButtons = options.hiddenButtons;
        }
        if (options.validationHandler) {
          dlg.validationHandler = options.validationHandler;
        }
      }
      const r2 = await dlg.showAsync(title2);
      return r2;
    } catch (ex) {
      return {
        success: false,
        value: ex
      };
    } finally {
      document.body.removeChild(element);
    }
  }
  async showDialogAsync(content2) {
    const html2 = `<blank-dialog hidden></blank-dialog>`;
    const element = this.createElement(html2);
    document.body.appendChild(element);
    try {
      const dlg = element;
      dlg.content = content2;
      const r2 = await dlg.showAsync();
      return r2;
    } catch (e2) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }
  async showRightDialogAsync(content2) {
    const html2 = `<right-dialog hidden></right-dialog>`;
    const element = this.createElement(html2);
    document.body.appendChild(element);
    try {
      const dlg = element;
      dlg.title = content2.title;
      dlg.content = content2;
      const r2 = await dlg.showAsync();
      return r2;
    } catch (e2) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }
}
class WizardBase extends LitElement {
  constructor() {
    super();
    __publicField(this, "manager");
    __publicField(this, "steps", []);
    __publicField(this, "currentStepIndex", 0);
    __publicField(this, "backCommand");
    __publicField(this, "nextCommand");
    __publicField(this, "resolve");
    __publicField(this, "reject");
    this.backCommand = new RelayCommand({
      content: "Back",
      execute: () => {
        if (this.backCommand.canExecute() == false) {
          return;
        }
        if (this.currentStepIndex > 0) {
          const data = this.currentStep().onLeave("back");
          this.currentStepIndex--;
          this.currentStep().onGot("back", data);
        }
      },
      canExecute: () => {
        if (this.currentStepIndex > 0) {
          return this.canBack();
        } else {
          return false;
        }
      }
    });
    this.nextCommand = new RelayCommand({
      content: "Next",
      execute: () => {
        if (this.nextCommand.canExecute() == false) {
          return;
        }
        if (this.currentStepIndex == this.steps.length - 1) {
          if (this.canFinish()) {
            this.fisish();
          }
          return;
        } else if (this.currentStepIndex < this.steps.length - 1) {
          const data = this.currentStep().onLeave("next");
          this.currentStepIndex++;
          this.currentStep().onGot("next", data);
        }
        if (this.currentStepIndex == this.steps.length - 1) {
          this.nextCommand.content = "Finish";
        } else {
          this.nextCommand.content = "Next";
        }
      },
      canExecute: () => {
        if (this.currentStepIndex == this.steps.length - 1) {
          return this.canFinish();
        } else if (this.currentStepIndex < this.steps.length - 1) {
          return this.canNext();
        } else {
          return false;
        }
      }
    });
    this.steps = this.initSteps();
  }
  render() {
    return html$1`
      <div class="p-2">
        <h4>${this.title}</h4>

        ${this.currentStep()}
        
        <div class="flex justify-end items-center gap-1">
          <!-- back, next -->
          <u-button .command=${this.backCommand}></u-button>
          <u-button .command=${this.nextCommand} accent></u-button>
        </div>
      </div>
    `;
  }
  currentStep() {
    return this.steps[this.currentStepIndex];
  }
  canBack() {
    const step = this.currentStep();
    if (step.canBack && !step.canBack()) {
      return false;
    }
    return true;
  }
  canNext() {
    const step = this.currentStep();
    if (step.canNext && !step.canNext()) {
      return false;
    }
    return true;
  }
  canFinish() {
    return true;
  }
  fisish() {
    if (this.resolve) {
      this.resolve({
        success: true,
        value: this.returnValue()
      });
    } else {
      throw new Error("resolve is null");
    }
  }
  returnValue() {
    return this;
  }
  loadPromise(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
  }
  showAsync() {
    if (this.manager) {
      return this.manager.showDialogAsync(this);
    } else {
      return Promise.resolve({ success: false, value: "UIManager is null" });
    }
  }
}
__publicField(WizardBase, "styles", [
  // unsafeCSS(baseStyle)
]);
__decorate([
  inject(UIStore)
], WizardBase.prototype, "manager", void 0);
__decorate([
  n$1({ type: Array })
], WizardBase.prototype, "steps", void 0);
__decorate([
  r()
], WizardBase.prototype, "currentStepIndex", void 0);
class WizardStep extends LitElement {
  validate() {
    return true;
  }
  canBack() {
    return this.validate();
  }
  canNext() {
    return this.validate();
  }
  onLeave(direction) {
    console.log("onLeave", direction);
    return this;
  }
  onGot(direction, data) {
    console.log("onGot", direction, data);
    return;
  }
}
var client = {};
var m = require$$0;
if (process.env.NODE_ENV === "production") {
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  client.createRoot = function(c2, o2) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c2, o2);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  client.hydrateRoot = function(c2, h2, o2) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c2, h2, o2);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}
class StartupBase {
  constructor() {
    __publicField(this, "layout", useLayout());
    __publicField(this, "topBarOptions", topBarOptions);
  }
  init() {
    const appInfo = DI.addSingleton(AppInfoStore);
    const menu2 = DI.addSingleton(MenuStore);
    const locator = DI.addSingleton(LocatorStore);
    const layout = DI.addSingleton(LayoutStore);
    const ui = DI.addSingleton(UIStore);
    ui.initUI();
    appInfo.initAppInfo();
    layout.initLayout(this.title, this.logo);
    const routes = this.initRoutes();
    const [keyPath, router] = locator.initLocator(routes, this.helpPath, this.basePath, this.baseElement, this.errorElement, this.otherShells);
    const menuItems = this.initMainMenuItems();
    menu2.initMenu(menuItems, keyPath);
    return router;
  }
  run() {
    const router = this.init();
    let root = document.getElementById("root");
    if (!root) {
      root = document.createElement("div");
      root.id = "root";
      document.body.appendChild(root);
    }
    client.hydrateRoot(root, jsxRuntimeExports.jsx(React__default.StrictMode, { children: jsxRuntimeExports.jsx(RouterProvider, { router }) }));
  }
}
function getAgo(at) {
  const now = /* @__PURE__ */ new Date();
  const diffInMilliseconds = now.getTime() - at.getTime();
  const minuteInMilliseconds = 60 * 1e3;
  const hourInMilliseconds = 60 * minuteInMilliseconds;
  const dayInMilliseconds = 24 * hourInMilliseconds;
  if (diffInMilliseconds < minuteInMilliseconds) {
    const diffInSeconds = Math.floor(diffInMilliseconds / 1e3);
    return `${diffInSeconds}초 전`;
  } else if (diffInMilliseconds < hourInMilliseconds) {
    const diffInMinutes = Math.floor(diffInMilliseconds / minuteInMilliseconds);
    return `${diffInMinutes}분 전`;
  } else if (diffInMilliseconds < dayInMilliseconds) {
    const diffInHours = Math.floor(diffInMilliseconds / hourInMilliseconds);
    return `${diffInHours}시간 전`;
  } else {
    const diffInDays = Math.floor(diffInMilliseconds / dayInMilliseconds);
    return `${diffInDays}일 전`;
  }
}
const TimeHelpers = {
  getAgo
};
function getUrlParams(url = document.location.href) {
  const searchParams = new URLSearchParams(new URL(url).search);
  const params = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
}
function buildUrl(...parts) {
  const url = new URL(parts[0]);
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("/")) {
      url.pathname = url.pathname.replace(/\/$/, "") + part;
    } else if (part.startsWith("?")) {
      if (!url.search) {
        url.search = part;
      } else {
        url.search += "&" + part.substring(1);
      }
    } else if (part.startsWith("#")) {
      url.hash = part;
    } else if (part.includes("=")) {
      url.search += (url.search ? "&" : "?") + part;
    } else {
      url.pathname += "/" + encodeURIComponent(part);
    }
  }
  return url.toString();
}
const UrlHelpers = {
  getUrlParams,
  buildUrl
};
const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
const container = "_container_cm2mx_185";
const top = "_top_cm2mx_198";
const shadow = "_shadow_cm2mx_203";
const main = "_main_cm2mx_208";
const content = "_content_cm2mx_213";
const title = "_title_cm2mx_219";
const scrollTop = "_scrollTop_cm2mx_246";
const icon = "_icon_cm2mx_262";
const panel = "_panel_cm2mx_276";
const fixed = "_fixed_cm2mx_283";
const panelHead = "_panelHead_cm2mx_290";
const button = "_button_cm2mx_290";
const pin = "_pin_cm2mx_290";
const resize = "_resize_cm2mx_293";
const active = "_active_cm2mx_297";
const flex = "_flex_cm2mx_320";
const panelContent = "_panelContent_cm2mx_338";
const right = "_right_cm2mx_346";
const bottom = "_bottom_cm2mx_365";
const menu = "_menu_cm2mx_384";
const tab = "_tab_cm2mx_394";
const styles = {
  container,
  top,
  shadow,
  main,
  content,
  title,
  scrollTop,
  icon,
  panel,
  fixed,
  panelHead,
  button,
  pin,
  resize,
  active,
  flex,
  panelContent,
  right,
  bottom,
  menu,
  tab
};
function PageHeader(props) {
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children });
}
function PagePanel(props) {
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children });
}
function PageBase(props) {
  useDocumentTitle(props.docTitle);
  const container2 = useRef(null);
  const top2 = useRef(null);
  const rightPanel = useRef(null);
  const rightMenu = useRef(null);
  const bottomPanel = useRef(null);
  const bottomMenu = useRef(null);
  const main2 = useRef(null);
  const content2 = useRef(null);
  const scrollTop2 = useRef(null);
  const bottomKeys = [];
  const rightKeys = [];
  const [bottomKey, setBottomKey] = useState(null);
  const [rightKey, setRightKey] = useState(null);
  const [isFixedRight, setIsFixedRight] = useState(true);
  const [isFixedBottom, setIsFixedBottom] = useState(true);
  let headerComponent;
  const mainComponents = [];
  const rightPanelComponents = {};
  const bottomPanelComponents = {};
  Children.forEach(props.children, (child) => {
    if (isValidElement(child)) {
      if (child.type === PageHeader) {
        headerComponent = child;
      } else if (child.type === PagePanel) {
        if (child.key === null)
          throw new Error("PagePanel must have a key property.");
        if (child.props.position === "right") {
          rightKeys.push(child.key);
          rightPanelComponents[child.key] = child;
        } else if (child.props.position === "bottom") {
          bottomKeys.push(child.key);
          bottomPanelComponents[child.key] = child;
        }
      } else {
        mainComponents.push(child);
      }
    }
  });
  const onToggleRigtht = (key) => {
    if (rightKey === key) {
      setRightKey(null);
    } else {
      setRightKey(key);
    }
  };
  const onToggleBottom = (key) => {
    if (bottomKey === key) {
      setBottomKey(null);
    } else {
      setBottomKey(key);
    }
  };
  const adjustRows = () => {
    if (container2.current === null)
      return;
    container2.current.style.gridTemplateRows = `auto 100% auto auto`;
    const topHeight = top2.current ? top2.current.offsetHeight : 0;
    const bottomPanelHeight = isFixedBottom && bottomPanel.current ? bottomPanel.current.offsetHeight : 0;
    const bottomMenuHeight = bottomMenu.current ? bottomMenu.current.offsetHeight : 0;
    const height = topHeight + bottomPanelHeight + bottomMenuHeight;
    container2.current.style.gridTemplateRows = `auto calc(100% - ${height}px) auto auto`;
  };
  const adjustColumns = () => {
    if (container2.current === null)
      return;
    container2.current.style.gridTemplateColumns = `100% auto auto`;
    const rightPanelWidth = isFixedRight && rightPanel.current ? rightPanel.current.offsetWidth : 0;
    const rightMenuWidth = rightMenu.current ? rightMenu.current.offsetWidth : 0;
    const width = rightPanelWidth + rightMenuWidth;
    container2.current.style.gridTemplateColumns = `calc(100% - ${width}px) auto auto`;
  };
  const handleScroll = () => {
    if (content2.current === null || scrollTop2.current === null)
      return;
    if (top2.current) {
      if (content2.current.scrollTop > 20) {
        top2.current.classList.add(styles.shadow);
        scrollTop2.current.style.display = "flex";
      } else {
        top2.current.classList.remove(styles.shadow);
        scrollTop2.current.style.display = "none";
      }
    }
  };
  const onScrollToTop = () => {
    if (content2.current === null)
      return;
    content2.current.scrollTo({ top: 0, behavior: "instant" });
  };
  const resizeRightPanel = (event) => {
    event.preventDefault();
    const target2 = event.target;
    target2.classList.add(styles.active);
    let moveX = 0;
    const move = (e2) => {
      moveX += e2.movementX;
      target2.style.left = `${moveX}px`;
    };
    const stop = () => {
      target2.style.left = "-2px";
      target2.classList.remove(styles.active);
      rightPanel.current.style.width = `${rightPanel.current.offsetWidth - moveX}px`;
      adjustColumns();
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  };
  const resizeBottomPanel = (event) => {
    event.preventDefault();
    const target2 = event.target;
    target2.classList.add(styles.active);
    let moveY = 0;
    const move = (e2) => {
      moveY += e2.movementY;
      target2.style.top = `${moveY}px`;
    };
    const stop = () => {
      target2.style.top = "-2px";
      target2.classList.remove(styles.active);
      bottomPanel.current.style.height = `${bottomPanel.current.offsetHeight - moveY}px`;
      adjustRows();
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  };
  useEffect(() => {
    adjustRows();
    adjustColumns();
  }, []);
  useEffect(() => {
    adjustRows();
  }, [bottomKey, isFixedBottom]);
  useEffect(() => {
    adjustColumns();
  }, [rightKey, isFixedRight]);
  return jsxRuntimeExports.jsxs("div", { className: styles.container, ref: container2, children: [headerComponent && jsxRuntimeExports.jsx("div", { className: styles.top, ref: top2, children: headerComponent }), jsxRuntimeExports.jsxs("div", { className: styles.main, ref: main2, children: [jsxRuntimeExports.jsxs("div", { className: styles.content, ref: content2, onScroll: () => handleScroll(), children: [props.title && jsxRuntimeExports.jsx("div", { className: styles.title, children: props.title }), mainComponents] }), jsxRuntimeExports.jsx("div", { className: styles.scrollTop, ref: scrollTop2, onClick: () => onScrollToTop(), children: jsxRuntimeExports.jsx("svg", { className: styles.icon, viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { d: VectorIcons.angleUp2 }) }) })] }), rightKey !== null && jsxRuntimeExports.jsxs("div", { className: `${styles.panel} ${styles.right} ${isFixedRight ? styles.fixed : ""}`, ref: rightPanel, children: [jsxRuntimeExports.jsx("div", { className: styles.resize, onMouseDown: resizeRightPanel }), jsxRuntimeExports.jsxs("div", { className: styles.panelHead, children: [jsxRuntimeExports.jsx("div", { className: styles.title, children: rightKey }), jsxRuntimeExports.jsx("div", { className: styles.flex }), jsxRuntimeExports.jsx("svg", { className: `${styles.button} ${styles.pin}`, viewBox: "0 0 24 24", onClick: () => setIsFixedRight(!isFixedRight), children: jsxRuntimeExports.jsx("path", { d: VectorIcons.pin }) }), jsxRuntimeExports.jsx("svg", { className: styles.button, viewBox: "0 -960 960 960", onClick: () => setRightKey(null), children: jsxRuntimeExports.jsx("path", { d: VectorIcons.close }) })] }), jsxRuntimeExports.jsx("div", { className: styles.panelContent, children: rightPanelComponents[rightKey] })] }), rightKeys.length > 0 && jsxRuntimeExports.jsx("div", { className: `${styles.menu} ${styles.right}`, ref: rightMenu, children: rightKeys.map((key) => jsxRuntimeExports.jsx("div", { className: `${styles.tab} ${rightKey === key ? styles.active : ""}`, onClick: () => onToggleRigtht(key), children: key }, key)) }), bottomKey !== null && jsxRuntimeExports.jsxs("div", { className: `${styles.panel} ${styles.bottom} ${isFixedBottom ? styles.fixed : ""}`, ref: bottomPanel, children: [jsxRuntimeExports.jsx("div", { className: styles.resize, onMouseDown: resizeBottomPanel }), jsxRuntimeExports.jsxs("div", { className: styles.panelHead, children: [jsxRuntimeExports.jsx("div", { className: styles.title, children: bottomKey }), jsxRuntimeExports.jsx("div", { className: styles.flex }), jsxRuntimeExports.jsx("svg", { className: `${styles.button} ${styles.pin}`, viewBox: "0 0 24 24", onClick: () => setIsFixedBottom(!isFixedBottom), children: jsxRuntimeExports.jsx("path", { d: VectorIcons.pin }) }), jsxRuntimeExports.jsx("svg", { className: styles.button, viewBox: "0 -960 960 960", onClick: () => setBottomKey(null), children: jsxRuntimeExports.jsx("path", { d: VectorIcons.close }) })] }), jsxRuntimeExports.jsx("div", { className: styles.panelContent, children: bottomPanelComponents[bottomKey] })] }), bottomKeys.length > 0 && jsxRuntimeExports.jsx("div", { className: `${styles.menu} ${styles.bottom}`, ref: bottomMenu, children: bottomKeys.map((key) => jsxRuntimeExports.jsx("div", { className: `${styles.tab} ${bottomKey === key ? styles.active : ""}`, onClick: () => onToggleBottom(key), children: key }, key)) })] });
}
class ApiClient {
  success(status) {
    return status >= 200 && status < 300;
  }
  // private isRedirect(status: number) {
  //   return status >= 300 && status < 400;
  // }
  isClientError(status) {
    return status >= 400 && status < 500;
  }
  // private isServerError(status: number) {
  //   return status >= 500;
  // }
  asText(v) {
    if (typeof v == "object") {
      return JSON.stringify(v);
    } else {
      return `${v}`;
    }
  }
  async onResponseAsync(res) {
    const contentType = res.headers.get("content-type");
    if (contentType == "text/html") {
      document.location.href = res.url;
      return { success: true, status: res.status, value: null };
    } else if (this.success(res.status)) {
      if (contentType == null || contentType.indexOf("json") > 0) {
        const resJson = await res.json();
        if (resJson.key == "Redirect") {
          document.location.href = resJson.value;
          return { success: true, status: res.status, value: null };
        } else {
          return { success: true, status: res.status, value: resJson };
        }
      } else if (contentType.startsWith("text/plain")) {
        const text2 = await res.text();
        return { success: true, status: res.status, value: text2 };
      } else {
        return { success: false, status: res.status };
      }
    } else if (this.isClientError(res.status)) {
      if (contentType == null ? void 0 : contentType.indexOf("json")) {
        return { success: false, status: res.status, value: await res.json() };
      } else {
        return { success: false, status: res.status };
      }
    } else if (contentType == null ? void 0 : contentType.indexOf("json")) {
      return { success: false, status: res.status, value: await res.json() };
    } else {
      return { success: false, status: res.status };
    }
  }
  buildUrl(url) {
    if (url.startsWith("http")) {
      return url;
    } else {
      const host = this.host;
      if (host.length < 1 || host == "/") {
        return new URL(url, document.location.origin).href;
      } else {
        let address;
        if (host.endsWith("/") || url.startsWith("/")) {
          address = host + url;
        } else {
          address = `${host}/${url}`;
        }
        if (window.location.search && address.includes("?") != true) {
          address += window.location.search;
        }
        return address;
      }
    }
  }
  async buildHeadersAsync(defaults) {
    const headers = defaults ?? {};
    return headers;
  }
  async get(address) {
    const url = this.buildUrl(address);
    console.debug(`Req|GET ${url}`);
    const headers = await this.buildHeadersAsync();
    const r2 = await fetch(url, {
      method: "GET",
      headers,
      redirect: "follow"
      // Redirect 를 허용
    }).then(async (res) => {
      return await this.onResponseAsync(res);
    }).catch((reason) => {
      throw reason;
    });
    return r2;
  }
  async post(address, data, options) {
    const url = this.buildUrl(address);
    console.debug(`Req|POST ${url} ${this.asText(data)}`);
    const headers = await this.buildHeadersAsync({
      "Content-Type": "application/json"
    });
    if (options && options.headers) {
      for (const key in options.headers) {
        const header2 = options.headers[key];
        if (typeof header2 === "function")
          continue;
        headers[key] = header2;
      }
    }
    const jsonBody = JSON.stringify(data);
    const r2 = await fetch(url, {
      method: "POST",
      headers,
      body: jsonBody,
      redirect: "follow"
      // Redirect 를 허용
    }).then(async (res) => {
      const r22 = await this.onResponseAsync(res);
      console.debug(`Res|POST ${url}`, r22.status, this.asText(r22.value));
      return r22;
    }).catch((reason) => {
      throw reason;
    });
    return r2;
  }
  async delete(address) {
    const url = this.buildUrl(address);
    const headers = await this.buildHeadersAsync();
    const r2 = await fetch(url, {
      method: "DELETE",
      headers
    }).then(async (res) => {
      return await this.onResponseAsync(res);
    }).catch((reason) => {
      throw reason;
    });
    return r2;
  }
}
class AuthorizeApiClient extends ApiClient {
  constructor() {
    super(...arguments);
    __publicField(this, "accessToken", null);
    __publicField(this, "token", null);
  }
  async getAccessTokenAsync() {
    var _a3;
    if (this.accessToken == null) {
      this.accessToken = localStorage.getItem("accessToken");
    }
    if (this.accessToken == null && ((_a3 = this.token) == null ? void 0 : _a3.accessToken) != null) {
      this.accessToken = this.token.accessToken;
    }
    return this.accessToken;
  }
  async getTokenAsync() {
    const res = await this.get("/identity/token", {
      refreshToken: false
    });
    if (res.success) {
      const token = res.value;
      return token;
    } else {
      return null;
    }
  }
  async refreshTokenAsync() {
    var _a3, _b2;
    localStorage.removeItem("accessToken");
    const res = await this.get("/identity/token", {
      refreshToken: false
    });
    if (res.success) {
      this.token = res.value;
      this.accessToken = ((_a3 = this.token) == null ? void 0 : _a3.accessToken) ?? null;
      return this.accessToken != null;
    }
    if (this.token && this.token.refreshToken && this.token.code) {
      const res2 = await this.post("/identity/refresh-token", {
        // deviceId: getDeviceId(),
        token: this.token.refreshToken,
        code: this.token.code
      }, {
        refreshToken: false
      });
      if (res2.success) {
        this.token = res2.value;
        this.accessToken = ((_b2 = this.token) == null ? void 0 : _b2.accessToken) ?? null;
        return this.accessToken != null;
      }
    }
    const url = "/accounts/login?returnUrl=" + encodeURIComponent(location.pathname + location.search);
    location.href = url;
    return false;
  }
  async buildHeadersAsync(defaults) {
    const headers = await super.buildHeadersAsync(defaults);
    const accessToken = await this.getAccessTokenAsync();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return headers;
  }
  async getIdentityAsync() {
    const res = await this.get("/identity", {
      refreshToken: false
    });
    if (res.success) {
      const identity = res.value;
      return identity;
    } else {
      return null;
    }
  }
  retry(options) {
    if (options.refreshToken) {
      if (options.retry == null) {
        options.retry = 1;
      }
      options.retry -= 1;
      return options.retry >= 0;
    } else {
      return false;
    }
  }
  async get(address, options = { refreshToken: true, retry: 1 }) {
    const res = await super.get(address);
    if (res.status == 401 && this.retry(options)) {
      const success = await this.refreshTokenAsync();
      if (success) {
        return this.get(address, options);
      } else {
        return res;
      }
    } else {
      return res;
    }
  }
  async post(address, data, options = { refreshToken: true, retry: 1 }) {
    const res = await super.post(address, data, options);
    if (res.status == 401 && this.retry(options)) {
      const success = await this.refreshTokenAsync();
      if (success) {
        return this.post(address, data, options);
      } else {
        return res;
      }
    } else {
      return res;
    }
  }
  async delete(address, options = { refreshToken: true, retry: 1 }) {
    const res = await super.delete(address);
    if (res.status == 401 && this.retry(options)) {
      const success = await this.refreshTokenAsync();
      if (success) {
        return this.delete(address, options);
      } else {
        return res;
      }
    } else {
      return res;
    }
  }
  getData(result) {
    if (result && result.value) {
      if (Object.prototype.hasOwnProperty.call(result.value, "value")) {
        return result.value["value"];
      } else {
        return result.value;
      }
    }
  }
}
class AccountsBase extends AuthorizeApiClient {
  login(request) {
    if (document.location.pathname.startsWith("/oauth/authorize")) {
      const url = `/oauth/authorize-user${document.location.search}`;
      return this.post(url, request);
    } else {
      const returnUrl = new URLSearchParams(document.location.search).get("returnUrl") ?? "/app";
      const url = returnUrl ? `/accounts/login?returnUrl=${returnUrl}` : `/accounts/login`;
      return this.post(url, request);
    }
  }
  sendRegisterEmail(request) {
    return this.post("/accounts/send-register-email", request);
  }
  registerForEmail(request) {
    return this.post("/accounts/register-for-email", request);
  }
  forgotPassword(request) {
    return this.post("/accounts/forgot-password", request);
  }
  resetPassword(request) {
    return this.post("/accounts/reset-password", request);
  }
  loginWithGoogle() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.getCaseIgnore("returnUrl") ?? urlParams.getCaseIgnore("redirect_uri") ?? "/app";
    const url = this.buildUrl(`/accounts/external-login?provider=Google&returnUrl=${returnUrl}`);
    window.location.href = url;
  }
  loginWithMicrosoft() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.getCaseIgnore("returnUrl") ?? urlParams.getCaseIgnore("redirect_uri") ?? "/app";
    const url = this.buildUrl(`/accounts/external-login?provider=OpenIdConnect&returnUrl=${returnUrl}`);
    window.location.href = url;
  }
  acceptTerms(request) {
    return this.post("/accounts/accept-terms", request);
  }
}
export {
  AccountsBase,
  ApiClient,
  AppInfoStore,
  AppShell,
  AuthorizeApiClient,
  BlankDialog,
  Breakpoint,
  BusyIndicator,
  ComboboxContext,
  ContentDialog,
  DI,
  ElementBase,
  ElementMixin,
  ErrorPage,
  GridUnit,
  Guid,
  InputDialog,
  InputTypes,
  LayoutStore,
  LitHelper,
  LocatorStore,
  MenuStore,
  MessageDialog,
  MessageDialogComponent,
  PageBase,
  PageHeader,
  PagePanel,
  PopupMenu,
  Reflections,
  RelayCommand,
  RightDialog,
  StartupBase,
  Themes,
  TimeHelpers,
  UButton,
  UButtons,
  UCards,
  UCombobox,
  UErrors,
  UIStore,
  UInput,
  UPopup,
  UrlHelpers,
  Validations,
  VectorIcons,
  ViewBox,
  WizardBase,
  WizardStep,
  XSplitter,
  debounce,
  getPropertyMeta,
  inject,
  injectOf,
  propertyMeta,
  useDocumentTitle,
  useLayout,
  useLocator,
  useMenu,
  useUI
};
//# sourceMappingURL=main.js.map
