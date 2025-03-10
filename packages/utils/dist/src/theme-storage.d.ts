declare class ThemeStorage {
    static saveTheme(themeName: string): void;
    static getTheme(): string | null;
}
export default ThemeStorage;
