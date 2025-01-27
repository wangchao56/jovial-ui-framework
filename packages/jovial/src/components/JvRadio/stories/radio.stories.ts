import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { JvRadio, JvRadioGroup } from '../index'

const meta = {
  title: 'Components/Radio',
  component: JvRadio,
  tags: ['autodocs'],
} satisfies Meta<typeof JvRadio>

export default meta
type Story = StoryObj<typeof meta>

// 基础单选框
export const Basic: Story = {
  render: () => ({
    components: { JvRadio },
    setup() {
      const value = ref(false)
      return { value }
    },
    template: `
      <JvRadio v-model="value" label="选项1" value="1" />
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvRadio },
    setup() {
      const value = ref(false)
      return { value }
    },
    template: `
      <div class="space-y-4">
        <JvRadio v-model="value" label="禁用未选中" value="1" disabled />
        <JvRadio v-model="value" label="禁用已选中" value="2" disabled :model-value="true" />
      </div>
    `,
  }),
}

// 单选框组
export const RadioGroup: Story = {
  render: () => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('1')
      return { value }
    },
    template: `
      <JvRadioGroup v-model="value">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
    `,
  }),
}

// 垂直布局
export const ColumnLayout: Story = {
  render: () => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('1')
      return { value }
    },
    template: `
      <JvRadioGroup v-model="value" column>
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
    `,
  }),
}

// 内联布局
export const InlineLayout: Story = {
  render: () => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('1')
      return { value }
    },
    template: `
      <JvRadioGroup v-model="value" inline>
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
        <JvRadio label="选项4" value="4" />
        <JvRadio label="选项5" value="5" />
        <JvRadio label="选项6" value="6" />
      </JvRadioGroup>
    `,
  }),
}

// 禁用组
export const DisabledGroup: Story = {
  render: () => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('1')
      return { value }
    },
    template: `
      <JvRadioGroup v-model="value" disabled>
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
    `,
  }),
}

// 自定义标签内容
export const CustomLabel: Story = {
  render: () => ({
    components: { JvRadio, JvRadioGroup },
    setup() {
      const value = ref('1')
      return { value }
    },
    template: `
      <JvRadioGroup v-model="value">
        <JvRadio value="1">
          <template #label>
            <div class="flex items-center">
              <span class="text-primary">自定义标签</span>
              <span class="ml-2 text-sm text-gray-500">描述文本</span>
            </div>
          </template>
        </JvRadio>
        <JvRadio value="2">
          <template #label>
            <div class="flex items-center">
              <span class="text-warning">警告选项</span>
              <span class="ml-2 text-sm text-gray-500">请谨慎选择</span>
            </div>
          </template>
        </JvRadio>
      </JvRadioGroup>
    `,
  }),
}
