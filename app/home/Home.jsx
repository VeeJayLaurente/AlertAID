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
        {/* Alerts Carousel Section */}
      <View style={styles.alertsContainer}>
        <Text style={styles.sectionTitle}>🚨 Latest Alerts & Updates</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          <View style={[styles.alertCard, { backgroundColor: '#FFDFDF' }]}>
            <Text style={styles.alertTitle}>🚨 Heavy Rainfall Warning</Text>
            <Text style={styles.alertDesc}>Issued by PAGASA for Toledo. Stay indoors and avoid low-lying areas.</Text>
            <TouchableOpacity style={styles.alertBtn}>
              <Text style={styles.alertBtnText}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.alertCard, { backgroundColor: '#FFF2CC' }]}>
            <Text style={styles.alertTitle}>📢 LGU Advisory</Text>
            <Text style={styles.alertDesc}>Road closure near Toledo bridge from 5pm-8pm due to clearing ops.</Text>
            <TouchableOpacity style={styles.alertBtn}>
              <Text style={styles.alertBtnText}>Learn More</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.alertCard, { backgroundColor: '#E0F7FA' }]}>
            <Text style={styles.alertTitle}>💡 Power Interruption</Text>
            <Text style={styles.alertDesc}>Scheduled power outage by VECO on July 29, 10am-2pm.</Text>
            <TouchableOpacity style={styles.alertBtn}>
              <Text style={styles.alertBtnText}>More Info</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
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
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
alertTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#D32F2F',
  marginBottom: 6,
},
alertDesc: {
  fontSize: 13,
  color: '#333',
  marginBottom: 12,
},
alertBtn: {
  alignSelf: 'flex-start',
  backgroundColor: '#FF0000',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
},
alertBtnText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: 'bold',
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
