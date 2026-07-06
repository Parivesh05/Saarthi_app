import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SkeletonLoaderProps {
  width?: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height,
  borderRadius = 12,
  style,
  variant = 'rectangular',
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const getRadius = () => {
    if (variant === 'circular') return height / 2;
    if (variant === 'text') return 8;
    return borderRadius;
  };

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius: getRadius(),
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(240,240,245,0)', 'rgba(255,255,255,0.8)', 'rgba(240,240,245,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

// Group of skeletons for common patterns
export const SkeletonGroup = {
  ProfileCard: () => (
    <View style={styles.group}>
      <SkeletonLoader height={80} width={80} variant="circular" style={{ alignSelf: 'center' }} />
      <SkeletonLoader height={20} width="60%" style={{ alignSelf: 'center', marginTop: 12 }} />
      <SkeletonLoader height={16} width="40%" style={{ alignSelf: 'center', marginTop: 8 }} />
    </View>
  ),

  CardWithContent: () => (
    <View style={[styles.group, { padding: 20, backgroundColor: '#FFF', borderRadius: 22 }]}>
      <SkeletonLoader height={18} width="50%" />
      <SkeletonLoader height={14} width="90%" style={{ marginTop: 12 }} />
      <SkeletonLoader height={14} width="80%" style={{ marginTop: 8 }} />
      <SkeletonLoader height={48} width="100%" style={{ marginTop: 16 }} />
    </View>
  ),

  StatsRow: () => (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: 14,
            alignItems: 'center',
          }}
        >
          <SkeletonLoader height={20} width={20} variant="circular" />
          <SkeletonLoader height={18} width="60%" style={{ marginTop: 8 }} />
          <SkeletonLoader height={12} width="80%" style={{ marginTop: 6 }} />
        </View>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8F0',
    overflow: 'hidden',
  },
  shimmer: {
    width: 300,
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  group: {
    width: '100%',
  },
});
