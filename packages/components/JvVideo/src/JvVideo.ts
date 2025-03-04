import type { Slot } from 'vue'

export const jvVideoProps = {
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
} as const

export type JvVideoProps = ExtractPropTypes<typeof jvVideoProps>

export interface JvVideoEmits {
  /**
   * 播放
   */
  (e: 'play'): void
  /**
   * 暂停
   */
  (e: 'pause'): void
  /**
   * 播放结束
   */
  (e: 'ended'): void
  /**
   * 播放进度更新
   */
  (e: 'timeupdate', currentTime: number): void
  /**
   * 错误
   */
  (e: 'error', error: Event): void
}

export interface JvVideoSlots {
  /**
   * 默认插槽
   */
  default?: Slot
}

export interface JvVideoExpose {
  /**
   * 播放
   */
  play: () => void
  /**
   * 暂停
   */
  pause: () => void
  /**
   * 获取当前播放时间
   */
  getCurrentTime: () => number
  /**
   * 获取视频总时长
   */
  getDuration: () => number
}
