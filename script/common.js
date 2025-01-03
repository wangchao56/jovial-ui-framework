const fs = require('fs').promises
const path = require('path')
// 辅助函数：首字母大写
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
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
  createStructure
}
