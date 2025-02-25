我来帮你创建 JvAffix 组件的文档。这个组件是一个固钉组件，用于将页面元素固定在可视范围。
import { Meta } from '@storybook/blocks'

<Meta title="Components/JvAffix" />

# JvAffix 固钉

将页面元素固定在可视范围。

## 介绍

固钉组件可以将页面元素固定在特定位置，常用于需要在滚动过程中保持元素可见的场景，如导航栏、返回顶部按钮等。

## 功能特性

- 支持固定在顶部或底部
- 可自定义偏移距离
- 可监听自定义滚动容器
- 支持固定状态改变事件
- 支持滚动位置监听

## 代码示例

### 基础用法

```vue
<template>
  <jv-affix :offset="80">
    <jv-button type="primary">
      固定在顶部
    </jv-button>
  </jv-affix>
</template>
```

### 底部固定

```vue
<template>
  <jv-affix position="bottom" :bottom-offset="20">
    <jv-button type="primary">
      固定在底部
    </jv-button>
  </jv-affix>
</template>
```

## API

### Props

| 参数         | 说明                                | 类型                        | 默认值       |
| ------------ | ----------------------------------- | --------------------------- | ------------ |
| offset       | 距离窗口顶部的偏移量                | number                      | 0            |
| bottomOffset | 距离窗口底部的偏移量                | number                      | 0            |
| position     | 固定的位置，可选值：`top`、`bottom` | string                      | 'top'        |
| target       | 设置需要监听其滚动事件的元素        | () => HTMLElement \| Window | () => window |
| zIndex       | 固定时的 z-index                    | number                      | 100          |

### Events

| 事件名 | 说明               | 回调参数                                |
| ------ | ------------------ | --------------------------------------- |
| change | 固定状态改变时触发 | (fixed: boolean)                        |
| scroll | 滚动时触发         | ({ scrollTop: number, fixed: boolean }) |

### Methods

| 方法名   | 说明             | 参数 |
| -------- | ---------------- | ---- |
| update   | 手动更新固钉状态 | -    |
| getFixed | 获取当前固定状态 | -    |

## 注意事项

1. 固钉组件会自动监听滚动事件和窗口大小变化事件，在组件销毁时会自动清理相关事件监听器。

2. 当使用自定义滚动容器时，需要确保容器具有明确的高度和 `overflow` 属性。

3. 固钉组件会保持原始宽度，以避免固定后出现宽度变化。

## 最佳实践

1. 顶部固定场景：

   - 网站导航栏
   - 工具栏
   - 筛选条件栏

2. 底部固定场景：
   - 返回顶部按钮
   - 悬浮操作按钮
   - 购物车结算栏

这个文档包含了 JvAffix 组件的主要功能说明、使用示例、API 文档以及最佳实践建议。文档结构清晰，便于用户快速了解和使用该组件。
