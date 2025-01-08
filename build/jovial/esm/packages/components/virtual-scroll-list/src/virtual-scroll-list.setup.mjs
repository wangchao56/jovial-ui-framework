import { defineComponent } from 'vue'
import BScroll from '../../../../node_modules/.pnpm/@better-scroll_core@2.5.1/node_modules/@better-scroll/core/dist/core.esm.mjs'
import MouseWheel from '../../../../node_modules/.pnpm/@better-scroll_mouse-wheel@2.5.1/node_modules/@better-scroll/mouse-wheel/dist/mouse-wheel.esm.mjs'
import ScrollBar from '../../../../node_modules/.pnpm/@better-scroll_scroll-bar@2.5.1/node_modules/@better-scroll/scroll-bar/dist/scroll-bar.esm.mjs'
import { createNamespace } from '../../../utils/create.mjs'
import { virtualProps } from './props.mjs'
import JvVirtualItem from './virtual-item.setup.mjs'
import { initVirtual } from './virtual.mjs'

BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
const _VirtualScrollList = defineComponent({
  name: 'jv-virtual-scroll-list',
  props: virtualProps,
  components: {
    VirtualItemSetup: JvVirtualItem,
  },
  emits: ['scroll'],
  setup(props, { expose, slots }) {
    const bem = createNamespace('virtual-scroll-list')
    const range = ref(null)
    const rootDomRef = ref(null)
    const bscrollRef = ref(null)
    const update = (newRange) => {
      range.value = newRange
    }
    const bscrollOptions = {
      probeType: 3,
      scrollY: true,
      scrollbar: {
        fade: false,
        interactive: true,
        scrollbarTrackClickable: true,
      },
      mouseWheel: {
        speed: 10,
        invert: false,
        easeTime: 300,
      },
    }
    function initScroll() {
      bscrollRef.value = new BScroll(rootDomRef.value, bscrollOptions)
      bscrollRef.value.on('scroll', handleScroll)
    }
    const getUniqueKeyFormDataSource = () => {
      const { dataSource, dataKey } = props
      return dataSource.map(source => source[dataKey]).filter(Boolean)
    }
    let virtual = null
    const installVirtual = () => {
      virtual = initVirtual(
        {
          keeps: props.keeps,
          buffer: 1,
          uniqueIds: getUniqueKeyFormDataSource(),
          estimateSize: props.estimateSize,
        },
        update,
      )
    }
    function genRenderComponent() {
      const slots2 = []
      if (!virtual)
        return /* @__PURE__ */ React.createElement('div', null, '\u6682\u65E0\u6570\u636E')
      const { start, end } = range.value
      const { dataSource, dataComponent, isDynamic, dataKey } = props
      if (!dataSource) {
        return /* @__PURE__ */ React.createElement('div', null, '\u6682\u65E0\u6570\u636E')
      }
      if (!dataComponent) {
        return /* @__PURE__ */ React.createElement('div', null, '\u6682\u65E0\u6570\u636E')
      }
      for (let i = start; i <= end; i++) {
        const source = dataSource[i]
        const uniqueKey = source[dataKey]
        if (!source)
          continue
        if (isDynamic) {
          slots2.push(
            /* @__PURE__ */ React.createElement(
              JvVirtualItem,
              {
                class: 'scroll-item',
                key: uniqueKey,
                source,
                component: dataComponent,
                uniqueKey: String(uniqueKey),
                estimateSize: props.estimateSize,
                index: i,
                onItemResize: virtual.handleResize,
              },
            ),
          )
          continue
        }
        else {
          slots2.push(
            /* @__PURE__ */ React.createElement('dataComponent', { key: uniqueKey, source: { ...source, index: i } }),
          )
        }
      }
      return slots2
    }
    function handleScroll(params) {
      console.log('scrolling-', params)
      if (!virtual)
        return
      const offsetTop = params.y > 0 ? 0 : Math.abs(params.y)
      virtual.handleScroll(offsetTop)
    }
    onBeforeMount(() => {
      installVirtual()
    })
    onMounted(() => {
      initScroll()
    })
    onUnmounted(() => {
      let _a, _b;
      (_a = bscrollRef.value) == null ? undefined : _a.off('scroll', handleScroll);
      (_b = bscrollRef.value) == null ? undefined : _b.destroy()
    })
    const handleScrollTo = (options) => {
      console.log('scrollTo', options)
      if (!bscrollRef.value) {
        return
      }
      const keys = Object.keys(options)
      if (keys.includes('x') || keys.includes('y')) {
        bscrollRef.value.scrollTo(options.x || 0, options.y || 0)
        return
      }
      if (keys.includes('position')) {
        bscrollRef.value.scrollTo(
          0,
          options.position === 'top' ? 0 : bscrollRef.value.maxScrollY,
        )
        return
      }
      if (keys.includes('index') && options.index !== undefined) {
        if (!virtual)
          return
        bscrollRef.value.scrollTo(0, -options.index * props.estimateSize)
        virtual.handleScroll(options.index * props.estimateSize)
        return
      }
      if (keys.includes('key')) {
        const index = props.dataSource.findIndex(
          item => item[props.dataKey] === options.key,
        )
        bscrollRef.value.scrollTo(0, -index * props.estimateSize)
        return
      }
      if (keys.includes('left') || keys.includes('top')) {
        bscrollRef.value.scrollTo(
          options.left || 0,
          -Math.abs(options.top || 0),
        )
        if (!virtual)
          return
        virtual.handleScroll(Math.abs(options.top || 0))
      }
    }
    expose({
      scrollTo: handleScrollTo,
    })
    return () => {
      const { start, end, padFront, padBehind } = range.value
      const paddingStyle = {
        padding: `${padFront}px 0 ${padBehind}px 0`,
      }
      return /* @__PURE__ */ React.createElement('section', { class: [bem.b(), 'core-container'] }, /* @__PURE__ */ React.createElement(
        'div',
        {
          class: [bem.e('wrapper'), 'scroll-wrapper'],
          ref: rootDomRef,
        },
        /* @__PURE__ */ React.createElement('div', { class: [bem.e('content')], style: paddingStyle }, genRenderComponent()),
      ))
    }
  },
})

export { _VirtualScrollList as default }
// # sourceMappingURL=virtual-scroll-list.setup.mjs.map
