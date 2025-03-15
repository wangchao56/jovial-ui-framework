import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { JvRadio, JvRadioGroup } from '../index'

const meta: Meta<typeof JvRadioGroup> = {
  title: '数据录入组件/JvRadio 单选框',
  component: JvRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '单选框组的值',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用整个单选框组',
    },
    name: {
      control: 'text',
      description: '单选框组的name属性',
    },
    column: {
      control: 'boolean',
      description: '是否为垂直布局',
    },
    inline: {
      control: 'boolean',
      description: '是否为内联布局',
    },
    legend: {
      control: 'text',
      description: '单选框组的标题',
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
    compact: {
      control: 'boolean',
      description: '是否使用紧凑模式',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvRadioGroup>

export const Basic: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="请选择一个选项">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {},
}

export const Disabled: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="禁用整个单选框组">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    disabled: true,
  },
}

export const DisabledItem: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="禁用单个选项">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" disabled />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {},
}

export const Column: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="垂直布局">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    column: true,
  },
}

export const Inline: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="内联布局">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    inline: true,
  },
}

export const Bordered: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="带边框的单选框组">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    bordered: true,
  },
}

export const Compact: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="紧凑模式">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    compact: true,
  },
}

export const BorderedColumn: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="带边框的垂直布局">
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    bordered: true,
    column: true,
  },
}

export const CustomLegend: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" bordered>
        <template #legend>
          <span style="color: red; font-weight: bold;">自定义标题</span>
        </template>
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {},
}

export const CustomLabel: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="自定义标签" bordered>
        <JvRadio value="1">
          <template #label>
            <span style="color: blue; font-weight: bold;">自定义标签1</span>
          </template>
        </JvRadio>
        <JvRadio value="2">
          <template #label>
            <span style="color: green; font-weight: bold;">自定义标签2</span>
          </template>
        </JvRadio>
        <JvRadio value="3">
          <template #label>
            <span style="color: purple; font-weight: bold;">自定义标签3</span>
          </template>
        </JvRadio>
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {},
}

export const ColoredRadio: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="自定义颜色" bordered>
        <JvRadio label="红色" value="1" color="red" />
        <JvRadio label="绿色" value="2" color="green" />
        <JvRadio label="蓝色" value="3" color="blue" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {},
}

export const ManyOptions: Story = {
  render: args => ({
    components: { JvRadioGroup, JvRadio },
    setup() {
      const selectedValue = ref('1')
      return { args, selectedValue }
    },
    template: `
      <JvRadioGroup v-model="selectedValue" v-bind="args" legend="多个选项" inline>
        <JvRadio label="选项1" value="1" />
        <JvRadio label="选项2" value="2" />
        <JvRadio label="选项3" value="3" />
        <JvRadio label="选项4" value="4" />
        <JvRadio label="选项5" value="5" />
        <JvRadio label="选项6" value="6" />
        <JvRadio label="选项7" value="7" />
        <JvRadio label="选项8" value="8" />
      </JvRadioGroup>
      <div style="margin-top: 16px;">当前选中值: {{ selectedValue }}</div>
    `,
  }),
  args: {
    bordered: true,
  },
}
