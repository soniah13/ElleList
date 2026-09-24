import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../constants/theme';

export function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: spacing.xl },
  message: { color: colors.textSecondary, fontSize: typography.size.md, textAlign: 'center' },
});