#!/usr/bin/env node

/**
 * 测试特定组件的脚本
 * 用法: pnpm test:component JvTabs
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// 获取命令行参数
const componentName = process.argv[2]

if (!componentName) {
  console.error('请提供组件名称，例如: pnpm test:component JvTabs')
  process.exit(1)
}

// 检查组件是否存在
const componentsDir = path.resolve(__dirname, '../packages/components')
const componentDir = path.join(componentsDir, componentName)

if (!fs.existsSync(componentDir)) {
  console.error(`组件 ${componentName} 不存在，请检查组件名称`)
  process.exit(1)
}

// 检查测试文件是否存在 - 支持多种测试文件命名模式
const testPatterns = [
  path.join(componentDir, '__tests__', `${componentName}.test.ts`),
  path.join(componentDir, '__tests__', `${componentName}.spec.ts`),
  path.join(componentDir, 'test', `${componentName}.test.ts`),
  path.join(componentDir, 'test', `${componentName}.spec.ts`),
]

const existingTestFiles = testPatterns.filter(file => fs.existsSync(file))

if (existingTestFiles.length === 0) {
  console.error(`测试文件不存在，请先创建以下测试文件之一:`)
  testPatterns.forEach(file => console.error(`- ${file}`))
  process.exit(1)
}

console.log(`找到测试文件:`)
existingTestFiles.forEach(file => console.log(`- ${file}`))
console.log(`正在测试组件: ${componentName}...`)

try {
  // 运行测试，使用更精确的测试模式匹配
  execSync(`vitest run --config vitest.config.ts -t "${componentName}$|${componentName}\\."`, { stdio: 'inherit' })
  console.log(`\n✅ 组件 ${componentName} 测试完成`)
} catch (error) {
  console.error(`\n❌ 组件 ${componentName} 测试失败`)
  
  // 提供更多错误信息和解决建议
  console.error('\n可能的解决方案:')
  console.error('1. 检查测试文件中的导入路径是否正确')
  console.error('2. 确保组件及其依赖项正确导入')
  console.error('3. 检查测试中的类型定义和断言')
  console.error('4. 对于异步测试，确保使用 async/await 和 nextTick')
  console.error('5. 运行 "pnpm test:watch" 获取更详细的错误信息')
  
  process.exit(1)
} 