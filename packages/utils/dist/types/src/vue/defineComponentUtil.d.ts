import { AllowedComponentProps, ComponentCustomProps, ComponentObjectPropsOptions, ComponentOptions, ComponentOptionsMixin, ComponentOptionsWithObjectProps, ComponentOptionsWithoutProps, ComponentPropsOptions, ComputedOptions, DefineComponent, EmitsOptions, ExtractDefaultPropTypes, ExtractPropTypes, MethodOptions, SlotsType, VNodeProps, CreateComponentPublicInstanceWithMixins, EmitsToProps, PublicProps, GlobalComponents, GlobalDirectives, ComponentProvideOptions, ComponentOptionsBase } from 'vue';

export interface EnhancedComponentOptions extends ComponentOptions {
    _setup?: ComponentOptions['setup'];
    filterProps?: (props: Record<string, any>) => Record<string, any>;
    autoInject?: string[];
}
type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;
export interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps: <T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T) => Partial<Pick<T, U>>;
}
type EmitsToProps<T extends EmitsOptions> = T extends string[] ? {
    [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
} : T extends Record<string, any> ? {
    [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}` ? T[Uncapitalize<C>] extends null ? (...args: any[]) => any : (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any : never;
} : {};
export declare function propsFactory<PropsOptions extends ComponentPropsOptions>(props: PropsOptions, _name: string): () => PropsOptions;
export declare function defineComponentUtil<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, I extends {} = {}, II extends string = string, S extends SlotsType = {}>(options: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>;
export declare function defineComponentUtil<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, I extends {} = {}, II extends string = string, S extends SlotsType = {}>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> & FilterPropsOptions<PropsOptions>;
export declare function defineFunctionalComponentUtil<PropsOptions extends ComponentObjectPropsOptions, Props = Readonly<ExtractPropTypes<PropsOptions>>, Emits extends EmitsOptions = {}>(props: PropsOptions, render: (props: Props, ctx: {
    emit: (event: string, ...args: any[]) => void;
}) => any, emits?: Emits): DefineComponent<PropsOptions, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Emits, string, PublicProps, Readonly<ExtractPropTypes<PropsOptions>> & EmitsToProps<Emits>, ExtractDefaultPropTypes<PropsOptions>>;
export declare function createInjectableComponent<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, E extends EmitsOptions = {}>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, ComponentOptionsMixin, ComponentOptionsMixin, E, string, {}, string, SlotsType>, injectKeys?: string[]): {
    new (...args: any[]): CreateComponentPublicInstanceWithMixins<Readonly<PropsOptions extends ComponentPropsOptions<{
        [x: string]: unknown;
    }> ? ExtractPropTypes<PropsOptions> : PropsOptions> & ({} extends E ? E & {} : EmitsToProps<E>), RawBindings, D, C, M, ComponentOptionsMixin, ComponentOptionsMixin, E, PublicProps, ExtractDefaultPropTypes<PropsOptions>, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {} & (Readonly<PropsOptions extends ComponentPropsOptions<{
        [x: string]: unknown;
    }> ? ExtractPropTypes<PropsOptions> : PropsOptions> & ({} extends E ? E & {} : EmitsToProps<E>) extends infer T ? T extends Readonly<PropsOptions extends ComponentPropsOptions<{
        [x: string]: unknown;
    }> ? ExtractPropTypes<PropsOptions> : PropsOptions> & ({} extends E ? E & {} : EmitsToProps<E>) ? T extends void ? {} : T : never : never), {} & (RawBindings extends void ? {} : RawBindings), {} & (D extends void ? {} : D), {} & (C extends void ? {} : C), {} & (M extends void ? {} : M), {} & (ExtractDefaultPropTypes<PropsOptions> extends infer T_1 ? T_1 extends ExtractDefaultPropTypes<PropsOptions> ? T_1 extends void ? {} : T_1 : never : never)>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & ComponentOptionsBase<Readonly<PropsOptions extends ComponentPropsOptions<{
    [x: string]: unknown;
}> ? ExtractPropTypes<PropsOptions> : PropsOptions> & ({} extends E ? E & {} : EmitsToProps<E>), RawBindings, D, C, M, ComponentOptionsMixin, ComponentOptionsMixin, E, string, ExtractDefaultPropTypes<PropsOptions>, {}, string, {}, GlobalComponents, GlobalDirectives, string, ComponentProvideOptions> & VNodeProps & AllowedComponentProps & ComponentCustomProps & FilterPropsOptions<PropsOptions, ExtractPropTypes<PropsOptions>>;
export {};
