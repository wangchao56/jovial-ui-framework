# JvAlert 组件测试概述

JvAlert 组件是一个用于显示提示信息的组件，可以用于展示成功、警告、错误和信息等不同类型的消息。

## 单元测试用例表格

| 测试ID | 测试场景 | 测试描述                               | 测试步骤                                                                                            | 预期结果                                 | 测试状态 |
| ------ | -------- | -------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| AL-001 | 基本渲染 | 验证组件能够正确渲染                   | 1. 挂载JvAlert组件<br>2. 检查组件类名                                                               | 组件应包含'jv-alert'类名                 | 通过 ✅  |
| AL-002 | 默认插槽 | 验证默认插槽内容能正确渲染             | 1. 挂载JvAlert组件并设置默认插槽<br>2. 检查插槽内容                                                 | 应正确渲染默认插槽内容                   | 通过 ✅  |
| AL-003 | 类型属性 | 验证默认type属性为info                 | 1. 挂载JvAlert组件<br>2. 检查type属性和对应类名                                                     | type属性应为'info'且有对应类名           | 通过 ✅  |
| AL-004 | 类型属性 | 验证不同type值能正确设置               | 1. 挂载JvAlert组件并设置不同type值<br>2. 检查type属性和对应类名                                     | type属性应为设置值且有对应类名           | 通过 ✅  |
| AL-005 | 变体属性 | 验证默认variant属性为filled            | 1. 挂载JvAlert组件<br>2. 检查variant属性和对应类名                                                  | variant属性应为'filled'且有对应类名      | 通过 ✅  |
| AL-006 | 变体属性 | 验证不同variant值能正确设置            | 1. 挂载JvAlert组件并设置不同variant值<br>2. 检查variant属性和对应类名                               | variant属性应为设置值且有对应类名        | 通过 ✅  |
| AL-007 | 标题属性 | 验证默认title属性为空字符串            | 1. 挂载JvAlert组件<br>2. 检查title属性                                                              | title属性应为空字符串                    | 通过 ✅  |
| AL-008 | 标题属性 | 验证title能正确渲染                    | 1. 挂载JvAlert组件并设置title<br>2. 检查title属性和渲染内容                                         | title属性应为设置值且正确渲染            | 通过 ✅  |
| AL-009 | 消息属性 | 验证默认message属性为空字符串          | 1. 挂载JvAlert组件<br>2. 检查message属性                                                            | message属性应为空字符串                  | 通过 ✅  |
| AL-010 | 消息属性 | 验证message能正确渲染                  | 1. 挂载JvAlert组件并设置message<br>2. 检查message属性和渲染内容                                     | message属性应为设置值且正确渲染          | 通过 ✅  |
| AL-011 | 图标属性 | 验证默认icon属性为空字符串             | 1. 挂载JvAlert组件<br>2. 检查icon属性                                                               | icon属性应为空字符串                     | 通过 ✅  |
| AL-012 | 图标属性 | 验证自定义icon能正确使用               | 1. 挂载JvAlert组件并设置自定义icon<br>2. 检查icon属性和图标容器                                     | icon属性应为设置值且图标容器存在         | 通过 ✅  |
| AL-013 | 显示图标 | 验证默认showIcon属性为true             | 1. 挂载JvAlert组件<br>2. 检查showIcon属性和图标容器                                                 | showIcon属性应为true且图标容器存在       | 通过 ✅  |
| AL-014 | 显示图标 | 验证showIcon=false时不显示图标         | 1. 挂载JvAlert组件并设置showIcon=false<br>2. 检查showIcon属性和图标容器                             | showIcon属性应为false且图标容器不存在    | 通过 ✅  |
| AL-015 | 可关闭性 | 验证默认dismissible属性为false         | 1. 挂载JvAlert组件<br>2. 检查dismissible属性和关闭按钮                                              | dismissible属性应为false且关闭按钮不存在 | 通过 ✅  |
| AL-016 | 可关闭性 | 验证dismissible=true时显示关闭按钮     | 1. 挂载JvAlert组件并设置dismissible=true<br>2. 检查dismissible属性和关闭按钮                        | dismissible属性应为true且关闭按钮存在    | 通过 ✅  |
| AL-017 | 关闭事件 | 验证点击关闭按钮触发update:visible事件 | 1. 挂载JvAlert组件并设置dismissible=true<br>2. 点击关闭按钮<br>3. 检查事件                          | 应触发update:visible事件且值为false      | 通过 ✅  |
| AL-018 | 关闭文本 | 验证默认closeText属性为空字符串        | 1. 挂载JvAlert组件并设置dismissible=true<br>2. 检查closeText属性和关闭按钮内容                      | closeText属性应为空字符串且显示关闭图标  | 通过 ✅  |
| AL-019 | 关闭文本 | 验证closeText能正确渲染                | 1. 挂载JvAlert组件并设置dismissible=true和closeText<br>2. 检查closeText属性和关闭按钮内容           | closeText属性应为设置值且正确渲染        | 通过 ✅  |
| AL-020 | 紧凑模式 | 验证默认dense属性为false               | 1. 挂载JvAlert组件<br>2. 检查dense属性和对应类名                                                    | dense属性应为false且不包含对应类名       | 通过 ✅  |
| AL-021 | 紧凑模式 | 验证dense=true时添加对应类名           | 1. 挂载JvAlert组件并设置dense=true<br>2. 检查dense属性和对应类名                                    | dense属性应为true且包含对应类名          | 通过 ✅  |
| AL-022 | 可见性   | 验证默认visible属性为true              | 1. 挂载JvAlert组件<br>2. 检查visible属性和组件渲染                                                  | visible属性应为true且组件正常渲染        | 通过 ✅  |
| AL-023 | 可见性   | 验证visible=false时不渲染组件          | 1. 挂载JvAlert组件并设置visible=false<br>2. 检查visible属性和组件渲染                               | visible属性应为false且组件不渲染         | 通过 ✅  |
| AL-024 | 关闭事件 | 验证关闭后触发close事件                | 1. 挂载JvAlert组件并设置dismissible=true<br>2. 点击关闭按钮<br>3. 模拟transition结束<br>4. 检查事件 | 应触发close事件                          | 通过 ✅  |
| AL-025 | 图标插槽 | 验证icon插槽能正确渲染                 | 1. 挂载JvAlert组件并设置icon插槽<br>2. 检查插槽内容                                                 | 应正确渲染icon插槽内容                   | 通过 ✅  |
| AL-026 | 标题插槽 | 验证title插槽能正确渲染                | 1. 挂载JvAlert组件并设置title插槽<br /><br>2. 检查插槽内容                                          | 应正确渲染title插槽内容                  | 通过 ✅  |
| AL-027 | 消息插槽 | 验证message插槽能正确渲染              | 1. 挂载JvAlert组件并设置message插槽<br>2. 检查插槽内容                                              | 应正确渲染message插槽内容                | 通过 ✅  |
| AL-028 | 关闭插槽 | 验证close插槽能正确渲染                | 1. 挂载JvAlert组件并设置dismissible=true和close插槽<br>2. 检查插槽内容                              | 应正确渲染close插槽内容                  | 通过 ✅  |

