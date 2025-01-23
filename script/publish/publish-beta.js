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

  // 添加 --no-git-checks 参数来跳过 Git 检查
  execSync('npm publish --tag beta --access public --no-git-checks', { stdio: 'inherit' })

  // eslint-disable-next-line no-console
  console.log('Published beta version successfully!')
}
catch (error) {
  console.error('Failed to publish beta version:', error)
  process.exit(1)
}
