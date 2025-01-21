<script setup lang="ts">
import type { Trigger } from './components/JvTooltip'
import { themeManagerContentKey } from '@jovial/utils/theme-plugin'
import { inject } from 'vue'
import { createMessage } from './components/JvMessage'

const themeManager = inject(themeManagerContentKey)
const collapses = ref<string[]>(['test', 'jieni'])

function handleClick(_e: Event) {
  collapses.value = ['test', 'jieni']
  try {
    if (!themeManager) {
      throw new Error('ThemeManager is not provided')
    }
    themeManager.registerTheme('dark', {
      name: 'dark',
      colors: {
        primary: '#333',
        secondary: '#409eff',
        background: '#222',
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 14,
      },
      components: {
        button: {
          width: '234px',
          backgroundColor: 'red',
        },
      },
    })
    themeManager.switchTheme('dark')
  }
  catch (error) {
    console.error('Error during handleClick:', error)
  }
}
const trigger = ref<Trigger>('hover')
const manual = ref(false)
function handleTrigger() {
  trigger.value = trigger.value === 'hover' ? 'click' : 'hover'
  manual.value = !manual.value
  const message = createMessage({
    modelValue: true,
    type: 'success',
    message: `点击了`,
    duration: 0,
  })

  setTimeout(() => {
    message.manualDestory(message.uid)
  }, 3000)
}
const tooltipRef = ref()
function handleShow() {
  tooltipRef.value?.show()
}
// function handleHide() {
//   tooltipRef.value?.hide()
// }

// const menuOptions: MenuOption[] = [
//   {
//     type: 'item',
//     label: '菜单123213123',
//     key: 'menu-1',
//   },
//   {
//     label: '菜单2',
//     key: 'menu-2',
//     type: 'item',
//   },
//   {
//     type: 'divider',
//     key: 'divider-1',
//     // label: '分割线',
//   },
//   {
//     label: '菜单3',
//     key: 'menu-3',
//     type: 'item',
//     disabled: true,
//     children: [
//       {
//         label: '子菜单1',
//         key: 'submenu-1',
//         type: 'item',
//       },
//       {
//         label: '子菜单2',
//         key: 'submenu-2',
//         type: 'item',
//       },
//     ],
//   },
// ]

// const items = [
//   {
//     title: '菜单1',
//     key: 'menu-1',
//   },
//   {
//     title: '菜单2',
//     key: 'menu-2',
//   },
//   {
//     type: 'divider',
//   },
//   {
//     title: '菜单3',
//     key: 'menu-3',
//   },
// ]

// function handleClickMenu(item: any) {
//   console.log(item)
// }

onMounted(() => {
  createMessage({
    type: 'success',
    message: '这是一条成功消息1',
    duration: 0,
  })
  // createMessage({
  //   type: 'warning',
  //   message: '这是一条成功消息2',
  //   duration: 0,
  // })
  // createMessage({
  //   type: 'info',
  //   message: '这是一条成功消息2',
  //   duration: 0,
  // })
  // createMessage({
  //   type: 'danger',
  //   message: '这是一条成功消息2',
  //   duration: 0,
  // })
})

const switchValue = ref(true)

const openDialog = ref(false)
const openDrawer = ref(false)
const showAlert = ref(true)
const showNotif = ref(true)
function showConfirm() {
  showNotif.value = true
}

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
document.body.style = {
  overflow: 'scorll',
  height: '200vh',
  width: '100vw',

}
</script>

