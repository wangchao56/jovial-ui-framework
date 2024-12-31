<script setup lang="ts">
import JvInput from '@jovial/components/input/src/input.vue'
import { logEvent } from 'histoire/client'
import { ref, watchEffect } from 'vue'

const username = ref('你好232')
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
          <span>前缀</span>
        </template>
        <template #suffix>
          <span>后缀</span>
        </template>

        <template #append>
          <span>后置</span>
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
  </Story>
</template>
<docs lang="md"></docs>
