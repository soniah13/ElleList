import { useState } from 'react';

/**
 * Prototype-only task state. It stays in memory and resets on app reload.
 */
export function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: task.completed ? null : new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  return { tasks, toggleTask };
}
