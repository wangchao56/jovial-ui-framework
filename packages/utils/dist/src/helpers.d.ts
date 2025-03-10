import { ComponentInternalInstance, ComponentPublicInstance, ComputedGetter, InjectionKey, PropType, Ref, ToRefs, VNode, VNodeArrayChildren, VNodeChild, WatchOptions } from 'vue';

export declare function getNestedValue(obj: any, path: (string | number)[], fallback?: any): any;
export declare function deepEqual(a: any, b: any): boolean;
export declare function getObjectValueByPath(obj: any, path?: string | null, fallback?: any): any;
export type SelectItemKey<T = Record<string, any>> = boolean | null | undefined | string | readonly (string | number)[] | ((item: T, fallback?: any) => any);
export declare function getPropertyFromItem(item: any, property: SelectItemKey, fallback?: any): any;
export declare function createRange(length: number, start?: number): number[];
export declare function getZIndex(el?: Element | null): number;
export declare function convertToUnit(str: number, unit?: string): string;
export declare function convertToUnit(str: string | number | null | undefined, unit?: string): string | undefined;
export declare function isPlainObject(obj: any): obj is Record<string, any>;
export declare function refElement(obj?: ComponentPublicInstance<any> | HTMLElement): HTMLElement | undefined;
export declare const keyCodes: Readonly<{
    enter: 13;
    tab: 9;
    delete: 46;
    esc: 27;
    space: 32;
    up: 38;
    down: 40;
    left: 37;
    right: 39;
    end: 35;
    home: 36;
    del: 46;
    backspace: 8;
    insert: 45;
    pageup: 33;
    pagedown: 34;
    shift: 16;
}>;
export declare const keyValues: Record<string, string>;
export declare function keys<O extends {}>(o: O): (keyof O)[];
export declare function has<T extends string>(obj: object, key: T[]): obj is Record<T, unknown>;
type MaybePick<T extends object, U extends Extract<keyof T, string>> = Record<string, unknown> extends T ? Partial<Pick<T, U>> : Pick<T, U>;
export declare function pick<T extends object, U extends Extract<keyof T, string>>(obj: T, paths: U[]): MaybePick<T, U>;
export declare function pickWithRest<T extends object, U extends Extract<keyof T, string>, E extends Extract<keyof T, string>>(obj: T, paths: U[], exclude?: E[]): [yes: MaybePick<T, Exclude<U, E>>, no: Omit<T, Exclude<U, E>>];
export declare function pickWithRest<T extends object, U extends Extract<keyof T, string>, E extends Extract<keyof T, string>>(obj: T, paths: (U | RegExp)[], exclude?: E[]): [yes: Partial<T>, no: Partial<T>];
export declare function omit<T extends object, U extends Extract<keyof T, string>>(obj: T, exclude: U[]): Omit<T, U>;
export declare function only<T extends object, U extends Extract<keyof T, string>>(obj: T, include: U[]): Pick<T, U>;
export declare const isOn: (key: string) => boolean;
export declare function isComposingIgnoreKey(e: KeyboardEvent): boolean;
export declare function filterInputAttrs(attrs: Record<string, unknown>): Partial<Partial<Record<string, unknown>>>[];
export declare function arrayDiff(a: any[], b: any[]): any[];
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export declare function wrapInArray<T>(v: T | null | undefined): T extends readonly any[] ? IfAny<T, T[], T> : NonNullable<T>[];
export declare function defaultFilter(value: any, search: string | null, _item: any): any;
export declare function debounce(fn: Function, delay: MaybeRef<number>): {
    (...args: any[]): void;
    clear(): void;
    immediate: Function;
};
export declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void | ReturnType<T>;
export declare function clamp(value: number, min?: number, max?: number): number;
export declare function getDecimals(value: number): number;
export declare function padEnd(str: string, length: number, char?: string): string;
export declare function padStart(str: string, length: number, char?: string): string;
export declare function chunk(str: string, size?: number): string[];
export declare function chunkArray(array: any[], size?: number): any[][];
export declare function humanReadableFileSize(bytes: number, base?: 1000 | 1024): string;
export declare function mergeDeep(source?: Record<string, any>, target?: Record<string, any>, arrayFn?: (a: unknown[], b: unknown[]) => unknown[]): Record<string, any>;
export declare function flattenFragments(nodes: VNode[]): VNode[];
export declare function toKebabCase(str?: string): string;
export declare namespace toKebabCase {
    var cache: Map<string, string>;
}
export type MaybeRef<T> = T | Ref<T>;
export declare function findChildrenWithProvide(key: InjectionKey<any> | symbol, vnode?: VNodeChild): ComponentInternalInstance[];
export declare class CircularBuffer<T = never> {
    #private;
    readonly size: number;
    constructor(size: number);
    push(val: T): void;
    values(): T[];
}
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare function getEventCoordinates(e: MouseEvent | TouchEvent): {
    clientX: number;
    clientY: number;
};
type NotAUnion<T> = [T] extends [infer U] ? _NotAUnion<U, U> : never;
type _NotAUnion<T, U> = U extends any ? [T] extends [U] ? unknown : never : never;
export declare function destructComputed<T extends object>(getter: ComputedGetter<T & NotAUnion<T>>): ToRefs<T>;
export declare function includes(arr: readonly any[], val: any): boolean;
export declare function eventName(propName: string): string;
export type EventProp<T extends any[] = any[], F = (...args: T) => void> = F;
export declare function EventProp<T extends any[] = any[]>(): PropType<EventProp<T>>;
export declare function hasEvent(props: Record<string, any>, name: string): boolean;
export declare function callEvent<T extends any[]>(handler: EventProp<T> | undefined, ...args: T): void;
export declare function focusableChildren(el: Element, filterByTabIndex?: boolean): HTMLElement[];
export declare function getNextElement(elements: HTMLElement[], location?: 'next' | 'prev', condition?: (el: HTMLElement) => boolean): any;
export declare function focusChild(el: Element, location?: 'next' | 'prev' | 'first' | 'last' | number): void;
export declare function noop(): void;
export declare function matchesSelector(el: Element | undefined, selector: string): boolean | null;
export declare function ensureValidVNode(vnodes: VNodeArrayChildren): VNodeArrayChildren | null;
export declare function defer(timeout: number, cb: () => void): () => void;
export declare function eagerComputed<T>(fn: () => T, options?: WatchOptions): Readonly<Ref<T>>;
export declare function isClickInsideElement(event: MouseEvent, targetDiv: HTMLElement): boolean;
export interface TemplateRef {
    (target: Element | ComponentPublicInstance | null): void;
    value: HTMLElement | ComponentPublicInstance | null | undefined;
    readonly el: HTMLElement | undefined;
}
export declare function templateRef(): TemplateRef;
export declare function checkPrintable(e: KeyboardEvent): boolean;
export {};
