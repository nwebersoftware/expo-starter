import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { spacing, useTheme } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props): React.JSX.Element {
  const theme = useTheme();
  const id = route.params?.id ?? '—';

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader title="Details" subtitle={`id: ${id}`} />
      <View style={styles.body}>
        <Text style={[styles.text, { color: theme.colors.textMuted }]}>
          This screen demonstrates stack navigation, a typed route param, and deep linking.
        </Text>
        <PrimaryButton title="Go back" testID="go-back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.lg },
  text: { fontSize: 15, textAlign: 'center' },
});
