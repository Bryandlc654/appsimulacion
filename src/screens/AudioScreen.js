import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { fetchQuestionsAnswer } from "../Auth/data/QuestionsAnswer/QuestionsAnswer";
import Tts from "react-native-tts";

const AudioScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategories } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      if (selectedCategories && selectedCategories.length > 0) {
        try {
          setLoading(true);
          const data = await fetchQuestionsAnswer(selectedCategories[0]);
          setQuestions(data);
        } catch (error) {
          console.error("Error loading questions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadQuestions();
  }, [selectedCategories]);

  useEffect(() => {
    Tts.setDefaultLanguage("es-ES");

    return () => {
      Tts.stop();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        Tts.stop();
      };
    }, [])
  );

  const readCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      Tts.stop();
      Tts.speak(`Pregunta: ${currentQuestion.nameQuestion}`);
      const correctAnswer = currentQuestion.answer.find((answer) => answer.correct);
      if (correctAnswer) {
        Tts.speak(`La respuesta correcta es: ${correctAnswer.answerc}`);
      }
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      Tts.stop();
    } else {
      readCurrentQuestion();
    }
    setIsPlaying(!isPlaying);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Lector de preguntas</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2C24E9" />
          </View>
        ) : (
          <>
            <View style={styles.controlButtons}>
              <Text style={styles.questionStatus}> Reproduciendo Pregunta {questionNumber} de {totalQuestions}</Text>
              <View style={styles.contentButtons}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentQuestionIndex === 0 && styles.disabledButton,
                  ]}
                  onPress={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <Ionicons name="play-back" size={24} color="#1C1D32" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handlePlayPause}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color="#1C1D32"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentQuestionIndex === questions.length - 1 &&
                      styles.disabledButton,
                  ]}
                  onPress={goToNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  <Ionicons name="play-forward" size={24} color="#1C1D32" />
                </TouchableOpacity>
              </View>
            </View>
            {currentQuestion ? (
              <>
                <Text style={styles.questionText}>
                  {currentQuestion.nameQuestion}
                </Text>
                {currentQuestion.answer.map((answer) => (
                  <View key={answer.id} style={styles.answerContainer}>
                    <Ionicons
                      name={answer.correct ? "checkmark-circle" : "ellipse-outline"}
                      size={20}
                      color={answer.correct ? "green" : "black"}
                      style={styles.icon}
                    />
                    <Text
                      style={[
                        styles.answerText,
                        answer.correct
                          ? styles.correctAnswer
                          : styles.incorrectAnswer,
                      ]}
                    >
                      {` ${answer.answerc}`}
                      {answer.correct ? " (Correcta)" : ""}
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.noQuestions}>No hay preguntas disponibles.</Text>
            )}
          </>
        )}
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
    gap: 10,
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
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
    marginLeft: 10,
    paddingRight: 25,
  },
  correctAnswer: {
    color: "green",
  },
  incorrectAnswer: {
    color: "black",
  },
  noQuestions: {
    fontSize: 18,
    color: "#1C1D32",
    textAlign: "center",
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  controlButtons: {
    backgroundColor: "#7cdaf9",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 30,
    marginBottom: 40,
    gap: 10,
  },
  controlButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#E3F0E9",
    borderRadius: 5,
  },
  contentButtons: {
    flexDirection: "row",
  },
  navButton: {
    padding: 10,
    backgroundColor: "#E3F0E9",
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionStatus: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 10,
  },
});

export default AudioScreen;
