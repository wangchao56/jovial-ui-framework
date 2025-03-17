# JvAffix 固钉组件

JvAffix 是一个固钉组件，用于将内容固定在页面的特定位置，常用于导航栏、侧边栏等需要在页面滚动时保持可见的元素。

## 基础用法

```vue
<template>
  <JvAffix :offset="20">
    <div class="demo-content">
      固定在顶部
    </div>
  </JvAffix>
</template>
```

## 固定在底部

```vue
<template>
  <JvAffix position="bottom" :offset="20">
    <div class="demo-content">
      固定在底部
    </div>
  </JvAffix>
</template>
```

## 自定义滚动容器

默认情况下，JvAffix 组件会监听 window 的滚动事件。你可以通过 `target` 属性指定一个自定义的滚动容器。

```vue
<script setup>
import { ref } from 'vue'

const container = ref(null)
function getContainer() {
  return container.value
}
</script>

<template>
  <div ref="container" style="height: 400px; overflow: auto;">
    <div style="height: 800px; padding-top: 100px;">
      <JvAffix :target="getContainer">
        <div class="demo-content">
          在容器内固定
        </div>
      </JvAffix>
    </div>
  </div>
</template>
```

## 动态控制

你可以通过 `enabled` 属性动态控制固钉功能的启用状态，或者通过组件实例的 `setFixed` 方法手动设置固定状态。

```vue
<script setup>
import { ref } from 'vue'

const enabled = ref(true)
const fixed = ref(false)
const affixRef = ref(null)

function handleChange(value) {
  fixed.value = value
}

function manualSetFixed() {
  if (affixRef.value) {
    affixRef.value.setFixed(!fixed.value)
  }
}
</script>

<template>
  <div>
    <button @click="enabled = !enabled">
      {{ enabled ? '禁用' : '启用' }}
    </button>
    <button @click="manualSetFixed">
      手动{{ fixed ? '取消固定' : '固定' }}
    </button>

    <JvAffix
      ref="affixRef"
      :enabled="enabled"
      @change="handleChange"
    >
      <div class="demo-content">
        动态控制
      </div>
    </JvAffix>
  </div>
</template>
```

## 主题支持

JvAffix 组件支持 light 和 dark 两种主题。

```vue
<script setup>
import { ref } from 'vue'

const theme = ref('light')
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <JvAffix :theme="theme">
    <div class="demo-content">
      {{ theme }} 主题
    </div>
  </JvAffix>
</template>
```

## API

### 属性

| 属性名       | 说明                               | 类型                                  | 默认值         |
| ------------ | ---------------------------------- | ------------------------------------- | -------------- |
| position     | 固定的位置                         | `'top' \| 'bottom'`                   | `'top'`        |
| offset       | 距离窗口顶部或底部的偏移量         | `number`                              | `0`            |
| zIndex       | z-index 值                         | `number`                              | `100`          |
| target       | 设置需要监听其滚动事件的元素       | `() => HTMLElement \| Window \| null` | `() => window` |
| enabled      | 是否启用固钉功能                   | `boolean`                             | `true`         |
| customClass  | 自定义类名                         | `string`                              | `''`           |
| targetMargin | 滚动容器的外边距，影响固钉触发条件 | `number`                              | `0`            |
| theme        | 主题                               | `'light' \| 'dark'`                   | `'light'`      |

### 事件

| 事件名 | 说明                 | 回调参数                                                |
| ------ | -------------------- | ------------------------------------------------------- |
| change | 固定状态改变时触发   | `(fixed: boolean) => void`                              |
| scroll | 滚动时触发           | `(data: { scrollTop: number, fixed: boolean }) => void` |
| ready  | 组件初始化完成时触发 | `() => void`                                            |

### 插槽

| 插槽名  | 说明                             |
| ------- | -------------------------------- |
| default | 默认插槽，用于放置需要固定的内容 |

### 方法

| 方法名          | 说明             | 参数                       |
| --------------- | ---------------- | -------------------------- |
| update          | 更新固钉状态     | -                          |
| getFixed        | 获取当前固定状态 | -                          |
| setFixed        | 手动设置固定状态 | `(value: boolean) => void` |
| getScrollTarget | 获取当前滚动容器 | -                          |

## 注意事项

1. 当使用自定义滚动容器时，确保容器具有正确的定位属性（如 `position: relative`）。
2. 为了避免页面抖动，组件会在固定时创建一个占位元素，保持原有布局不变。
3. 当组件被禁用时，会自动取消固定状态。
4. 组件会在挂载、窗口大小变化和滚动时自动更新固定状态。
