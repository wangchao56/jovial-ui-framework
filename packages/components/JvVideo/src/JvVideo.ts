import type { Slot } from 'vue'

export const jvVideoProps = {
  /** 视频源 */
  src: {
    type: String,
    required: true,
  },
  /** 封面 */
  poster: {
    type: String,
    default: '',
  },
  /** 宽度 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },
  /** 高度 */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  /** 自动播放 */
  autoplay: {
    type: Boolean,
    default: false,
  },
  /** 是否显示控制栏 */
  controls: {
    type: Boolean,
    default: true,
  },
  /** 是否循环播放 */
  loop: {
    type: Boolean,
    default: false,
  },
  /** 是否静音 */
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
