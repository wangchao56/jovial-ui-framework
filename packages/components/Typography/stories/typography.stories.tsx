import type { Meta, StoryObj } from '@storybook/vue3'
import { JvCode, JvLink, JvParagraph, JvText, JvTitle } from '../index'

const meta = {
  title: 'Typography/Overview',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta

export const Overview: StoryObj = {
  render: () => ({
    components: { JvTitle, JvText, JvParagraph, JvLink, JvCode },
    template: `
      <div style="width: 600px;">
        <JvTitle level={1}>标题示例 H1</JvTitle>
        <JvTitle level={2}>标题示例 H2</JvTitle>
        <JvTitle level={3}>标题示例 H3</JvTitle>
        
        <JvParagraph>
          这是一个段落示例。Typography 组件提供了丰富的文字排版功能，包括标题、段落、文本、链接和代码等。
        </JvParagraph>
        
        <JvText>普通文本</JvText>
        <JvText type="success">成功文本</JvText>
        <JvText type="warning">警告文本</JvText>
        <JvText type="error">错误文本</JvText>
        
        <JvLink to="https://example.com">外部链接示例</JvLink>
        
        <JvCode language="javascript" title="代码示例">
const greeting = 'Hello World';
console.log(greeting);
        </JvCode>
      </div>
    `,
  }),
}
