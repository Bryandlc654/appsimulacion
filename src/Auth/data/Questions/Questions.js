import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../Api/api";

export const fetchQuestions = async () => {
    try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token de acceso no encontrado.");
        }
        const url = `${API_HOST_USER}/questions-bank`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error al obtener las preguntas.");
        }
        const data = await response.json();
        console.log("Datos obtenidos de la API:", data); 
        return data;
    } catch (error) {
        console.error("Error en fetchQuestions:", error);
        throw error;
    }
};
