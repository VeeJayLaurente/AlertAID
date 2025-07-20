import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Linking, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

const hotlines = [
  { id: 1, label: 'Civil Security', number: '+9912324143', icon: require('../../assets/images/Security.png') },
  { id: 2, label: 'PNP Toledo City', number: '+9912323121', icon: require('../../assets/images/Police.png') },
  { id: 3, label: 'Toledo Hospital', number: '+9978453621', icon: require('../../assets/images/Cross.png') },
  { id: 4, label: 'BFP Toledo City', number: '+9945271376', icon: require('../../assets/images/BFP.png') },
  { id: 5, label: 'Toledo City Hall', number: '+9932183443', icon: require('../../assets/images/City Hall.png') },
  { id: 6, label: 'Philippine Coast Guard', number: '+9932198745', icon: require('../../assets/images/Cross.png') },
  { id: 7, label: 'Toledo City Health', number: '+9923417832', icon: require('../../assets/images/City Health.png') },
  { id: 8, label: 'Cebeco III', number: '+9987654123', icon: require('../../assets/images/Cebeco.png') },
  { id: 9, label: 'Toledo City Swat Force', number: '+9973412211', icon: require('../../assets/images/Swat.png') },
  { id: 10, label: 'City Management Office', number: '+9967891234', icon: require('../../assets/images/Management.png') },
  { id: 11, label: 'Public Information Office', number: '+9912312312', icon: require('../../assets/images/PIO.png') },
  { id: 12, label: 'City Treasurer\'s Office', number: '+9954321123', icon: require('../../assets/images/Treasurer.png') },
  { id: 13, label: 'CENRO', number: '+9943217788', icon: require('../../assets/images/Cenro.png') },
  { id: 14, label: 'DSWD', number: '+9932145789', icon: require('../../assets/images/DSWD.png') },
  { id: 15, label: 'Department of Education', number: '+9923478901', icon: require('../../assets/images/Education.png') },
];

const InformationScreen = () => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState({});

  const handleCopy = (number) => {
    Clipboard.setStringAsync(number);
    Alert.alert('Copied!', `Phone number ${number} copied to clipboard.`);
  };

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require('../../assets/images/Back Arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={require('../../assets/images/Settings.png')} resizeMode="contain" style={styles.settingsIcon} />
      </View>

      {/* Hotline Card */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Image source={require('../../assets/images/Call.png')} style={styles.callIcon} />
          <Text style={styles.cardTitle}>ALERTAID HOTLINES</Text>
        </View>

        {hotlines.map(({ id, label, number, icon }) => (
          <View key={id} style={styles.hotlineItem}>
            <Image source={icon} style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.hotlineLabel}>{label}</Text>
              <Text style={styles.hotlineNumber}>{number}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleCopy(number)}>
                <Image source={require('../../assets/images/Copy.png')} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCall(number)}>
                <Image source={require('../../assets/images/Call.png')} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleBookmark(id)}>
                <Image
                  source={
                    bookmarked[id]
                      ? require('../../assets/images/Bookmark.png')
                      : require('../../assets/images/Bookmark.png')
                  }
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
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
  scrollContainer: {
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#FF0000',
  },
  settingsIcon: {
    width: 28,
    height: 28,
    tintColor: '#FF0000',
  },
  card: {
    backgroundColor: '#FF0000',
    borderRadius: 24,
    padding: 20,
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  callIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  hotlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  hotlineLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  hotlineNumber: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionIcon: {
    width: 25,
    height: 25,
    tintColor: '#FF0000',
  },
});
