import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import SplashScreen from "@screens/SplashScreen";
import WelcomeScreen from "@screens/WelcomeScreen";
import LoginScreen from "@screens/Auth/LoginScreen";
import SignupScreen from "@screens/Auth/SignupScreen";
import ForgotPasswordScreen from "@screens/Auth/ForgotPasswordScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import MoodScreen from "@screens/MoodScreen";
import AboutUsScreen from "@screens/AboutUsScreen";
import PricingScreen from "@screens/PricingScreen";
import PrivacyPolicyScreen from "@screens/PrivacyPolicyScreen";
import TermsOfServiceScreen from "@screens/TermsOfServiceScreen";
import AccountDeletionScreen from "@screens/AccountDeletionScreen";
import ExpertConsultationScreen from "@screens/ExpertConsultationScreen";
import JournalWritingScreen from "@screens/JournalWritingScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name={NAVIGATION.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={NAVIGATION.WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen name={NAVIGATION.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={NAVIGATION.SIGN_UP_SCREEN} component={SignupScreen} />
      <Stack.Screen name={NAVIGATION.FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
      <Stack.Screen name={NAVIGATION.ONBOARDING_STEPS} component={OnboardingScreen} />
      <Stack.Screen name={NAVIGATION.MAIN_TABS} component={BottomTabNavigator} />
      <Stack.Screen name={NAVIGATION.MOOD_SCREEN} component={MoodScreen} />
      <Stack.Screen name={NAVIGATION.ABOUT_US_SCREEN} component={AboutUsScreen} />
      <Stack.Screen name={NAVIGATION.PRICING_SCREEN} component={PricingScreen} />
      <Stack.Screen name={NAVIGATION.PRIVACY_POLICY_SCREEN} component={PrivacyPolicyScreen} />
      <Stack.Screen name={NAVIGATION.TERMS_OF_SERVICE_SCREEN} component={TermsOfServiceScreen} />
      <Stack.Screen name={NAVIGATION.ACCOUNT_DELETION_SCREEN} component={AccountDeletionScreen} />
      <Stack.Screen name={NAVIGATION.EXPERT_CONSULTATION_SCREEN} component={ExpertConsultationScreen} />
      <Stack.Screen name={NAVIGATION.JOURNAL_WRITING_SCREEN} component={JournalWritingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
