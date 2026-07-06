import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type?: ToastType;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  showIcon?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onDismiss,
  showIcon = true,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Haptic feedback
    if (Platform.OS !== 'web') {
      if (type === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (type === 'error') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    // Slide in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onDismiss) onDismiss();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          colors: ['#22B573', '#1A9B5F'],
          icon: 'checkmark-circle' as const,
          shadowColor: '#22B573',
        };
      case 'error':
        return {
          colors: ['#EF5B5B', '#D94545'],
          icon: 'alert-circle' as const,
          shadowColor: '#EF5B5B',
        };
      case 'warning':
        return {
          colors: ['#F5A623', '#E09612'],
          icon: 'warning' as const,
          shadowColor: '#F5A623',
        };
      default:
        return {
          colors: ['#6A5AE0', '#4A90E2'],
          icon: 'information-circle' as const,
          shadowColor: '#6A5AE0',
        };
    }
  };

  const config = getToastConfig();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.toast,
          {
            shadowColor: config.shadowColor,
          },
        ]}
      >
        {showIcon && (
          <Ionicons name={config.icon} size={24} color="#FFFFFF" style={styles.icon} />
        )}
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

// Toast Manager for showing toasts
class ToastManager {
  private toastRef: any = null;

  setToastRef(ref: any) {
    this.toastRef = ref;
  }

  show(props: Omit<ToastProps, 'onDismiss'>) {
    if (this.toastRef) {
      this.toastRef.show(props);
    }
  }

  success(message: string, duration?: number) {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration?: number) {
    this.show({ type: 'error', message, duration });
  }

  info(message: string, duration?: number) {
    this.show({ type: 'info', message, duration });
  }

  warning(message: string, duration?: number) {
    this.show({ type: 'warning', message, duration });
  }
}

export const toastManager = new ToastManager();

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 10000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 10,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
});
