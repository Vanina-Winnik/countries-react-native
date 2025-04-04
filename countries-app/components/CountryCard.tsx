import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { countryCardStyles as styles } from '@styles/countryCard.styles';
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
          <Text style={styles.details}>Code: {country.code}</Text>
          <Text style={styles.details}>Continent: {country.continent.name}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
});
