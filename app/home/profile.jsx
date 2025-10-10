import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { useBackHandler } from '../utility/useBackHandler';

const ProfileScreen = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useBackHandler();

  useEffect(() => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.warn('No user data found in Firestore!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require('../../assets/images/Back Arrow.png')} style={styles.icon} />
        </TouchableOpacity>

        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

        <TouchableOpacity>
          <Link href="/screens/settings">
            <Image source={require('../../assets/images/Settings.png')} resizeMode="contain" style={styles.icon} />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Conditional Content */}
      {userData ? (
        // User is logged in - show profile
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.welcomeText}>
            {`WELCOME ${userData?.username?.toUpperCase() || 'USER'}!`}
          </Text>

          <Image
            source={require('../../assets/images/Male User.png')}
            style={styles.profileImage}
          />

          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{userData?.username || 'N/A'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Email Address:</Text>
              <Text style={styles.value}>{userData?.email || 'N/A'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{userData?.gender || 'N/A'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.value}>{userData?.phone || 'N/A'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{userData?.address || 'N/A'}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        // User is not logged in - show empty state with buttons
        <View style={styles.emptyState}>
          <Image
            source={require('../../assets/images/Male User.png')}
            style={styles.profileImage}
          />
          <Text style={styles.emptyStateText}>Profile Not Available</Text>
          <Text style={styles.emptyStateSubtext}>
            Please login or create an account to view your profile and access all features
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 80,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 40,
    height: 40,
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
    marginTop: 10,
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
  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#FFF',
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  // Button Container
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  registerButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
    width: '100%',
  },
  loginButtonText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});