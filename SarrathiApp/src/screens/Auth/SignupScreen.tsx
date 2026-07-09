import React, { useState } from 'react';
import { View, Text, Image, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PremiumInput } from '@components/Premium';
import { Images } from 'src/assets/images';
import { SignupFormValues } from 'src/interface/Auth/signup.interface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { NAVIGATION } from 'src/constants/Navigation/navigation.constant';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { clearAuthError, signupUser } from 'src/store/slices/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'src/constants/designTokens';


const SignupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState('');

    const signUpSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Minimum 2 characters').required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    });

    const initialValues: SignupFormValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER',
    };

    const handleSignup = async (values: SignupFormValues) => {
        if (!termsAccepted) {
            setTermsError('You must accept the Terms of Service and Privacy Policy to continue');
            return;
        }
        setTermsError('');
        // ══════════════════════════════════════════════════════════════
        // TEMPORARY BYPASS: Server issue - comment out for production
        // ══════════════════════════════════════════════════════════════
        navigation.navigate(NAVIGATION.ONBOARDING_STEPS);
        return;
        // ══════════════════════════════════════════════════════════════
        // ORIGINAL CODE: Uncomment when server is back
        // ══════════════════════════════════════════════════════════════
        // dispatch(clearAuthError());
        // const result = await dispatch(signupUser(values));
        // if (signupUser.fulfilled.match(result)) {
        //     navigation.navigate(NAVIGATION.ONBOARDING_STEPS);
        // } else if (signupUser.rejected.match(result)) {
        //     Alert.alert('Signup Failed', result.payload ?? 'Something went wrong');
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
            <TouchableOpacity activeOpacity={0.9} style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={20} color="#211E37" />
            </TouchableOpacity>
            <View style={styles.logoWrap}>
                <Image style={styles.logo} source={Images.U_LOGO} />
            </View>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Build your personalized calm space in uBudy</Text>

            <View style={styles.formCard}>
                <Formik initialValues={initialValues} validationSchema={signUpSchema} onSubmit={handleSignup}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <PremiumInput
                                label="Full Name"
                                placeholder="Enter your name"
                                icon="person-outline"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                error={touched.name && errors.name ? errors.name : undefined}
                            />

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
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                icon="call-outline"
                                keyboardType="phone-pad"
                                value={values.phone}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                error={touched.phone && errors.phone ? errors.phone : undefined}
                            />

                            <PremiumInput
                                label="Password"
                                placeholder="Create a password"
                                icon="lock-closed-outline"
                                rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                onRightIconPress={() => setShowPassword(!showPassword)}
                                secureTextEntry={!showPassword}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={touched.password && errors.password ? errors.password : undefined}
                            />

                            {/* Terms & Privacy acceptance */}
                            <TouchableOpacity
                                style={styles.termsRow}
                                activeOpacity={0.7}
                                onPress={() => {
                                    setTermsAccepted(!termsAccepted);
                                    if (!termsAccepted) setTermsError('');
                                }}
                            >
                                <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                                    {termsAccepted && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                                </View>
                                <Text style={styles.termsText}>
                                    I agree to the{' '}
                                    <Text
                                        style={styles.termsLink}
                                        onPress={() => navigation.navigate(NAVIGATION.TERMS_OF_SERVICE_SCREEN)}
                                    >
                                        Terms of Service
                                    </Text>
                                    {' '}and{' '}
                                    <Text
                                        style={styles.termsLink}
                                        onPress={() => navigation.navigate(NAVIGATION.PRIVACY_POLICY_SCREEN)}
                                    >
                                        Privacy Policy
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            {termsError ? (
                                <Text style={styles.termsErrorText}>{termsError}</Text>
                            ) : null}

                            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSubmit()}>
                                <LinearGradient colors={['#6A5AE0', '#4A90E2']} style={styles.primaryButton}>
                                    <Text style={styles.primaryButtonText}>{isLoading ? 'Signing up...' : 'Create account'}</Text>
                                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
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
        paddingVertical: 16,
        minHeight: '100%',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrap: {
        alignItems: 'center',
        marginTop: 8,
    },
    logo: {
        width: 94,
        height: 94,
        borderRadius: 16,
    },
    title: {
        marginTop: 10,
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
    formCard: {
        marginTop: 20,
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
        marginTop: 18,
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
        fontSize: 18,
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginTop: 16,
        marginBottom: 4,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#D4CEED',
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
    },
    checkboxChecked: {
        backgroundColor: '#6A5AE0',
        borderColor: '#6A5AE0',
    },
    termsText: {
        flex: 1,
        fontSize: 13,
        color: '#4A4763',
        lineHeight: 19,
        fontWeight: '500',
    },
    termsLink: {
        color: '#6A5AE0',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    termsErrorText: {
        fontSize: 12,
        color: '#EF5B5B',
        fontWeight: '600',
        marginBottom: 4,
        paddingLeft: 2,
    },
});

export default SignupScreen;
