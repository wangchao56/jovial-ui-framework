import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/JvButton/src/JvButton.vue'
import JvTooltip from '@components/JvTooltip/src/JvTooltip.vue'
import { ref } from 'vue'

const meta: Meta<typeof JvTooltip> = {
  title: '反馈组件/JvTooltip',
  component: JvTooltip,
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'radio',
      options: ['hover', 'click', 'focus', 'contextmenu'],
    },
    openDelay: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    closeDelay: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    trigger: 'hover',
    openDelay: 100,
    closeDelay: 300,
  },
}

export default meta

// 基础用例
export const Basic: StoryObj<typeof JvTooltip> = {
  render: args => ({
    components: { JvTooltip, JvButton },
    setup() {
      return { args }
    },
    template: `
      <div class="demo-box">
        <JvTooltip v-bind="args">
          <JvButton>Hover Me</JvButton>
        </JvTooltip>
      </div>
    `,
  }),
}

// 性能优化用例
export const PerformanceOptimized: StoryObj<typeof JvTooltip> = {
  render: () => ({
    components: { JvTooltip, JvButton },
    setup() {
      const dynamicContent = ref('Dynamic Content')
      return { dynamicContent }
    },
    template: `
      <div class="demo-grid">
        <JvTooltip 
          v-for="i in 50" 
          :key="i" 
          :content="'Tooltip ' + i"
          popper-class="optimized-popper"
          :open-delay="50"
          :close-delay="150"
        >
          <JvButton class="demo-item">Item {{ i }}</JvButton>
        </JvTooltip>
      </div>
    `,
  }),
}

// 指令用法示例
export const DirectiveUsage: StoryObj = {
  render: () => ({
    template: `
      <div class="demo-box">
        <button v-tooltip:right="'Directive Tooltip'" class="demo-btn">
          Directive Example
        </button>
      </div>
    `,
  }),
}
