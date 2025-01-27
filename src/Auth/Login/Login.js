import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../../Api/api";
import { CommonActions } from '@react-navigation/native';
import { fetchUserData } from "../data/data_user/User";

export async function login(cip, password, navigation) {
  try {
    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cip, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la autenticación");
    }

    const { access_token } = await response.json();
    const tokenTimestamp = new Date().getTime();

    // Guardar token y timestamp en AsyncStorage
    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("token_timestamp", tokenTimestamp.toString());

    // Obtener y guardar datos del usuario
    const userData = await fetchUserData(access_token);
    await AsyncStorage.setItem("is_premium", userData.premium.toString()); // Ajusta el campo aquí

    console.log('Token:', access_token);
    console.log('User Data:', userData);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );

    return { success: true, access_token };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || "Algo salió mal. Por favor, inténtelo de nuevo más tarde.",
    };
  }
}

export const getUserPremiumStatus = async () => {
  try {
    const isPremium = await AsyncStorage.getItem("is_premium");
    console.log("Estado de Premium almacenado:", isPremium);
    return isPremium === 'true'; // Devuelve true o false
  } catch (error) {
    console.error("Error al obtener el estado de premium:", error);
    return false; // O manejar el error de otra forma si es necesario
  }
};


/* export async function login(cip, password, navigation) {
  try {
    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cip, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la autenticación");
    }

    const { access_token } = await response.json();
    const tokenTimestamp = new Date().getTime(); 


    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("token_timestamp", tokenTimestamp.toString());

    console.log('Token:', access_token);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );

    return { success: true, access_token };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || "Algo salió mal. Por favor, inténtelo de nuevo más tarde.",
    };
  }
}
 */