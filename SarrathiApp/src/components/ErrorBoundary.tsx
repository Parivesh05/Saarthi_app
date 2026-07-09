import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, Radii } from 'src/constants/designTokens';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // TODO: Send to crash reporting service (e.g. Sentry.captureException(error))
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <LinearGradient
          colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
          style={styles.screen}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.iconWrap}>
                <Ionicons name="alert-circle-outline" size={52} color={Colors.danger} />
              </View>

              <Text style={styles.title}>Something went wrong</Text>
              <Text style={styles.subtitle}>
                The app ran into an unexpected problem. Please try again or restart the app.
              </Text>

              {__DEV__ && this.state.errorMessage ? (
                <View style={styles.debugBox}>
                  <Text style={styles.debugLabel}>Error details (dev only)</Text>
                  <Text style={styles.debugText} numberOfLines={4}>
                    {this.state.errorMessage}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.handleRetry}
                style={styles.retryBtnWrap}
              >
                <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.retryBtn}>
                  <Ionicons name="refresh-outline" size={20} color="#fff" />
                  <Text style={styles.retryText}>Try Again</Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.helpText}>
                If this keeps happening, contact support at{' '}
                <Text style={styles.helpLink}>support@ubudyapp.com</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.cardXl,
    padding: 32,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    ...Shadows.raisedCard,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: Colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '500',
    marginBottom: 20,
  },
  debugBox: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  debugLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  debugText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  retryBtnWrap: {
    width: '100%',
    marginBottom: 16,
    ...Shadows.primaryButton,
  },
  retryBtn: {
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  helpText: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    fontWeight: '500',
  },
  helpLink: {
    color: Colors.purple,
    fontWeight: '700',
  },
});

export default ErrorBoundary;
