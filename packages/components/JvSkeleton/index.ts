import { withInstall } from '@jienix/utils'
import _JvSkeleton from './src/JvSkeleton.setup'
import './style'

const JvSkeleton = withInstall(_JvSkeleton)

export * from './src/JvSkeleton'
export default JvSkeleton
export type JvJvSkeletonInstance = InstanceType<typeof JvSkeleton>
export type {
  JvSkeletonEmits,
  JvSkeletonExpose,
  JvSkeletonProps,
  JvSkeletonSlots,
} from './src/JvSkeleton'
declare module 'vue' {
  export interface GlobalComponents {
    JvSkeleton: typeof JvSkeleton
  }
}
