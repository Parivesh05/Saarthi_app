import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PremiumInput } from '@components/Premium';
import { Images } from 'src/assets/images';
import { LoginFormValues } from 'src/interface/Auth/login.interface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { NAVIGATION } from 'src/constants/Navigation/navigation.constant';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { loginUser, clearAuthError } from 'src/store/slices/authSlice';
import { onboardingStorage } from 'src/services/onboardingStorage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'src/constants/designTokens';

const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    });

    const initialValues: LoginFormValues = {
        email: 'john@example.com',
        password: 'Secret@123',
    };

    const handleLogin = async (values: LoginFormValues) => {
        // ══════════════════════════════════════════════════════════════
        // TEMPORARY BYPASS: Server issue - comment out for production
        // ══════════════════════════════════════════════════════════════
        const done = await onboardingStorage.isCompleted();
        navigation.replace(done ? NAVIGATION.MAIN_TABS : NAVIGATION.ONBOARDING_STEPS);
        return;
        // ══════════════════════════════════════════════════════════════
        // ORIGINAL CODE: Uncomment when server is back
        // ══════════════════════════════════════════════════════════════
        // dispatch(clearAuthError());
        // const result = await dispatch(loginUser(values));
        // if (loginUser.fulfilled.match(result)) {
        //     const done = await onboardingStorage.isCompleted();
        //     navigation.replace(done ? NAVIGATION.MAIN_TABS : NAVIGATION.ONBOARDING_STEPS);
        // } else if (loginUser.rejected.match(result)) {
        //     Alert.alert('Login Failed', result.payload ?? 'Something went wrong');
        // }
        // ══════════════════════════════════════════════════════════════
    };

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.screen}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
            <View style={styles.logoWrap}>
                <Image style={styles.logo} source={Images.U_LOGO} />
            </View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Continue your calm journey with uBudy</Text>

            <View style={styles.formContainer}>
                <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
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

                            <PremiumInput
                                label="Password"
                                placeholder="Enter your password"
                                icon="lock-closed-outline"
                                rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                onRightIconPress={() => setShowPassword(!showPassword)}
                                secureTextEntry={!showPassword}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={touched.password && errors.password ? errors.password : undefined}
                            />

                            <TouchableOpacity
                                style={styles.forgotRow}
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate(NAVIGATION.FORGOT_PASSWORD_SCREEN)}
                            >
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSubmit()}>
                                <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.primaryButton}>
                                    <Text style={styles.primaryButtonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
                                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

                <TouchableOpacity
                    onPress={() => navigation.navigate(NAVIGATION.SIGN_UP_SCREEN)}
                    style={styles.footerAction}
                >
                    <Text style={styles.footerText}>Create an account?</Text>
                    <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 22,
        paddingVertical: 20,
        minHeight: '100%',
    },
    logoWrap: {
        width: '100%',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 14,
    },
    logo: {
        width: 98,
        height: 98,
        borderRadius: 16,
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#211E37',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 6,
        color: '#8A8AA0',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    formContainer: {
        marginTop: 22,
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 24,
        shadowColor: '#3C3278',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 28,
        elevation: 6,
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
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 19,
    },
    forgotRow: {
        alignSelf: 'flex-end',
        marginTop: 6,
        marginBottom: 2,
    },
    forgotText: {
        fontSize: 13,
        color: '#6A5AE0',
        fontWeight: '700',
    },
    footerAction: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    footerText: {
        color: '#8A8AA0',
        fontWeight: '600',
    },
    footerLink: {
        color: '#6A5AE0',
        fontWeight: '800',
    },
});

export default LoginScreen;
