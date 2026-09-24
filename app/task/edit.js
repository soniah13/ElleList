import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';

import { TaskForm } from '../../src/components/TaskForm';
import { Screen } from '../../src/components/Screen';
import { useTasks } from '../../src/hooks/useTasks';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function EditTaskScreen() {
  const router = useRouter();
  const { id, date } = useLocalSearchParams();
  const { theme } = useTheme();
  const taskDate = Array.isArray(date) ? date[0] : date;
  const { tasks, loading, mutationLoading, error, updateTask, deleteTask } = useTasks(taskDate);
  const task = tasks.find((item) => item.id === id);

  if (loading) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.primary} />
      </Screen>
    );
  }

  if (!task) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Task not found.</Text>
      </Screen>
    );
  }

  async function handleSave(nextTask) {
    const savedTask = await updateTask(task.id, nextTask);

    if (savedTask) {
      router.back();
    }
  }

  async function handleDelete() {
    const deleted = await deleteTask(task.id);

    if (deleted !== null) {
      router.back();
    }
  }

  return (
    <TaskForm
      error={error}
      initialTask={task}
      loading={mutationLoading}
      onCancel={() => router.back()}
      onDelete={handleDelete}
      onSave={handleSave}
      title="Edit task"
    />
  );
}