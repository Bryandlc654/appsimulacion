import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Asegúrate de importar AsyncStorage
import PremiumActive from "./PremiumActive/PremiumActive";

// Verifica si el usuario es premium
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

const ExamSimulationScreen = () => {
  const navigation = useNavigation();
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeInMinutes, setTimeInMinutes] = useState(null); // Cambiado a null para mostrar la opción por defecto
  const [totalQuestions, setTotalQuestions] = useState(null); // Cambiado a null para mostrar la opción por defecto
  const [isPremium, setIsPremium] = useState(null); // Inicialmente null para mostrar un indicador de carga
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#259461" />
      </View>
    );
  }

  if (!isPremium) {
    return (
      <PremiumActive/>
    );
  }

  const handleCategorys = () => {
    setLoading(true);
    if (totalQuestions === null) {
      Alert.alert(
        "Selección requerida",
        "Por favor, seleccione un número total de preguntas.",
        [{ text: "OK" }]
      );
      return;
    }
   
    console.log("Total Questions:", totalQuestions); // Verifica el valor de totalQuestions
    setLoading(false);
    navigation.navigate("Categorias", {
      timerEnabled,
      timeInMinutes,
      totalQuestions
    });
    
  };
  if (loading) {
    return (
      <View style={styles.containerLoagin}>
        <ActivityIndicator size="large" color="#2C24E9" />
      </View>
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
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Temporizador</Text>
            <Switch
              value={timerEnabled}
              onValueChange={setTimerEnabled}
              trackColor={{ false: "#7cdaf9", true: "green" }}
              thumbColor={timerEnabled ? "#7cdaf9" : "#f4f3f4"}
            />
          </View>
          {timerEnabled && (
            <View style={styles.row}>
              <Text style={styles.label}>Tiempo en minutos</Text>
              <Picker
                selectedValue={timeInMinutes}
                style={styles.picker}
                onValueChange={(itemValue) => setTimeInMinutes(itemValue)}
              >
                <Picker.Item label="Seleccionar" value={null} />
                {[60, 120, 180, 240].map((q) => (  
                  <Picker.Item key={q} label={`${q} minutos`} value={q} />
                ))}
              </Picker>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Total de preguntas</Text>
            <Picker
              selectedValue={totalQuestions}
              style={styles.picker}
              onValueChange={(itemValue) => setTotalQuestions(itemValue)}
            >
              <Picker.Item label="Seleccionar" value={null} />
              {[50, 100, 150, 200].map((q) => (
                <Picker.Item key={q} label={`${q} preguntas`} value={q} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCategorys}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    gap:20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 5,
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
  formContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#1C1D32",
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 150,
  },
  button: {
    backgroundColor: "#7cdaf9",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },containerLoagin: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },containerLoagin: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default ExamSimulationScreen;
