import { StyleSheet, Dimensions } from 'react-native';

export const videoPlayerStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  video: {
    width: '90%',
    height: 250,
    backgroundColor: '#000',
  },
  controlsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
  },
});
