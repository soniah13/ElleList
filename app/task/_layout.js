import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function TaskLayout() {
  const { loading, user } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return <View style={{ alignItems: 'center', backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center' }}><ActivityIndicator color={theme.colors.primary} /></View>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}