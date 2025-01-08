import { withInstall } from '../../utils/with-install.mjs'
import _VirtualScrollList from './src/virtual-scroll-list.setup.mjs'

export { virtualItemProps, virtualProps } from './src/props.mjs'
export { virtualScrollListEmits, virtualScrollListProps, virtualScrollListSlots } from './src/virtual-scroll-list.mjs'
export { initVirtual } from './src/virtual.mjs'

const VirtualScrollList = withInstall(_VirtualScrollList)

export { VirtualScrollList as default }
// # sourceMappingURL=index.mjs.map
