import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const AlertScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAlert = async () => {
    try {
      if (isPlaying && sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/alert.mp3') // Make sure the path is correct
        );
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error with sound playback:', error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settings}>
        <Image source={require('../../assets/images/Settings.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <Text style={styles.header}>PRESS TO RELEASE{'\n'}AN ALERT SIGNAL</Text>

      <TouchableOpacity onPress={toggleAlert} style={styles.alertButton}>
        <View style={styles.circleOuter}>
          <View style={styles.circleMiddle}>
            <View style={styles.circleInner}>
              <Image source={require('../../assets/images/Logo.png')} style={{ width: 30, height: 30, tintColor: '#FF0000' }} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
    zIndex: 10,
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

export default AlertScreen;
