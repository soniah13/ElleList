import { Button } from '../../src/components/Button';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { PlaceholderScreen } from '../../src/components/PlaceholderScreen';
import { spacing, typography } from '../../src/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { theme } = useTheme();

  return (
    <PlaceholderScreen title="Settings" message="Shape the look and feel of your daily space.">
      <View style={styles.content}>
        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Appearance</Text>
        <Text style={[styles.appearanceSummary, { color: theme.colors.textSecondary }]}>
          {theme.pattern.label} + {theme.palette.label}
        </Text>
        <Button label="Customize ElleList" onPress={() => router.push('/appearance')} />
        <Button label="Sign out" onPress={signOut} />
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md, marginTop: spacing.xl },
  sectionLabel: { fontSize: typography.size.lg, fontWeight: typography.weight.semibold },
  appearanceSummary: { fontSize: typography.size.md },
});
