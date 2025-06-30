import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const NavigationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Static locations for landmarks (sample coordinates)
  const landmarks = [
    {
      name: 'Toledo City Hall',
      latitude: 10.3772,
      longitude: 123.6406,
    },
    {
      name: 'Toledo Hospital',
      latitude: 10.3779,
      longitude: 123.6400,
    },
    {
      name: 'PNP Toledo City',
      latitude: 10.3785,
      longitude: 123.6392,
    },
    {
      name: 'BFP Toledo City',
      latitude: 10.3768,
      longitude: 123.6414,
    },
    {
      name: 'CDRRMO Toledo',
      latitude: 10.3755,
      longitude: 123.6402,
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        Alert.alert("Location Access Denied", "Please enable location services in settings.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={{ marginTop: 10 }}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {landmarks.map((landmark, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: landmark.latitude, longitude: landmark.longitude }}
            title={landmark.name}
            pinColor="#FF0000"
          />
        ))}
      </MapView>
    </View>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
