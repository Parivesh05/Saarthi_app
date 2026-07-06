import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, ViewStyle, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  activeOpacity?: number;
  scaleValue?: number;
  haptic?: boolean;
  hapticStyle?: 'light' | 'medium' | 'heavy';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onPress,
  style,
  disabled = false,
  activeOpacity = 0.9,
  scaleValue = 0.96,
  haptic = true,
  hapticStyle = 'light',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    // Haptic feedback on press
    if (haptic && Platform.OS !== 'web') {
      const impactStyle =
        hapticStyle === 'light' ? Haptics.ImpactFeedbackStyle.Light :
        hapticStyle === 'medium' ? Haptics.ImpactFeedbackStyle.Medium :
        Haptics.ImpactFeedbackStyle.Heavy;

      Haptics.impactAsync(impactStyle);
    }

    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
});
