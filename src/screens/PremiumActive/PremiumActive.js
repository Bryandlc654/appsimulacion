import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

function PremiumActive() {
  const handleBecomePremium = () => {
    const phoneNumber = "962469836";
    const message = `Saludos estoy interesado en la versión premium`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
   
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir WhatsApp:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.noAccessText}>
        Solo disponible para usuarios premium.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleBecomePremium}>
        <Text style={styles.buttonText}>Volverme Premium</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
    justifyContent: "center",
    padding: 20,
  },
  noAccessText: {
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#0288d1", // Azul más oscuro
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#e3f2fd", // Gris claro
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PremiumActive;
