import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Alert,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from 'src/styles/signup.style';
import AppButton from '@components/Common/AppButton';
import AppTextInput from '@components/Common/AppTextInput';
import { colors } from 'src/styles/theme/colors';
import { Images } from 'src/assets/images';
import { SignupFormValues } from 'src/interface/Auth/signup.interface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { NAVIGATION } from 'src/constants/Navigation/navigation.constant';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { clearAuthError, signupUser } from 'src/store/slices/authSlice';


const SignupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const signUpSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Minimum 2 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        password: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('Password is required'),
    });

    const initialValues: SignupFormValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER',
    };

    const handleSignup = async (values: SignupFormValues) => {
        dispatch(clearAuthError());
        const result = await dispatch(signupUser(values));
        if (signupUser.fulfilled.match(result)) {
            navigation.navigate(NAVIGATION.ONBOARDING_STEPS);
        } else if (signupUser.rejected.match(result)) {
            Alert.alert('Signup Failed', result.payload ?? 'Something went wrong');
        }
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>
                <ImageBackground
                    style={{ position: "absolute", width: "100%", height: "100%" }}
                    source={Images.SPLASH_BACKGROUND}
                />
                <Image
                    style={styles.logo}
                    source={Images.UPDATED_OWL}
                />
                <Text style={styles.title}>Create an account</Text>
                <View style={styles.formikMainContainer}>
                    <Text style={styles.sectionTitle}>Sign up with email</Text>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpSchema}
                        onSubmit={handleSignup}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <>
                                {/* Name */}
                                <AppTextInput
                                    placeholder="Enter Name"
                                    containerStyle={styles.width94}
                                    inputStyle={styles.textInputStyle}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                {touched.name && errors.name && (
                                    <Text style={styles.error}>{errors.name}</Text>
                                )}

                                <AppTextInput
                                    placeholder="Enter Email"
                                    containerStyle={styles.width94}
                                    inputStyle={styles.textInputStyle}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.error}>{errors.email}</Text>
                                )}

                                <AppTextInput
                                    placeholder="Enter Phone Number"
                                    containerStyle={styles.width94}
                                    inputStyle={styles.textInputStyle}
                                    keyboardType="phone-pad"
                                    autoCapitalize="none"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                />
                                {touched.phone && errors.phone && (
                                    <Text style={styles.error}>{errors.phone}</Text>
                                )}

                                {/* Password */}
                                <AppTextInput
                                    placeholder="Password"
                                    containerStyle={styles.width94}
                                    inputStyle={styles.textInputStyle}
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                )}

                                {/* Sign Up Button */}
                                <AppButton
                                    title={isLoading ? "Signing up..." : "Sign Up"}
                                    textStyle={styles.loginTextButton}
                                    onPress={() => handleSubmit()}
                                    style={styles.loginButton}
                                    iconLibrary="Ionicons"
                                    iconName="arrow-forward"
                                    iconPosition="right"
                                    disabled={isLoading}
                                />
                            </>
                        )}
                    </Formik>
                    <Text style={styles.socialTitle}>or continue with</Text>
                    <View style={styles.socialRow}>
                        <AppButton
                            title="Gmail"
                            textStyle={styles.buttonText}
                            style={styles.socialButton}
                            iconLibrary="FontAwesome"
                            iconName="google"
                            iconSize={17}
                            iconColor="#EA4335"
                            onPress={() => console.log('Gmail signup pressed')}
                        />
                        <AppButton
                            title="Facebook"
                            textStyle={styles.buttonText}
                            style={styles.socialButton}
                            iconLibrary="FontAwesome"
                            iconName="facebook"
                            iconSize={17}
                            iconColor="#1877F2"
                            onPress={() => console.log('Facebook signup pressed')}
                        />
                    </View>
                </View>

        </ScrollView>
    );
}
export default SignupScreen;
