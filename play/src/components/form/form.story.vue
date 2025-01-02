<script setup lang="ts">
import JvForm from '@jovial/components/form/src/form.vue'
import JvFormItem from '@jovial/components/form/src/form-item.setup'
import { reactive, ref, watchEffect } from 'vue'
import type { FormInstance } from '@jovial/components/form'
import type { InternalRuleItem } from 'async-validator'

const formRef = ref<FormInstance>()

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur']
    },
    {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: ['blur']
    }
  ],
  password: {
    required: true,
    validator: (rule: InternalRuleItem, value: string) => {
      console.log('校验密码', value)
      if (value.length < 6) {
        return false
      }
      return true
    },
    message: '密码长度不能小于六位',
    trigger: ['blur', 'change']
  }
}

const formModel = reactive({
  username: '456',
  password: ''
})

const handleClick = () => {
  formRef.value?.validate((valid, fields) => {
    console.log(valid, fields)
  })
}
</script>

<template>
  <Story title="Form表单组件/form">
    <Variant title="formItem">
      <JvForm ref="formRef" :model="formModel" :rules="rules">
        <JvFormItem prop="username" label="用户名" label-position="left">
          <JvInput v-model="formModel.username"></JvInput>
        </JvFormItem>
        <JvFormItem>
          <JvButton type="primary" @click="handleClick">登录按钮</JvButton>
        </JvFormItem>
      </JvForm>
    </Variant>

    <Variant title="登录表单">
      <JvForm ref="formRef" :model="formModel" :rules="rules">
        <JvFormItem prop="username" label="用户名" label-position="left">
          <JvInput v-model="formModel.username"></JvInput>
        </JvFormItem>
        <JvFormItem prop="password" label="密码" label-position="left">
          <JvInput v-model="formModel.password" type="password"></JvInput>
        </JvFormItem>
        <JvFormItem>
          <JvButton type="primary" @click="handleClick">登录按钮</JvButton>
        </JvFormItem>
      </JvForm>
    </Variant>
  </Story>
</template>
<docs lang="md"></docs>
