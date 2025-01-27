import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const QuestionsModal = ({ visible, onClose, questions, selectedOptions, onQuestionIndexChange }) => {
  // Crear una lista de preguntas con formato 10x10  
  const createGridData = () => {
    const questionNumbers = questions.map((_, index) => index + 1); // Add 1 to make the numbering 1-based
    const rows = Math.ceil(questionNumbers.length / 10);
    return Array.from({ length: rows }, (_, rowIndex) =>
      questionNumbers.slice(rowIndex * 10, (rowIndex + 1) * 10)
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => onQuestionPress(item - 1)} // Adjusted index for zero-based array
      >
        <Text style={styles.questionText}>{item}</Text>
        <Ionicons
          name={selectedOptions[item - 1] ? "checkmark-circle" : "ellipse-outline"}
          size={32}
          color={selectedOptions[item - 1] ? "green" : "#ccc"}
        />
      </TouchableOpacity>
    );
  };

  const onQuestionPress = (index) => {
    onQuestionIndexChange(index); // Cambiar a la pregunta seleccionada
    onClose(); // Cierra el modal después de la selección
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Lista de Preguntas</Text>
          <FlatList
            data={createGridData()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                {item.map((index) => renderItem({ item: index }))}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  questionContainer: {
    alignItems: "center",
    justifyContent:"center"
  },
  questionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedQuestionText: {
    color: "#00c853",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#0288d1",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default QuestionsModal;
