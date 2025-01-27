import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchHistory } from '../Auth/data/history/history'; // Ajusta la ruta de importación
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale en español si es necesario

const HistoryScreen = () => {
    const navigation = useNavigation();
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchHistory();
                // Transforma los datos para adaptarlos a tu vista
                const formattedData = data.map((item, index) => ({
                    id: item.id.toString(),
                    evaluation: `Evaluación ${index + 1}`,
                    score: item.score,
                    questions: item.totalQuestions,
                    examDate: item.examDate, // Asegúrate de que este campo esté presente en la respuesta
                    details: item // Guarda el examen completo para pasar a la siguiente pantalla
                }));
                // Ordena los datos por fecha (más reciente primero)
                formattedData.sort((a, b) => new Date(b.examDate) - new Date(a.examDate));
                setHistoryData(formattedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#259461" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    const handleItemPress = (item) => {
        navigation.navigate('ExamDetail', { exam: item.details });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="arrow-back" size={24} color="#1C1D32" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Historial de Evaluaciones</Text>
            </View>
            <View style={styles.contentContainer}>
                {historyData.length === 0 ? (
                    <Text style={styles.noHistoryText}>Aún no has dado un examen</Text>
                ) : (
                    <FlatList
                        data={historyData}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.historyItem}>
                                <Text style={styles.evaluationText}>{item.evaluation}</Text>
                                <Text style={[
                                    styles.detailsText,
                                    item.score <= 10 ? styles.lowScoreText : null
                                ]}>
                                    Nota Obtenida: {item.score}
                                </Text>
                                <Text style={styles.detailsText}>Preguntas: {item.questions}</Text>
                                <Text style={styles.detailsText}>
                                    Fecha del Examen: {moment(item.examDate).format('DD [de] MMMM [de] YYYY')}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7cdaf9',
    },
    header: {
        backgroundColor: '#7cdaf9',
        padding: 20,
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1D32',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
    },
    historyItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    evaluationText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1D32',
        marginBottom: 5,
    },
    detailsText: {
        fontSize: 15,
        color: '#1C1D32',
    },
    lowScoreText: {
        color: 'red', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#1C1D32',
        marginTop: 10,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
    },
    noHistoryText: {
        fontSize: 18,
        color: '#1C1D32',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default HistoryScreen;
