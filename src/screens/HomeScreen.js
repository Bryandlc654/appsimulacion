import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Logout } from "../Auth/outh/Outh";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../Auth/data/data_user/User";
import fotoUser from "../../assets/fotoUser.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { fetchDataCompany } from "../Auth/data/data/js/dataCompany";
const NotificationBadge = ({ count }) => {
  if (count <= 0) return null;
  return (
    <View style={styles.notificationBadge}>
      <Text style={styles.notificationBadgeText}>{count}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(""); // Nuevo estado para el número de WhatsApp
  const [apkFile, setApkFile] = useState(""); // Estado para el enlace del APK
  const [previousApkFile, setPreviousApkFile] = useState(""); // Estado para el enlace anterior del APK
  const [notificationCount, setNotificationCount] = useState(0);
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
      label: "Publicaciones SIGCP",
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
    {
      id: "5",
      label: "Version Audio",
      icon: require("../../assets/lecturas.png"),
    },
    { id: "6", label: "Lecturas", icon: require("../../assets/lecturas.png") },
  ];

  const handleButtonPress = (id) => {
    switch (id) {
      case "1":
        navigation.navigate("banco de preguntas");
        break;
      case "2":
        navigation.navigate("SearchQuestions");
        break;
      case "3":
        navigation.navigate("Select Examen");
        break;
      case "4":
        navigation.navigate("History");
        break;
      case "5":
        navigation.navigate("CategoryAudio");
        break;
      case "6":
        navigation.navigate("Lecturas");
        break;
    }
  };

  const handlePremium = () => {
    const message = `Saludos estoy interesado en la versión premium`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir WhatsApp:", err)
    );
  };

  const handleContacto = () => {
    const message = `Hola, necesito ayuda`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir WhatsApp:", err)
    );
  };

  const handleLogout = async () => {
    await Logout(navigation);
  };

  const handleAbout = () => {
    navigation.navigate("Acerca de");
  };

  const getUserPremiumStatus = async () => {
    try {
      const isPremium = await AsyncStorage.getItem("is_premium");
      return isPremium === "true";
    } catch (error) {
      console.error("Error al obtener el estado de premium:", error);
      return false;
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        const premiumStatus = await getUserPremiumStatus();
        setIsPremium(premiumStatus);
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);
  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const companyData = await fetchDataCompany();
        if (companyData && Array.isArray(companyData)) {
          const [firstItem] = companyData;
          if (firstItem) {
            setWhatsappNumber(firstItem.Whatsapp);
            if (firstItem.apkFile !== previousApkFile) {
              setApkFile(firstItem.apkFile);
              setPreviousApkFile(firstItem.apkFile);
              setNotificationCount(notificationCount + 1); // Incrementa el contador
            }
          }
        }
      } catch (err) {
        console.error("Error al obtener los datos de la empresa:", err.message);
        setError(err.message);
      }
    };

    getCompanyData();
  }, [previousApkFile, notificationCount]);

  const handleUpdate = () => {
    Alert.alert(
      "Actualizar Aplicación",
      "¿Deseas descargar la última actualización?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Descargar",
          onPress: () => {
            Linking.openURL(apkFile).catch((err) =>
              console.error("Error al abrir el enlace de descarga:", err)
            );
            setNotificationCount(0); // Resetea el contador de notificaciones
            setPreviousApkFile(apkFile); // Actualiza el archivo APK previo para evitar futuras notificaciones
          },
        },
      ]
    );
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
      <StatusBar
        barStyle="light-content" /* light-content */
        backgroundColor="#7cdaf9"
      />
      <View style={styles.header}>
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <Text style={styles.userName}>
              {userData.firstName}, {userData.lastName}
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={toggleDropdown}>
          <Image
            source={
              userData?.profileImage ? { uri: userData.profileImage } : fotoUser
            }
            style={styles.userPhoto}
            defaultSource={fotoUser}
          />
          {isPremium && (
            <View style={styles.premiumIcon}>
              <FontAwesome5 name="crown" size={10} color="#FFD700" />
            </View>
          )}
          <NotificationBadge count={notificationCount} />
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleProfile}
            >
              <Text style={styles.dropdownText}>Mi Perfil</Text>
            </TouchableOpacity>
            {!isPremium && (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handlePremium}
              >
                <Text style={styles.dropdownText}>Activar Premium</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleContacto}
            >
              <Text style={styles.dropdownText}>Contacto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleAbout}>
              <Text style={styles.dropdownText}>Acerca de</Text>
            </TouchableOpacity>
            {apkFile && (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleUpdate}
              >
                <Text style={styles.dropdownText}>Actualizar</Text>
              </TouchableOpacity>
            )}
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
            >
              <Text style={styles.dropdownText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={buttons}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(item.id)}
            >
              <Image source={item.icon} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListFooterComponent={() =>
            !isPremium && (
              <TouchableOpacity
                style={styles.wideButton}
                onPress={handlePremium}
              >
                <Text style={styles.wideButtonText}>Activar Premium</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
  },
  containerLoagin: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#7cdaf9",
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 22,
    color: "#1C1D32",
    fontWeight: "bold",
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  dropdown: {
    position: "absolute",
    top: 108,
    right: 45,
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
    paddingVertical: 10,
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
  button: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "#000",
  },
  wideButton: {
    marginVertical: 10,
    backgroundColor: "#7cdaf9",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  wideButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  premiumIcon: {
    position: "absolute",
    bottom: 35,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 100,
    padding: 5,
  },
  notificationBadge: {
    position: "absolute",
    top:"60%",
    right:35,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomeScreen;
