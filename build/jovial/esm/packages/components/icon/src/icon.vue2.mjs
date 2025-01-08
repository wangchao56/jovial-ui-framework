import { computed, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot } from 'vue'
import { SizeOptions } from '../../../../typings/index.mjs'
import { isNumberExcludeNaN, isString } from '../../../utils/common.mjs'
import { createNamespace } from '../../../utils/create.mjs'
import { iconProps } from './icon.mjs'

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvIcon' },
  __name: 'icon',
  props: iconProps,
  setup(__props) {
    const bem = createNamespace('icon')
    const props = __props
    const iconClass = computed(() => {
      const baseClass = bem.b()
      const sizeClass = isString(props.size) && props.size.toUpperCase() in SizeOptions ? bem.m(props.size) : ''
      return [baseClass, sizeClass].filter(Boolean)
    })
    const iconStyle = computed(() => {
      const result = {}
      if (props.color) {
        result.color = props.color
      }
      if (props.size || isNumberExcludeNaN(props.size)) {
        result.fontSize = `${props.size}px`
        result.lineHeight = `${props.size}px`
        result.width = `${props.size}px`
        result.maxHeight = `${props.size}px`
      }
      return result
    })
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        'i',
        {
          class: normalizeClass(iconClass.value),
          style: normalizeStyle(iconStyle.value),
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
// # sourceMappingURL=icon.vue2.mjs.map
