import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '@graphql/queries';
import { CountryDetail } from '@components/CountryDetail';
import { VideoPlayer } from '@components/VideoPlayer';
import { useHLSVideo } from '@hooks/useHLSVideo';
import { countryDetailStyles as styles } from '@styles/countryDetailScreen.styles';

export default function CountryDetailScreen() {
  const { code } = useLocalSearchParams<{ code?: string }>();

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { filter: { code: { eq: code } } },
    skip: !code,
  });

  const { videoUrl } = useHLSVideo();
  const country = data?.countries?.[0];

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Loading country data...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Error loading country: {error.message}</Text>
      </SafeAreaView>
    );
  }

  if (!country) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Country not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CountryDetail country={country} />
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
    </SafeAreaView>
  );
}
