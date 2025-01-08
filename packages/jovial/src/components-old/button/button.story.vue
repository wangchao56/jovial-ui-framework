<script setup lang="ts">
import JvButton from '@jovial/components/button'
import JvIcon from '@jovial/components/icon'
import { AcUnitRound } from '@vicons/material'
import { logEvent } from 'histoire/client'
import { reactive } from 'vue'

function handleClick() {
}
function initState() {
  return {
    loading: true,
    disabled: true,
    block: true,
    stacked: true,
  }
}
const state = reactive({
  loading: true,
  disabled: true,
  block: true,
  stacked: true,
})
</script>

<template>
  <Story title="基础组件/button 按钮" :layout="{ type: 'grid', width: 300 }">
    <template #controls>
      stacked: <input v-model="state.stacked" type="checkbox"> Disabled:
      <input v-model="state.disabled" type="checkbox">
    </template>
    <Variant title="type类型">
      <div class="space">
        <JvButton type="primary" :rounded="true">
          primary按钮
        </JvButton>
        <JvButton type="danger">
          danger按钮
        </JvButton>
        <JvButton type="info">
          info按钮
        </JvButton>
        <JvButton type="warning">
          warning按钮
        </JvButton>
        <JvButton type="success">
          success按钮
        </JvButton>
      </div>
    </Variant>
    <Variant title="Variant使用">
      <div class="space">
        <JvButton variant="text" :rounded="true">
          text按钮
        </JvButton>
        <JvButton variant="plain">
          plain按钮
        </JvButton>
        <JvButton variant="elevated">
          elevated按钮
        </JvButton>
        <JvButton variant="flat">
          flat 按钮
        </JvButton>
        <JvButton variant="tonal">
          tonal按钮
        </JvButton>
        <JvButton variant="outlined">
          outlined按钮
        </JvButton>
      </div>
    </Variant>
    <Variant title="size大小">
      <div class="space">
        <JvButton size="tiny">
          <template #prepend>
            <JvIcon size="tiny">
              <AcUnitRound />
            </JvIcon>
          </template>
          按钮
        </JvButton>
        <JvButton size="small">
          <template #prepend>
            <JvIcon size="small">
              <AcUnitRound />
            </JvIcon>
          </template>按钮
        </JvButton>
        <JvButton size="medium">
          按钮
        </JvButton>
        <JvButton size="large">
          按钮
        </JvButton>
        <JvButton size="x-large">
          <template #prepend>
            <JvIcon size="x-large">
              <AcUnitRound />
            </JvIcon>
          </template>
          按钮
        </JvButton>
      </div>
    </Variant>
    <Variant title="禁用">
      <div class="space">
        <JvButton :disabled="state.disabled" block>
          按钮
        </JvButton>
        <JvButton :disabled="state.disabled" type="primary">
          按钮
        </JvButton>
      </div>
    </Variant>

    <Variant title="形状">
      <div class="space">
        <JvButton>按钮</JvButton>
        <JvButton variant="outlined" rounded block>
          <template #prepend>
            <JvIcon>
              <AcUnitRound />
            </JvIcon>
          </template>
          圆角
        </JvButton>
        <JvButton variant="tonal">
          tonal按钮
          <template #append>
            <JvIcon>
              <AcUnitRound />
            </JvIcon>
          </template>
        </JvButton>
        <JvButton variant="text" rounded block>
          text按钮
        </JvButton>
        <JvButton variant="plain" rounded block>
          plain按钮
        </JvButton>
        <JvButton variant="flat" color="red" rounded block>
          flat按钮
        </JvButton>
      </div>
    </Variant>

    <Variant title="加载中" :init-state="initState">
      <JvButton :loading="true">
        按钮
      </JvButton>
      <JvButton
        size="x-large"
        variant="outlined"
        rounded
        block
        :loading="true"
      >
        outlined按钮
      </JvButton>
      <JvButton variant="tonal" rounded :loading="true">
        tonal按钮
      </JvButton>
      <JvButton variant="text" :loading="true" rounded block>
        text按钮
      </JvButton>
      <JvButton variant="plain" loading>
        plain按钮
      </JvButton>
      <JvButton variant="flat" color="red" loading rounded block>
        flat按钮
      </JvButton>
    </Variant>
    <Variant title="图标">
      <div class="space">
        <JvButton>
          <template #prepend>
            <JvIcon>
              <AcUnitRound />
            </JvIcon>
          </template>
          按钮
        </JvButton>

        <JvButton>
          <template #append>
            <JvIcon>
              <AcUnitRound />
            </JvIcon>
          </template>
          按钮
        </JvButton>
        <JvButton stacked>
          <template #append>
            <JvIcon>
              <AcUnitRound />
            </JvIcon>
          </template>
          按钮
        </JvButton>
        <JvButton stacked>
          <template #prepend>
            <JvIcon>
              <AcUnitRound />
            </JvIcon>
          </template>
          Button
        </JvButton>
      </div>
    </Variant>
    <Variant title="自定义颜色">
      <JvButton bg-color="#ff69b4" rounded>
        ff69b4按钮
      </JvButton>
    </Variant>
    <Variant title="事件">
      <JvButton
        bg-color="#ff69b4"
        rounded
        @click="logEvent('click', handleClick())"
      >
        Click按钮
      </JvButton>
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
