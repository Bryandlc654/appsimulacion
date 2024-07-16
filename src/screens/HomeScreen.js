import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfile = () => {
    navigation.navigate("Perfil de usuario");
  };

  const buttons = [
    {
      id: "1",
      label: "Banco de Preguntas",
      icon: require("../../assets/banco_preguntas.png"),
    },
    {
      id: "2",
      label: "Buscador de Preguntas",
      icon: require("../../assets/buscador_preguntas.png"),
    },
    {
      id: "3",
      label: "Simulador de Examen",
      icon: require("../../assets/simulador_examen.png"),
    },
    {
      id: "4",
      label: "Historial de Pruebas",
      icon: require("../../assets/historial_pruebas.png"),
    },
    { id: "5", label: "Lecturas", icon: require("../../assets/lecturas.png") },
  ];

  const handleButtonPress = (id) => {
    if (id === "2") {
      navigation.navigate("SearchQuestions");
    }
    if (id === "4") {
      navigation.navigate("History");
    }
  };
  const handlePremium = () => {
    const phoneNumber = "962469836";
    const message = `Saludos estoy interesa en la versión premium `;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url)
    
      .catch((err) => console.error("Error al abrir WhatsApp:", err));
  };
  const handleContacto = () => {
    const phoneNumber = "962469836";
    const message = `Hola, necesito ayuda `;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url)
      .catch((err) => console.error("Error al abrir WhatsApp:", err));
  };
  const handleLogout =()=>{
    navigation.navigate('Login')
  }
  const handleAbout =()=>{
    navigation.navigate('Acerca de')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.userName}>Juan Loza</Text>
        </View>
        <TouchableOpacity onPress={toggleDropdown}>
          <Image
            source={require("../../assets/user_photo.png")}
            style={styles.userPhoto}
          />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleProfile}
            >
              <Text style={styles.dropdownText}>Mi Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handlePremium}
            >
              <Text style={styles.dropdownText}>Activar Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}
            onPress={handleContacto}>
              <Text style={styles.dropdownText}>Contacto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}
            onPress={handleAbout}>
              <Text style={styles.dropdownText}>Acerca de</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
              <Text style={styles.dropdownText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={buttons}
          renderItem={({ item }) => (
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleButtonPress(item.id)}
              >
                <Image source={item.icon} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.wideButton}>
              <Text style={styles.wideButtonText}>Activar Premium</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F0E9",
  },
  header: {
    backgroundColor: "#E3F0E9",
    padding: 20,
    paddingTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    color: "#1C1D32",
    fontWeight: "bold",
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdown: {
    position: "absolute",
    top: 150,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#1C1D32",
  },
  divider: {
    height: 1,
    backgroundColor: "#E3E3E3",
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    margin: 5,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#1C1D32",
    fontWeight: "bold",
    textAlign: "center",
  },
  wideButton: {
    backgroundColor: "#259461",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
    marginVertical: 20,
  },
  wideButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
