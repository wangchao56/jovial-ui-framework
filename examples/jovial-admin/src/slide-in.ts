import type { Directive } from 'vue'

const trask = new WeakMap<Element, Animation>()

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { // 元素进入视口
      const animation = trask.get(entry.target)
      if (animation) {
        animation.play()
        observer.unobserve(entry.target)
      }
    }
    else { // 元素离开视口
      const animation = trask.get(entry.target)
      if (animation) {
        animation.cancel()
      }
    }
  })
})
const animationConfig = {
  duration: 500, // 动画持续时间
  easing: 'ease-in', // 动画缓动函数
}
const slideInDirective: Directive = {
  mounted(el: Element, binding: DirectiveBinding<number | KeyframeAnimationOptions>) {
    // 开始时元素在视口内
    if (el.getBoundingClientRect().top < window.innerHeight) {
      return
    }
    const { value } = binding
    if (typeof value === 'number') {
      animationConfig.duration = value
    }
    const options = Object.assign({}, animationConfig, value)
    const animation = el.animate([{
      transform: 'translateY(100%)',
      opacity: '0',
    }, {
      transform: 'translateY(0)',
      opacity: '1',
    }], options)
    animation.pause()
    trask.set(el, animation)
    observer.observe(el)
  },
  unmounted(el) {
    const animation = trask.get(el)
    if (animation) {
      animation.cancel()
      trask.delete(el)
    }
    observer.unobserve(el) // 移除观察
  },
}

export default slideInDirective
