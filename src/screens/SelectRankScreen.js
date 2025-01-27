import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_HOST, API_HOST_RANGE } from "../Api/api";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";

const SelectRankScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cip, firstName, lastName, password } = route.params;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ranks, setRanks] = useState([]);
  const [selectedRank, setSelectedRank] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_HOST_RANGE}/category-range`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      const category = categories.find((cat) => cat.id === selectedCategory);
      setRanks(category ? category.ranges : []);
    }
  }, [selectedCategory, categories]);

  const handleRegister = async () => {
    if (!selectedRank) {
      Alert.alert("Error", "Por favor seleccione un rango");
      return;
    }

    try {
      const response = await fetch(`${API_HOST}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cip,
          password,
          firstName,
          lastName,
          rangeId: selectedRank,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar el usuario");
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);
      Alert.alert("Registro exitoso", "¡Tu cuenta ha sido creada!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      /* Alert.alert('Error', 'No se pudo registrar el usuario'); */
      Alert.alert("Error", error.message || "No se pudo registrar el usuario");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Selecciona tu rango</Text>
        <Text style={styles.subtitle}>Elige según corresponde</Text>
      </View>
      <View></View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una categoría" value={null} />
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={`${category.emoji} ${category.name}`}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
      <ScrollView
        contentContainerStyle={styles.rankContainer}
        showsVerticalScrollIndicator={false}
      >
        {ranks.map((rank) => (
          <View key={rank.id} style={styles.rankOption}>
            <CheckBox
              isChecked={selectedRank === rank.id}
              onClick={() => setSelectedRank(rank.id)}
              checkBoxColor={selectedRank === rank.id ? "#259461" : "#1C1D32"}
              style={styles.checkbox}
            />
            <Text style={styles.rankLabel}>
              <Text style={styles.rankLabelemoji}>{rank.emoji} </Text>
              {rank.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.contentButton}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; /* #7cdaf9 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
  },
  contentButton: {
    backgroundColor: "#fff",
    
  },
  header: {
    backgroundColor: "#7cdaf9",
    padding: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  backIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
  },
  rankContainer: {
    backgroundColor: "#fff",
    flexGrow: 1, // Asegura que el contenido del ScrollView crezca
 
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  rankOption: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
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
  },
  checkbox: {
    marginRight: 10,
  },
  rankLabel: {
    fontSize: 16,
    color: "#000",
  },
  rankLabelemoji: {
    fontSize: 23,
  },
  button: {
    backgroundColor: "#7cdaf9",
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SelectRankScreen;
