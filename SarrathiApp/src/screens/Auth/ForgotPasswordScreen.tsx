import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { PremiumInput } from '@components/Premium';
import { Colors, Shadows, Radii } from 'src/constants/designTokens';
import { Images } from 'src/assets/images';

// Screens: STEP_EMAIL → STEP_OTP → STEP_RESET → STEP_SUCCESS
type Step = 'email' | 'otp' | 'reset' | 'success';

const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});

const resetSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const StepIndicator = () => {
    const steps = ['email', 'otp', 'reset'];
    const currentIndex = steps.indexOf(step === 'success' ? 'reset' : step);
    return (
      <View style={styles.stepRow}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <View style={[styles.stepDot, i <= currentIndex && styles.stepDotActive]}>
              {i < currentIndex ? (
                <Ionicons name="checkmark" size={12} color="#fff" />
              ) : (
                <Text style={[styles.stepNum, i <= currentIndex && styles.stepNumActive]}>
                  {i + 1}
                </Text>
              )}
            </View>
            {i < steps.length - 1 && (
              <View style={[styles.stepLine, i < currentIndex && styles.stepLineActive]} />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const renderEmailStep = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={emailSchema}
      onSubmit={(values) => {
        setEmail(values.email);
        // TODO: API - POST /auth/forgot-password { email }
        setStep('otp');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.stepIconWrap}>
            <Ionicons name="mail-outline" size={32} color={Colors.purple} />
          </View>
          <Text style={styles.stepTitle}>Forgot Password?</Text>
          <Text style={styles.stepSubtitle}>
            Enter your registered email address and we'll send you an OTP to reset your password.
          </Text>

          <View style={styles.formCard}>
            <PremiumInput
              label="Email Address"
              placeholder="Enter your email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSubmit()}>
              <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Send OTP</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );

  const renderOtpStep = () => (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={otpSchema}
      onSubmit={() => {
        // TODO: API - POST /auth/verify-otp { email, otp }
        setStep('reset');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.stepIconWrap}>
            <Ionicons name="keypad-outline" size={32} color={Colors.purple} />
          </View>
          <Text style={styles.stepTitle}>Enter OTP</Text>
          <Text style={styles.stepSubtitle}>
            We've sent a 6-digit OTP to{' '}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>

          <View style={styles.formCard}>
            <PremiumInput
              label="6-Digit OTP"
              placeholder="Enter OTP"
              icon="keypad-outline"
              keyboardType="number-pad"
              maxLength={6}
              value={values.otp}
              onChangeText={handleChange('otp')}
              onBlur={handleBlur('otp')}
              error={touched.otp && errors.otp ? errors.otp : undefined}
            />

            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSubmit()}>
              <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Verify OTP</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendRow}
              activeOpacity={0.7}
              onPress={() => {
                // TODO: API - POST /auth/resend-otp { email }
              }}
            >
              <Text style={styles.resendText}>Didn't receive it? </Text>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );

  const renderResetStep = () => (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={resetSchema}
      onSubmit={() => {
        // TODO: API - POST /auth/reset-password { email, otp, newPassword }
        setStep('success');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.stepIconWrap}>
            <Ionicons name="lock-closed-outline" size={32} color={Colors.purple} />
          </View>
          <Text style={styles.stepTitle}>New Password</Text>
          <Text style={styles.stepSubtitle}>
            Create a strong new password for your account.
          </Text>

          <View style={styles.formCard}>
            <PremiumInput
              label="New Password"
              placeholder="Enter new password"
              icon="lock-closed-outline"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password ? errors.password : undefined}
            />
            <PremiumInput
              label="Confirm Password"
              placeholder="Re-enter new password"
              icon="lock-closed-outline"
              rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowConfirm(!showConfirm)}
              secureTextEntry={!showConfirm}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
            />

            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSubmit()}>
              <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Reset Password</Text>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );

  const renderSuccess = () => (
    <View style={styles.successWrap}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark-circle" size={72} color={Colors.success} />
      </View>
      <Text style={styles.successTitle}>Password Reset!</Text>
      <Text style={styles.successSub}>
        Your password has been successfully updated. You can now log in with your new password.
      </Text>
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
        <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Back to Login</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
      style={styles.screen}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={() => (step === 'email' ? navigation.goBack() : setStep('email'))}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrap}>
          <Image style={styles.logo} source={Images.U_LOGO} />
        </View>

        {step !== 'success' && <StepIndicator />}

        {step === 'email' && renderEmailStep()}
        {step === 'otp' && renderOtpStep()}
        {step === 'reset' && renderResetStep()}
        {step === 'success' && renderSuccess()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.softCard,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.ink,
  },
  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  logoWrap: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 14,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.hairline2,
  },
  stepDotActive: {
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
  stepNum: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.muted,
  },
  stepNumActive: {
    color: '#fff',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.hairline,
    marginHorizontal: 6,
    maxWidth: 50,
  },
  stepLineActive: {
    backgroundColor: Colors.purple,
  },
  stepIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: Colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  emailHighlight: {
    color: Colors.purple,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 22,
    ...Shadows.raisedCard,
  },
  primaryBtn: {
    marginTop: 16,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...Shadows.primaryButton,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '500',
  },
  resendLink: {
    fontSize: 14,
    color: Colors.purple,
    fontWeight: '700',
  },
  successWrap: {
    alignItems: 'center',
    paddingTop: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 12,
  },
  successSub: {
    fontSize: 15,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 32,
    paddingHorizontal: 12,
  },
});

export default ForgotPasswordScreen;
