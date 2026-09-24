import { Link, Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { radii, spacing, typography } from '../../src/constants/theme';
import { getAuthErrorMessage } from '../../src/services/authService';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, user, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  async function handleSubmit() {
    if (!identifier.trim() || !password) {
      setError('Enter your username/email and password.');
      return;
    }

    setError('');
    setSubmitting(true);
    const { error: signInError } = await signIn(identifier, password);
    setSubmitting(false);

    if (signInError) {
      setError(getAuthErrorMessage(signInError));
      return;
    }

    router.replace('/(tabs)');
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>Welcome back</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>Sign in to ElleList</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Your calm plan for the day is waiting.</Text>

        <View style={styles.form}>
          <TextInput
            autoComplete="username"
            autoCapitalize="none"
            onChangeText={setIdentifier}
            placeholder="Username or email"
            placeholderTextColor={theme.colors.textMuted}
            style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
            value={identifier}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={theme.colors.textMuted}
            secureTextEntry
            style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
            value={password}
          />
          {error ? <Text style={[styles.error, { color: theme.colors.primary }]}>{error}</Text> : null}
          <Button disabled={submitting} label={submitting ? 'Signing in...' : 'Sign in'} onPress={handleSubmit} />
        </View>

        <Text style={[styles.footer, { color: theme.colors.textSecondary }]}>
          New to ElleList?{' '}
          <Link href="/sign-up" style={[styles.link, { color: theme.colors.primary }]}>
            Create an account
          </Link>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'center', padding: spacing.lg },
  content: { width: '100%' },
  eyebrow: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold },
  title: { fontSize: typography.size.xxl, fontWeight: typography.weight.bold, marginTop: spacing.xs },
  subtitle: { fontSize: typography.size.md, marginTop: spacing.sm },
  form: { gap: spacing.md, marginTop: spacing.xl },
  input: {
    borderRadius: radii.md,
    borderWidth: 1,
    fontSize: typography.size.md,
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  error: { fontSize: typography.size.sm },
  footer: { fontSize: typography.size.sm, marginTop: spacing.xl, textAlign: 'center' },
  link: { fontWeight: typography.weight.semibold },
});