<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'JvUpload',
  setup() {
    const files = ref<File[]>([])
    const uploadProgress = ref<number | null>(null)
    const fileInput = ref<HTMLInputElement | null>(null)
    // watchEffect(() => {
    //   // console.log(files.value)
    // })

    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        Array.from(target.files).forEach((file) => {
          files.value.push(file)
        })
      }
    }

    const handleDrop = (event: DragEvent) => {
      if (event.dataTransfer?.files) {
        Array.from(event.dataTransfer.files).forEach((file) => {
          files.value.push(file)
        })
      }
    }

    const removeFile = (index: number) => {
      files.value.splice(index, 1)
    }

    const uploadFiles = async () => {
      uploadProgress.value = 0
      const formData = new FormData()

      files.value.forEach((file) => {
        formData.append('files[]', file)
      })

      // 这里是模拟一个上传过程，你应该替换为实际的上传接口
      const fakeUpload = new Promise((resolve) => {
        const interval = setInterval(() => {
          uploadProgress.value += 10
          if (uploadProgress.value >= 100) {
            clearInterval(interval)
            resolve(true)
          }
        }, 100)
      })

      await fakeUpload
      uploadProgress.value = null
      // alert('文件上传成功！')
      files.value = [] // 清除已上传的文件
    }

    return {
      files,
      uploadProgress,
      triggerFileInput,
      handleFileChange,
      handleDrop,
      removeFile,
      uploadFiles,
      fileInput,
    }
  },
})
</script>

<template>
  <div class="file-upload" @dragover.prevent @drop.prevent="handleDrop">
    <input
      ref="fileInput"
      type="file"
      multiple
      webkitdirectory
      directory
      style="display: none"
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

<style scoped>
.file-upload {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}
.file-upload span {
  display: block;
  margin: 10px 0;
  cursor: pointer;
  color: #007bff;
}
</style>
