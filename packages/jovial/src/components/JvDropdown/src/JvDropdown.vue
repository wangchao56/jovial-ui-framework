<script setup lang="ts">
import type { ListItem } from '@/components/JvList'
import type { JvPopperInstance } from '@components/JvPopper'
import type { JvDropdownEmits, JvDropdownProps } from './JvDropdown'
import JvPopper from '@components/JvPopper'

import { createNamespace } from '@jovial/utils'
import '../style/style.css'

defineOptions({ name: 'JvDropdown' })
const props = withDefaults(defineProps<JvDropdownProps>(), {
  trigger: 'click',
  placement: 'bottom-start',
  menuOptions: () => [],
})
const emit = defineEmits<JvDropdownEmits>()
const bem = createNamespace('dropdown')
const JvpopperRef = ref<JvPopperInstance>()

const popperOptions = computed(() => ({
  placement: props.placement,
}))
const triggerNode = ref<HTMLElement>()
const visible = ref(false)

function toggleHandle() {
  visible.value = !visible.value
  emit('visibleChange', visible.value)
}
const _listItems = computed<ListItem[]>(() => {
  const transformItem = (item: any): ListItem => {
    return {
      key: item.key,
      type: item.type || 'item',
      title: item.label,
      disabled: item.disabled,
      children: item.children && item.children.length ? item.children.map(transformItem) : [],
    }
  }
  return props.menuOptions ? props.menuOptions.map(transformItem) : []
})

// function handleClickItem(item: ListItem) {
//   if (item.type === 'divider')
//     return
//   visible.value = false
// }
</script>

<template>
  <div :class="bem.b()">
    <div ref="triggerNode" :class="bem.e('trigger')" @click.stop="toggleHandle">
      <slot />
    </div>
    <div :class="bem.e('content')">
      <JvPopper ref="JvpopperRef" v-model="visible" :reference="triggerNode" :options="popperOptions" arrow>
        <!-- <JvList :bordered="false" clickable hoverable tag="menu" @click-item="handleClickItem">
          <JvDropdownChild v-for="item in listItems" :key="item.key" :child="item" />
        </JvList> -->
      </JvPopper>
    </div>
  </div>
</template>
