export type ResizeListener = (entries: ResizeObserverEntry[]) => void;
export declare function addResizeListener(element: HTMLElement, fn: ResizeListener): ResizeObserver;
export declare function removeResizeListener(element: HTMLElement, fn: ResizeListener): void;
