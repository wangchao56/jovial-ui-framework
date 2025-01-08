<script setup lang="ts">
import JvCheckbox from '@jovial/components/checkbox/src/checkbox.vue'
import { ref, watchEffect } from 'vue'

const checked = ref(false)
</script>

<template>
  <Story title="基础组件/CheckBox多选组件">
    <Variant title="Default">
      <JvCheckbox
        v-model="checked"
        :disabled="false"
        :indeterminate="false"
        label="节点"
      />
    </Variant>
  </Story>
</template>

<docs lang="md"></docs>
