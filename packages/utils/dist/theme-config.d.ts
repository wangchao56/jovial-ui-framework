export interface ThemeConfig {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
    };
    typography: {
        fontFamily: string;
        fontSize: number;
    };
    components: {
        [key: string]: Record<string, string | number>;
    };
}
export declare const defaultTheme: ThemeConfig;
