import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import dotenv from 'dotenv'
// 加载 .env 文件中的环境变量
dotenv.config()
// 获取环境变量
const env = process.env
const outputPkgDir = env.OUTPUT_DIR
if (!outputPkgDir) {
  throw new Error('环境变量 OUTPUT_DIR 未定义')
}

export const filePath = fileURLToPath(import.meta.url)
export const dirName = dirname(filePath)

export const rootDir = resolve(dirName, '..', '..')
export const pkgRoot = resolve(rootDir, 'packages')
export const outputDir = resolve(rootDir, outputPkgDir)
export const outputEsm = resolve(outputDir, 'esm')
export const outputCjs = resolve(outputDir, 'lib')
export const outputUmd = resolve(outputDir, 'dist')

export const jovialRootDir = resolve(pkgRoot, 'jovial')
export const jovialSrcDir = resolve(jovialRootDir, 'src')
export const componentsDir = resolve(jovialSrcDir, 'components')
export const utilsDir = resolve(pkgRoot, 'utils')
export const typingsDir = resolve(pkgRoot, 'typings')
export const postcssConfig = resolve(rootDir, 'postcss.config.js')
