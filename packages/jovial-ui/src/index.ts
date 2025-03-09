import type { JovialOptions } from './framework'
import * as components from '@jienix/jovial-components'
import * as composables from '@jienix/jovial-composables'
import * as directives from '@jienix/jovial-directives'
import { createJovialUI as _createJovialUI } from './framework'

function createJovialUI(options: JovialOptions) {
  return _createJovialUI({
    components: components as Record<string, any>,
    directives,
    ...options,
  })
}

export { components, composables, createJovialUI, directives }
