import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { spacing, useTheme } from '../../theme';
import { useSettingsStore } from '../../stores/settingsStore';
import type { MainTabParamList, RootStackParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  const theme = useTheme();
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const [count, setCount] = useState(0);

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader title="App Starter" subtitle="A production-ready Expo baseline" />
      <View style={styles.body}>
        <Text testID="counter" style={[styles.counter, { color: theme.colors.text }]}>
          {count}
        </Text>
        <Text style={[styles.note, { color: theme.colors.textMuted }]}>
          Haptics {hapticsEnabled ? 'on' : 'off'}
        </Text>
        <PrimaryButton
          title="Increment"
          testID="increment"
          onPress={() => setCount((c) => c + 1)}
        />
        <PrimaryButton
          title="Open details"
          testID="open-details"
          variant="ghost"
          onPress={() => navigation.navigate('Details', { id: String(count) })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.lg },
  counter: { fontSize: 64, fontWeight: '800' },
  note: { fontSize: 14 },
});
