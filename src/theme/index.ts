import { useSettingsStore } from '../stores/settingsStore';
import { themes, type Theme } from './tokens';

export * from './tokens';

/** Resolve the active theme from the persisted settings store. */
export function useTheme(): Theme {
  const name = useSettingsStore((s) => s.theme);
  return themes[name];
}
