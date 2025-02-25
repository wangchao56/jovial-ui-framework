import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvPagination from '../src/JvPagination.vue'

const meta = {
  title: '导航组件/Pagination',
  component: JvPagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '分页组件，用于数据分页展示。',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: '当前页码',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    total: {
      control: 'number',
      description: '总条目数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    pageSize: {
      control: 'number',
      description: '每页显示条目数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    pagerCount: {
      control: 'number',
      description: '页码按钮的数量',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '7' },
      },
    },
    showQuickJumper: {
      control: 'boolean',
      description: '是否显示快速跳转',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTotal: {
      control: 'boolean',
      description: '是否显示总条目数',
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
    simple: {
      control: 'boolean',
      description: '是否显示较少的页码',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof JvPagination>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <jv-pagination
        v-model="currentPage"
        :total="100"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的分页用法。',
      },
    },
  },
}

// 显示总数
export const WithTotal: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <jv-pagination
        v-model="currentPage"
        :total="100"
        :show-total="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '显示总条目数。',
      },
    },
  },
}

// 快速跳转
export const WithQuickJumper: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <jv-pagination
        v-model="currentPage"
        :total="100"
        :show-quick-jumper="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以快速跳转到某一页。',
      },
    },
  },
}

// 简单模式
export const Simple: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <jv-pagination
        v-model="currentPage"
        :total="100"
        :simple="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '简单模式下只显示当前页码。',
      },
    },
  },
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <jv-pagination
        v-model="currentPage"
        :total="100"
        :disabled="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '禁用状态下不可操作。',
      },
    },
  },
}

// 自定义内容
export const CustomContent: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <jv-pagination
        v-model="currentPage"
        :total="100"
        :show-total="true"
      >
        <template #total="{ total, range }">
          <span style="color: #1976D2;">
            第 {{ range[0] }}-{{ range[1] }} 条，共 {{ total }} 条
          </span>
        </template>
        <template #page="{ page, active }">
          <span :style="{ color: active ? '#FF4081' : '' }">
            {{ page }}
          </span>
        </template>
      </jv-pagination>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过插槽自定义分页内容。',
      },
    },
  },
}
