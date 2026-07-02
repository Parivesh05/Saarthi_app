import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Alert,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from 'src/styles/login.style';
import AppButton from '@components/Common/AppButton';
import AppTextInput from '@components/Common/AppTextInput';
import { colors } from 'src/styles/theme/colors';
import { Images } from 'src/assets/images';
import { LoginFormValues } from 'src/interface/Auth/login.interface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { NAVIGATION } from 'src/constants/Navigation/navigation.constant';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { loginUser, clearAuthError } from 'src/store/slices/authSlice';

const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('Password is required'),
    });

    const initialValues: LoginFormValues = {
        email: 'john@example.com',
        password: 'Secret@123',
    };

    const handleLogin = async (values: LoginFormValues) => {
        //navigation.navigate(NAVIGATION.MAIN_TABS);
        
        dispatch(clearAuthError());
        const result = await dispatch(loginUser(values));
        if (loginUser.fulfilled.match(result)) {
            // Navigate on successful login
            navigation.replace(NAVIGATION.MAIN_TABS);
        } else if (loginUser.rejected.match(result)) {
            Alert.alert('Login Failed', result.payload ?? 'Something went wrong');
        }
    };
    return (

        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <ImageBackground
                style={{ position: "absolute", width: "100%", height: "100%" }}
                source={Images.SPLASH_BACKGROUND}
            />
            <Image
                style={styles.logo}
                source={Images.UPDATED_OWL}
            />
            <Text style={styles.title}>Before we talk</Text>
            <View style={styles.formikMainContainer}>
                <Text style={styles.sectionTitle}>Login with email</Text>

                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
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
                            {/* Email */}
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

                            {/* Login Button */}
                            <AppButton
                                title={isLoading ? "Logging in..." : "Login"}
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
                        onPress={() => console.log('Gmail login pressed')}
                    />
                    <AppButton
                        title="Facebook"
                        textStyle={styles.buttonText}
                        style={styles.socialButton}
                        iconLibrary="FontAwesome"
                        iconName="facebook"
                        iconSize={17}
                        iconColor="#1877F2"
                        onPress={() => console.log('Facebook login pressed')}
                    />
                </View>
                <TouchableOpacity 
                onPress={()=>{navigation.navigate(NAVIGATION.SIGN_UP_SCREEN);}}
                style={styles.signInContainer}>
                    <Text style={styles.footerText}>Create an account?</Text>
                    <Text
                        style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
}
export default LoginScreen;
