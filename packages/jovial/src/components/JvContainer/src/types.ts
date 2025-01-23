import type { PropType } from 'vue'

export type Direction = 'horizontal' | 'vertical'

export const containerProps = {
  direction: {
    type: String as PropType<Direction>,
    default: undefined,
  },
  border: {
    type: Boolean,
    default: false,
  },
} as const

export interface ContainerProps {
  direction?: Direction
  border?: boolean
  headerHeight?: string
  asideWidth?: string
  footerHeight?: string
}

export const headerProps = {
  height: {
    type: String,
    default: '60px',
  },
} as const

export const asideProps = {
  width: {
    type: String,
    default: '200px',
  },
} as const

export const footerProps = {
  height: {
    type: String,
    default: '60px',
  },
} as const

export interface ContainerContext {
  isVertical: boolean
  direction: Direction
  border: boolean
  headerHeight: string
  asideWidth: string
  footerHeight: string
}

export const containerContextKey: InjectionKey<ContainerContext> = Symbol('containerContextKey')
