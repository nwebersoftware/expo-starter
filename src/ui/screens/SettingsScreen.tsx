import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import ScreenHeader from '../components/ScreenHeader';
import { spacing, useTheme, type Theme } from '../../theme';
import { useSettingsStore } from '../../stores/settingsStore';

export default function SettingsScreen(): React.JSX.Element {
  const theme = useTheme();
  const { hapticsEnabled, reminderEnabled, theme: themeName, update } = useSettingsStore();

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader title="Settings" subtitle="Persisted locally with MMKV" />
      <ScrollView contentContainerStyle={styles.body}>
        <Row label="Haptics" theme={theme}>
          <Switch
            testID="toggle-haptics"
            value={hapticsEnabled}
            onValueChange={(value) => update({ hapticsEnabled: value })}
          />
        </Row>
        <Row label="Daily reminder" theme={theme}>
          <Switch
            testID="toggle-reminder"
            value={reminderEnabled}
            onValueChange={(value) => update({ reminderEnabled: value })}
          />
        </Row>
        <Row label="Light theme" theme={theme}>
          <Switch
            testID="toggle-theme"
            value={themeName === 'light'}
            onValueChange={(value) => update({ theme: value ? 'light' : 'dark' })}
          />
        </Row>
      </ScrollView>
    </View>
  );
}

function Row({
  label,
  theme,
  children,
}: {
  label: string;
  theme: Theme;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
      <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { padding: spacing.lg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: { fontSize: 16 },
});
