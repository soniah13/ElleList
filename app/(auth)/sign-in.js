import { Link, Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { colors, radii, spacing, typography } from '../../src/constants/theme';
import { getAuthErrorMessage } from '../../src/services/authService';
import { useAuth } from '../../src/hooks/useAuth';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }

    setError('');
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
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
        <Text style={styles.eyebrow}>Welcome back</Text>
        <Text style={styles.title}>Sign in to ElleList</Text>
        <Text style={styles.subtitle}>Your calm plan for the day is waiting.</Text>

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            value={email}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button disabled={submitting} label={submitting ? 'Signing in...' : 'Sign in'} onPress={handleSubmit} />
        </View>

        <Text style={styles.footer}>
          New to ElleList?{' '}
          <Link href="/sign-up" style={styles.link}>
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
  eyebrow: { color: colors.primary, fontSize: typography.size.sm, fontWeight: typography.weight.semibold },
  title: { color: colors.text, fontSize: typography.size.xxl, fontWeight: typography.weight.bold, marginTop: spacing.xs },
  subtitle: { color: colors.textSecondary, fontSize: typography.size.md, marginTop: spacing.sm },
  form: { gap: spacing.md, marginTop: spacing.xl },
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
  error: { color: '#A33A3A', fontSize: typography.size.sm },
  footer: { color: colors.textSecondary, fontSize: typography.size.sm, marginTop: spacing.xl, textAlign: 'center' },
  link: { color: colors.primary, fontWeight: typography.weight.semibold },
});