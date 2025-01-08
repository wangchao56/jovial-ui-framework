<script setup lang="ts">
import JvPopperVue from '@jovial/components/popper/src/popper.vue'
import { ref } from 'vue'

const visible = ref(false)
function toggle() {
  visible.value = !visible.value
}
</script>

<template>
  <Story title="反馈组件/popper组件">
    <Variant title="Default">
      <!-- <JvPopper :visible="true"> 测试popper </JvPopper> -->
      <JvPopperVue :visible="visible" placement="right" :offset="20">
        <template #activator="{ prop }">
          <JvButton :prop="prop" @click="toggle">
            按钮
          </JvButton>
        </template>
        测试popper
        <template #content>
          popper 内容
        </template>
      </JvPopperVue>
    </Variant>
  </Story>
</template>

<docs lang="md"></docs>
