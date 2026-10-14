// Jest setup for React Native.
//
// Two jobs:
//   1. Polyfill the few globals RN needs but jest does not provide.
//   2. Stub native modules so screens/stores are testable without a device.
//      Add a `jest.mock(...)` here for every native module your app imports.

if (typeof global.requestAnimationFrame !== 'function') {
  global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
}

jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn(async () => undefined),
  impactAsync: jest.fn(async () => undefined),
  selectionAsync: jest.fn(async () => undefined),
  NotificationFeedbackType: { Error: 'error', Success: 'success', Warning: 'warning' },
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(async () => undefined),
  hideAsync: jest.fn(async () => undefined),
}));

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn(() => ({
    setString: jest.fn(),
    getString: jest.fn(() => undefined),
    setNumber: jest.fn(),
    getNumber: jest.fn(() => 0),
    set: jest.fn(),
    getBoolean: jest.fn(() => false),
    delete: jest.fn(),
    remove: jest.fn(),
    getAllKeys: jest.fn(() => []),
    clearAll: jest.fn(),
  })),
}));
