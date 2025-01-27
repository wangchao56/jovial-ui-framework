const { execSync } = require('node:child_process')
const path = require('node:path')

const sourceDir = path.resolve(__dirname, '../packages/jovial/src/components')
const outputDir = path.resolve(__dirname, '../build/jovial/theme-chalk')

try {
  execSync(
    `pnpx postcss "${sourceDir}/**/*.css" --dir "${outputDir}"`,
    { stdio: 'inherit' },
  )
  console.log('CSS built successfully!')
}
catch (error) {
  console.error('Failed to build CSS:', error)
  process.exit(1)
}
