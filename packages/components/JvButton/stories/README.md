# JvButton 组件测试概述

JvButton 组件是一个用于显示按钮的组件，支持多种类型、尺寸、状态和样式自定义选项。

## 单元测试用例表格

| 测试ID | 测试场景 | 测试描述                              | 测试步骤                                                         | 预期结果                       | 测试状态 |
| ------ | -------- | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------ | -------- |
| BT-001 | 基本渲染 | 验证组件能够正确渲染                  | 1. 挂载JvButton组件<br>2. 检查组件类名                           | 组件应包含'jv-button'类名      | 通过 ✅  |
| BT-002 | 按钮类型 | 验证type属性能正确应用类型类          | 1. 挂载JvButton组件并设置type属性<br>2. 检查组件类名             | 应包含对应的类型类名           | 通过 ✅  |
| BT-003 | 按钮尺寸 | 验证size属性能正确应用尺寸类          | 1. 挂载JvButton组件并设置size属性<br>2. 检查组件类名             | 应包含对应的尺寸类名           | 通过 ✅  |
| BT-004 | 禁用状态 | 验证disabled=true能正确禁用按钮       | 1. 挂载JvButton组件并设置disabled=true<br>2. 检查组件类名和属性  | 应包含禁用类名和disabled属性   | 通过 ✅  |
| BT-005 | 禁用点击 | 验证禁用状态下点击不触发事件          | 1. 挂载JvButton组件并设置disabled=true<br>2. 触发click事件       | 不应触发click事件              | 通过 ✅  |
| BT-006 | 加载状态 | 验证loading=true能正确显示加载状态    | 1. 挂载JvButton组件并设置loading=true<br>2. 检查组件类名和加载器 | 应包含加载类名和显示加载器     | 通过 ✅  |
| BT-007 | 加载点击 | 验证加载状态下点击不触发事件          | 1. 挂载JvButton组件并设置loading=true<br>2. 触发click事件        | 不应触发click事件              | 通过 ✅  |
| BT-008 | 圆角属性 | 验证rounded=true能正确应用圆角类      | 1. 挂载JvButton组件并设置rounded=true<br>2. 检查组件类名         | 应包含圆角类名                 | 通过 ✅  |
| BT-009 | 块级属性 | 验证block=true能正确应用块级类        | 1. 挂载JvButton组件并设置block=true<br>2. 检查组件类名           | 应包含块级类名                 | 通过 ✅  |
| BT-010 | 虚线属性 | 验证dashed=true能正确应用虚线类       | 1. 挂载JvButton组件并设置dashed=true<br>2. 检查组件类名          | 应包含虚线类名                 | 通过 ✅  |
| BT-011 | 图标显示 | 验证icon属性能正确显示图标            | 1. 挂载JvButton组件并设置icon属性<br>2. 检查图标元素             | 应存在图标元素和JvIcon组件     | 通过 ✅  |
| BT-012 | 前置图标 | 验证prependIcon属性能正确显示前置图标 | 1. 挂载JvButton组件并设置prependIcon属性<br>2. 检查前置图标元素  | 应存在前置图标元素和JvIcon组件 | 通过 ✅  |
| BT-013 | 后置图标 | 验证appendIcon属性能正确显示后置图标  | 1. 挂载JvButton组件并设置appendIcon属性<br>2. 检查后置图标元素   | 应存在后置图标元素和JvIcon组件 | 通过 ✅  |
| BT-014 | 文本颜色 | 验证color属性能正确设置文本颜色       | 1. 挂载JvButton组件并设置color属性<br>2. 检查style属性           | 应包含正确的文本颜色设置       | 通过 ✅  |
| BT-015 | 背景颜色 | 验证bgColor属性能正确设置背景颜色     | 1. 挂载JvButton组件并设置bgColor属性<br>2. 检查style属性         | 应包含正确的背景颜色设置       | 通过 ✅  |
| BT-016 | 默认插槽 | 验证默认插槽内容能正确渲染            | 1. 挂载JvButton组件并设置默认插槽<br>2. 检查内容元素             | 应正确渲染默认插槽内容         | 通过 ✅  |
| BT-017 | 前置插槽 | 验证prepend插槽内容能正确渲染         | 1. 挂载JvButton组件并设置prepend插槽<br>2. 检查前置元素          | 应正确渲染前置插槽内容         | 通过 ✅  |
| BT-018 | 后置插槽 | 验证append插槽内容能正确渲染          | 1. 挂载JvButton组件并设置append插槽<br>2. 检查后置元素           | 应正确渲染后置插槽内容         | 通过 ✅  |
| BT-019 | 点击事件 | 验证点击按钮时能触发click事件         | 1. 挂载JvButton组件<br>2. 触发click事件                          | 应触发click事件                | 通过 ✅  |
| BT-020 | 鼠标按下 | 验证鼠标按下时能触发mousedown事件     | 1. 挂载JvButton组件<br>2. 触发mousedown事件                      | 应触发mousedown事件            | 通过 ✅  |
| BT-021 | 键盘按下 | 验证键盘按下时能触发keydown事件       | 1. 挂载JvButton组件<br>2. 触发keydown事件                        | 应触发keydown事件              | 通过 ✅  |
| BT-022 | 键盘弹起 | 验证键盘弹起时能触发keyup事件         | 1. 挂载JvButton组件<br>2. 触发keyup事件                          | 应触发keyup事件                | 通过 ✅  |
| BT-023 | 聚焦事件 | 验证聚焦时能触发focus事件             | 1. 挂载JvButton组件<br>2. 触发focus事件                          | 应触发focus事件                | 通过 ✅  |
| BT-024 | 失焦事件 | 验证失焦时能触发blur事件              | 1. 挂载JvButton组件<br>2. 触发blur事件                           | 应触发blur事件                 | 通过 ✅  |
| BT-025 | 设置加载 | 验证setLoading方法能正确设置加载状态  | 1. 挂载JvButton组件<br>2. 调用setLoading方法<br>3. 检查组件类名  | 应正确切换加载状态类名         | 通过 ✅  |
| BT-026 | 设置禁用 | 验证setDisabled方法能正确设置禁用状态 | 1. 挂载JvButton组件<br>2. 调用setDisabled方法<br>3. 检查组件类名 | 应正确切换禁用状态类名         | 通过 ✅  |

