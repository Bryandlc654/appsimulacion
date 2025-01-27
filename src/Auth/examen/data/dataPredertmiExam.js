// dataPredertmiExam.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../Api/api";

export const fetchStarExamC = async (requestBody) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) {
      throw new Error("Token de acceso no encontrado.");
    }
    const url = `${API_HOST_USER}/exam/start-predeterminado`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Extraer solo el mensaje de error relevante
      const errorMessage = JSON.parse(errorText)?.message || "Error desconocido";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Datos obtenidos de la API:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error en fetchStarExamC:", error);
    // Devolver solo el mensaje de error relevante
    return { success: false, message: error.message };
  }
};
