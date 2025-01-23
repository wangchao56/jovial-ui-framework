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

// 定义组件文件和样式文件内容
const fileContents = {
  [`${baseName}.ts`]: `
    export const ${toHumpFirstLower(baseName)}Props = {} as const;
    export interface ${toHumpFirstUpper(baseName)}Props {
      // 组件属性定义
    };
    export type ${toHumpFirstUpper(baseName)}Emits = {
      // 事件定义
    };
    export type ${toHumpFirstUpper(baseName)}Slots = {
      // 插槽定义
      default?: () => any;
    };
    export type ${toHumpFirstUpper(baseName)}Expose = {
      // 暴露的方法和属性
    };
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
    defineEmits(${toHumpFirstLower(baseName)}Emits);
    const bem = createNamespace('${toHumpFirstLower(baseName.replace('Jv', ''))}');
    </script>
    import "../style/style.css"  `,
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
      [`${baseName}.spec.ts`]: `
        import { mount } from '@vue/test-utils'
        import { describe, expect, it } from 'vitest'
        import ${toHumpFirstUpper(baseName)} from '../src/${baseName}.vue'
        
        describe('${toHumpFirstUpper(baseName)}', () => {
          it('renders correctly', () => {
            const wrapper = mount(${toHumpFirstUpper(baseName)})
            expect(wrapper.exists()).toBe(true)
          })
          
          // 添加更多测试用例
        })
      `,
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

// 执行目录和文件创建操作
;(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log(`开始创建组件 ${baseName} 的目录结构...`)
    await createStructure(outputPath, structure)
    // eslint-disable-next-line no-console
    console.log(`组件 ${baseName} 创建成功！`)
  }
  catch (err) {
    console.error(`创建组件失败：${err.message}`)
    process.exit(1)
  }
})()
