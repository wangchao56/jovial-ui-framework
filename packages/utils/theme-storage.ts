// theme-storage.ts
class ThemeStorage {
  // 保存主题
  static saveTheme(themeName: string) {
    localStorage.setItem('app-theme', themeName)
  }

  // 读取主题
  static getTheme(): string | null {
    return localStorage.getItem('app-theme')
  }
}

export default ThemeStorage
