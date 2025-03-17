import { MaybeRefOrGetter, VNode, VNodeArrayChildren, VNodeChild, RendererNode, RendererElement } from 'vue';

export declare function ensureOnlyChild(children: VNodeArrayChildren | undefined): VNodeArrayChildren | (string | number | boolean | void | VNode< RendererNode, RendererElement, {
    [key: string]: any;
}> | null | undefined);
export declare function getSlotsFirstChild(slots: () => VNodeArrayChildren | undefined): VNodeChild;
export declare function isTextNode(vnode: MaybeRefOrGetter<VNodeChild>): boolean;
export declare function isSlotNode(vnode: MaybeRefOrGetter<VNodeChild>): boolean;
export declare function getComponentName(vnode: VNode): any;
