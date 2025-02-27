type Colors = Record<string, string>;
export type XYZ = [number, number, number];
export type LAB = [number, number, number];
export interface HSV {
    h: number;
    s: number;
    v: number;
    a?: number;
}
export interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}
export type Hex = string & {
    __hexBrand: never;
};
export type Color = string | number | HSV | RGB | HSL;
export declare function isCssColor(color?: string | null | false): boolean;
export declare function isParsableColor(color: string): boolean;
export declare function parseColor(color: Color): RGB;
export declare function RGBToInt(color: RGB): number;
export declare function classToHex(color: string, colors: Record<string, Record<string, string>>, currentTheme: Partial<Colors>): string;
export declare function HSVtoRGB(hsva: HSV): RGB;
export declare function HSLtoRGB(hsla: HSL): RGB;
export declare function RGBtoHSV(rgba: RGB): HSV;
export declare function HSVtoHSL(hsva: HSV): HSL;
export declare function HSLtoHSV(hsl: HSL): HSV;
export declare function RGBtoCSS({ r, g, b, a }: RGB): string;
export declare function HSVtoCSS(hsva: HSV): string;
export declare function RGBtoHex({ r, g, b, a }: RGB): Hex;
export declare function HexToRGB(hex: Hex): RGB;
export declare function HexToHSV(hex: Hex): HSV;
export declare function HSVtoHex(hsva: HSV): Hex;
export declare function parseHex(hex: string): Hex;
export declare function parseGradient(gradient: string, colors: Record<string, Record<string, string>>, currentTheme: Partial<Colors>): string;
export declare function lighten(value: RGB, amount: number): RGB;
export declare function darken(value: RGB, amount: number): RGB;
export declare function getLuma(color: Color): number;
export declare function getContrast(first: Color, second: Color): number;
export declare function getForeground(color: Color): "#fff" | "#000";
export {};
