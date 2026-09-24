import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { colors } from '../../src/constants/theme';
import { useAuth } from '../../src/hooks/useAuth';

export default function TaskLayout() {
  const { loading, user } = useAuth();

  if (loading) {
    return <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}