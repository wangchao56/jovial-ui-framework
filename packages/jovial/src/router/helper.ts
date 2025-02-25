import type { RouteRecordRaw } from 'vue-router'
import { ItemType, type MenuItem } from '@/components/JvMenu'
// 路由转换为菜单
export function routesToMenu(routes: RouteRecordRaw[], parentPath: string = '/'): MenuItem[] {
  const result = routes.reduce((menu, route) => {
    // 增强过滤条件：同时检查命名路由和有效展示条件
    if (!route.name || route.meta?.hideMenu) {
      return menu
    }

    // 生成规范化路径（处理各种边界情况）
    const normalizedPath = normalizePath(parentPath, route.path)
    // 处理子路由（优先递归处理）
    const children = route.children?.length
      ? routesToMenu(route.children, normalizedPath)
      : undefined

    // 判断是否应为有效菜单项的条件：
    // 1. 有有效子菜单 或
    // 2. 是终端路由（有组件）或强制展示标记
    const shouldKeep = Boolean(
      children?.length
      || route.component
      || route.meta?.alwaysShow,
    )

    if (shouldKeep) {
      menu.push({
        key: route.name as string,
        label: route.meta?.title || route.name! as string,
        icon: route.meta?.icon,
        path: normalizedPath,
        type: determineMenuType(route, children),
        children,
      })
    }

    return menu
  }, [] as MenuItem[])
  return result
}

// 辅助函数：判断路由类型
function determineMenuType(route: RouteRecordRaw, children?: MenuItem[]): ItemType {
  if (children?.length)
    return ItemType.SubMenu
  return route.meta?.isGroup ? ItemType.Group : ItemType.Item
}

// 辅助函数：路径规范化处理
/**
 * 规范化路径
 * @param parent 父路径
 * @param current 当前路径
 * @returns 规范化后的路径
 * @example
 * normalizePath('/admin', '/posts') // '/admin/posts'
 * normalizePath('/admin', '/') // '/admin'
 * normalizePath('/admin', '') // '/admin'
 * normalizePath('', '/posts') // '/posts'
 * normalizePath('', '') // ''
 */
function normalizePath(parent: string, current: string): string {
  return [parent.replace(/\/$/, ''), current.replace(/^\//, '')]
    .filter(Boolean)
    .join('/')
    .replace(/\/+/g, '/')
}
