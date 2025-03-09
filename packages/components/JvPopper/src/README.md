# JvPopper 弹出框基础组件

JvPopper 是一个基础的弹出框组件，基于 `@popperjs/core` 实现，可以作为其他弹出类组件（如 Tooltip、Dropdown、Select 等）的基础组件。

## 基本用法

```vue
<script setup>
import { JvPopper } from '@jienix/jovial-ui'
import { ref } from 'vue'

const buttonRef = ref(null)
const visible = ref(false)
</script>

<template>
  <button ref="buttonRef" @click="visible = !visible">
    点击显示/隐藏 Popper
  </button>

  <JvPopper
    v-model="visible"
    :reference="buttonRef"
    :arrow="true"
  >
    <div>这是 Popper 的内容</div>
  </JvPopper>
</template>
```

## 属性

| 属性名              | 说明                                 | 类型                                             | 默认值           |
| ------------------- | ------------------------------------ | ------------------------------------------------ | ---------------- |
| reference           | 参考元素，弹出框会相对于这个元素定位 | HTMLElement \| Element \| VirtualElement \| null | -                |
| modelValue          | 是否显示弹出框                       | boolean                                          | false            |
| options             | Popper.js 的配置选项                 | Partial\<Options\>                               | {}               |
| arrow               | 是否显示箭头                         | boolean                                          | false            |
| class               | 自定义类名                           | string                                           | ''               |
| style               | 自定义样式                           | CSSProperties                                    | {}               |
| manual              | 是否手动控制                         | boolean                                          | false            |
| closeOnClickOutside | 是否在点击外部时关闭                 | boolean \| object                                | false            |
| dataPopper          | 自定义 data-popper 属性              | string                                           | 'default-popper' |
| disableAnimation    | 是否禁用动画                         | boolean                                          | false            |
| transition          | 过渡动画名称                         | string                                           | 'fade'           |
| openDelay           | 打开延迟时间（毫秒）                 | number                                           | 150              |
| closeDelay          | 关闭延迟时间（毫秒）                 | number                                           | 350              |
| appendTo            | 弹出框挂载的目标元素                 | string                                           | 'body'           |

## 事件

| 事件名            | 说明             | 回调参数                            |
| ----------------- | ---------------- | ----------------------------------- |
| update:modelValue | 更新 modelValue  | (value: boolean)                    |
| open              | 弹出框打开时触发 | (visible: boolean)                  |
| close             | 弹出框关闭时触发 | (visible: boolean)                  |
| click             | 点击弹出框时触发 | (evt: MouseEvent)                   |
| clickOutside      | 点击外部时触发   | (visible: boolean, evt: MouseEvent) |
| beforeEnter       | 进入前触发       | -                                   |
| beforeLeave       | 离开前触发       | -                                   |

## 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 弹出框的内容 |

## 暴露的方法和属性

| 名称           | 说明               | 类型                                   |
| -------------- | ------------------ | -------------------------------------- |
| visible        | 是否可见           | Readonly\<Ref\<boolean\>\>             |
| root           | 弹出框根元素       | Readonly\<Ref\<HTMLElement \| null\>\> |
| popperInstance | Popper 实例        | Instance \| null                       |
| update         | 更新 Popper 位置   | () => void                             |
| destroy        | 销毁 Popper 实例   | () => void                             |
| show           | 显示弹出框         | () => void                             |
| hide           | 隐藏弹出框         | () => void                             |
| toggle         | 切换弹出框显示状态 | () => void                             |

## 自定义样式

JvPopper 组件提供了一些 CSS 变量，可以用来自定义样式：

```css
--jv-popper-bg-color: rgb(var(--jv-theme-primary));
--jv-popper-border-color: rgb(var(--jv-theme-on-primary));
--jv-popper-font-size: 12px;
--jv-popper-arrow-size: 8px;
--jv-popper-arrow-offset: calc(var(--jv-popper-arrow-size) / 2);
```

示例：

```vue
<JvPopper
  :reference="buttonRef"
  style="--jv-popper-bg-color: #ff5722; --jv-popper-border-color: #ff9800;"
>
  自定义样式的 Popper
</JvPopper>
```
