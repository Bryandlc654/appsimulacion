import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HistoryScreen = () => {
    const navigation = useNavigation();

    const historyData = [
        { id: '1', evaluation: 'Evaluación 1', score: '100 pts', questions: '100' },
        { id: '2', evaluation: 'Evaluación 2', score: '85 pts', questions: '90' },
        { id: '3', evaluation: 'Evaluación 3', score: '75 pts', questions: '80' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#1C1D32" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Historial de Evaluaciones</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={historyData}
                    renderItem={({ item }) => (
                        <View style={styles.historyItem}>
                            <Text style={styles.evaluationText}>{item.evaluation}</Text>
                            <Text style={styles.detailsText}>Nota Obtenida: {item.score}</Text>
                            <Text style={styles.detailsText}>Preguntas: {item.questions}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
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
        paddingTop:120,
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
        fontSize: 16,
        color: '#1C1D32',
    },
});

export default HistoryScreen;
