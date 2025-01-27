import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { fetchSubmitExam } from "../Auth/data/SubmitExamen/SubmitExamen";
import { CommonActions } from '@react-navigation/native';

const ExamScreenResponse = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { examData } = route.params;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (examData.examTime >= 1) {
      const initialTime = examData.examTime * 60; // convertir minutos a segundos
      setTimeLeft(initialTime);

      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            setIsExamFinished(true); // Marcar el examen como terminado
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examData.examTime]);

  useEffect(() => {
    if (isExamFinished) {
      // Al terminar el tiempo, si el examen ya está enviado, no hacer nada
      if (Object.keys(selectedAnswers).length > 0) {
        handleSubmit(); // Enviar el examen al finalizar el tiempo si aún no se ha enviado
      }
    }
  }, [isExamFinished]);

  const handleAnswerSelect = (questionId, answerId) => {
    if (!isExamFinished) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerId,
      }));
    }
  };

  const handleSubmit = async () => {
    
    if (isExamFinished && Object.keys(selectedAnswers).length === 0) {
      console.error("No hay respuestas para enviar.");
      return;
    }
    setLoading(true);
    console.log("Enviando examen...");

    // Transformar el objeto de respuestas en el formato esperado
    
    const answers = examData.questions.map(question => ({
      questionId: question.id,
      answerId: selectedAnswers[question.id] || 0 // Si no hay respuesta seleccionada, asignar 0
    }));
    console.log("Cuerpo de la solicitud:", JSON.stringify({ answers }, null, 2));

    // Crear el cuerpo de la solicitud
    const requestBody = { answers };

    try {
      // Llamar a la función para enviar el examen
      const response = await fetchSubmitExam(requestBody);
      console.log("Examen enviado con éxito:", response);
      // Redirige a la pantalla de historial si es necesario

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'History' }],
        })
      );
      setLoading(false);
    } catch (error) {
      console.error("Error al enviar el examen:", error.message);
      // Agregar lógica adicional para mostrar mensajes de error
      alert(`Error al enviar el examen: ${error.message}`);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Salir del examen",
          "¿Estás seguro de que quieres salir del examen? Perderás todas las respuestas no guardadas.",
          [
            {
              text: "Cancelar",
              style: "cancel",
              onPress: () => {},
            },
            {
              text: "OK",
              onPress: () => navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                })
              ),
            },
          ],
          { cancelable: false }
        );
        return true;
      };
  
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation])
  );
  

  if (!examData) {
    return <Text>Loading...</Text>;
  }
  if (loading) {
    return (
      <View style={styles.containerLoagin}>
        <ActivityIndicator size="large" color="#2C24E9" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulador de Examen</Text>
        <Text style={styles.subtitle}>
          Responde las preguntas a continuación
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {examData.examTime >= 1 && timeLeft !== null ? (
          <Text style={styles.examTime}>
            Tiempo restante: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </Text>
        ) : (
          <Text style={styles.examTime}>
            Este examen no tiene límite de tiempo
          </Text>
        )}
        {examData.questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.nameQuestion}</Text>
            {question.answers.map((answer) => (
              <TouchableOpacity
                key={answer.id}
                style={[
                  styles.answerContainer,
                  selectedAnswers[question.id] === answer.id &&
                    styles.selectedAnswer,
                ]}
                onPress={() => handleAnswerSelect(question.id, answer.id)}
                disabled={isExamFinished} // Deshabilitar selección si el examen ha terminado
              >
                <Ionicons
                  name={
                    selectedAnswers[question.id] === answer.id
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={20}
                  color={
                    selectedAnswers[question.id] === answer.id
                      ? "green"
                      : "black"
                  }
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.answerText,
                    answer.correct && styles.correctAnswer,
                    selectedAnswers[question.id] === answer.id &&
                      styles.selectedAnswerText,
                  ]}
                >
                  {answer.answerc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isExamFinished && Object.keys(selectedAnswers).length === 0}
          >
            <Text style={styles.submitButtonText}>
              {isExamFinished ? "Revisar Resultados" : "Enviar Examen"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
  },containerLoagin: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  selectedAnswer: {
    backgroundColor: "#E3F0E9",
  },
  selectedAnswerText: {
    fontWeight: "bold",
    color: "#259461",
  },
  correctAnswer: {
    color: "green",
  },
  icon: {
    marginRight: 10,
  },
  footer: {
    alignItems: "center",
    padding: 20,
  },
  submitButton: {
    width: '100%',
    backgroundColor: "#259461",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExamScreenResponse;
