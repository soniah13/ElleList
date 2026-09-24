import { useRouter } from 'expo-router';

import { TaskForm } from '../../src/components/TaskForm';
import { getLocalDateString } from '../../src/lib/date';
import { useTasks } from '../../src/hooks/useTasks';

export default function NewTaskScreen() {
  const router = useRouter();
  const taskDate = getLocalDateString();
  const { createTask, mutationLoading, error } = useTasks(taskDate);

  async function handleSave(task) {
    const savedTask = await createTask(task);

    if (savedTask) {
      router.back();
    }
  }

  return (
    <TaskForm
      error={error}
      loading={mutationLoading}
      onCancel={() => router.back()}
      onSave={handleSave}
      title="Add task"
    />
  );
}