// Below are the colors that are used in the app.

import { Platform } from 'react-native';

// Color Palette
export const AppColors = {
  primary: '#4ECDC4',        // Caregiver Teal - Main accent, interactive elements
  secondary: '#FFB89E',      // Warm Peach - Secondary accents, background elements
  background: '#F4F4F4',    // Soft Grey - Primary screen backgrounds
  text: '#34495E',          // Deep Slate - Primary text, headings
  accent: '#FFE66D',        // Hope Yellow - Subtle highlights, notifications
  white: '#FFFFFF',
  success: '#4ECDC4',      
};

const tintColorLight = AppColors.primary;
const tintColorDark = AppColors.primary;

export const Colors = {
  light: {
    text: AppColors.text,
    background: AppColors.background,
    tint: tintColorLight,
    icon: AppColors.text,
    tabIconDefault: AppColors.text,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
