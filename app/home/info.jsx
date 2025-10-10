import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Linking, ScrollView, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useBackHandler } from '../utility/useBackHandler';

const hotlines = [
  { id: 1, label: 'CDRRMO', number: '09568174215', icon: require('../../assets/images/Security.png') },
  { id: 2, label: 'CDRRMO #2', number: '09610546250', icon: require('../../assets/images/Security.png') },
  { id: 3, label: 'PNP Toledo City', number: '09664352435', icon: require('../../assets/images/Police.png') },
  { id: 4, label: 'Toledo Hospital', number: '09453592755', icon: require('../../assets/images/Cross.png') },
  { id: 5, label: 'BFP Toledo City', number: '09662165466', icon: require('../../assets/images/BFP.png') },
  { id: 6, label: 'City Mayor Office', number: '(032) 334 1935', icon: require('../../assets/images/City Hall.png') },
  { id: 7, label: 'Philippine Coast Guard', number: '09065364925', icon: require('../../assets/images/Cross.png') },
  { id: 8, label: 'Toledo City Health', number: '09531774692', icon: require('../../assets/images/City Health.png') },
  { id: 9, label: 'Cebeco III', number: '09176244406', icon: require('../../assets/images/Cebeco.png') },
  { id: 10, label: 'Public Information Office', number: '09567186174', icon: require('../../assets/images/PIO.png') },
  { id: 11, label: 'DSWD', number: '09173114415', icon: require('../../assets/images/DSWD.png') },
  { id: 12, label: 'Civil Security Unit', number: '09353449759', icon: require('../../assets/images/Swat.png') },
  { id: 13, label: 'Toledo City Water District', number: '09177099504', icon: require('../../assets/images/Management.png') },
  { id: 14, label: 'City Engineer Office', number: '09174941245', icon: require('../../assets/images/Language.png') },
  { id: 15, label: 'City Engineer Office #2', number: '09177001062', icon: require('../../assets/images/Language.png') },
];

const InformationScreen = () => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState({});
  const [saving, setSaving] = useState({});

  const handleCopy = (number) => {
    Clipboard.setStringAsync(number);
    Alert.alert('Copied!', `Phone number ${number} copied to clipboard.`);
  };

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const saveToContacts = async (hotline) => {
    try {
      setSaving(prev => ({ ...prev, [hotline.id]: true }));
      
      // Request permissions
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'AlertAID needs access to your contacts to save emergency numbers.',
          [{ text: 'OK' }]
        );
        setSaving(prev => ({ ...prev, [hotline.id]: false }));
        return;
      }

      // Create contact
      const contact = {
        [Contacts.Fields.LastName]: hotline.label,
        [Contacts.Fields.PhoneNumbers]: [
          {
            label: 'mobile',
            number: hotline.number,
          },
        ],
        [Contacts.Fields.Company]: 'Emergency Hotline',
        [Contacts.Fields.JobTitle]: `${hotline.label} - Emergency Service`,
        note: 'Saved from AlertAID Emergency App',
      };

      // Add to contacts
      const contactId = await Contacts.addContactAsync(contact);
      
      if (contactId) {
        setBookmarked(prev => ({ ...prev, [hotline.id]: true }));
        Alert.alert(
          'Saved to Contacts!',
          `${hotline.label} (${hotline.number}) has been saved to your phone contacts.`,
          [{ text: 'OK' }]
        );
      }
      
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert(
        'Error',
        'Failed to save contact. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSaving(prev => ({ ...prev, [hotline.id]: false }));
    }
  };

  const toggleBookmark = async (hotline) => {
    if (bookmarked[hotline.id]) {
      // Already bookmarked - we could remove it, but for safety we'll keep it
      Alert.alert(
        'Contact Saved',
        `${hotline.label} is already saved to your contacts.`,
        [{ text: 'OK' }]
      );
    } else {
      // Save to contacts
      await saveToContacts(hotline);
    }
  };

  useBackHandler();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={require('../../assets/images/Back Arrow.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Image source={require('../../assets/images/Logo.png')} resizeMode="contain" style={styles.settingsIcon} />
        </View>

        {/* Hotline Card */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Image source={require('../../assets/images/Call.png')} style={styles.callIcon} />
            <Text style={styles.cardTitle}>ALERTAID HOTLINES</Text>
          </View>

          {hotlines.map((hotline) => (
            <View key={hotline.id} style={styles.hotlineItem}>
              <Image source={hotline.icon} style={styles.icon} />
              <View style={styles.details}>
                <Text style={styles.hotlineLabel}>{hotline.label}</Text>
                <Text style={styles.hotlineNumber}>{hotline.number}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleCopy(hotline.number)}>
                  <Image source={require('../../assets/images/Copy.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCall(hotline.number)}>
                  <Image source={require('../../assets/images/Call.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => toggleBookmark(hotline)}
                  disabled={saving[hotline.id]}
                >
                  <Image
                    source={
                      bookmarked[hotline.id]
                        ? require('../../assets/images/Bell_Filled.png') // Use a different icon for saved state
                        : require('../../assets/images/Bell.png')
                    }
                    style={[
                      styles.actionIcon,
                      saving[hotline.id] && styles.disabledIcon,
                      bookmarked[hotline.id] && styles.savedIcon
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Info Text */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            💡 Tap the bell icon to save emergency numbers directly to your phone contacts for quick access!
          </Text>
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
  disabledIcon: {
    opacity: 0.5,
  },
  savedIcon: {
    tintColor: '#4CAF50', // Green color for saved state
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF0000',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});