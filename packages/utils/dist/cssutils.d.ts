export declare function createDynamicStyleSheet(): CSSStyleSheet;
export declare function addCSSRule(styleSheet: CSSStyleSheet, selector: string, rules: string): void;
export declare function removeCSSRule(styleSheet: CSSStyleSheet, selector: string): void;
export declare function getCSSRule(styleSheet: CSSStyleSheet, selector: string): CSSStyleRule | null;
export declare function toCSSValue(value: number | string | undefined): string;
export declare function csstoNumber(value: string | number): number;
