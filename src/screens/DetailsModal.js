import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

const DetailsModal = ({ visible, onClose, questions, answeredQuestions }) => {
  const numColumns = 10; // Mantén siempre 10 columnas
  const itemSize = Dimensions.get("window").width / numColumns - 4; // Ajusta el tamaño de cada ítem

  const renderGridItems = () => {
    const rows = [];
    for (let i = 0; i < questions.length; i += numColumns) {
      const rowItems = questions.slice(i, i + numColumns);
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems.map((item) => {
            const answeredQuestion = answeredQuestions.find(
              (q) => q.number === item.number
            );
            const answerStatus = answeredQuestion
              ? answeredQuestion.alternative
                ? answeredQuestion.alternative.toUpperCase()
                : "NO"
              : "NO";

            return (
              <View key={item.id} style={[styles.itemContainer, { width: itemSize, height: itemSize }]}>
                <Text style={styles.itemText}>{item.number}</Text>
                <Text style={styles.answerStatus}>{answerStatus}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    return rows;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalles del Examen</Text>
          <ScrollView>
            {renderGridItems()}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "95%",
    maxHeight: "89%", // Limita la altura del modal para evitar desbordamiento
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    gap:10
  },
  closeButton: {
    marginTop: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#0288d1",
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 18,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingVertical:10
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    margin:1,
    padding: 5
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1D32",
  },
  answerStatus: {
    fontSize: 14,
    fontWeight:"600",
    color: "#888",
  },
});

export default DetailsModal;
