import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export function EmptyState({ message }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: spacing.xl },
  message: { fontSize: typography.size.md, textAlign: 'center' },
});