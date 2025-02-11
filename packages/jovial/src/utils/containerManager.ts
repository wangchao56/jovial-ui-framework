interface ContainerOptions {
  id?: string
  namespace?: string
  style?: Partial<CSSStyleDeclaration>
}

const containerStore = new Map<string, {
  element: HTMLElement
  refCount: number
  // observers: Set<MutationObserver>
}>()

// 添加 ID 生成函数
function generateContainerId(namespace: string) {
  return `jv-global-${namespace}`
}

export const containerManager = {
  getContainer(options: ContainerOptions = {}) {
    const {
      namespace = 'default',
      id = generateContainerId(namespace),
      style = {
        float: 'left',
        top: '0',
        left: '0',
        zIndex: '9999',
      },
    } = options

    const key = `${namespace}:${id}`
    if (!containerStore.has(key)) {
      const container = document.createElement('div')
      container.id = id
      Object.assign(container.style, style)

      // const observer = new MutationObserver((mutations) => {
      //   if (container.childElementCount === 0) {
      //     containerManager.releaseContainer(key)
      //   }
      // })
      // observer.observe(container, { childList: true })
      // 添加到body
      document.body.appendChild(container)
      containerStore.set(key, {
        element: container,
        refCount: 0,
      })
    }

    const record = containerStore.get(key)!
    record.refCount++

    return {
      element: record.element,
      release: () => containerManager.releaseContainer(key),
      appendContent: (content: Node) => {
        const wrapper = document.createElement('div')
        wrapper.style.display = 'contents'
        wrapper.appendChild(content)
        record.element.appendChild(wrapper)
        return wrapper
      },
    }
  },

  // 释放容器
  releaseContainer(key: string) {
    const record = containerStore.get(key)
    if (!record)
      return

    if (--record.refCount <= 0) {
      // record.observers.forEach(observer => observer.disconnect())
      record.element.remove()
      containerStore.delete(key)
    }
  },

  // 销毁所有容器
  destroyAll() {
    containerStore.forEach((record) => {
      // record.observers.forEach(observer => observer.disconnect())
      record.element.remove()
    })
    containerStore.clear()
  },
}

// Vue Composition API 封装
export function useContainerManager() {
  const containers = new Set<string>()

  onUnmounted(() => {
    containers.forEach(key => containerManager.releaseContainer(key))
    containers.clear()
  })

  return {
    getContainer: (options?: ContainerOptions) => {
      const { element, release, appendContent } = containerManager.getContainer(options)
      const key = `${options?.namespace || 'default'}:${element.id}`
      containers.add(key)

      return {
        element,
        appendContent,
        release: () => {
          release()
          containers.delete(key)
        },
      }
    },
  }
}
