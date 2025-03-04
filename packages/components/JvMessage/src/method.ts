import type { ComponentInternalInstance } from 'vue'
import type { CreateMessageProps } from './JvMessage'
import { createVNode, render, shallowReactive } from 'vue'
import JvMessage from './JvMessage.vue'

export const messageInstances = shallowReactive<ComponentInternalInstance[]>([])
export function createMessage(props: CreateMessageProps) {
  const container = document.createElement('div')
  // 手动调用删除
  const manualDestory = (uid: number) => {
    const instance = messageInstances.find(instance => instance.uid === uid)
    if (instance && instance.exposed) {
      instance.exposed.visible.value = false
    }
  }
  const destory = () => {
    render(null, container)
  }
  const newProps = {
    ...props,
    closable: true,
    onDestory: destory,
  }
  const vnode = createVNode(JvMessage, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  return {
    uid: vnode.component!.uid,
    manualDestory,
  }
}

/** 获取最后一个实例 */
export function getLastInstance(uid: string | number) {
  const index = messageInstances.findIndex(instance => instance.uid === uid)
  if (index === -1)
    return null
  const current = messageInstances[index]
  const prev = index > 0 ? messageInstances[index - 1] : null
  return {
    current,
    prev,
  }
}

export function getPrevBottomOffset(uid?: string | number) {
  if (!uid)
    return 0
  const lastInstance = getLastInstance(uid)
  if (!lastInstance || !lastInstance.prev)
    return 0
  else
    return lastInstance.prev.exposed!.bottomOffset.value
}
