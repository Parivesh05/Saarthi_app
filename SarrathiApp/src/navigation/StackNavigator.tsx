import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import SplashScreen from "@screens/SplashScreen";
import WelcomeScreen from "@screens/WelcomeScreen";
import LoginScreen from "@screens/Auth/LoginScreen";
import SignupScreen from "@screens/Auth/SignupScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import MoodScreen from "@screens/MoodScreen";
import AboutUsScreen from "@screens/AboutUsScreen";
import PricingScreen from "@screens/PricingScreen";


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
      <Stack.Screen name={NAVIGATION.ONBOARDING_STEPS} component={OnboardingScreen} />
      <Stack.Screen name={NAVIGATION.MAIN_TABS} component={BottomTabNavigator} />
      <Stack.Screen name={NAVIGATION.MOOD_SCREEN} component={MoodScreen} />
      <Stack.Screen name={NAVIGATION.ABOUT_US_SCREEN} component={AboutUsScreen} />
      <Stack.Screen name={NAVIGATION.PRICING_SCREEN} component={PricingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
