import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';

const HomeScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articleData = {
    heatwave: {
      title: 'Heat Wave Safety',
      tips: [
        'Stay hydrated and avoid going out during peak heat hours (11am–4pm).',
        'Wear light-colored, loose clothing.',
        'Never leave people or pets in parked vehicles.',
        'Check local advisories and alerts for extreme heat warnings.',
      ],
      bgColor: '#E67E22',
    },
    floods: {
      title: 'Flash Flood Safety',
      tips: [
        'Avoid walking or driving through floodwaters.',
        'Move to higher ground immediately.',
        'Secure important documents in waterproof containers.',
        'Stay tuned to weather updates and emergency instructions.',
      ],
      bgColor: '#2980B9',
    },
    typhoons: {
      title: 'Typhoon Safety',
      tips: [
        'Stay indoors and keep away from windows.',
        'Charge devices and prepare emergency kits.',
        'Secure outdoor items and weak structures.',
        'Follow local government evacuation notices.',
      ],
      bgColor: '#27AE60',
    },
    earthquakes: {
      title: 'Earthquake Safety',
      tips: [
        'Drop, Cover, and Hold during shaking.',
        'Stay indoors until the shaking stops.',
        'Prepare a go-bag with essentials.',
        'Inspect for gas leaks, broken wires, and structural damage.',
      ],
      bgColor: '#5b3b28',
    },
  };

  const renderModal = () => {
    if (!selectedArticle) return null;

    const article = articleData[selectedArticle];
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={true}
        onRequestClose={() => setSelectedArticle(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: article.bgColor }]}>
            <Text style={styles.modalTitle}>{article.title}</Text>
            {article.tips.map((tip, index) => (
              <Text key={index} style={styles.modalText}>• {tip}</Text>
            ))}
            <Pressable style={styles.closeButton} onPress={() => setSelectedArticle(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

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
          <TouchableOpacity
            style={[styles.articleCard, { backgroundColor: '#E67E22' }]}
            onPress={() => setSelectedArticle('heatwave')}
          >
            <Text style={styles.articleTitle}>🔥 Heat Wave</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.articleCard, { backgroundColor: '#2980B9' }]}
            onPress={() => setSelectedArticle('floods')}
          >
            <Text style={styles.articleTitle}>🌊 Flash Floods</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.articlesContainer}>
          <TouchableOpacity
            style={[styles.articleCard, { backgroundColor: '#27AE60' }]}
            onPress={() => setSelectedArticle('typhoons')}
          >
            <Text style={styles.articleTitle}>🌪️ Typhoons</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.articleCard, { backgroundColor: '#5b3b28' }]}
            onPress={() => setSelectedArticle('earthquakes')}
          >
            <Text style={styles.articleTitle}>⛰️ EarthQuakes</Text>
            <Text style={styles.articleSubtitle}>Learn more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderModal()}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    elevation: 10,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
