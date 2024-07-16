import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      
      <Text style={styles.Recover}>Recuperar Contraseña</Text>
      <Text style={styles.label}>CIP</Text>
      <TextInput
        style={styles.input}
        placeholder="123456"
        placeholderTextColor="#C1C1C1"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRecover}
           onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTextRecover}>Regresar</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  Recover: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
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
  buttonRecover: {
    backgroundColor: "white",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#259461",
    borderWidth:2, 
  }
  ,
  buttonTextRecover: {
    color: "#259461",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});
export default ForgotPasswordScreen;