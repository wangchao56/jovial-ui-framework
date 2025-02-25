<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import JvSelect from '../../JvSelect'
import JvTree from '../../JvTree'
import { type JvTreeSelectEmits, jvTreeSelectProps } from './JvTreeSelect'

defineOptions({ name: 'JvTreeSelect' })
const props = defineProps(jvTreeSelectProps)
defineEmits<JvTreeSelectEmits>()
const bem = createNamespace('treeSelect')

const visible = ref(false)
const selectedValue = useModel(props, 'modelValue')

function handleTreeSelect(node: any) {
  if (props.multiple) {
    // 多选逻辑
    const value = Array.isArray(selectedValue.value) ? [...selectedValue.value] : []
    const index = value.indexOf(node[props.valueKey])
    if (index > -1) {
      value.splice(index, 1)
    }
    else {
      value.push(node[props.valueKey])
    }
    selectedValue.value = value
  }
  else {
    // 单选逻辑
    selectedValue.value = node[props.valueKey]
    visible.value = false
  }
}

function clear() {
  selectedValue.value = props.multiple ? [] : ''
}

defineExpose({
  clear,
})
</script>

<template>
  <div :class="bem.b()">
    <JvSelect
      :model-value="selectedValue"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder"
      @clear="clear"
    >
      <template #dropdown>
        <JvTree
          :data="data"
          :value-key="valueKey"
          :label-key="labelKey"
          :children-key="childrenKey"
          @node-click="handleTreeSelect"
        />
      </template>
    </JvSelect>
  </div>
</template>