## 测试技术说明

在测试中，我们使用了以下技术和方法：

- 使用 `mount` 函数创建组件实例
- 使用 `find` 和 `findComponent` 方法查找DOM元素和子组件
- 使用 `classes`、`attributes` 和 `text` 方法检查元素属性
- 使用 `trigger` 方法模拟用户交互
- 使用 `emitted` 方法检查事件触发情况
- 使用 `vm` 访问组件实例方法进行测试

## 测试覆盖范围

这些测试全面覆盖了JvButton组件的功能，确保组件在各种配置下都能正确渲染和工作。测试用例设计合理，每个测试都专注于一个特定的功能点，使测试结果清晰明确。

## 组件功能概述

JvButton组件支持以下主要功能：

1. **多种按钮类型**：

   - 默认按钮（default）
   - 主要按钮（primary）
   - 成功按钮（success）
   - 警告按钮（warning）
   - 危险按钮（danger）
   - 信息按钮（info）

2. **多种尺寸**：

   - 小型（small）
   - 中型（medium，默认）
   - 大型（large）

3. **样式自定义**：

   - 圆角按钮（rounded）
   - 块级按钮（block）
   - 虚线按钮（dashed）
   - 自定义文本颜色（color）
   - 自定义背景颜色（bgColor）
   - 多种变体（variant）

4. **状态**：

   - 禁用状态（disabled）
   - 加载状态（loading）

5. **图标支持**：

   - 按钮图标（icon）
   - 前置图标（prependIcon）
   - 后置图标（appendIcon）

6. **插槽**：

   - 默认插槽（内容）
   - 前置插槽（prepend）
   - 后置插槽（append）

7. **事件**：

   - 点击事件（click）
   - 鼠标按下事件（mousedown）
   - 键盘事件（keydown, keyup）
   - 焦点事件（focus, blur）

8. **方法**：
   - 设置加载状态（setLoading）
   - 设置禁用状态（setDisabled）
