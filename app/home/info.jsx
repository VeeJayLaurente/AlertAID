import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const InformationScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require('../../assets/images/Arrow.png')} // Replace with your custom back icon if available
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Hotlines</Text>
      </View>

      {/* Hotline Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ALERTAID HOTLINES</Text>

        <View style={styles.hotlineItem}>
          <Text style={styles.hotlineLabel}>Civil Security:</Text>
          <Text style={styles.hotlineNumber}>+99 1232 4143</Text>
        </View>

        <View style={styles.hotlineItem}>
          <Text style={styles.hotlineLabel}>PNP Toledo City:</Text>
          <Text style={styles.hotlineNumber}>+99 1232 3121</Text>
        </View>

        <View style={styles.hotlineItem}>
          <Text style={styles.hotlineLabel}>Toledo Hospital:</Text>
          <Text style={styles.hotlineNumber}>+99 7845 3621</Text>
        </View>

        <View style={styles.hotlineItem}>
          <Text style={styles.hotlineLabel}>BFP Toledo City:</Text>
          <Text style={styles.hotlineNumber}>+99 4527 1376</Text>
        </View>

        <View style={styles.hotlineItem}>
          <Text style={styles.hotlineLabel}>Toledo City Hall:</Text>
          <Text style={styles.hotlineNumber}>+99 3218 3443</Text>
        </View>
      </View>
    </View>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#000',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  hotlineItem: {
    marginBottom: 12,
  },
  hotlineLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  hotlineNumber: {
    fontSize: 16,
    color: '#FFF',
  },
});
