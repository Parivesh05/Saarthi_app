import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "src/interface/Navigation/navigation.interface";
import HomeScreen from "@screens/HomeScreen";
import ProfileScreen from "@screens/ProfileScreen";
import JournalScreen from "@screens/JournalScreen";
import ChatScreen from "@screens/ChatScreen";
import DashboardScreen from "@screens/DashboardScreen";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients, Colors, Shadows } from "src/constants/designTokens";


const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === NAVIGATION.HOME_TAB) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === NAVIGATION.DASHBOARD_TAB) {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === NAVIGATION.JOURNAL_TAB) {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === NAVIGATION.CHAT_TAB) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          if (route.name === NAVIGATION.CHAT_TAB) {
            return (
              <View style={[styles.fabContainer, focused && styles.fabActive]}>
                <LinearGradient
                  colors={Gradients.fab}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.fab}
                >
                  <Ionicons name={iconName} size={24} color="#FFFFFF" />
                </LinearGradient>
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color, focused }) =>
          route.name === NAVIGATION.CHAT_TAB ? null : (
            <Text style={[styles.label, { color, fontWeight: focused ? "800" : "700" }]}>
              {route.name}
            </Text>
          ),
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarActiveTintColor: Colors.purple,
        tabBarInactiveTintColor: Colors.faint,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 86,
          paddingTop: 13,
          paddingHorizontal: 26,
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: 'blur(20px)',
          borderTopWidth: 1,
          borderTopColor: "rgba(106,90,224,0.12)",
          shadowColor: '#3C3278',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 16,
          elevation: 8,
        },
        tabBarItemStyle: styles.tabItem,
      })}
    >
      <Tab.Screen name={NAVIGATION.HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={NAVIGATION.DASHBOARD_TAB} component={DashboardScreen} />
      <Tab.Screen
        name={NAVIGATION.CHAT_TAB}
        component={ChatScreen}
        options={{
          tabBarButton: (props) => (
            <Pressable {...props} style={[props.style, styles.fabButton]} />
          ),
        }}
      />
      <Tab.Screen name={NAVIGATION.JOURNAL_TAB} component={JournalScreen} />
      <Tab.Screen name={NAVIGATION.PROFILE_TAB} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    paddingBottom: 6,
  },
  label: {
    marginTop: 4,
    fontSize: 11,
  },
  fabButton: {
    transform: [{ translateY: -20 }],
  },
  fabContainer: {
    width: 58,
    height: 58,
    borderRadius: 19,
    ...Shadows.fab,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  fabActive: {
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
});

export default BottomTabNavigator;
