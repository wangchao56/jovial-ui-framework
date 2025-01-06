import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
const outputPkgDir = 'jovial'

export const filePath = fileURLToPath(import.meta.url)
export const dirName = dirname(filePath)
export const rootDir = resolve(dirName, '..', '..')
export const pkgRoot = resolve(rootDir, 'packages')
export const outputDir = resolve(rootDir, outputPkgDir)
export const outputEsm = resolve(outputDir, 'esm')
export const outputCjs = resolve(outputDir, 'cjs')
export const outputUmd = resolve(outputDir, 'dist')
export const componentsDir = resolve(pkgRoot, 'components')
export const utilsDir = resolve(pkgRoot, 'utils')

console.log(
  filePath +
    '\n' +
    dirName +
    '\n' +
    rootDir +
    '\n' +
    pkgRoot +
    '\n' +
    outputDir +
    '\n' +
    outputEsm +
    '\n' +
    outputCjs +
    '\n' +
    outputUmd +
    '\n' +
    componentsDir +
    '\n' +
    utilsDir +
    '\n'
)
