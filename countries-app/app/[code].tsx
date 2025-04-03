import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCountries } from '../hooks/useCountries';
import { CountryDetail } from '../components/CountryDetail';
import { VideoPlayer } from '../components/VideoPlayer';
interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  currency: string;
  languages: {
    name: string;
  }[];
  capital: string;
}

export default function CountryDetailScreen() {
  const { code } = useLocalSearchParams<{ code?: string }>();
  const { loading, error, data } = useCountries({ code: { eq: code } });

  const country: Country | null = Array.isArray(data) && data.length > 0 ? data[0] : null;

  if (loading) return <View><Text>Cargando...</Text></View>;
  if (error) return <View><Text>Error: {error.message}</Text></View>;
  if (!country) return <View><Text>País no encontrado</Text></View>;

  return (
    <View>
      <CountryDetail country={country} />
      <VideoPlayer videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </View>
  );
}
