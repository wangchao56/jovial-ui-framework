const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

// PostCSS 配置
const config = {
  plugins: [
    require('postcss-import'),
    require('postcss-bem-fix')({
      defaultNamespace: 'jv',
      style: 'suit',
      separators: {
        namespace: '-',
        modifier: '--',
        descendent: '__'
      },
      shortcuts: {
        component: 'b',
        modifier: 'm',
        descendent: 'e'
      }
    }),
    require('postcss-nested'),
    require('autoprefixer')
  ]
}

async function buildBem() {
  try {
    const inputFile = path.resolve(__dirname, '../../examples/browser/bem.css')
    const outputFile = path.resolve(__dirname, '../../examples/browser/bem.dist.css')
    const css = fs.readFileSync(inputFile, 'utf8')

    const result = await postcss(config.plugins).process(css, {
      from: inputFile,
      to: outputFile
    })

    fs.writeFileSync(outputFile, result.css)
    console.log('BEM CSS 编译成功!')
  } catch (error) {
    console.error('编译失败:', error)
    process.exit(1)
  }
}

buildBem() 