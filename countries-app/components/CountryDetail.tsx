import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { countryDetailStyles as styles } from '@styles/countryDetail.styles';
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
      <Text style={styles.info}>Code: {country.code}</Text>
      <Text style={styles.info}>Continent: {country.continent.name}</Text>
      <Text style={styles.info}>Currency: {country.currency || 'Not available'}</Text>
      <Text style={styles.info}>
        Languages: {country.languages?.length ? country.languages.map(lang => lang.name).join(', ') : 'Not available'}
      </Text>
      <Text style={styles.info}>Capital: {country.capital || 'Not available'}</Text>
    </View>
  );
});
