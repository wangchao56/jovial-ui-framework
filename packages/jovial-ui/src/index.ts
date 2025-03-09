import type { JovialOptions } from './framework'
import * as components from '@jienix/jovial-components'
import * as composables from '@jienix/jovial-composables'
import * as directives from '@jienix/jovial-directives'
import { createJovialUI as _createJovialUI } from './framework'

console.log(components)
function createJovialUI(options: JovialOptions) {
  return _createJovialUI({
    components,
    directives,
    ...options,
  })
}

export { components, composables, createJovialUI, directives }
