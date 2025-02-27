import { resolve } from 'node:path'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'
// 引入 rollup-plugin-vue-jsx 插件
// 修改后
import terser from '@rollup/plugin-terser'

import {
  outputCjs,
  outputDir,
  outputEsm,
  pkgRoot,
  rootDir,
  utilsDir,
  componentsDir,
  jovialRootDir,
  jovialSrcDir,
  postcssConfig
} from './common.mjs'

/**
 * compileStyleEntry 函数用于创建一个 Rollup 插件，用于处理主题样式的入口文件。
 * 该插件会将以 `@jovial/theme` 开头的模块路径替换为输出目录中的实际路径。
 *
 * @returns {object} Rollup 插件对象
 */
function compileStyleEntry() {
  const themeEntryPrefix = `@jovial/theme`
  return {
    name: 'compile-style-entry',
    resolveId(id) {
      if (!id.startsWith(themeEntryPrefix)) {
        return
      }

      return {
        id: id.replace(themeEntryPrefix, `${outputDir}/theme-chalk`),
        external: 'absolute'
      }
    }
  }
}

export async function moduleBuildEntry() {
  // 获取组件文件
  const files = await glob('**/*.{js,ts,vue,tsx,setup.tsx}', {
    cwd: componentsDir, // 改为从 componentsDir 读取文件
    absolute: true, // 绝对路径
    onlyFiles: true, // 只读取文件
    ignore: [
      '**/__tests__/**', // 排除测试目录
      '**/stories/**', // 排除 stories 目录
      '**/*.stories.{ts,tsx}', // 排除 .stories 文件
      '**/*.space.{ts,tsx}', // 排除 .space 文件
      '**/node_modules/**' // 保持原有的 node_modules 排除
    ]
  })

  let writeBundles = null
  let buildFailed = false

  try {
    writeBundles = await rollup({
      input: files,
      plugins: [
        compileStyleEntry(),
        nodeResolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'] // 添加更多扩展名支持
        }),
        vue(),
        vueJsx(),
        esbuild({
          include: /\.[jt]sx?$/,
          minify: process.env.NODE_ENV === 'production',
          target: 'esnext',
          jsxFactory: 'h', // 指定 JSX 工厂函数
          jsxFragment: 'Fragment' // 指定 JSX 片段
        }),
        postcss({
          modules: true, // 启用 CSS Modules
          config: postcssConfig,
          // 新增样式输出配置
          extract: {
            dir: (id) => {
              // 将样式文件输出到组件目录下的style文件夹
              const componentPath = path.dirname(id).replace(componentsDir, '')
              return path.join(
                process.env.NODE_ENV === 'production' ? outputEsm : outputCjs,
                componentPath,
                'style'
              )
            },
            fileName: (name) => {
              // 保留原始文件名并添加哈希
              const [filename] = name.split('.css')
              return `${filename}.${hash(name)}.css`
            }
          },
          // 保持原有CSS模块功能
          modules: {
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }),
        alias({
          entries: [
            {
              find: '@jovial/utils',
              replacement: resolve(utilsDir, 'index.ts')
            },
            {
              find: '@components',
              replacement: componentsDir
            },
            {
              find: '@/',
              replacement: jovialSrcDir
            },
            {
              find: '@/composables',
              replacement: resolve(jovialSrcDir, 'composables')
            },
            {
              find: '@/directives',
              replacement: resolve(jovialSrcDir, 'directives')
            },
            {
              find: '@jovial/typings',
              replacement: resolve(rootDir, 'typings/index.ts')
            }
          ]
        }),
        commonjs()
      ],
      external: ['vue', 'async-validator', '@vue/shared'] // 外部依赖
    })

    // 输出 ESM 格式
    await writeBundles.write({
      dir: outputEsm, // 输出目录
      format: 'esm', // 输出格式
      preserveModules: true, // 保留模块
      preserveModulesRoot: componentsDir, // 保留模块根目录
      entryFileNames: '[name].esm.js', // 入口文件名
      sourcemap: false, // 生成 sourcemap
      exports: 'named' // 导出命名
    })
  } catch (error) {
    buildFailed = true
    console.error(error)
  }

  if (writeBundles) {
    await writeBundles.close()
  }

  process.exit(buildFailed ? 1 : 0)
}

moduleBuildEntry()
