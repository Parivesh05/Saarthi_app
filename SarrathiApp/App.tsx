import RootNavigator from "@navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { appFonts } from "src/assets/fonts";
import { Provider } from 'react-redux';
import { store } from 'src/store';
import './src/i18n'; // Initialize i18n

export default function App() {
  const [fontsLoaded] = useFonts(appFonts);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
}
