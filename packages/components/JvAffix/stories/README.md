# JvAffix 组件测试概述

JvAffix 组件是一个用于将内容固定在页面特定位置的组件，常用于导航栏、侧边栏等需要在页面滚动时保持可见的元素。

## 单元测试用例表格

| 测试ID | 测试场景 | 测试描述                               | 测试步骤                                                                                                      | 预期结果                                        | 测试状态 |
| ------ | -------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- |
| AF-001 | 基本渲染 | 验证组件能够正确渲染                   | 1. 挂载JvAffix组件<br>2. 检查组件类名                                                                         | 组件应包含'jv-affix'类名                        | 通过 ✅  |
| AF-002 | 默认插槽 | 验证默认插槽内容能正确渲染             | 1. 挂载JvAffix组件并设置默认插槽<br>2. 检查插槽内容                                                           | 应正确渲染默认插槽内容                          | 通过 ✅  |
| AF-003 | 位置属性 | 验证默认position属性为top              | 1. 挂载JvAffix组件<br>2. 检查position属性                                                                     | position属性应为'top'                           | 通过 ✅  |
| AF-004 | 位置属性 | 验证position=bottom能正确设置          | 1. 挂载JvAffix组件并设置position='bottom'<br>2. 检查position属性                                              | position属性应为'bottom'                        | 通过 ✅  |
| AF-005 | 偏移属性 | 验证默认offset属性为0                  | 1. 挂载JvAffix组件<br>2. 检查offset属性                                                                       | offset属性应为0                                 | 通过 ✅  |
| AF-006 | 偏移属性 | 验证自定义offset能正确设置             | 1. 挂载JvAffix组件并设置自定义offset<br>2. 检查offset属性                                                     | offset属性应为设置值                            | 通过 ✅  |
| AF-007 | 层级属性 | 验证默认zIndex属性为100                | 1. 挂载JvAffix组件<br>2. 检查zIndex属性                                                                       | zIndex属性应为100                               | 通过 ✅  |
| AF-008 | 层级属性 | 验证自定义zIndex能正确设置             | 1. 挂载JvAffix组件并设置自定义zIndex<br>2. 检查zIndex属性                                                     | zIndex属性应为设置值                            | 通过 ✅  |
| AF-009 | 目标属性 | 验证默认target属性为window             | 1. 挂载JvAffix组件<br>2. 检查target属性返回值                                                                 | target属性函数应返回window                      | 通过 ✅  |
| AF-010 | 目标属性 | 验证自定义target能正确设置             | 1. 挂载JvAffix组件并设置自定义target<br>2. 检查target属性返回值                                               | target属性函数应返回设置的元素                  | 通过 ✅  |
| AF-011 | 固定状态 | 验证元素顶部超出视口顶部时固定(top)    | 1. 模拟元素位置<br>2. 挂载JvAffix组件<br>3. 触发update方法                                                    | 应应用固定类名且getFixed()返回true              | 通过 ✅  |
| AF-012 | 固定状态 | 验证元素底部超出视口底部时固定(bottom) | 1. 模拟元素位置<br>2. 挂载JvAffix组件并设置position='bottom'<br>3. 触发update方法                             | 应应用固定类名且getFixed()返回true              | 通过 ✅  |
| AF-013 | 固定状态 | 验证元素在视口内时不固定               | 1. 模拟元素位置<br>2. 挂载JvAffix组件<br>3. 触发update方法                                                    | 不应应用固定类名且getFixed()返回false           | 通过 ✅  |
| AF-014 | 状态事件 | 验证固定状态改变时触发change事件       | 1. 模拟元素初始位置<br>2. 挂载JvAffix组件并触发update<br>3. 改变元素位置并再次触发update                      | 应触发change事件且参数为true                    | 通过 ✅  |
| AF-015 | 滚动事件 | 验证滚动时触发scroll事件               | 1. 模拟元素位置<br>2. 挂载JvAffix组件<br>3. 触发update方法                                                    | 应触发scroll事件且包含scrollTop和fixed属性      | 通过 ✅  |
| AF-016 | 固定样式 | 验证固定时应用正确样式(top)            | 1. 模拟元素位置和宽度<br>2. 挂载JvAffix组件并设置offset和zIndex<br>3. 触发update方法                          | 应应用正确的position、zIndex、top和width样式    | 通过 ✅  |
| AF-017 | 固定样式 | 验证固定时应用正确样式(bottom)         | 1. 模拟元素位置和宽度<br>2. 挂载JvAffix组件并设置position='bottom'、bottomOffset和zIndex<br>3. 触发update方法 | 应应用正确的position、zIndex、bottom和width样式 | 通过 ✅  |
| AF-018 | 生命周期 | 验证组件挂载时添加事件监听器           | 1. 模拟window事件监听器<br>2. 挂载JvAffix组件                                                                 | 应添加scroll和resize事件监听器                  | 通过 ✅  |
| AF-019 | 生命周期 | 验证组件卸载时移除事件监听器           | 1. 模拟window事件监听器<br>2. 挂载JvAffix组件<br>3. 卸载组件                                                  | 应移除scroll和resize事件监听器                  | 通过 ✅  |
| AF-020 | 暴露方法 | 验证update方法能更新固定状态           | 1. 模拟元素初始位置<br>2. 挂载JvAffix组件并触发update<br>3. 改变元素位置并再次触发update                      | getFixed()返回值应从false变为true               | 通过 ✅  |
| AF-021 | 暴露方法 | 验证getFixed方法能返回当前固定状态     | 1. 模拟元素初始位置<br>2. 挂载JvAffix组件并触发update<br>3. 改变元素位置并再次触发update                      | getFixed()返回值应从false变为true               | 通过 ✅  |

## 测试技术说明

在测试中，我们使用了以下技术和方法：

- 使用 `mount` 函数创建组件实例
- 使用 `find` 方法查找DOM元素
- 使用 `classes`、`attributes` 和 `text` 方法检查元素属性
- 使用 `props` 方法检查组件属性
- 使用 `emitted` 方法检查事件触发情况
- 使用 `vi.fn()` 模拟DOM方法和事件监听器
- 使用 `Object.defineProperty` 模拟浏览器环境属性

## 测试覆盖范围

这些测试全面覆盖了JvAffix组件的功能，确保组件在各种配置下都能正确渲染和工作。测试用例设计合理，每个测试都专注于一个特定的功能点，使测试结果清晰明确。测试覆盖了以下方面：

1. 基本渲染和插槽
2. 属性设置和默认值
3. 固定状态逻辑
4. 事件触发
5. 样式应用
6. 生命周期钩子
7. 暴露的方法

## 组件功能概述

JvAffix组件支持以下主要功能：

1. **固定位置**：

   - 顶部固定（position='top'）
   - 底部固定（position='bottom'）

2. **偏移设置**：

   - 顶部偏移（offset）
   - 底部偏移（bottomOffset）

3. **自定义目标**：

   - 默认相对于窗口（window）
   - 可自定义滚动容器（target）

4. **层级控制**：

   - 自定义z-index值

5. **事件通知**：

   - 固定状态改变事件（change）
   - 滚动事件（scroll）

6. **方法**：
   - 更新固定状态（update）
   - 获取当前固定状态（getFixed）
