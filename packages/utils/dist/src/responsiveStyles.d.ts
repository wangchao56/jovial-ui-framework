type CSSProperties = Record<string, string | number>;
type Breakpoints = Record<number, Record<string, CSSProperties>>;
declare function createResponsiveStyles(baseStyles: CSSProperties, breakpoints: Breakpoints): void;
export { Breakpoints, createResponsiveStyles, CSSProperties };
