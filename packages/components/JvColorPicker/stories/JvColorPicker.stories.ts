import type { Meta, StoryObj } from '@storybook/vue3'
import JvColorPicker from '../src/JvColorPicker.vue'

const meta = {
  title: '数据录入组件/JvColorPicker',
  component: JvColorPicker,
  tags: ['autodocs'],
  argTypes: {
    'modelValue': {
      control: 'text',
      description: '当前颜色值',
    },
    'disabled': {
      control: 'boolean',
      description: '是否禁用',
    },
    'showAlpha': {
      control: 'boolean',
      description: '是否支持透明度选择',
    },
    'colorFormat': {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: '颜色格式',
    },
    'onUpdate:modelValue': {
      description: '颜色值更新时触发',
    },
    'onChange': {
      description: '颜色值变化时触发',
    },
  },
} satisfies Meta<typeof JvColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    modelValue: '#409EFF',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: '#409EFF',
    disabled: true,
  },
}

export const WithDifferentFormats: Story = {
  render: () => ({
    components: { JvColorPicker },
    template: `
      <div style="display: flex; gap: 20px;">
        <JvColorPicker v-model="hexColor" colorFormat="hex" />
        <JvColorPicker v-model="rgbColor" colorFormat="rgb" />
        <JvColorPicker v-model="hslColor" colorFormat="hsl" />
      </div>
    `,
    data() {
      return {
        hexColor: '#409EFF',
        rgbColor: 'rgb(64, 158, 255)',
        hslColor: 'hsl(210, 100%, 62%)',
      }
    },
  }),
}

export const EventHandling: Story = {
  render: () => ({
    components: { JvColorPicker },
    template: `
      <div>
        <JvColorPicker
          v-model="color"
          @change="handleChange"
        />
        <p>当前颜色: {{ color }}</p>
        <p>最后一次变更: {{ lastChange }}</p>
      </div>
    `,
    data() {
      return {
        color: '#409EFF',
        lastChange: '',
      }
    },
    methods: {
      handleChange(value: string) {
        this.lastChange = value
      },
    },
  }),
}
