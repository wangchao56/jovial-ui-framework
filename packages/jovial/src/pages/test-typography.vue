<script setup lang="ts">
import { createNamespace } from '@jovial/utils'

defineOptions({ name: 'TestTypography' })
const bem = createNamespace('test-typography')
</script>

<template>
  <div :class="bem.b()">
    <JvParagraph>
      <blockquote>
        这是一个专业排版引用示例，展示多级嵌套文本样式处理能力
      </blockquote>
      <pre>
            function example() {
              console.log("专业代码块样式");
            }
              </pre>

      <JvCode
        type="block"
        language="javascript"
        title="example.js"
        collapsible
        :default-collapsed="false"
      >
        function example() {
        console.log('Hello World');
        }
      </JvCode>

      <ul>
        <li>列表项1</li>
        <li>列表项2</li>
      </ul>

      <ol>
        <li>第一项</li>
        <li>第二项</li>
      </ol>
    </JvParagraph>
    <JvText variant="underline">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="underline" type="success">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="del" type="primary">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="mark">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="strong">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="em">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="i">
      这是一个文本示例，展示多级嵌套文本样式处理能力
    </JvText>
    <JvText variant="kbd">
      Esc
    </JvText>
  </div>
</template>
