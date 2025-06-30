import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require('../../assets/images/Arrow.png')} style={styles.icon} />
        </TouchableOpacity>

        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

        <TouchableOpacity>
          <Image source={require('../../assets/images/Settings.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>WELCOME VEEJ!</Text>

      {/* Profile Image */}
      <Image
        source={require('../../assets/images/profile.png')} // Replace with actual image or dynamic logic
        style={styles.profileImage}
      />

      {/* Profile Details */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.value}>Veej</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>Vee Jay Laurente</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.value}>kinjas143@gmail.com</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>Male</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>+63 912 345 6789</Text>
        </View>

        {/* Optional Future Enhancements */}
        {/* <View style={styles.card}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>Toledo City, Cebu, Philippines</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 60,
    height: 60,
    tintColor: 'white',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: 'white',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFEEEE',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
