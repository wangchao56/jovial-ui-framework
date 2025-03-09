import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvSelect from '../src/JvSelect.vue'
/**
 * Select 组件实现了以下功能：
 * 1. 单选和多选模式
 * 2. 可清空选项
 * 3. 支持搜索过滤
 * 4. 支持选项分组
 * 5. 自定义选项内容
 * 6. 限制标签显示数量
 * 7. 完整的禁用状态
 */

const meta = {
  title: '数据录入组件/JvSelect',
  component: JvSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '选择器组件，用于从多个选项中选择一个或多个。',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: '选中值',
      table: {
        type: { summary: 'string | number | (string | number)[]' },
        defaultValue: { summary: '""' },
      },
    },
    options: {
      control: 'object',
      description: '选项列表',
      table: {
        type: { summary: 'SelectOption[]' },
        defaultValue: { summary: '[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: '占位文本',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"请选择"' },
      },
    },
    multiple: {
      control: 'boolean',
      description: '是否多选',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: 'boolean',
      description: '是否可清空',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    filterable: {
      control: 'boolean',
      description: '是否可搜索',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxTagCount: {
      control: 'number',
      description: '最大显示标签数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
} satisfies Meta<typeof JvSelect>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value = ref('')
      const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' },
      ]
      return { value, options }
    },
    template: `
      <jv-select
        v-model="value"
        :options="options"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '基础的选择器用法。',
      },
    },
  },
}

// 多选模式
export const Multiple: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value = ref([])
      const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' },
      ]
      return { value, options }
    },
    template: `
      <jv-select
        v-model="value"
        :options="options"
        :multiple="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以选择多个选项。',
      },
    },
  },
}

// 可搜索
export const Filterable: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value = ref('')
      const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' },
      ]
      return { value, options }
    },
    template: `
      <jv-select
        v-model="value"
        :options="options"
        :filterable="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以搜索选项。',
      },
    },
  },
}

// 分组选项
export const Group: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value = ref('')
      const options = [
        { value: '1', label: '选项一', group: '分组一' },
        { value: '2', label: '选项二', group: '分组一' },
        { value: '3', label: '选项三', group: '分组二' },
        { value: '4', label: '选项四', group: '分组二' },
      ]
      return { value, options }
    },
    template: `
      <jv-select
        v-model="value"
        :options="options"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '选项可以进行分组。',
      },
    },
  },
}

// 自定义内容
export const CustomContent: Story = {
  render: () => ({
    components: { JvSelect },
    setup() {
      const value = ref('')
      const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' },
      ]
      return { value, options }
    },
    template: `
      <jv-select
        v-model="value"
        :options="options"
      >
        <template #option="{ option }">
          <span style="color: #1976D2;">{{ option.label }}</span>
        </template>
        <template #empty>
          <span style="color: #FF4081;">暂无数据</span>
        </template>
      </jv-select>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以自定义选项和空状态的内容。',
      },
    },
  },
}
