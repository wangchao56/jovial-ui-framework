<script setup lang="ts">
import JvIcon from '@jovial/components/icon/src/icon.vue'
import { ZoomOutTwotone } from '@vicons/material'
</script>

<template>
  <Story title="Bise 基础组件/Icon 图标">
    <Variant title="Default">
      <JvIcon :size="24" color="red"> <ZoomOutTwotone /> </JvIcon>
    </Variant>
    <Variant title="demo2">
      <JvIcon size="24" color="red">2324 </JvIcon>
    </Variant>
    <Variant title="demo3">
      <JvIcon size="24" color="red">gdgd </JvIcon>
    </Variant>
  </Story>
</template>

<docs lang="md">
### Icon 组件使用文档

#### 1. 简介

`Icon` 组件用于在项目中展示图标。它提供了简单的配置项，允许开发者自定义图标的大小和颜色，并支持默认插槽用于插入自定义内容。

#### 2. 属性 (Props)

| 属性名 | 类型               | 默认值           | 描述                                                                                                                               |
| ------ | ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| size   | `string \| number` | `"1em"`          | 设置图标的大小。可以是具体的像素值（如 `16` 或 `"16px"`），也可以是相对单位（如 `"1em"` 或 `"2rem"`）。                            |
| color  | `string`           | `"currentColor"` | 设置图标的颜色。可以是任何有效的 CSS 颜色值（如 `"red"`、`"#ff0000"` 或 `"rgb(255, 0, 0)"`）。默认情况下，图标将继承父元素的颜色。 |

#### 3. 插槽 (Slots)

| 插槽名   | 描述                                                  |
| -------- | ----------------------------------------------------- |
| 默认插槽 | 用于插入自定义内容，例如自定义的 SVG 图标或其他内容。 |

#### 4. 使用示例

```typescript
// 引入 Icon 组件
import { Icon } from 'jovial-ui-framework';

// 基本用法
<Icon size="2em" color="blue">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</Icon>

// 使用数值指定大小
<Icon size={24} color="#ff0000">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
  </svg>
</Icon>

// 使用默认大小和颜色
<Icon>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
  </svg>
</Icon>
```

#### 5. 注意事项

- `size` 属性既可以是字符串也可以是数字类型，当传递数字时，默认会以像素为单位处理。
- `color` 属性的默认值为 `"currentColor"`，这意味着图标颜色将继承父元素的颜色，除非显式设置了其他颜色。
- 默认插槽允许您插入自定义的 SVG 图标或其他内容，以满足特定的设计需求。

通过以上配置，您可以轻松地在项目中使用 `Icon` 组件，并根据需要调整图标的大小和颜色，同时插入自定义内容。
</docs>
