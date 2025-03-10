import { ComponentInternalInstance } from 'vue';

export declare function getCurrentInstance(name: string, message?: string): ComponentInternalInstance;
export declare function getCurrentInstanceName(name?: string): string;
export declare function getUid(): number;
export declare namespace getUid {
    var reset: () => void;
}
