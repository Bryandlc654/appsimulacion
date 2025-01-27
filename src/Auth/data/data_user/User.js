
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../Api/api";

// Función para obtener datos del usuario
export const fetchUserData = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) {
      throw new Error("Token de acceso no encontrado.");
    }
    const url = `${API_HOST_USER}/user/me`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del usuario.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchUserData:", error);
    throw error;
  }
};