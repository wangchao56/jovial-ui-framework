import type { Meta, StoryObj } from '@storybook/vue3'
import JvAnchor from '@components/JvAnchor/src/JvAnchor.vue'

const meta: Meta<typeof JvAnchor> = {
  title: '导航组件/JvAnchor',
  component: JvAnchor,
  tags: ['autodocs'],
  argTypes: {
    affix: {
      description: '是否启用固定模式',
      control: 'boolean',
      defaultValue: true,
    },
    offsetTop: {
      description: '距离窗口顶部达到指定偏移量后触发',
      control: 'number',
      defaultValue: 0,
    },
    targetOffset: {
      description: '锚点滚动偏移量',
      control: 'number',
      defaultValue: 0,
    },
    container: {
      description: '指定滚动的容器',
      control: 'text',
      defaultValue: 'window',
    },
  },
}

export default meta
type Story = StoryObj<typeof JvAnchor>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { JvAnchor },
    setup() {
      const links = [
        {
          key: 'part1',
          href: '#part1',
          title: '第一部分',
        },
        {
          key: 'part2',
          href: '#part2',
          title: '第二部分',
        },
        {
          key: 'part3',
          href: '#part3',
          title: '第三部分',
        },
      ]

      return { links }
    },
    template: `
      <div style="display: flex;">
        <JvAnchor style="width: 200px;">
          <template v-for="link in links" :key="link.key">
            <div :data-anchor="link.key">
              <h2>{{ link.title }}</h2>
              <div style="height: 500px; background: #f5f5f5; margin: 16px 0;">
                {{ link.title }} 的内容区域
              </div>
            </div>
          </template>
        </JvAnchor>
        <div style="flex: 1; padding: 0 24px;">
          <div v-for="link in links" :key="link.key" :id="link.key">
            <h2>{{ link.title }}</h2>
            <div style="height: 500px; background: #f5f5f5; margin: 16px 0;">
              {{ link.title }} 的内容区域
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// 嵌套锚点
export const Nested: Story = {
  render: () => ({
    components: { JvAnchor },
    setup() {
      const links = [
        {
          key: 'part1',
          href: '#part1',
          title: '第一部分',
          children: [
            {
              key: 'part1-1',
              href: '#part1-1',
              title: '第一部分-子项1',
            },
            {
              key: 'part1-2',
              href: '#part1-2',
              title: '第一部分-子项2',
            },
          ],
        },
        {
          key: 'part2',
          href: '#part2',
          title: '第二部分',
          children: [
            {
              key: 'part2-1',
              href: '#part2-1',
              title: '第二部分-子项1',
            },
            {
              key: 'part2-2',
              href: '#part2-2',
              title: '第二部分-子项2',
            },
          ],
        },
      ]

      return { links }
    },
    template: `
      <div style="display: flex;">
        <JvAnchor style="width: 200px;">
          <template v-for="link in links" :key="link.key">
            <div :data-anchor="link.key">
              <h2>{{ link.title }}</h2>
              <template v-if="link.children">
                <div v-for="child in link.children" :key="child.key" :data-anchor="child.key">
                  <h3>{{ child.title }}</h3>
                  <div style="height: 300px; background: #f5f5f5; margin: 16px 0;">
                    {{ child.title }} 的内容区域
                  </div>
                </div>
              </template>
            </div>
          </template>
        </JvAnchor>
        <div style="flex: 1; padding: 0 24px;">
          <div v-for="link in links" :key="link.key" :id="link.key">
            <h2>{{ link.title }}</h2>
            <template v-if="link.children">
              <div v-for="child in link.children" :key="child.key" :id="child.key">
                <h3>{{ child.title }}</h3>
                <div style="height: 300px; background: #f5f5f5; margin: 16px 0;">
                  {{ child.title }} 的内容区域
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    `,
  }),
}

// 自定义容器
export const CustomContainer: Story = {
  render: () => ({
    components: { JvAnchor },
    setup() {
      const links = [
        {
          key: 'part1',
          href: '#part1',
          title: '第一部分',
        },
        {
          key: 'part2',
          href: '#part2',
          title: '第二部分',
        },
        {
          key: 'part3',
          href: '#part3',
          title: '第三部分',
        },
      ]

      return { links }
    },
    template: `
      <div style="display: flex;">
        <JvAnchor 
          style="width: 200px;"
          container="#custom-container"
          :affix="false"
        >
          <template v-for="link in links" :key="link.key">
            <div :data-anchor="link.key">
              <h2>{{ link.title }}</h2>
              <div style="height: 500px; background: #f5f5f5; margin: 16px 0;">
                {{ link.title }} 的内容区域
              </div>
            </div>
          </template>
        </JvAnchor>
        <div 
          id="custom-container" 
          style="flex: 1; padding: 0 24px; height: 500px; overflow: auto;"
        >
          <div v-for="link in links" :key="link.key" :id="link.key">
            <h2>{{ link.title }}</h2>
            <div style="height: 500px; background: #f5f5f5; margin: 16px 0;">
              {{ link.title }} 的内容区域
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
