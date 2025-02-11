<script setup lang="ts">
import type { CodeProps } from './types'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import { onMounted, ref } from 'vue'
import 'highlight.js/styles/github.css'
import '../style/jv-code.css'

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
    class="jv-code"
    :class="[
      `jv-code--${type}`,
      { 'jv-code--collapsed': isCollapsed },
    ]"
    :style="{
      fontSize: `${fontSize}px`,
      color,
    }"
  >
    <div v-if="type === 'block'" class="jv-code-header">
      <div class="jv-code-header-left">
        <button
          v-if="collapsible"
          class="jv-code-collapse"
          @click="isCollapsed = !isCollapsed"
        >
          {{ isCollapsed ? '▶' : '▼' }}
        </button>
        <span v-if="title" class="jv-code-title">{{ title }}</span>
      </div>
      <div class="jv-code-header-right">
        <span v-if="language" class="jv-code-lang">{{ language }}</span>
        <button class="jv-code-copy" @click="copyCode">
          ⎘
        </button>
      </div>
    </div>
    <pre v-show="!isCollapsed" class="jv-code-content" :class="`language-${language}`">
      <code ref="codeRef">
        <slot />
      </code>
    </pre>
  </div>
</template>
