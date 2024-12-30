<script setup lang="ts">
import { ref, watch } from 'vue'
import JvTree, { type TreeOptions } from '@jovial/components/tree'
/**
 * 创建数据
 */
function createData(level: number, parentKey = ''): TreeOptions[] {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, index) => {
    const key = parentKey + level + index
    return {
      id: key,
      value: createLabel(level),
      children: createData(level - 1, key),
      disabled: level == 1
    }
  })
}

function createAsyncData() {
  return [
    {
      key: '1',
      label: nextLabel(),
      isLeaf: false
    },
    {
      key: '2',
      label: nextLabel(),
      isLeaf: false
    }
  ]
}

function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return `一生二`
  if (level === 2) return `二生三`
  if (level === 1) return `三生万物`

  return ''
}

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) {
    return 'Out of Tao, One is born'
  }
  if (currentLabel === 'Out of Tao, One is born') {
    return 'Out of One, Two'
  }
  if (currentLabel === 'Out of One, Two') {
    return 'Out of Two, Three'
  }
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return '' // 处理未知标签的情况
}

function handleLoadData(node: TreeOptions): Promise<TreeOptions[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: node.key + nextLabel(node.label as string),
          label: nextLabel(node.label as string),
          isLeaf: false
        }
      ])
    }, 2000)
  })
}

const data = ref(createData(4))
const asyncData = ref(createAsyncData())

const selectedKeys = ref([])
watch(
  () => selectedKeys.value,
  () => {
    console.log('selectedKeys', selectedKeys)
  }
)
</script>

<template>
  <Story title="Tree 树形控件">
    <Variant title="默认">
      <jv-tree
        :data="data"
        label-field="value"
        key-field="id"
        children-field="children"
        :default-expanded-keys="['40', '41']"
      ></jv-tree>
    </Variant>
    <Variant title="异步加载">
      <jv-tree
        :data="asyncData"
        label-field="label"
        key-field="key"
        children-field="children"
        :on-load="handleLoadData"
      ></jv-tree>
    </Variant>
    <Variant title="可选择的">
      <jv-tree
        :data="asyncData"
        label-field="label"
        key-field="key"
        children-field="children"
        :on-load="handleLoadData"
        v-model:selected-keys="selectedKeys"
        selectable
      ></jv-tree>
    </Variant>
    <Variant title="多选">
      <jv-tree
        :data="asyncData"
        label-field="label"
        key-field="key"
        children-field="children"
        :on-load="handleLoadData"
        v-model:selected-keys="selectedKeys"
        selectable
        multiple
      ></jv-tree>
    </Variant>
    <Variant title="禁用">
      <jv-tree
        :data="data"
        label-field="value"
        key-field="id"
        children-field="children"
        v-model:selected-keys="selectedKeys"
        selectable
      ></jv-tree>
    </Variant>
    <Variant title="自定以节点">
      <jv-tree
        :data="data"
        label-field="value"
        key-field="id"
        children-field="children"
        v-model:selected-keys="selectedKeys"
        selectable
      >
        <template #default="{ node }">
          <div>{{ node.key || 'key' }} - {{ node.label || '' }}</div>
        </template>
      </jv-tree>
    </Variant>
  </Story>
</template>

<docs lang="md">
# 完善 `JvTree` 组件的文档说明

## 1. 引言

`JvTree` 是一个用于展示层级关系的树形控件组件，支持节点的展开和折叠。本文档旨在详细介绍 `JvTree` 组件的使用方法和参数配置，帮助开发者更好地理解和使用该组件。

## 2. 参数说明

`JvTree` 组件提供了多个参数用于配置树形控件的行为和外观。以下是参数的详细说明：

| 参数名称                | 说明                                                 | 类型         | 默认值     |
| ----------------------- | ---------------------------------------------------- | ------------ | ---------- |
| `data`                  | 树形数据数组，每个元素代表一个节点                   | `TreeNode[]` | `[]`       |
| `label-field`           | 节点标签字段名，用于指定节点显示的文本内容           | `string`     | `label`    |
| `key-field`             | 节点唯一标识字段名，用于唯一标识每个节点             | `string`     | `key`      |
| `children-field`        | 子节点字段名，用于指定子节点的数组字段               | `string`     | `children` |
| `default-expanded-keys` | 默认展开的节点唯一标识数组，用于控制节点初始展开状态 | `string[]`   | `[]`       |

## 3. 使用示例

以下是一个使用 `JvTree` 组件的示例代码：

```vue
<template>
  <Story title="Tree 树形控件">
    <Variant title="默认">
      <jv-tree
        :data="treeData"
        label-field="name"
        key-field="id"
        children-field="children"
        :default-expanded-keys="['1', '2']"
      ></jv-tree>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JvTree from '@jovial/components/tree'

// 示例树形数据
const treeData = ref([
  {
    id: '1',
    name: '节点1',
    children: [
      {
        id: '1-1',
        name: '子节点1-1'
      },
      {
        id: '1-2',
        name: '子节点1-2',
        children: [
          {
            id: '1-2-1',
            name: '孙子节点1-2-1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '节点2'
  }
])
</script>
```

## 4. 注意事项

- 确保树形数据的格式正确，即每个节点对象应包含 `id`、`name`（或其他指定的 `label-field` 字段）以及可选的 `children` 数组。
- `default-expanded-keys` 参数应包含树形数据中节点的唯一标识，以控制节点的初始展开状态。
- `show-checkbox`、`show-icon` 和 `show-line` 参数可根据实际需求进行配置，以增强树形控件的视觉效果和交互性。

通过以上说明和示例代码，希望能够帮助开发者更好地理解和使用 `JvTree` 组件。
</docs>
