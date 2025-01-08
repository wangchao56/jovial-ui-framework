import { resolve } from 'node:path'
import { process } from 'node:process'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import glob from 'fast-glob'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'

import postcss from 'rollup-plugin-postcss'

import {
  outputCjs,
  outputDir,
  outputEsm,
  pkgRoot,
  rootDir,
  utilsDir,
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
  // 1. 获取
  const files = await glob('**/*.{js,ts,vue,tsx,setup.tsx}', {
    cwd: pkgRoot,
    absolute: true, // 返回绝对路径
    onlyFiles: true, // 只返回文件
  })
  let writeBundles = null
  let buildFailed = false

  writeBundles = await rollup({
    input: files,
    plugins: [
      compileStyleEntry(),
      nodeResolve({ extension: ['.ts'] }),
      vue(),
      esbuild({
        include: /\.[jt]sx?$/, // 默认包含 js/ts 文件
        minify: process.env.NODE_ENV === 'production',
        target: 'es2018', // 使 esbuild 输出兼容 es2018 的代码，可选参数
      }),
      postcss({
        pextract: true, // 提取 css 到单独文件
      }),
      alias({
        entries: [
          {
            find: '@jovial/utils',
            replacement: resolve(utilsDir, 'index.ts'),
          },
          {
            find: '@jovial/typings',
            replacement: resolve(rootDir, 'typings/index.ts'),
          },
        ],
      }),
      commonjs({
        include: /node_modules/, // 包含 node_modules 中的模块
        requireReturnsDefault: 'auto', // 自动处理 default 导出
      }),
    ],
    external: ['vue', 'mock', 'async-validator', '@vue/shared'],
  })

  try {
    await writeBundles.write({
      dir: outputEsm,
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].mjs',
      sourcemap: true,
      exports: 'named', // 添加这一行
    })
    await writeBundles.write({
      dir: outputCjs,
      format: 'cjs',
      preserveModules: true,
      entryFileNames: '[name].cjs',
      sourcemap: true,
      exports: 'named', // 添加这一行
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

  // 1. 遍历所有的 index.ts 文件
  // 2. 为每个 index.ts 文件创建一个 rollup 实例
  // 3. 为每个 rollup 实例添加插件
  // 4. 为每个 rollup 实例添加输出配置
  // 5. 执行打包
  // 6. 输出产物
  // 7. 错误处理
}

moduleBuildEntry()
