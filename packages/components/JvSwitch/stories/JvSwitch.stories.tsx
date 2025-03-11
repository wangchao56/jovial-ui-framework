import type { Meta, StoryObj } from '@storybook/vue3'
import JvSwitch from '@components/JvSwitch'
import { ref } from 'vue'

const meta = {
  title: '数据录入组件/JvSwitch',
  component: JvSwitch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '开关状态',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'x-large'],
      description: '开关大小',
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
    onChange: {
      action: 'changed',
      description: '状态变化时的回调',
    },
    onClick: {
      action: 'clicked',
      description: '点击时的回调',
    },
  },
  args: {
    modelValue: false,
    size: 'medium',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof JvSwitch>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvSwitch },
    setup() {
      const modelValue = ref(args.modelValue)
      return { args, modelValue }
    },
    template: '<jv-switch v-model="modelValue" v-bind="args" />',
  }),
  args: {
    modelValue: false,
  },
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const modelValue = ref(false)
      return { modelValue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">Tiny:</span>
          <jv-switch v-model="modelValue" size="tiny" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">Small:</span>
          <jv-switch v-model="modelValue" size="small" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">Medium:</span>
          <jv-switch v-model="modelValue" size="medium" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">Large:</span>
          <jv-switch v-model="modelValue" size="large" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">X-Large:</span>
          <jv-switch v-model="modelValue" size="x-large" />
        </div>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const value1 = ref(false)
      const value2 = ref(true)
      return { value1, value2 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 120px;">未选中禁用:</span>
          <jv-switch v-model="value1" disabled />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 120px;">选中禁用:</span>
          <jv-switch v-model="value2" disabled />
        </div>
      </div>
    `,
  }),
}

// 加载状态
export const Loading: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const loading = ref(false)
      const value = ref(false)

      // 模拟异步操作
      const handleClick = async () => {
        if (loading.value)
          return
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 2000))
        value.value = !value.value
        loading.value = false
      }

      return {
        value,
        loading,
        handleClick,
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- 受控的loading状态 -->
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 120px;">异步切换:</span>
          <jv-switch 
            v-model="value"
            :loading="loading"
            @click="handleClick"
          />
          <span>当前值: {{ value }}</span>
          <span>加载中: {{ loading }}</span>
        </div>

        <!-- 不同状态组合 -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; gap: 20px; align-items: center;">
            <span style="width: 120px;">未选中加载:</span>
            <jv-switch :model-value="false" loading />
          </div>
          <div style="display: flex; gap: 20px; align-items: center;">
            <span style="width: 120px;">选中加载:</span>
            <jv-switch :model-value="true" loading />
          </div>
          <div style="display: flex; gap: 20px; align-items: center;">
            <span style="width: 120px;">禁用加载:</span>
            <jv-switch :model-value="false" loading disabled />
            <jv-switch :model-value="true" loading disabled />
          </div>
        </div>

        <!-- 不同尺寸 -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; gap: 20px; align-items: center;">
            <span style="width: 120px;">不同尺寸加载:</span>
            <jv-switch size="tiny" loading />
            <jv-switch size="small" loading />
            <jv-switch size="medium" loading />
            <jv-switch size="large" loading />
            <jv-switch size="x-large" loading />
          </div>
        </div>
      </div>
    `,
  }),
}

// 自定义颜色
export const CustomColor: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const value = ref(true)
      return { value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">红色:</span>
          <jv-switch v-model="value" color="#F56C6C" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">绿色:</span>
          <jv-switch v-model="value" color="#67C23A" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">蓝色:</span>
          <jv-switch v-model="value" color="#409EFF" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">黄色:</span>
          <jv-switch v-model="value" color="#E6A23C" />
        </div>
        <div style="display: flex; gap: 20px; align-items: center;">
          <span style="width: 80px;">紫色:</span>
          <jv-switch v-model="value" color="#9C27B0" />
        </div>
      </div>
    `,
  }),
}

// 事件处理
export const Events: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const value = ref(false)
      const clickCount = ref(0)
      const changeCount = ref(0)
      const lastChangeValue = ref(false)

      const handleClick = () => {
        clickCount.value++
      }

      const handleChange = (val: boolean) => {
        changeCount.value++
        lastChangeValue.value = val
      }

      return {
        value,
        clickCount,
        changeCount,
        lastChangeValue,
        handleClick,
        handleChange,
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 20px; align-items: center;">
          <jv-switch 
            v-model="value" 
            @click="handleClick"
            @change="handleChange"
          />
          <span>当前值: {{ value }}</span>
        </div>
        
        <div style="margin-top: 20px;">
          <div>点击次数: {{ clickCount }}</div>
          <div>变更次数: {{ changeCount }}</div>
          <div>最后变更值: {{ lastChangeValue }}</div>
        </div>
      </div>
    `,
  }),
}

// 实际应用场景
export const RealWorldExample: Story = {
  render: () => ({
    components: { JvSwitch },
    setup() {
      const darkMode = ref(false)
      const notifications = ref(true)
      const autoSave = ref(true)

      const toggleTheme = () => {
        // 在实际应用中，这里会切换主题
        darkMode.value = !darkMode.value
      }

      return {
        darkMode,
        notifications,
        autoSave,
        toggleTheme,
      }
    },
    template: `
      <div :style="{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#333',
        transition: 'all 0.3s'
      }">
        <h3>设置面板</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>深色模式</span>
            <jv-switch v-model="darkMode" @change="toggleTheme" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>通知提醒</span>
            <jv-switch v-model="notifications" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>自动保存</span>
            <jv-switch v-model="autoSave" />
          </div>
        </div>
      </div>
    `,
  }),
}
