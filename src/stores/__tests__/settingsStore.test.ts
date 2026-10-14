import { createMemoryStorage } from '../../storage/adapter';
import {
  SETTINGS_KEY,
  defaultSettings,
  deserializeSettings,
  loadSettings,
  saveSettings,
  serializeSettings,
} from '../settingsStore';

describe('settings persistence', () => {
  it('round-trips through storage', () => {
    const storage = createMemoryStorage();
    const settings = { hapticsEnabled: false, reminderEnabled: true, theme: 'light' as const };
    saveSettings(storage, settings);
    expect(loadSettings(storage)).toEqual(settings);
  });

  it('falls back to defaults on corrupt data', () => {
    const storage = createMemoryStorage();
    storage.set(SETTINGS_KEY, '{not valid json');
    expect(loadSettings(storage)).toEqual(defaultSettings);
  });

  it('serialize/deserialize are lossless', () => {
    const settings = { hapticsEnabled: true, reminderEnabled: false, theme: 'dark' as const };
    expect(deserializeSettings(serializeSettings(settings))).toEqual(settings);
  });
});
