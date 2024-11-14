import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";
import LoginScreen from "./screens/LoginScreen";
import AboutScreen from "./screens/AboutScreen";
import MainScreen from "./screens/MainScreen";
import ContactoScreen from "./screens/ContactoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomTabBar from "./components/CustomBar";
import CustomStatusBar from "./components/CustomStatusBar";
import RegisterScreen from "./screens/RegisterScreen";
import { AuthProvider } from "./contexts/AuthContext";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar
          style="dark"
          hidden={false}
          backgroundColor="white"
          translucent={true}
        />
        <NavigationContainer>
          <CustomStatusBar />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
              name="Home"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
              name="Contacto"
              component={ContactoScreen}
              options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false, gestureEnabled: true }}
            />
          </Stack.Navigator>
          <CustomTabBar />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
