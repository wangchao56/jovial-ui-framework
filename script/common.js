const fs = require('fs').promises
const path = require('path')
// 辅助函数：首字母大写 sew-cs-we  ==> SewCsWe
// 辅助函数：首字母大写 sewe ==> Sewe
function capitalizeFirstLetter(str) {
  if (str.includes('-')) {
    return str.split('-').map(capitalizeFirstLetter).join('')
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

//tuof峰驼峰命名转换
function toHumpFirstUpper(str) {
  if (str.includes('-')) {
    return str.split('-').map(capitalizeFirstLetter).join('')
  }
  return str
}

//驼峰命名转换 首字母小写
function toHumpFirstLower(str) {
  let tempStr = toHumpFirstUpper(str)
  return tempStr.charAt(0).toLowerCase() + tempStr.slice(1)
}

// 递归创建目录和文件
async function createStructure(basePath, structure) {
  for (const name in structure) {
    const currentPath = path.join(basePath, name)
    if (typeof structure[name] === 'object') {
      await fs.mkdir(currentPath, { recursive: true })
      await createStructure(currentPath, structure[name])
    } else {
      await fs.writeFile(currentPath, structure[name], 'utf8')
    }
  }
}
module.exports = {
  capitalizeFirstLetter,
  createStructure,
  toHumpFirstLower,
  toHumpFirstUpper
}