## 测试技术说明

在测试中，我们使用了以下技术和方法：

- 使用 `mount` 函数创建组件实例
- 使用 `find` 方法查找DOM元素
- 使用 `classes`、`attributes` 和 `text` 方法检查元素属性
- 使用 `props` 方法检查组件属性
- 使用 `emitted` 方法检查事件触发情况
- 使用 `h` 函数创建虚拟DOM节点用于插槽内容

## 测试覆盖范围

这些测试全面覆盖了JvAlert组件的功能，确保组件在各种配置下都能正确渲染和工作。测试用例设计合理，每个测试都专注于一个特定的功能点，使测试结果清晰明确。测试覆盖了以下方面：

1. 基本渲染和插槽
2. 属性设置和默认值
3. 类型和变体样式
4. 标题和消息内容
5. 图标显示和自定义
6. 关闭功能和事件
7. 可见性控制

## 组件功能概述

JvAlert组件支持以下主要功能：

1. **消息类型**：

   - 信息（info）
   - 成功（success）
   - 警告（warning）
   - 错误（error）

2. **显示变体**：

   - 填充（filled）
   - 轮廓（outlined）
   - 左边框（border-left）

3. **内容定制**：

   - 标题（title）
   - 消息内容（message）
   - 自定义图标（icon）
   - 控制默认图标显示（showIcon）

4. **交互功能**：

   - 可关闭（dismissible）
   - 自定义关闭按钮文本（closeText）
   - 关闭事件（close）
   - 可见性控制（visible）

5. **样式选项**：

   - 紧凑模式（dense）

6. **插槽定制**：

   - 默认插槽
   - 图标插槽（icon）
   - 标题插槽（title）
   - 消息插槽（message）
   - 关闭按钮插槽（close）
