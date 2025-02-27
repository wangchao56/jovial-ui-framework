<script setup lang="ts">
import type { AnchorLinkItem, JvAnchorEmits } from './JvAnchor.js'
import { createNamespace } from '@jovial/utils'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { jvAnchorProps } from './JvAnchor.js'
import '../style/style.css'

defineOptions({ name: 'JvAnchor' })

const props = defineProps(jvAnchorProps)
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
  if (props.container === 'window') {
    scrollContainer.value = window
  }
  else {
    const el = document.querySelector(props.container)
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
      - props.targetOffset

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
      if (top <= props.targetOffset + 10 && top > -10) {
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
    :class="bem.b()"
    :style="{
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
            ]"
            @click="(e) => handleClick(e, link)"
          >
            {{ link.title }}
          </div>
          <template v-if="link.children">
            <div
              v-for="child in link.children"
              :key="child.key"
              :class="[
                bem.e('link'),
                bem.is('sub', true),
                bem.is('active', activeKey === child.key),
              ]"
              @click="(e) => handleClick(e, child)"
            >
              {{ child.title }}
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.jv-anchor {
  width: 100%;
  z-index: 100;
}

.jv-anchor__wrapper {
  padding: 16px 0;
}

.jv-anchor__link-list {
  display: flex;
  flex-direction: column;
}

.jv-anchor__link {
  padding: 4px 0 4px 16px;
  color: #333;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.3s;
}

.jv-anchor__link:hover {
  color: #1890ff;
}

.jv-anchor__link--active {
  color: #1890ff;
  background-color: #e6f7ff;
  border-right: 2px solid #1890ff;
}

.jv-anchor__link--sub {
  padding-left: 32px;
}
</style>
