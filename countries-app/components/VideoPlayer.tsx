import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const updateState = () => setIsPlaying(player.playing);
    player.addListener('playingChange', updateState);

    return () => {
      player.removeListener('playingChange', updateState);
    };
  }, [player]);

  return (
    <View style={styles.container}>
      <VideoView 
        style={styles.video} 
        player={player} 
        allowsFullscreen 
        allowsPictureInPicture 
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '90%',
    height: 250,
  },
  controlsContainer: {
    marginTop: 10,
  },
});
