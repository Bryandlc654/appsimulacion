import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SelectRankScreen from "./src/screens/SelectRankScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchQuestionsScreen from "./src/screens/SearchQuestionsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import AboutScreen from "./src/screens/AboutScreen";
import LecturasScreen from './src/screens/LecturasScreen';
import ExamSimulationScreen from './src/screens/ExamSimulationScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectRank"
          component={SelectRankScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchQuestions"
          component={SearchQuestionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil de usuario"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Acerca de"
          component={AboutScreen}
          options={{ headerShown: true }}
        /><Stack.Screen
          name="Lecturas"
          component={LecturasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExamSimulator"
          component={ExamSimulationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
