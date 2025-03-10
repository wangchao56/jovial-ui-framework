# JvCollapse 折叠面板

JvCollapse 组件用于将内容区域折叠/展开，节省页面空间。

## 组件特点

这是一个功能完善的折叠面板组件，具有以下主要特点：

### 基本功能

1. **多面板管理**

   - 支持同时展开多个面板
   - 支持手风琴模式（一次只能展开一个面板）
   - 可通过 v-model 双向绑定控制面板展开状态

2. **面板状态**

   - 支持禁用特定面板
   - 提供面板展开/折叠的过渡动画
   - 支持通过 name 属性唯一标识每个面板

3. **自定义内容**

   - 支持自定义面板标题（通过 title 插槽）
   - 支持在面板内容中嵌套任意组件
   - 支持嵌套折叠面板，实现多层级内容展示

4. **事件处理**
   - 提供 change 事件，在面板状态变化时触发
   - 支持监听面板展开/折叠状态

## 组件用法

### 基础用法

```vue
<JvCollapse v-model="activeNames">
  <JvCollapseItem name="1" title="面板一">
    这是第一个面板的内容
  </JvCollapseItem>
  <JvCollapseItem name="2" title="面板二">
    这是第二个面板的内容
  </JvCollapseItem>
</JvCollapse>

<script setup>
import { ref } from 'vue'

const activeNames = ref(['1']) // 默认展开第一个面板
</script>
```

### 手风琴模式

```vue
<JvCollapse v-model="activeName" accordion>
  <JvCollapseItem name="1" title="面板一">
    这是第一个面板的内容
  </JvCollapseItem>
  <JvCollapseItem name="2" title="面板二">
    这是第二个面板的内容
  </JvCollapseItem>
</JvCollapse>

<script setup>
import { ref } from 'vue'

const activeName = ref(['1']) // 在手风琴模式下，数组中只会有一个值
</script>
```

### 禁用特定面板

```vue
<JvCollapse v-model="activeNames">
  <JvCollapseItem name="1" title="面板一">
    这是第一个面板的内容
  </JvCollapseItem>
  <JvCollapseItem name="2" title="面板二" disabled>
    这是第二个面板的内容（禁用状态）
  </JvCollapseItem>
</JvCollapse>
```

### 自定义标题

```vue
<JvCollapse v-model="activeNames">
  <JvCollapseItem name="1">
    <template #title>
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 8px;">🔍</span>
        <span>自定义标题</span>
      </div>
    </template>
    这是面板的内容
  </JvCollapseItem>
</JvCollapse>
```

## API 参考

### JvCollapse Props

| 属性名     | 类型       | 默认值 | 说明                                |
| ---------- | ---------- | ------ | ----------------------------------- |
| modelValue | NameType[] | []     | 当前激活的面板，支持v-model双向绑定 |
| accordion  | boolean    | false  | 是否开启手风琴模式                  |

### JvCollapse Events

| 事件名            | 参数                 | 说明                   |
| ----------------- | -------------------- | ---------------------- |
| update:modelValue | (values: NameType[]) | 面板激活状态变化时触发 |
| change            | (values: NameType[]) | 面板激活状态变化时触发 |

### JvCollapseItem Props

| 属性名   | 类型             | 默认值 | 说明                   |
| -------- | ---------------- | ------ | ---------------------- |
| name     | string \| number | -      | 面板唯一标识符（必填） |
| title    | string           | -      | 面板标题               |
| disabled | boolean          | false  | 是否禁用面板           |

### JvCollapseItem Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 面板内容       |
| title   | 自定义面板标题 |
