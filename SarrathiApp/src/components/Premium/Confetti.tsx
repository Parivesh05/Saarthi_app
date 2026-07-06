import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ConfettiProps {
  count?: number;
  duration?: number;
  colors?: string[];
  onComplete?: () => void;
}

interface ConfettiPiece {
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  opacity: Animated.Value;
  color: string;
  size: number;
}

export const Confetti: React.FC<ConfettiProps> = ({
  count = 50,
  duration = 3000,
  colors = ['#6A5AE0', '#4A90E2', '#22B573', '#F5A623', '#EF5B5B', '#E84B8A'],
  onComplete,
}) => {
  const confettiPieces = useRef<ConfettiPiece[]>([]).current;

  // Initialize confetti pieces
  useEffect(() => {
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: new Animated.Value(Math.random() * SCREEN_WIDTH),
        y: new Animated.Value(-20),
        rotation: new Animated.Value(Math.random() * 360),
        opacity: new Animated.Value(1),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
      });
    }

    confettiPieces.push(...pieces);
  }, []);

  useEffect(() => {
    const animations = confettiPieces.map((piece, index) => {
      const delay = Math.random() * 200;
      const fallDuration = duration + Math.random() * 1000;

      return Animated.parallel([
        // Fall down
        Animated.timing(piece.y, {
          toValue: SCREEN_HEIGHT + 50,
          duration: fallDuration,
          delay,
          useNativeDriver: true,
        }),
        // Spin
        Animated.loop(
          Animated.timing(piece.rotation, {
            toValue: 360 + Math.random() * 720,
            duration: 1000 + Math.random() * 1000,
            useNativeDriver: true,
          })
        ),
        // Fade out near end
        Animated.sequence([
          Animated.delay(fallDuration * 0.7),
          Animated.timing(piece.opacity, {
            toValue: 0,
            duration: fallDuration * 0.3,
            useNativeDriver: true,
          }),
        ]),
        // Sway side to side
        Animated.loop(
          Animated.sequence([
            Animated.timing(piece.x, {
              toValue: piece.x._value + (Math.random() - 0.5) * 100,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(piece.x, {
              toValue: piece.x._value,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]);
    });

    Animated.parallel(animations).start(() => {
      if (onComplete) onComplete();
    });
  }, [confettiPieces]);

  return (
    <View style={styles.container} pointerEvents="none">
      {confettiPieces.map((piece, index) => {
        const rotate = piece.rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.confettiPiece,
              {
                width: piece.size,
                height: piece.size * 1.5,
                backgroundColor: piece.color,
                transform: [
                  { translateX: piece.x },
                  { translateY: piece.y },
                  { rotate },
                ],
                opacity: piece.opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  confettiPiece: {
    position: 'absolute',
    borderRadius: 2,
  },
});
