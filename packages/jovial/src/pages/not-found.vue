<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'NotFound',
})
const router = useRouter()

function handleGoHome() {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="error-content">
      <h1 class="error-code">
        404
      </h1>
      <h2 class="error-title">
        页面未找到
      </h2>
      <p class="error-description">
        您访问的页面可能已经丢失或暂时不可用
      </p>
      <button
        class="home-button"
        @click="handleGoHome"
      >
        <span class="material-icons">home</span>
        返回首页
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.error-content {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  color: #2c3e50;
  margin: 0;
  line-height: 1;
  font-weight: 700;
  opacity: 0.8;
}

.error-title {
  font-size: 2rem;
  color: #34495e;
  margin: 1rem 0;
}

.error-description {
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.home-button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }

  .material-icons {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
}
</style>
