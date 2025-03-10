<script setup lang="ts">
import type { ListItem } from './types'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import JvListChildren from './JvListChildren.vue'
import { jvListGroupEmits, jvListGroupProps } from './types'

defineOptions({
  name: 'JvListGroup',
  inheritAttrs: false,
})

const props = defineProps(jvListGroupProps)
const emit = defineEmits(jvListGroupEmits)

const bem = createNamespace('list-group')

const isExpanded = ref(props.expanded)

watch(() => props.expanded, (val) => {
  isExpanded.value = val
})

function toggleExpand() {
  isExpanded.value = !isExpanded.value
  emit('update:expanded', isExpanded.value)
}

const children = computed<ListItem[]>(() => {
  return props.item.children || []
})
</script>

<template>
  <li :class="bem.b()">
    <div :class="bem.e('header')" @click="toggleExpand">
      <div :class="bem.e('title')">
        {{ props.title }}
      </div>
      <div :class="bem.e('action')">
        <JvIcon
          :icon="isExpanded ? props.collapseIcon : props.expandIcon"
          :class="[bem.e('icon'), { 'is-expanded': isExpanded }]"
        />
      </div>
    </div>
    <div v-show="isExpanded" :class="bem.e('children')">
      <ul>
        <JvListChildren v-for="child in children" :key="child.key" :item="child" :level="1" :type="child.type" />
      </ul>
    </div>
  </li>
</template>

<style lang="scss">
.jv-list-group {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: rgb(0 0 0 / 4%);
    }
  }

  &__title {
    font-weight: 500;
  }

  &__icon {
    transition: transform 0.3s ease;

    &.is-expanded {
      transform: rotate(180deg);
    }
  }

  &__children {
    padding-left: 16px;
  }
}
</style>
