import type { Meta, StoryObj } from '@storybook/vue3'
import { JvCollapse, JvCollapseItem } from '@components/JvCollapse'
import { ref } from 'vue'

// 组件元数据
const meta = {
  title: '数据展示组件/JvCollapse',
  component: JvCollapse,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: '当前激活的面板',
    },
    accordion: {
      control: 'boolean',
      description: '是否开启手风琴模式',
    },
  },
} satisfies Meta<typeof JvCollapse>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const BasicCollapse: Story = {
  args: {
    modelValue: ['1'],
  },
  render: args => ({
    components: { JvCollapse, JvCollapseItem },
    setup() {
      const activeNames = ref(args.modelValue)
      return { args, activeNames }
    },
    template: `
      <JvCollapse v-model="activeNames">
        <JvCollapseItem name="1" title="面板一">
          这是第一个面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="2" title="面板二">
          这是第二个面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="3" title="面板三">
          这是第三个面板的内容
        </JvCollapseItem>
      </JvCollapse>
    `,
  }),
}

// 手风琴模式
export const AccordionCollapse: Story = {
  args: {
    modelValue: ['1'],
    accordion: true,
  },
  render: args => ({
    components: { JvCollapse, JvCollapseItem },
    setup() {
      const activeNames = ref(args.modelValue)
      return { args, activeNames }
    },
    template: `
      <JvCollapse v-model="activeNames" :accordion="args.accordion">
        <JvCollapseItem name="1" title="手风琴模式 - 面板一">
          这是第一个面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="2" title="手风琴模式 - 面板二">
          这是第二个面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="3" title="手风琴模式 - 面板三">
          这是第三个面板的内容
        </JvCollapseItem>
      </JvCollapse>
    `,
  }),
}

// 禁用状态
export const DisabledCollapse: Story = {
  args: {
    modelValue: ['1'],
  },
  render: args => ({
    components: { JvCollapse, JvCollapseItem },
    setup() {
      const activeNames = ref(args.modelValue)
      return { args, activeNames }
    },
    template: `
      <JvCollapse v-model="activeNames">
        <JvCollapseItem name="1" title="可用面板">
          这是可用面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="2" title="禁用面板" disabled>
          这是禁用面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="3" title="可用面板">
          这是可用面板的内容
        </JvCollapseItem>
      </JvCollapse>
    `,
  }),
}

// 自定义标题
export const CustomTitleCollapse: Story = {
  args: {
    modelValue: ['1'],
  },
  render: args => ({
    components: { JvCollapse, JvCollapseItem },
    setup() {
      const activeNames = ref(args.modelValue)
      return { args, activeNames }
    },
    template: `
      <JvCollapse v-model="activeNames">
        <JvCollapseItem name="1">
          <template #title>
            <div style="display: flex; align-items: center;">
              <span style="margin-right: 8px;">🔍</span>
              <span>自定义标题一</span>
            </div>
          </template>
          这是第一个面板的内容
        </JvCollapseItem>
        <JvCollapseItem name="2">
          <template #title>
            <div style="display: flex; align-items: center;">
              <span style="margin-right: 8px;">⚙️</span>
              <span>自定义标题二</span>
            </div>
          </template>
          这是第二个面板的内容
        </JvCollapseItem>
      </JvCollapse>
    `,
  }),
}

// 嵌套面板
export const NestedCollapse: Story = {
  args: {
    modelValue: ['1'],
  },
  render: args => ({
    components: { JvCollapse, JvCollapseItem },
    setup() {
      const outerActiveNames = ref(args.modelValue)
      const innerActiveNames = ref(['1-1'])
      return { args, outerActiveNames, innerActiveNames }
    },
    template: `
      <JvCollapse v-model="outerActiveNames">
        <JvCollapseItem name="1" title="外层面板一">
          <div style="padding: 10px 0;">
            <JvCollapse v-model="innerActiveNames">
              <JvCollapseItem name="1-1" title="内层面板一">
                这是内层面板一的内容
              </JvCollapseItem>
              <JvCollapseItem name="1-2" title="内层面板二">
                这是内层面板二的内容
              </JvCollapseItem>
            </JvCollapse>
          </div>
        </JvCollapseItem>
        <JvCollapseItem name="2" title="外层面板二">
          这是外层面板二的内容
        </JvCollapseItem>
      </JvCollapse>
    `,
  }),
}
