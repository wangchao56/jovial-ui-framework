import type { TriggerKeys } from './tooltip'

export interface TriggerStrategy {
  getEvents: () => Record<string, Function>
  getHandlers: () => [string, string?][]
  onOpen: () => void
  onClose: () => void
  onToggle?: () => void
}

abstract class BaseStrategy implements TriggerStrategy {
  constructor(
    protected readonly onOpen: () => void,
    protected readonly onClose: () => void,
    protected readonly onToggle?: () => void,
  ) {}

  abstract getEvents(): Record<string, Function>
  abstract getHandlers(): [string, string?][]
}

export class HoverStrategy extends BaseStrategy {
  getEvents() {
    return {
      onMouseenter: () => this.onOpen(),
      onMouseleave: () => this.onClose(),
    }
  }

  getHandlers() {
    return [['mouseenter', 'mouseleave']]
  }
}

export class ClickStrategy extends BaseStrategy {
  getEvents() {
    return {
      onClick: () => this.onToggle?.(),
    }
  }

  getHandlers() {
    return [['click']]
  }
}

export class FocusStrategy extends BaseStrategy {
  getEvents() {
    return {
      onFocus: () => this.onOpen(),
      onBlur: () => this.onClose(),
    }
  }

  getHandlers() {
    return [['focus', 'blur']]
  }
}

export class ContextMenuStrategy extends BaseStrategy {
  getEvents() {
    return {
      onContextmenu: (e: Event) => {
        e.preventDefault()
        this.onToggle?.()
      },
    }
  }

  getHandlers() {
    return [['contextmenu']]
  }
}

export const strategyMap: Record<TriggerKeys, new (onOpen: () => void, onClose: () => void, onToggle?: () => void) => TriggerStrategy> = {
  hover: HoverStrategy,
  click: ClickStrategy,
  focus: FocusStrategy,
  contextmenu: ContextMenuStrategy,
}
