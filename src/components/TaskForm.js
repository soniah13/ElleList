import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from './Button';
import { Screen } from './Screen';
import { taskCategories } from '../constants/taskModel';
import { colors, radii, spacing, typography } from '../constants/theme';
import { getLocalDateString } from '../lib/date';

const priorities = ['low', 'medium', 'high'];
const recurrences = ['none', 'daily', 'weekly'];

export function TaskForm({ title, initialTask, loading, error, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState({
    title: initialTask?.title || '',
    date: initialTask?.date || getLocalDateString(),
    time: initialTask?.time || '',
    category: initialTask?.category || taskCategories[0],
    priority: initialTask?.priority || 'medium',
    recurrence: initialTask?.recurrence || 'none',
    notes: initialTask?.notes || '',
  });
  const [validationError, setValidationError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSave() {
    if (!form.title.trim()) {
      setValidationError('Add a title for this task.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
      setValidationError('Use a date in YYYY-MM-DD format.');
      return;
    }

    if (form.time && !/^\d{2}:\d{2}$/.test(form.time)) {
      setValidationError('Use a time in HH:MM format.');
      return;
    }

    setValidationError('');
    onSave({ ...form, recurrence: form.recurrence === 'none' ? null : form.recurrence });
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{title}</Text>
        <TextInput
          autoFocus={!initialTask}
          onChangeText={(value) => updateField('title', value)}
          placeholder="Task title"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={form.title}
        />
        <TextInput
          keyboardType="numbers-and-punctuation"
          onChangeText={(value) => updateField('date', value)}
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={form.date}
        />
        <TextInput
          keyboardType="numbers-and-punctuation"
          onChangeText={(value) => updateField('time', value)}
          placeholder="Time (HH:MM, optional)"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={form.time}
        />
        <TextInput
          multiline
          onChangeText={(value) => updateField('notes', value)}
          placeholder="Notes (optional)"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.notes]}
          value={form.notes}
        />

        <Text style={styles.label}>Category</Text>
        <OptionGroup options={taskCategories} selected={form.category} onSelect={(value) => updateField('category', value)} />
        <Text style={styles.label}>Priority</Text>
        <OptionGroup options={priorities} selected={form.priority} onSelect={(value) => updateField('priority', value)} />
        <Text style={styles.label}>Recurrence</Text>
        <OptionGroup options={recurrences} selected={form.recurrence} onSelect={(value) => updateField('recurrence', value)} />

        {validationError || error ? <Text style={styles.error}>{validationError || error}</Text> : null}
        <Button disabled={loading} label={loading ? 'Saving...' : 'Save task'} onPress={handleSave} />
        <Button label="Cancel" onPress={onCancel} />
        {onDelete ? <Button disabled={loading} label="Delete task" onPress={onDelete} /> : null}
      </ScrollView>
    </Screen>
  );
}

function OptionGroup({ options, selected, onSelect }) {
  return (
    <View style={styles.options}>
      {options.map((option) => (
        <Button key={option} label={option} onPress={() => onSelect(option)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md, padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { color: colors.text, fontSize: typography.size.xxl, fontWeight: typography.weight.bold, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.size.md,
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  notes: { minHeight: 96, paddingTop: spacing.md, textAlignVertical: 'top' },
  label: { color: colors.textSecondary, fontSize: typography.size.sm, fontWeight: typography.weight.semibold },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  error: { color: '#A33A3A', fontSize: typography.size.sm },
});