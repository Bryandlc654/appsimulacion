import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchQuestionsAnswer } from "../Auth/data/QuestionsAnswer/QuestionsAnswer";

const Questions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategories } = route.params; // Obtiene el id de la categoría seleccionada
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadQuestions = async () => {
      if (selectedCategories && selectedCategories.length > 0) {
        try {
          setLoading(true); // Inicia el estado de carga
          const data = await fetchQuestionsAnswer(selectedCategories[0]); // Usa el primer id de categoría
          setQuestions(data);
        } catch (error) {
          console.error("Error loading questions:", error);
        } finally {
          setLoading(false); // Finaliza el estado de carga
        }
      }
    };

    loadQuestions();
  }, [selectedCategories]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Banco de preguntas</Text>
        <Text style={styles.subtitle}>
          Preguntas de la categoría seleccionada
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2C24E9" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
            {questions.length === 0 ? (
              <Text style={styles.noQuestions}>No hay preguntas disponibles.</Text>
            ) : (
              questions.map((question) => (
                <View key={question.id} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{question.nameQuestion}</Text>
                  {question.answer.map((answer) => {
                    // Determina el color del texto y el fondo
                    let answerColor = 'black';
                    let answerBackgroundColor = 'transparent';
                    let additionalText = '';

                    if (answer.correct) {
                      // La respuesta es correcta
                      answerColor = 'green';
                      answerBackgroundColor = '#E3F0E9'; // Fondo verde claro para respuestas correctas
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
                            answer.correct ? "checkmark-circle" : "ellipse-outline"
                          }
                          size={20}
                          color={answerColor}
                          style={styles.icon}
                        />
                        <Text
                          style={[
                            styles.answerText,
                            { color: answerColor },
                          ]}
                        >
                          {answer.answerc}{additionalText}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              ))
            )}
          </ScrollView>
        )}
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
    position: 'relative', // Required for positioning child elements absolutely
  },
  scrollContent: {
    flexGrow: 1,
    gap: 10,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1D32",
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 16,
    marginLeft: 10,
    paddingRight: 25,
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Questions;
