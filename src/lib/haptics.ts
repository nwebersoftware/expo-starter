import * as Haptics from 'expo-haptics';

import { useSettingsStore } from '../stores/settingsStore';

/**
 * Haptics that respect the user's settings and never throw on unsupported
 * devices. Every UI touch point should go through these helpers.
 */
export function hapticSelection(): void {
  if (!useSettingsStore.getState().hapticsEnabled) return;
  Haptics.selectionAsync().catch(() => undefined);
}

export function hapticImpact(style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light): void {
  if (!useSettingsStore.getState().hapticsEnabled) return;
  Haptics.impactAsync(style).catch(() => undefined);
}
