import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

const SelectRankScreen = () => {
  const navigation = useNavigation();
  const [selectedRank, setSelectedRank] = useState(null);

  const ranks = [
    { key: '1', label: 'Rango 1' },
    { key: '2', label: 'Rango 2' },
    { key: '3', label: 'Rango 3' },
    { key: '4', label: 'Rango 4' },
  ];

  const handleRegister = () => {
    navigation.navigate('SomeOtherScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Selecciona tu rango</Text>
        <Text style={styles.subtitle}>Elige según corresponde</Text>
      </View>
      <View style={styles.rankContainer}>
        {ranks.map((rank) => (
          <View key={rank.key} style={styles.rankOption}>
            <CheckBox
              value={selectedRank === rank.key}
              onValueChange={() => setSelectedRank(rank.key)}
              tintColors={{ true: '#259461', false: '#1C1D32' }}
              style={styles.checkbox}
            />
            <Text style={styles.rankLabel}>{rank.label}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
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
    paddingBottom: 10,
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
  },
  rankContainer: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  rankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  rankLabel: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#259461',
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectRankScreen;
