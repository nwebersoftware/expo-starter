import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, spacing, useTheme } from '../../theme';
import { hapticSelection } from '../../lib/haptics';

type Variant = 'primary' | 'ghost';

interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  testID?: string;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  testID,
}: Props): React.JSX.Element {
  const theme = useTheme();
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        hapticSelection();
        onPress();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isGhost ? 'transparent' : theme.colors.primary,
          borderColor: isGhost ? theme.colors.border : 'transparent',
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text
        style={[styles.label, { color: isGhost ? theme.colors.text : theme.colors.primaryText }]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 16, fontWeight: '600' },
});
