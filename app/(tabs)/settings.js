import { PlaceholderScreen } from '../../src/components/PlaceholderScreen';
import { Button } from '../../src/components/Button';
import { useAuth } from '../../src/hooks/useAuth';
import { View } from 'react-native';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <PlaceholderScreen title="Settings" message="Your account settings will live here.">
      <View>
        <Button label="Sign out" onPress={signOut} />
      </View>
    </PlaceholderScreen>
  );
}
