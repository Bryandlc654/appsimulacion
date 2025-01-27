import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchFilteredQuestions } from '../Auth/data/AllQuestions/AllQuestions';

const SearchQuestionsScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (query.length > 0) { // Solo buscar si hay texto en el campo
        try {
          const questions = await fetchFilteredQuestions(query);
          setResults(questions);
        } catch (error) {
          console.error("Error en la búsqueda:", error);
        }
      } else {
        setResults([]); 
      }
    };

    fetchQuestions();
  }, [query]); // Ejecutar cuando `query` cambie

  const renderItem = ({ item }) => {
    const correctAnswer = item.answer.find(answer => answer.correct);

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.nameQuestion}</Text>
        {correctAnswer && (
          <Text style={styles.answerText}>Respuesta correcta: {correctAnswer.answerc}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1C1D32" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Publicaciones SIGCP</Text>
        {/* <Text style={styles.subtitle}>Busca según corresponde</Text> */}
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={24} color="#1C1D32" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pregunta..."
            placeholderTextColor="#1C1D32"
            value={query}
            onChangeText={setQuery} 
          />
        </View>
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resultsList}
        />
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
    textAlign:"center",
    gap:10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1D32',
  },
  /* subtitle: {
    fontSize: 16,
    color: '#1C1D32',
    marginBottom: 20,
  }, */
  searchContainer: {
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1D32',
  },
  resultsList: {
    marginTop: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1D32',
  },
  answerText: {
    fontSize: 16,
    color: '#1C1D32',
    marginTop: 10,
  },
});

export default SearchQuestionsScreen;
