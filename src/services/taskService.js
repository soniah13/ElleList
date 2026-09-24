import { supabase } from '../lib/supabase';

async function getUserId() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('You must be signed in to manage tasks.');
  }

  return data.user.id;
}

function mapTask(row) {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed,
    date: row.task_date,
    time: row.task_time ? row.task_time.slice(0, 5) : null,
    category: row.category,
    priority: row.priority,
    recurrence: row.recurrence,
    assignee: row.assignee,
    notes: row.notes || '',
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

async function queryTasks(query) {
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data || []).map(mapTask);
}

export async function getTasks() {
  const userId = await getUserId();

  return queryTasks(
    supabase.from('tasks').select('*').eq('user_id', userId).order('task_date').order('task_time', { nullsFirst: false }),
  );
}

export async function getTasksByDate(taskDate) {
  const userId = await getUserId();

  return queryTasks(
    supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('task_date', taskDate)
      .order('task_time', { nullsFirst: false })
      .order('created_at'),
  );
}

export async function createTask(task) {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userId,
      title: task.title.trim(),
      task_date: task.date,
      task_time: task.time || null,
      category: task.category || null,
      priority: task.priority || null,
      recurrence: task.recurrence || null,
      assignee: task.assignee || null,
      notes: task.notes?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTask(data);
}

export async function updateTask(taskId, task) {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from('tasks')
    .update({
      title: task.title.trim(),
      task_date: task.date,
      task_time: task.time || null,
      category: task.category || null,
      priority: task.priority || null,
      recurrence: task.recurrence || null,
      assignee: task.assignee || null,
      notes: task.notes?.trim() || null,
    })
    .eq('id', taskId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTask(data);
}

export async function deleteTask(taskId) {
  const userId = await getUserId();
  const { error } = await supabase.from('tasks').delete().eq('id', taskId).eq('user_id', userId);

  if (error) {
    throw error;
  }
}

export async function toggleTaskCompletion(task) {
  const userId = await getUserId();
  const completed = !task.completed;
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed, completed_at: completed ? new Date().toISOString() : null })
    .eq('id', task.id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTask(data);
}