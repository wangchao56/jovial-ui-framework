import type { Slot } from 'vue'

export const jvBarProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: Number,
  always: Boolean,
} as const

export type JvBarProps = ExtractPropTypes<typeof jvBarProps>

export interface JvBarEmits {
  (e: 'scroll', moveRatio: number): void
}

export interface JvBarSlots {
  default?: Slot
}
