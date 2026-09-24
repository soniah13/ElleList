import { Redirect } from 'expo-router';

import { Screen } from '../src/components/Screen';
import { useAuth } from '../src/hooks/useAuth';
import { Text } from 'react-native';

export default function Index() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading ElleList...</Text>
      </Screen>
    );
  }

  return <Redirect href={user ? '/(tabs)' : '/sign-in'} />;
}
