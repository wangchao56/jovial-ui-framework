'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var common = require('../../../utils/common.cjs');
var create = require('../../../utils/create.cjs');
var IconEyeOff = require('../../internal-icon/IconEyeOff.cjs');
var IconEyeOn = require('../../internal-icon/IconEyeOn.cjs');
var closeThick = require('../../internal-icon/close-thick.cjs');
require('../../form/index.cjs');
var formItem = require('../../form/src/form-item.cjs');
var form = require('../../form/src/form.cjs');

const _hoisted_1 = ["type", "placeholder", "disabled", "readonly"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvInput" },
  __name: "input",
  props: {
    defaultValue: { type: [String, Array, null], required: false },
    placeholder: { type: String, required: false, default: undefined },
    modelValue: { type: String, required: false, default: "" },
    disabled: { type: Boolean, required: false, default: false },
    readonly: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false },
    showPassword: { type: Boolean, required: false },
    showWordLimit: { type: Boolean, required: false },
    maxlength: { type: Number, required: false },
    minlength: { type: Number, required: false },
    autofocus: { type: Boolean, required: false },
    autosize: { type: [Boolean, Object], required: false },
    pair: { type: Boolean, required: false },
    rows: { type: Number, required: false },
    round: { type: Boolean, required: false },
    separator: { type: String, required: false },
    showCount: { type: Boolean, required: false },
    size: { type: null, required: false },
    status: { type: String, required: false },
    type: { type: String, required: false, default: "text" },
    value: { type: [String, Array], required: false },
    inputProps: { type: Object, required: false }
  },
  emits: ["update:modelValue", "update:disabled", "update:readonly", "blur", "focus", "change", "input", "keydown", "error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const formItemContext = vue.inject(formItem.formItemProviderKey);
    vue.inject(form.formProviderKey);
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    vue.useAttrs();
    const bem = create.createNamespace("input");
    const inputRef = vue.ref();
    const inputValue = vue.useModel(props, "modelValue");
    vue.watchEffect(async () => {
      if (formItemContext && !common.isEmpty(inputValue.value)) {
        try {
          await formItemContext.validate("change");
        } catch (error) {
          emit("error", error);
        }
      }
    });
    const showPassword = vue.ref(false);
    function toggleShowPassword() {
      showPassword.value = !showPassword.value;
    }
    const showPwdVisible = vue.computed(() => {
      return props.type === "password" && !props.readonly && !props.disabled && slots.suffix === undefined;
    });
    const showClearable = vue.computed(() => {
      return !props.disabled && !props.readonly && !!inputValue.value && props.clearable;
    });
    const nativeType = vue.computed(() => {
      if (props.type === "password" && showPassword.value) {
        return "text";
      }
      return props.type;
    });
    function emitInput(e) {
      emit("input", inputValue.value);
    }
    function emitChange(e) {
      emit("change", inputValue.value);
    }
    function emitFocus(e) {
      emit("focus", e);
    }
    async function emitBlur(e) {
      if (formItemContext) {
        try {
          await formItemContext.validate("blur");
        } catch (error) {
          emit("error", error);
        }
      }
      emit("blur", e);
    }
    function emitKeydown(e) {
      emit("keydown", e);
    }
    async function focus() {
      var _a;
      if (props.disabled) return;
      if (props.readonly) return;
      if (!inputRef.value) return;
      await vue.nextTick();
      (_a = inputRef.value) == null ? undefined : _a.focus();
    }
    function blur() {
      var _a;
      (_a = inputRef.value) == null ? undefined : _a.blur();
    }
    function select() {
      var _a;
      (_a = inputRef.value) == null ? undefined : _a.select();
    }
    function clear() {
      inputValue.value = "";
      emit("input", inputValue.value);
      emit("update:modelValue", "");
      emit("change", "");
      vue.nextTick(() => {
        var _a;
        (_a = inputRef.value) == null ? undefined : _a.focus();
      });
    }
    function scrollTo() {
      var _a;
      (_a = inputRef.value) == null ? undefined : _a.scrollIntoView();
    }
    __expose({
      focus,
      blur,
      select,
      clear,
      scrollTo
    });
    return (_ctx, _cache) => {
      const _component_JvIcon = vue.resolveComponent("JvIcon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(bem).b())
        },
        [
          _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(bem).be("group", "prepend"))
            },
            [
              vue.renderSlot(_ctx.$slots, "prepend")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass([vue.unref(bem).e("wrapper")])
            },
            [
              _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(bem).e("prefix"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "prefix")
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              vue.withDirectives(vue.createElementVNode("input", vue.mergeProps(_ctx.$attrs, {
                ref_key: "inputRef",
                ref: inputRef,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(inputValue) ? inputValue.value = $event : null),
                type: nativeType.value,
                class: vue.unref(bem).e("inner"),
                placeholder: _ctx.placeholder,
                disabled: _ctx.disabled,
                readonly: _ctx.readonly,
                onInput: emitInput,
                onFocus: emitFocus,
                onBlur: emitBlur,
                onChange: emitChange,
                onKeydown: emitKeydown
              }), null, 16, _hoisted_1), [
                [vue.vModelDynamic, vue.unref(inputValue)]
              ]),
              showClearable.value ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 1,
                  class: vue.normalizeClass(vue.unref(bem).e("clear")),
                  onClick: clear
                },
                [
                  vue.createVNode(_component_JvIcon, { size: _ctx.size }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(closeThick.default))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["size"])
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              showPwdVisible.value ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 2,
                  class: vue.normalizeClass(vue.unref(bem).e("toggle")),
                  onClick: toggleShowPassword
                },
                [
                  vue.createVNode(_component_JvIcon, { size: _ctx.size }, {
                    default: vue.withCtx(() => [
                      showPassword.value ? (vue.openBlock(), vue.createBlock(vue.unref(IconEyeOff.default), { key: 0 })) : (vue.openBlock(), vue.createBlock(vue.unref(IconEyeOn.default), { key: 1 }))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["size"])
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.suffix ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 3,
                  class: vue.normalizeClass(vue.unref(bem).e("suffix"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "suffix")
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(bem).be("group", "append"))
            },
            [
              vue.renderSlot(_ctx.$slots, "append")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=input.vue2.cjs.map
