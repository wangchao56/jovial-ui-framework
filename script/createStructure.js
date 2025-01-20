// const fs = require('node:fs').promises
const path = require('node:path')
// 从命令行参数获取基本目录名称
const process = require('node:process')
const {
  createStructure,
  toHumpFirstLower,
  toHumpFirstUpper,
} = require('./common')

const args = process.argv.slice(2)
const baseNameArg = args.find(arg => arg.startsWith('--name='))

if (!baseNameArg) {
  console.error('Please provide the base name using --name=<baseDirectoryName>')
  process.exit(1)
}

const baseName = baseNameArg.split('=')[1]

// 定义组件目录和样式目录路径
const outputPath = path.join(__dirname, '..', 'packages', 'jovial/src/components')
// const styleDirName = path.join(
//   __dirname,
//   '..',
//   'packages',
//   'theme-chalk',
//   'src',
// )
// const styleIndexFilePath = path.join(styleDirName, 'index.scss')

// 定义组件文件和样式文件内容
const fileContents = {
  [`${baseName}.ts`]: `
    export const ${toHumpFirstLower(baseName)}Props = {} as const;
    export interface ${toHumpFirstUpper(baseName)}Props {};
    export const ${toHumpFirstLower(baseName)}Emits = {} as const;
    export type ${toHumpFirstUpper(baseName)}Emits = {};
    export const ${toHumpFirstLower(baseName)}Slots = {} as const;
    export type ${toHumpFirstUpper(baseName)}Slots = {};
    export type ${toHumpFirstUpper(baseName)}Expose = {};
  `,
  [`${baseName}.vue`]: `
    <template>
      <div :class="bem.b()"></div>
    </template>
    <script setup lang="ts">
    import { ref } from 'vue';
    import { createNamespace } from '@jovial/utils';
    import { ${toHumpFirstLower(baseName)}Emits, ${toHumpFirstLower(baseName)}Props } from './${baseName}';
    defineOptions({ name: '${toHumpFirstUpper(baseName)}' });
    defineProps(${toHumpFirstLower(baseName)}Props);
    const emit = defineEmits(${toHumpFirstLower(baseName)}Emits);
    const bem = createNamespace('${toHumpFirstLower(baseName.replace('Jv', ''))}');
    </script>
    <style src="../style/style.css" scoped></style>
  `,
}

// const styleFileContents = {
//   [`${baseName}.scss`]: `
//     @use 'mixins/mixins.scss' as *;
//     @include b('${baseName}') {
//       display: block;
//     }
//   `,
// }

// 定义目录结构
const structure = {
  [baseName]: {
    '__test__': {
      [`${baseName}.spec.ts`]: ``,
    },
    'src': fileContents,
    'style': {
      'style.css': `@import '@jovial/theme-chalk/src/common/mixins.css';

      @define-mixin e $element {
        .jv-${toHumpFirstLower(baseName.replace('Jv', ''))}__$(element) {
          @mixin-content;
        }
      }
      @mixin b ${toHumpFirstLower(baseName.replace('Jv', ''))} {}  
      `,
      'theme-vars.css': ``,
      'index.ts': `import './theme-vars.css' 
      import './style.css'`,
    },
    'index.ts': `
      import _${toHumpFirstUpper(baseName)} from './src/${baseName}.vue';
      import { withInstall } from '@jovial/utils';
      import './style'

      const ${toHumpFirstUpper(baseName)} = withInstall(_${toHumpFirstUpper(baseName)});
      
      export * from './src/${baseName}';
      export default ${toHumpFirstUpper(baseName)}; 
      export type Jv${toHumpFirstUpper(baseName)}Instance = InstanceType<typeof ${toHumpFirstUpper(baseName)}>
      export type {
        ${toHumpFirstUpper(baseName)}Emits,
        ${toHumpFirstUpper(baseName)}Props,
        ${toHumpFirstUpper(baseName)}Expose,
        ${toHumpFirstUpper(baseName)}Slots
      } from './src/${baseName}'
      declare module 'vue' {
        export interface GlobalComponents {
          ${toHumpFirstUpper(baseName)}: typeof ${toHumpFirstUpper(baseName)};
        }
      }
    `,
  },
}

// 修改样式索引文件并生成样式文件
// async function createStyleStructure() {
//   let data
//   try {
//     data = await fs.readFile(styleIndexFilePath, 'utf8')
//   }
//   catch (err) {
//     console.error(`Error reading style index file: ${err.message}`)
//     return
//   }

//   const temp = `@use './${baseName}.scss';`
//   if (data.includes(temp)) {
//     // console.log(`Style file already exists: ${baseName}.scss`)
//     return
//   }
//   const modifiedData = data + temp

//   try {
//     await fs.writeFile(styleIndexFilePath, modifiedData, 'utf8')
//     // console.log(`Style index file modified successfully.`)
//   }
//   catch (err) {
//     console.error(`Error writing to style index file: ${err.message}`)
//     return
//   }

//   for (const name in styleFileContents) {
//     const currentPath = path.join(styleDirName, name)
//     try {
//       await fs.writeFile(currentPath, styleFileContents[name], 'utf8')
//     }
//     catch (err) {
//       console.error(`Error writing style file ${name}: ${err.message}`)
//     }
//   }
// }

// 执行目录和文件创建操作
;(async () => {
  try {
    await createStructure(outputPath, structure)
    // await createStyleStructure()
    // console.log('Directory and file creation successful!')
  }
  catch (err) {
    console.error(`An error occurred: ${err.message}`)
  }
})()
