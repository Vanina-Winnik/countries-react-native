import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, FlatList, Text, ActivityIndicator, ListRenderItem } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

import { CountryCard } from '@components/CountryCard';
import { FilterDropdown } from '@components/FilterDropdown';
import { GET_COUNTRIES } from '@graphql/queries';
import { styles } from '@styles/countryListScreen.styles';
interface Country {
  code: string;
  name: string;
  emoji: string;
  continent: { name: string };
  currency: string;
  languages: { name: string }[];
  capital: string;
}
interface QueryData {
  countries: Country[];
}

export default function CountryListScreen() {
  const { loading, error, data } = useQuery<QueryData>(GET_COUNTRIES);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'List of Countries' });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
      setDebouncedSearch('');
      setSelectedContinent('');
      setSelectedCurrency('');
    }, [])
  );

  useEffect(() => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => setDebouncedSearch(searchText), 300);
    return () => {
      if (searchRef.current) clearTimeout(searchRef.current);
    };
  }, [searchText]);

  const uniqueCurrencies = useMemo<string[]>(() => {
    return data?.countries
      ? Array.from(new Set(data.countries.map((c) => c.currency).filter(Boolean)))
      : [];
  }, [data]);

  const hasActiveFilters = useMemo(() => {
    return debouncedSearch.trim() !== '' || selectedContinent !== '' || selectedCurrency !== '';
  }, [debouncedSearch, selectedContinent, selectedCurrency]);

  const filteredCountries = useMemo(() => {
    if (!data?.countries) return [];

    return data.countries.filter(country => {
      const matchesSearch = !debouncedSearch || country.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesContinent = selectedContinent
        ? selectedContinent === 'America'
          ? ['North America', 'South America'].includes(country.continent.name)
          : country.continent.name === selectedContinent
        : true;
      const matchesCurrency = selectedCurrency ? country.currency === selectedCurrency : true;
      return matchesSearch && matchesContinent && matchesCurrency;
    });
  }, [data, debouncedSearch, selectedContinent, selectedCurrency]);

  const renderCountry: ListRenderItem<Country> = useCallback(
    ({ item }) => <CountryCard country={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search country..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchbar}
      />

      <FilterDropdown
        items={['', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']}
        onSelect={setSelectedContinent}
        selectedValue={selectedContinent}
      />
      <FilterDropdown
        items={['', ...uniqueCurrencies]}
        onSelect={setSelectedCurrency}
        selectedValue={selectedCurrency}
      />

      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}

      {!loading && !error && !hasActiveFilters && (
        <Text style={styles.messageText}>
          Use the search bar or filters to find countries.
        </Text>
      )}

      {!loading && !error && hasActiveFilters && filteredCountries.length === 0 && (
        <Text style={styles.messageText}>
          No countries found with the selected filters.
        </Text>
      )}

      {!loading && !error && hasActiveFilters && filteredCountries.length > 0 && (
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.code}
          renderItem={renderCountry}
          initialNumToRender={10}
          maxToRenderPerBatch={15}
          windowSize={5}
          removeClippedSubviews={true}
          getItemLayout={(_, index) => ({ length: 50, offset: 50 * index, index })}
        />
      )}
    </View>
  );
}
