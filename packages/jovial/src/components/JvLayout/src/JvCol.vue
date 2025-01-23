<script lang="ts" setup>
import type { Breakpoint, JvColProps } from './type'
import { computed } from 'vue'

defineOptions({
  name: 'JvCol',
})

const props = withDefaults(defineProps<JvColProps>(), {
  span: 24,
  offset: 0,
})

const colClasses = computed(() => {
  const classes: string[] = []

  // 基础类
  if (props.span) {
    classes.push(`jv-col-${props.span}`)
  }
  if (props.offset) {
    classes.push(`jv-col-offset-${props.offset}`)
  }

  // 响应式类
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']
  breakpoints.forEach((bp) => {
    const sizeProp = props[bp]
    if (typeof sizeProp === 'number') {
      classes.push(`jv-col-${bp}-${sizeProp}`)
    }
    else if (typeof sizeProp === 'object') {
      if (sizeProp.span) {
        classes.push(`jv-col-${bp}-${sizeProp.span}`)
      }
      if (sizeProp.offset) {
        classes.push(`jv-col-${bp}-offset-${sizeProp.offset}`)
      }
    }
  })

  return classes
})
</script>

<template>
  <div
    class="jv-col"
    :class="colClasses"
  >
    <slot />
  </div>
</template>

<style lang="css" scoped>
.jv-col {
  box-sizing: border-box;
}
/* 生成基础列宽类 */
@for $i from 1 to 24 {
  .jv-col-$i {
    flex: 1 1 calc($i / 24 * 100%);
    max-width: calc($i / 24 * 100%);
  }

  .jv-col-offset-$i {
    margin-left: calc($i / 24 * 100%);
  }
}

/* 响应式断点 */
@media screen and (max-width: 576px) {
  @for $i from 1 to 24 {
    .jv-col-xs-$i {
      flex: 1 1 calc($i / 24 * 100%);
      max-width: calc($i / 24 * 100%);
    }
    .jv-col-xs-offset-$i {
      margin-left: calc($i / 24 * 100%);
    }
  }
}

@media screen and (min-width: 576px) {
  @for $i from 1 to 24 {
    .jv-col-sm-$i {
      flex: 1 1 calc($i / 24 * 100%);
      max-width: calc($i / 24 * 100%);
    }
    .jv-col-sm-offset-$i {
      margin-left: calc($i / 24 * 100%);
    }
  }
}

@media screen and (min-width: 768px) {
  @for $i from 1 to 24 {
    .jv-col-md-$i {
      flex: 1 1 calc($i / 24 * 100%);
      max-width: calc($i / 24 * 100%);
    }
    .jv-col-md-offset-$i {
      margin-left: calc($i / 24 * 100%);
    }
  }
}

@media screen and (min-width: 992px) {
  @for $i from 1 to 24 {
    .jv-col-lg-$i {
      flex: 1 1 calc($i / 24 * 100%);
      max-width: calc($i / 24 * 100%);
    }
    .jv-col-lg-offset-$i {
      margin-left: calc($i / 24 * 100%);
    }
  }
}

@media screen and (min-width: 1200px) {
  @for $i from 1 to 24 {
    .jv-col-xl-$i {
      flex: 1 1 calc($i / 24 * 100%);
      max-width: calc($i / 24 * 100%);
    }
    .jv-col-xl-offset-$i {
      margin-left: calc($i / 24 * 100%);
    }
  }
}
</style>
