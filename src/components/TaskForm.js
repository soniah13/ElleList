import { createElement, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from './Button';
import { Screen } from './Screen';
import { taskCategories } from '../constants/taskModel';
import { radii, spacing, typography } from '../constants/theme';
import { getLocalDateString } from '../lib/date';
import { useTheme } from '../theme/ThemeProvider';

const priorities = ['low', 'medium', 'high'];
const recurrences = ['none', 'daily', 'weekly'];
const NativeDateTimePicker = Platform.OS === 'web' ? null : require('@react-native-community/datetimepicker').default;

export function TaskForm({ title, initialTask, loading, error, onSave, onCancel, onDelete }) {
  const { theme } = useTheme();
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
  const [pickerMode, setPickerMode] = useState(null);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleNativePickerChange(event, selectedDate) {
    setPickerMode(null);

    if (!selectedDate || event.type === 'dismissed') {
      return;
    }

    if (pickerMode === 'date') {
      updateField('date', formatDate(selectedDate));
    } else {
      updateField('time', formatTime(selectedDate));
    }
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
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <TextInput
          autoFocus={!initialTask}
          onChangeText={(value) => updateField('title', value)}
          placeholder="Task title"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
          value={form.title}
        />
        <PickerField
          icon="◫"
          label="Date"
          onPress={() => setPickerMode('date')}
          value={form.date}
          webType="date"
          onWebChange={(value) => updateField('date', value)}
        />
        <PickerField
          icon="◷"
          label="Time"
          onPress={() => setPickerMode('time')}
          optional
          value={form.time}
          webType="time"
          onWebChange={(value) => updateField('time', value)}
        />
        {pickerMode && Platform.OS !== 'web' ? (
          <NativeDateTimePicker
            mode={pickerMode}
            onChange={handleNativePickerChange}
            value={getPickerDate(form, pickerMode)}
          />
        ) : null}
        <TextInput
          multiline
          onChangeText={(value) => updateField('notes', value)}
          placeholder="Notes (optional)"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, styles.notes, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
          value={form.notes}
        />

        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Category</Text>
        <OptionGroup options={taskCategories} selected={form.category} onSelect={(value) => updateField('category', value)} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Priority</Text>
        <OptionGroup options={priorities} selected={form.priority} onSelect={(value) => updateField('priority', value)} />
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Recurrence</Text>
        <OptionGroup options={recurrences} selected={form.recurrence} onSelect={(value) => updateField('recurrence', value)} />

        {validationError || error ? <Text style={[styles.error, { color: theme.colors.primary }]}>{validationError || error}</Text> : null}
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
        <Button key={option} label={option} onPress={() => onSelect(option)} selected={selected === option} />
      ))}
    </View>
  );
}

function PickerField({ icon, label, optional, onPress, value, webType, onWebChange }) {
  const { theme } = useTheme();

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webPickerField}>
        <Text style={[styles.pickerLabel, { color: theme.colors.textSecondary }]}>{icon} {label}{optional ? ' (optional)' : ''}</Text>
        {createElement('input', {
          'aria-label': label,
          onChange: (event) => onWebChange(event.target.value),
          type: webType,
          value,
          style: [styles.webPicker, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }],
        })}
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.pickerButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={[styles.pickerIcon, { color: theme.colors.primary }]}>{icon}</Text>
      <View>
        <Text style={[styles.pickerLabel, { color: theme.colors.textSecondary }]}>{label}{optional ? ' (optional)' : ''}</Text>
        <Text style={[styles.pickerValue, { color: theme.colors.text }]}>{value || 'Choose a time'}</Text>
      </View>
    </Pressable>
  );
}

function getPickerDate(form, mode) {
  const [year, month, day] = form.date.split('-').map(Number);
  const [hours = 0, minutes = 0] = (form.time || '00:00').split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);

  if (mode === 'time' && !form.time) {
    date.setHours(9, 0, 0, 0);
  }

  return date;
}

function formatDate(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function formatTime(date) {
  return [String(date.getHours()).padStart(2, '0'), String(date.getMinutes()).padStart(2, '0')].join(':');
}

const styles = StyleSheet.create({
  content: { gap: spacing.md, padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { fontSize: typography.size.xxl, fontWeight: typography.weight.bold, marginBottom: spacing.sm },
  input: {
    borderRadius: radii.md,
    borderWidth: 1,
    fontSize: typography.size.md,
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  notes: { minHeight: 96, paddingTop: spacing.md, textAlignVertical: 'top' },
  label: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pickerButton: { alignItems: 'center', borderRadius: radii.md, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 64, paddingHorizontal: spacing.md },
  pickerIcon: { fontSize: typography.size.xl },
  pickerLabel: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold },
  pickerValue: { fontSize: typography.size.md, marginTop: spacing.xs },
  webPickerField: { gap: spacing.xs },
  webPicker: { borderRadius: radii.md, borderStyle: 'solid', borderWidth: 1, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: typography.size.md, minHeight: 52, paddingHorizontal: spacing.md, width: '100%' },
  error: { fontSize: typography.size.sm },
});