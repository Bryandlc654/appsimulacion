import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleLoginLink = () => {
    navigation.navigate('Login'); // Redirigir a la pantalla de Login
  };
  const handleSelectRankLink = () => {
    navigation.navigate('SelectRank'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Regístrate</Text>
      <Text style={styles.label}>CIP</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su CIP"
        placeholderTextColor="#C1C1C1"
      />
      <Text style={styles.label}>Nombres</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre"
        placeholderTextColor="#C1C1C1"
      />
      <Text style={styles.label}>Apellidos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese sus apellidos"
        placeholderTextColor="#C1C1C1"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        placeholderTextColor="#C1C1C1"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSelectRankLink}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerContainer} onPress={handleLoginLink}>
        <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
        <Text style={styles.registerLink}>Ingresa aquí.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    height: 58,
    borderColor: '#259461',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#259461',
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontWeight: 'bold',
    color: '#7C7C7C',
    fontSize: 14,
  },
  registerLink: {
    color: '#259461',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RegisterScreen;
