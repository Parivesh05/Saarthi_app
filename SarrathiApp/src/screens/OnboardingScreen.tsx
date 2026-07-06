import { AppCheckbox } from '@components/Common/AppCheckbox';
import { ONBOARDING_STEPS } from '@utils/onboardingSteps';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { onboardingStorage } from 'src/services/onboardingStorage';
import { Colors, Gradients } from 'src/constants/designTokens';


const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const current = ONBOARDING_STEPS[step];
  const isLastStep = step === ONBOARDING_STEPS.length - 1;

  useEffect(() => {
    if (!answers[step]) {
      const defaultOption = current.options[Math.min(current.defaultIndex, current.options.length - 1)];
      setAnswers(prev => ({
        ...prev,
        [step]: defaultOption,
      }));
    }
  }, [answers, current.options, current.defaultIndex, step]);

  const finishOnboarding = async () => {
    await onboardingStorage.markCompleted();
    navigation.replace(NAVIGATION.MAIN_TABS);
  };

  return (
    <LinearGradient
      colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
      style={styles.container}
    >
      <View style={styles.progressBg}>
        <LinearGradient
          colors={Gradients.primaryButton}
          style={[styles.progressFill, { width: `${((step + 1) / ONBOARDING_STEPS.length) * 100}%` }]}
        />
      </View>

      <Text style={styles.stepText}>STEP {step + 1} OF {ONBOARDING_STEPS.length}</Text>
      <Text style={styles.question}>{current.question}</Text>

      <View style={styles.optionsWrap}>
        {current.options.map((option) => (
          <AppCheckbox
            key={option}
            label={option}
            selected={answers[step] === option}
            onPress={() => setAnswers(prev => ({ ...prev, [step]: option }))}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => (isLastStep ? finishOnboarding() : setStep(step + 1))}
        activeOpacity={0.9}
      >
        <LinearGradient colors={Gradients.primaryButton} style={styles.primaryButton}>
          <Text style={styles.primaryText}>{isLastStep ? 'I am ready' : 'Next'}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={finishOnboarding} style={styles.skipWrap}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  progressBg: {
    width: '100%',
    height: 12,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ECEAF5',
  },
  progressFill: {
    height: '100%',
    borderRadius: 20,
  },
  stepText: {
    marginTop: 18,
    color: '#8A8AA0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  question: {
    color: '#211E37',
    fontSize: 25,
    marginTop: 8,
    fontWeight: '700',
    lineHeight: 34,
  },
  optionsWrap: {
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    marginTop: 16,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 8,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  skipWrap: {
    marginTop: 14,
    alignSelf: 'center',
    padding: 8,
  },
  skipText: {
    color: '#6A5AE0',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
