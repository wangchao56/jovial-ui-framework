import type { App } from 'vue'
import { ItemType } from '@/components/JvMenu'
import { createRouter, createWebHistory } from 'vue-router'
import { routesToMenu } from './helper'
import { routes } from './routes'

const routerInstance = createRouter({
  history: createWebHistory(),
  routes,
})

export const router = routerInstance
export default {
  install: (app: App) => {
    app.use(routerInstance)
    // 获取菜单
    const menuItems = routesToMenu(routes)
    const newMenuItems = menuItems.map((item) => {
      return {
        ...item,
        type: ItemType.Group,
      }
    })

    // 存在localstorage中
    localStorage.setItem('menuItems', JSON.stringify(newMenuItems))
  },
}
export type RouterInstance = typeof routerInstance
