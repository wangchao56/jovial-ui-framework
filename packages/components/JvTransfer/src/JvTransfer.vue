<script setup lang="ts">
import { JvButton } from '@components/JvButton'
import { createNamespace } from '@jienix/utils'
import { computed, ref } from 'vue'
import JvInput from '../../JvInput'
import { type JvTransferEmits, jvTransferProps } from './JvTransfer'

defineOptions({ name: 'JvTransfer' })
const props = defineProps(jvTransferProps)
const emit = defineEmits<JvTransferEmits>()
const bem = createNamespace('transfer')

const leftQuery = ref('')
const rightQuery = ref('')

const sourceData = computed(() => {
  return props.data.filter(item => !props.modelValue.includes(item.key))
})

const targetData = computed(() => {
  return props.data.filter(item => props.modelValue.includes(item.key))
})

const filteredSourceData = computed(() => {
  if (!props.filterable || !leftQuery.value)
    return sourceData.value
  return sourceData.value.filter(item =>
    item.label.toLowerCase().includes(leftQuery.value.toLowerCase()),
  )
})

const filteredTargetData = computed(() => {
  if (!props.filterable || !rightQuery.value)
    return targetData.value
  return targetData.value.filter(item =>
    item.label.toLowerCase().includes(rightQuery.value.toLowerCase()),
  )
})

const selectedSourceKeys = ref<(string | number)[]>([])
const selectedTargetKeys = ref<(string | number)[]>([])

function transferToRight() {
  const newValue = [...props.modelValue, ...selectedSourceKeys.value]
  emit('update:modelValue', newValue)
  emit('changeRight', newValue)
  selectedSourceKeys.value = []
}
function transferToLeft() {
  const newValue = props.modelValue.filter(key => !selectedTargetKeys.value.includes(key))
  emit('update:modelValue', newValue)
  emit('changeLeft', newValue)
  selectedTargetKeys.value = []
}

function clearQuery(direction: 'left' | 'right') {
  if (direction === 'left') {
    leftQuery.value = ''
  }
  else {
    rightQuery.value = ''
  }
}

defineExpose({
  clearQuery,
})
</script>

<template>
  <div :class="bem.b()">
    <!-- 左侧面板 -->
    <div :class="bem.e('panel')">
      <div :class="bem.e('header')">
        <slot name="left-header">
          {{ titles[0] }}
        </slot>
      </div>

      <div v-if="filterable" :class="bem.e('filter')">
        <JvInput v-model="leftQuery" :placeholder="filterPlaceholder" />
      </div>

      <div :class="bem.e('body')">
        <ul :class="bem.e('list')">
          <li
            v-for="item in filteredSourceData" :key="item.key" :class="[
              bem.e('item'),
              bem.is('disabled', item.disabled),
            ]" @click="!item.disabled && selectedSourceKeys.push(item.key)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>

      <div :class="bem.e('footer')">
        <slot name="left-footer" />
      </div>
    </div>

    <!-- 中间操作按钮 -->
    <div :class="bem.e('buttons')">
      <JvButton icon="$arrowLeft" :disabled="selectedTargetKeys.length === 0 || disabled" @click="transferToLeft" />
      <JvButton icon="$arrowRight" :disabled="selectedSourceKeys.length === 0 || disabled" @click="transferToRight" />
    </div>

    <!-- 右侧面板 -->
    <div :class="bem.e('panel')">
      <div :class="bem.e('header')">
        <slot name="right-header">
          {{ titles[1] }}
        </slot>
      </div>

      <div v-if="filterable" :class="bem.e('filter')">
        <JvInput v-model="rightQuery" :placeholder="filterPlaceholder" />
      </div>

      <div :class="bem.e('body')">
        <ul :class="bem.e('list')">
          <li
            v-for="item in filteredTargetData" :key="item.key" :class="[
              bem.e('item'),
              bem.is('disabled', item.disabled),
            ]" @click="!item.disabled && selectedTargetKeys.push(item.key)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>

      <div :class="bem.e('footer')">
        <slot name="right-footer" />
      </div>
    </div>
  </div>
</template>
