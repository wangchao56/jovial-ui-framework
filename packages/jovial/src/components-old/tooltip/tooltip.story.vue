<script setup lang="ts">
import JvTooltip from '@jovial/components/tooltip'
// import { ref, watchEffect } from 'vue'
</script>

<template>
  <Story title="反馈组件/tooltip组件">
    <Variant title="Default">
      <JvTooltip trigger="click">
        <template #content>
          这是一个tooltip组件
        </template>
      </JvTooltip>

      <JvTooltip trigger="click" content="这是一个tooltip组件">
        这是一个tooltip组件
      </JvTooltip>
      <JvTooltip content="这是一个tooltip组件">
        这是一个tooltip组件
      </JvTooltip>
    </Variant>
  </Story>
</template>

<docs lang="md"></docs>
