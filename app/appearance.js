import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '../src/components/Button';
import { PatternLayer } from '../src/components/PatternLayer';
import { Screen } from '../src/components/Screen';
import { spacing, radii, typography } from '../src/constants/theme';
import { palettes, paletteList } from '../src/theme/palettes';
import { patternList, patterns } from '../src/theme/patterns';
import { useTheme } from '../src/theme/ThemeProvider';

export default function AppearanceScreen() {
  const router = useRouter();
  const { applyTheme, selection, theme } = useTheme();
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(false);

  const currentDraft = draft || selection;
  const previewColors = palettes[currentDraft.paletteId].colors;
  const previewPattern = patterns[currentDraft.patternId];

  async function handleApply() {
    await applyTheme(currentDraft);
    setSaved(true);
  }

  function select(field, value) {
    setSaved(false);
    setDraft((current) => ({ ...current, [field]: value }));
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <Text style={[styles.backText, { color: theme.colors.primary }]}>Back</Text>
        </Pressable>
        <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>Make it yours</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>Customize ElleList</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Pair a quiet pattern with a palette that feels like you.</Text>

        <Preview colors={previewColors} pattern={previewPattern} />

        <SectionLabel color={theme.colors.text} label="Pattern" />
        <View style={styles.optionGrid}>
          {patternList.map((pattern) => (
            <ChoiceCard
              key={pattern.id}
              active={currentDraft.patternId === pattern.id}
              color={previewColors}
              label={pattern.label}
              description={pattern.description}
              symbol={pattern.symbol || '—'}
              onPress={() => select('patternId', pattern.id)}
            />
          ))}
        </View>

        <SectionLabel color={theme.colors.text} label="Color palette" />
        <View style={styles.optionGrid}>
          {paletteList.map((palette) => (
            <ChoiceCard
              key={palette.id}
              active={currentDraft.paletteId === palette.id}
              color={palette.colors}
              label={palette.label}
              description="A considered, readable color set."
              symbol=""
              onPress={() => select('paletteId', palette.id)}
            />
          ))}
        </View>

        <Button label={saved ? 'Theme saved' : 'Apply theme'} onPress={handleApply} />
      </ScrollView>
    </Screen>
  );
}

function Preview({ colors, pattern }) {
  return (
    <View style={[styles.preview, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <PatternLayer color={colors.pattern} pattern={pattern} opacity={0.12} />
      <View style={styles.previewContent}>
        <View style={styles.previewTopline}>
          <View>
            <Text style={[styles.previewDate, { color: colors.textMuted }]}>Tuesday, September 24</Text>
            <Text style={[styles.previewTitle, { color: colors.text }]}>ElleList</Text>
          </View>
          <View style={[styles.previewAvatar, { backgroundColor: colors.primarySoft }]}>
            <Text style={{ color: colors.primary }}>E</Text>
          </View>
        </View>
        <View style={[styles.previewSummary, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.previewSummaryLabel, { color: colors.textSecondary }]}>Today&apos;s tasks</Text>
          <Text style={[styles.previewSummaryValue, { color: colors.text }]}>2 of 4 complete</Text>
        </View>
        <View style={[styles.previewTask, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.previewCheckbox, { backgroundColor: colors.success, borderColor: colors.success }]}>
            <Text style={{ color: colors.surface }}>✓</Text>
          </View>
          <View style={styles.previewTaskText}>
            <Text style={[styles.previewTaskTitle, { color: colors.text }]}>Plan a calm afternoon</Text>
            <Text style={[styles.previewTaskMeta, { color: colors.textSecondary }]}>10:30 AM</Text>
          </View>
        </View>
        <View style={styles.previewBottom}>
          <Text style={[styles.previewNavActive, { color: colors.primary }]}>Today</Text>
          <Text style={[styles.previewNav, { color: colors.textMuted }]}>Routines</Text>
          <Text style={[styles.previewNav, { color: colors.textMuted }]}>Settings</Text>
        </View>
      </View>
    </View>
  );
}

function SectionLabel({ color, label }) {
  return <Text style={[styles.sectionLabel, { color }]}>{label}</Text>;
}

function ChoiceCard({ active, color, label, description, symbol, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.choice, { backgroundColor: active ? color.primarySoft : color.surface, borderColor: active ? color.primary : color.border }]}
    >
      <View style={styles.choiceHeader}>
        <View style={[styles.swatch, { backgroundColor: color.primary }]}>
          <Text style={styles.swatchText}>{symbol}</Text>
        </View>
        {active ? <Text style={[styles.selectedMark, { color: color.primary }]}>Selected</Text> : null}
      </View>
      <Text style={[styles.choiceLabel, { color: color.text }]}>{label}</Text>
      <Text style={[styles.choiceDescription, { color: color.textSecondary }]}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md, padding: spacing.lg, paddingBottom: spacing.xxl },
  back: { alignSelf: 'flex-start', paddingVertical: spacing.xs },
  backText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold },
  eyebrow: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, marginTop: spacing.sm },
  title: { fontSize: typography.size.xxl, fontWeight: typography.weight.bold },
  subtitle: { fontSize: typography.size.md, lineHeight: typography.lineHeight.md },
  preview: { borderRadius: radii.lg, borderWidth: 1, minHeight: 280, overflow: 'hidden', padding: spacing.md },
  previewContent: { gap: spacing.sm, zIndex: 1 },
  previewTopline: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  previewDate: { fontSize: 9 },
  previewTitle: { fontSize: 24, fontWeight: typography.weight.bold, marginTop: 2 },
  previewAvatar: { alignItems: 'center', borderRadius: radii.pill, height: 28, justifyContent: 'center', width: 28 },
  previewSummary: { borderRadius: radii.md, marginTop: spacing.sm, padding: spacing.sm },
  previewSummaryLabel: { fontSize: 9 },
  previewSummaryValue: { fontSize: 13, fontWeight: typography.weight.semibold, marginTop: 2 },
  previewTask: { alignItems: 'center', borderRadius: radii.md, borderWidth: 1, flexDirection: 'row', padding: spacing.sm },
  previewCheckbox: { alignItems: 'center', borderRadius: radii.pill, borderWidth: 1, height: 17, justifyContent: 'center', marginRight: spacing.sm, width: 17 },
  previewTaskText: { flex: 1 },
  previewTaskTitle: { fontSize: 11, fontWeight: typography.weight.medium },
  previewTaskMeta: { fontSize: 9, marginTop: 2 },
  previewBottom: { borderTopColor: 'rgba(100, 100, 100, 0.14)', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.sm, paddingTop: spacing.sm },
  previewNav: { fontSize: 9 },
  previewNavActive: { fontSize: 9, fontWeight: typography.weight.bold },
  sectionLabel: { fontSize: typography.size.lg, fontWeight: typography.weight.semibold, marginTop: spacing.md },
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  choice: { borderRadius: radii.md, borderWidth: 1, minHeight: 112, padding: spacing.md, width: '48%' },
  choiceHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  swatch: { alignItems: 'center', borderRadius: radii.pill, height: 28, justifyContent: 'center', width: 28 },
  swatchText: { color: '#FFFFFF', fontSize: 15, textAlign: 'center' },
  selectedMark: { fontSize: 10, fontWeight: typography.weight.semibold },
  choiceLabel: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, marginTop: spacing.sm },
  choiceDescription: { fontSize: typography.size.xs, lineHeight: typography.lineHeight.sm, marginTop: spacing.xs },
});
