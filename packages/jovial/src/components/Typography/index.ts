import { withInstall } from '@jovial/utils'
import _JvCode from './src/JvCode.vue'
import _JvLink from './src/JvLink.vue'
import _JvParagraph from './src/JvParagraph.vue'
import _JvText from './src/JvText.vue'
import _JvTitle from './src/JvTitle.vue'
import './style'

const JvParagraph = withInstall(_JvParagraph)
const JvText = withInstall(_JvText)
const JvTitle = withInstall(_JvTitle)
const JvLink = withInstall(_JvLink)
const JvCode = withInstall(_JvCode)
export * from './src/types'
export { JvCode, JvLink, JvParagraph, JvText, JvTitle }

declare module 'vue' {
  export interface GlobalComponents {
    JvParagraph: typeof JvParagraph
    JvText: typeof JvText
    JvTitle: typeof JvTitle
    JvLink: typeof JvLink
    JvCode: typeof JvCode
  }
}
