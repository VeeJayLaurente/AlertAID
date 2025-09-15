// 
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Modal, Dimensions, Image, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const { width } = Dimensions.get('window');

const NavigationScreen = () => {
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const router = useRouter(); 

  const landmarks = [
    {
      name: 'Toledo City Hall',
      latitude: 10.3772,
      longitude: 123.6406,
      phone: '+9978451234',
      address: 'Toledo City, Cebu',
    },
    {
      name: 'Toledo Hospital',
      latitude: 10.3779,
      longitude: 123.6400,
      phone: '+9978453621',
      address: 'Toledo City, Cebu',
    },
    {
      name: 'PNP Toledo City',
      latitude: 10.3785,
      longitude: 123.6392,
      phone: '+9978453333',
      address: 'Toledo City, Cebu',
    },
    {
      name: 'BFP Toledo City',
      latitude: 10.3768,
      longitude: 123.6414,
      phone: '+9978454444',
      address: 'Toledo City, Cebu',
    },
    {
      name: 'CDRRMO Toledo',
      latitude: 10.3755,
      longitude: 123.6402,
      phone: '+9978455555',
      address: 'Toledo City, Cebu',
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Location Access Denied", "Please enable location services in settings.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const focusLocation = (lat, lng) => {
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

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
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={[
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]}
      >
        {landmarks.map((landmark, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: landmark.latitude, longitude: landmark.longitude }}
            title={landmark.name}
            onPress={() => setSelectedPlace(landmark)}
            pinColor="#FF0000"
          />
        ))}
      </MapView>

      {/* Location Focus Button */}
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={() => {
          focusLocation(location.latitude, location.longitude);
        }}
      >
        <Ionicons name="locate" size={24} color="#FF0000" />
      </TouchableOpacity>

      {/* Sidebar Buttons - All your original buttons preserved */}
      <View style={styles.sideButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => focusLocation(10.3773, 123.6383)} // Toledo City Hall
        >
          <Image
            source={require('../../assets/images/City Hall.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => focusLocation(10.3812, 123.6358)} // Toledo Hospital
        >
          <Image
            source={require('../../assets/images/Cross.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => focusLocation(10.3791, 123.6392)} // Fire Station
        >
          <Image
            source={require('../../assets/images/BFP.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => focusLocation(10.3769, 123.6377)} // Police Station
        >
          <Image
            source={require('../../assets/images/Police.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => focusLocation(10.3755, 123.6402)} // CDRRMO
        >
          <Image
            source={require('../../assets/images/Security.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* ✅ Hazard Map Button - Preserved as requested */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/screens/HazardMap")}
        >
          <Image
            source={require('../../assets/images/Noah Logo.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Modal for Place Info */}
      <Modal visible={!!selectedPlace} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedPlace(null)}
            >
              <Image
                source={require('../../assets/images/Back Arrow.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
              <Ionicons name="close" size={24} color="#FF0000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>
            <Text style={styles.modalPhone}>{selectedPlace?.phone}</Text>
            <Text style={styles.modalAddress}>{selectedPlace?.address}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="call" size={20} color="#FF0000" />
                <Text style={styles.actionLabel}>Call for AID</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble" size={20} color="#FF0000" />
                <Text style={styles.actionLabel}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBack: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 2,
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtons: {
    position: 'absolute',
    top: 100,
    left: 10,
    gap: 12,
  },
  navButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 120,
    right: 15,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 50,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContent: {
    backgroundColor: '#FF0000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalPhone: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  modalAddress: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  modalClose: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 80,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  actionLabel: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});
