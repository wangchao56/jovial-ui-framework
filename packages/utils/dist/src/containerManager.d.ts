interface ContainerOptions {
    id?: string;
    namespace?: string;
    style?: Partial<CSSStyleDeclaration>;
}
export declare const containerManager: {
    getContainer(options?: ContainerOptions): {
        element: HTMLElement;
        release: () => void;
        appendContent: (content: Node) => HTMLDivElement;
    };
    releaseContainer(key: string): void;
    destroyAll(): void;
};
export declare function useContainerManager(): {
    getContainer: (options?: ContainerOptions) => {
        element: HTMLElement;
        appendContent: (content: Node) => HTMLDivElement;
        release: () => void;
    };
};
export {};
