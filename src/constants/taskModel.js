/**
 * The task shape used by the prototype. This is a plain JavaScript object,
 * not a database model. Nullable values are represented with null.
 */
export const taskModel = {
  id: 'task-001',
  title: 'Example task',
  completed: false,
  date: '2026-09-20',
  time: '09:00',
  category: 'Personal',
  priority: 'medium',
  recurrence: null,
  assignee: null,
  notes: '',
  createdAt: '2026-09-20T07:00:00.000Z',
  completedAt: null,
};

export const taskCategories = ['Personal', 'Work', 'Household', 'Health'];
