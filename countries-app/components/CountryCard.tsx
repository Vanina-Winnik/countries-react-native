import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  currency: string;
}

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = React.memo(({ country }) => {
  return (
    <Link href={`/${country.code}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View>
          <Text style={styles.name}>{country.name}</Text>
          <Text style={styles.details}>Código: {country.code}</Text>
          <Text style={styles.details}>Continente: {country.continent.name}</Text>
          <Text style={styles.details}>Moneda: {country.currency || 'Desconocida'}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});
