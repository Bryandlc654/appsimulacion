import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { fetchStarExamC } from "../Auth/examen/data/dataPredertmiExam";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Asegúrate de importar AsyncStorage
import PremiumActive from "./PremiumActive/PremiumActive";
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
function ExamenCScreen() {
  const navigation = useNavigation();
  const [cip, setCip] = useState("");
  const [dni, setDni] = useState("");
  const [isPremium, setIsPremium] = useState(null); 
  const handleCExamPress = async () => {
    if (!cip || !dni) {
      Alert.alert("Error", "Por favor ingrese CIP y DNI.");
      return;
    }

    try {
      const requestBody = { cip, dni };
      const { success, data, message } = await fetchStarExamC(requestBody);

      if (success) {
        navigation.navigate("ExamenCScreenResponse", { examData: data });
      } else {
        Alert.alert("Error", message || "No se pudo iniciar el examen.");
      }
    } catch (error) {
      Alert.alert("Error", `No se pudo iniciar el examen: ${error.message}`);
    }
  };
  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const premiumStatus = await getUserPremiumStatus();
        setIsPremium(premiumStatus); // `premiumStatus` ya es un booleano
      } catch (error) {
        console.error("Error al obtener el estado de premium:", error);
        setIsPremium(false); // O manejar el error de otra forma si es necesario
      } finally {
        setLoading(false); // Termina la carga sin importar el resultado
      }
    };

    checkPremiumStatus();
  }, []);
  if (!isPremium) {
    return (
      <PremiumActive/>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Simulador de Examen</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Validación de acceso</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>CIP:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su CIP"
            value={cip}
            onChangeText={setCip}
          />
          <Text style={styles.label}>DNI:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su DNI"
            value={dni}
            onChangeText={setDni}
          />
          <TouchableOpacity style={styles.button} onPress={handleCExamPress}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
  },
  header: {
    backgroundColor: "#7cdaf9",
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1D32",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#1C1D32",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#7cdaf9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExamenCScreen;
