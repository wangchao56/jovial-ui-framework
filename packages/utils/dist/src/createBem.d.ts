declare function createBEM(prefixName: string): {
    b: (blockSuffix?: string) => string;
    e: (element: string) => string;
    m: (modifier: string) => string;
    be: (blockSuffix: string, element: string) => string;
    em: (element: string, modifier: string) => string;
    bm: (blockSuffix: string, modifier: string) => string;
    bem: (blockSuffix: string, element: string, modifier: string) => string;
    is: (name: string, state: any) => string;
};
export declare function createNamespace(namespace: string): ReturnType<typeof createBEM>;
export {};
