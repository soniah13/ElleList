import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { TaskRow } from '../../src/components/TaskRow';
import { mockTasks } from '../../src/constants/mockTasks';
import { colors, radii, spacing, typography } from '../../src/constants/theme';
import { useTasks } from '../../src/hooks/useTasks';

function getTodayLabel() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

export default function HomeScreen() {
  const { tasks, toggleTask } = useTasks(mockTasks);
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>{getTodayLabel()}</Text>
        <Text style={styles.title}>ElleList</Text>
        <Text style={styles.welcome}>A gentle plan for the day ahead.</Text>

        <View style={styles.overview}>
          <View>
            <Text style={styles.overviewLabel}>Today's tasks</Text>
            <Text style={styles.overviewValue}>
              {completedCount} of {tasks.length} complete
            </Text>
          </View>
          <Text style={styles.overviewMark}>{tasks.length - completedCount}</Text>
        </View>

        <View style={styles.tasks}>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </View>

        <Button
          label="Add task"
          onPress={() => {}}
          accessibilityHint="Task creation will be added later"
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
});
