<template>
  <div class="container">
    <JvButton @click="handleClick">按钮</JvButton>
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

<script setup lang="ts">
import { virtualListTemp } from '../config/constants'
import ListItem from './item.vue'
import type { JvVirtualScrollListInstance } from '@components/virtual-scroll-list'
import JvScrollBox from '@components/internal/jv-scroll-box.vue'

const dataSource = ref(virtualListTemp.list)

const date = ref(new Date())
const virtuallistRef = ref<JvVirtualScrollListInstance>()
watch(date, (val) => {
  console.log(val)
})

const handleClick = (e: Event) => {
  console.log('click', unref(virtuallistRef))
  try {
    // 你的点击逻辑
    virtuallistRef.value?.scrollTo({
      index: 600
    })
  } catch (error) {
    console.error('Error in handleClick:', error)
  }
}
</script>

<style lang="scss" scoped></style>
