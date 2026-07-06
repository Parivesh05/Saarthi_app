import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'light' | 'medium' | 'strong';
  borderRadius?: number;
  elevated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 'medium',
  borderRadius = 22,
  elevated = false,
}) => {
  const getGlassIntensity = () => {
    switch (intensity) {
      case 'light':
        return {
          bg: 'rgba(255, 255, 255, 0.6)',
          border: 'rgba(255, 255, 255, 0.25)',
        };
      case 'medium':
        return {
          bg: 'rgba(255, 255, 255, 0.75)',
          border: 'rgba(255, 255, 255, 0.35)',
        };
      case 'strong':
        return {
          bg: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(255, 255, 255, 0.5)',
        };
    }
  };

  const glassStyle = getGlassIntensity();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: glassStyle.bg,
          borderRadius,
          borderWidth: 1,
          borderColor: glassStyle.border,
        },
        elevated && styles.elevated,
        style,
      ]}
    >
      {/* Shimmer overlay for premium effect */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.shimmer, { borderRadius }]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: -100,
    right: -100,
    height: '100%',
    opacity: 0.3,
  },
  elevated: {
    shadowColor: '#3C3278',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 40,
    elevation: 8,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
