// app/screens/NavigationScreen.jsx
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const { width } = Dimensions.get('window');

const NavigationScreen = () => {
  const API_URL = "https://alertaid-ijwk0dj7n-veejs-projects-76c2a3f2.vercel.app/api/getAlerts";
  const POLL_INTERVAL_MS = 60000;

  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // all | lgu | evac | 
  const [userData, setUserData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const mapRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // ---- LANDMARKS ----
  const lguLandmarks = [
    { name: 'Toledo City Hall', latitude: 10.380449049284309, longitude: 123.6585558269385, phone: '+9978451234', address: 'Toledo City, Cebu' },
    { name: 'Toledo Hospital', latitude: 10.372757781110595, longitude: 123.6386561393434, phone: '+9978453621', address: 'Toledo City, Cebu' },
    { name: 'PNP Toledo City', latitude: 10.3854, longitude: 123.6421, phone: '+9978453333', address: 'Toledo City, Cebu' },
    { name: 'BFP Toledo City', latitude: 10.3850, longitude: 123.6417, phone: '+9978454444', address: 'Toledo City, Cebu' },
    { name: 'CDRRMO Toledo', latitude: 10.3749, longitude: 123.6354, phone: '+9978455555', address: 'Toledo City, Cebu' },
  ];

  const evacuationCenters = [
    { name: "Awihao Covered Court", latitude: 10.334263, longitude: 123.619015 },
    { name: "Awihao Elementary School", latitude: 10.331964, longitude: 123.620499 },
    { name: "Awihao National Highschool", latitude: 10.336442, longitude: 123.617147 },
    { name: "Bagakay Elementary School", latitude: 10.358139, longitude: 123.737887 },
    { name: "Bato Cockpit Arena", latitude: 10.337547, longitude: 123.592115 },
    { name: "Bato Covered Court", latitude: 10.341287, longitude: 123.591183 },
    { name: "Bato Elementary School", latitude: 10.340643, longitude: 123.590885 },
    { name: "Bato National Highschool", latitude: 10.339256, longitude: 123.591057 },
    { name: "Biga Elementary School", latitude: 10.348710, longitude: 123.731643 },
    { name: "Bulongan Covered Court", latitude: 10.313429, longitude: 123.653843 },
    { name: "HHCR Multi-Purpose Building", latitude: 10.302259, longitude: 123.685226 },
    { name: "Multi-Purpose Building", latitude: 10.302259, longitude: 123.685226 },
    { name: "Bunga Elementary Schol", latitude: 10.303191, longitude: 123.685472 },
    { name: "Fulgencio Dolino Elementary School", latitude: 10.352655, longitude: 123.613142 },
    { name: "Dolino Complex", latitude: 10.356852, longitude: 123.613188 },
    { name: "Cambang-ug Elementary School", latitude: 10.364412, longitude: 123.699427 },
    { name: "Upper Campo 8 Elementary School", latitude: 10.322332, longitude: 123.759307 },
    { name: "Lower Campo 8 Elementary School", latitude: 10.313404, longitude: 123.756659 },
    { name: "Canlumampao Elementary School", latitude: 10.366832, longitude: 123.675481 },
    { name: "Cantabaco Covered Court", latitude: 10.307157, longitude: 123.728665 },
    { name: "Cantabaco Elementary School", latitude: 10.307076, longitude: 123.729991 },
    { name: "Cantabaco National Highschool", latitude: 10.308141, longitude: 123.722304 },
    { name: "Capt. Claudio Elementary School", latitude: 10.400653, longitude: 123.685595 },
    { name: "Carmen Multi-Purpose Hall", latitude: 10.393108, longitude: 123.663436 },
    { name: "Carmen Elementary School", latitude: 10.392324, longitude: 123.663433 },
    { name: "Senior Citizen's Office", latitude: 10.393233, longitude: 123.652804 },
    { name: "SK Office", latitude: 10.393233, longitude: 123.652804 },
    { name: "Youth Development Training Center", latitude: 10.393233, longitude: 123.652804 },
    { name: "Daanlungsod Covered Court", latitude: 10.393233, longitude: 123.652804 },
    { name: "CCC Staff Club", latitude: 10.313544, longitude: 123.704286 },
    { name: "CCC Recreation Center", latitude: 10.311321, longitude: 123.708866 },
    { name: "DAS Covered Court", latitude: 10.308742, longitude: 123.708976 },
    { name: "DAS Elementary School", latitude: 10.306384, longitude: 123.711610 },
    { name: "DAS National Highschool", latitude: 10.306770, longitude: 123.712554 },
    { name: "Gen. P. Del Rosario Elementary School", latitude: 10.305690, longitude: 123.703861 },
    { name: "De Lasalle Andres Soriano Memorial College", latitude: 10.309834, longitude: 123.710408 },
    { name: "Dumlog Elementary School", latitude: 10.393848, longitude: 123.652858 },
    { name: "General Climaco Covered Court", latitude: 10.372617, longitude: 123.716104 },
    { name: "Ibo Elementary School", latitude: 10.365421, longitude: 123.619253 },
    { name: "Ilihan Basketball Court", latitude: 10.382496, longitude: 123.659016 },
    { name: "Jacinta Lariosa Elementary School", latitude: 10.379187, longitude: 123.657782 },
    { name: "Toledo National Vocational School", latitude: 10.383112, longitude: 123.657693 },
    { name: "Landahan Elementary School", latitude: 10.347966, longitude: 123.650112 },
    { name: "Loay Elementary School", latitude: 10.328441, longitude: 123.760468 },
    { name: "Luray II Covered Court", latitude: 10.382011, longitude: 123.643909 },
    { name: "North City Central School", latitude: 10.380809, longitude: 123.643076 },
    { name: "Magdugo Elementary School", latitude: 10.349479, longitude: 123.667179 },
    { name: "Magdugo National Highschool", latitude: 10.348814, longitude: 123.668421 },
    { name: "Maiingit Covered Court", latitude: 10.446748, longitude: 123.681056 },
    { name: "Maiingit Elementary School", latitude: 10.447342, longitude: 123.683153 },
    { name: "Matab-ang Elementary School", latitude: 10.433418, longitude: 123.671000 },
    { name: "Matab-ang National Highschool", latitude: 10.424596, longitude: 123.672073 },
    { name: "Media Once Elementary School", latitude: 10.329148, longitude: 123.674860 },
    { name: "Media Once National Highschool", latitude: 10.337596, longitude: 123.675118 },
    { name: "Consolatrix College Toledo City", latitude: 10.374075, longitude: 123.636868 },
    { name: "University Of the Visayas Toledo City", latitude: 10.376493, longitude: 123.637259 },
    { name: "Barba Sports Complex", latitude: 10.375445, longitude: 123.634824 },
    { name: "Toledo City Evacuation Center", latitude: 10.369533, longitude: 123.647820 },
    { name: "Poog Multi-Purpose Covered Court", latitude: 10.322516, longitude: 123.685034 },
    { name: "Poog  Elementary School", latitude: 10.322672, longitude: 123.688011 },
    { name: "Puting-Bato Covered Court", latitude: 10.377461, longitude: 123.687868 },
    { name: "Puting-Bato Elementary School", latitude: 10.376302, longitude: 123.686797 },
    { name: "Sagay Elementary School", latitude: 10.321152, longitude: 123.638631 },
    { name: "Sam-ang Elementary School", latitude: 10.335760, longitude: 123.660056 },
    { name: "Sangi Covered Court", latitude: 10.387060, longitude: 123.652122 },
    { name: "Sangi Elementary School", latitude: 10.386579, longitude: 123.652648 },
    { name: "Senior Citizen Building", latitude: 10.346452, longitude: 123.632691 },
    { name: "Subayon Elementary School", latitude: 10.345659, longitude: 123.632071 },
    { name: "Talavera Covered Court", latitude: 10.410015, longitude: 123.663666 },
    { name: "Talavera Elementary School", latitude: 10.41226, longitude: 123.666666 },
    { name: "Tubod Elementary School", latitude: 10.364941, longitude: 123.636563 },
    { name: "Tungkay Elementary School", latitude: 10.410321, longitude: 123.786951 },
  ];

  const allLandmarks = [...lguLandmarks, ...evacuationCenters];

  // --- Fetch Weather ---
  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.error("Weather fetch error:", error);
    }
  };

  // --- Polyline decoding function ---
  const decode = (t) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  // --- Fetch Directions ---
  const getDirections = async (destination) => {
    if (!location || !destination) return;
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${location.longitude},${location.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes?.length) {
        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(coords);
      }
    } catch (error) {
      console.error("Directions error:", error);
      Alert.alert("Error", "Unable to get directions.");
    }
  };

  // --- Find Nearest Evacuation Center ---
  const findNearestEvacuation = () => {
    if (!location) return;
    let nearest = null;
    let minDist = Infinity;
    evacuationCenters.forEach((center) => {
      const dist = Math.sqrt(
        Math.pow(center.latitude - location.latitude, 2) +
        Math.pow(center.longitude - location.longitude, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        nearest = center;
      }
    });
    if (nearest) {
      getDirections(nearest);
      Alert.alert("Nearest Evacuation Center", nearest.name);
    }
  };

  // ---- fetch user profile once (username used for greeting) ----
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) setUserData(docSnap.data());
        }
      } catch (err) {
        console.error("fetchUserData error:", err);
      }
    };
    fetchUserData();
  }, []);

  // ---- LOCATION initialisation ----
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Location Access Denied", "Please enable location services in settings.");
          setHasLocationPermission(false);
          setLocation({ latitude: 10.380449049284309, longitude: 123.6585558269385 });
          return;
        }
        setHasLocationPermission(true);
        let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, timeout: 10000 });
        setLocation(loc.coords);
        fetchWeather(loc.coords.latitude, loc.coords.longitude);
      } catch (err) {
        console.error("Location error:", err);
        Alert.alert("Location Error", "Failed to get your location. Using default location.");
        setLocation({ latitude: 10.380449049284309, longitude: 123.6585558269385 });
        fetchWeather(10.380449049284309, 123.6585558269385);
      }
    })();
  }, []);

  // ---- search handler ----
  const handleSearch = (text) => {
    setSearchText(text);
    if (!text || text.trim() === '') {
      setFilteredResults([]);
      return;
    }
    const q = text.toLowerCase();
    const filtered = allLandmarks.filter(item => item.name.toLowerCase().includes(q));
    setFilteredResults(filtered);
  };

  // ---- focus the map on lat/lng ----
  const focusLocation = (lat, lng) => {
    if (!mapRef.current || !mapReady) return;
    try {
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 500);
    } catch (err) {
      console.error("animateToRegion error:", err);
    }
  };

  // ---- UI when location not ready ----
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={{ marginTop: 10 }}>Loading Google Maps...</Text>
      </View>
    );
  }

  // visible markers depending on filters
  const visibleLGU = activeCategory === 'lgu' || activeCategory === 'all';
  const visibleEvac = activeCategory === 'evac' || activeCategory === 'all';

  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search location..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />

        {/* Refresh button */}
        <TouchableOpacity
          onPress={() => {
            // manual fetch: quick way is to clear interval and restart fetch effect.
            // Simpler: call API directly
            (async () => {
              try {
                const res = await fetch(API_URL);
                const json = await res.json();
                const items = json.alerts ?? json.alerts ?? json;
                setAlerts(items || []);
              } catch (err) {
                Alert.alert("Error", "Failed to refresh alerts");
              }
            })();
          }}
          style={{ marginLeft: 8 }}
        >
          <Ionicons name="refresh" size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>

      {/* CATEGORY TOGGLES */}
      <View style={styles.categoryContainer}>
        {[
          { label: 'All', value: 'all' },
          { label: 'LGU', value: 'lgu' },
          { label: 'Evacuation Centers', value: 'evac' },
        ].map(cat => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setActiveCategory(cat.value)}
            style={[styles.categoryButton, activeCategory === cat.value && styles.categoryButtonActive]}
          >
            <Text style={[styles.categoryText, activeCategory === cat.value && styles.categoryTextActive]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Left Panel: Weather + Hazard Button */}
      <View style={styles.leftPanel}>
        {/* Hazard Button - Now on top of weather card */}
        <TouchableOpacity
          style={styles.hazardButton}
        >
          <Link href = "/screens/HazardMap">
          <Image
            source={require('../../assets/images/Noah Logo.png')}
            style={styles.hazardIcon}
            resizeMode="contain"
          />
          </Link>
        </TouchableOpacity>

        {weather && (
          <View style={styles.weatherCard}>
            <Text style={styles.weatherTitle}>🌤 Weather</Text>
            <Text style={styles.weatherText}>{weather.temperature}°C</Text>
            <Text style={styles.weatherText}>Wind: {weather.windspeed} km/h</Text>
          </View>
        )}
      </View>

      {/* SEARCH RESULTS */}
      {filteredResults.length > 0 && (
        <FlatList
          data={filteredResults}
          keyExtractor={(item, index) => index.toString()}
          style={styles.searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                setFilteredResults([]);
                setSearchText(item.name);
                focusLocation(item.latitude, item.longitude);
                setSelectedPlace(item);
              }}
            >
              <Text style={{ color: "#333" }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* small header badges: user greeting and alerts count */}
      {userData && (
        <View style={styles.greetingBadge}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hi, {userData.username ?? 'User'} 👋</Text>
        </View>
      )}

      {!loadingAlerts && alerts.length > 0 && (
        <View style={styles.alertsBadge}>
          <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>🔔 {alerts.length} Active</Text>
        </View>
      )}

      {/* MAP */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={hasLocationPermission}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onMapReady={() => setMapReady(true)}
      >
        {/* LGU MARKERS (red) */}
        {visibleLGU && lguLandmarks.map((landmark, index) => (
          <Marker
            key={`lgu-${index}`}
            coordinate={{ latitude: landmark.latitude, longitude: landmark.longitude }}
            title={landmark.name}
            description={landmark.address}
            onPress={() => setSelectedPlace(landmark)}
            pinColor="#FF0000"
          />
        ))}

        {/* EVACUATION CENTERS (blue) */}
        {visibleEvac && evacuationCenters.map((landmark, index) => (
          <Marker
            key={`evac-${index}`}
            coordinate={{ latitude: landmark.latitude, longitude: landmark.longitude }}
            title={landmark.name}
            description="Evacuation Center"
            onPress={() => setSelectedPlace(landmark)}
            pinColor="#007AFF"
          />
        ))}

        {/* ROUTE POLYLINE */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#FF0000" />
        )}
      </MapView>

      {/* MY LOCATION button */}
      <TouchableOpacity style={styles.myLocationButton} onPress={() => focusLocation(location.latitude, location.longitude)}>
        <Ionicons name="locate" size={24} color="#FF0000" />
      </TouchableOpacity>
      
      {/* NEAREST EVAC button */}
      <TouchableOpacity style={styles.nearestEvacButton} onPress={findNearestEvacuation}>
        <Ionicons name="navigate" size={20} color="#FFF" />
        <Text style={{ color: '#FFF', marginLeft: 8 }}>Nearest Evac</Text>
      </TouchableOpacity>

      {/* MODAL for selectedPlace */}
      <Modal visible={!!selectedPlace} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedPlace(null)}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{selectedPlace?.title ?? selectedPlace?.name}</Text>
            <Text style={styles.modalAddress}>{selectedPlace?.description ?? selectedPlace?.address ?? 'No Info'}</Text>
            {selectedPlace?.phone && <Text style={styles.modalPhone}>{selectedPlace.phone}</Text>}
            {selectedPlace?.dist && <Text style={{ color: '#FFF', marginTop: 6 }}>Distance: {(selectedPlace.dist/1000).toFixed(2)} km</Text>}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ---------- styles ----------
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  myLocationButton: {
    position: 'absolute',
    bottom: 100,
    right: 15,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 50,
    elevation: 3,
  },
  nearestEvacButton: {
    position: 'absolute',
    bottom: 100,
    left: 15,
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 50,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 6,
  },
  categoryContainer: {
    position: 'absolute',
    top: 130,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 49,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 3,
  },
  categoryButtonActive: { backgroundColor: '#FF0000', borderColor: '#FF0000' },
  categoryText: { color: '#333', fontWeight: '500' },
  categoryTextActive: { color: '#FFF', fontWeight: '600' },
  searchInput: { flex: 1, color: '#333', fontSize: 16 },
  searchResults: {
    position: 'absolute',
    top: 170,
    left: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    maxHeight: 250,
    zIndex: 60,
    elevation: 6,
  },
  leftPanel: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    zIndex: 999,
    alignItems: 'flex-start',
    gap: 12,
  },
  hazardButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    elevation: 3,
  },
  hazardIcon: {
    width: 30,
    height: 30,
  },
  weatherCard: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  weatherTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  weatherText: { color: '#FFF', fontSize: 14 },
  resultItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { backgroundColor: '#FF0000', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalAddress: { color: '#FFF', fontSize: 16, textAlign: 'center' },
  modalPhone: { color: '#FFF', fontSize: 16, marginTop: 6 },
  modalClose: { position: 'absolute', top: 15, right: 15 },
  greetingBadge: { position: 'absolute', top: 15, right: 10, backgroundColor: '#FF0000', padding: 10, borderRadius: 10, zIndex: 999 },
  alertsBadge: { position: 'absolute', top: 20, left: 10, backgroundColor: '#FFF', borderRadius: 10, padding: 8, zIndex: 998 },
});

export default NavigationScreen;