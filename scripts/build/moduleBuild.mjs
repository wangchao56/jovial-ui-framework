import { resolve } from 'node:path'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
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
} from './common.mjs'

/**
 * compileStyleEntry 函数用于创建一个 Rollup 插件，用于处理主题样式的入口文件。
 * 该插件会将以 `@jovial/theme-chalk` 开头的模块路径替换为输出目录中的实际路径。
 *
 * @returns {object} Rollup 插件对象
 */
function compileStyleEntry() {
  const themeEntryPrefix = `@jovial/theme-chalk`
  return {
    name: 'compile-style-entry',
    resolveId(id) {
      if (!id.startsWith(themeEntryPrefix)) {
        return
      }

      return {
        id: id.replace(themeEntryPrefix, `${outputDir}/theme-chalk`),
        external: 'absolute',
      }
    },
  }
}

export async function moduleBuildEntry() {
  // 获取组件文件
  const files = await glob('**/*.{js,ts,vue,tsx,setup.tsx}', {
    cwd: componentsDir,  // 改为从 componentsDir 读取文件
    absolute: true, // 绝对路径
    onlyFiles: true, // 只读取文件
    ignore: [
      '**/__test__/**', // 排除测试目录
      '**/stories/**', // 排除 stories 目录
      '**/*.stories.{ts,tsx}', // 排除 .stories 文件
      '**/*.space.{ts,tsx}', // 排除 .space 文件
      '**/node_modules/**', // 保持原有的 node_modules 排除
    ],
  })

  let writeBundles = null
  let buildFailed = false

  try {
    writeBundles = await rollup({
      input: files,
      plugins: [
        compileStyleEntry(),
        nodeResolve({ 
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],  // 添加更多扩展名支持
        }),
        vue({
          css:true,
          compileTemplate: true  // 启用模板编译
        }),
        vueJsx(),
        typescript({
            tsconfig: resolve(jovialRootDir, 'tsconfig.json'), // 指定 tsconfig.json 文件
            check: false, // 禁用类型检查 
          }),
        esbuild({
          include: /\.[jt]sx?$/,
          minify: process.env.NODE_ENV === 'production',
          target: 'es2018',
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
        }),
        postcss({
          extract: true, // 提取 CSS 到单独的文件
          modules: true,  // 启用 CSS Modules
        }),
        alias({
          entries: [
            {
              find: '@jovial/utils',
              replacement: resolve(utilsDir, 'index.ts'),
            },
            {
              find: '@jovial/components',
              replacement: componentsDir,
            },
            {
              find: '@components',
              replacement: componentsDir,
            },
            {
              find: '@/',
              replacement: jovialSrcDir,
            },
            {
              find: '@/composables',
              replacement: resolve(jovialSrcDir, 'composables'),
            },
            {
              find: '@/directives',
              replacement: resolve(jovialSrcDir, 'directives'),
            },
            {
              find: '@jovial/typings',
              replacement: resolve(rootDir, 'typings/index.ts'),
            },
          ],
        }),
        commonjs(),
      ],
      external: ['vue', 'async-validator', '@vue/shared' ], // 外部依赖
    })

    // 输出 ESM 格式
    await writeBundles.write({
      dir: outputEsm, // 输出目录
      format: 'esm',  // 输出格式
      preserveModules: true, // 保留模块
      preserveModulesRoot: componentsDir, // 保留模块根目录
      entryFileNames: '[name].mjs', // 入口文件名
      sourcemap: true, // 生成 sourcemap
      exports: 'named', // 导出命名
    })

  }
  catch (error) {
    buildFailed = true
    console.error(error)
  }
  
  if (writeBundles) {
    await writeBundles.close()
  }
  
  process.exit(buildFailed ? 1 : 0)
}

moduleBuildEntry()
