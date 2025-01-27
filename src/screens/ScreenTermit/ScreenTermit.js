import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation

function ScreenSubmitHome() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Home"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.noAccessText}>
        Regresa a Home tu examen ya culminó
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Volver  A Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F0E9",
    justifyContent: "center",
    padding: 20,
  },
  noAccessText: {
    textAlign: "center",
    marginBottom: 20, 
  },
  button: {
    backgroundColor: "#259461",
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ScreenSubmitHome;
