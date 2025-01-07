(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JovialUI = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  function toCamelCase(str) {
    return str.split("-").map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join("");
  }
  function getType(value) {
    return Object.prototype.toString.call(value);
  }
  function isNumberExcludeNaN(value) {
    return getType(value) === "[object Number]" /* Number&NaN */ && !isNaN(value);
  }
  function isString(value) {
    return getType(value) === "[object String]" /* String */;
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
    const m = (modifier) => _bem(prefixName, "", "", modifier);
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

  const buttonProps = {
    type: {
      type: String,
      default: "default"
    },
    width: {
      type: [String, Number],
      default: "100%"
    },
    size: {
      type: String,
      default: "medium"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    /** 图标 */
    // icon: {
    //   type: String,
    //   default: ''
    // },
    // prependIcon: {
    //   type: String,
    //   default: ''
    // },
    // appendIcon: {
    //   type: String,
    //   default: ''
    // },
    rounded: {
      type: Boolean,
      default: false
    },
    dashed: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    },
    variant: {
      type: String,
      default: "elevated"
    },
    /** 原生 type 属性 */
    nativeType: {
      type: String,
      default: "button"
    },
    /** 原生 autofocus 属性 */
    autofocus: {
      type: Boolean,
      default: false
    }
  };

  vue.defineComponent({
    name: "IconCloseThick",
    render() {
      return /* @__PURE__ */ React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          viewBox: "0 0 24 24"
        },
        /* @__PURE__ */ React.createElement("title", null, "close-thick"),
        /* @__PURE__ */ React.createElement("path", { d: "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" })
      );
    }
  });

  vue.defineComponent({
    name: "IconEyeOff",
    render() {
      return /* @__PURE__ */ React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "currentColor"
        },
        /* @__PURE__ */ React.createElement("path", { d: "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" })
      );
    }
  });

  vue.defineComponent({
    name: "IconEyeOn",
    render() {
      return /* @__PURE__ */ React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          viewBox: "0 0 24 24"
        },
        /* @__PURE__ */ React.createElement("path", { d: "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" })
      );
    }
  });

  var Loading = vue.defineComponent({
    name: "Loading",
    render() {
      return /* @__PURE__ */ React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 -960 960 960",
          fill: "#5f6368",
          class: "loading"
        },
        /* @__PURE__ */ React.createElement("path", { d: "M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" })
      );
    }
  });

  vue.defineComponent({
    name: "Switcher",
    render() {
      return /* @__PURE__ */ React.createElement(
        "svg",
        {
          class: "v-icon__svg",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          role: "img",
          "aria-hidden": "true"
        },
        /* @__PURE__ */ React.createElement("path", { d: "M7,10L12,15L17,10H7Z" })
      );
    }
  });

  const iconProps = {
    size: {
      type: [String, Number],
      default: "1em"
    },
    color: {
      type: String,
      default: "currentColor"
    }
  };

  var SizeOptions = /* @__PURE__ */ ((SizeOptions2) => {
    SizeOptions2["TINY"] = "tiny";
    SizeOptions2["SMALL"] = "small";
    SizeOptions2["MEDIUM"] = "medium";
    SizeOptions2["LARGE"] = "large";
    SizeOptions2["X-LARGE"] = "x-large";
    return SizeOptions2;
  })(SizeOptions || {});

  var _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    ...{ name: "JvIcon" },
    __name: "icon",
    props: iconProps,
    setup(__props) {
      const bem = createNamespace("icon");
      const props = __props;
      const iconClass = vue.computed(() => {
        const baseClass = bem.b();
        const sizeClass = isString(props.size) && props.size.toUpperCase() in SizeOptions ? bem.m(props.size) : "";
        return [baseClass, sizeClass].filter(Boolean);
      });
      const iconStyle = vue.computed(() => {
        let result = {};
        if (props.color) {
          result.color = props.color;
        }
        if (props.size || isNumberExcludeNaN(props.size)) {
          result.fontSize = `${props.size}px`;
          result.lineHeight = `${props.size}px`;
          result.width = `${props.size}px`;
          result.maxHeight = `${props.size}px`;
        }
        return result;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "i",
          {
            class: vue.normalizeClass(iconClass.value),
            style: vue.normalizeStyle(iconStyle.value)
          },
          [
            vue.renderSlot(_ctx.$slots, "default")
          ],
          6
          /* CLASS, STYLE */
        );
      };
    }
  });

  const _hoisted_1 = ["disabled", "type", "autofocus"];
  var _sfc_main = /* @__PURE__ */ vue.defineComponent({
    ...{
      name: "JvButton",
      inheritAttrs: true
    },
    __name: "button",
    props: buttonProps,
    emits: ["click", "mousedown", "keydown"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const bem = createNamespace("button");
      function emitClick(e) {
        emit("click", e);
      }
      function emitMouseDown(e) {
        emit("mousedown", e);
      }
      const buttonStyle = vue.computed(() => {
        let result = {};
        if (props.color) {
          result["color"] = props.color;
        }
        if (props.bgColor) {
          result["background-color"] = props.bgColor;
        }
        return result;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          class: vue.normalizeClass([
            vue.unref(bem).b(),
            vue.unref(bem).m(_ctx.type),
            vue.unref(bem).m(_ctx.size),
            vue.unref(bem).m(_ctx.variant),
            vue.unref(bem).is("dashed", _ctx.dashed),
            vue.unref(bem).is("rounded", _ctx.rounded),
            vue.unref(bem).is("loading", _ctx.loading),
            vue.unref(bem).is("disabled", _ctx.disabled),
            vue.unref(bem).is("block", _ctx.block),
            vue.unref(bem).is("stacked", _ctx.stacked)
          ]),
          disabled: _ctx.loading || _ctx.disabled,
          style: vue.normalizeStyle(buttonStyle.value),
          type: _ctx.nativeType,
          autofocus: _ctx.autofocus,
          onClick: emitClick,
          onMousedown: emitMouseDown
        }, [
          _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(bem).e("prepend"))
            },
            [
              vue.renderSlot(_ctx.$slots, "prepend")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(bem).e("loader"))
            },
            [
              vue.createVNode(_sfc_main$1, { size: _ctx.size }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(Loading))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["size"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(vue.unref(bem).e("content"))
            },
            [
              vue.createCommentVNode(" \u9ED8\u8BA4\u63D2\u69FD "),
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 2,
              class: vue.normalizeClass(vue.unref(bem).e("append"))
            },
            [
              vue.renderSlot(_ctx.$slots, "append")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ], 46, _hoisted_1);
      };
    }
  });

  const button = withInstall(_sfc_main);

  const Icon = withInstall(_sfc_main$1);

  var components = [button, Icon];

  const install = function(app) {
    if (install == null ? void 0 : install.installed) return;
    components.forEach((component) => {
      app.use(component);
    });
    install.installed = true;
  };

  exports.default = install;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
