import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/Settings.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Dashboard */}
        <View style={styles.dashboard}>
          <Text style={styles.dashboardTitle}>📊 My Dashboard</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Crises Avoided</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Articles Read</Text>
            </View>
          </View>
          <Text style={styles.statusText}>✅ Status: <Text style={{ fontWeight: 'bold' }}>Safe</Text></Text>
        </View>

        {/* Safety Articles */}
        <Text style={styles.sectionTitle}>🛡️ Safety Articles</Text>
        <View style={styles.articlesContainer}>
          <View style={[styles.articleCard, { backgroundColor: '#E67E22' }]}>
            <Text style={styles.articleTitle}>🔥 Heat Wave</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </View>
          <View style={[styles.articleCard, { backgroundColor: '#2980B9' }]}>
            <Text style={styles.articleTitle}>🌊 Flash Floods</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </View>
        </View>

        <View style={styles.articlesContainer}>
          <View style={[styles.articleCard, { backgroundColor: '#27AE60' }]}>
            <Text style={styles.articleTitle}>🌪️ Typhoons</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </View>
          <View style={[styles.articleCard, { backgroundColor: '#8E44AD' }]}>
            <Text style={styles.articleTitle}>🌋 Volcanic Eruption</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/Home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/images/Bell.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/images/Alert.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    tintColor: '#FF0000',
  },
  settingsIcon: {
    width: 30,
    height: 30,
    tintColor: '#FF0000',
  },
  dashboard: {
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dashboardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  statLabel: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
    textAlign: 'center',
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  articlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  articleCard: {
    padding: 16,
    borderRadius: 16,
    width: '48%',
    height: 120,
    justifyContent: 'space-between',
  },
  articleTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  articleSubtitle: {
    color: '#FFF',
    fontSize: 12,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFF',
  },
});

export default HomeScreen;
