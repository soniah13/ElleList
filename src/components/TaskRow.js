import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radii, spacing, typography } from '../constants/theme';
import { useTheme } from '../theme/ThemeProvider';

export function TaskRow({ task, onToggle, onEdit, disabled = false }) {
  const { theme } = useTheme();
  const categoryColor = theme.colors['category' + task.category] || theme.colors.primarySoft;
  const checkboxLabel = 'Mark ' + task.title + ' as ' + (task.completed ? 'incomplete' : 'complete');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }, task.completed && { backgroundColor: theme.colors.completed }]}>
      <Pressable
        accessibilityLabel={checkboxLabel}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        disabled={disabled}
        onPress={onToggle}
        style={[styles.checkbox, { borderColor: theme.colors.textMuted }, task.completed && { backgroundColor: theme.colors.success, borderColor: theme.colors.success }]}
      >
        {task.completed ? <Text style={[styles.checkmark, { color: theme.colors.surface }]}>✓</Text> : null}
      </Pressable>
      <Pressable disabled={disabled} onPress={onEdit} style={styles.details}>
        <Text numberOfLines={2} style={[styles.title, { color: theme.colors.text }, task.completed && { color: theme.colors.textMuted }] }>
          {task.title}
        </Text>
        <View style={styles.meta}>
          {task.time ? <Text style={[styles.time, { color: theme.colors.textSecondary }]}>{task.time}</Text> : null}
          <View style={[styles.badge, { backgroundColor: categoryColor }]}>
            <Text style={[styles.badgeText, { color: theme.colors.textSecondary }]}>{task.category}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: spacing.md,
  },
  checkbox: {
    alignItems: 'center',
    borderRadius: radii.pill,
    borderWidth: 1.5,
    height: 22,
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 1,
    width: 22,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: typography.weight.bold,
    lineHeight: 16,
  },
  details: { flex: 1 },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.md,
  },
  meta: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  time: { fontSize: typography.size.sm },
  badge: { borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  badgeText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
});
