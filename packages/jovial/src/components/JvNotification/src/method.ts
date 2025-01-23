import type { JvNotificationProps } from './JvNotification'
import { useZIndex } from '@/composables'
import { createVNode, render, type VNode } from 'vue'
import JvNotification from './JvNotification.vue'

let seed = 1
const GAP = 16 // 通知之间的间距
// 使用shallowReactive 避免监听不到实例的变化
const instances: {
  id: string
  props: JvNotificationProps
  vnode: VNode
  container: HTMLElement
  position: string
  verticalOffset: number
}[] = shallowReactive([])

// 获取相同位置的通知
function getInstancesByPosition(position: string) {
  return instances.filter(item => item.position === position)
}

// 计算新通知的垂直偏移
function getVerticalOffset(position: string) {
  const samePositionInstances = getInstancesByPosition(position)
  if (!samePositionInstances.length)
    return GAP
  const lastInstance = samePositionInstances.at(-1)
  if (!lastInstance)
    return GAP

  const lastInstanceHeight = document.getElementById(lastInstance.id)?.getBoundingClientRect().height
  if (!lastInstanceHeight)
    return GAP
  return lastInstance.verticalOffset + lastInstanceHeight + GAP
}

// 更新位置
function updatePosition(position: string) {
  const samePositionInstances = getInstancesByPosition(position)
  let verticalOffset = GAP
  samePositionInstances.forEach((instance) => {
    const el = document.getElementById(instance.id)
    if (!el)
      return

    instance.verticalOffset = verticalOffset
    verticalOffset += el.getBoundingClientRect().height + GAP
    // 更新样式
    const position = instance.position.split('-')
    const property = position[0] as 'top' | 'bottom'
    el.style[property] = `${instance.verticalOffset}px`
  })
}

export function notify(options: JvNotificationProps) {
  const container = document.createElement('div')
  const id = `notification_${seed++}`
  container.id = `container_${id}`
  const { next: nextZIndex } = useZIndex()
  const position = options.position || 'top-right'
  const verticalOffset = getVerticalOffset(position)
  const defineOffset = [16, verticalOffset] // 默认偏移
  let finalOffset = options.offset || defineOffset
  // 内容是否重复
  const isRepeat = options.grouping
  if (isRepeat) {
    const repeatInstance = getInstancesByPosition(position).find(item => item.props.message === options.message)
    const repeatNum = getInstancesByPosition(position).filter(item => item.props.message === options.message).length

    if (repeatInstance) {
      finalOffset = [16, repeatInstance.verticalOffset]
      options.repeatNum = repeatNum + 1
    }
  }
  const props = {
    ...options,
    id,
    zIndex: nextZIndex(),
    position,
    visible: true,
    offset: finalOffset,
    onClose: () => {
      destroy(id, container)
      if (typeof options.onClose === 'function') {
        options.onClose()
      }
    },
  }
  // 执行指令
  const vnode = createVNode(JvNotification, props)
  render(vnode, container) // render是一个异步函数
  // 监听关闭事件
  nextTick(() => {
    if (container.firstElementChild) {
      document.body.appendChild(container.firstElementChild)
      // 保存实例
      instances.push({
        id,
        vnode,
        container,
        position,
        verticalOffset,
        props,
      })
    }
    else {
      console.warn('Failed to create notification element')
    }
  })

  updatePosition(position)
  return {
    close: () => {
      destroy(id, container)
    },
    closeAll,
  }
}

export async function closeAll() {
  instances.forEach(async (instance, idx) => {
    const result = await instance.vnode.component?.exposed?.beforeDestroy()
    if (!result)
      return
    render(null, instance.container)
    instance.container.remove()
    instances.splice(idx, 1)
  })
}

export async function destroy(id: string, container: HTMLElement) {
  const idx = instances.findIndex(i => i.id === id)
  if (idx === -1)
    return
  const instance = instances[idx]
  if (!instance)
    return
  const result = await instance.vnode.component?.exposed?.beforeDestroy()
  if (!result)
    return
  render(null, container)
  container.remove()
  instances.splice(idx, 1)
  updatePosition(instance.position)
}

// 便捷方法
export const notification = {
  info(message: string, options?: Partial<JvNotificationProps>) {
    return notify({ message, type: 'info', ...options })
  },
  success(message: string, options?: Partial<JvNotificationProps>) {
    return notify({ message, type: 'success', ...options })
  },
  warning(message: string, options?: Partial<JvNotificationProps>) {
    return notify({ message, type: 'warning', ...options })
  },
  error(message: string, options?: Partial<JvNotificationProps>) {
    return notify({ message, type: 'error', ...options })
  },
}
