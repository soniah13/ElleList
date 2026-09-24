import { Link, Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { colors, radii, spacing, typography } from '../../src/constants/theme';
import { useAuth } from '../../src/hooks/useAuth';
import { getAuthErrorMessage } from '../../src/services/authService';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  async function handleSubmit() {
    if (!email.trim() || !password || !confirmPassword) {
      setError('Complete all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setMessage('');
    setSubmitting(true);
    const { data, error: signUpError } = await signUp(email, password);
    setSubmitting(false);

    if (signUpError) {
      setError(getAuthErrorMessage(signUpError));
      return;
    }

    if (data.session) {
      router.replace('/(tabs)');
    } else {
      setMessage('Account created. Check your email to confirm your account, then sign in.');
    }
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>A softer way to organize</Text>
        <Text style={styles.title}>Create your ElleList</Text>
        <Text style={styles.subtitle}>Keep your everyday tasks close and manageable.</Text>

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
            autoComplete="new-password"
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="new-password"
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <Button disabled={submitting} label={submitting ? 'Creating account...' : 'Create account'} onPress={handleSubmit} />
        </View>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <Link href="/sign-in" style={styles.link}>
            Sign in
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
  message: { color: colors.success, fontSize: typography.size.sm },
  footer: { color: colors.textSecondary, fontSize: typography.size.sm, marginTop: spacing.xl, textAlign: 'center' },
  link: { color: colors.primary, fontWeight: typography.weight.semibold },
});