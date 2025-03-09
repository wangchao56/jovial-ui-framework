<script setup lang="ts">
import type { JvImageEmits } from './JvImage'
import { createNamespace } from '@jienix/utils'
import { computed, onMounted, ref } from 'vue'
import { jvImageProps } from './JvImage'

defineOptions({ name: 'JvImage', inheritAttrs: false })

const props = defineProps(jvImageProps)
const emit = defineEmits<JvImageEmits>()
const bem = createNamespace('image')

const rootRef = ref<HTMLElement | null>(null)
const pictureRef = ref<HTMLPictureElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const isLoading = ref(true)
const isError = ref(false)
const showPreview = ref(false)

// 计算样式
const imageStyle = computed(() => {
  const style: Record<string, string> = {
    objectFit: props.fit || 'fill',
  }

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.radius) {
    style.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius
  }

  return style
})

// 处理图片加载
function handleLoad(evt: Event) {
  isLoading.value = false
  isError.value = false
  emit('load', evt)
}

// 处理加载失败
function handleError(evt: Event) {
  isLoading.value = false
  isError.value = true
  if (props.fallback && imgRef.value) {
    imgRef.value.src = props.fallback
  }
  emit('error', evt)
}

// 处理点击事件
function handleClick(evt: MouseEvent) {
  emit('click', evt)
  if (props.preview && !isError.value) {
    showPreview.value = true
  }
}

// 关闭预览
function closePreview() {
  showPreview.value = false
}

// 懒加载处理
onMounted(() => {
  if (props.lazy && pictureRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 延迟加载所有 source 和 img 标签
            const sources = pictureRef.value?.getElementsByTagName('source')
            if (sources) {
              Array.from(sources).forEach((source) => {
                if (source.dataset.src) {
                  source.srcset = source.dataset.src
                }
              })
            }
            if (imgRef.value && props.src) {
              imgRef.value.src = props.src
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01 },
    )

    observer.observe(pictureRef.value)

    return () => {
      if (pictureRef.value) {
        observer.unobserve(pictureRef.value)
      }
    }
  }
})

defineExpose({
  root: rootRef,
})
</script>

<template>
  <div ref="rootRef" :class="bem.b()" @click="handleClick">
    <picture v-show="!isError" ref="pictureRef">
      <source
        v-for="(source, index) in sources" :key="index" :media="source.media" :type="source.type"
        :srcset="lazy ? undefined : source.src" :data-src="lazy ? source.src : undefined"
      >
      <img
        ref="imgRef" :src="lazy ? placeholder : src" :alt="alt" :style="imageStyle" :class="bem.e('inner')"
        @load="handleLoad" @error="handleError"
      >
    </picture>

    <!-- 加载中状态 -->
    <div v-if="isLoading" :class="bem.e('placeholder')">
      <slot name="placeholder">
        <div :class="bem.e('loading')" />
      </slot>
    </div>

    <!-- 加载失败状态 -->
    <div v-if="isError && !hideOnError" :class="bem.e('error')">
      <slot name="error">
        <div :class="bem.e('error-icon')" />
        <p :class="bem.e('error-text')">
          加载失败
        </p>
      </slot>
    </div>

    <!-- 图片预览 -->
    <div v-if="showPreview" :class="bem.e('preview')" @click.stop="closePreview">
      <slot name="preview">
        <img :src="previewSrc || src" :alt="alt">
      </slot>
    </div>
  </div>
</template>
