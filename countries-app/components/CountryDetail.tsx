import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  currency?: string;
  languages?: {
    name: string;
  }[];
  capital?: string;
}

interface CountryDetailProps {
  country: Country;
}

export const CountryDetail: React.FC<CountryDetailProps> = React.memo(({ country }) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (country) {
      navigation.setOptions({ title: country.name });
    }
  }, [country, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{country.name}</Text>
      <Text style={styles.info}>Código: {country.code}</Text>
      <Text style={styles.info}>Continente: {country.continent.name}</Text>
      <Text style={styles.info}>Moneda: {country.currency || 'No disponible'}</Text>
      <Text style={styles.info}>
        Idiomas: {country.languages?.length ? country.languages.map(lang => lang.name).join(', ') : 'No disponible'}
      </Text>
      <Text style={styles.info}>Capital: {country.capital || 'No disponible'}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
});
