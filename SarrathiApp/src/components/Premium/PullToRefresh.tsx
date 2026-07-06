import React, { useRef, useEffect } from 'react';
import { RefreshControl, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PremiumRefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
  colors?: string[];
}

export const PremiumRefreshControl: React.FC<PremiumRefreshControlProps> = ({
  refreshing,
  onRefresh,
  colors = ['#6A5AE0', '#4A90E2'],
}) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={colors}
      tintColor={colors[0]}
      progressBackgroundColor="rgba(255, 255, 255, 0.95)"
      titleColor={colors[0]}
      title="Pull to refresh"
    />
  );
};

// Animated owl loader for custom refresh
export const OwlLoader: React.FC<{ size?: number }> = ({ size = 60 }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.spring(scaleAnim, {
            toValue: 1.1,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.loaderContainer,
        {
          transform: [{ rotate: spin }, { scale: scaleAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={['#6A5AE0', '#4A90E2']}
        style={[styles.loaderCircle, { width: size, height: size, borderRadius: size / 2 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderCircle: {
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
});
