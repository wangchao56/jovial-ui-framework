<script setup lang="ts">
import type { JvMenuEmits, JvMenuProps, MenuItem } from './JvMenu'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { computed, provide, ref, toRefs, watch } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvMenu' })

const props = withDefaults(defineProps<JvMenuProps>(), {
  mode: 'vertical',
  modelValue: '',
  defaultOpenKeys: () => [],
  trigger: 'hover',
  items: () => [],
  collapsed: false,
})

const emit = defineEmits<JvMenuEmits>()
const bem = createNamespace('menu')

// 当前展开的子菜单 keys
const openKeys = ref<string[]>(props.defaultOpenKeys)

// 提供给子组件的上下文
provide('menuContext', {
  mode: toRefs(props).mode,
  trigger: toRefs(props).trigger,
  collapsed: toRefs(props).collapsed,
  openKeys,
  selectedKey: toRefs(props).modelValue,
  onSelect: (key: string, item: MenuItem) => {
    emit('update:modelValue', key)
    emit('select', key, item)
  },
  onOpenChange: (key: string, open: boolean) => {
    const keys = openKeys.value.slice()
    const index = keys.indexOf(key)

    if (open && index === -1) {
      keys.push(key)
    }
    else if (!open && index > -1) {
      keys.splice(index, 1)
    }

    openKeys.value = keys
    emit('openChange', keys)
  },
})

// 计算菜单样式
const menuStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.mode === 'vertical' && props.collapsed) {
    style.width = '80px'
  }

  return style
})

// 判断菜单项是否被选中
function isSelected(key: string) {
  return key === props.modelValue
}

// 判断子菜单是否展开
function isOpen(key: string) {
  return openKeys.value.includes(key)
}

// 处理菜单项点击
function handleItemClick(item: MenuItem) {
  if (!item.disabled) {
    emit('update:modelValue', item.key)
    emit('select', item.key, item)
  }
}

// 处理子菜单点击
function handleSubMenuClick(key: string) {
  if (props.trigger === 'click') {
    const isCurrentlyOpen = openKeys.value.includes(key)
    emit('openChange', isCurrentlyOpen ? openKeys.value.filter(k => k !== key) : [...openKeys.value, key])
  }
}

// 监听折叠状态变化
watch(() => props.collapsed, (val) => {
  if (val) {
    openKeys.value = []
  }
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(mode),
      bem.is('collapsed', collapsed),
    ]"
    :style="menuStyle"
  >
    <template v-for="item in items" :key="item.key">
      <!-- 自定义菜单项 -->
      <template v-if="$slots.item">
        <slot
          name="item"
          :item="item"
        />
      </template>

      <!-- 默认菜单项渲染 -->
      <template v-else>
        <!-- 普通菜单项 -->
        <div
          v-if="!item.children"
          :class="[
            bem.e('item'),
            bem.is('selected', isSelected(item.key)),
            bem.is('disabled', item.disabled),
          ]"
          @click="handleItemClick(item)"
        >
          <JvIcon
            v-if="item.icon"
            :name="item.icon"
            :class="bem.e('icon')"
          />
          <span
            v-if="!collapsed"
            :class="bem.e('label')"
          >
            {{ item.label }}
          </span>
        </div>

        <!-- 子菜单 -->
        <div
          v-else
          :class="[
            bem.e('sub-menu'),
            bem.is('open', isOpen(item.key)),
          ]"
        >
          <!-- 子菜单标题 -->
          <div
            :class="bem.e('sub-title')"
            @click="handleSubMenuClick(item.key)"
          >
            <JvIcon
              v-if="item.icon"
              :name="item.icon"
              :class="bem.e('icon')"
            />
            <template v-if="!collapsed">
              <span :class="bem.e('label')">
                {{ item.label }}
              </span>
              <JvIcon
                :name="isOpen(item.key) ? 'chevron-up' : 'chevron-down'"
                :class="bem.e('arrow')"
              />
            </template>
          </div>

          <!-- 子菜单项 -->
          <div :class="bem.e('sub-items')">
            <template
              v-for="child in item.children"
              :key="child.key"
            >
              <!-- 递归渲染子菜单 -->
              <div
                v-if="child.children"
                :class="[
                  bem.e('sub-menu'),
                  bem.is('open', isOpen(child.key)),
                ]"
              >
                <div
                  :class="bem.e('sub-title')"
                  @click="handleSubMenuClick(child.key)"
                >
                  <JvIcon
                    v-if="child.icon"
                    :name="child.icon"
                    :class="bem.e('icon')"
                  />
                  <template v-if="!collapsed">
                    <span :class="bem.e('label')">
                      {{ child.label }}
                    </span>
                    <JvIcon
                      :name="isOpen(child.key) ? 'chevron-up' : 'chevron-down'"
                      :class="bem.e('arrow')"
                    />
                  </template>
                </div>
                <div :class="bem.e('sub-items')">
                  <div
                    v-for="grandChild in child.children"
                    :key="grandChild.key"
                    :class="[
                      bem.e('item'),
                      bem.is('selected', isSelected(grandChild.key)),
                      bem.is('disabled', grandChild.disabled),
                    ]"
                    @click="handleItemClick(grandChild)"
                  >
                    <JvIcon
                      v-if="grandChild.icon"
                      :name="grandChild.icon"
                      :class="bem.e('icon')"
                    />
                    <span
                      v-if="!collapsed"
                      :class="bem.e('label')"
                    >
                      {{ grandChild.label }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 普通子菜单项 -->
              <div
                v-else
                :class="[
                  bem.e('item'),
                  bem.is('selected', isSelected(child.key)),
                  bem.is('disabled', child.disabled),
                ]"
                @click="handleItemClick(child)"
              >
                <JvIcon
                  v-if="child.icon"
                  :name="child.icon"
                  :class="bem.e('icon')"
                />
                <span
                  v-if="!collapsed"
                  :class="bem.e('label')"
                >
                  {{ child.label }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
