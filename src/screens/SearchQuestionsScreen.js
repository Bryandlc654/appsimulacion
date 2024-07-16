import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchQuestionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1C1D32" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Busca una pregunta</Text>
        <Text style={styles.subtitle}>Busca según corresponde</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={24} color="#1C1D32" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pregunta..."
            placeholderTextColor="#1C1D32"
          />
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
    paddingTop: 60,
  },
  backIcon: {
    marginBottom: 20,
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
});

export default SearchQuestionsScreen;
