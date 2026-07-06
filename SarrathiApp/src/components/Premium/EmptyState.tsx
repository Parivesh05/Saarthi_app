import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedButton } from './AnimatedButton';
import { LinearGradient } from 'expo-linear-gradient';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
  variant?: 'default' | 'gradient';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'sparkles-outline',
  title,
  description,
  actionLabel,
  onActionPress,
  variant = 'default',
}) => {
  const IconWrapper = variant === 'gradient' ?
    ({ children }: { children: React.ReactNode }) => (
      <LinearGradient
        colors={['#6A5AE0', '#4A90E2']}
        style={styles.iconGradient}
      >
        {children}
      </LinearGradient>
    ) :
    ({ children }: { children: React.ReactNode }) => (
      <View style={styles.iconCircle}>{children}</View>
    );

  return (
    <View style={styles.container}>
      <IconWrapper>
        <Ionicons
          name={icon}
          size={40}
          color={variant === 'gradient' ? '#FFFFFF' : '#6A5AE0'}
        />
      </IconWrapper>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionLabel && onActionPress && (
        <AnimatedButton onPress={onActionPress} scaleValue={0.96}>
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>{actionLabel}</Text>
          </View>
        </AnimatedButton>
      )}
    </View>
  );
};

// Predefined empty states for common scenarios
export const EmptyStates = {
  NoMoodLogs: () => (
    <EmptyState
      icon="happy-outline"
      title="No mood logs yet"
      description="Start tracking your emotional journey. Log your first mood to see patterns over time."
      actionLabel="Log mood"
      variant="gradient"
    />
  ),

  NoJournalEntries: () => (
    <EmptyState
      icon="book-outline"
      title="Your journal is empty"
      description="Begin your mindful writing practice. Express your thoughts and feelings freely."
      actionLabel="Start writing"
      variant="gradient"
    />
  ),

  NoChatHistory: () => (
    <EmptyState
      icon="chatbubbles-outline"
      title="Start a conversation"
      description="uBudy is here to listen and support you. Share what's on your mind."
      actionLabel="Begin chat"
      variant="gradient"
    />
  ),

  NoInsights: () => (
    <EmptyState
      icon="analytics-outline"
      title="Building your insights"
      description="Keep logging your moods and journaling. We'll generate personalized insights soon."
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEEBFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#211E37',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8A8AA0',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#6A5AE0',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
