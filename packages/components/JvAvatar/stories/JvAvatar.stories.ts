import type { Meta, StoryObj } from '@storybook/vue3'
import JvAvatar from '@components/JvAvatar'
import JvIcon from '@components/JvIcon'
import { userEvent, within } from '@storybook/test'

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
        type: { summary: 'string | number | Size' },
        defaultValue: { summary: 'medium' },
      },
    },
    customSize: {
      control: 'number',
      description: '自定义头像尺寸',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        control: 'number',
      },
    },
    src: {
      control: 'text',
      description: '图片源地址',
      table: {
        type: { summary: 'string' },
      },
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: '头像形状',
      table: {
        type: { summary: 'string' },
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
  args: {
    size: 'medium',
    shape: 'circle',
    src: 'https://picsum.photos/id/237/200/300',
    icon: 'mdi:account',
    text: 'User',
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
        <JvAvatar size="small" src="https://picsum.photos/id/23/200/300" />
        <JvAvatar size="medium" src="https://picsum.photos/id/23/200/300" />
        <JvAvatar size="large" src="https://picsum.photos/id/23/200/300" />
        <JvAvatar size="x-large" src="https://picsum.photos/id/23/200/300" />
        <JvAvatar :custom-size="80" src="https://picsum.photos/id/23/200/300" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '头像支持 tiny、small、medium、large、x-large 五种预设尺寸，也可以传入数字自定义大小。',
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
        <JvAvatar shape="circle" src="https://picsum.photos/id/23/200/300" />
        <JvAvatar shape="square" src="https://picsum.photos/id/23/200/300" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '头像支持圆形、方形两种形状。',
      },
    },
  },
}

// 展示类型
export const Types: Story = {
  render: () => ({
    components: { JvAvatar, JvIcon },
    template: `
      <div style="display: flex; gap: 16px;">
        <jv-avatar src="https://picsum.photos/id/23/200/300" />
        <jv-avatar icon="mdi:account" />
        <jv-avatar text="User" />
        <jv-avatar>
          <template #icon>
            <jv-icon name="$star" />
          </template>
        </jv-avatar>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '头像支持图片、图标、文字三种展示类型。',
      },
    },
  },
}

// 带边框
export const Bordered: Story = {
  render: () => ({
    components: { JvAvatar },
    template: `
      <div style="display: flex; gap: 16px; background: #f5f5f5; padding: 16px;">
        <jv-avatar src="https://picsum.photos/id/23/200/300" bordered />
        <jv-avatar icon="mdi:account" bordered />
        <jv-avatar text="User" bordered />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '头像支持圆形、方形两种形状。',
      },
    },
  },
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
          icon="$star"
          bg-color="#4CAF50"
          color="#ffffff"
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
  parameters: {
    docs: {
      description: {
        story: '头像支持自定义背景颜色和文字颜色。',
      },
    },
  },
}

// 错误处理
export const ErrorHandling: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /count is 0/i }))
  },
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
  }),
  parameters: {
    docs: {
      description: {
        story: '图片加载失败时，显示备用文本。',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: '图片适应方式',
      },
    },
  },
}
