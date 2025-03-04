// theme-config.ts
export interface ThemeConfig {
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
  }
  typography: {
    fontFamily: string
    fontSize: number
  }
  components: {
    [key: string]: Record<string, string | number>
  }
}

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  name: 'default',
  colors: {
    primary: '#3a8ee6',
    secondary: '#409eff',
    background: '#ffffff',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 14,
  },
  components: {
    button: {
      borderRadius: '4px',
    },
  },
}
