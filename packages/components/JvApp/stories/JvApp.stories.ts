import type { Meta, StoryObj } from '@storybook/vue3'
import { JvButton } from '@components/JvButton'
import { useTheme } from '@jienix/jovial-theme'
import { ref } from 'vue'
import JvApp from '../src/JvApp.vue'

const meta = {
  title: '配置组件/JvApp',
  component: JvApp,
  tags: ['autodocs'],
  argTypes: {
    themeTransition: {
      control: 'boolean',
      description: '是否启用主题切换动画',
    },
  },
} satisfies Meta<typeof JvApp>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: args => ({
    components: { JvApp, JvButton },
    setup() {
      const theme = useTheme()
      const currentTheme = ref('light')

      const toggleTheme = () => {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
        theme.switch(currentTheme.value)
      }

      return { args, currentTheme, toggleTheme }
    },
    template: `
      <JvApp v-bind="args">
        <div style="padding: 20px;">
          <JvButton @click="toggleTheme">
            切换主题 (当前: {{ currentTheme }})
          </JvButton>
          <div style="margin-top: 20px;">
            这是一些示例内容，用于展示主题切换效果。
          </div>
        </div>
      </JvApp>
    `,
  }),
  args: {
    themeTransition: true,
  },
}

export const WithoutTransition: Story = {
  render: args => ({
    components: { JvApp, JvButton },
    setup() {
      const theme = useTheme()
      const currentTheme = ref('light')

      const toggleTheme = () => {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
        theme.switch(currentTheme.value)
      }

      return { args, currentTheme, toggleTheme }
    },
    template: `
      <JvApp v-bind="args">
        <div style="padding: 20px;">
          <JvButton @click="toggleTheme">
            切换主题 (当前: {{ currentTheme }})
          </JvButton>
          <div style="margin-top: 20px;">
            这是一些示例内容，没有主题切换动画效果。
          </div>
        </div>
      </JvApp>
    `,
  }),
  args: {
    themeTransition: false,
  },
}
