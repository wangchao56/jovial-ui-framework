"use strict";
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _arr, _pointer;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const IN_BROWSER = typeof window !== "undefined";
const SUPPORTS_INTERSECTION = IN_BROWSER && "IntersectionObserver" in window;
const SUPPORTS_TOUCH = IN_BROWSER && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
const SUPPORTS_EYE_DROPPER = IN_BROWSER && "EyeDropper" in window;
function isMobile() {
  if (!IN_BROWSER)
    return false;
  const uaCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const mediaCheck = IN_BROWSER ? window.matchMedia("(max-width: 768px), (pointer: coarse)").matches : false;
  return uaCheck || touchCheck && mediaCheck;
}
const IS_MOBILE = isMobile();
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0)
    return obj === void 0 ? fallback : obj;
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }
  if (obj == null)
    return fallback;
  return obj[path[last]] === void 0 ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }
  return props.every((p) => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  if (obj == null || !path || typeof path !== "string")
    return fallback;
  if (obj[path] !== void 0)
    return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  return getNestedValue(obj, path.split("."), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property === true)
    return item === void 0 ? fallback : item;
  if (property == null || typeof property === "boolean")
    return fallback;
  if (item !== Object(item)) {
    if (typeof property !== "function")
      return fallback;
    const value2 = property(item, fallback);
    return typeof value2 === "undefined" ? fallback : value2;
  }
  if (typeof property === "string")
    return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property))
    return getNestedValue(item, property, fallback);
  if (typeof property !== "function")
    return fallback;
  const value = property(item, fallback);
  return typeof value === "undefined" ? fallback : value;
}
function createRange(length, start = 0) {
  return Array.from({ length }, (v, k) => start + k);
}
function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE)
    return 0;
  const index = +window.getComputedStyle(el).getPropertyValue("z-index");
  if (!index)
    return getZIndex(el.parentNode);
  return index;
}
function convertToUnit(str, unit = "px") {
  if (str == null || str === "") {
    return void 0;
  } else if (Number.isNaN(+str)) {
    return String(str);
  } else if (!Number.isFinite(+str)) {
    return void 0;
  } else {
    return `${Number(str)}${unit}`;
  }
}
function isPlainObject(obj) {
  let proto;
  return obj !== null && typeof obj === "object" && ((proto = Object.getPrototypeOf(obj)) === Object.prototype || proto === null);
}
function refElement(obj) {
  if (obj && "$el" in obj) {
    const el = obj.$el;
    if ((el == null ? void 0 : el.nodeType) === Node.TEXT_NODE) {
      return el.nextElementSibling;
    }
    return el;
  }
  return obj;
}
const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
const keyValues = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function keys(o) {
  return Object.keys(o);
}
function has(obj, key) {
  return key.every((k) => Object.prototype.hasOwnProperty.call(obj, k));
}
function pick(obj, paths) {
  const found = {};
  const keys2 = new Set(Object.keys(obj));
  for (const path of paths) {
    if (keys2.has(path)) {
      found[path] = obj[path];
    }
  }
  return found;
}
function pickWithRest(obj, paths, exclude) {
  const found = /* @__PURE__ */ Object.create(null);
  const rest = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    if (paths.some(
      (path) => path instanceof RegExp ? path.test(key) : path === key
    ) && !(exclude == null ? void 0 : exclude.some((path) => path === key))) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
function omit(obj, exclude) {
  const clone = { ...obj };
  exclude.forEach((prop) => delete clone[prop]);
  return clone;
}
function only(obj, include) {
  const clone = {};
  include.forEach((prop) => clone[prop] = obj[prop]);
  return clone;
}
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const bubblingEvents = [
  "onAfterscriptexecute",
  "onAnimationcancel",
  "onAnimationend",
  "onAnimationiteration",
  "onAnimationstart",
  "onAuxclick",
  "onBeforeinput",
  "onBeforescriptexecute",
  "onChange",
  "onClick",
  "onCompositionend",
  "onCompositionstart",
  "onCompositionupdate",
  "onContextmenu",
  "onCopy",
  "onCut",
  "onDblclick",
  "onFocusin",
  "onFocusout",
  "onFullscreenchange",
  "onFullscreenerror",
  "onGesturechange",
  "onGestureend",
  "onGesturestart",
  "onGotpointercapture",
  "onInput",
  "onKeydown",
  "onKeypress",
  "onKeyup",
  "onLostpointercapture",
  "onMousedown",
  "onMousemove",
  "onMouseout",
  "onMouseover",
  "onMouseup",
  "onMousewheel",
  "onPaste",
  "onPointercancel",
  "onPointerdown",
  "onPointerenter",
  "onPointerleave",
  "onPointermove",
  "onPointerout",
  "onPointerover",
  "onPointerup",
  "onReset",
  "onSelect",
  "onSubmit",
  "onTouchcancel",
  "onTouchend",
  "onTouchmove",
  "onTouchstart",
  "onTransitioncancel",
  "onTransitionend",
  "onTransitionrun",
  "onTransitionstart",
  "onWheel"
];
const compositionIgnoreKeys = [
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
  "Enter",
  "Escape",
  "Tab",
  " "
];
function isComposingIgnoreKey(e) {
  return e.isComposing && compositionIgnoreKeys.includes(e.key);
}
function filterInputAttrs(attrs) {
  const [events, props] = pickWithRest(attrs, [onRE]);
  const inputEvents = omit(events, bubblingEvents);
  const [rootAttrs, inputAttrs] = pickWithRest(props, [
    "class",
    "style",
    "id",
    /^data-/
  ]);
  Object.assign(rootAttrs, events);
  Object.assign(inputAttrs, inputEvents);
  return [rootAttrs, inputAttrs];
}
function arrayDiff(a, b) {
  const diff = [];
  for (let i = 0; i < b.length; i++) {
    if (!a.includes(b[i]))
      diff.push(b[i]);
  }
  return diff;
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function defaultFilter(value, search, _item) {
  return value != null && search != null && typeof value !== "boolean" && value.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase());
}
function debounce(fn, delay) {
  let timeoutId = 0;
  const wrap = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), vue.unref(delay));
  };
  wrap.clear = () => {
    clearTimeout(timeoutId);
  };
  wrap.immediate = fn;
  return wrap;
}
function throttle(fn, limit) {
  let throttling = false;
  return (...args) => {
    if (!throttling) {
      throttling = true;
      setTimeout(() => throttling = false, limit);
      return fn(...args);
    }
  };
}
function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}
function getDecimals(value) {
  const trimmedStr = value.toString().trim();
  return trimmedStr.includes(".") ? trimmedStr.length - trimmedStr.indexOf(".") - 1 : 0;
}
function padEnd(str, length, char = "0") {
  return str + char.repeat(Math.max(0, length - str.length));
}
function padStart(str, length, char = "0") {
  return char.repeat(Math.max(0, length - str.length)) + str;
}
function chunk(str, size = 1) {
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
function chunkArray(array, size = 1) {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) => array.slice(i * size, i * size + size));
}
function humanReadableFileSize(bytes, base = 1e3) {
  if (bytes < base) {
    return `${bytes} B`;
  }
  const prefix = base === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
function mergeDeep(source = {}, target = {}, arrayFn) {
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isPlainObject(sourceProperty) && isPlainObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (arrayFn && Array.isArray(sourceProperty) && Array.isArray(targetProperty)) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
function flattenFragments(nodes) {
  return nodes.map((node) => {
    if (node.type === vue.Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
}
function toKebabCase(str = "") {
  if (toKebabCase.cache.has(str))
    return toKebabCase.cache.get(str);
  const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = /* @__PURE__ */ new Map();
function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== "object")
    return [];
  if (Array.isArray(vnode)) {
    return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.suspense) {
    return findChildrenWithProvide(key, vnode.ssContent);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(
      key
    )) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
class CircularBuffer {
  constructor(size) {
    __privateAdd(this, _arr, []);
    __privateAdd(this, _pointer, 0);
    this.size = size;
  }
  push(val) {
    __privateGet(this, _arr)[__privateGet(this, _pointer)] = val;
    __privateSet(this, _pointer, (__privateGet(this, _pointer) + 1) % this.size);
  }
  values() {
    return __privateGet(this, _arr).slice(__privateGet(this, _pointer)).concat(__privateGet(this, _arr).slice(0, __privateGet(this, _pointer)));
  }
}
_arr = new WeakMap();
_pointer = new WeakMap();
function getEventCoordinates(e) {
  if ("touches" in e) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }
  return { clientX: e.clientX, clientY: e.clientY };
}
function destructComputed(getter) {
  const refs = vue.reactive({});
  const base = vue.computed(getter);
  vue.watchEffect(
    () => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    },
    { flush: "sync" }
  );
  return vue.toRefs(refs);
}
function includes(arr, val) {
  return arr.includes(val);
}
function eventName(propName) {
  return propName[2].toLowerCase() + propName.slice(3);
}
function EventProp() {
  return [Function, Array];
}
function hasEvent(props, name) {
  name = `on${vue.capitalize(name)}`;
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler, ...args) {
  if (Array.isArray(handler)) {
    for (const h of handler) {
      h(...args);
    }
  } else if (typeof handler === "function") {
    handler(...args);
  }
}
function focusableChildren(el, filterByTabIndex = true) {
  const targets = [
    "button",
    "[href]",
    'input:not([type="hidden"])',
    "select",
    "textarea",
    "[tabindex]"
  ].map(
    (s) => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ""}:not([disabled])`
  ).join(", ");
  return [...el.querySelectorAll(targets)];
}
function getNextElement(elements, location, condition) {
  let _el;
  let idx = elements.indexOf(document.activeElement);
  const inc = location === "next" ? 1 : -1;
  do {
    idx += inc;
    _el = elements[idx];
  } while ((!_el || _el.offsetParent == null || !((condition == null ? void 0 : condition(_el)) ?? true)) && idx < elements.length && idx >= 0);
  return _el;
}
function focusChild(el, location) {
  var _a, _b, _c, _d;
  const focusable = focusableChildren(el);
  if (!location) {
    if (el === document.activeElement || !el.contains(document.activeElement)) {
      (_a = focusable[0]) == null ? void 0 : _a.focus();
    }
  } else if (location === "first") {
    (_b = focusable[0]) == null ? void 0 : _b.focus();
  } else if (location === "last") {
    (_c = focusable.at(-1)) == null ? void 0 : _c.focus();
  } else if (typeof location === "number") {
    (_d = focusable[location]) == null ? void 0 : _d.focus();
  } else {
    const _el = getNextElement(focusable, location);
    if (_el)
      _el.focus();
    else focusChild(el, location === "next" ? "first" : "last");
  }
}
function noop() {
}
function matchesSelector(el, selector) {
  const supportsSelector = IN_BROWSER && typeof CSS !== "undefined" && typeof CSS.supports !== "undefined" && CSS.supports(`selector(${selector})`);
  if (!supportsSelector)
    return null;
  try {
    return !!el && el.matches(selector);
  } catch (_) {
    return null;
  }
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!vue.isVNode(child))
      return true;
    if (child.type === vue.Comment)
      return false;
    return child.type !== vue.Fragment || ensureValidVNode(child.children);
  }) ? vnodes : null;
}
function defer(timeout, cb) {
  if (!IN_BROWSER || timeout === 0) {
    cb();
    return () => {
    };
  }
  const timeoutId = window.setTimeout(cb, timeout);
  return () => window.clearTimeout(timeoutId);
}
function eagerComputed(fn, options) {
  const result = vue.shallowRef();
  vue.watchEffect(
    () => {
      result.value = fn();
    },
    {
      flush: "sync",
      ...options
    }
  );
  return vue.readonly(result);
}
function isClickInsideElement(event, targetDiv) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const divRect = targetDiv.getBoundingClientRect();
  const divLeft = divRect.left;
  const divTop = divRect.top;
  const divRight = divRect.right;
  const divBottom = divRect.bottom;
  return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
}
function templateRef() {
  const el = vue.shallowRef();
  const fn = (target) => {
    el.value = target;
  };
  Object.defineProperty(fn, "value", {
    enumerable: true,
    get: () => el.value,
    set: (val) => el.value = val
  });
  Object.defineProperty(fn, "el", {
    enumerable: true,
    get: () => refElement(el.value)
  });
  return fn;
}
function checkPrintable(e) {
  const isPrintableChar = e.key.length === 1;
  const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey;
  return isPrintableChar && noModifier;
}
const block = ["top", "bottom"];
const inline = ["start", "end", "left", "right"];
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(" ");
  if (!align) {
    align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === "start")
    return isRtl ? "right" : "left";
  if (str === "end")
    return isRtl ? "left" : "right";
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.side],
    // align 属性保持不变
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? "y" : "x";
}
const red = {
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350",
  darken1: "#e53935",
  darken2: "#d32f2f",
  darken3: "#c62828",
  darken4: "#b71c1c",
  accent1: "#ff8a80",
  accent2: "#ff5252",
  accent3: "#ff1744",
  accent4: "#d50000"
};
const pink = {
  base: "#e91e63",
  lighten5: "#fce4ec",
  lighten4: "#f8bbd0",
  lighten3: "#f48fb1",
  lighten2: "#f06292",
  lighten1: "#ec407a",
  darken1: "#d81b60",
  darken2: "#c2185b",
  darken3: "#ad1457",
  darken4: "#880e4f",
  accent1: "#ff80ab",
  accent2: "#ff4081",
  accent3: "#f50057",
  accent4: "#c51162"
};
const purple = {
  base: "#9c27b0",
  lighten5: "#f3e5f5",
  lighten4: "#e1bee7",
  lighten3: "#ce93d8",
  lighten2: "#ba68c8",
  lighten1: "#ab47bc",
  darken1: "#8e24aa",
  darken2: "#7b1fa2",
  darken3: "#6a1b9a",
  darken4: "#4a148c",
  accent1: "#ea80fc",
  accent2: "#e040fb",
  accent3: "#d500f9",
  accent4: "#aa00ff"
};
const deepPurple = {
  base: "#673ab7",
  lighten5: "#ede7f6",
  lighten4: "#d1c4e9",
  lighten3: "#b39ddb",
  lighten2: "#9575cd",
  lighten1: "#7e57c2",
  darken1: "#5e35b1",
  darken2: "#512da8",
  darken3: "#4527a0",
  darken4: "#311b92",
  accent1: "#b388ff",
  accent2: "#7c4dff",
  accent3: "#651fff",
  accent4: "#6200ea"
};
const indigo = {
  base: "#3f51b5",
  lighten5: "#e8eaf6",
  lighten4: "#c5cae9",
  lighten3: "#9fa8da",
  lighten2: "#7986cb",
  lighten1: "#5c6bc0",
  darken1: "#3949ab",
  darken2: "#303f9f",
  darken3: "#283593",
  darken4: "#1a237e",
  accent1: "#8c9eff",
  accent2: "#536dfe",
  accent3: "#3d5afe",
  accent4: "#304ffe"
};
const blue = {
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5",
  darken1: "#1e88e5",
  darken2: "#1976d2",
  darken3: "#1565c0",
  darken4: "#0d47a1",
  accent1: "#82b1ff",
  accent2: "#448aff",
  accent3: "#2979ff",
  accent4: "#2962ff"
};
const lightBlue = {
  base: "#03a9f4",
  lighten5: "#e1f5fe",
  lighten4: "#b3e5fc",
  lighten3: "#81d4fa",
  lighten2: "#4fc3f7",
  lighten1: "#29b6f6",
  darken1: "#039be5",
  darken2: "#0288d1",
  darken3: "#0277bd",
  darken4: "#01579b",
  accent1: "#80d8ff",
  accent2: "#40c4ff",
  accent3: "#00b0ff",
  accent4: "#0091ea"
};
const cyan = {
  base: "#00bcd4",
  lighten5: "#e0f7fa",
  lighten4: "#b2ebf2",
  lighten3: "#80deea",
  lighten2: "#4dd0e1",
  lighten1: "#26c6da",
  darken1: "#00acc1",
  darken2: "#0097a7",
  darken3: "#00838f",
  darken4: "#006064",
  accent1: "#84ffff",
  accent2: "#18ffff",
  accent3: "#00e5ff",
  accent4: "#00b8d4"
};
const teal = {
  base: "#009688",
  lighten5: "#e0f2f1",
  lighten4: "#b2dfdb",
  lighten3: "#80cbc4",
  lighten2: "#4db6ac",
  lighten1: "#26a69a",
  darken1: "#00897b",
  darken2: "#00796b",
  darken3: "#00695c",
  darken4: "#004d40",
  accent1: "#a7ffeb",
  accent2: "#64ffda",
  accent3: "#1de9b6",
  accent4: "#00bfa5"
};
const green = {
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a",
  darken1: "#43a047",
  darken2: "#388e3c",
  darken3: "#2e7d32",
  darken4: "#1b5e20",
  accent1: "#b9f6ca",
  accent2: "#69f0ae",
  accent3: "#00e676",
  accent4: "#00c853"
};
const lightGreen = {
  base: "#8bc34a",
  lighten5: "#f1f8e9",
  lighten4: "#dcedc8",
  lighten3: "#c5e1a5",
  lighten2: "#aed581",
  lighten1: "#9ccc65",
  darken1: "#7cb342",
  darken2: "#689f38",
  darken3: "#558b2f",
  darken4: "#33691e",
  accent1: "#ccff90",
  accent2: "#b2ff59",
  accent3: "#76ff03",
  accent4: "#64dd17"
};
const lime = {
  base: "#cddc39",
  lighten5: "#f9fbe7",
  lighten4: "#f0f4c3",
  lighten3: "#e6ee9c",
  lighten2: "#dce775",
  lighten1: "#d4e157",
  darken1: "#c0ca33",
  darken2: "#afb42b",
  darken3: "#9e9d24",
  darken4: "#827717",
  accent1: "#f4ff81",
  accent2: "#eeff41",
  accent3: "#c6ff00",
  accent4: "#aeea00"
};
const yellow = {
  base: "#ffeb3b",
  lighten5: "#fffde7",
  lighten4: "#fff9c4",
  lighten3: "#fff59d",
  lighten2: "#fff176",
  lighten1: "#ffee58",
  darken1: "#fdd835",
  darken2: "#fbc02d",
  darken3: "#f9a825",
  darken4: "#f57f17",
  accent1: "#ffff8d",
  accent2: "#ffff00",
  accent3: "#ffea00",
  accent4: "#ffd600"
};
const amber = {
  base: "#ffc107",
  lighten5: "#fff8e1",
  lighten4: "#ffecb3",
  lighten3: "#ffe082",
  lighten2: "#ffd54f",
  lighten1: "#ffca28",
  darken1: "#ffb300",
  darken2: "#ffa000",
  darken3: "#ff8f00",
  darken4: "#ff6f00",
  accent1: "#ffe57f",
  accent2: "#ffd740",
  accent3: "#ffc400",
  accent4: "#ffab00"
};
const orange = {
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726",
  darken1: "#fb8c00",
  darken2: "#f57c00",
  darken3: "#ef6c00",
  darken4: "#e65100",
  accent1: "#ffd180",
  accent2: "#ffab40",
  accent3: "#ff9100",
  accent4: "#ff6d00"
};
const deepOrange = {
  base: "#ff5722",
  lighten5: "#fbe9e7",
  lighten4: "#ffccbc",
  lighten3: "#ffab91",
  lighten2: "#ff8a65",
  lighten1: "#ff7043",
  darken1: "#f4511e",
  darken2: "#e64a19",
  darken3: "#d84315",
  darken4: "#bf360c",
  accent1: "#ff9e80",
  accent2: "#ff6e40",
  accent3: "#ff3d00",
  accent4: "#dd2c00"
};
const brown = {
  base: "#795548",
  lighten5: "#efebe9",
  lighten4: "#d7ccc8",
  lighten3: "#bcaaa4",
  lighten2: "#a1887f",
  lighten1: "#8d6e63",
  darken1: "#6d4c41",
  darken2: "#5d4037",
  darken3: "#4e342e",
  darken4: "#3e2723"
};
const blueGrey = {
  base: "#607d8b",
  lighten5: "#eceff1",
  lighten4: "#cfd8dc",
  lighten3: "#b0bec5",
  lighten2: "#90a4ae",
  lighten1: "#78909c",
  darken1: "#546e7a",
  darken2: "#455a64",
  darken3: "#37474f",
  darken4: "#263238"
};
const grey = {
  base: "#9e9e9e",
  lighten5: "#fafafa",
  lighten4: "#f5f5f5",
  lighten3: "#eeeeee",
  lighten2: "#e0e0e0",
  lighten1: "#bdbdbd",
  darken1: "#757575",
  darken2: "#616161",
  darken3: "#424242",
  darken4: "#212121"
};
const shades = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00",
  // 遮罩层
  mask: "rgba(0, 0, 0, 0.5)",
  // 阴影
  shadow: "rgba(0, 0, 0, 0.15)",
  // 高亮
  highlight: "rgba(255, 255, 255, 0.8)"
};
const success = {
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a"
};
const info = {
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5"
};
const warning = {
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726"
};
const error = {
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350"
};
const mainTRC = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.072175;
const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62;
const blkThrs = 0.03;
const blkClmp = 1.45;
const deltaYmin = 5e-4;
const scaleBoW = 1.25;
const scaleWoB = 1.25;
const loConThresh = 0.078;
const loConFactor = 12.82051282051282;
const loConOffset = 0.06;
const loClip = 1e-3;
function APCAcontrast(text, background) {
  const Rtxt = (text.r / 255) ** mainTRC;
  const Gtxt = (text.g / 255) ** mainTRC;
  const Btxt = (text.b / 255) ** mainTRC;
  const Rbg = (background.r / 255) ** mainTRC;
  const Gbg = (background.g / 255) ** mainTRC;
  const Bbg = (background.b / 255) ** mainTRC;
  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
  if (Ytxt <= blkThrs)
    Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs)
    Ybg += (blkThrs - Ybg) ** blkClmp;
  if (Math.abs(Ybg - Ytxt) < deltaYmin)
    return 0;
  let outputContrast;
  if (Ybg > Ytxt) {
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
    outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -1e-3 ? 0 : SAPC > -0.078 ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }
  return outputContrast * 100;
}
const delta = 0.20689655172413793;
function cielabForwardTransform(t) {
  return t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
}
function cielabReverseTransform(t) {
  return t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
}
function fromXYZ$1(xyz) {
  const transform = cielabForwardTransform;
  const transformedY = transform(xyz[1]);
  return [
    116 * transformedY - 16,
    500 * (transform(xyz[0] / 0.95047) - transformedY),
    200 * (transformedY - transform(xyz[2] / 1.08883))
  ];
}
function toXYZ$1(lab) {
  const transform = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [
    transform(Ln + lab[1] / 500) * 0.95047,
    transform(Ln),
    transform(Ln - lab[2] / 200) * 1.08883
  ];
}
const srgbForwardMatrix = [
  [3.2406, -1.5372, -0.4986],
  [-0.9689, 1.8758, 0.0415],
  [0.0557, -0.204, 1.057]
];
function srgbForwardTransform(C) {
  return C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;
}
const srgbReverseMatrix = [
  [0.4124, 0.3576, 0.1805],
  [0.2126, 0.7152, 0.0722],
  [0.0193, 0.1192, 0.9505]
];
function srgbReverseTransform(C) {
  return C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
}
function fromXYZ(xyz) {
  const rgb = Array.from({ length: 3 });
  const transform = srgbForwardTransform;
  const matrix = srgbForwardMatrix;
  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(
      clamp(
        transform(
          matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2]
        )
      ) * 255
    );
  }
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  };
}
function toXYZ({ r, g, b }) {
  const xyz = [0, 0, 0];
  const transform = srgbReverseTransform;
  const matrix = srgbReverseMatrix;
  r = transform(r / 255);
  g = transform(g / 255);
  b = transform(b / 255);
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }
  return xyz;
}
function consoleWarn(message) {
  vue.warn(`Jovial: ${message}`);
}
function consoleError(message) {
  vue.warn(`Jovial error: ${message}`);
}
function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor(color) {
  return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
const cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
const mappers = {
  rgb: (r, g, b, a) => ({ r, g, b, a }),
  rgba: (r, g, b, a) => ({ r, g, b, a }),
  hsl: (h, s, l, a) => HSLtoRGB({ h, s, l, a }),
  hsla: (h, s, l, a) => HSLtoRGB({ h, s, l, a }),
  hsv: (h, s, v, a) => HSVtoRGB({ h, s, v, a }),
  hsva: (h, s, v, a) => HSVtoRGB({ h, s, v, a })
};
function parseColor(color) {
  if (typeof color === "number") {
    if (Number.isNaN(color) || color < 0 || color > 16777215) {
      consoleWarn(`'${color}' is not a valid hex color`);
    }
    return {
      r: (color & 16711680) >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  } else if (typeof color === "string" && cssColorRe.test(color)) {
    const { groups } = color.match(cssColorRe);
    const { fn, values } = groups;
    const realValues = values.split(/,\s*/).map((v) => {
      if (v.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(fn)) {
        return Number.parseFloat(v) / 100;
      } else {
        return Number.parseFloat(v);
      }
    });
    return mappers[fn](...realValues);
  } else if (typeof color === "string") {
    let hex = color.startsWith("#") ? color.slice(1) : color;
    if ([3, 4].includes(hex.length)) {
      hex = hex.split("").map((char) => char + char).join("");
    } else if (![6, 8].includes(hex.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    const int = Number.parseInt(hex, 16);
    if (Number.isNaN(int) || int < 0 || int > 4294967295) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    return HexToRGB(hex);
  } else if (typeof color === "object") {
    if (has(color, ["r", "g", "b"])) {
      return color;
    } else if (has(color, ["h", "s", "l"])) {
      return HSVtoRGB(HSLtoHSV(color));
    } else if (has(color, ["h", "s", "v"])) {
      return HSVtoRGB(color);
    }
  }
  throw new TypeError(
    `Invalid color: ${color == null ? color : String(color) || color.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`
  );
}
function RGBToInt(color) {
  return (color.r << 16) + (color.g << 8) + color.b;
}
function classToHex(color, colors, currentTheme) {
  const [colorName, colorModifier] = color.toString().trim().replace("-", "").split(" ", 2);
  let hexColor = "";
  if (colorName && colorName in colors) {
    if (colorModifier && colorModifier in colors[colorName]) {
      hexColor = colors[colorName][colorModifier];
    } else if ("base" in colors[colorName]) {
      hexColor = colors[colorName].base;
    }
  } else if (colorName && colorName in currentTheme) {
    hexColor = currentTheme[colorName];
  }
  return hexColor;
}
function HSVtoRGB(hsva) {
  const { h, s, v, a } = hsva;
  const f = (n) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  const rgb = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
  return { r: rgb[0], g: rgb[1], b: rgb[2], a };
}
function HSLtoRGB(hsla) {
  return HSVtoRGB(HSLtoHSV(hsla));
}
function RGBtoHSV(rgba) {
  if (!rgba)
    return { h: 0, s: 1, v: 1, a: 1 };
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }
  }
  if (h < 0)
    h = h + 360;
  const s = max === 0 ? 0 : (max - min) / max;
  const hsv = [h, s, max];
  return { h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a };
}
function HSVtoHSL(hsva) {
  const { h, s, v, a } = hsva;
  const l = v - v * s / 2;
  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
  return { h, s: sprime, l, a };
}
function HSLtoHSV(hsl) {
  const { h, s, l, a } = hsl;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return { h, s: sprime, v, a };
}
function RGBtoCSS({ r, g, b, a }) {
  return a === void 0 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}
function HSVtoCSS(hsva) {
  return RGBtoCSS(HSVtoRGB(hsva));
}
function toHex(v) {
  const h = Math.round(v).toString(16);
  return ("00".substr(0, 2 - h.length) + h).toUpperCase();
}
function RGBtoHex({ r, g, b, a }) {
  return `#${[
    toHex(r),
    toHex(g),
    toHex(b),
    a !== void 0 ? toHex(Math.round(a * 255)) : ""
  ].join("")}`;
}
function HexToRGB(hex) {
  hex = parseHex(hex);
  let [r, g, b, a] = chunk(hex, 2).map((c) => Number.parseInt(c, 16));
  a = a === void 0 ? a : a / 255;
  return { r, g, b, a };
}
function HexToHSV(hex) {
  const rgb = HexToRGB(hex);
  return RGBtoHSV(rgb);
}
function HSVtoHex(hsva) {
  return RGBtoHex(HSVtoRGB(hsva));
}
function parseHex(hex) {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  hex = hex.replace(/([^0-9a-f])/gi, "F");
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  if (hex.length !== 6) {
    hex = padEnd(padEnd(hex, 6), 8, "F");
  }
  return hex;
}
function parseGradient(gradient, colors, currentTheme) {
  return gradient.replace(/([a-z]+(\s[a-z]+-[1-5])?)(?=$|,)/gi, (x) => {
    return classToHex(x, colors, currentTheme) || x;
  }).replace(/(rgba\()#[0-9a-f]+(?=,)/gi, (x) => {
    return `rgba(${Object.values(HexToRGB(parseHex(x.replace(/rgba\(/, "")))).slice(0, 3).join(",")}`;
  });
}
function lighten(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function darken(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function getLuma(color) {
  const rgb = parseColor(color);
  return toXYZ(rgb)[1];
}
function getContrast(first, second) {
  const l1 = getLuma(first);
  const l2 = getLuma(second);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}
function getForeground(color) {
  const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
  const whiteContrast = Math.abs(
    APCAcontrast(parseColor(16777215), parseColor(color))
  );
  return whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
}
function toCamelCase(str) {
  return str.split("-").map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join("");
}
function toJson(data) {
  return JSON.stringify(data, null, 2);
}
function isObject$1(thing) {
  return typeof thing === "object" && thing !== null && Object.prototype.toString.call(thing) === "[object Object]";
}
function isEmptyObject(thing) {
  return isObject$1(thing) && Object.keys(thing).length === 0;
}
function hasOwnProperty$1(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function getType(value) {
  return Object.prototype.toString.call(value);
}
function isArray(value) {
  return Array.isArray(value);
}
function isNull(value) {
  return getType(value) === "[object Null]";
}
function isBoolean(value) {
  return getType(value) === "[object Boolean]";
}
function isDate(value) {
  return getType(value) === "[object Date]";
}
function isFunction$1(value) {
  return getType(value) === "[object Function]";
}
function isNumber(value) {
  return getType(value) === "[object Number]" || typeof value === "number" && Number.isNaN(value);
}
function isNumberExcludeNaN(value) {
  return getType(value) === "[object Number]" && !Number.isNaN(value);
}
function isRegExp(value) {
  return getType(value) === "[object RegExp]";
}
function isString(value) {
  return getType(value) === "[object String]";
}
function isEmpty(value) {
  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }
  if (isNumberExcludeNaN(value)) {
    return false;
  }
  if (isObject$1(value)) {
    return Object.keys(value).length === 0;
  }
  return !value;
}
function isUndefined(value) {
  return getType(value) === "[object Undefined]";
}
const sizeOptions = ["tiny", "small", "medium", "large", "x-large"];
const typeOptions = ["default", "primary", "success", "warning", "error", "info"];
const variantOptions = ["text", "flat", "tonal", "plain", "elevated", "outlined"];
const statusOptions = ["loading", "disabled"];
const nativeTypeOptions = ["button", "submit", "reset"];
const shapeOptions = ["square", "rounded", "circle"];
const containerStore = /* @__PURE__ */ new Map();
function generateContainerId(namespace) {
  return `jv-global-${namespace}`;
}
const containerManager = {
  getContainer(options = {}) {
    const {
      namespace = "default",
      id = generateContainerId(namespace),
      style = {
        float: "left",
        top: "0",
        left: "0",
        zIndex: "9999"
      }
    } = options;
    const key = `${namespace}:${id}`;
    if (!containerStore.has(key)) {
      const container = document.createElement("div");
      container.id = id;
      Object.assign(container.style, style);
      document.body.appendChild(container);
      containerStore.set(key, {
        element: container,
        refCount: 0
      });
    }
    const record = containerStore.get(key);
    record.refCount++;
    return {
      element: record.element,
      release: () => containerManager.releaseContainer(key),
      appendContent: (content) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "contents";
        wrapper.appendChild(content);
        record.element.appendChild(wrapper);
        return wrapper;
      }
    };
  },
  // 释放容器
  releaseContainer(key) {
    const record = containerStore.get(key);
    if (!record)
      return;
    if (--record.refCount <= 0) {
      record.element.remove();
      containerStore.delete(key);
    }
  },
  // 销毁所有容器
  destroyAll() {
    containerStore.forEach((record) => {
      record.element.remove();
    });
    containerStore.clear();
  }
};
function useContainerManager() {
  const containers = /* @__PURE__ */ new Set();
  vue.onUnmounted(() => {
    containers.forEach((key) => containerManager.releaseContainer(key));
    containers.clear();
  });
  return {
    getContainer: (options) => {
      const { element, release, appendContent } = containerManager.getContainer(options);
      const key = `${(options == null ? void 0 : options.namespace) || "default"}:${element.id}`;
      containers.add(key);
      return {
        element,
        appendContent,
        release: () => {
          release();
          containers.delete(key);
        }
      };
    }
  };
}
/**
 * @license
 * 创建BEM规范
 *  什么是BEM规范?
 *      BEM（Block-Element-Modifier）
 *      Block：块级元素，比如一个按钮，一个输入框，一个列表等。
 *      Element：元素，比如按钮的文字，按钮的图标等。
 *      Modifier：修改器，比如按钮的禁用状态，按钮的加载状态等。
 *      BEM规范：
 *          1. Block：块级元素，比如一个按钮，一个输入框，一个列表等。
 *          2. Element：元素，比如按钮的文字，按钮的图标等。
 *          3. Modifier：修改器，比如按钮的禁用状态，按钮的加载状态等。
 */
function _bem(prefixName, blockSuffix, element, modifier) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}
function createBEM(prefixName) {
  const b = (blockSuffix = "") => _bem(prefixName, blockSuffix, "", "");
  const e = (element) => _bem(prefixName, "", element, "");
  const m = (modifier) => {
    return modifier ? _bem(prefixName, "", "", modifier) : "";
  };
  const be = (blockSuffix, element) => _bem(prefixName, blockSuffix, element, "");
  const em = (element, modifier) => _bem(prefixName, "", element, modifier);
  const bm = (blockSuffix, modifier) => _bem(prefixName, blockSuffix, "", modifier);
  const bem = (blockSuffix, element, modifier) => _bem(prefixName, blockSuffix, element, modifier);
  const is = (name, state) => state ? `is-${name}` : "";
  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
}
function createNamespace(namespace) {
  const prefixName = `jv-${namespace}`;
  return createBEM(prefixName);
}
function createDynamicStyleSheet() {
  const styleSheet = new CSSStyleSheet();
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
  return styleSheet;
}
function addCSSRule(styleSheet, selector, rules) {
  styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length);
}
function removeCSSRule(styleSheet, selector) {
  const index = Array.from(styleSheet.cssRules).findIndex(
    (rule) => rule instanceof CSSStyleRule && rule.selectorText === selector
  );
  if (index !== -1) {
    styleSheet.deleteRule(index);
  }
}
function getCSSRule(styleSheet, selector) {
  const rule = Array.from(styleSheet.cssRules).find(
    (rule2) => rule2 instanceof CSSStyleRule && rule2.selectorText === selector
  );
  return rule instanceof CSSStyleRule ? rule : null;
}
class PerformanceStyleInjector {
  constructor() {
    this.styleCache = /* @__PURE__ */ new Map();
    this.styleElement = null;
  }
  // 缓存和去重
  inject(styles) {
    const styleHash = this.hashStyles(styles);
    if (!this.styleCache.has(styleHash)) {
      this.createStyleElement();
      if (this.styleElement) {
        this.styleElement.textContent += styles;
        this.styleCache.set(styleHash, true);
      }
    }
  }
  // 样式哈希
  hashStyles(styles) {
    return styles.split("").reduce((hash, char) => {
      return (hash << 5) - hash + char.charCodeAt(0);
    }, 0);
  }
  // 创建样式标签
  createStyleElement() {
    if (!this.styleElement) {
      this.styleElement = document.createElement("style");
      document.head.appendChild(this.styleElement);
    }
  }
}
const styleInjector = new PerformanceStyleInjector();
styleInjector.inject(`  
  .button {   
    color: blue;   
    padding: 10px;   
  }  
`);
function toCSSValue(value) {
  return typeof value === "number" ? `${value}px` : value ?? "0";
}
function csstoNumber(value) {
  return typeof value === "number" ? value : Number.parseInt(value);
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode) node = node.parentNode;
    if (node !== document)
      return null;
    return document;
  }
  const root2 = node.getRootNode();
  if (root2 !== document && root2.getRootNode({ composed: true }) !== document)
    return null;
  return root2;
}
function on(element, event, handler) {
  element.addEventListener(event, handler);
}
function off(element, event, handler) {
  element.removeEventListener(event, handler);
}
function isElement(element) {
  if (element == null) {
    return false;
  }
  return typeof element === "object" && element.nodeType === 1 && typeof element.nodeName === "string";
}
function getCurrentInstance(name, message) {
  const vm = vue.getCurrentInstance();
  if (!vm) {
    throw new Error(
      `[Vuetify] ${name} ${message || "must be called from inside a setup function"}`
    );
  }
  return vm;
}
function getCurrentInstanceName(name = "composables") {
  const vm = getCurrentInstance(name).type;
  return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
}
let _uid = 0;
let _map = /* @__PURE__ */ new WeakMap();
function getUid() {
  const vm = getCurrentInstance("getUid");
  if (_map.has(vm)) {
    return _map.get(vm);
  } else {
    const uid = _uid++;
    _map.set(vm, uid);
    return uid;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = /* @__PURE__ */ new WeakMap();
};
function injectSelf(key, vm = getCurrentInstance("injectSelf")) {
  const { provides } = vm;
  if (provides && key in provides) {
    return provides[key];
  }
  return void 0;
}
function get(obj, path, defaultValue) {
  if (obj == null)
    return defaultValue;
  const keys2 = Array.isArray(path) ? path : path.split(".");
  let result = obj;
  for (const key of keys2) {
    if (result == null || typeof result !== "object")
      return defaultValue;
    result = result[key];
  }
  return result === void 0 ? defaultValue : result;
}
function propsFactory(props, source) {
  return (defaults) => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : { type: props[prop] };
      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }
      if (source && !obj[prop].source) {
        obj[prop].source = source;
      }
      return obj;
    }, {});
  };
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$1 = Object.prototype;
var hasOwnProperty = objectProto$1.hasOwnProperty;
var nativeObjectToString$1 = objectProto$1.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
function composeRefs(...refs) {
  return (el) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(el);
      } else {
        ref.value = el;
      }
    });
  };
}
function ensureOnlyChild(children) {
  if (!isArray(children) || children.length > 1) {
    throw new Error("expect to receive a single Vue element child");
  }
  return children[0];
}
function getSlotsFirstChild(slots) {
  const [firstChild] = isFunction$1(slots) ? slots() : [];
  return firstChild;
}
function isTextNode(vnode) {
  const _vnode = vue.unref(vnode);
  if (!vue.isVNode(_vnode)) {
    return false;
  }
  const result = _vnode.type === Symbol.for("v-txt");
  return result;
}
function isSlotNode(vnode) {
  const _vnode = vue.unref(vnode);
  return vue.isVNode(_vnode) && _vnode.type === Symbol.for("v-fgt");
}
function getComponentName(vnode) {
  if (!vue.isVNode(vnode)) {
    return "";
  }
  if (typeof vnode.type === "string") {
    return vnode.type;
  }
  if (isTextNode(vnode)) {
    return "v-txt";
  }
  if (vue.isVNode(vnode.type)) {
    return vnode.type.name;
  }
  return "";
}
function withInstall(comp) {
  comp.install = function(app) {
    const componentName = comp.name;
    if (typeof componentName === "string") {
      app.component(componentName, comp);
      app.component(toCamelCase(componentName), comp);
    }
  };
  return comp;
}
exports.CircularBuffer = CircularBuffer;
exports.EventProp = EventProp;
exports.HSLtoHSV = HSLtoHSV;
exports.HSLtoRGB = HSLtoRGB;
exports.HSVtoCSS = HSVtoCSS;
exports.HSVtoHSL = HSVtoHSL;
exports.HSVtoHex = HSVtoHex;
exports.HSVtoRGB = HSVtoRGB;
exports.HexToHSV = HexToHSV;
exports.HexToRGB = HexToRGB;
exports.IN_BROWSER = IN_BROWSER;
exports.IS_MOBILE = IS_MOBILE;
exports.RGBToInt = RGBToInt;
exports.RGBtoCSS = RGBtoCSS;
exports.RGBtoHSV = RGBtoHSV;
exports.RGBtoHex = RGBtoHex;
exports.SUPPORTS_EYE_DROPPER = SUPPORTS_EYE_DROPPER;
exports.SUPPORTS_INTERSECTION = SUPPORTS_INTERSECTION;
exports.SUPPORTS_TOUCH = SUPPORTS_TOUCH;
exports.addCSSRule = addCSSRule;
exports.amber = amber;
exports.arrayDiff = arrayDiff;
exports.attachedRoot = attachedRoot;
exports.blue = blue;
exports.blueGrey = blueGrey;
exports.brown = brown;
exports.callEvent = callEvent;
exports.checkPrintable = checkPrintable;
exports.chunk = chunk;
exports.chunkArray = chunkArray;
exports.clamp = clamp;
exports.classToHex = classToHex;
exports.composeRefs = composeRefs;
exports.consoleError = consoleError;
exports.consoleWarn = consoleWarn;
exports.containerManager = containerManager;
exports.convertToUnit = convertToUnit;
exports.createDynamicStyleSheet = createDynamicStyleSheet;
exports.createNamespace = createNamespace;
exports.createRange = createRange;
exports.csstoNumber = csstoNumber;
exports.cyan = cyan;
exports.darken = darken;
exports.debounce = debounce;
exports.deepEqual = deepEqual;
exports.deepOrange = deepOrange;
exports.deepPurple = deepPurple;
exports.defaultFilter = defaultFilter;
exports.defer = defer;
exports.destructComputed = destructComputed;
exports.eagerComputed = eagerComputed;
exports.ensureOnlyChild = ensureOnlyChild;
exports.ensureValidVNode = ensureValidVNode;
exports.error = error;
exports.eventName = eventName;
exports.filterInputAttrs = filterInputAttrs;
exports.findChildrenWithProvide = findChildrenWithProvide;
exports.flattenFragments = flattenFragments;
exports.flipAlign = flipAlign;
exports.flipCorner = flipCorner;
exports.flipSide = flipSide;
exports.focusChild = focusChild;
exports.focusableChildren = focusableChildren;
exports.get = get;
exports.getAxis = getAxis;
exports.getCSSRule = getCSSRule;
exports.getComponentName = getComponentName;
exports.getContrast = getContrast;
exports.getCurrentInstance = getCurrentInstance;
exports.getCurrentInstanceName = getCurrentInstanceName;
exports.getDecimals = getDecimals;
exports.getEventCoordinates = getEventCoordinates;
exports.getForeground = getForeground;
exports.getLuma = getLuma;
exports.getNestedValue = getNestedValue;
exports.getNextElement = getNextElement;
exports.getObjectValueByPath = getObjectValueByPath;
exports.getPropertyFromItem = getPropertyFromItem;
exports.getSlotsFirstChild = getSlotsFirstChild;
exports.getUid = getUid;
exports.getZIndex = getZIndex;
exports.green = green;
exports.grey = grey;
exports.has = has;
exports.hasEvent = hasEvent;
exports.hasOwnProperty = hasOwnProperty$1;
exports.humanReadableFileSize = humanReadableFileSize;
exports.includes = includes;
exports.indigo = indigo;
exports.info = info;
exports.injectSelf = injectSelf;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isClickInsideElement = isClickInsideElement;
exports.isComposingIgnoreKey = isComposingIgnoreKey;
exports.isCssColor = isCssColor;
exports.isDate = isDate;
exports.isElement = isElement;
exports.isEmpty = isEmpty;
exports.isEmptyObject = isEmptyObject;
exports.isFunction = isFunction$1;
exports.isMobile = isMobile;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isNumberExcludeNaN = isNumberExcludeNaN;
exports.isObject = isObject$1;
exports.isOn = isOn;
exports.isParsableColor = isParsableColor;
exports.isPlainObject = isPlainObject;
exports.isRegExp = isRegExp;
exports.isSlotNode = isSlotNode;
exports.isString = isString;
exports.isTextNode = isTextNode;
exports.isUndefined = isUndefined;
exports.keyCodes = keyCodes;
exports.keyValues = keyValues;
exports.keys = keys;
exports.lightBlue = lightBlue;
exports.lightGreen = lightGreen;
exports.lighten = lighten;
exports.lime = lime;
exports.matchesSelector = matchesSelector;
exports.mergeDeep = mergeDeep;
exports.nativeTypeOptions = nativeTypeOptions;
exports.noop = noop;
exports.off = off;
exports.omit = omit;
exports.on = on;
exports.only = only;
exports.orange = orange;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.parseAnchor = parseAnchor;
exports.parseColor = parseColor;
exports.parseGradient = parseGradient;
exports.parseHex = parseHex;
exports.pick = pick;
exports.pickWithRest = pickWithRest;
exports.pink = pink;
exports.propsFactory = propsFactory;
exports.purple = purple;
exports.red = red;
exports.refElement = refElement;
exports.removeCSSRule = removeCSSRule;
exports.shades = shades;
exports.shapeOptions = shapeOptions;
exports.sizeOptions = sizeOptions;
exports.statusOptions = statusOptions;
exports.success = success;
exports.teal = teal;
exports.templateRef = templateRef;
exports.throttle = throttle;
exports.toCSSValue = toCSSValue;
exports.toCamelCase = toCamelCase;
exports.toJson = toJson;
exports.toKebabCase = toKebabCase;
exports.toPhysical = toPhysical;
exports.typeOptions = typeOptions;
exports.useContainerManager = useContainerManager;
exports.variantOptions = variantOptions;
exports.warning = warning;
exports.withInstall = withInstall;
exports.wrapInArray = wrapInArray;
exports.yellow = yellow;
//# sourceMappingURL=index.cjs.map
