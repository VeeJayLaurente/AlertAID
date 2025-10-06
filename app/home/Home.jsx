import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { useApp } from "../../UI/AppContext";

const HomeScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { t } = useTranslation();
  const { isDarkMode } = useApp();

  // ✅ Fetch latest alerts
  const fetchAlerts = async () => {
    try {
      const resp = await fetch(
        "https://alertaid-691eebu0m-veejs-projects-76c2a3f2.vercel.app/api/getAlerts"
      );
      const text = await resp.text();
      const json = JSON.parse(text);
      if (json.ok && Array.isArray(json.alerts)) {
        setAlerts(json.alerts);
      } else {
        setAlerts([]);
      }
      return true; // Success
    } catch (err) {
      console.error("Failed to fetch alerts from API", err);
      setAlerts([]);
      return false; // Failure
    }
  };

  // ✅ Initial fetch on component mount
  useEffect(() => {
    fetchAlerts();
  }, []);

  // ✅ Pull to refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    
    try {
      // Test internet connectivity first
      const connectivityTest = await fetch('https://www.google.com', { 
        method: 'HEAD',
        timeout: 5000 
      }).catch(() => null);
      
      if (connectivityTest && connectivityTest.ok) {
        setIsOnline(true);
        // User has internet - fetch fresh alerts
        const success = await fetchAlerts();
        if (!success) {
          setIsOnline(false);
        }
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      console.error("Connectivity test failed:", error);
      setIsOnline(false);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Define Safety Articles with topic IDs
  const safetyTopics = [
    { id: "earthquake", label: "Earthquake", emoji: "🌋", color: "#5b3b28" },
    { id: "fire", label: "Fire Safety", emoji: "🔥", color: "#E74C3C" },
    { id: "flood", label: "Flooding", emoji: "🚣‍♀️", color: "#2980B9" },
    { id: "elniño", label: "El Niño", emoji: "🏜️", color: "#E67E22" },
    { id: "covid", label: "COVID-19", emoji: "🦠", color: "#16A085" },
    { id: "laniña", label: "La Niña", emoji: "🌧️", color: "#3498DB" },
    { id: "landslide", label: "Landslide", emoji: "🏔️", color: "#6C3483" },
    { id: "liquefaction", label: "Liquefaction", emoji: "💧", color: "#1ABC9C" },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Link href="/screens/settings">
            <Image
              source={require("../../assets/images/Settings.png")}
              style={styles.settingsIcon}
              resizeMode="contain"
            />
          </Link>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF0000"]} // Red color for the refresh indicator
            tintColor="#FF0000" // iOS specific
            title="Checking for updates..." // iOS specific
            titleColor="#666" // iOS specific
          />
        }
      >
        {/* Internet Status Indicator */}
        {!isOnline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>
              📶 You're offline. Pull down to refresh when connected.
            </Text>
          </View>
        )}

        {/* 🚨 Alerts Section */}
        <View style={styles.alertsContainer}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              🚨 Latest Alerts & Updates
            </Text>
            {refreshing && (
              <ActivityIndicator size="small" color="#FF0000" />
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {alerts.length > 0 ? (
              alerts.map((item, index) => (
                <View
                  key={index}
                  style={[styles.alertCard, { backgroundColor: "#FFDFDF" }]}
                >
                  <Text style={styles.alertTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.alertDesc} numberOfLines={3}>
                    {item.description}
                  </Text>
                  {item.url && (
                    <TouchableOpacity
                      style={styles.alertBtn}
                      onPress={() => Linking.openURL(item.url)}
                    >
                      <Text style={styles.alertBtnText}>View Details</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.noAlertsContainer}>
                <Text style={[styles.noAlertsText, { color: isDarkMode ? "#FFF" : "#000" }]}>
                  {isOnline ? "No alerts available" : "Connect to internet for alerts"}
                </Text>
                {!isOnline && (
                  <Text style={styles.offlineHint}>
                    Pull down to refresh when online
                  </Text>
                )}
              </View>
            )}
          </ScrollView>
        </View>

        {/* 🛡️ Safety Articles Section */}
        <Text
          style={[styles.sectionTitle, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          🛡️ Safety Articles
        </Text>

        <View style={styles.articlesContainer}>
          {safetyTopics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.articleCard, { backgroundColor: topic.color }]}
            >
              <Link href={`/screens/${topic.id}`}>
                <View style={styles.articleRow}>
                  <View style={styles.articleLeft}>
                    <Text style={styles.articleIcon}>{topic.emoji}</Text>
                    <Text style={styles.articleTitle}>{topic.label}</Text>
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  logo: {
    width: 50,
    height: 50,
    tintColor: "#FF0000",
  },
  settingsIcon: {
    width: 30,
    height: 30,
    tintColor: "#FF0000",
  },
  // Refresh and connectivity styles
  offlineBanner: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
  },
  offlineText: {
    color: "#856404",
    fontSize: 14,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  alertsContainer: {
    marginBottom: 30,
  },
  carousel: {
    gap: 14,
    paddingVertical: 10,
  },
  alertCard: {
    width: 250,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 6,
  },
  alertDesc: {
    fontSize: 13,
    color: "#333",
    marginBottom: 12,
  },
  alertBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#FF0000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  alertBtnText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  noAlertsContainer: {
    padding: 20,
    alignItems: "center",
  },
  noAlertsText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  offlineHint: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  articlesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  articleCard: {
    flexBasis: "48%",
    borderRadius: 16,
    height: 100,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  articleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  articleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  articleIcon: {
    fontSize: 18,
  },
  articleTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default HomeScreen;