import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import ErrorBoundary from "src/components/ErrorBoundary";


const RootNavigator = () => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default RootNavigator;
