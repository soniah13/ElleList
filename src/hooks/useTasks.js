import { useCallback, useEffect, useState } from 'react';

import { useAuth } from './useAuth';
import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  getTasksByDate,
  toggleTaskCompletion,
  updateTask as updateTaskRequest,
} from '../services/taskService';

export function useTasks(taskDate) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mutationLoading, setMutationLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user || !taskDate) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      setTasks(await getTasksByDate(taskDate));
    } catch {
      setError('We could not load your tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [taskDate, user]);

  useEffect(() => {
    let active = true;

    async function loadTasks() {
      if (!user || !taskDate) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const nextTasks = await getTasksByDate(taskDate);
        if (active) {
          setTasks(nextTasks);
        }
      } catch {
        if (active) {
          setError('We could not load your tasks. Please try again.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      active = false;
    };
  }, [taskDate, user]);

  async function runMutation(operation) {
    setMutationLoading(true);
    setError('');

    try {
      const result = await operation();
      await refresh();
      return result;
    } catch {
      setError('We could not save that change. Please try again.');
      return null;
    } finally {
      setMutationLoading(false);
    }
  }

  return {
    tasks,
    loading,
    error,
    refresh,
    mutationLoading,
    createTask: (task) => runMutation(() => createTaskRequest(task)),
    updateTask: (taskId, task) => runMutation(() => updateTaskRequest(taskId, task)),
    deleteTask: (taskId) => runMutation(() => deleteTaskRequest(taskId)),
    toggleTask: (task) => runMutation(() => toggleTaskCompletion(task)),
  };
}
