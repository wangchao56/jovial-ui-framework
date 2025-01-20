const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const readline = require('node:readline')
// 定义目标目录
const targetDir = 'F:\\workspace\\jovial-ui-framework\\packages\\jovial\\src\\stories'

// 获取用户输入的 [name]
const args = process.argv.slice(2)
let storyName
if (args.length > 0) {
  storyName = args[0]
}
else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('请输入故事名称: ', (name) => {
    storyName = name
    createStoryFile()
    rl.close()
  })
}

// 创建 .stories.ts 文件并写入内容
function createStoryFile(flag) {
  const fileName = `${storyName}.stories.ts`
  const filePath = path.join(targetDir, fileName)

  // 检查文件是否已存在
  if (!flag && fs.existsSync(filePath)) {
    console.error(`文件 ${fileName} 已存在。`)

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question('是否覆盖该文件? (y/n): ', (answer) => {
      if (answer === 'y') {
        createStoryFile(true)
      }
      else {
        console.warn(`已取消创建 ${fileName}。`)
      }
      rl.close()
    })
    return
  }

  const template = `
      <${storyName} v-bind="args">
        <JvButton variant='text'>Hover me</JvButton>
      </${storyName}>
    `

  // 写入内容到文件
  const content = `
import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/button.vue'
import ${storyName} from '@components/${storyName}/src/${storyName}.vue'
  
  const template = \` {{template}} \`
const meta = {
  title: 'Components/${storyName}',
  component: ${storyName},

  tags: ['autodocs'],
  args: {

  },
} satisfies Meta<typeof ${storyName}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
  },
  render: args => ({
    components: { JvButton, ${storyName} },
    setup() {
      return { args }
    },
    template,
  }),
}

  `.replace('{{template}}', template).trim()

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`写入文件时出错: ${err.message}`)
    }
    else {
      console.warn(`文件 ${fileName} 已成功创建。`)
    }
  })
}

// 如果命令行参数已提供，则直接创建文件
if (storyName) {
  createStoryFile()
}
