import type { JvFormInstance } from '@components/JvForm'
import type { Meta, StoryObj } from '@storybook/vue3'
import { JvButton } from '@/components/JvButton'
import JvCard from '@/components/JvCard/src/JvCard.vue'
import JvFormItem from '@components/JvForm/src/form-item.setup'
import JvForm from '@components/JvForm/src/form.vue'
import JvInput from '@components/JvInput/src/input.vue'

const meta: Meta<typeof JvForm> = {
  title: '数据录入组件/JvForm',
  component: JvForm,
  tags: ['autodocs'],
  argTypes: {
    model: {
      control: 'object',
      description: '表单数据对象',
      table: {
        type: { summary: 'Record<string, any>' },
        defaultValue: { summary: '{}' },
      },
    },
    rules: {
      control: 'object',
      description: '表单验证规则',
      table: {
        type: { summary: 'FormRules' },
        defaultValue: { summary: 'undefined' },
      },
    },
    showMessage: {
      control: 'boolean',
      description: '是否显示验证消息',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvCard },
    setup() {
      const formRef = ref<JvFormInstance>()
      const resetForm = () => {
        formRef.value?.resetFields()
      }
      const formData = {
        username: 'jienichao',
        password: 'wang123',
      }
      const formRules = {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
        ],
      }
      const submitForm = () => {
        console.log('表单提交')
        formRef.value?.validate((valid: boolean) => {
          if (valid) {
            console.log('表单验证通过')
          }
        })
      }
      return { formData, formRules, submitForm, resetForm, formRef }
    },
    template: `
      <jv-card width="350px">
        <template #header>
          <h2>默认表单</h2>
        </template>
          <jv-form :model="formData" :rules="formRules" ref="formRef">
            <jv-form-item label="用户名" prop="username">
              <jv-input v-model="formData.username" placeholder="请输入用户名"></jv-input>
            </jv-form-item>
            <jv-form-item label="密码" prop="password">
              <jv-input v-model="formData.password" type="password" placeholder="请输入密码"></jv-input>
            </jv-form-item>
            <jv-button type="primary" @click="submitForm">提交</jv-button> 
            <jv-button type="default" @click="resetForm">重置</jv-button>
          </jv-form>
      </jv-card>
    `,
  }),
  args: {},
  parameters: {
    docs: { description: { component: '表单组件' } },
  },
}
