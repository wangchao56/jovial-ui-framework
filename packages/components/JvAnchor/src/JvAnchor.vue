<script setup lang="ts">
import type { AnchorLinkItem, JvAnchorEmits } from './JvAnchor'
import { createNamespace } from '@jienix/utils'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { jvAnchorProps } from './JvAnchor'

defineOptions({ name: 'JvAnchor', inheritAttrs: false })

const { container, offsetTop, affix, targetOffset } = defineProps(jvAnchorProps)
const emit = defineEmits<JvAnchorEmits>()
const bem = createNamespace('anchor')

// 当前激活的锚点
const activeKey = ref('')
// 锚点列表
const links = ref<AnchorLinkItem[]>([])
// 滚动容器
const scrollContainer = ref<Window | HTMLElement>()

// 初始化滚动容器
function initScrollContainer() {
  if (container === 'window') {
    scrollContainer.value = window
  }
  else {
    const el = document.querySelector(container)
    if (el) {
      scrollContainer.value = el as HTMLElement
    }
  }
}

// 滚动到指定位置
function scrollTo(key: string) {
  const target = document.querySelector(`[data-anchor="${key}"]`)
  if (target && scrollContainer.value) {
    const top = target.getBoundingClientRect().top
      + (scrollContainer.value instanceof Window ? window.pageYOffset : scrollContainer.value.scrollTop)
      - targetOffset

    if (scrollContainer.value instanceof Window) {
      window.scrollTo({ top, behavior: 'smooth' })
    }
    else {
      scrollContainer.value.scrollTo({ top, behavior: 'smooth' })
    }
  }
}

// 点击锚点
function handleClick(e: MouseEvent, link: AnchorLinkItem) {
  e.preventDefault()
  activeKey.value = link.key
  emit('click', e, link)
  emit('update:activeKey', link.key)
  emit('change', link.key)
  scrollTo(link.key)
}

// 检查当前激活的锚点
function checkActiveLink() {
  if (!scrollContainer.value || links.value.length === 0)
    return

  // eslint-disable-next-line unused-imports/no-unused-vars
  const scrollTop = scrollContainer.value instanceof Window
    ? window.pageYOffset
    : scrollContainer.value.scrollTop

  for (const link of links.value) {
    const target = document.querySelector(`[data-anchor="${link.key}"]`)
    if (target) {
      const { top } = target.getBoundingClientRect()
      if (top <= targetOffset + 10 && top > -10) {
        if (activeKey.value !== link.key) {
          activeKey.value = link.key
          emit('update:activeKey', link.key)
          emit('change', link.key)
        }
        break
      }
    }
  }
}

// 监听滚动事件
function handleScroll() {
  requestAnimationFrame(checkActiveLink)
}

// 暴露方法
defineExpose({
  scrollTo,
})

onMounted(() => {
  initScrollContainer()
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div
    :class="bem.b()" :style="{
      position: affix ? 'fixed' : 'static',
      top: affix ? `${offsetTop}px` : 'auto',
    }"
  >
    <div :class="bem.e('wrapper')">
      <div :class="bem.e('link-list')">
        <template v-for="link in links" :key="link.key">
          <div
            :class="[
              bem.e('link'),
              bem.is('active', activeKey === link.key),
            ]" @click="(e) => handleClick(e, link)"
          >
            {{ link.title }}
          </div>
          <template v-if="link.children">
            <div
              v-for="child in link.children" :key="child.key" :class="[
                bem.e('link'),
                bem.is('sub', true),
                bem.is('active', activeKey === child.key),
              ]" @click="(e) => handleClick(e, child)"
            >
              {{ child.title }}
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
