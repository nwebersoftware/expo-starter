export type ThemeName = 'dark' | 'light';

export interface Theme {
  name: ThemeName;
  colors: {
    background: string;
    surface: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryText: string;
    danger: string;
    success: string;
  };
}

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radius = { sm: 6, md: 12, pill: 999 } as const;

export const typography = {
  title: { fontSize: 24, fontWeight: '700' as const },
  subtitle: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
} as const;

export const themes: Record<ThemeName, Theme> = {
  dark: {
    name: 'dark',
    colors: {
      background: '#0B0F1A',
      surface: '#151B2B',
      border: '#25304A',
      text: '#F5F7FF',
      textMuted: '#93A0C0',
      primary: '#38E1FF',
      primaryText: '#04121A',
      danger: '#FF6B6B',
      success: '#2EE6A6',
    },
  },
  light: {
    name: 'light',
    colors: {
      background: '#F6F8FC',
      surface: '#FFFFFF',
      border: '#DCE3F0',
      text: '#0B0F1A',
      textMuted: '#5A6784',
      primary: '#0A84FF',
      primaryText: '#FFFFFF',
      danger: '#D64545',
      success: '#0F9D66',
    },
  },
};
