import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,  ActivityIndicator
} from "react-native";
import {
  useNavigation,
  useRoute,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DetailsModal from "./DetailsModal";
import DropdownMenu from "./DropdownMenu";
import QuestionsModal from "./QuestionsModal";
import { fetchSubmitExamC } from "../Auth/examen/submit/SubmitExamenPredeterminado";

function ExamenCScreenResponse() {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [questionsModalVisible, setQuestionsModalVisible] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 minutos en segundos
  const [timerRunning, setTimerRunning] = useState(true);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { examData } = route.params || {};

  const navigation = useNavigation();
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
            },
            {
              text: "OK",
              onPress: () =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
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

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            handleFinish();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const handleNext = () => {
    if (currentQuestionIndex < (examData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = async () => {
   
    const answers = examData.questions.map((question, index) => ({
      answerId: selectedOption[index] !== undefined ? selectedOption[index] : 0,
      questionId: question.id,
    }));

    const requestBody = { answers };

    try {
      setLoading(true);
      const response = await fetchSubmitExamC(requestBody);
      if (response.success) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "ExamSummary",
                params: {
                  cantidadCorrectas: response.data.cantidadCorrectas,
                  cantidadTotalPreguntas: examData?.questions.length,
                  preguntasNoMarcadas: response.data.preguntasNoMarcadas,
                  puntaje: response.data.puntaje,
                },
              },
            ],
          })
        );
        console.log("datos", response.data.puntaje);
      } else {
        console.error("Error al finalizar el examen:", response.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al finalizar el examen:", error);
    }
  };

  const handleMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption((prevState) => {
      const isSelected = prevState[currentQuestionIndex] === optionId;
      if (isSelected) {
        const { [currentQuestionIndex]: _, ...rest } = prevState;
        return rest;
      } else {
        return {
          ...prevState,
          [currentQuestionIndex]: optionId,
        };
      }
    });

    const letter = sendAnswerToServer(currentQuestionIndex, optionId); // Obtener la letra de la respuesta

    // Actualiza el estado de preguntas contestadas
    setAnsweredQuestions((prevState) => [
      ...prevState.filter(
        (q) => q.number !== examData.questions[currentQuestionIndex].number
      ),
      {
        number: examData.questions[currentQuestionIndex].number,
        alternative: letter, // Usa la letra en lugar del ID
      },
    ]);
  };

  const sendAnswerToServer = (questionIndex, optionId) => {
    const question = examData.questions[questionIndex];
    const selectedAnswer = question.answers.find(
      (answer) => answer.id === optionId
    );

    // Ahora también se pasa la letra de la respuesta
    console.log(`Pregunta ${question.number}: ${question.nameQuestion}`);
    console.log(
      `Respuesta seleccionada: ${selectedAnswer.letter}) ${selectedAnswer.answerc}`
    );

    return selectedAnswer.letter; // Devuelve la letra de la respuesta seleccionada
  };

  const handleQuestionsPress = () => {
    setQuestionsModalVisible(true);
    setMenuVisible(false);
  };

  const handleClearAnswer = () => {
    setSelectedOption((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[currentQuestionIndex];
      return updatedState;
    });

    setAnsweredQuestions((prevState) => [
      ...prevState.filter(
        (q) => q.number !== examData.questions[currentQuestionIndex].number
      ),
      {
        number: examData.questions[currentQuestionIndex].number,
        alternative: null, // Marca como no respondida
      },
    ]);

    // Puedes agregar una llamada aquí para enviar la actualización al servidor si es necesario
    sendAnswerToServer(currentQuestionIndex, null);
  };

  const currentQuestion = examData?.questions[currentQuestionIndex];
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
        <TouchableOpacity style={styles.touchHeader}
          onPress={() =>
            Alert.alert(
              "Salir del examen",
              "¿Estás seguro de que quieres salir del examen? Perderás todas las respuestas no guardadas.",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () =>
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                      })
                    ),
                },
              ],
              { cancelable: false }
            )
          }
        >
          <Ionicons name="arrow-back" size={24} color="#1C1D32" />
          <Text style={styles.title}>Simulador de Examen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Ionicons name="menu" size={24} color="#1C1D32" />
        </TouchableOpacity>
      </View>

      <View style={styles.topSection}>
        <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {currentQuestion && (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              {currentQuestion.number}. {currentQuestion.nameQuestion}
            </Text>
            <View style={styles.options}>
              {currentQuestion.answers.map((answer) => (
                <TouchableOpacity
                  key={answer.id}
                  style={[
                    styles.optionButton,
                    selectedOption[currentQuestionIndex] === answer.id &&
                      styles.selectedOptionButton,
                  ]}
                  onPress={() => handleOptionSelect(answer.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption[currentQuestionIndex] === answer.id &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {answer.letter}) {answer.answerc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              if (
                currentQuestionIndex ===
                (examData?.questions.length || 0) - 1
              ) {
                handleFinish();
              } else {
                handleNext();
              }
            }}
            disabled={
              currentQuestionIndex === (examData?.questions.length || 0) - 1
            }
          >
            <Text style={styles.navButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DropdownMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onDetailsPress={() => setDetailsModalVisible(true)}
        onQuestionsPress={handleQuestionsPress}
        onFinishPress={handleFinish}
      />

      <DetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        questions={examData?.questions || []}
        answeredQuestions={answeredQuestions} // Pasar las preguntas contestadas
        selectedOptions={selectedOption}
      />

      <QuestionsModal
        visible={questionsModalVisible}
        onClose={() => setQuestionsModalVisible(false)}
        questions={examData?.questions || []}
        selectedOptions={selectedOption}
        onQuestionIndexChange={setCurrentQuestionIndex}
      />
    </View>
  );
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const hours = Math.floor(minutes / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1D32",
    
  },
  topSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  timer: {
    fontSize: 18,
    color: "#1C1D32",
    marginBottom: 10,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1D32",
    marginBottom: 20,
  },
  options: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: "rgba(100, 200, 110, .8)", // Verde claro con transparencia
    borderColor: "rgba(76, 175, 100, 0.1)", // Verde claro con transparencia
  },
  optionText: {
    fontSize: 16,
    color: "#1C1D32",
  },
  selectedOptionText: {
    color: "#fff",
  },
  clearButton: {
    backgroundColor: "#0288d1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  clearButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  menuButton: {
    padding: 10,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    backgroundColor: "#0288d1",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,
    color: "#fff",
  },containerLoagin: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchHeader:{
    flexDirection:"row",
    gap:10,
    alignItems:"center"
  }
});

export default ExamenCScreenResponse;
