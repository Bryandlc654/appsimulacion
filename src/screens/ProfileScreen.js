import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { fetchUserDataUpdate } from "../Auth/data/data_user/update/UserUpdate";
import { fetchUserData } from "../Auth/data/data_user/User";
import LoadingUp from "./Loading/LoadingUp/LoadingUp";
import fotoUser from "../../assets/fotoUser.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";


const getUserPremiumStatus = async () => {
  try {
    const isPremium = await AsyncStorage.getItem("is_premium");
    console.log("Estado de Premium almacenado:", isPremium);
    return isPremium === "true"; // Devuelve true o false
  } catch (error) {
    console.error("Error al obtener el estado de premium:", error);
    return false; // O manejar el error de otra forma si es necesario
  }
};
const ProfileScreen = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    cip: "",
    celular: "",
    profileImage: "",
    premium:"", // URI de la imagen
    rol:""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dni: data.dni,
          cip: data.cip,
          celular: data.celular,
          sexo: data.sexo || "",
          premium: data.premium,
          profileImage: data.profileImage || "",
          rol: {
            id: data.rol.id,
          },
        });
        console.log("premium",data.premium)
        setRoleName(data.rol?.name || "No disponible");
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (name, value) => {
    if (name === "dni" || name === "celular") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const form = new FormData();

      // Añadir datos del usuario al FormData
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("dni", formData.dni);
      form.append("cip", formData.cip);
      form.append("celular", formData.celular);
      form.append("premium", formData.premium ? true : false);
      form.append("sexo", formData.sexo);
      form.append("rol", userData.rol?.id)
      // Añadir la imagen al FormData
      if (formData.profileImage) {
        const uri = formData.profileImage;
        const fileName = uri.split("/").pop();
        const fileType = uri.substring(uri.lastIndexOf(".") + 1);
        form.append("profileImage", {
          uri: uri,
          type: `image/${fileType}`,
          name: fileName,
        });
      }

      console.log("Datos que se enviarán:", form);
      const updatedData = await fetchUserDataUpdate(form);
      Alert.alert("Éxito", "Datos actualizados correctamente.");
      setUserData(updatedData);
    } catch (error) {
      Alert.alert("Error", "No se pudieron actualizar los datos.");
      console.error("Error al actualizar los datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const asset = response.assets[0];
        const uri = asset.uri;

        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImage: uri,
        }));
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#2C24E9" />
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.profileImageContainer}
        >
          <Image
            source={
              formData.profileImage ? { uri: formData.profileImage } : fotoUser
            }
            style={styles.profileImage}
          />
          {isPremium && (
            <View style={styles.premiumIcon}>
              <FontAwesome5 name="crown" size={20} color="#FFD700" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.updatePhotoText}>Actualizar foto de perfil</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
            placeholder="Ej: Juan"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellidos</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
            placeholder="Ej: Loza"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            placeholder="Ej: juan.loza@gmail.com"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>DNI</Text>
          <TextInput
            style={styles.input}
            value={formData.dni}
            onChangeText={(text) => handleInputChange("dni", text)}
            placeholder="Ej: 12345678"
            keyboardType="numeric"
            maxLength={8}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>CIP</Text>
          <TextInput
            style={styles.input}
            value={formData.cip}
            onChangeText={(text) => handleInputChange("cip", text)}
            placeholder="Ej: 12345678910"
            maxLength={11}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Celular</Text>
          <TextInput
            style={styles.input}
            value={formData.celular}
            onChangeText={(text) => handleInputChange("celular", text)}
            placeholder="Ej: 986659852"
            keyboardType="numeric"
            maxLength={9}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Sexo</Text>
          <Picker
            selectedValue={formData.sexo} // Muestra el valor actual de formData.sexo
            onValueChange={(itemValue) => handleInputChange("sexo", itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Premium</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={formData.premium ? "Sí" : "No"}
            editable={false}
          />
        </View>
        <Text style={styles.label}>Rol</Text>
        <TextInput style={styles.input} value={roleName} editable={false} />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#7cdaf9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#7cdaf9",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 5, // Shadow for elevation
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  updatePhotoText: {
    fontSize: 16,
    color: "#7cdaf9",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Asegura que el overlay esté sobre otros componentes
  },
  premiumIcon: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 100,
    padding: 5,
  },
});

export default ProfileScreen;
