<script lang="ts" setup>
import { useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'

defineOptions({ name: 'JvLoadingBar', inheritAttrs: false })

withDefaults(
  defineProps<{
    percentage?: number
    type?: 'primary' | 'success' | 'warning' | 'error'
    height?: number | string
    active?: boolean
    strokeWidth?: number
    shadow?: boolean
  }>(),
  {
    percentage: 0,
    type: 'primary',
    height: 2,
    active: false,
    strokeWidth: 2,
    shadow: true,
  },
)

const bem = createNamespace('loading-bar')
const theme = useTheme()
</script>

<template>
  <Transition mode="out-in">
    <Teleport to="body">
      <div
        :class="[
          bem.b(),
          bem.m(type),
          {
            [bem.m('active')]: active,
            [bem.m('shadow')]: shadow,
          },
          theme.themeClasses.value,
        ]"
      >
        <!-- 轨道 -->
        <p :class="bem.e('tract')">
          <!-- 轨精度 -->
          <span :class="bem.e('thumb')" />
        </p>
      </div>
    </Teleport>
  </Transition>
</template>
