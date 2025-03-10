import { ComponentPublicInstance, Ref } from 'vue';

export type RefSetter = (el: Element | ComponentPublicInstance | undefined) => void;
export declare function composeRefs(...refs: (Ref<HTMLElement | undefined> | RefSetter)[]): (el: Element | ComponentPublicInstance | null) => void;
