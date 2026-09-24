import { StyleSheet, Text, View } from 'react-native';

export function PatternLayer({ pattern, color, opacity = 0.14, style }) {
  if (!pattern || !pattern.symbol) {
    return null;
  }

  const positions = [
    { left: '8%', top: '12%', rotate: '-12deg' },
    { right: '10%', top: '26%', rotate: '14deg' },
    { left: '18%', bottom: '10%', rotate: '8deg' },
    { right: '18%', bottom: '16%', rotate: '-10deg' },
  ];

  return (
    <View pointerEvents="none" style={[styles.layer, style]}>
      {positions.map((position, index) => (
        <Text
          key={index}
          style={[
            styles.symbol,
            { color, opacity, left: position.left, right: position.right, top: position.top, bottom: position.bottom },
            pattern.id === 'geometric' && styles.geometric,
            pattern.id === 'waves' && styles.waves,
            { transform: [{ rotate: position.rotate }] },
          ]}
        >
          {pattern.symbol}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  symbol: { fontSize: 28, position: 'absolute' },
  geometric: { fontSize: 34 },
  waves: { fontSize: 38 },
});
