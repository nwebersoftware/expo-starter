/**
 * Cross-platform key/value storage.
 *
 * Native (iOS/Android) uses MMKV — fast, synchronous, no async plumbing.
 * Web and tests fall back to an in-memory map, so the same code runs everywhere
 * and persistence logic stays unit-testable without a device.
 */
export interface KVStorage {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
  remove(key: string): void;
  getAllKeys(): string[];
  clearAll(): void;
}

/** In-memory implementation. Used on web, in tests, and as a safe fallback. */
export function createMemoryStorage(): KVStorage {
  const map = new Map<string, string>();
  return {
    getString: (key) => map.get(key),
    set: (key, value) => {
      map.set(key, value);
    },
    remove: (key) => {
      map.delete(key);
    },
    getAllKeys: () => Array.from(map.keys()),
    clearAll: () => {
      map.clear();
    },
  };
}

let cached: KVStorage | null = null;

/** Single shared storage instance for the app. */
export function createStorage(): KVStorage {
  if (cached) return cached;
  try {
    // Lazy require so web/test bundles never hard-depend on the native module.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { MMKV } = require('react-native-mmkv');
    const mmkv = new MMKV({ id: 'appstarter' });
    cached = {
      getString: (key) => mmkv.getString(key),
      set: (key, value) => {
        mmkv.set(key, value);
      },
      remove: (key) => {
        mmkv.delete(key);
      },
      getAllKeys: () => mmkv.getAllKeys(),
      clearAll: () => {
        mmkv.clearAll();
      },
    };
    return cached;
  } catch {
    cached = createMemoryStorage();
    return cached;
  }
}
