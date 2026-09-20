import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';

const categoryColors = {
  Personal: colors.categoryPersonal,
  Work: colors.categoryWork,
  Household: colors.categoryHousehold,
  Health: colors.categoryHealth,
};

export function TaskRow({ task, onToggle }) {
  const categoryColor = categoryColors[task.category] || colors.primarySoft;
  const checkboxLabel = 'Mark ' + task.title + ' as ' + (task.completed ? 'incomplete' : 'complete');

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <Pressable
        accessibilityLabel={checkboxLabel}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        onPress={() => onToggle(task.id)}
        style={[styles.checkbox, task.completed && styles.checked]}
      >
        {task.completed ? <Text style={styles.checkmark}>?</Text> : null}
      </Pressable>
      <View style={styles.details}>
        <Text numberOfLines={2} style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        <View style={styles.meta}>
          {task.time ? <Text style={styles.time}>{task.time}</Text> : null}
          <View style={[styles.badge, { backgroundColor: categoryColor }]}>
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: spacing.md,
  },
  completedContainer: { backgroundColor: '#FAFCFB' },
  checkbox: {
    alignItems: 'center',
    borderColor: colors.textMuted,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    height: 22,
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 1,
    width: 22,
  },
  checked: { backgroundColor: colors.success, borderColor: colors.success },
  checkmark: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: typography.weight.bold,
    lineHeight: 16,
  },
  details: { flex: 1 },
  title: {
    color: colors.text,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.md,
  },
  completedTitle: { color: colors.textMuted, textDecorationLine: 'line-through' },
  meta: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  time: { color: colors.textSecondary, fontSize: typography.size.sm },
  badge: { borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  badgeText: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
});
