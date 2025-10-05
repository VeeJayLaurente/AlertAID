// app/screens/Safety Resources.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

function normalizeKey(s) {
  if (!s) return "";
  // remove diacritics and lowercase
  return s.normalize?.("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const SafetyResources = () => {
  const { id } = useLocalSearchParams(); // dynamic route param
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resp = await fetch(
          "https://alertaid-ijwk0dj7n-veejs-projects-76c2a3f2.vercel.app/api/getSafetyResources"
        );
        const json = await resp.json();
        if (json.ok && Array.isArray(json.resources)) {
          const found = json.resources.find((r) =>
            normalizeKey(r.id) === normalizeKey(id)
          );
          setData(found || null);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Failed to fetch safety resources", err);
        setData(null);
      }
    };

    fetchResource();
  }, [id]);

  if (!data) {
    return <Text style={styles.loadingText}>Loading {id || "resource"}…</Text>;
  }

  // small subtitle map you can tweak
  const subtitles = {
    earthquake: "Learn what to do during earthquakes",
    covid: "Stay safe with hygiene and health measures",
    elnino: "Prepare for extreme heat and droughts",
    laniña: "Be ready for heavy rain and floods",
    laniña_alt: "Be ready for heavy rain and floods", 
    fire: "Safety tips to prevent and respond to fires",
    flood: "Stay alert and safe during flood events",
    flood_alt: "Stay alert and safe during flood events",
    landslide: "Precautions for slope and soil movement",
    liquefaction: "Understand soil shaking and safety measures",
  };

  // try normalized id without diacritics to get subtitle
  const subtitle =
    subtitles[normalizeKey(id)] ||
    subtitles[(id || "").toLowerCase()] ||
    "Stay alert and stay safe.";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <View style={styles.headerRow}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.headerIcon}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{data.title}</Text>
        </View>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <Text style={styles.description}>{data.description}</Text>

        <Text style={styles.sectionHeader}>📘 Brochures</Text>
        {Array.isArray(data.brochures) && data.brochures.length > 0 ? (
          data.brochures.map((link, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => Linking.openURL(link)}
              style={styles.linkCard}
            >
              <Text style={styles.linkText}>Open Brochure {i + 1}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No brochures available.</Text>
        )}

        <Text style={styles.sectionHeader}>🎥 Videos</Text>
        {Array.isArray(data.videos) && data.videos.length > 0 ? (
          data.videos.map((link, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => Linking.openURL(link)}
              style={styles.linkCard}
            >
              <Text style={styles.linkText}>Watch Video {i + 1}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No videos available.</Text>
        )}

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* bottom curve */}
      <View style={styles.bottomWave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  headerBackground: {
    backgroundColor: "#FF0000",
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerIcon: { width: 35, height: 35, tintColor: "#FFFFFF" },
  headerTitle: { fontSize: 23, fontWeight: "bold", color: "#FFF" },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.95,
    marginTop: 6,
    textAlign: "center",
    width: "80%",
  },

  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 24,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 40,
  },
  description: { fontSize: 15, color: "#555", lineHeight: 22, marginBottom: 18 },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FF0000",
    marginBottom: 10,
    marginTop: 12,
  },

  linkCard: {
    backgroundColor: "#FFE5E5",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  linkText: { color: "#FF0000", fontWeight: "bold", fontSize: 14 },

  emptyText: { color: "#777", fontStyle: "italic", fontSize: 13, marginBottom: 8 },

  backButton: {
    backgroundColor: "#FF0000",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },

  loadingText: { textAlign: "center", marginTop: 50, color: "#777", fontSize: 16 },

  bottomWave: {
    width,
    height: 120,
    backgroundColor: "#FF0000",
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    marginTop: -20,
  },
});

export default SafetyResources;
