import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function ExamScreenSelect() {
  const navigation = useNavigation();

  const handleCustomExamPress = () => {
    navigation.navigate("ExamSimulator");
  };
  const handleXExamPress = () => {
    navigation.navigate("ExamCSimulator");
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Simulador de Examen</Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCustomExamPress}>
          <Text style={styles.buttonText}>SIMULADOR DE EXAMEN PERSONALIZADO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleXExamPress}>
          <Text style={styles.buttonText}>SIMULADOR DE EXAMEN 100 PREGUNTAS</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#fff",
    borderColor: "#1C1D32",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#1C1D32",
    fontWeight: "bold",
    textAlign:"center"
  },
});

export default ExamScreenSelect;
