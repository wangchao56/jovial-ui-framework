'use strict'

const vue = require('vue')
const core_esm = require('../../node_modules/.pnpm/@better-scroll_core@2.5.1/node_modules/@better-scroll/core/dist/core.esm.cjs')
const mouseWheel_esm = require('../../node_modules/.pnpm/@better-scroll_mouse-wheel@2.5.1/node_modules/@better-scroll/mouse-wheel/dist/mouse-wheel.esm.cjs')
const scrollBar_esm = require('../../node_modules/.pnpm/@better-scroll_scroll-bar@2.5.1/node_modules/@better-scroll/scroll-bar/dist/scroll-bar.esm.cjs')

core_esm.default.use(mouseWheel_esm.default)
core_esm.default.use(scrollBar_esm.default)
function useBScroll(wrapper, options) {
  const bscroll = vue.ref(null)
  vue.onMounted(() => {
    if (wrapper.value) {
      console.log(2)
      bscroll.value = new core_esm.default(wrapper.value, options)
    }
  })
  vue.onUnmounted(() => {
    if (bscroll.value) {
      bscroll.value.destroy()
    }
  })
  return {
    bscroll,
  }
}

exports.useBScroll = useBScroll
// # sourceMappingURL=useBScroll.cjs.map
