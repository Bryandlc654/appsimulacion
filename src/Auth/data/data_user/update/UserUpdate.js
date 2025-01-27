import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../../Api/api";

// Función para actualizar los datos del usuario
export const fetchUserDataUpdate = async (formData) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) {
      throw new Error("Token de acceso no encontrado.");
    }
    const url = `${API_HOST_USER}/user/me`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Envía FormData directamente
    });

    if (!response.ok) {
      throw new Error("Error al actualizar los datos del usuario.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchUserDataUpdate:", error);
    throw error;
  }
};
