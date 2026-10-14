import { create } from 'zustand';

import { createStorage, type KVStorage } from '../storage/adapter';
import type { ThemeName } from '../theme/tokens';

export interface Settings {
  hapticsEnabled: boolean;
  reminderEnabled: boolean;
  theme: ThemeName;
}

export const SETTINGS_KEY = 'appstarter.settings';

export const defaultSettings: Settings = {
  hapticsEnabled: true,
  reminderEnabled: false,
  theme: 'dark',
};

export function serializeSettings(settings: Settings): string {
  return JSON.stringify(settings);
}

export function deserializeSettings(raw: string | undefined): Settings {
  if (!raw) return { ...defaultSettings };
  try {
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      hapticsEnabled:
        typeof parsed.hapticsEnabled === 'boolean'
          ? parsed.hapticsEnabled
          : defaultSettings.hapticsEnabled,
      reminderEnabled:
        typeof parsed.reminderEnabled === 'boolean'
          ? parsed.reminderEnabled
          : defaultSettings.reminderEnabled,
      theme: parsed.theme === 'light' ? 'light' : 'dark',
    };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(storage: KVStorage, settings: Settings): void {
  storage.set(SETTINGS_KEY, serializeSettings(settings));
}

export function loadSettings(storage: KVStorage): Settings {
  return deserializeSettings(storage.getString(SETTINGS_KEY));
}

interface SettingsState extends Settings {
  hydrated: boolean;
  /** Patch one or more settings; persists the merged result. */
  update: (patch: Partial<Settings>) => void;
  /** Load persisted settings into the store. Call once on app boot. */
  hydrate: () => void;
}

const storage = createStorage();

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,
  hydrated: false,
  update: (patch) => {
    const next: Settings = {
      hapticsEnabled: get().hapticsEnabled,
      reminderEnabled: get().reminderEnabled,
      theme: get().theme,
      ...patch,
    };
    set({ ...next });
    saveSettings(storage, next);
  },
  hydrate: () => {
    set({ ...loadSettings(storage), hydrated: true });
  },
}));
