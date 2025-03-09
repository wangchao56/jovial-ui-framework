const fs = require('fs')
const path = require('path')
const glob = require('glob')
function toKebabCase(str = '') {
  // 使用正则表达式将字符串中的非字母字符替换为连字符，并将大写字母转换为小写字母
  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
  return kebab
}
// 确保目标目录存在
const targetDir = 'packages/theme/src/components'
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// 使用 glob.sync 同步查找所有 CSS 文件
const cssFiles = glob.sync('packages/components/**/*.css')

cssFiles.forEach((cssFile) => {
  const tempDirName = path
    .dirname(cssFile)
    .replace('packages\\components\\', '')
    .replace('\\style', '')
    .replace('\\__tests__', '')
  const dirName = toKebabCase(tempDirName)
  const fileName = path.basename(cssFile)

  console.log(dirName, fileName)

  let targetFileName
  if (fileName === 'style.css') {
    targetFileName = `${dirName}.css`
  } else {
    targetFileName = fileName
  }

  const targetPath = path.join(targetDir, targetFileName)

  // 复制文件到新位置
  fs.copyFileSync(cssFile, targetPath)
  console.log(`已移动: ${cssFile} -> ${targetPath}`)
})

console.log('所有 CSS 文件已移动完成')
