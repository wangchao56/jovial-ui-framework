让我用中文来总结一下这个 JvButton 组件的主要功能：

### 基本功能

这是一个功能丰富的按钮组件，具有以下主要特点：

1. **样式多样化**

   - 支持多种类型（type）：default、primary 等
   - 支持多种尺寸（size）：medium 等
   - 支持多种变体（variant）：elevated 等
   - 可以是圆角（rounded）、虚线（dashed）、块级（block）或堆叠（stacked）样式
   - 支持自定义颜色（color）和背景色（bgColor）

2. **图标支持**

   - 支持主图标（icon）
   - 支持前置图标（prependIcon）
   - 支持后置图标（appendIcon）

3. **状态管理**

   - 支持禁用状态（disabled）
   - 支持加载状态（loading）
   - 提供 setLoading 和 setDisabled 方法动态改变状态

4. **插槽系统**

   - default：主要内容
   - loading：自定义加载状态
   - prepend：前置内容
   - append：后置内容

5. **事件处理**

   - click：点击事件
   - mousedown：鼠标按下
   - keydown/keyup：键盘事件
   - focus/blur：焦点事件

6. **无障碍支持**

   - 包含适当的 ARIA 属性
   - 支持键盘导航
   - 禁用状态下自动管理 tabindex

7. **按钮组集成**

   - 可以在按钮组（ButtonGroup）中使用
   - 自动继承按钮组的尺寸和圆角设置

8. **主题集成**
   - 支持主题系统
   - 可以应用全局主题样式

这是一个设计完善的现代化按钮组件，既保持了基础按钮的简单性，又提供了丰富的自定义选项和功能扩展。它的 API 设计清晰，使用方便，同时考虑到了可访问性和主题定制等现代 Web 应用的需求。
