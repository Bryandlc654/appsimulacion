import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView, // Importa ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchQuestions } from "../Auth/data/Questions/Questions";

const CategoryAudio = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestions();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkPremiumStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("is_premium");
        setIsPremium(status === "true");
      } catch (error) {
        console.error("Error getting premium status:", error);
        setIsPremium(false);
      }
    };

    loadCategories();
    checkPremiumStatus();
  }, []);

  const handleCategoryPress = (id) => {
    const category = categories.find((cat) => cat.id === id);

    if (category && category.premium && !isPremium) {
      Alert.alert(
        "Contenido Premium",
        "Este contenido es premium. Necesitas una suscripción para acceder.",
        [{ text: "Ok" }]
      );
    } else {
      navigation.navigate("AudioScreen", { selectedCategories: [id] });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Lector de preguntas</Text>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
        >
          <View style={styles.rankContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2C24E9" />
              </View>
            ) : categories.length === 0 ? (
              <Text style={styles.noCategoriesText}>
                No hay categorías disponibles.
              </Text>
            ) : (
              categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.rankOption}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <Text style={styles.rankLabel}>{category.nameBank}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
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
  rankContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexGrow: 1, // Permite que el contenedor de categorías se expanda
  },
  rankOption: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
  rankLabel: {
    fontSize: 16,
    color: "#000",
  },
  noCategoriesText: {
    fontSize: 16,
    color: "#1C1D32",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default CategoryAudio;
