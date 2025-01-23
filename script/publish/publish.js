const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const buildPath = path.resolve(__dirname, '../jovial')
// 确保目录存在
if (!fs.existsSync(buildPath)) {
  console.error('Build directory does not exist. Please run build first.')
  process.exit(1)
}
try {
// 进入构建目录
  process.chdir(buildPath)
  // 执行发布
  execSync('npm publish --access public', { stdio: 'inherit' })
  // eslint-disable-next-line no-console
  console.log('Published successfully!')
}
catch (error) {
  console.error('Failed to publish:', error)
  process.exit(1)
}
