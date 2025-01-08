<script setup lang="ts">
import JvInput from '@jovial/components/input/src/input.vue'
import {
  AlternateEmailOutlined,
  TextsmsTwotone,
  VerifiedUserTwotone,
} from '@vicons/material'
import { logEvent } from 'histoire/client'
import { reactive, ref } from 'vue'

const username = ref('你好232')

const model = reactive({
  username: '你好232',
  password: '',
  email: '',
  agree: false,
})
</script>

<template>
  <Story title="数据录入组件/input">
    <Variant title="Default">
      <JvInput
        v-model="username"
        placeholder="请输入内容"
        @blur="logEvent('blur', 'blur event triggered!')"
        @focus="logEvent('focus', 'focus event triggered!')"
      >
        <template #prepend>
          <span>前置</span>
        </template>
        <template #prefix>
          <JvIcon>
            <VerifiedUserTwotone />
          </JvIcon>
        </template>
        <template #suffix>
          <JvIcon>
            <AlternateEmailOutlined />
          </JvIcon>
        </template>
        <template #append>
          <span>后置</span>
        </template>
      </JvInput>

      <JvInput
        v-model="username"
        placeholder="请输入内容"
        @blur="logEvent('blur', 'blur event triggered!')"
        @focus="logEvent('focus', 'focus event triggered!')"
      >
        <template #prepend>
          <span>短信验证</span>
        </template>
        <template #prefix>
          <JvIcon>
            <TextsmsTwotone />
          </JvIcon>
        </template>
        <template #append>
          <JvButton variant="tonal">
            发送验证码
          </JvButton>
        </template>
      </JvInput>
    </Variant>
    <Variant title="密码输入框">
      <JvInput
        v-model="username"
        type="password"
        placeholder="请输入内容"
        @blur="logEvent('blur', 'blur event triggered!')"
        @focus="logEvent('focus', 'focus event triggered!')"
      >
        <template #prepend>
          <span>密码</span>
        </template>
        <template #prefix>
          <JvIcon>
            <PasswordRound />
          </JvIcon>
        </template>
        <template #append>
          <span>确认</span>
        </template>
      </JvInput>
    </Variant>
    <Variant title="可清除的">
      <JvInput
        v-model="username"
        type="text"
        clearable
        placeholder="请输入内容"
        @blur="logEvent('blur', 'blur event triggered!')"
        @focus="logEvent('focus', 'focus event triggered!')"
      >
        <template #prepend>
          <span>前置</span>
        </template>
        <template #prefix>
          <span>前缀</span>
        </template>

        <template #append>
          <span>后置</span>
        </template>
      </JvInput>
    </Variant>
    <Variant title="登录表单示例">
      <div class="space">
        <JvInput
          v-model="model.username"
          type="text"
          clearable
          placeholder="请输入内容"
          @blur="logEvent('blur', 'blur event triggered!')"
          @focus="logEvent('focus', 'focus event triggered!')"
        >
          <template #prepend>
            <span>用户名</span>
          </template>
          <template #prefix>
            <JvIcon>
              <VerifiedUserTwotone />
            </JvIcon>
          </template>
        </JvInput>
        <JvInput
          v-model="model.password"
          type="password"
          clearable
          placeholder="请输入内容"
          @blur="logEvent('blur', 'blur event triggered!')"
          @focus="logEvent('focus', 'focus event triggered!')"
        >
          <template #prepend>
            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
          </template>
          <template #prefix>
            <JvIcon>
              <PasswordRound />
            </JvIcon>
          </template>
        </JvInput>
        <JvButton type="primary" block @click="logEvent('click', model)">
          登录
        </JvButton>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.space {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  width: 380px;
}
</style>

<docs lang="md"></docs>
