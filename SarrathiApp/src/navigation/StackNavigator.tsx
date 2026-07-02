import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "src/interface/Navigation/navigation.interface";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import SplashScreen from "@screens/SplashScreen";
import WelcomeScreen from "@screens/WelcomeScreen";
import LoginScreen from "@screens/Auth/LoginScreen";
import SignupScreen from "@screens/Auth/SignupScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import HomeScreen from "@screens/HomeScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={NAVIGATION.MAIN_TABS} component={BottomTabNavigator} />
      <Stack.Screen name={NAVIGATION.WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen name={NAVIGATION.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={NAVIGATION.SIGN_UP_SCREEN} component={SignupScreen} />
      <Stack.Screen name={NAVIGATION.ONBOARDING_STEPS} component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
