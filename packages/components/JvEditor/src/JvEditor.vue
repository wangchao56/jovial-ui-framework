<script setup lang="ts">
import type { ExposeParam } from 'md-editor-v3'
import { createNamespace } from '@jienix/utils'
import { config, MdEditor, XSSPlugin } from 'md-editor-v3'
// import sanitizeHtml from 'sanitize-html'
import { editorEmits, editorProps } from './JvEditor'
import 'md-editor-v3/lib/style.css'

defineOptions({ name: 'JvEditor' })
defineProps(editorProps)
defineEmits(editorEmits)
config({
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      {
        type: 'xss',
        plugin: XSSPlugin,
        options: {},
      },
    ]
  },
})
const bem = createNamespace('editor')
const editorRef = ref<ExposeParam>()
const text = ref('# Hello Editor')
// function sanitize(html: any) {
//   return sanitizeHtml(html)
// }

onMounted(() => {
  // eslint-disable-next-line no-console
  console.log()
})
</script>

<template>
  <div :class="bem.b()">
    <MdEditor ref="editorRef" v-model="text" />
  </div>
</template>
