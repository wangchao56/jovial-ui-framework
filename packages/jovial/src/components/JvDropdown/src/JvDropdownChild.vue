<script setup lang='ts'>
import type { ListItem } from '@components/JvListItem'
import type { Options, Placement } from '@popperjs/core'
import JvDivider from '@components/JvDivider'
import JvList from '@components/JvList'
import JvListItem from '@components/JvListItem'
import JvTooltip from '@components/JvTooltip'
import { computed } from 'vue'

defineOptions({
  name: 'JvDropdownChild',
})
const props = defineProps<{
  child: ListItem
}>()

// 没有子节点就不需要分割线
const hasChildren = computed(() => props.child.children && props.child.children.length)
const hasDivider = computed(() => props.child.type === 'divider' && !hasChildren.value)
const hasItem = computed(() => props.child.type === 'item' && !hasChildren.value)
const popperOptions: Options = {
  placement: 'right-start' as Placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 0],
      },
    },
  ],
  strategy: 'fixed',
}
</script>

<template>
  <JvDivider v-if="hasDivider" :key="child.key" />
  <JvListItem v-else-if="hasItem" :item="child" />
  <template v-else-if="hasChildren">
    <JvTooltip
      placement="right-start" style="width: 100%;"
      :popper-options="popperOptions"
      :open-delay="200"
      :close-delay="350"
      :arrow="false"
    >
      <JvListItem :item="child" disabled>
        <template #append>
          >
        </template>
      </JvListItem>
      <template #content>
        <JvList :bordered="false" clickable hoverable tag="ul">
          <JvDropdownChild v-for="node in child.children" :key="node.key" :child="node" />
        </JvList>
      </template>
    </JvTooltip>
  </template>
</template>

<style lang='scss' scoped>

</style>
