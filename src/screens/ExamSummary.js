import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ExamSummary = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cantidadCorrectas = 0, cantidadTotalPreguntas = 0, preguntasNoMarcadas = 0, puntaje = 0 } = route.params || {};

    // Calculate incorrect questions
    const cantidadIncorrectas = cantidadTotalPreguntas - cantidadCorrectas;

    // Message for passing or failing
    const isPassing = puntaje > 60;
    const message = isPassing 
        ? "¡Felicidades! Has aprobado el examen con éxito." 
        : "Lo siento, no has aprobado el examen. Sigue intentándolo y lo lograrás.";

    // Validación simple de datos
    if (cantidadTotalPreguntas === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>No se han recibido datos del examen.</Text>
        </View>
      );
    }
  
    const handleBackToHome = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#7cdaf9" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToHome}>
            <Ionicons name="arrow-back" size={24} color="#1C1D32" />
          </TouchableOpacity>
          <Text style={styles.title}>Resumen del Examen</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.summaryContainer}>
            <Text style={styles.scoreText}>Puntaje: {puntaje.toFixed(2)}</Text>
            <Text style={styles.infoText}>Total de Preguntas: {cantidadTotalPreguntas}</Text>
            <Text style={styles.infoText}>Preguntas Correctas: {cantidadCorrectas}</Text>
            <Text style={styles.infoText}>Preguntas Incorrectas: {cantidadIncorrectas}</Text>
            <Text style={styles.infoText}>Preguntas No Marcadas: {preguntasNoMarcadas}</Text>
            <Text style={[styles.message, { color: isPassing ? "#4CAF50" : "#FF5722" }]}>{message}</Text>
          </View>
        </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1D32",
    marginLeft: 10,
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
  summaryContainer: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#1C1D32",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 20,
    color: "#FF5722",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ExamSummary;
