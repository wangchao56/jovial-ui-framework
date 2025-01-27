/**
 * 输出当前环境变量的名称和值。
 */
const process = require('node:process')
const dotenv = require('dotenv')

// 加载 .env 文件中的环境变量
dotenv.config()

// 获取环境变量
const env = process.env
// eslint-disable-next-line no-console
console.log('Environment variables:', env.ROOT_DIR)

// 可以接受一个参数，指定要输出的环境变量名称
if (process.argv[2]) {
  const key = process.argv[2]
  // eslint-disable-next-line no-console
  console.log(`${key}: ${env[key]}`)
}
else {
  // eslint-disable-next-line no-console
  console.log('No environment variable name specified.')
}
// 没有指定环境变量名称时，输出所有环境变量的名称和值
// 询问用户是否要输出所有环境变量
// eslint-disable-next-line no-console
console.log('Do you want to output all environment variables? (y/n)')
const answer = process.stdin.read()
if (answer === 'y') {
  // 输出所有环境变量
  // 遍历环境变量，并输出名称和值
  for (const key in env) {
  // eslint-disable-next-line no-console
    console.log(`${key}: ${env[key]}`)
  }
}
