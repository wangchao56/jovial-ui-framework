<script setup lang="ts">
// import type { JvVirtualScrollListInstance } from '@/components/JvVirtualScrollList'
import { virtualListTemp } from '../config/constants'

const _dataSource = ref(virtualListTemp.list)

// const date = ref(new Date())
// const virtuallistRef = ref<JvVirtualScrollListInstance>()

// function handleClick(e: Event) {
//   console.log('click', unref(virtuallistRef))
//   try {
//     // 你的点击逻辑
//     virtuallistRef.value?.scrollTo({
//       index: 600,
//     })
//   }
//   catch (error) {
//     console.error('Error in handleClick:', error)
//   }
// }
</script>

<template>
  <div class="container">
    <JvButton @click="handleClick">
      按钮
    </JvButton>
    <JvIcon>1232</JvIcon>
    <!-- <JvCalendar v-model="date" title="测试日历" /> -->
    <!-- <jv-virtual-scroll-list
      :data-source="dataSource"
      data-key="id"
      :data-component="ListItem"
      :keeps="10"
      :estimate-size="50"
      ref="virtuallistRef"
    /> -->

    <!-- <JvScrollBox>
      <div v-for="item in dataSource" :key="item.id">
        <list-item :source="item"></list-item>
        <div style="height: 10px"></div>
      </div>
    </JvScrollBox> -->

    <!-- <component :is="'list-item'" :source="dataSource[0]"></component> -->
  </div>
</template>

<style lang="scss" scoped></style>
