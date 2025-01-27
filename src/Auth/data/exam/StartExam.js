import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../Api/api";

export const fetchStarExam = async (requestBody) => {
    try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token de acceso no encontrado.");
        }
        const url = `${API_HOST_USER}/exam/start`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),  // Asegúrate de enviar el cuerpo de la solicitud
        });
        if (!response.ok) {
            const errorText = await response.text();  // Leer el texto del error para obtener más detalles
            throw new Error(`Error al iniciar el examen: ${errorText}`);
        }
        const data = await response.json();
         console.log("Datos obtenidos de la API:", data);
        return data;
    } catch (error) {
        console.error("Error en fetchStarExam:", error);
        throw error;
    }
};
