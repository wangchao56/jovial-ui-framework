<script setup lang="ts">
import type { JvTimelineEmits } from './JvTimeline'
import { createNamespace } from '@jovial/utils'
import { jvTimelineProps } from './JvTimeline'

defineOptions({ name: 'JvTimeline' })
defineProps(jvTimelineProps)
const emit = defineEmits<JvTimelineEmits>()
const bem = createNamespace('timeline')
</script>

<template>
  <div :class="[bem.b(), bem.m(direction)]">
    <div
      v-for="(item, index) in timelineList"
      :key="index"
      :class="bem.e('item')"
      @click="emit('clickItem', item)"
    >
      <div :class="bem.e('dot')">
        <slot name="dot" :item="item">
          <div :class="bem.e('dot-inner')" />
        </slot>
      </div>
      <div :class="bem.e('content')">
        <slot name="item" :item="item">
          <div :class="bem.e('title')">
            {{ item.title }}
          </div>
          <div :class="bem.e('text')">
            {{ item.content }}
          </div>
          <div :class="bem.e('time')">
            {{ item.time }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
