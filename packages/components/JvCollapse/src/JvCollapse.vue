<script setup lang="ts">
import type { NameType } from './JvCollapseItem'
import { createNamespace } from '@jienix/utils'
import { provide, ref } from 'vue'
import { collapseContextKey, type JvCollapseEmits, type JvCollapseProps } from './JvCollapse'

defineOptions({ name: 'JvCollapse', inheritAttrs: false })
const props = withDefaults(defineProps<JvCollapseProps>(), {
  accordion: false,
})
const emit = defineEmits<JvCollapseEmits>()
const bem = createNamespace('collapse')
const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})

if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion 开启只能传一个值!')
}

function handleItemClick(item: NameType) {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  }
  else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
    // 存在
      activeNames.value.splice(index, 1)
    }
    else {
      activeNames.value.push(item)
    }
  }
  emit('update:modelValue', activeNames.value)
  emit('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div :class="[bem.b()]">
    <slot />
  </div>
</template>
