import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../src/components/Button';
import { EmptyState } from '../../src/components/EmptyState';
import { Screen } from '../../src/components/Screen';
import { TaskRow } from '../../src/components/TaskRow';
import { radii, spacing, typography } from '../../src/constants/theme';
import { getLocalDateString } from '../../src/lib/date';
import { useTasks } from '../../src/hooks/useTasks';
import { useTheme } from '../../src/theme/ThemeProvider';

function getTodayLabel() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, loading, error, toggleTask, mutationLoading } = useTasks(getLocalDateString());
  const { theme } = useTheme();
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.date, { color: theme.colors.textMuted }]}>{getTodayLabel()}</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>ElleList</Text>
        <Text style={[styles.welcome, { color: theme.colors.textSecondary }]}>A gentle plan for the day ahead.</Text>

        <View style={[styles.overview, { backgroundColor: theme.colors.primarySoft }]}>
          <View>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>Today&apos;s tasks</Text>
            <Text style={[styles.overviewValue, { color: theme.colors.text }] }>
              {completedCount} of {tasks.length} complete
            </Text>
          </View>
          <Text style={[styles.overviewMark, { color: theme.colors.primary }]}>{tasks.length - completedCount}</Text>
        </View>

        {error ? <Text style={[styles.error, { color: theme.colors.primary }]}>{error}</Text> : null}
        <View style={styles.tasks}>
          {loading ? <ActivityIndicator color={theme.colors.primary} /> : null}
          {!loading && !tasks.length ? <EmptyState message="Nothing planned for today yet." /> : null}
          {!loading
            ? tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  disabled={mutationLoading}
                  onEdit={() => router.push(`/task/edit?id=${task.id}&date=${task.date}`)}
                  onToggle={() => toggleTask(task)}
                  task={task}
                />
              ))
            : null}
        </View>

        <Button
          label="Add task"
          onPress={() => router.push('/task/new')}
          accessibilityHint="Create a new task"
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  date: { fontSize: typography.size.sm, marginBottom: spacing.xs },
  title: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    letterSpacing: -0.8,
  },
  welcome: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    marginTop: spacing.xs,
  },
  overview: {
    alignItems: 'center',
    borderRadius: radii.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  overviewLabel: { fontSize: typography.size.sm },
  overviewValue: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    marginTop: spacing.xs,
  },
  overviewMark: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },
  tasks: { gap: spacing.sm, marginVertical: spacing.lg },
  error: { fontSize: typography.size.sm, marginTop: spacing.lg },
});
