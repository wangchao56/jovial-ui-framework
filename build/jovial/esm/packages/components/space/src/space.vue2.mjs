import { computed, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref } from 'vue'
import { isArray, isNumber } from '../../../utils/common.mjs'
import { createNamespace } from '../../../utils/create.mjs'
import { spaceProps } from './space.mjs'

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvSpace' },
  __name: 'space',
  props: spaceProps,
  setup(__props) {
    const props = __props
    const bem = createNamespace('space')
    const spaceStyle = computed(() => {
      if (isNumber(props.size)) {
        return {
          '--space-size': `${props.size}px`,
        }
      }
      else if (isArray(props.size)) {
        return {
          '--space-size': props.size[0] ? `${props.size[0]}px` : 0,
          '--space-vertical-size': props.size[1] ? `${props.size[1]}px` : 0,
        }
      }
      switch (props.size) {
        case 'small':
          return { '--space-size': '8px' }
        case 'large':
          return { '--space-size': '24px' }
        case 'medium':
        default:
          return { '--space-size': '16px' }
      }
    })
    return (_ctx, _cache) => {
      let _a
      return openBlock(), createElementBlock(
        'div',
        {
          class: normalizeClass([
            unref(bem).b(),
            unref(bem).m(`align-${_ctx.align}`),
            unref(bem).m(`justify-${_ctx.justify}`),
            unref(bem).m((_a = _ctx.direction) != null ? _a : 'horizontal'),
            unref(bem).is('wrap', _ctx.wrap),
            unref(bem).is('inline', _ctx.inline),
            // 自定义类
          ]),
          style: normalizeStyle(spaceStyle.value),
        },
        [
          renderSlot(_ctx.$slots, 'default'),
        ],
        6,
        /* CLASS, STYLE */
      )
    }
  },
})

export { _sfc_main as default }
// # sourceMappingURL=space.vue2.mjs.map
