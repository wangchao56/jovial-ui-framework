<script setup lang="ts">
import { ref } from "vue";
import JvTree from "@jovial/components/tree";
/**
 * 创建数据
 */
function createData(level: number, parentKey = ""): any[] {
  if (!level) return [];
  const arr = new Array(6 - level).fill(0);
  return arr.map((_, index) => {
    const key = parentKey + level + index;
    return {
      id: key,
      value: createLabel(level),
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return `一生二`;
  if (level === 2) return `二生三`;
  if (level === 1) return `三生万物`;

  return "";
}

const data = ref(createData(4));
</script>

<template>
  <Story title="Tree 树形控件">
    <Variant title="默认">
      <jv-tree
        :data="data"
        label-field="value"
        key-field="id"
        children-field="children"
        :default-expanded-keys="['40', '41']"
      ></jv-tree>
    </Variant>
  </Story>
</template>

<docs lang="md">
### 介绍

树形控件，用于展示层级关系，可展开或折叠

| 参数           | 说明               | 类型       | 默认值   |
| -------------- | ------------------ | ---------- | -------- |
| data           | 树形数据           | TreeNode[] | []       |
| label-field    | 节点标签字段名     | string     | label    |
| key-field      | 节点唯一标识字段名 | string     | key      |
| children-field | 子节点字段名       | string     | children |
| show-checkbox  | 是否显示多选框     | boolean    | false    |
| show-icon      | 是否显示节点图标   | boolean    | false    |
| show-line      | 是否显示连接线     | boolean    | false    |
</docs>
