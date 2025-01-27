/*  */
import { API_HOST } from "../../../../Api/api";

// Función para obtener datos del usuario
export const RegisterUser = async () => {
  try {
    const url = `${API_HOST}register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario usuario.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario", error);
    throw error;
  }
};