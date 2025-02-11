<script setup lang="ts">
import { inject, ref } from 'vue'
import JvApp from '../components/JvApp/src/JvApp.vue'
import JvLoadingBar from '../components/JvLoading/src/JvLoadingBar.vue'
import { useTheme } from '../components/theme'

const theme = useTheme()
const loading = ref(false)
const loadingPercentage = ref(0)

const startViewTransition = inject<(cb: () => void) => void>('startViewTransition')

// 模拟加载过程
function startLoading() {
  loading.value = true
  loadingPercentage.value = 0
  const timer = setInterval(() => {
    if (loadingPercentage.value < 100) {
      loadingPercentage.value += 10
    }
    else {
      clearInterval(timer)
      loading.value = false
    }
  }, 200)
}

// 切换主题
function toggleTheme() {
  startViewTransition?.(() => {
    const newTheme = theme.name.value === 'light' ? 'dark' : 'light'
    theme.switch(newTheme)
    startLoading()
  })
}

// 模拟文章列表
const articles = [
  {
    title: '使用 Vue 3 和 TypeScript 构建现代化应用',
    summary: '本文将介绍如何使用 Vue 3 和 TypeScript 构建一个现代化的 Web 应用，包括项目设置、组件开发、状态管理等内容...',
    date: '2024-03-20',
  },
  {
    title: '深入理解 Vue 3 的响应式系统',
    summary: '探索 Vue 3 响应式系统的工作原理，包括 ref、reactive、computed 和 watch 的实现机制...',
    date: '2024-03-18',
  },
  {
    title: '组件库开发实践与经验分享',
    summary: '分享在开发组件库过程中的经验和最佳实践，包括组件设计、主题系统、文档生成等方面的内容...',
    date: '2024-03-15',
  },
]
</script>

<template>
  <JvApp>
    <!-- 加载条 -->
    <JvLoadingBar
      v-if="loading"
      :percentage="loadingPercentage"
      :type="theme.name.value === 'light' ? 'primary' : 'success'"
      active
      shadow
    />

    <!-- 顶部导航 -->
    <header class="blog-header">
      <div class="blog-header__content">
        <h1 class="blog-header__title">
          My Blog
        </h1>
        <button class="blog-header__theme-toggle" @click="toggleTheme">
          {{ theme.name.value === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="blog-main">
      <div class="blog-main__content">
        <!-- 文章列表 -->
        <div class="article-list">
          <article
            v-for="article in articles"
            :key="article.title"
            class="article-card"
          >
            <h2 class="article-card__title">
              {{ article.title }}
            </h2>
            <p class="article-card__summary">
              {{ article.summary }}
            </p>
            <time class="article-card__date">
              {{ article.date }}
            </time>
          </article>
        </div>
      </div>
    </main>
  </JvApp>
</template>

<style lang="scss" scoped>
.blog-header {
  padding: 1rem;
  border-bottom: 1px solid var(--jv-color-border);
  background-color: var(--jv-color-bg-1);

  &__content {
    display: flex;
    margin: 0 auto;
    max-width: 1200px;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin: 0;
    color: var(--jv-color-text-1);
    font-size: 1.5rem;
    font-weight: 600;
  }

  &__theme-toggle {
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--jv-color-bg-2);
    }
  }
}

.blog-main {
  padding: 2rem 1rem;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.article-list {
  display: grid;
  gap: 2rem;
}

.article-card {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--jv-color-bg-1);
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    transform: translateY(-2px);
  }

  &__title {
    margin: 0 0 1rem;
    color: var(--jv-color-text-1);
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__summary {
    margin: 0 0 1rem;
    color: var(--jv-color-text-2);
    line-height: 1.6;
  }

  &__date {
    display: block;
    color: var(--jv-color-text-3);
    font-size: 0.875rem;
  }
}

// 深色主题适配
:root[class*='jv-theme--dark'] {
  .article-card {
    box-shadow: 0 2px 8px rgb(0 0 0 / 30%);

    &:hover {
      box-shadow: 0 4px 12px rgb(0 0 0 / 40%);
    }
  }
}
</style>
