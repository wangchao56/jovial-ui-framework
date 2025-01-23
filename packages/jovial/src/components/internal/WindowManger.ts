// 使用shallowReactive 避免监听不到实例的变化
const instances: {
  id: string
  vnode: VNode
  container: HTMLElement
  position: string
  verticalOffset: number
}[] = shallowReactive([])
let renderflag = true

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      console.log('通知不可见')
      if (renderflag) {
        renderflag = false
        const vnodes = instances.map(item => item.vnode)
        // 设置通知的禁用状态
        vnodes.forEach((vnode) => {
          vnode.component?.exposed?.setDisabled(true)
        })

        const scrollBox = createVNode(JvScrollBox, {
          scrollMode: {
            vertical: true,
            horizontal: false,
          },
          width: 'max-content',
          height: '100vh',
          style: {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 9999,
          },
        }, vnodes)
        const container = document.createElement('div')
        container.id = 'scroll-box'
        const app = createApp(scrollBox)
        app.mount(container)
        document.body.appendChild(container)
        observer.disconnect()
      }
    }
  })
}, {
  threshold: 0.5, // 当50%的内容不可见时触发
  root: null, // 相对于视口
})

// 监听实例变化
watch(instances, (newInstances) => {
  // 清理所有观察
  observer.disconnect()

  // 重新观察所有实例
  newInstances.forEach((instance) => {
    const el = document.getElementById(instance.id)
    if (el) {
      observer.observe(el)
    }
  })
}, { deep: true })
