import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image
          source={require("../../assets/user_photo.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.updatePhotoText}>Actualizar foto de perfil</Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#C1C1C1"
        secureTextEntry
      />
      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#C1C1C1"
        secureTextEntry
      />
      <Text style={styles.label}>Correo Electronico</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#C1C1C1"
        secureTextEntry
      />
      <Text style={styles.label}>Cip</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#C1C1C1"
        secureTextEntry
      />
      <Text style={styles.label}>Celular</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#C1C1C1"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    height: 58,
    borderColor: "#259461",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#259461",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  updatePhotoText: {
    fontSize: 16,
    color: "#259461",
    textAlign: "center",
    marginBottom: 20,
    fontWeight:"bold"
  },
});
export default ProfileScreen;
