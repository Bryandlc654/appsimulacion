import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const ExamDetailScreen = () => {
  const route = useRoute();
  const { exam } = route.params;

  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Examen</Text>
        <Text style={styles.subtitle}>Responde las preguntas a continuación</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.examTime}>
          Fecha del Examen: {new Date(exam.examDate).toLocaleDateString()}
        </Text>
        <Text style={styles.examTime}>Nota Obtenida: {exam.score}</Text>
        <Text style={styles.examTime}>Preguntas Totales: {exam.totalQuestions}</Text>
        {exam.questions.map((question) => (
          <View key={question.questionId} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionName}</Text>
            {question.allAnswers.map((answer) => {
              // Determina el color del texto y el fondo
              let answerColor = 'black';
              let answerBackgroundColor = 'transparent';
              let additionalText = '';
              
              if (answer.id === question.selectedAnswerId) {
                // La respuesta es seleccionada por el usuario
                answerBackgroundColor = answer.isCorrect ? '#E3F0E9' : 'rgba(255,0,0,0.1)';
                answerColor = answer.isCorrect ? 'green' : 'red';
                additionalText = answer.isCorrect ? ' (Correcta)' : ' (Incorrecta)';
              } else if (answer.isCorrect) {
                // La respuesta es correcta pero no seleccionada
                answerColor = 'green';
                additionalText = ' (Correcta)';
              }

              return (
                <View
                  key={answer.id}
                  style={[
                    styles.answerContainer,
                    { backgroundColor: answerBackgroundColor },
                  ]}
                >
                  <Ionicons
                    name={
                      answer.id === question.selectedAnswerId
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={20}
                    color={answer.id === question.selectedAnswerId ? answerColor : "black"}
                    style={styles.icon}
                  />
                  <Text
                    style={[
                      styles.answerText,
                      { color: answerColor },
                    ]}
                  >
                    {answer.text}{additionalText}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
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
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#1C1D32",
    marginBottom: 20,
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
  examTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 16,
    marginLeft: 10,
    paddingRight: 50,
  },
  icon: {
    marginRight: 10,
  },
});

export default ExamDetailScreen;
