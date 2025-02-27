import { ThemeConfig } from './theme-config';

declare class ThemeManager {
    private currentTheme;
    private themeRegistry;
    registerTheme(name: string, config: ThemeConfig): void;
    switchTheme(themeName: string): void;
    private applyTheme;
    getCurrentTheme(): string;
    init(): void;
}
export type ThemeManagerType = InstanceType<typeof ThemeManager>;
export { ThemeManager };
