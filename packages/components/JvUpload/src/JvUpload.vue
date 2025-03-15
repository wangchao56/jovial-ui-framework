<script setup lang="ts">
import type { JvUploadEmits, JvUploadSlots } from './JvUpload'
import { createNamespace } from '@jienix/utils'
import { ref } from 'vue'
import { jvUploadProps } from './JvUpload'

defineOptions({
  name: 'JvUpload',
  inheritAttrs: false,
})

defineProps(jvUploadProps)
const emit = defineEmits<JvUploadEmits>()
defineSlots<JvUploadSlots>()

const files = ref<File[]>([])
const uploadProgress = ref<number | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const bem = createNamespace('upload')
function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      files.value.push(file)
    })
  }
}

function handleDrop(event: DragEvent) {
  if (event.dataTransfer?.files) {
    Array.from(event.dataTransfer.files).forEach((file) => {
      files.value.push(file)
    })
  }
}

function removeFile(index: number) {
  files.value.splice(index, 1)
}

async function uploadFiles() {
  uploadProgress.value = 0
  const formData = new FormData()

  files.value.forEach((file) => {
    formData.append('files[]', file)
  })

  // 这里是模拟一个上传过程，你应该替换为实际的上传接口
  const fakeUpload = new Promise((resolve) => {
    const interval = setInterval(() => {
      uploadProgress.value = (uploadProgress.value ?? 0) + 10
      if (uploadProgress.value >= 100) {
        clearInterval(interval)
        resolve(true)
      }
    }, 100)
  })

  await fakeUpload
  uploadProgress.value = null
  emit('success', files.value)
  files.value = [] // 清除已上传的文件
}
</script>

<template>
  <div :class="bem.b()" @dragover.prevent @drop.prevent="handleDrop">
    <input
      v-show="false" ref="fileInput" type="file" :multiple="multiple" webkitdirectory directory
      @change="handleFileChange"
    >
    <button @click="triggerFileInput">
      选择文件
    </button>
    <span @click="triggerFileInput">或拖拽文件/文件夹到这里</span>

    <ul v-if="files.length">
      <li v-for="(file, index) in files" :key="index">
        {{ file.name }} <button @click="removeFile(index)">
          删除
        </button>
      </li>
    </ul>

    <button :disabled="files.length === 0" @click="uploadFiles">
      上传文件
    </button>

    <div v-if="uploadProgress !== null">
      上传进度: {{ uploadProgress }}%
    </div>
  </div>
</template>
