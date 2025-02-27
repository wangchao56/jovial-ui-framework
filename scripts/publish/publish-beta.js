const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const dotenv = require('dotenv')
// 加载 .env 文件中的环境变量
dotenv.config()
// 获取环境变量
const env = process.env
const outputPkgDir = env.OUTPUT_DIR
const buildPath = path.resolve(__dirname, '../..', outputPkgDir)

// 确保目录存在
if (!fs.existsSync(buildPath)) {
  console.error('Build directory does not exist. Please run build first.')
  process.exit(1)
}

try {
 // 进入构建目录
 process.chdir(buildPath)

 // 先更新beta版本号
 execSync('npm version prepatch --preid beta --no-git-tag-version', { stdio: 'inherit' })
 
 // 添加 --no-git-checks 参数来跳过 Git 检查
 execSync('npm publish --tag beta --access public --no-git-checks', { stdio: 'inherit' })

 // eslint-disable-next-line no-console
 console.log('Published beta version successfully!')
}
catch (error) {
  console.error('Failed to publish beta version:', error)
  process.exit(1)
}
