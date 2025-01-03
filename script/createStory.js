const fs = require('fs').promises
const path = require('path')
const capitalizeFirstLetter = require('./common').capitalizeFirstLetter
const createStructure = require('./common').createStructure
// 从命令行参数获取基本目录名称
const args = process.argv.slice(2)
const baseNameArg = args.find((arg) => arg.startsWith('--name='))
if (!baseNameArg) {
  console.error('Please provide the base name using --name=<baseDirectoryName>')
  process.exit(1)
}

const baseName = baseNameArg.split('=')[1]

const storyOutPath = path.join(__dirname, '..', 'play/src/components')

const structure = {
  [baseName]: {
    [`${baseName}.story.vue`]: `
    <script setup lang="ts">
    import Jv${capitalizeFirstLetter(baseName)} from '@jovial/components/${baseName}'
    import { ref, watchEffect } from 'vue'
    </script>
    <template>
      <Story title="${baseName}组件">
        <Variant title="Default">
          <jv-${baseName}></jv-${baseName}>
          <Jv${capitalizeFirstLetter(baseName)}></Jv${capitalizeFirstLetter(baseName)}>
        </Variant>
      </Story>
    </template>
    <docs lang="md"></docs>

    `
  }
}

createStructure(storyOutPath, structure)
