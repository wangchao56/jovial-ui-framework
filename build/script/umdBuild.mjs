import { resolve } from 'path'
import {
  pkgRoot,
  outputUmd,
  componentsDir,
  utilsDir,
  rootDir
} from './common.mjs'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
export const umdBuildEntry = async () => {
  let bundle
  let buildFailed = false
  try {
    // 启动一次打包
    bundle = await rollup({
      input: resolve(pkgRoot, 'index.ts'),
      plugins: [
        // 插件数组，此处省略具体配置
        nodeResolve(),
        vue(),
        esbuild({
          include: /\.[jt]sx?$/, // 默认包含 js/ts 文件
          minify: process.env.NODE_ENV === 'production',
          target: 'es2018' // 使 esbuild 输出兼容 es2018 的代码，可选参数
        }),
        alias({
          entries: [
            {
              find: '@jovial/utils',
              replacement: resolve(utilsDir, 'index.ts')
            },
            {
              find: '@jovial/typings',
              replacement: resolve(rootDir, 'typings/index.ts')
            }
          ]
        })
      ],
      // 输出配置
      external: ['vue', 'mock']
    })

    // 写入输出文件
    await bundle.write({
      file: resolve(outputUmd, 'index.full.js'),
      format: 'umd',
      name: 'JovialUI',
      globals: {
        vue: 'Vue'
      },
      exports: 'named'
    })

    // 一个文件名数组，表示此产物所依赖的文件
  } catch (error) {
    buildFailed = true
    // 进行一些错误报告
    console.error(error)
  }
  if (bundle) {
    // 关闭打包过程
    await bundle.close()
  }
  process.exit(buildFailed ? 1 : 0)
}

// 执行入口函数
umdBuildEntry()
