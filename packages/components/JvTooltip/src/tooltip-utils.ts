import type { PopperProps } from '@components/JvPopper'
import type { CommonProperties, Diff } from '@jovial/typings'
import type { Modifier, Options } from '@popperjs/core'
import type { TooltipProps } from './tooltip'

// 设置偏移量
function setOffset(offset: number | [number, number] | undefined): [number, number] {
  if (typeof offset === 'number') {
    return [0, offset]
  }
  return offset ?? [0, 0]
}
// 设置modifiers的偏移量
export function setOffsetModifier(offset: number | [number, number]): Modifier<'offset', Record<string, unknown>> {
  return {
    name: 'offset',
    options: { offset: setOffset(offset) },
  }
}
export function createTooltipModifiers(payload: { arrow: boolean, offset: number | [number, number] | undefined }): Options['modifiers'] {
  return [
    {
      name: 'arrow',
      options: {
        padding: 5,
      },
    },
    setOffsetModifier(payload.offset ?? [0, 8]),
  ]
}

// 类型工具提取PopperProps中有的而TooltipProps中没有的
type PopperPropsWithoutTooltip = Diff<PopperProps, TooltipProps>

type CommonProps = CommonProperties<TooltipProps, PopperProps>

/**
 * 将 Tooltip 的 props 映射为 Popper 的 props
 * @param tooltipProps Tooltip 的 props
 * @param otherProps PopperProps 中有的而 TooltipProps 中没有的
 * @returns Popper 的 props
 */
export function mapTooltipToPopperProps(tooltipProps: TooltipProps, otherProps?: PopperPropsWithoutTooltip): PopperProps {
  const commonProps: CommonProps = {
    class: tooltipProps.popperClass,
    // transition: tooltipProps.transition,
    arrow: tooltipProps.arrow,
    openDelay: tooltipProps.openDelay,
    closeDelay: tooltipProps.closeDelay,
    disableAnimation: tooltipProps.disableAnimation,
  }
  const mergedProps: PopperProps = {
    ...commonProps,
    ...otherProps,
    reference: otherProps?.reference,
  }

  return mergedProps
}
