import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../Api/api";

export const fetchFilteredQuestions = async (query) => {
    try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token de acceso no encontrado.");
        }
        const url = `${API_HOST_USER}/questions`;
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
        
        // Filtrar preguntas basadas en la consulta
        const filteredData = data.filter(question =>
            question.nameQuestion.toLowerCase().includes(query.toLowerCase())
        );
        
        return filteredData;
    } catch (error) {
        console.error("Error en fetchFilteredQuestions:", error);
        throw error;
    }
};
