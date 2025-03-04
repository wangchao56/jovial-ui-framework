/**
 * Select 组件实现了以下功能：
 * 1. 单选和多选模式
 * 2. 可清空选项
 * 3. 支持搜索过滤
 * 4. 支持选项分组
 * 5. 自定义选项内容
 * 6. 限制标签显示数量
 * 7. 完整的禁用状态
 */

<script setup lang="ts">
import type { JvSelectEmits, JvSelectSlots, SelectOption } from './JvSelect'
import JvIcon from '@components/JvIcon'
import JvTag from '@components/JvTag'
import { createNamespace } from '@jienix/utils'
import { computed, nextTick, ref, watch } from 'vue'
import { jvSelectProps } from './JvSelect'
import '../style/style.css'

defineOptions({ name: 'JvSelect' })

const props = defineProps(jvSelectProps)

const emit = defineEmits<JvSelectEmits>()
defineSlots<JvSelectSlots>()
const bem = createNamespace('select')

// 下拉框显示状态
const visible = ref(false)
// 搜索关键字
const keyword = ref('')
// 选择器容器
const selectRef = ref<HTMLElement | null>(null)
// 下拉框容器
const dropdownRef = ref<HTMLElement | null>(null)

// 选中值的标签
const selectedLabels = computed(() => {
  if (props.multiple) {
    const values = props.modelValue as (string | number)[]
    return props.options
      .filter(option => values.includes(option.value))
      .map(option => option.label)
  }
  else {
    const option = props.options.find(option => option.value === props.modelValue)
    return option ? [option.label] : []
  }
})

// 显示的标签列表
const displayTags = computed(() => {
  if (!props.maxTagCount || selectedLabels.value.length <= props.maxTagCount) {
    return selectedLabels.value
  }
  return [
    ...selectedLabels.value.slice(0, props.maxTagCount),
    `+${selectedLabels.value.length - props.maxTagCount}`,
  ]
})

// 过滤后的选项列表
const filteredOptions = computed(() => {
  if (!keyword.value)
    return props.options

  const search = keyword.value.toLowerCase()
  return props.options.filter(option =>
    option.label.toLowerCase().includes(search)
    || String(option.value).toLowerCase().includes(search),
  )
})

// 分组后的选项列表
const groupedOptions = computed(() => {
  const groups: Record<string, SelectOption[]> = {}

  filteredOptions.value.forEach((option) => {
    const group = option.group || ''
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(option)
  })

  return Object.entries(groups)
})

// 处理选项点击
function handleOptionClick(option: SelectOption) {
  if (option.disabled)
    return

  if (props.multiple) {
    const values = props.modelValue as (string | number)[]
    const index = values.indexOf(option.value)
    const newValue = index > -1
      ? values.filter(v => v !== option.value)
      : [...values, option.value]

    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
  else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    visible.value = false
  }
}

// 处理清空
function handleClear(event: Event) {
  event.stopPropagation()
  const newValue = props.multiple ? [] : ''
  emit('update:modelValue', newValue)
  emit('change', newValue)
  emit('clear')
}

// 处理下拉框显示状态变化
async function handleVisibleChange(value: boolean) {
  if (props.disabled)
    return

  visible.value = value
  emit('visibleChange', value)

  if (value && props.filterable) {
    await nextTick()
    const input = selectRef.value?.querySelector('input')
    input?.focus()
  }
}

// 处理搜索输入
function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  keyword.value = value
}

// 处理标签关闭
function handleTagClose(index: number) {
  const values = props.modelValue as (string | number)[]
  const newValue = values.filter((_, i) => i !== index)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 监听选中值变化，重置搜索关键字
watch(
  () => props.modelValue,
  () => {
    if (props.filterable && !visible.value) {
      keyword.value = ''
    }
  },
)

// 监听可见性变化，重置搜索关键字
watch(visible, (val) => {
  if (!val && props.filterable) {
    keyword.value = ''
  }
})
</script>

<template>
  <div
    ref="selectRef"
    :class="[
      bem.b(),
      bem.is('disabled', disabled),
      bem.is('visible', visible),
      bem.is('clearable', clearable),
      bem.is('multiple', multiple),
    ]"
    @click="handleVisibleChange(!visible)"
  >
    <!-- 选择框 -->
    <div :class="bem.e('selector')">
      <!-- 自定义选中值 -->
      <template v-if="$slots.value">
        <slot
          name="value"
          :value="modelValue"
        />
      </template>

      <!-- 默认选中值展示 -->
      <template v-else>
        <!-- 多选标签 -->
        <template v-if="multiple && selectedLabels.length">
          <JvTag
            v-for="(label, index) in displayTags"
            :key="index"
            :class="bem.e('tag')"
            :closable="!disabled"
            @close="handleTagClose(index)"
          >
            {{ label }}
          </JvTag>
        </template>

        <!-- 单选文本 -->
        <template v-else-if="!multiple && selectedLabels.length">
          <span :class="bem.e('value')">
            {{ selectedLabels[0] }}
          </span>
        </template>

        <!-- 占位符 -->
        <template v-else>
          <span :class="bem.e('placeholder')">
            {{ placeholder }}
          </span>
        </template>
      </template>

      <!-- 搜索输入框 -->
      <input
        v-if="filterable"
        v-model="keyword"
        :class="bem.e('input')"
        :placeholder="selectedLabels.length ? '' : placeholder"
        :disabled="disabled"
        @input="handleInput"
      >
    </div>

    <!-- 清空按钮 -->
    <JvIcon
      v-if="clearable && !disabled && selectedLabels.length"
      name="close-circle"
      :class="bem.e('clear')"
      @click.stop="handleClear"
    />

    <!-- 箭头图标 -->
    <JvIcon
      name="chevron-down"
      :class="[
        bem.e('arrow'),
        bem.is('reverse', visible),
      ]"
    />

    <!-- 下拉面板 -->
    <div
      v-show="visible"
      ref="dropdownRef"
      :class="bem.e('dropdown')"
      :style="{ width: dropdownWidth ? `${dropdownWidth}px` : '' }"
    >
      <!-- 选项列表 -->
      <template v-if="filteredOptions.length">
        <template v-for="[group, options] in groupedOptions">
          <!-- 分组标题 -->
          <div
            v-if="group"
            :key="group"
            :class="bem.e('group')"
          >
            {{ group }}
          </div>

          <!-- 选项 -->
          <div
            v-for="option in options"
            :key="option.value"
            :class="[
              bem.e('option'),
              bem.is('disabled', option.disabled),
              bem.is('selected', multiple
                ? (modelValue as (string | number)[]).includes(option.value)
                : modelValue === option.value,
              ),
            ]"
            @click="handleOptionClick(option)"
          >
            <!-- 自定义选项内容 -->
            <template v-if="$slots.option">
              <slot
                name="option"
                :option="option"
              />
            </template>

            <!-- 默认选项内容 -->
            <template v-else>
              <span :class="bem.e('label')">
                {{ option.label }}
              </span>
              <JvIcon
                v-if="multiple && (modelValue as (string | number)[]).includes(option.value)"
                name="check"
                :class="bem.e('check')"
              />
            </template>
          </div>
        </template>
      </template>

      <!-- 空状态 -->
      <template v-else>
        <div :class="bem.e('empty')">
          <template v-if="$slots.empty">
            <slot name="empty" />
          </template>
          <template v-else>
            暂无数据
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
