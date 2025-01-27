import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchQuestions } from "../Auth/data/Questions/Questions";
import { fetchStarExam } from "../Auth/data/exam/StartExam";
import CheckBox from "@react-native-community/checkbox";

const Categorys = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state

  const { timerEnabled, timeInMinutes, totalQuestions } = route.params;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchQuestions();
        setCategories(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error loading categories:", error);
        setLoading(false); // Ensure loading is turned off even on error
      }
    };

    loadCategories();
  }, []);

  const toggleCategory = (id) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id]
    );
  };

  const handleQuestionCountChange = (id, value) => {
    let newValue = parseInt(value, 10);

    if (isNaN(newValue) || newValue < 1) {
      newValue = null;
    } else if (newValue > 100) {
      newValue = 100;
    }

    const totalSelectedQuestions = Object.values({
      ...questionCounts,
      [id]: newValue,
    }).reduce((sum, count) => sum + (parseInt(count, 10) || 0), 0);

    if (totalSelectedQuestions <= totalQuestions) {
      setQuestionCounts((prevCounts) => ({
        ...prevCounts,
        [id]: newValue,
      }));
    } else {
      Alert.alert(
        "Límite superado",
        `La suma total de preguntas no puede superar ${totalQuestions}. Actualmente tienes ${totalSelectedQuestions}.`,
        [{ text: "OK" }]
      );
    }
  };

  const handleQuestions = async () => {
    const incompleteCategories = selectedCategories.filter(
      (id) => !questionCounts[id]
    );

    if (incompleteCategories.length > 0) {
      Alert.alert(
        "Cantidad de preguntas faltante",
        "Por favor, asigna una cantidad de preguntas para todas las categorías seleccionadas.",
        [{ text: "OK" }]
      );
      return;
    }

    if (selectedCategories.length > 0) {
      setLoading(true);
      try {
        const requestBody = {
          questionBanks: selectedCategories.map((id) => ({
            id,
            numberOfQuestions: parseInt(questionCounts[id], 10) || 0,
          })),
          timerEnabled,
          timer: timerEnabled ? timeInMinutes : null,
          totalQuestions: totalQuestions,
        };

        console.log(
          "Cuerpo del request:",
          JSON.stringify(requestBody, null, 2)
        );

        const data = await fetchStarExam(requestBody);
        console.log("Datos del examen:", data);

        navigation.navigate("StartExamen", {
          examData: data,
          timerEnabled,
          timeInMinutes,
        });
      } catch (error) {
        console.error("Error al iniciar el examen:", error);
      }
      setLoading(false);
    } else {
      Alert.alert(
        "Selección vacía",
        "Por favor, selecciona al menos una categoría."
      );
    }
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
        {loading ? ( // Show loading indicator while data is being fetched
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2C24E9" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.rankContainer}>
              {categories.map((category) => (
                <View key={category.id} style={styles.rankOption}>
                  <CheckBox
                    isChecked={selectedCategories.includes(category.id)}
                    onClick={() => toggleCategory(category.id)}
                    checkBoxColor={
                      selectedCategories.includes(category.id)
                        ? "#259461"
                        : "#1C1D32"
                    }
                    style={styles.checkbox}
                  />
                  <TouchableOpacity
                    style={styles.rankLabelContainer}
                    onPress={() => toggleCategory(category.id)}
                  >
                    <Text style={styles.rankLabel}>{category.nameBank}</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Número de preguntas"
                    onChangeText={(text) =>
                      handleQuestionCountChange(category.id, text)
                    }
                    value={
                      questionCounts[category.id]
                        ? questionCounts[category.id].toString()
                        : ""
                    }
                    editable={selectedCategories.includes(category.id)}
                    maxLength={3} // Limit the input length to 3 characters
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
        <TouchableOpacity style={styles.button} onPress={handleQuestions}>
          <Text style={styles.buttonText}>Iniciar Examen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
  },
  rankContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  rankOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
  },
  checkbox: {
    marginRight: 10,
  },
  rankLabelContainer: {
    flex: 1,
    maxWidth: "70%", // Adjust as needed to fit within the container
    marginRight: 10, // Optional margin to separate from the input
  },
  rankLabel: {
    fontSize: 16,
    color: "#000",
    flexShrink: 1, // Allow text to shrink if needed
    flexWrap: "wrap", // Allow text to wrap to multiple lines
  },
  input: {
    width: 100,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: "center",
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
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },containerLoagin: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Categorys;
