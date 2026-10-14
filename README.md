# Expo Starter

A clean, modern **Expo (SDK 54) + React Native + TypeScript** baseline — typed navigation with deep
links, theme tokens, and persistence behind a testable interface. `npm install` → `npm run check` is
green immediately.

This is the **free baseline**. It's the app skeleton you'd otherwise spend a day wiring up.

## What you get

- **Expo SDK 54 · React Native 0.81 · React 19 · TypeScript (strict)**
- **Typed navigation** — native stack + bottom tabs, with **deep linking** configured
- **Theming** — design tokens + a `useTheme()` hook (light & dark)
- **Persistence done right** — a zustand store over MMKV, behind a `KVStorage` interface with an
  in-memory fallback, so your state logic is testable without a device
- **Test-ready** — jest-expo is set up with **native modules mocked**, so screens/stores run in CI
  with no simulator
- **Zero-config icons** — `npm run icons` generates app icons with plain Node (no ImageMagick)
- Example screens, components, and a store to copy from

## Quick start

```bash
npm install
npm run check     # lint + typecheck + tests — green out of the box
npm start         # Expo dev server
npm run ios       # build & run on iOS
npm run android   # build & run on Android
```

## Structure

```text
App.tsx                     # providers + NavigationContainer
src/
  navigation/               # typed stack + tabs, deep-link config
  theme/                    # design tokens + useTheme()
  storage/adapter.ts        # MMKV on native, in-memory elsewhere
  stores/settingsStore.ts   # zustand store + persistence helpers
  lib/haptics.ts            # settings-aware haptics
  ui/components/            # ScreenHeader, PrimaryButton
  ui/screens/               # HomeScreen, SettingsScreen, DetailsScreen
tools/make-icons.mjs
```

## Rename it for your app

Edit `app.json` (`name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`), then replace
remaining `expostarter` / `com.example.expostarter` references.

---

## Want the production layer?

This baseline is deliberately *just* the foundation. The **Pro** version adds the parts that keep a
real app from rotting, as **build gates you can't skip**:

- **Screens gate** — the build fails if any screen is a stub or returns `null` (kills the
  "launched to a blank screen" class of bug).
- **Acceptance-contract gate** — declare your invariants and journeys in a JSON contract; the build
  fails unless a *real* test covers each id.
- **CI** (GitHub Actions) wired to those gates.
- **Local release scripts** — iOS archive → App Store Connect, and Android `.aab` → Google Play,
  no EAS required.

→ **Expo Production Starter (Pro):** https://booleanbro.gumroad.com/l/expo-production-starter

## License

MIT — free to use in anything. (The Pro kit ships under its own commercial license.)
