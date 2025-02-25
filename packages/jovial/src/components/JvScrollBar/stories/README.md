# JvScrollBar 滚动条组件

自定义滚动条组件，提供更好的滚动体验和样式定制能力。

## 实现原理

JvScrollBar 组件通过以下方式实现自定义滚动条：

1. 使用原生滚动容器作为基础，但隐藏其默认滚动条
2. 监听容器的滚动事件，计算滚动比例
3. 根据滚动比例控制自定义滚动条的位置
4. 支持拖动滚动条来控制内容滚动

## 基础用法

```vue
<template>
  <JvScrollBar style="height: 300px">
    <div style="height: 1000px">
      <!-- 滚动内容 -->
    </div>
  </JvScrollBar>
</template>
```

## API

### Props

| 参数      | 说明                 | 类型            | 默认值 |
| --------- | -------------------- | --------------- | ------ |
| height    | 容器高度             | string / number | -      |
| maxHeight | 容器最大高度         | string / number | -      |
| native    | 是否使用原生滚动条   | boolean         | false  |
| always    | 是否始终显示滚动条   | boolean         | false  |
| noresize  | 是否禁用自动调整大小 | boolean         | false  |

### Events

| 事件名 | 说明       | 回调参数                                  |
| ------ | ---------- | ----------------------------------------- |
| scroll | 滚动时触发 | { scrollTop: number, scrollLeft: number } |

### Methods

| 方法名        | 说明             | 参数                     |
| ------------- | ---------------- | ------------------------ |
| scrollTo      | 滚动到指定位置   | options: ScrollToOptions |
| setScrollTop  | 设置垂直滚动位置 | value: number            |
| setScrollLeft | 设置水平滚动位置 | value: number            |

## 示例

### 始终显示滚动条

```vue
<template>
  <JvScrollBar :always="true" style="height: 300px">
    <!-- 内容 -->
  </JvScrollBar>
</template>
```

### 水平滚动

```vue
<template>
  <JvScrollBar>
    <div style="width: 1000px">
      <!-- 水平内容 -->
    </div>
  </JvScrollBar>
</template>
```

```
这些更新完善了 ScrollBar 组件的功能，主要包括：

1. 修复了类型错误
2. 添加了滚动条拖动功能
3. 创建了组件文档
4. 添加了 Stories 用例展示

需要注意的是，你可能还需要：

1. 添加更多的单元测试
2. 优化滚动条的样式
3. 添加更多的交互功能（如点击轨道滚动）
4. 考虑移动端的触摸支持

是否需要我详细说明某个部分？
```

自定义滚动条组件，提供更好的滚动体验和样式定制能力。

## 实现原理

JvScrollBar 组件通过以下方式实现自定义滚动条：

1. 使用原生滚动容器作为基础，但隐藏其默认滚动条
2. 监听容器的滚动事件，计算滚动比例
3. 根据滚动比例控制自定义滚动条的位置
4. 支持拖动滚动条来控制内容滚动

## 基础用法
