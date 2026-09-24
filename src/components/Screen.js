import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../theme/ThemeProvider';
import { PatternLayer } from './PatternLayer';

export function Screen({ children, style }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['left', 'right', 'bottom']}>
      <View style={styles.content}>
        <PatternLayer color={theme.colors.pattern} pattern={theme.pattern} />
        <View style={style}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { flex: 1, position: 'relative' },
});
