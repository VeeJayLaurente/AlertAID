import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const audioSource = require('../../assets/sounds/alert.mp3');

export default function AlertScreen() {
  const player = useAudioPlayer(audioSource);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = async () => {
    try {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settings}>
        <Image
          source={require('../../assets/images/Settings.png')}
          resizeMode="contain"
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <Text style={styles.header}>
        PRESS TO TOGGLE{'\n'}ALERT SIGNAL
      </Text>

      <TouchableOpacity onPress={handleToggle} style={styles.alertButton}>
        <View style={styles.circleOuter}>
          <View style={styles.circleMiddle}>
            <View style={styles.circleInner}>
              <Image
                source={require('../../assets/images/Logo.png')}
                style={{ width: 30, height: 30, tintColor: '#FF0000' }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
  },
  settings: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 80,
    color: '#000',
  },
  alertButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMiddle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FF6666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
