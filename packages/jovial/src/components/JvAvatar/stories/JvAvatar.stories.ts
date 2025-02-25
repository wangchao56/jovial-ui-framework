import type { Meta, StoryObj } from '@storybook/vue3'
import JvAvatar from '@components/JvAvatar/src/JvAvatar.vue'
import JvIcon from '@components/JvIcon/src/JvIcon.vue'

// 配置 Meta 数据
const meta = {
  title: '数据展示组件/JvAvatar',
  component: JvAvatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Avatar 组件用来代表用户或事物，支持图片、图标或字符展示。',
      },
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['tiny', 'small', 'medium', 'large', 'x-large'],
      },
      description: '头像大小，支持预设值或数字',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'medium' },
      },
    },
    shape: {
      control: {
        type: 'select',
        options: ['circle', 'square'],
      },
      description: '头像形状',
      table: {
        type: { summary: 'circle | square' },
        defaultValue: { summary: 'circle' },
      },
    },
    src: {
      control: 'text',
      description: '图片源地址',
      table: {
        type: { summary: 'string' },
      },
    },
    fit: {
      control: {
        type: 'select',
        options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      },
      description: '图片适应方式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' },
      },
    },
    icon: {
      control: 'text',
      description: '图标名称',
      table: {
        type: { summary: 'string' },
      },
    },
    text: {
      control: 'text',
      description: '文字内容',
      table: {
        type: { summary: 'string' },
      },
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof JvAvatar>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    src: 'https://picsum.photos/id/23/200/300',
  },
  parameters: {
    docs: {
      description: {
        story: '最基础的头像用法，展示图片。',
      },
    },
  },
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <JvAvatar size="tiny" src="https://picsum.photos/id/23/200/300" />
        <jv-avatar size="small" src="https://picsum.photos/id/23/200/300" />
        <jv-avatar size="medium" src="https://picsum.photos/id/23/200/300" />
        <jv-avatar size="large" src="https://picsum.photos/id/23/200/300" />
        <jv-avatar size="x-large" src="https://picsum.photos/id/23/200/300" />
        <jv-avatar :size="80" src="https://picsum.photos/id/23/200/300" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '头像支持 tiny、small、medium、large、x-large 五种预设尺寸，也可以传入数字自定义大小。',
      },
    },
  },
}

// 不同形状
export const Shapes: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px;">
        <jv-avatar shape="circle" src="https://picsum.photos/id/23/200/300" />
        <jv-avatar shape="square" src="https://picsum.photos/id/23/200/300" />
      </div>
    `,
  }),
}

// 展示类型
export const Types: Story = {
  render: () => ({
    components: { JvAvatar, JvIcon },
    template: `
      <div style="display: flex; gap: 16px;">
        <jv-avatar src="https://picsum.photos/id/23/200/300" />
        <jv-avatar icon="user" />
        <jv-avatar text="User" />
        <jv-avatar>
          <template #icon>
            <jv-icon name="star" />
          </template>
        </jv-avatar>
      </div>
    `,
  }),
}

// 带边框
export const Bordered: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px; background: #f5f5f5; padding: 16px;">
        <jv-avatar src="https://picsum.photos/id/23/200/300" bordered />
        <jv-avatar icon="user" bordered />
        <jv-avatar text="User" bordered />
      </div>
    `,
  }),
}

// 自定义样式
export const CustomStyle: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px;">
        <jv-avatar
          text="JV"
          bg-color="#1976D2"
          color="#ffffff"
        />
        <jv-avatar
          icon="star"
          bg-color="#4CAF50"
          icon-color="#ffffff"
        />
        <jv-avatar
          :size="60"
          text="Custom"
          bg-color="#FF4081"
          color="#ffffff"
          shape="square"
        />
      </div>
    `,
  }),
}

// 错误处理
export const ErrorHandling: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px;">
        <jv-avatar
          src="invalid-url"
          fallback-text="U"
          @error="handleError"
        />
      </div>
    `,
    methods: {
      // handleError(e: Event) {
      //   // action('click')(/* your parameters */)
      // },
    },
  }),
}

// 适应方式
export const FitModes: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px;">
        <jv-avatar
          v-for="fit in ['fill', 'contain', 'cover', 'none', 'scale-down']"
          :key="fit"
          :fit="fit"
          :size="100"
          src="https://picsum.photos/id/23/300/200"
          shape="square"
        />
      </div>
    `,
  }),
}
