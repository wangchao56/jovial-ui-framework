# JvRadio 单选框组件

JvRadio 是一个单选框组件，用于在多个选项中选择一个选项。

## 基本用法

```vue
<script setup>
import { ref } from 'vue'

const selectedValue = ref('1')
</script>

<template>
  <JvRadioGroup v-model="selectedValue" legend="请选择一个选项">
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 禁用状态

可以设置 `disabled` 属性来禁用单选框。

```vue
<template>
  <JvRadioGroup v-model="selectedValue">
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" disabled />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

也可以禁用整个单选框组：

```vue
<template>
  <JvRadioGroup v-model="selectedValue" disabled>
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 垂直布局

设置 `column` 属性可以使单选框垂直排列。

```vue
<template>
  <JvRadioGroup v-model="selectedValue" column>
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 内联布局

设置 `inline` 属性可以使单选框内联排列。

```vue
<template>
  <JvRadioGroup v-model="selectedValue" inline>
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 带边框样式

设置 `bordered` 属性可以为单选框组添加边框样式。

```vue
<template>
  <JvRadioGroup v-model="selectedValue" bordered legend="带边框的单选框组">
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 紧凑模式

设置 `compact` 属性可以使单选框组使用紧凑布局。

```vue
<template>
  <JvRadioGroup v-model="selectedValue" compact legend="紧凑模式">
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 组合使用

可以组合使用多个属性来实现不同的效果。

```vue
<template>
  <JvRadioGroup v-model="selectedValue" bordered column legend="带边框的垂直布局">
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 自定义标题

可以通过 `legend` 属性或 `legend` 插槽自定义标题。

```vue
<template>
  <JvRadioGroup v-model="selectedValue" legend="自定义标题">
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

使用插槽：

```vue
<template>
  <JvRadioGroup v-model="selectedValue">
    <template #legend>
      <span class="custom-legend">自定义标题</span>
    </template>
    <JvRadio label="选项1" value="1" />
    <JvRadio label="选项2" value="2" />
    <JvRadio label="选项3" value="3" />
  </JvRadioGroup>
</template>
```

## 自定义标签

可以通过 `label` 插槽自定义标签内容。

```vue
<template>
  <JvRadioGroup v-model="selectedValue">
    <JvRadio value="1">
      <template #label>
        <span class="custom-label">自定义标签1</span>
      </template>
    </JvRadio>
    <JvRadio value="2">
      <template #label>
        <span class="custom-label">自定义标签2</span>
      </template>
    </JvRadio>
  </JvRadioGroup>
</template>
```

## API

### JvRadioGroup Props

| 属性名     | 类型                          | 默认值  | 说明                 |
| ---------- | ----------------------------- | ------- | -------------------- |
| modelValue | `string \| number \| boolean` | -       | 单选框组的值         |
| disabled   | `boolean`                     | `false` | 是否禁用整个单选框组 |
| name       | `string`                      | -       | 单选框组的name属性   |
| column     | `boolean`                     | `false` | 是否为垂直布局       |
| inline     | `boolean`                     | `false` | 是否为内联布局       |
| legend     | `string`                      | -       | 单选框组的标题       |
| bordered   | `boolean`                     | `false` | 是否显示边框         |
| compact    | `boolean`                     | `false` | 是否使用紧凑模式     |

### JvRadioGroup Events

| 事件名            | 参数类型                      | 说明             |
| ----------------- | ----------------------------- | ---------------- |
| update:modelValue | `string \| number \| boolean` | 更新单选框组的值 |
| change            | `string \| number \| boolean` | 选中值变化时触发 |

### JvRadioGroup Slots

| 插槽名  | 说明                    |
| ------- | ----------------------- |
| default | 默认插槽，放置Radio组件 |
| legend  | 自定义标题内容          |

### JvRadio Props

| 属性名     | 类型                          | 默认值  | 说明             |
| ---------- | ----------------------------- | ------- | ---------------- |
| label      | `string`                      | -       | 单选框标签文本   |
| value      | `string \| number \| boolean` | -       | 单选框的值       |
| modelValue | `string \| number \| boolean` | `false` | 是否选中         |
| disabled   | `boolean`                     | `false` | 是否禁用         |
| name       | `string`                      | -       | 单选框的name属性 |
| color      | `string`                      | -       | 图标颜色         |

### JvRadio Events

| 事件名            | 参数类型                      | 说明               |
| ----------------- | ----------------------------- | ------------------ |
| update:modelValue | `boolean`                     | 更新选中状态       |
| change            | `string \| number \| boolean` | 选中状态变化时触发 |
| focus             | -                             | 获得焦点时触发     |
| blur              | -                             | 失去焦点时触发     |

### JvRadio Slots

| 插槽名 | 说明           |
| ------ | -------------- |
| label  | 自定义标签内容 |

```

```
