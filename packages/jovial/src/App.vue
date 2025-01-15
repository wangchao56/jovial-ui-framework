<script setup lang="ts">
import { themeManagerContentKey } from '@jovial/utils/theme-plugin'
import { inject } from 'vue'
// // 创建样式表
// function createDynamicStyleSheet() {
//   const styleSheet = new CSSStyleSheet()
//   document.adoptedStyleSheets = [styleSheet]
//   return styleSheet
// }

// 插入规则
// function addCSSRule(styleSheet, selector, rules) {
//   styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length)
// }
// import type { JvVirtualScrollListInstance } from '@/components/JvVirtualScrollList'

// const date = ref(new Date())
// const virtuallistRef = ref<JvVirtualScrollListInstance>()
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
const trigger = ref('hover')
const manual = ref(false)
function handleTrigger() {
  trigger.value = trigger.value === 'hover' ? 'click' : 'hover'
  manual.value = !manual.value
}
const tooltipRef = ref()
function handleShow() {
  tooltipRef.value?.show()
}
function handleHide() {
  tooltipRef.value?.hide()
}
</script>

<template>
  <div class="container">
    <JvButton type="primary" @click="handleClick">
      按钮
    </JvButton>
    <JvButton type="info" @click="handleTrigger">
      按钮
    </JvButton>
    <JvButton type="success" @click="handleShow">
      show按钮
    </JvButton>
    <JvButton type="warning" @click="handleHide">
      hide按钮
    </JvButton>
    <JvCollapse v-model="collapses" accordion>
      <JvCollapseItem name="jieni" title="折叠面板标题">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus harum, magni reprehenderit consectetur molestiae rerum explicabo exercitationem dignissimos ducimus beatae labore eveniet sit sint asperiores? Mollitia necessitatibus neque omnis cum?
      </JvCollapseItem>
      <JvCollapseItem name="test" title="折叠面板test标题">
        <template #title />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus harum, magni reprehenderit consectetur molestiae rerum explicabo exercitationem dignissimos ducimus beatae labore eveniet sit sint asperiores? Mollitia necessitatibus neque omnis cum?
      </JvCollapseItem>
    </JvCollapse>
    <JvSpace direction="vertical" :size="22">
      <JvTooltip :trigger="trigger" placement="bottom" :manual="manual">
        <span>折叠面板test标题1{{ trigger }}{{ manual }}</span>
      </JvTooltip>
      <JvTooltip :trigger="trigger" placement="left" :manual="manual">
        <span>折叠面板test标题2{{ trigger }}{{ manual }}</span>
      </JvTooltip>
      <JvTooltip :trigger="trigger" placement="right" :open-delay="1000">
        <span>折叠面板test标题3{{ trigger }}</span>
      </JvTooltip>
      <JvTooltip ref="tooltipRef" trigger="click" :manual="manual">
        <span>手动触发Tooltip{{ manual }}</span>
      </JvTooltip>
      <JvTooltip trigger="click" :open-delay="1000">
        <span>延迟触发Tooltip</span>
      </JvTooltip>
      <JvTooltip trigger="contextmenu">
        <span>右键触发Tooltip</span>
      </JvTooltip>
    </JvSpace>
  </div>
</template>

<style lang="scss" scoped>

</style>
