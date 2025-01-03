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
console.log('Base name:', baseName)

// 定义组件目录和样式目录路径
const outputPath = path.join(__dirname, '..', 'packages', 'components')
const styleDirName = path.join(
  __dirname,
  '..',
  'packages',
  'theme-chalk',
  'src'
)
const styleIndexFilePath = path.join(styleDirName, 'index.scss')

// 定义组件文件和样式文件内容
const fileContents = {
  [`${baseName}.ts`]: `
    export const ${baseName}Props = {} as const;
    export interface ${capitalizeFirstLetter(baseName)}Props {};
    export const ${baseName}Emits = {} as const;
    export type ${capitalizeFirstLetter(baseName)}Emits = {};
    export const ${baseName}Slots = {} as const;
    export type ${capitalizeFirstLetter(baseName)}Slots = {};
    export type ${capitalizeFirstLetter(baseName)}Expose = {};
  `,
  [`${baseName}.vue`]: `
    <template>
      <div :class="bem.b()"></div>
    </template>
    <script setup lang="ts">
    import { ref } from 'vue';
    import { createNamespace } from '@jovial/utils';
    import { ${baseName}Emits, ${baseName}Props } from './${baseName}';
    defineOptions({ name: 'Jv${capitalizeFirstLetter(baseName)}' });
    const props = defineProps(${baseName}Props);
    const emit = defineEmits(${baseName}Emits);
    const bem = createNamespace('${baseName}');
    </script>
  `
}

const styleFileContents = {
  [`${baseName}.scss`]: `
    @use 'mixins/mixins.scss' as *;
    @include b(${baseName}) {
      display: block;
    }
  `
}

// 定义目录结构
const structure = {
  [baseName]: {
    src: fileContents,
    'index.ts': `
      import _${capitalizeFirstLetter(baseName)} from './src/${baseName}.vue';
      import { withInstall } from '@jovial/utils';
      const ${baseName} = withInstall(_${capitalizeFirstLetter(baseName)});
      export * from './src/${baseName}';
      export default ${baseName}; 
      export type Jv${capitalizeFirstLetter(baseName)}Instance = InstanceType<typeof ${baseName}>
      export type {
        ${capitalizeFirstLetter(baseName)}Emits,
        ${capitalizeFirstLetter(baseName)}Props,
        ${capitalizeFirstLetter(baseName)}Expose,
        ${capitalizeFirstLetter(baseName)}Slots
      } from './src/${baseName}'
      declare module 'vue' {
        export interface GlobalComponents {
          Jv${capitalizeFirstLetter(baseName)}: typeof ${baseName};
        }
      }
    `
  }
}

// 修改样式索引文件并生成样式文件
async function createStyleStructure() {
  let data
  try {
    data = await fs.readFile(styleIndexFilePath, 'utf8')
  } catch (err) {
    console.error(`Error reading style index file: ${err.message}`)
    return
  }

  const temp = `@use './${baseName}.scss';`
  if (data.includes(temp)) {
    console.log(`Style file already exists: ${baseName}.scss`)
    return
  }
  const modifiedData = data + temp

  try {
    await fs.writeFile(styleIndexFilePath, modifiedData, 'utf8')
    console.log(`Style index file modified successfully.`)
  } catch (err) {
    console.error(`Error writing to style index file: ${err.message}`)
    return
  }

  for (const name in styleFileContents) {
    const currentPath = path.join(styleDirName, name)
    try {
      await fs.writeFile(currentPath, styleFileContents[name], 'utf8')
    } catch (err) {
      console.error(`Error writing style file ${name}: ${err.message}`)
    }
  }
}

// 执行目录和文件创建操作
;(async () => {
  try {
    await createStructure(outputPath, structure)
    await createStyleStructure()
    console.log('Directory and file creation successful!')
  } catch (err) {
    console.error(`An error occurred: ${err.message}`)
  }
})()
