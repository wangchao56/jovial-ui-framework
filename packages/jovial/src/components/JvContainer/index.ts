import { withInstall } from '@jovial/utils'
import Aside from './src/Aside.vue'
import Container from './src/Container.vue'
import Footer from './src/Footer.vue'
import Header from './src/Header.vue'
import Main from './src/Main.vue'

export const JvContainer = withInstall(Container)
export const JvHeader = withInstall(Header)
export const JvAside = withInstall(Aside)
export const JvMain = withInstall(Main)
export const JvFooter = withInstall(Footer)

export * from './src/types'

export type JvContainerInstance = InstanceType<typeof JvContainer>
export type JvHeaderInstance = InstanceType<typeof JvHeader>
export type JvAsideInstance = InstanceType<typeof JvAside>
export type JvMainInstance = InstanceType<typeof JvMain>
export type JvFooterInstance = InstanceType<typeof JvFooter>

declare module 'vue' {
  export interface GlobalComponents {
    JvContainer: typeof JvContainer
    JvHeader: typeof JvHeader
    JvAside: typeof JvAside
    JvMain: typeof JvMain
    JvFooter: typeof JvFooter
  }
}
