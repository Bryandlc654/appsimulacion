import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  useNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";
import { ActivityIndicator, View, StyleSheet, Alert, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import LecturasScreen from "./src/screens/LecturasScreen";
import ExamSimulationScreen from "./src/screens/ExamSimulationScreen";
import BackQuestions from "./src/screens/backQuestions";
import Categorys from "./src/screens/Categorys";
import Loading from "./src/screens/Loading/Loading";
import Questions from "./src/screens/Questions";
import ExamScreenResponse from "./src/screens/ExamScreenResponse";
import ExamDetailScreen from "./src/screens/ExamDetailScreen";
import AudioScreen from "./src/screens/AudioScreen";
import CategoryAudio from "./src/screens/CategoryAudio";
import ExamScreenSelect from "./src/screens/ExamScreenSelect";
import ExamenCScreen from "./src/screens/ExamenCScreen";
import ExamenCScreenResponse from "./src/screens/ExamenCScreenResponse";
import ExamSummary from "./src/screens/ExamSummary";
import InitialLoading from "./src/screens/Loading/InitialLoading/InitialLoading";

const Stack = createStackNavigator();
const ACCESS_TOKEN = "access_token";
const TOKEN_TIMESTAMP_KEY = "token_timestamp";
const TOKEN_EXPIRATION_TIME = 86400000 ;/* */

const AppNavigator = ({ isTokenValid }) => {
  return (
    <Stack.Navigator initialRouteName={isTokenValid ? "Home" : "Login"}>
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
      name="ExamSummary"
      component={ExamSummary}
      options={{headerShown:false}}
      />
      <Stack.Screen
        name="Lecturas"
        component={LecturasScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExamSimulator"
        component={ExamSimulationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de"
        component={AboutScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="banco de preguntas"
        component={BackQuestions}
        options={{ headerShown: false }}
      />
        
      <Stack.Screen
        name="Categorias"
        component={Categorys}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="StartExamen"
        component={ExamScreenResponse}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="ExamDetail"
        component={ExamDetailScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="AudioScreen"
        component={AudioScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="CategoryAudio"
        component={CategoryAudio}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="Select Examen"
        component={ExamScreenSelect}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="ExamCSimulator"
        component={ExamenCScreen}
        options={{headerShown:false}}/>
        <Stack.Screen
        name="ExamenCScreenResponse"
        component={ExamenCScreenResponse}
        options={{headerShown:false}}
        />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const navigationRef = useNavigationContainerRef();
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Estado para la pantalla de carga inicial

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        const tokenTimestamp = await AsyncStorage.getItem(TOKEN_TIMESTAMP_KEY);

        if (token && tokenTimestamp) {
          const currentTime = new Date().getTime();
          if (currentTime - parseInt(tokenTimestamp) > TOKEN_EXPIRATION_TIME) {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            await AsyncStorage.removeItem(TOKEN_TIMESTAMP_KEY);
            Alert.alert(
              "Sesión Expirada",
              "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
              [
                {
                  text: "OK",
                  onPress: () => reloadAPIs(),
                },
              ]
            );
            setIsTokenValid(false);
          } else {
            setIsTokenValid(true);
          }
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Error al recuperar el token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkInternetConnection = () => {
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          setIsConnected(false);
          Alert.alert(
            "Sin Conexión a Internet",
            "No hay conexión a Internet. Por favor, revisa tu conexión.",
            [{ text: "OK" }]
          );
        } else {
          setIsConnected(true);
        }
      });
    };

    const handleConnectivityChange = (state) => {
      if (!state.isConnected) {
        setIsConnected(false);
        Alert.alert(
          "Sin Conexión a Internet",
          "No hay conexión a Internet. Por favor, revisa tu conexión.",
          [{ text: "OK" }]
        );
      } else {
        setIsConnected(true);
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    checkInternetConnection();
    checkToken();

    const intervalId = setInterval(() => {
      checkToken();
      checkInternetConnection();
    }, 20000); // Check every 20 seconds

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [navigationRef]);

  const reloadAPIs = async () => {
    try {
      // Clear all AsyncStorage data
      await AsyncStorage.clear();

      // Reset navigation to login screen
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );

      // Optionally, reset any other state if needed
      setIsTokenValid(false);
      setIsLoading(true);
    } catch (error) {
      console.error("Error al limpiar AsyncStorage:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Mostrar la pantalla de carga inicial durante 3 segundos
    const initialLoadTimeout = setTimeout(() => {
      setIsInitialLoading(false);
    }, 9000)
  });

  if (isInitialLoading) {
    // Mostrar la pantalla de carga inicial durante 3 segundos
    return (
      <InitialLoading></InitialLoading>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={styles.noConnectionContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>No hay conexión a Internet. Por favor, revisa tu conexión.</Text>
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator isTokenValid={isTokenValid} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noConnectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
