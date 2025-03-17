# JvTabs 组件测试文档

## 组件概述

JvTabs 组件是一个标签页组件，用于在同一区域内切换不同内容视图。它支持多种标签页位置、类型，并提供可关闭、可添加等功能。

## 测试用例

| ID    | 场景                     | 描述                         | 步骤                                                                                                                                        | 预期结果                                                 | 状态 |
| ----- | ------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---- |
| TC-01 | 基础渲染                 | 测试组件基础结构渲染         | 1. 创建JvTabs组件实例<br>2. 检查DOM结构                                                                                                     | 组件应正确渲染基础结构，包含`.jv-tabs`类和JvTabNav子组件 | ✅   |
| TC-02 | 插槽渲染                 | 测试默认插槽内容渲染         | 1. 创建JvTabs组件实例<br>2. 提供默认插槽内容<br>3. 检查渲染结果                                                                             | 组件应正确渲染插槽内容，包含JvTabPanel组件               | ✅   |
| TC-03 | position属性             | 测试position属性应用         | 1. 创建JvTabs组件实例<br>2. 设置不同position值<br>3. 检查类名                                                                               | 组件应根据position属性应用对应的类名                     | ✅   |
| TC-04 | type属性                 | 测试type属性应用             | 1. 创建JvTabs组件实例<br>2. 设置不同type值<br>3. 检查类名                                                                                   | 组件应根据type属性应用对应的类名                         | ✅   |
| TC-05 | width/height属性         | 测试width和height属性应用    | 1. 创建JvTabs组件实例<br>2. 设置width和height属性<br>3. 检查样式                                                                            | 组件应正确应用width和height样式                          | ✅   |
| TC-06 | closable属性             | 测试closable属性应用         | 1. 创建JvTabs组件实例<br>2. 设置closable属性为true<br>3. 检查props                                                                          | 组件应正确应用closable属性                               | ✅   |
| TC-07 | addable属性              | 测试addable属性应用          | 1. 创建JvTabs组件实例<br>2. 设置addable属性为true<br>3. 检查props                                                                           | 组件应正确应用addable属性                                | ✅   |
| TC-08 | update:activeKey事件     | 测试update:activeKey事件触发 | 1. 创建JvTabs组件实例<br>2. 模拟TabNav触发update:activeKey事件<br>3. 检查事件触发                                                           | 组件应正确触发update:activeKey事件                       | ✅   |
| TC-09 | click事件                | 测试click事件触发            | 1. 创建JvTabs组件实例<br>2. 模拟TabNav触发click事件<br>3. 检查事件触发                                                                      | 组件应正确触发click事件                                  | ✅   |
| TC-10 | close事件                | 测试close事件触发            | 1. 创建JvTabs组件实例<br>2. 设置closable属性为true<br>3. 模拟TabNav触发close事件<br>4. 检查事件触发                                         | 组件应正确触发close事件                                  | ✅   |
| TC-11 | add事件                  | 测试add事件触发              | 1. 创建JvTabs组件实例<br>2. 设置addable属性为true<br>3. 模拟TabNav触发add事件<br>4. 检查事件触发                                            | 组件应正确触发add事件                                    | ✅   |
| TC-12 | nav插槽                  | 测试nav插槽渲染              | 1. 创建JvTabs组件实例<br>2. 提供nav插槽内容<br>3. 检查渲染结果                                                                              | 组件应正确渲染nav插槽内容                                | ✅   |
| TC-13 | navExtra插槽             | 测试navExtra插槽渲染         | 1. 创建JvTabs组件实例<br>2. 提供navExtra插槽内容<br>3. 检查渲染结果                                                                         | 组件应正确渲染navExtra插槽内容                           | ✅   |
| TC-14 | tabPanels计算属性        | 测试tabPanels计算属性        | 1. 创建JvTabs组件实例<br>2. 提供默认插槽内容<br>3. 检查tabPanels计算属性                                                                    | tabPanels计算属性应正确计算                              | ✅   |
| TC-15 | currentActiveKey计算属性 | 测试currentActiveKey计算属性 | 1. 创建JvTabs组件实例<br>2. 设置activeKey属性<br>3. 检查currentActiveKey计算属性<br>4. 更新activeKey属性<br>5. 检查currentActiveKey计算属性 | currentActiveKey计算属性应正确计算                       | ✅   |

## 测试技术细节

### 测试方法

- 单元测试：使用Vitest和Vue Test Utils进行组件单元测试
- 组件挂载：使用自定义的`createComponentTest`辅助函数简化测试代码
- 事件测试：通过模拟子组件事件触发来测试组件事件处理
- 属性测试：通过检查组件类名、样式和props来测试属性应用
- 插槽测试：通过提供插槽内容并检查渲染结果来测试插槽功能

### 测试覆盖范围

- 组件渲染：测试组件基础结构和插槽内容渲染
- 属性应用：测试组件属性应用，包括position、type、width、height、closable、addable等
- 事件处理：测试组件事件处理，包括update:activeKey、click、close、add等
- 计算属性：测试组件计算属性，包括tabPanels、currentActiveKey等

### 测试依赖

- Vitest：测试运行器
- Vue Test Utils：Vue组件测试工具
- 自定义测试辅助函数：简化测试代码

## 测试执行

执行以下命令运行测试：

```bash
pnpm test:component JvTabs
```

## 测试结果

所有测试用例均已通过，组件功能正常。
