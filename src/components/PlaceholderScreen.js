import { StyleSheet, Text, View } from 'react-native';

import { radii, spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';
import { Screen } from './Screen';

export function PlaceholderScreen({ title, message, children }) {
  const { theme } = useTheme();

  return (
    <Screen style={styles.screen}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.body, { color: theme.colors.textSecondary }]}>{message}</Text>
        {children}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'center', padding: spacing.lg },
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
  },
  body: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    marginTop: spacing.sm,
  },
});
