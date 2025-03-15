import type { Meta, StoryObj } from '@storybook/vue3'
import { JvAside, JvContainer, JvFooter, JvHeader, JvMain } from '../index'

const meta = {
  title: '布局组件/PageContainer 页面容器',
  component: JvContainer,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '容器排列方向',
    },
    border: {
      control: 'boolean',
      description: '是否显示边框',
    },
    headerHeight: {
      control: 'text',
      description: '头部高度',
    },
    asideWidth: {
      control: 'text',
      description: '侧边栏宽度',
    },
    footerHeight: {
      control: 'text',
      description: '底部高度',
    },
  },
} satisfies Meta<typeof JvContainer>

export default meta
type Story = StoryObj<typeof meta>

// 基础布局
export const Basic: Story = {
  render: args => ({
    components: { JvContainer, JvHeader, JvAside, JvMain, JvFooter },
    setup() {
      return { args }
    },
    template: `
      <JvContainer v-bind="args">
        <JvHeader>Header</JvHeader>
        <JvMain>Main</JvMain>
        <JvFooter>Footer</JvFooter>
      </JvContainer>
    `,
  }),
  args: {
    direction: 'vertical',
    border: true,
  },
}

// 带侧边栏的布局
export const WithAside: Story = {
  render: args => ({
    components: { JvContainer, JvHeader, JvAside, JvMain, JvFooter },
    setup() {
      return { args }
    },
    template: `
      <JvContainer v-bind="args">
        <JvHeader>Header</JvHeader>
        <JvContainer>
          <JvAside>Aside</JvAside>
          <JvMain>Main</JvMain>
        </JvContainer>
        <JvFooter>Footer</JvFooter>
      </JvContainer>
    `,
  }),
  args: {
    border: true,
  },
}

// 侧边栏在右侧的布局
export const AsideRight: Story = {
  render: args => ({
    components: { JvContainer, JvHeader, JvAside, JvMain, JvFooter },
    setup() {
      return { args }
    },
    template: `
      <JvContainer v-bind="args">
        <JvHeader>Header</JvHeader>
        <JvContainer>
          <JvMain>Main</JvMain>
          <JvAside>Aside</JvAside>
        </JvContainer>
        <JvFooter>Footer</JvFooter>
      </JvContainer>
    `,
  }),
  args: {
    border: true,
  },
}

// 复杂布局
export const Complex: Story = {
  render: args => ({
    components: { JvContainer, JvHeader, JvAside, JvMain, JvFooter },
    setup() {
      return { args }
    },
    template: `
      <JvContainer v-bind="args">
        <JvAside>Aside</JvAside>
        <JvContainer>
          <JvHeader>Header</JvHeader>
          <JvMain>Main</JvMain>
          <JvFooter>Footer</JvFooter>
        </JvContainer>
      </JvContainer>
    `,
  }),
  args: {
    border: true,
  },
}
