import React, { useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { videoPlayerStyles as styles } from '@styles/videoPlayer.styles';
interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await videoRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await videoRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    }
  };

  const handleProgress = (status: any) => {
    if (status.isLoaded && status.durationMillis) {
      setProgress((status.positionMillis / status.durationMillis) * 100);
      setIsPlaying(status.isPlaying);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={handleProgress}
      />
      <View style={styles.controlsContainer}>
        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
        <Text style={styles.progressText}>Progress: {progress.toFixed(1)}%</Text>
      </View>
    </View>
  );
};
