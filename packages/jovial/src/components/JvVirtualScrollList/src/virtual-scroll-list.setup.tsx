import type { Options } from '@better-scroll/core'
import type { Component } from 'vue'
import type { RangeOptions, ScrollToOptions } from './props'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import { createNamespace } from '@jovial/utils'
import { defineComponent } from 'vue'
import { virtualProps } from './props'
import { initVirtual } from './virtual'
import JvVirtualItem from './virtual-item.setup'

// 使用插件
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
export default defineComponent({
  name: 'jv-virtual-scroll-list',
  props: virtualProps,
  components: {
    VirtualItemSetup: JvVirtualItem,
  },
  emits: ['scroll'],
  setup(props, { expose }) {
    const bem = createNamespace('virtual-scroll-list')
    const range = ref<RangeOptions | null>(null)
    const rootDomRef = ref<HTMLElement | null>(null)
    const bscrollRef = ref<BScroll | null>(null)

    /**
     * 更新当前范围值
     *
     * @param newRange 新的范围选项
     */
    const update = (newRange: RangeOptions) => {
      range.value = newRange
    }
    const bscrollOptions: Options = {
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
    /**
     * 初始化滚动组件
     */
    function initScroll() {
      bscrollRef.value = new BScroll(rootDomRef.value!, bscrollOptions)
      bscrollRef.value.on('scroll', handleScroll)
    }
    // 从数据源获取唯一键数组
    const getUniqueKeyFormDataSource = (): string[] => {
      const { dataSource, dataKey } = props
      return dataSource
        .map(source => source[dataKey as string])
        .filter(Boolean)
    }

    let virtual: ReturnType<typeof initVirtual> | null = null
    // 安装虚拟列表
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
    // 生成渲染组件
    function genRenderComponent() {
      const slots: Component[] = []

      if (!virtual)
        return <div>暂无数据</div>

      const { start, end } = range.value!
      const { dataSource, dataComponent, isDynamic, dataKey } = props
      if (!dataSource) {
        return <div>暂无数据</div>
      }

      if (!dataComponent) {
        return <div>暂无数据</div>
      }
      for (let i = start; i <= end; i++) {
        const source = dataSource[i]
        const uniqueKey = source[dataKey as string]
        if (!source)
          continue

        if (isDynamic) {
          slots.push(
            <JvVirtualItem
              class="scroll-item"
              key={uniqueKey}
              source={source}
              component={dataComponent}
              uniqueKey={String(uniqueKey)}
              estimateSize={props.estimateSize}
              index={i}
              onItemResize={virtual.handleResize}
            />,
          )
          continue
        }
        else {
          slots.push(
            <dataComponent key={uniqueKey} source={{ ...source, index: i }} />,
          )
        }
      }

      return slots
    }
    /** 滚动事件处理 */
    function handleScroll(params: { x: number, y: number }) {
      // console.log('scrolling-', params)
      if (!virtual)
        return
      const offsetTop = params.y > 0 ? 0 : Math.abs(params.y)
      virtual.handleScroll(offsetTop)
    }

    // 初始化滚动
    onBeforeMount(() => {
      // 挂载之前，计算出可视区域的高度和列表项的高度
      installVirtual()
    })
    onMounted(() => {
      initScroll()
    })
    onUnmounted(() => {
      bscrollRef.value?.off('scroll', handleScroll)
      bscrollRef.value?.destroy()
    })

    const handleScrollTo = (options: ScrollToOptions) => {
      // console.log('scrollTo', options)

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
          options.position === 'top' ? 0 : bscrollRef.value!.maxScrollY,
        )
        return
      }

      if (keys.includes('index') && options.index !== undefined) {
        // bscrollRef.value.scrollToElement(
        //   `div[data-index='${options.index}']`,
        //   300,
        //   0,
        //   0
        // )
        if (!virtual)
          return
        bscrollRef.value.scrollTo(0, -options.index * props.estimateSize)
        virtual.handleScroll(options.index * props.estimateSize)
        return
      }

      if (keys.includes('key')) {
        const index = props.dataSource!.findIndex(
          item => item[props.dataKey as string] === options.key,
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
      // 默认情况下显示30个列表项，其它的用空白填充 给内部盒子一个非常高的高度 + transform:translateY(-高度)
      // 虚拟列表的实现思路：
      // 1. 确定可视区域的高度
      // 2. 根据可视区域的高度和列表项的高度计算出，可视区域可以完全显示的列表项个数
      // 3. 根据可视区域的起始索引和结束索引，截取数组中对应的元素渲染到页面上
      // 用padding撑开高度
      const { padFront, padBehind } = range.value!

      const paddingStyle = {
        padding: `${padFront}px 0 ${padBehind}px 0`,
      }

      return (
        <section class={[bem.b(), 'core-container']}>
          <div
            class={[bem.e('wrapper'), 'scroll-wrapper']}
            // onScroll={handleScroll}
            ref={rootDomRef}
          >
            <div class={[bem.e('content')]} style={paddingStyle}>
              {genRenderComponent()}
            </div>
          </div>
        </section>
      )
    }
  },
})
