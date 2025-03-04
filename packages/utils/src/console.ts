// Utilities
import { warn } from 'vue'

export function consoleWarn(message: string): void {
  warn(`Jovial: ${message}`)
}

export function consoleError(message: string): void {
  warn(`Jovial error: ${message}`)
}

// export function deprecate(original: string, replacement: string | string[]) {
//   replacement = Array.isArray(replacement)
//     ? `${replacement.slice(0, -1).map(s => `'${s}'`).join(', ')} or '${replacement.at(-1)}'`
//     : `'${replacement}'`
//   warn(`[Jovial UPGRADE] '${original}' is deprecated, use ${replacement} instead.`)
// }
// export function breaking(original: string, replacement: string) {
//   warn(`[Jovial BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/Jovialjs/Jovial/releases/tag/v2.0.0#user-content-upgrade-guide`)
// }
// export function removed(original: string) {
//   warn(`[Jovial REMOVED] '${original}' has been removed. You can safely omit it.`)
// }
