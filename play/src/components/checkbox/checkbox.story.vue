<script setup lang="ts">
import JvCheckbox from '@jovial/components/checkbox/src/checkbox.vue'
import { ref, watchEffect } from 'vue'

const checked = ref(false)

watchEffect(() => {
  console.log(checked.value, '使用')
})
</script>

<template>
  <Story title="基础组件/CheckBox多选组件">
    <Variant title="Default">
      <jv-checkbox
        v-model="checked"
        :disabled="false"
        :indeterminate="false"
        label="节点"
      ></jv-checkbox>
    </Variant>
  </Story>
</template>

<docs lang="md"></docs>
