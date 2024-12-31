<script setup lang="ts">
import JvButton from '@jovial/components/button'
// import JvSpace from '@jovial/components/space'
import JvIcon from '@jovial/components/icon'
import { logEvent } from 'histoire/client'
import { reactive } from 'vue'
function handleClick() {
  console.log('click')
}
function initState() {
  return {
    loading: true,
    disabled: true,
    block: true,
    stacked: true
  }
}
const state = reactive({
  loading: true,
  disabled: true,
  block: true,
  stacked: true
})
</script>
<template>
  <Story title="基础组件/button 按钮" :layout="{ type: 'grid', width: 300 }">
    <template #controls>
      stacked: <input v-model="state.stacked" type="checkbox" /> Disabled:
      <input v-model="state.disabled" type="checkbox" />
    </template>
    <Variant title="type类型">
      <div class="space">
        <jv-button type="primary" :rounded="true">primary按钮</jv-button>
        <jv-button type="danger">danger按钮</jv-button>
        <jv-button type="info">info按钮</jv-button>
        <jv-button type="warning">warning按钮</jv-button>
        <jv-button type="success">success按钮</jv-button>
      </div>
    </Variant>
    <Variant title="Variant使用">
      <div class="space">
        <jv-button variant="text" :rounded="true">text按钮</jv-button>
        <jv-button variant="plain">plain按钮</jv-button>
        <jv-button variant="elevated">elevated按钮</jv-button>
        <jv-button variant="flat">flat 按钮</jv-button>
        <jv-button variant="tonal">tonal按钮</jv-button>
        <jv-button variant="outlined">outlined按钮</jv-button>
      </div>
    </Variant>
    <Variant title="size大小">
      <div class="space">
        <jv-button size="tiny">
          <template #prepend>
            <jv-icon size="tiny">
              <AcUnitRound />
            </jv-icon>
          </template>
          按钮</jv-button
        >
        <jv-button size="small">
          <template #prepend>
            <jv-icon size="small">
              <AcUnitRound />
            </jv-icon> </template
          >按钮</jv-button
        >
        <jv-button size="medium">按钮</jv-button>
        <jv-button size="large">按钮</jv-button>
        <jv-button size="x-large">
          <template #prepend>
            <jv-icon size="x-large">
              <AcUnitRound />
            </jv-icon>
          </template>
          按钮</jv-button
        >
      </div>
    </Variant>
    <Variant title="禁用">
      <div class="space">
        <jv-button :disabled="state.disabled" block>按钮</jv-button>
        <jv-button :disabled="state.disabled" type="primary">按钮</jv-button>
      </div>
    </Variant>

    <Variant title="形状">
      <div class="space">
        <jv-button>按钮</jv-button>
        <jv-button variant="outlined" rounded block>
          <template #prepend>
            <jv-icon>
              <AcUnitRound />
            </jv-icon>
          </template>
          圆角
        </jv-button>
        <jv-button variant="tonal">
          tonal按钮
          <template #append>
            <jv-icon>
              <AcUnitRound />
            </jv-icon>
          </template>
        </jv-button>
        <jv-button variant="text" rounded block>text按钮</jv-button>
        <jv-button variant="plain" rounded block>plain按钮</jv-button>
        <jv-button variant="flat" color="red" rounded block>flat按钮</jv-button>
      </div>
    </Variant>

    <Variant title="加载中" :init-state="initState">
      <jv-button :loading="true">按钮</jv-button>
      <jv-button
        :size="'x-large'"
        variant="outlined"
        rounded
        block
        :loading="true"
        >outlined按钮</jv-button
      >
      <jv-button variant="tonal" rounded :loading="true"> tonal按钮</jv-button>
      <jv-button variant="text" :loading="true" rounded block
        >text按钮</jv-button
      >
      <jv-button variant="plain" loading>plain按钮</jv-button>
      <jv-button variant="flat" color="red" loading rounded block
        >flat按钮</jv-button
      >
    </Variant>
    <Variant title="图标">
      <div class="space">
        <jv-button>
          <template #prepend>
            <jv-icon>
              <AcUnitRound />
            </jv-icon>
          </template>
          按钮</jv-button
        >

        <jv-button>
          <template #append>
            <jv-icon>
              <AcUnitRound />
            </jv-icon>
          </template>
          按钮</jv-button
        >
        <jv-button stacked>
          <template #append>
            <jv-icon>
              <AcUnitRound />
            </jv-icon>
          </template>
          按钮</jv-button
        >
        <jv-button stacked>
          <template #prepend>
            <jv-icon>
              <AcUnitRound />
            </jv-icon>
          </template>
          Button</jv-button
        >
      </div>
    </Variant>
    <Variant title="自定义颜色">
      <jv-button bg-color="#ff69b4" rounded>ff69b4按钮</jv-button>
    </Variant>
    <Variant title="事件">
      <jv-button
        bg-color="#ff69b4"
        rounded
        @click="logEvent('click', handleClick())"
        >Click按钮</jv-button
      >
    </Variant>
  </Story>
</template>

<style scoped>
.space {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
}
</style>

<docs lang="md"></docs>
