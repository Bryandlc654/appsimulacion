import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_USER } from "../../../../Api/api";

export const fetchDataCompany = async () => {
    try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token de acceso no encontrado.");
        }
        const url = `${API_HOST_USER}/datos-corporativos`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(url)
        if (!response.ok) {
            throw new Error("Error en la solicitud a la API.");
        }

        const data = await response.json();

        // Asegúrate de que data es un array o extrae el array de la estructura correcta
        const companyData = Array.isArray(data) ? data : data.companyData;

        if (companyData && Array.isArray(companyData)) {
            const [firstItem] = companyData;
            if (firstItem) {
                console.log("Whatsapp:", firstItem.Whatsapp);
                console.log("Email:", firstItem.email);
                console.log("APK URL:", firstItem.apkFile);
            }
        }

        return companyData;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
};
