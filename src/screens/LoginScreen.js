import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword'); // Redirigir a la pantalla de "Olvidaste tu contraseña"
    };

    const handleRegister = () => {
        navigation.navigate('Register'); // Redirigir a la pantalla de "Regístrate aquí"
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.label}>CIP</Text>
            <TextInput
                style={styles.input}
                placeholder="123456"
                placeholderTextColor="#C1C1C1"
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="*******"
                placeholderTextColor="#C1C1C1"
                secureTextEntry
            />
            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerContainer} onPress={handleRegister}>
                <Text style={styles.registerText}>¿Aún no tienes una cuenta?</Text>
                <Text style={styles.registerLink}>Regístrate aquí.</Text>
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
        alignSelf: 'flex-start',
    },
    welcome: {
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#7C7C7C',
        fontWeight: 'bold',
        fontSize: 14,
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

export default LoginScreen;
