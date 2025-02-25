import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/pages/layout/AdminLayout.vue'
import NotFound from '@/pages/not-found.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin',
    meta: {
      hideMenu: true,
    },
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    meta: { title: '后台管理', icon: 'ion:settings' },
    children: [
      // ================== 内容管理 ==================
      {
        path: 'posts',
        name: 'PostManagement',
        meta: { title: '文章管理', icon: 'mdi:post' },
        redirect: '/admin/posts/list',
        children: [
          {
            path: 'list',
            name: 'PostList',
            component: () => import('@/pages/posts/List.vue'),
            meta: { title: '所有文章' },
          },
          {
            path: 'new',
            name: 'PostNew',
            component: () => import('@/pages/posts/Editor.vue'),
            meta: { title: '写文章', cacheable: true },
          },
          {
            path: 'drafts',
            name: 'PostDrafts',
            component: () => import('@/pages/posts/Drafts.vue'),
            meta: { title: '草稿箱' },
          },
        ],
      },

      // ================== 分类标签 ==================
      {
        path: 'taxonomy',
        name: 'Taxonomy',
        meta: { title: '分类标签', icon: 'mdi:tag' },
        children: [
          {
            path: 'categories',
            name: 'CategoryManagement',
            component: () => import('@/pages/taxonomy/Categories.vue'),
            meta: { title: '分类管理', icon: 'mdi:tag' },
          },
          {
            path: 'tags',
            name: 'TagManagement',
            component: () => import('@/pages/taxonomy/Tags.vue'),
            meta: { title: '标签管理' },
          },
        ],
      },

      // ================== 评论管理 ==================
      {
        path: 'comments',
        name: 'CommentManagement',
        component: () => import('@/pages/comments/List.vue'),
        meta: {
          title: '评论管理',
          icon: 'mdi:comment',
          badge: 'new', // 可扩展角标功能
        },
      },

      // ================== 用户管理 ==================
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('@/pages/users/List.vue'),
        meta: {
          title: '用户管理',
          icon: 'mdi:account-group',
          permission: ['ADMIN'], // 权限控制
        },
      },

      // ================== 数据统计 ==================
      {
        path: 'analytics',
        name: 'Analytics',
        meta: { title: '数据统计', icon: 'mdi:chart-bar' },
        children: [
          {
            path: 'traffic',
            name: 'TrafficStats',
            component: () => import('@/pages/analytics/Traffic.vue'),
            meta: { title: '访问统计' },
          },
          {
            path: 'popular',
            name: 'PopularContent',
            component: () => import('@/pages/analytics/Popular.vue'),
            meta: { title: '热门内容' },
          },
        ],
      },

      // ================== 系统设置 ==================
      {
        path: 'settings',
        name: 'SystemSettings',
        meta: { title: '系统设置', icon: 'mdi:cog' },
        redirect: { name: 'GeneralSettings' },
        children: [
          {
            path: 'general',
            name: 'GeneralSettings',
            component: () => import('@/pages/settings/General.vue'),
            meta: { title: '常规设置' },
          },
          {
            path: 'seo',
            name: 'SEOSettings',
            component: () => import('@/pages/settings/SEO.vue'),
            meta: { title: 'SEO设置' },
          },
          {
            path: 'backup',
            name: 'BackupRestore',
            component: () => import('@/pages/settings/Backup.vue'),
            meta: { title: '备份恢复' },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      hideMenu: true,
      title: '404',
    },
  },
]

declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 菜单标题（必填）
    icon?: string // 菜单图标类名
    hideMenu?: boolean // 是否隐藏菜单
    order?: number
    // 可扩展其他元字段
    auth?: string[] // 权限标识
    cache?: boolean // 是否缓存页面
  }
}
