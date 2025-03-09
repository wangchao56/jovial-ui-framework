<script setup lang="ts">
import type { CodeProps } from './types'
import { createNamespace } from '@jienix/utils'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import { onMounted, ref } from 'vue'
import 'highlight.js/styles/github.css'

defineOptions({
  name: 'JvCode',
})
const props = withDefaults(defineProps<CodeProps>(), {
  type: 'block',
  collapsible: false,
  defaultCollapsed: false,
  fontSize: 14,
  color: 'var(--jv-color-text)',
})
const bem = createNamespace('code')
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)

const codeRef = ref<HTMLElement>()
const isCollapsed = ref(props.defaultCollapsed)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(codeRef.value?.textContent || '')
    // 这里可以添加复制成功的反馈提示
  }
  catch (err) {
    console.error('Failed to copy code:', err)
  }
}

onMounted(() => {
  if (codeRef.value) {
    hljs.highlightElement(codeRef.value)
  }
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(type),
      ...(collapsible ? [bem.m('collapsible')] : []),
    ]"
    :style="{
      fontSize: `${fontSize}px`,
      color,
    }"
  >
    <div v-if="type === 'block'" :class="bem.e('header')">
      <div :class="bem.em('header', 'left')">
        <button
          v-if="collapsible"
          :class="bem.e('collapse')"
          @click="isCollapsed = !isCollapsed"
        >
          {{ isCollapsed ? '▶' : '▼' }}
        </button>
        <span v-if="title" :class="bem.e('title')">{{ title }}</span>
      </div>
      <div :class="bem.em('header', 'right')">
        <span v-if="language" :class="bem.e('lang')">{{ language }}</span>
        <button :class="bem.e('copy')" @click="copyCode">
          ⎘
        </button>
      </div>
    </div>
    <pre v-show="!isCollapsed" :class="[bem.e('content'), `language-${language}`]">
      <code ref="codeRef">
        <slot />
      </code>
    </pre>
  </div>
</template>
