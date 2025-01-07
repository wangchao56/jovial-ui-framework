<script setup lang="ts">
import JvEditor from '@jovial/components/editor'
import { ref, watchEffect } from 'vue'
</script>
<template>
  <Story title="editor组件">
    <Variant title="Default">
      <jv-editor></jv-editor>
      <JvEditor></JvEditor>
    </Variant>
  </Story>
</template>
<docs lang="md"></docs>
