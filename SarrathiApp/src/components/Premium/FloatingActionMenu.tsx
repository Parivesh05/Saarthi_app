import React, { useState, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface FABAction {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
}

interface FloatingActionMenuProps {
  actions: FABAction[];
  mainIcon?: keyof typeof Ionicons.glyphMap;
  mainColor?: string[];
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  actions,
  mainIcon = 'add',
  mainColor = ['#6A5AE0', '#4A90E2'],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const actionAnimations = useRef(
    actions.map(() => ({
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  const toggleMenu = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);

    // Main button rotation
    Animated.spring(rotation, {
      toValue: toValue * 45,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Backdrop
    Animated.timing(backdropOpacity, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Actions
    const animations = actionAnimations.map((anim, index) => {
      const delay = index * 50;
      return Animated.parallel([
        Animated.spring(anim.translateY, {
          toValue: toValue * (-(index + 1) * 70),
          tension: 100,
          friction: 8,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue,
          duration: 200,
          delay,
          useNativeDriver: true,
        }),
        Animated.spring(anim.scale, {
          toValue,
          tension: 150,
          friction: 6,
          delay,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(50, animations).start();
  };

  const handleActionPress = (action: FABAction) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleMenu();
    setTimeout(() => action.onPress(), 300);
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 45],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      {/* Backdrop */}
      {isOpen && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacity,
              },
            ]}
          />
        </TouchableOpacity>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <Animated.View
            key={index}
            style={[
              styles.actionWrapper,
              {
                transform: [
                  { translateY: actionAnimations[index].translateY },
                  { scale: actionAnimations[index].scale },
                ],
                opacity: actionAnimations[index].opacity,
              },
            ]}
          >
            <View style={styles.actionRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{action.label}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleActionPress(action)}
                activeOpacity={0.9}
              >
                <View style={[styles.actionButton, { backgroundColor: action.color || '#FFFFFF' }]}>
                  <Ionicons name={action.icon} size={24} color="#6A5AE0" />
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Main FAB */}
      <TouchableOpacity onPress={toggleMenu} activeOpacity={0.9}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <LinearGradient colors={mainColor} style={styles.mainButton}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Ionicons name={mainIcon} size={28} color="#FFFFFF" />
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    alignItems: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'flex-end',
  },
  actionWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelContainer: {
    backgroundColor: 'rgba(33, 30, 55, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3C3278',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.42,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 10,
  },
});
