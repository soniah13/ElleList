import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';

export function Button({ label, onPress, accessibilityHint, disabled = false, selected = false }) {
  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.selected,
        selected === false && styles.unselected,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, selected === false && styles.unselectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  selected: { backgroundColor: colors.primary },
  selectedLabel: { color: colors.surface },
  unselected: { backgroundColor: colors.primarySoft, borderColor: colors.border, borderWidth: 1 },
  unselectedLabel: { color: colors.primary },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
  label: {
    color: colors.surface,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
});
