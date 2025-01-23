import { resolve } from 'node:path'
import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import {
  outputUmd,
  pkgRoot,
  rootDir,
  utilsDir,
  componentsDir,
} from '../../script/build/common.mjs'

export async function umdBuildEntry() {
  let bundle
  let buildFailed = false
  try {
    bundle = await rollup({
      input: resolve(componentsDir, 'index.ts'),  // 使用组件入口文件
      plugins: [
        nodeResolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
        }),
        vue(),
        esbuild({
          include: /\.[jt]sx?$/,
          minify: process.env.NODE_ENV === 'production',
          target: 'es2018',
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
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
              find: '@jovial/typings',
              replacement: resolve(rootDir, 'typings/index.ts'),
            },
          ],
        }),
      ],
      external: ['vue'],
    })

    // 输出完整版本
    await bundle.write({
      file: resolve(outputUmd, 'index.full.js'),
      format: 'umd',
      name: 'JovialUI',
      globals: {
        vue: 'Vue',
      },
      exports: 'named',
      sourcemap: true,
    })

    // 输出压缩版本
    await bundle.write({
      file: resolve(outputUmd, 'index.full.min.js'),
      format: 'umd',
      name: 'JovialUI',
      globals: {
        vue: 'Vue',
      },
      exports: 'named',
      sourcemap: true,
      plugins: [
        esbuild({
          minify: true,
        }),
      ],
    })
  }
  catch (error) {
    buildFailed = true
    console.error(error)
  }
  
  if (bundle) {
    await bundle.close()
  }
  
  process.exit(buildFailed ? 1 : 0)
}

// 执行入口函数
umdBuildEntry()
