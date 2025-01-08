'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')

const _sfc_main = vue.defineComponent({
  name: 'JvUpload',
  setup() {
    const files = vue.ref([])
    const uploadProgress = vue.ref(null)
    const fileInput = vue.ref(null)
    vue.watchEffect(() => {
      console.log(files.value)
    })
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (event) => {
      const target = event.target
      if (target.files) {
        Array.from(target.files).forEach((file) => {
          files.value.push(file)
        })
      }
    }
    const handleDrop = (event) => {
      let _a
      if ((_a = event.dataTransfer) == null ? undefined : _a.files) {
        Array.from(event.dataTransfer.files).forEach((file) => {
          files.value.push(file)
        })
      }
    }
    const removeFile = (index) => {
      files.value.splice(index, 1)
    }
    const uploadFiles = async () => {
      uploadProgress.value = 0
      const formData = new FormData()
      files.value.forEach((file) => {
        formData.append('files[]', file)
      })
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
      alert('\u6587\u4EF6\u4E0A\u4F20\u6210\u529F\uFF01')
      files.value = []
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

exports.default = _sfc_main
// # sourceMappingURL=upload.vue2.cjs.map