<template>
  <div class="container">
    <template v-if="showAlert">
      <JvAlert
        title="警告提示"
        description="这是一条警告提示，其中的内容是额外的补充说明。"
        type="warning"
        show-icon
        closable
        close-text="关闭"
      />
      <JvAlert
        title="警告提示"
        description="这是一条警告提示，其中的内容是额外的补充说明。"
        type="success"
        show-icon
        closable
      />
      <JvAlert
        title="警告提示"
        description="这是一条警告提示，其中的内容是额外的补充说明。"
        type="info"
        show-icon
        closable
      />
      <JvAlert
        title="警告提示"
        description="这是一条警告提示，其中的内容是额外的补充说明。"
        type="error"
        show-icon
        closable
      />
    </template>

    <JvButton type="primary" @click="handleClick">
      按钮
    </JvButton>
    <JvButton type="info" prepend-icon="mdi:account-box" @click="handleTrigger">
      消息
    </JvButton>
    <JvButton type="success" @click="handleShow">
      show按钮
    </JvButton>
    <JvButton type="warning" prepend-icon="ic:round-warning" @click="showConfirm">
      hide按钮
    </JvButton>
    <!-- <JvCollapse v-model="collapses" accordion>
      <JvCollapseItem name="jieni" title="折叠面板标题">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus harum, magni reprehenderit consectetur molestiae rerum explicabo exercitationem dignissimos ducimus beatae labore eveniet sit sint asperiores? Mollitia necessitatibus neque omnis cum?
      </JvCollapseItem>
      <JvCollapseItem name="test" title="折叠面板test标题">
        <template #title />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus harum, magni reprehenderit consectetur molestiae rerum explicabo exercitationem dignissimos ducimus beatae labore eveniet sit sint asperiores? Mollitia necessitatibus neque omnis cum?
      </JvCollapseItem>
    </JvCollapse>
     -->
    <!-- <JvSpace direction="vertical" :size="22">
      <JvTooltip :trigger="trigger" placement="right" :manual="manual">
        <span>折叠面板test标题1{{ trigger }}{{ manual }}</span>
      </JvTooltip>
      <JvTooltip trigger="click" placement="top" content="点击触发折叠面板test标题2">
        <span> 点击触发折叠面板test标题2</span>
      </JvTooltip>
      <JvTooltip :trigger="trigger" placement="right" :open-delay="1000">
        <span>折叠面板test标题3{{ trigger }}</span>
      </JvTooltip>
      <JvTooltip ref="tooltipRef" trigger="click" :manual="manual">
        <span>手动触发Tooltip{{ manual }}</span>
      </JvTooltip>
      <JvTooltip trigger="click" :open-delay="1000" content="延迟触发Tooltip">
        <span>延迟触发Tooltip</span>
      </JvTooltip>
      <JvTooltip trigger="contextmenu">
        <span>右键触发Tooltip</span>
      </JvTooltip>
    </JvSpace>
    <br>
    <JvDropdown :menu-options="menuOptions" @click-menu="handleClickMenu">
      <JvButton type="primary">
        下拉菜单
      </JvButton>
    </JvDropdown> -->

    <!-- <JvList :items="items" /> -->

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

    <!-- <div class="JvOverlay-box">
      <JvOverlay
        v-model="overlay"
        contained
      >
        <div class="box">
          2323
        </div>
      </JvOverlay>
    </div> -->

    <JvNotification v-if="showNotif">
      通知
    </JvNotification>
    <JvNotification>
      通知
    </JvNotification>
    <JvNotification>
      通知
    </JvNotification>

    <JvCard
      title="卡片标题"
      :bordered="false"
      subtitle="卡片副标题"
      shadow="hover"
    >
      <div style="width: 350px;">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus assumenda libero reprehenderit ex repellat possimus esse. Voluptatibus atque rem a culpa quae libero
        libero, iusto dolorem quibusdam obcaecati odit excepturi!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus assumenda libero reprehenderit ex repellat possimus esse. Voluptatibus atque rem a culpa quae libero
      </div>
      <template #header />

      <template #actions>
        <JvButton type="primary">
          确定
          <JvIcon name="mdi:check" />
        </JvButton>
      </template>
    </JvCard>

    <JvAffix :offset="100">
      <JvCard title="固定" />
    </JvAffix>
  </div>
</template>

<style  scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 56px;
}

.JvOverlay-box {
  width: 450px;
  height: 450px;
  background-color: #fff;
  border: #1454b5 solid 1px;
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  background-color: #13c7c7;
}
</style>
