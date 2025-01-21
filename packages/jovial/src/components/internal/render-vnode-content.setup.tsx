/**
 * 主要改进：
添加了更详细的类型定义：
RenderFunction 类型定义渲染函数
RenderContent 类型定义所有可能的渲染内容
添加了新的 props：
params 属性用于传递渲染函数的参数
增强了错误处理：
使用 try-catch 包裹渲染逻辑
在出错时输出错误信息并返回 null
改进了类型检查：
使用更精确的类型定义
添加了 PropType 类型注解
添加了注释：
为组件和属性添加了 JSDoc 注释
为主要逻辑添加了说明性注释
 */

import type { PropType } from 'vue'
import type { RenderContent } from './types'
import { createTextVNode, defineComponent, isVNode } from 'vue'

export default defineComponent({
  name: 'JvRenderVNodeContent',
  props: {
    /** 要渲染的内容 */
    render: {
      type: [String, Object, Function] as PropType<RenderContent>,
      default: undefined,
    },
    /** 渲染函数的参数 */
    params: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    return () => {
      try {
        // 优先使用默认插槽
        if (slots.default) {
          return slots.default()
        }

        const { render, params } = props

        // 处理不同类型的渲染内容
        if (render) {
          // 如果是函数，使用提供的参数调用
          if (typeof render === 'function') {
            return render(...params)
          }
          // 如果是 VNode，直接返回
          else if (isVNode(render)) {
            return render
          }
          // 如果是字符串，返回文本节点
          else if (typeof render === 'string') {
            return createTextVNode(render)
          }
        }

        // 如果没有有效的渲染内容，返回 null
        return null
      }
      catch (error) {
        console.error('Error in JvRenderVNodeContent:', error)
        return null
      }
    }
  },
})
