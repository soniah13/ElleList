import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../src/components/Button';
import { EmptyState } from '../../src/components/EmptyState';
import { Screen } from '../../src/components/Screen';
import { TaskRow } from '../../src/components/TaskRow';
import { colors, radii, spacing, typography } from '../../src/constants/theme';
import { getLocalDateString } from '../../src/lib/date';
import { useTasks } from '../../src/hooks/useTasks';

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
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>{getTodayLabel()}</Text>
        <Text style={styles.title}>ElleList</Text>
        <Text style={styles.welcome}>A gentle plan for the day ahead.</Text>

        <View style={styles.overview}>
          <View>
            <Text style={styles.overviewLabel}>Today&apos;s tasks</Text>
            <Text style={styles.overviewValue}>
              {completedCount} of {tasks.length} complete
            </Text>
          </View>
          <Text style={styles.overviewMark}>{tasks.length - completedCount}</Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.tasks}>
          {loading ? <ActivityIndicator color={colors.primary} /> : null}
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
  date: { color: colors.textMuted, fontSize: typography.size.sm, marginBottom: spacing.xs },
  title: {
    color: colors.text,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    letterSpacing: -0.8,
  },
  welcome: {
    color: colors.textSecondary,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    marginTop: spacing.xs,
  },
  overview: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  overviewLabel: { color: colors.textSecondary, fontSize: typography.size.sm },
  overviewValue: {
    color: colors.text,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    marginTop: spacing.xs,
  },
  overviewMark: {
    color: colors.primary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },
  tasks: { gap: spacing.sm, marginVertical: spacing.lg },
  error: { color: '#A33A3A', fontSize: typography.size.sm, marginTop: spacing.lg },
});
