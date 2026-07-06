import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type TransitionType = 'fade' | 'slideUp' | 'slideRight' | 'scale' | 'slideDown';

interface PageTransitionProps {
  children: React.ReactNode;
  type?: TransitionType;
  duration?: number;
  delay?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 400,
  delay = 0,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(type === 'slideUp' ? 50 : type === 'slideDown' ? -50 : 0)).current;
  const translateX = useRef(new Animated.Value(type === 'slideRight' ? -50 : 0)).current;
  const scale = useRef(new Animated.Value(type === 'scale' ? 0.9 : 1)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ];

    if (type === 'slideUp' || type === 'slideDown') {
      animations.push(
        Animated.spring(translateY, {
          toValue: 0,
          tension: 100,
          friction: 10,
          delay,
          useNativeDriver: true,
        })
      );
    }

    if (type === 'slideRight') {
      animations.push(
        Animated.spring(translateX, {
          toValue: 0,
          tension: 100,
          friction: 10,
          delay,
          useNativeDriver: true,
        })
      );
    }

    if (type === 'scale') {
      animations.push(
        Animated.spring(scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          delay,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [
            { translateY },
            { translateX },
            { scale },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

// Staggered list animation
interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  itemDuration?: number;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  staggerDelay = 100,
  itemDuration = 400,
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <PageTransition
          type="slideUp"
          duration={itemDuration}
          delay={index * staggerDelay}
        >
          {child}
        </PageTransition>
      ))}
    </>
  );
};

// Fade transition wrapper
export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  return (
    <PageTransition type="fade" duration={300} delay={delay}>
      {children}
    </PageTransition>
  );
};

// Scale pop transition
export const ScalePop: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  return (
    <PageTransition type="scale" duration={400} delay={delay}>
      {children}
    </PageTransition>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
