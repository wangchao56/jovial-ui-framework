<script setup lang="ts">
import type { ListItem } from './components/JvListItem'
import type { MenuItem } from './components/JvMenu/src/JvMenu'
import simple from './components/JvCalendar/__test__/simple.vue'

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'mdi:chart-box',
  },
  {
    key: 'user',
    label: '用户管理',
    icon: 'mdi:account-box',
    children: [
      {
        key: 'user-list',
        label: '用户列表',
      },
      {
        key: 'user-settings',
        label: '用户设置',
      },
    ],
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: 'mdi:cog',
    children: [
      {
        key: 'general',
        label: '常规设置',
      },
      {
        key: 'security',
        label: '安全设置',
      },
    ],
  },
]

const switchValue = ref(true)

const openDialog = ref(false)
const openDrawer = ref(false)
const showAlert = ref(true)

function showDislog() {
  openDialog.value = true
}

function showDrawer() {
  openDrawer.value = true
}
function openAlert() {
  showAlert.value = true
}
const overlay = ref(false)
function handleOverlay() {
  overlay.value = !overlay.value
}

const listItems = reactive<ListItem[]>([
  {
    title: '列表1',
    key: 'list-1',
    type: 'item',
    children: [
      {
        title: '列表1-1',
        key: 'list-1-1',
        type: 'item',
      },
    ],
  },
  {
    title: '列表2',
    key: 'list-2',
    type: 'item',
  },
])
</script>

<template>
  <JvContainer direction="horizontal" border>
    <JvHeader>
      头部
      <JvIcon name="mdi:account-box" />
    </JvHeader>
    <JvAside width="240px">
      <JvMenu :items="menuItems" />
    </JvAside>
    <JvMain>
      <JvRow :gutter="[16, 16]">
        <JvColSpace
          v-if="switchValue" :span="12" align="start"
          justify="start"
          space-direction="vertical"
          space-justify="start"
          space-align="start"
        >
          <jv-switch v-model="switchValue" size="large" />
          <JvBadge :count="1000">
            <JvButton type="warning" prepend-icon="ic:round-warning" @click="handleOverlay">
              open-delay按钮
            </JvButton>
          </JvBadge>

          <JvBadge :count="10" position="top-left" size="medium">
            <JvButton type="warning" prepend-icon="ic:round-warning" @click="openAlert">
              openAlert
            </JvButton>
          </JvBadge>

          <JvBadge :count="10" position="bottom-left" size="large">
            <JvButton type="warning" prepend-icon="ic:round-warning" @click="showDrawer">
              showDrawer按钮
            </JvButton>
          </JvBadge>

          <JvBadge :count="10" position="bottom-right" rounded color="blue">
            <JvButton type="warning" prepend-icon="ic:round-warning" @click="showDislog">
              showDialog按钮
            </JvButton>
          </JvBadge>

          <JvList :items="listItems" />
        </JvColSpace>
        <JvColSpace
          :span="12"
          align="start" justify="start"
          space-direction="vertical"
          space-justify="start"
          space-align="start"
        >
          <JvCard
            title="卡片标题"
            :bordered="false"
            subtitle="卡片副标题"
            shadow="hover"
            @click="(e) => {
              console.log(e)
            }"
          >
            <div style="width: 300px;">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus assumenda libero reprehenderit ex repellat possimus esse. Voluptatibus atque rem a culpa quae libero
              libero, iusto dolorem quibusdam obcaecati odit excepturi!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus assumenda libero reprehenderit ex repellat possimus esse. Voluptatibus atque rem a culpa quae libero
            </div>
            <template #actions>
              <JvButton type="primary">
                确定
                <JvIcon name="mdi:check" />
              </JvButton>
            </template>
          </JvCard>
          <JvAffix :offset="100">
            <div style="background-color: blueviolet;">
              <simple :model-value="new Date()" />
            </div>

            <JvRate
              :allow-half="true"
              :model-value="3"
              :size="60"
              :gap="5"
              color="#1976D2"
            />
          </JvAffix>
        </JvColSpace>
      </JvRow>
    </JvMain>
    <JvFooter>
      页脚
    </JvFooter>

    <JvDialog v-model="openDialog">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus assumenda libero reprehenderit ex repellat possimus esse. Voluptatibus atque rem a culpa quae libero, iusto dolorem quibusdam obcaecati odit excepturi!
      </div>
    </JvDialog>

    <JvDrawer v-model="openDrawer" position="right" closable>
      <template #header>
        标题
      </template>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus assumenda libero reprehenderit ex repellat possimus esse. Voluptatibus atque rem a culpa quae libero, iusto dolorem quibusdam obcaecati odit excepturi!
      </div>
      <template #footer>
        <JvButton type="primary">
          确定
        </JvButton>
      </template>
    </JvDrawer>
  </JvContainer>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  max-height: 100vh;
  max-width: 100vw;
}
</style>
