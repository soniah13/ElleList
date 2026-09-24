import { Pressable, StyleSheet, Text } from 'react-native';

import { radii, spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export function Button({ label, onPress, accessibilityHint, disabled = false, selected }) {
  const { theme } = useTheme();

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.colors.primary },
        selected && { backgroundColor: theme.colors.primary },
        selected === false && { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.border },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, { color: selected === false ? theme.colors.primary : theme.colors.surface }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radii.md,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  unselected: { borderWidth: 1 },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
  label: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
});
