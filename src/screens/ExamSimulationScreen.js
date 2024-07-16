import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ExamSimulationScreen = () => {
    const navigation = useNavigation();
    const [timerEnabled, setTimerEnabled] = useState(false);
    const [timeInMinutes, setTimeInMinutes] = useState(30);
    const [totalQuestions, setTotalQuestions] = useState(50);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1C1D32" />
                </TouchableOpacity>
                <Text style={styles.title}>Simulador de Examen</Text>
                <Text style={styles.subtitle}>Elige según corresponde</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Temporizador</Text>
                        <Switch
                            value={timerEnabled}
                            onValueChange={setTimerEnabled}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={timerEnabled ? '#259461' : '#f4f3f4'}
                        />
                    </View>
                    {timerEnabled && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Tiempo en minutos</Text>
                            <Picker
                                selectedValue={timeInMinutes}
                                style={styles.picker}
                                onValueChange={(itemValue) => setTimeInMinutes(itemValue)}
                            >
                                {[60, 120, 180, 240].map((q) => (
                                <Picker.Item key={q} label={`${q}`} value={q} />
                            ))}
                            </Picker>
                        </View>
                    )}
                    <View style={styles.row}>
                        <Text style={styles.label}>Total de preguntas</Text>
                        <Picker
                            selectedValue={totalQuestions}
                            style={styles.picker}
                            onValueChange={(itemValue) => setTotalQuestions(itemValue)}
                        >
                            {[50, 100, 150, 200].map((q) => (
                                <Picker.Item key={q} label={`${q}`} value={q} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Siguiente</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F0E9',
    },
    header: {
        backgroundColor: '#E3F0E9',
        padding: 20,
        paddingTop: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1D32',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#1C1D32',
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1C1D32',
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: 150,
    },
    button: {
        backgroundColor: '#259461',
        borderRadius: 40,
        paddingVertical: 22,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ExamSimulationScreen;
