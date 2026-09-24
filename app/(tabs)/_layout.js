import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Platform, View } from 'react-native';

import { colors, spacing, typography } from '../../src/constants/theme';
import { useAuth } from '../../src/hooks/useAuth';

export default function TabLayout() {
  const { loading, user } = useAuth();

  if (loading) {
    return <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: colors.text,
          fontSize: typography.size.lg,
          fontWeight: typography.weight.semibold,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: Platform.select({ ios: 88, default: 64 }),
          paddingTop: spacing.xs,
        },
        tabBarLabelStyle: {
          fontSize: typography.size.xs,
          fontWeight: typography.weight.medium,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Today' }} />
      <Tabs.Screen name="routine" options={{ title: 'Routines' }} />
      <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
