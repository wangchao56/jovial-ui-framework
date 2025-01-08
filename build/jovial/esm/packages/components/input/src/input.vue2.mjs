import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, isRef, mergeProps, nextTick, normalizeClass, openBlock, ref, renderSlot, resolveComponent, unref, useAttrs, useModel, useSlots, vModelDynamic, watchEffect, withCtx, withDirectives } from 'vue'
import { isEmpty } from '../../../utils/common.mjs'
import { createNamespace } from '../../../utils/create.mjs'
import { formItemProviderKey } from '../../form/src/form-item.mjs'
import { formProviderKey } from '../../form/src/form.mjs'
import IconCloseThick from '../../internal-icon/close-thick.mjs'
import IconEyeOff from '../../internal-icon/IconEyeOff.mjs'
import IconEyeOn from '../../internal-icon/IconEyeOn.mjs'
import '../../form/index.mjs'

const _hoisted_1 = ['type', 'placeholder', 'disabled', 'readonly']
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvInput' },
  __name: 'input',
  props: {
    defaultValue: { type: [String, Array, null], required: false },
    placeholder: { type: String, required: false, default: undefined },
    modelValue: { type: String, required: false, default: '' },
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
    type: { type: String, required: false, default: 'text' },
    value: { type: [String, Array], required: false },
    inputProps: { type: Object, required: false },
  },
  emits: ['update:modelValue', 'update:disabled', 'update:readonly', 'blur', 'focus', 'change', 'input', 'keydown', 'error'],
  setup(__props, { expose: __expose, emit: __emit }) {
    const formItemContext = inject(formItemProviderKey)
    inject(formProviderKey)
    const props = __props
    const emit = __emit
    const slots = useSlots()
    useAttrs()
    const bem = createNamespace('input')
    const inputRef = ref()
    const inputValue = useModel(props, 'modelValue')
    watchEffect(async () => {
      if (formItemContext && !isEmpty(inputValue.value)) {
        try {
          await formItemContext.validate('change')
        }
        catch (error) {
          emit('error', error)
        }
      }
    })
    const showPassword = ref(false)
    function toggleShowPassword() {
      showPassword.value = !showPassword.value
    }
    const showPwdVisible = computed(() => {
      return props.type === 'password' && !props.readonly && !props.disabled && slots.suffix === undefined
    })
    const showClearable = computed(() => {
      return !props.disabled && !props.readonly && !!inputValue.value && props.clearable
    })
    const nativeType = computed(() => {
      if (props.type === 'password' && showPassword.value) {
        return 'text'
      }
      return props.type
    })
    function emitInput(e) {
      emit('input', inputValue.value)
    }
    function emitChange(e) {
      emit('change', inputValue.value)
    }
    function emitFocus(e) {
      emit('focus', e)
    }
    async function emitBlur(e) {
      if (formItemContext) {
        try {
          await formItemContext.validate('blur')
        }
        catch (error) {
          emit('error', error)
        }
      }
      emit('blur', e)
    }
    function emitKeydown(e) {
      emit('keydown', e)
    }
    async function focus() {
      let _a
      if (props.disabled)
        return
      if (props.readonly)
        return
      if (!inputRef.value)
        return
      await nextTick();
      (_a = inputRef.value) == null ? undefined : _a.focus()
    }
    function blur() {
      let _a;
      (_a = inputRef.value) == null ? undefined : _a.blur()
    }
    function select() {
      let _a;
      (_a = inputRef.value) == null ? undefined : _a.select()
    }
    function clear() {
      inputValue.value = ''
      emit('input', inputValue.value)
      emit('update:modelValue', '')
      emit('change', '')
      nextTick(() => {
        let _a;
        (_a = inputRef.value) == null ? undefined : _a.focus()
      })
    }
    function scrollTo() {
      let _a;
      (_a = inputRef.value) == null ? undefined : _a.scrollIntoView()
    }
    __expose({
      focus,
      blur,
      select,
      clear,
      scrollTo,
    })
    return (_ctx, _cache) => {
      const _component_JvIcon = resolveComponent('JvIcon')
      return openBlock(), createElementBlock(
        'div',
        {
          class: normalizeClass(unref(bem).b()),
        },
        [
          _ctx.$slots.prepend ? (openBlock(), createElementBlock(
            'div',
            {
              key: 0,
              class: normalizeClass(unref(bem).be('group', 'prepend')),
            },
            [
              renderSlot(_ctx.$slots, 'prepend'),
            ],
            2,
            /* CLASS */
          )) : createCommentVNode('v-if', true),
          createElementVNode(
            'div',
            {
              class: normalizeClass([unref(bem).e('wrapper')]),
            },
            [
              _ctx.$slots.prefix ? (openBlock(), createElementBlock(
                'span',
                {
                  key: 0,
                  class: normalizeClass(unref(bem).e('prefix')),
                },
                [
                  renderSlot(_ctx.$slots, 'prefix'),
                ],
                2,
                /* CLASS */
              )) : createCommentVNode('v-if', true),
              withDirectives(createElementVNode('input', mergeProps(_ctx.$attrs, {
                'ref_key': 'inputRef',
                'ref': inputRef,
                'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => isRef(inputValue) ? inputValue.value = $event : null),
                'type': nativeType.value,
                'class': unref(bem).e('inner'),
                'placeholder': _ctx.placeholder,
                'disabled': _ctx.disabled,
                'readonly': _ctx.readonly,
                'onInput': emitInput,
                'onFocus': emitFocus,
                'onBlur': emitBlur,
                'onChange': emitChange,
                'onKeydown': emitKeydown,
              }), null, 16, _hoisted_1), [
                [vModelDynamic, unref(inputValue)],
              ]),
              showClearable.value ? (openBlock(), createElementBlock(
                'span',
                {
                  key: 1,
                  class: normalizeClass(unref(bem).e('clear')),
                  onClick: clear,
                },
                [
                  createVNode(_component_JvIcon, { size: _ctx.size }, {
                    default: withCtx(() => [
                      createVNode(unref(IconCloseThick)),
                    ]),
                    _: 1,
                    /* STABLE */
                  }, 8, ['size']),
                ],
                2,
                /* CLASS */
              )) : createCommentVNode('v-if', true),
              showPwdVisible.value ? (openBlock(), createElementBlock(
                'span',
                {
                  key: 2,
                  class: normalizeClass(unref(bem).e('toggle')),
                  onClick: toggleShowPassword,
                },
                [
                  createVNode(_component_JvIcon, { size: _ctx.size }, {
                    default: withCtx(() => [
                      showPassword.value ? (openBlock(), createBlock(unref(IconEyeOff), { key: 0 })) : (openBlock(), createBlock(unref(IconEyeOn), { key: 1 })),
                    ]),
                    _: 1,
                    /* STABLE */
                  }, 8, ['size']),
                ],
                2,
                /* CLASS */
              )) : createCommentVNode('v-if', true),
              _ctx.$slots.suffix ? (openBlock(), createElementBlock(
                'span',
                {
                  key: 3,
                  class: normalizeClass(unref(bem).e('suffix')),
                },
                [
                  renderSlot(_ctx.$slots, 'suffix'),
                ],
                2,
                /* CLASS */
              )) : createCommentVNode('v-if', true),
            ],
            2,
            /* CLASS */
          ),
          _ctx.$slots.append ? (openBlock(), createElementBlock(
            'div',
            {
              key: 1,
              class: normalizeClass(unref(bem).be('group', 'append')),
            },
            [
              renderSlot(_ctx.$slots, 'append'),
            ],
            2,
            /* CLASS */
          )) : createCommentVNode('v-if', true),
        ],
        2,
        /* CLASS */
      )
    }
  },
})

export { _sfc_main as default }
// # sourceMappingURL=input.vue2.mjs.map
