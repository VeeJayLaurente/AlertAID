import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Text, 
  Animated, 
  ScrollView,
  RefreshControl 
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { Link } from 'expo-router';

const audioSource = require('../../assets/sounds/alert.mp3');

export default function AlertScreen() {
  const player = useAudioPlayer(audioSource);
  const [isPlaying, setIsPlaying] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [audioKey, setAudioKey] = useState(0);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const safePause = async () => {
    try {
      if (player && typeof player.pause === 'function') {
        const result = player.pause();
        if (result && typeof result.catch === 'function') {
          await result;
        }
      }
    } catch (error) {
      console.error('Error in safePause:', error);
    }
  };

  const handleToggle = async () => {
    animateButton();
    
    try {
      if (isPlaying) {
        // Stop the audio
        console.log('Stopping audio');
        await safePause();
        setIsPlaying(false);
      } else {
        // Play the audio
        console.log('Starting audio');
        await player.play();
        setIsPlaying(true);
        
        // Use timeout to detect when audio finishes (workaround)
        // Adjust this timeout to match your audio file duration
        setTimeout(() => {
          if (isPlaying) {
            console.log('Audio likely finished (timeout)');
            setIsPlaying(false);
          }
        }, 5000); // ⚠️ CHANGE THIS to your actual audio duration in milliseconds
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
      setIsPlaying(false);
    }
  };

  const resetAudioPlayer = async () => {
    try {
      console.log('Resetting audio player...');
      
      // Stop any currently playing audio
      if (isPlaying) {
        await safePause();
        setIsPlaying(false);
      }
      
      // Force recreation of audio player by changing the key
      setAudioKey(prev => prev + 1);
      console.log('Audio player reset - new key:', audioKey + 1);
      
    } catch (error) {
      console.error('Error resetting audio player:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    
    try {
      await resetAudioPlayer();
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  };

  // Cleanup on unmount - fixed to handle undefined promises
  useEffect(() => {
    return () => {
      if (isPlaying) {
        console.log('Cleaning up audio on unmount');
        // Use safePause instead of direct player.pause().catch()
        safePause().catch(error => {
          console.log('Cleanup error (non-critical):', error);
        });
      }
    };
  }, [isPlaying]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF0000"]}
          tintColor="#FF0000"
          title="Resetting audio player..."
          titleColor="#666"
        />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.settings}>
          <Link href ="/screens/settings">
          <Image
            source={require('../../assets/images/Settings.png')}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
          </Link>
        </TouchableOpacity>

        <Text style={styles.header}>
          PRESS TO TOGGLE{'\n'}ALERT SIGNAL
        </Text>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity 
            onPress={handleToggle} 
            style={styles.alertButton}
            disabled={refreshing}
          >
            <View style={[
              styles.circleOuter,
              isPlaying && styles.circleOuterActive,
              refreshing && styles.circleOuterLoading,
            ]}>
              <View style={[
                styles.circleMiddle,
                isPlaying && styles.circleMiddleActive,
                refreshing && styles.circleMiddleLoading,
              ]}>
                <View style={[
                  styles.circleInner,
                  isPlaying && styles.circleInnerActive,
                  refreshing && styles.circleInnerLoading,
                ]}>
                  {refreshing ? (
                    <Text style={styles.loadingText}>⟳</Text>
                  ) : (
                    <Image
                      source={require('../../assets/images/Logo.png')}
                      style={{ 
                        width: 30, 
                        height: 30, 
                        tintColor: isPlaying ? '#FF0000' : '#999' 
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Status indicator */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Status: {refreshing ? '🔄 Resetting...' : isPlaying ? '🔊 Playing' : '🔇 Ready'}
          </Text>
          {isPlaying && (
            <Text style={styles.hintText}>
              Press again to stop • Will auto-stop when finished
            </Text>
          )}
          {!isPlaying && !refreshing && (
            <Text style={styles.refreshHint}>
              Pull down to reset if audio stops working
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
    minHeight: '100%',
  },
  settings: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 35,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleOuterActive: {
    backgroundColor: '#FF9999',
    shadowColor: '#FF0000',
    shadowOpacity: 0.3,
  },
  circleOuterLoading: {
    backgroundColor: '#E0E0E0',
  },
  circleMiddle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FF6666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMiddleActive: {
    backgroundColor: '#FF3333',
  },
  circleMiddleLoading: {
    backgroundColor: '#BDBDBD',
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  circleInnerActive: {
    backgroundColor: '#FFE6E6',
  },
  circleInnerLoading: {
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  statusContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  refreshHint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});